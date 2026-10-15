import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, FRESH_PLATFORM_SETTINGS_QUERY_OPTIONS } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ChevronRight, Clock3, CreditCard, Loader2, MapPin } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getCountryByCode } from "@/lib/countries";
import { DEFAULT_MINIMUM_WITHDRAWAL } from "@shared/platform-settings";

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
  if (!wallet) return "Choisissez votre portefeuille";
  const method = typeof wallet.paymentMethod === "string" ? wallet.paymentMethod.trim().toUpperCase() : "";
  const accountNumber = typeof wallet.accountNumber === "string" ? maskWalletAccount(wallet.accountNumber) : "";
  return [method, accountNumber].filter(Boolean).join(" - ") || "Portefeuille enregistré";
}

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
  const withdrawalFee = withdrawalSettings?.withdrawalFees ?? 16;
  const withdrawalStartHour = withdrawalSettings?.withdrawalStartHour ?? 9;
  const withdrawalEndHour = withdrawalSettings?.withdrawalEndHour ?? 17;
  const withdrawalPrepaymentEnabled = withdrawalSettings?.withdrawalPrepaymentEnabled ?? false;

  const amountAfterFees = amount ? Math.floor(Number(amount) * (1 - withdrawalFee / 100)) : 0;
  const currentHour = new Date().getHours();
  const isWithinWithdrawalHours = currentHour >= withdrawalStartHour && currentHour < withdrawalEndHour;

  const { data: wallets = [], isLoading: walletsLoading } = useQuery<WalletData[]>({
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
      const wallet = wallets.find(w => w.id === parseInt(savedWalletId));
      if (wallet) setSelectedWallet(wallet);
      localStorage.removeItem("selectedWalletId");
    }
  }, [wallets]);

  useEffect(() => {
    if (!selectedWallet && wallets.length > 0) {
      const defaultWallet = wallets.find(w => w.isDefault);
      if (defaultWallet) setSelectedWallet(defaultWallet);
    }
  }, [wallets, selectedWallet]);

  const withdrawMutation = useMutation({
    mutationFn: async (data: { amount: number; walletId: number }) => {
      const res = await apiRequest("POST", "/api/withdrawals", data);
      return res.json();
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
      toast({ title: "Montant invalide", description: `Le montant minimum est de ${minWithdrawal} ${currency}`, variant: "destructive" });
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
      toast({ title: "Montant invalide", description: `Le montant minimum est de ${minWithdrawal} ${currency}`, variant: "destructive" });
      return;
    }
    if (!selectedWallet) {
      toast({ title: "Compte requis", description: "Veuillez sélectionner un compte bancaire", variant: "destructive" });
      return;
    }
    withdrawMutation.mutate({ amount: Number(amount), walletId: selectedWallet.id });
  };

  if (walletsLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#bd304c]" />
      </div>
    );
  }

  if (!user) return null;

  const balance = parseFloat(availableBalance?.availableBalance || "0");
  const hasWallets = wallets.length > 0;

  return (
    <main className="withdraw-reference">
      <style>{`
        .withdraw-reference {
          min-height: 100dvh;
          background: #ffffff;
          color: #111827;
          font-family: Inter, Arial, sans-serif;
        }
        .withdraw-reference .withdraw-screen {
          box-sizing: border-box;
          width: 100%;
          max-width: 512px;
          min-height: 100dvh;
          margin: 0 auto;
          overflow: hidden;
          padding-bottom: calc(64px + env(safe-area-inset-bottom));
          background: #ffffff;
        }
        .withdraw-reference .withdraw-hero {
          position: relative;
          display: flow-root;
          box-sizing: border-box;
          min-height: 196px;
          padding: 0 16px 16px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }
        .withdraw-reference .history-button,
        .withdraw-reference .withdraw-back {
          position: absolute;
          z-index: 3;
          top: 16px;
          display: grid;
          width: 40px;
          height: 40px;
          place-items: center;
          border: 2px solid #111827;
          border-radius: 10px;
          padding: 0;
          background: #fff;
          box-shadow: 0 3px 0 #111827;
          color: #bd304c;
          text-decoration: none;
        }
        .withdraw-reference .history-button {
          right: 16px;
        }
        .withdraw-reference .withdraw-back {
          left: 16px;
        }
        .withdraw-reference .history-button:active,
        .withdraw-reference .withdraw-back:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 #111827;
        }
        .withdraw-reference .withdraw-back::before {
          content: none;
        }
        .withdraw-reference .hero-art {
          display: none;
        }
        .withdraw-reference .hero-pattern,
        .withdraw-reference .receipt-icon {
          display: none;
        }
        .withdraw-reference .withdraw-title {
          position: absolute;
          z-index: 2;
          top: 17px;
          right: 70px;
          left: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin: 0;
          color: #111827;
          font-size: 18px;
          font-weight: 800;
          line-height: 1.2;
          text-align: center;
        }
        .withdraw-reference .balance-card {
          display: flex;
          box-sizing: border-box;
          min-height: 116px;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 64px;
          padding: 16px;
          border: 2px solid #111827;
          border-radius: 13px;
          background: #ffffff;
          box-shadow: 0 3px 0 #111827;
        }
        .withdraw-reference .balance-label {
          margin: 8px 0 0;
          color: #4b5563;
          font-size: 14px;
          font-weight: 500;
        }
        .withdraw-reference .balance-value {
          margin: 0;
          color: #111827;
          font-size: 28px;
          font-weight: 800;
          line-height: 1.1;
          white-space: nowrap;
        }
        .withdraw-reference .balance-value span {
          display: none;
        }
        .withdraw-reference .balance-copy { min-width: 0; }
        .withdraw-reference .country-chip {
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          gap: 7px;
          flex-shrink: 0;
          padding: 0 10px;
          border: 1px solid #bd304c;
          border-radius: 999px;
          background: #bd304c;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
        }
        .withdraw-reference .country-chip svg { color: #ffffff; }
        .withdraw-reference .amount-panel {
          box-sizing: border-box;
          min-height: 154px;
          padding: 12px 16px 18px;
          background: #fff;
          border-bottom: 2px solid #111827;
        }
        .withdraw-reference .amount-label {
          margin: 0 0 9px;
          color: #111827;
          font-size: 16px;
          font-weight: 800;
        }
        .withdraw-reference .amount-field {
          display: flex;
          height: 54px;
          align-items: center;
          overflow: hidden;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #fff;
        }
        .withdraw-reference .amount-field input {
          flex: 1;
          width: 100%;
          min-width: 0;
          height: 100%;
          padding: 0 16px;
          border: 0;
          outline: 0;
          background: transparent;
          color: #111827;
          font-size: 19px;
        }
        .withdraw-reference .amount-field input::placeholder { color: #6b7280; opacity: 1; }
        .withdraw-reference .amount-currency {
          padding: 0 0 0 14px;
          color: #111827;
          font-size: 18px;
          font-weight: 800;
        }
        .withdraw-reference .amount-details {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-top: 12px;
          color: #4b5563;
          font-size: 13px;
          font-weight: 700;
        }
        .withdraw-reference .amount-details strong { color: #111827; }
        .withdraw-reference .prepayment-notice {
          display: grid;
          gap: 7px;
          margin-top: 16px;
          padding: 14px;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #fff0f3;
          color: #4b5563;
          font-size: 13px;
          line-height: 1.45;
        }
        .withdraw-reference .prepayment-notice strong {
          color: #111827;
          font-size: 14px;
        }
        .withdraw-reference .pay-prepayment {
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 2px solid #111827;
          border-radius: 10px;
          background: #bd304c;
          color: #ffffff;
          font-weight: 800;
          box-shadow: 0 2px 0 #111827;
        }
        .withdraw-reference .pay-prepayment:active:not(:disabled) {
          transform: translateY(2px);
          box-shadow: none;
        }
        .withdraw-reference .pay-prepayment:disabled { opacity: .55; }
        .withdraw-reference .wallet-choice {
          display: flex;
          width: calc(100% - 32px);
          min-height: 62px;
          align-items: center;
          margin: 16px 16px 0;
          padding: 0 14px;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #fff;
          color: #111827;
          text-align: left;
          box-shadow: 0 3px 0 #111827;
        }
        .withdraw-reference .wallet-choice:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 #111827;
        }
        .withdraw-reference .wallet-choice > svg:first-child {
          width: 34px;
          height: 34px;
          margin-right: 10px;
          flex-shrink: 0;
          color: #bd304c;
        }
        .withdraw-reference .wallet-choice svg:last-child {
          width: 22px;
          height: 22px;
          margin-left: auto;
          color: #bd304c;
        }
        .withdraw-reference .wallet-copy {
          overflow: hidden;
          font-size: 15px;
          font-weight: 800;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .withdraw-reference .instructions {
          margin: 18px 16px 8px;
          padding: 22px 16px 10px;
          border: 2px solid #111827;
          border-top: 5px solid #bd304c;
          border-radius: 14px;
          background: #fff;
        }
        .withdraw-reference .instructions-title {
          margin: 0 0 20px;
          color: #111827;
          font-size: 19px;
          font-weight: 800;
        }
        .withdraw-reference .instructions-title::before {
          content: "•";
          margin-right: 8px;
          color: #bd304c;
          font-size: 24px;
          line-height: 0;
        }
        .withdraw-reference .instruction-list {
          display: grid;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .withdraw-reference .instruction-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: start;
          gap: 12px;
          padding: 11px 0;
          border-bottom: 1px solid #e5e7eb;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.45;
        }
        .withdraw-reference .instruction-row:last-child { border-bottom: 0; }
        .withdraw-reference .instruction-row strong {
          color: #111827;
          font-weight: 800;
          text-align: right;
        }
        .withdraw-reference .instruction-row--detail {
          grid-template-columns: minmax(0, 1fr);
          gap: 4px;
        }
        .withdraw-reference .withdrawal-safety-note {
          margin: 10px 0 0;
          padding: 10px 11px;
          border: 1px solid #f3c1cc;
          border-radius: 10px;
          background: #fff5f7;
          color: #7f2639;
          font-size: 13px;
          line-height: 1.45;
        }
        .withdraw-reference .withdrawal-safety-note strong { color: #111827; }
        .withdraw-reference .submit {
          display: flex;
          width: calc(100% - 32px);
          min-height: 57px;
          align-items: center;
          justify-content: center;
          margin: 18px 16px 0;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #bd304c;
          color: #ffffff;
          font-size: 16px;
          font-weight: 800;
          box-shadow: 0 4px 0 #111827;
        }
        .withdraw-reference .submit:active:not(:disabled) {
          transform: translateY(3px);
          box-shadow: 0 1px 0 #111827;
        }
        .withdraw-reference .submit:disabled { opacity: .6; }
        @media (max-width: 360px) {
          .withdraw-reference .withdraw-hero { min-height: 190px; padding-right: 12px; padding-left: 12px; }
          .withdraw-reference .history-button { right: 12px; }
          .withdraw-reference .withdraw-back { left: 12px; }
          .withdraw-reference .balance-card { margin-top: 64px; padding: 12px; }
          .withdraw-reference .balance-value { font-size: 23px; }
          .withdraw-reference .country-chip { gap: 4px; padding: 0 7px; font-size: 11px; }
          .withdraw-reference .amount-details { font-size: 12px; }
          .withdraw-reference .instruction { font-size: 14px; }
        }
      `}</style>

      <div className="withdraw-screen">
        <section className="withdraw-hero" aria-label="Retrait">
          <h1 className="withdraw-title">
            <span>Retrait</span>
          </h1>
          <Link href="/history" className="history-button" aria-label="Historique des transactions">
            <Clock3 aria-hidden="true" />
          </Link>
          <Link href="/account" className="withdraw-back" data-testid="button-back" aria-label="Retour">
            <ArrowLeft aria-hidden="true" />
          </Link>
          <div className="balance-card">
            <div className="balance-copy">
              <p className="balance-value" data-testid="text-balance">
                {currency} {Math.round(balance).toLocaleString("fr-FR")}
              </p>
              <p className="balance-label">Revenus cumulés retirables</p>
            </div>
            <div className="country-chip">
              <MapPin size={16} aria-hidden="true" />
              <span>{countryInfo?.name || user.country}</span>
            </div>
          </div>
        </section>

        <button
          onClick={() => navigate(hasWallets ? "/wallet?from=withdrawal" : "/wallet")}
          className="wallet-choice"
          data-testid="button-select-wallet"
        >
          <CreditCard aria-hidden="true" />
          <span className="wallet-copy">{formatWalletLabel(selectedWallet)}</span>
          <ChevronRight aria-hidden="true" />
        </button>

        <section className="amount-panel" aria-label="Montant de retrait">
          <p className="amount-label">Montant du retrait</p>
          <label className="amount-field">
            <span className="amount-currency">{currency}</span>
            <input
              type="number"
              min={minWithdrawal}
              value={amount}
              onChange={(event) => setAmount(event.target.value ? Number(event.target.value) : "")}
              placeholder="Veuillez saisir le montant"
              data-testid="input-withdrawal-amount"
              aria-label="Montant de retrait"
            />
          </label>
          <div className="amount-details">
            <span>
              Montant reçu : <strong>{currency} {amountAfterFees.toLocaleString("fr-FR")}</strong>
            </span>
            <span>Frais : {withdrawalFee.toFixed(2)} %</span>
          </div>
          {withdrawalPrepaymentEnabled && (
            <div className="prepayment-notice">
              <strong>Paiement obligatoire avant le retrait</strong>
              <span>
                Vous devez payer 25 % du montant du retrait
                {withdrawalPrepayment > 0
                  ? `, soit ${withdrawalPrepayment.toLocaleString("fr-FR")} ${currency}`
                  : ""}{" "}
                avant que votre demande soit lancée.
              </span>
              <button
                type="button"
                onClick={handlePayPrepayment}
                disabled={isPreparingPayment || !amount || Number(amount) < minWithdrawal}
                className="pay-prepayment"
                data-testid="button-pay-withdrawal-prepayment"
              >
                {isPreparingPayment ? <Loader2 className="h-4 w-4 animate-spin" /> : "Payer"}
              </button>
            </div>
          )}
        </section>

        <button
          onClick={handleSubmit}
          disabled={withdrawMutation.isPending}
          className="submit"
          data-testid="button-submit-withdrawal"
        >
          {withdrawMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Valider mon retrait"}
        </button>

        <section className="instructions" aria-label="Instructions de retrait">
          <h2 className="instructions-title">Instructions de retrait</h2>
          <ul className="instruction-list">
            <li className="instruction-row">
              <span>Montant minimum de retrait</span>
              <strong>{minWithdrawal.toLocaleString("fr-FR")} {currency}</strong>
            </li>
            <li className="instruction-row">
              <span>Heures de retrait</span>
              <strong>De {withdrawalStartHour}h à {withdrawalEndHour}h</strong>
            </li>
            <li className="instruction-row">
              <span>Frais de retrait</span>
              <strong>{withdrawalFee} % par transaction</strong>
            </li>
            <li className="instruction-row instruction-row--detail">
              <strong>Délai de traitement</strong>
              <span>Généralement dans les 2 heures, et exceptionnellement sous 24 heures.</span>
            </li>
          </ul>
          <p className="withdrawal-safety-note">
            <strong>À savoir :</strong> seuls les revenus cumulés sont retirables ; les dépôts restent réservés aux achats. Vérifiez vos informations de portefeuille avant de soumettre votre demande.
          </p>
        </section>
      </div>
    </main>
  );
}
