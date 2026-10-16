import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, FRESH_PLATFORM_SETTINGS_QUERY_OPTIONS } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  Info,
  Loader2,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { getCountryByCode } from "@/lib/countries";
import { DEFAULT_MINIMUM_WITHDRAWAL } from "@shared/platform-settings";
import { catlBatteryBackground } from "@/assets/catl-media";
import withdrawalActionIcon from "@/assets/images/home-icons/withdrawal.png";
import withdrawHistoryIcon from "@assets/IMG_20260829_070945_804_1792174059478.jpg";

interface WalletData {
  id: number;
  userId: number;
  accountName: string;
  accountNumber: string;
  paymentMethod: string;
  country: string;
  isDefault: boolean;
}

function maskWalletAccount(accountNumber: string) {
  const digits = accountNumber.replace(/\D/g, "");
  if (digits.length < 6) return accountNumber;
  const hiddenLength = Math.min(6, digits.length - 5);
  return `${digits.slice(0, 3)}${"•".repeat(hiddenLength)}${digits.slice(-2)}`;
}

function formatWalletLabel(wallet: WalletData | null) {
  if (!wallet) return "Choisissez un compte de réception";
  const method = typeof wallet.paymentMethod === "string" ? wallet.paymentMethod.trim().toUpperCase() : "";
  const accountNumber = typeof wallet.accountNumber === "string" ? maskWalletAccount(wallet.accountNumber) : "";
  return [method, accountNumber].filter(Boolean).join(" · ") || "Compte enregistré";
}

const formatAmount = (amount: number) => amount.toLocaleString("fr-FR");

export default function WithdrawalPage() {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState<number | "">("");
  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [, navigate] = useLocation();

  const countryInfo = user ? getCountryByCode(user.country) : null;
  const configuredCurrency = countryInfo?.currency || "XOF";
  const currency = configuredCurrency === "FCFA" ? "XOF" : configuredCurrency;

  const { data: withdrawalSettings } = useQuery<{
    withdrawalFees: number;
    withdrawalStartHour: number;
    withdrawalEndHour: number;
    maxWithdrawalsPerDay: number;
    minWithdrawal: number;
    withdrawalPrepaymentEnabled: boolean;
  }>({
    queryKey: ["/api/settings/withdrawal"],
    ...FRESH_PLATFORM_SETTINGS_QUERY_OPTIONS,
  });

  const minWithdrawal = withdrawalSettings?.minWithdrawal ?? DEFAULT_MINIMUM_WITHDRAWAL;
  const withdrawalFee = withdrawalSettings?.withdrawalFees ?? 18;
  const withdrawalStartHour = withdrawalSettings?.withdrawalStartHour ?? 9;
  const withdrawalEndHour = withdrawalSettings?.withdrawalEndHour ?? 17;
  const withdrawalPrepaymentEnabled = withdrawalSettings?.withdrawalPrepaymentEnabled ?? false;
  const amountAfterFees = amount ? Math.floor(Number(amount) * (1 - withdrawalFee / 100)) : 0;
  const currentHour = new Date().getHours();
  const isWithinWithdrawalHours = currentHour >= withdrawalStartHour && currentHour < withdrawalEndHour;

  const {
    data: wallets = [],
    isLoading: walletsLoading,
    isError: walletsError,
    refetch: refetchWallets,
  } = useQuery<WalletData[]>({
    queryKey: ["/api/wallets"],
    refetchOnWindowFocus: true,
  });

  const { data: availableBalance } = useQuery<{ availableBalance: string }>({
    queryKey: ["/api/withdrawals/available"],
    enabled: !!user,
    staleTime: 0,
    refetchOnMount: true,
  });

  useEffect(() => {
    const savedWalletId = localStorage.getItem("selectedWalletId");
    if (savedWalletId && wallets.length > 0) {
      const wallet = wallets.find((item) => item.id === parseInt(savedWalletId, 10));
      if (wallet) setSelectedWallet(wallet);
      localStorage.removeItem("selectedWalletId");
    }
  }, [wallets]);

  useEffect(() => {
    if (!selectedWallet && wallets.length > 0) {
      const defaultWallet = wallets.find((wallet) => wallet.isDefault);
      if (defaultWallet) setSelectedWallet(defaultWallet);
    }
  }, [wallets, selectedWallet]);

  const withdrawMutation = useMutation({
    mutationFn: async (data: { amount: number; walletId: number }) => {
      const response = await apiRequest("POST", "/api/withdrawals", data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Demande envoyée", description: "Votre demande de retrait a été envoyée." });
      refreshUser();
      queryClient.invalidateQueries({ queryKey: ["/api/withdrawals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/withdrawals/available"] });
      setAmount("");
    },
    onError: (error: Error & { data?: { code?: string; paymentUrl?: string } }) => {
      if (error.data?.code === "WITHDRAWAL_PREPAYMENT_REQUIRED" && error.data.paymentUrl) {
        navigate(error.data.paymentUrl);
        return;
      }
      toast({ title: "Retrait impossible", description: error.message, variant: "destructive" });
    },
  });

  const withdrawalPrepayment = withdrawalPrepaymentEnabled && amount
    ? Math.max(1, Math.round(Number(amount) * 25 / 100))
    : 0;

  const handlePayPrepayment = async () => {
    if (!withdrawalPrepaymentEnabled) return;
    if (!amount || Number(amount) < minWithdrawal) {
      toast({
        title: "Montant invalide",
        description: `Le montant minimum est de ${minWithdrawal} ${currency}`,
        variant: "destructive",
      });
      return;
    }
    setIsPreparingPayment(true);
    try {
      const response = await apiRequest("POST", "/api/withdrawal-fee/prepare", { amount: Number(amount) });
      const data = await response.json();
      navigate(data.paymentUrl);
    } catch (error: any) {
      toast({ title: "Paiement indisponible", description: error.message, variant: "destructive" });
    } finally {
      setIsPreparingPayment(false);
    }
  };

  const handleSubmit = () => {
    if (!isWithinWithdrawalHours) {
      toast({
        title: "Retrait indisponible",
        description: `Horaires de retrait : de ${withdrawalStartHour}h à ${withdrawalEndHour}h.`,
        variant: "destructive",
      });
      return;
    }
    if (!amount || amount < minWithdrawal) {
      toast({
        title: "Montant invalide",
        description: `Le montant minimum est de ${minWithdrawal} ${currency}`,
        variant: "destructive",
      });
      return;
    }
    if (!selectedWallet) {
      toast({
        title: "Compte requis",
        description: "Veuillez sélectionner un compte bancaire",
        variant: "destructive",
      });
      return;
    }
    withdrawMutation.mutate({ amount: Number(amount), walletId: selectedWallet.id });
  };

  if (!user) return null;

  const balance = parseFloat(availableBalance?.availableBalance || "0");
  const hasWallets = wallets.length > 0;

  return (
    <main className="withdraw-page">
      <style>{`
        .withdraw-page {
          --wd-ink: #17253e;
          --wd-blue: #1947b8;
          --wd-blue-dark: #12358f;
          --wd-blue-deep: #12358f;
          --wd-blue-pale: #edf2ff;
          --wd-paper: #ffffff;
          --wd-muted: #66748a;
          --wd-line: #dce5f4;
          --wd-blue-bright: #1947b8;
          min-height: 100dvh;
          padding: 0 0 calc(24px + env(safe-area-inset-bottom));
          position: relative;
          isolation: isolate;
          background: transparent;
          color: var(--wd-ink);
          font-family: var(--font-sans, "DM Sans", sans-serif);
        }
        .withdraw-page::before {
          position: fixed;
          z-index: 0;
          inset: 0;
          background:
            linear-gradient(180deg, rgb(8 27 85 / 6%), rgb(5 17 58 / 14%)),
            url("${catlBatteryBackground}") center / cover no-repeat;
          content: "";
          pointer-events: none;
        }
        .withdraw-page *,
        .withdraw-page *::before,
        .withdraw-page *::after { box-sizing: border-box; }
        .withdraw-shell {
          position: relative;
          z-index: 1;
          width: min(100%, 540px);
          min-height: 100dvh;
          margin: 0 auto;
          padding-bottom: 26px;
          background: transparent;
        }
        .withdraw-header {
          position: relative;
          display: flex;
          min-height: 68px;
          align-items: center;
          justify-content: center;
          padding: 12px 66px;
          border-bottom: 1px solid #e4eaf3;
          background: #ffffff;
          color: var(--wd-ink);
        }
        .withdraw-title {
          margin: 0;
          color: var(--wd-ink);
          font-size: 19px;
          font-weight: 750;
          letter-spacing: -.02em;
        }
        .withdraw-icon-link {
          position: absolute;
          top: 13px;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 1px solid #dce5f2;
          border-radius: 14px;
          background: #f7f9fd;
          color: var(--wd-blue);
          text-decoration: none;
          transition: background .18s ease, transform .18s ease;
        }
        .withdraw-icon-link:hover { background: #edf2ff; }
        .withdraw-icon-link:active { transform: translateY(1px); }
        .withdraw-back-link { left: 16px; }
        .withdraw-history-link { right: 16px; }
        .withdraw-history-icon {
          display: block;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }
        .withdraw-hero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 108px;
          align-items: center;
          gap: 10px;
          min-height: 190px;
          overflow: hidden;
          margin: 12px 16px 0;
          border: 2px solid #17191c;
          border-radius: 16px;
          padding: 23px 20px 26px;
          background: #fff;
          box-shadow: 0 3px 0 #17191c, 0 8px 18px rgba(17,24,39,.16);
          color: var(--wd-ink);
        }
        .withdraw-balance-copy { position: relative; z-index: 1; }
        .withdraw-eyebrow {
          margin: 0 0 8px;
          color: #607293;
          font-size: 11px;
          font-weight: 750;
          letter-spacing: .11em;
          text-transform: uppercase;
        }
        .withdraw-balance {
          margin: 0;
          color: #17253e;
          font-family: var(--font-mono, "Space Mono", monospace);
          font-size: clamp(25px, 7vw, 34px);
          font-weight: 700;
          letter-spacing: -.055em;
          line-height: 1.1;
          font-variant-numeric: tabular-nums;
        }
        .withdraw-balance-caption {
          margin: 9px 0 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.45;
        }
        .withdraw-hero-icon {
          display: block;
          width: 82px;
          height: 82px;
          justify-self: end;
          object-fit: contain;
        }
        .withdraw-content { padding: 18px 16px 0; }
        .withdraw-card {
          border: 2px solid #17191c;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 3px 0 #17191c, 0 8px 18px rgba(17,24,39,.16);
        }
        .withdraw-form-card {
          padding: 20px 18px 19px;
          border-radius: 20px;
        }
        .withdraw-section-kicker {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 11px;
          color: var(--wd-ink);
          font-size: 14px;
          font-weight: 750;
        }
        .withdraw-section-kicker svg { color: var(--wd-blue); }
        .withdraw-amount-field {
          display: flex;
          min-height: 58px;
          align-items: center;
          gap: 12px;
          border: 1.5px solid #17191c;
          border-radius: 999px;
          padding: 0 18px;
          background: #ffffff;
          transition: border-color .16s ease, box-shadow .16s ease;
        }
        .withdraw-amount-field:focus-within {
          border-color: var(--wd-blue);
          box-shadow: 0 0 0 3px rgba(25,71,184,.12);
        }
        .withdraw-currency {
          flex: none;
          color: var(--wd-blue-dark);
          font-size: 15px;
          font-weight: 800;
        }
        .withdraw-amount-field input {
          width: 100%;
          min-width: 0;
          height: 56px;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--wd-ink);
          font-size: 15px;
          font-weight: 600;
        }
        .withdraw-amount-field input::placeholder { color: #8a98ac; font-weight: 450; opacity: 1; }
        .withdraw-amount-field input::-webkit-inner-spin-button,
        .withdraw-amount-field input::-webkit-outer-spin-button { margin: 0; appearance: none; }
        .withdraw-amount-field input[type=number] { appearance: textfield; }
        .withdraw-amount-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 6px 12px;
          margin: 10px 2px 20px;
          color: var(--wd-muted);
          font-size: 12px;
        }
        .withdraw-amount-meta strong { color: var(--wd-ink); font-weight: 750; }
        .withdraw-net-amount { color: var(--wd-blue-bright); }
        .withdraw-wallet-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin: 0 0 9px;
          color: var(--wd-ink);
          font-size: 14px;
          font-weight: 750;
        }
        .withdraw-wallet-label span:last-child {
          color: var(--wd-muted);
          font-size: 11px;
          font-weight: 600;
        }
        .withdraw-wallet-choice {
          display: flex;
          width: 100%;
          min-height: 68px;
          align-items: center;
          gap: 12px;
          border: 1.5px solid #17191c;
          border-radius: 15px;
          padding: 11px 12px;
          background: #fff;
          color: var(--wd-ink);
          box-shadow: 0 2px 0 #17191c, 0 4px 9px rgba(17,24,39,.11);
          text-align: left;
          cursor: pointer;
          transition: border-color .16s ease, background .16s ease, transform .16s ease;
        }
        .withdraw-wallet-choice:hover { border-color: #17191c; background: #f3f6ff; }
        .withdraw-wallet-choice:active { transform: translateY(1px); }
        .withdraw-wallet-icon {
          display: grid;
          width: 42px;
          height: 42px;
          flex: none;
          place-items: center;
          border-radius: 13px;
          background: #eaf0ff;
          color: #1947b8;
        }
        .withdraw-wallet-copy { min-width: 0; flex: 1; }
        .withdraw-wallet-name {
          display: block;
          overflow: hidden;
          color: var(--wd-ink);
          font-size: 13px;
          font-weight: 750;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .withdraw-wallet-description {
          display: block;
          overflow: hidden;
          margin-top: 4px;
          color: var(--wd-muted);
          font-size: 11px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .withdraw-wallet-choice > svg:last-child { flex: none; color: #71819c; }
        .withdraw-submit {
          display: flex;
          width: 100%;
          min-height: 56px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-top: 19px;
          border: 0;
          border-radius: 999px;
          padding: 0 18px;
          background: linear-gradient(105deg, var(--wd-blue), #2460c8);
          box-shadow: 0 7px 15px rgba(25,71,184,.2);
          color: white;
          font-size: 15px;
          font-weight: 750;
          cursor: pointer;
          transition: transform .16s ease, opacity .16s ease, box-shadow .16s ease;
        }
        .withdraw-submit:hover:not(:disabled) { box-shadow: 0 9px 19px rgba(25,71,184,.26); }
        .withdraw-submit:active:not(:disabled) { transform: translateY(1px); }
        .withdraw-submit:disabled { opacity: .58; cursor: not-allowed; }
        .withdraw-fee-notice {
          display: grid;
          gap: 8px;
          margin-top: 14px;
          border: 1.5px solid #17191c;
          border-radius: 15px;
          padding: 14px;
          background: #edf2ff;
          box-shadow: 0 2px 0 #17191c, 0 4px 9px rgba(17,24,39,.1);
          color: var(--wd-muted);
          font-size: 12px;
          line-height: 1.5;
        }
        .withdraw-fee-title { display: flex; align-items: center; gap: 7px; color: var(--wd-ink); font-weight: 750; }
        .withdraw-fee-title svg { color: var(--wd-blue); }
        .withdraw-pay-fee {
          display: inline-flex;
          min-height: 40px;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 1px solid #c2d3ef;
          border-radius: 11px;
          background: #eaf1ff;
          color: var(--wd-blue-dark);
          font-size: 13px;
          font-weight: 750;
          cursor: pointer;
        }
        .withdraw-pay-fee:disabled { opacity: .5; cursor: not-allowed; }
        .withdraw-instructions {
          margin-top: 14px;
          padding: 19px 18px 17px;
          border-top: 2px solid #17191c;
          border-radius: 16px;
        }
        .withdraw-instructions-heading {
          display: flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 4px;
          color: var(--wd-ink);
          font-size: 16px;
          font-weight: 800;
          letter-spacing: -.02em;
        }
        .withdraw-instructions-heading svg { color: var(--wd-blue); }
        .withdraw-instructions-intro {
          margin: 0 0 12px;
          color: var(--wd-muted);
          font-size: 12px;
          line-height: 1.5;
        }
        .withdraw-rule-list { display: grid; margin: 0; padding: 0; list-style: none; }
        .withdraw-rule {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          padding: 11px 0;
          border-top: 1px solid #e8edf5;
          color: var(--wd-muted);
          font-size: 12px;
          line-height: 1.4;
        }
        .withdraw-rule strong { color: var(--wd-blue-bright); font-weight: 750; text-align: right; }
        .withdraw-rule-detail { display: grid; gap: 4px; }
        .withdraw-rule-detail strong { text-align: left; }
        .withdraw-loading {
          display: grid;
          position: relative;
          z-index: 1;
          min-height: 100dvh;
          place-items: start center;
          padding: 16px;
          background: transparent;
        }
        .withdraw-skeleton {
          width: min(100%, 480px);
          display: grid;
          gap: 13px;
          padding-top: 12px;
        }
        .withdraw-skeleton-bar {
          height: 68px;
          border-radius: 17px;
          background: linear-gradient(90deg, #e8eef8 25%, #f5f8fd 42%, #e8eef8 65%);
          background-size: 300% 100%;
          animation: withdraw-shimmer 1.6s ease infinite;
        }
        .withdraw-skeleton-bar--hero { height: 185px; border-radius: 0 0 22px 22px; }
        .withdraw-skeleton-bar--tall { height: 300px; }
        @keyframes withdraw-shimmer { to { background-position: -150% 0; } }
        .withdraw-error {
          display: grid;
          justify-items: center;
          gap: 10px;
          padding: 25px 18px;
          color: var(--wd-muted);
          font-size: 13px;
          text-align: center;
        }
        .withdraw-retry {
          border: 0;
          border-radius: 10px;
          padding: 9px 14px;
          background: var(--wd-blue);
          color: white;
          font-weight: 700;
          cursor: pointer;
        }
        @media (min-width: 700px) {
          .withdraw-page { padding-top: 22px; padding-bottom: 40px; }
          .withdraw-shell {
            min-height: 0;
            overflow: hidden;
            border: 0;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
          }
          .withdraw-header { min-height: 70px; }
        }
        @media (max-width: 360px) {
          .withdraw-hero { grid-template-columns: minmax(0, 1fr) 76px; min-height: 184px; padding-right: 16px; padding-left: 16px; }
          .withdraw-hero-icon { width: 62px; height: 62px; }
          .withdraw-content { padding-right: 12px; padding-left: 12px; }
          .withdraw-form-card, .withdraw-instructions { padding-right: 14px; padding-left: 14px; }
          .withdraw-rule { font-size: 11px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .withdraw-page *, .withdraw-page *::before, .withdraw-page *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
        }
      `}</style>

      {walletsLoading ? (
        <div className="withdraw-loading" aria-label="Chargement">
          <div className="withdraw-skeleton" aria-hidden="true">
            <div className="withdraw-skeleton-bar withdraw-skeleton-bar--hero" />
            <div className="withdraw-skeleton-bar withdraw-skeleton-bar--tall" />
          </div>
        </div>
      ) : (
        <div className="withdraw-shell">
          <header className="withdraw-header">
            <Link href="/account" className="withdraw-icon-link withdraw-back-link" data-testid="button-back" aria-label="Retour">
              <ArrowLeft size={20} aria-hidden="true" />
            </Link>
            <h1 className="withdraw-title">Retrait</h1>
            <Link href="/history" className="withdraw-icon-link withdraw-history-link" aria-label="Historique des transactions">
              <img src={withdrawHistoryIcon} alt="" className="withdraw-history-icon" />
            </Link>
          </header>

          <section className="withdraw-hero" aria-label="Solde disponible">
            <div className="withdraw-balance-copy">
              <p className="withdraw-eyebrow">Solde disponible</p>
              <p className="withdraw-balance" data-testid="text-balance">
                {currency} {Math.round(balance).toLocaleString("fr-FR")}
              </p>
              <p className="withdraw-balance-caption">Revenus disponibles pour retrait</p>
            </div>
            <img src={withdrawalActionIcon} alt="" className="withdraw-hero-icon" aria-hidden="true" />
          </section>

          <div className="withdraw-content">
            <section className="withdraw-card withdraw-form-card" aria-label="Demande de retrait">
              <label className="withdraw-section-kicker" htmlFor="withdrawal-amount">
                <Wallet size={17} aria-hidden="true" />
                Montant du retrait
              </label>
              <div className="withdraw-amount-field">
                <span className="withdraw-currency">{currency}</span>
                <input
                  id="withdrawal-amount"
                  type="number"
                  min={minWithdrawal}
                  value={amount}
                  onChange={(event) => setAmount(event.target.value ? Number(event.target.value) : "")}
                  placeholder="Saisissez le montant"
                  data-testid="input-withdrawal-amount"
                  aria-label="Montant de retrait"
                />
              </div>
              <div className="withdraw-amount-meta">
                <span>Vous recevrez <strong className="withdraw-net-amount">{currency} {formatAmount(amountAfterFees)}</strong></span>
                <span>Frais : <strong>{withdrawalFee.toFixed(2)} %</strong></span>
              </div>

              <p className="withdraw-wallet-label">
                <span>Compte de réception</span>
                <span>{selectedWallet ? "Compte sélectionné" : hasWallets ? "Choisir un compte" : "À configurer"}</span>
              </p>
              {walletsError ? (
                <div className="withdraw-card withdraw-error" role="alert">
                  <span>Impossible de charger vos comptes enregistrés.</span>
                  <button type="button" className="withdraw-retry" onClick={() => refetchWallets()}>Réessayer</button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(hasWallets ? "/wallet?from=withdrawal" : "/wallet")}
                  className="withdraw-wallet-choice"
                  data-testid="button-select-wallet"
                >
                  <span className="withdraw-wallet-icon"><CreditCard size={20} aria-hidden="true" /></span>
                  <span className="withdraw-wallet-copy">
                    <span className="withdraw-wallet-name">{formatWalletLabel(selectedWallet)}</span>
                    <span className="withdraw-wallet-description">
                      {selectedWallet?.accountName || "Gérez vos comptes de versement"}
                    </span>
                  </span>
                  <ChevronRight size={19} aria-hidden="true" />
                </button>
              )}

              {withdrawalPrepaymentEnabled && (
                <div className="withdraw-fee-notice">
                  <div className="withdraw-fee-title"><Info size={16} aria-hidden="true" /> Paiement requis avant le retrait</div>
                  <span>
                    Vous devez payer 25 % du montant du retrait
                    {withdrawalPrepayment > 0
                      ? `, soit ${withdrawalPrepayment.toLocaleString("fr-FR")} ${currency}`
                      : ""} avant le lancement de votre demande.
                  </span>
                  <button
                    type="button"
                    onClick={handlePayPrepayment}
                    disabled={isPreparingPayment || !amount || Number(amount) < minWithdrawal}
                    className="withdraw-pay-fee"
                    data-testid="button-pay-withdrawal-prepayment"
                  >
                    {isPreparingPayment ? <Loader2 size={16} className="animate-spin" /> : "Payer les frais"}
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={withdrawMutation.isPending}
                className="withdraw-submit"
                data-testid="button-submit-withdrawal"
              >
                {withdrawMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <><span>Confirmer le retrait</span><ChevronRight size={18} aria-hidden="true" /></>}
              </button>
            </section>

            <section className="withdraw-card withdraw-instructions" aria-label="Instructions de retrait">
              <h2 className="withdraw-instructions-heading"><ShieldCheck size={19} aria-hidden="true" /> Règles de retrait</h2>
              <p className="withdraw-instructions-intro">Consultez les conditions avant de confirmer votre demande.</p>
              <ul className="withdraw-rule-list">
                <li className="withdraw-rule">
                  <span>Montant minimum</span>
                  <strong>{minWithdrawal.toLocaleString("fr-FR")} {currency}</strong>
                </li>
                <li className="withdraw-rule">
                  <span>Horaires de traitement</span>
                  <strong>De {withdrawalStartHour}h à {withdrawalEndHour}h</strong>
                </li>
                <li className="withdraw-rule">
                  <span>Frais par transaction</span>
                  <strong>{withdrawalFee} %</strong>
                </li>
                {withdrawalSettings?.maxWithdrawalsPerDay ? (
                  <li className="withdraw-rule">
                    <span>Limite quotidienne</span>
                    <strong>{withdrawalSettings.maxWithdrawalsPerDay} demande{withdrawalSettings.maxWithdrawalsPerDay > 1 ? "s" : ""} maximum</strong>
                  </li>
                ) : null}
                <li className="withdraw-rule withdraw-rule-detail">
                  <strong>Délai de traitement</strong>
                  <span>Généralement sous 2 heures, exceptionnellement sous 24 heures.</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}
