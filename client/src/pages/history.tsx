import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCountryByCode } from "@/lib/countries";
import { ChevronLeft, ChevronRight, Loader2, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { withProcessingIndicator } from "@/lib/queryClient";
import { formatPublicTransactionId } from "@shared/public-transaction-id";

import nodataImg from "@assets/nodata-da225bbb_(1)_1783249133513.png";

interface Deposit {
  id: number;
  userId: number;
  amount: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  publicReference?: string;
  canVerifyPayment?: boolean;
  soleaspayReference?: string;
  soleaspayOrderId?: string;
  reference?: string;
  inpayOrderNumber?: string;
  inpayOutTradeNo?: string;
  omnipayId?: string;
  omnipayReference?: string;
  sendavapayReference?: string;
  westpayReference?: string;
  ashtechReference?: string;
  ashtechTransactionId?: string;
}

interface Withdrawal {
  id: number;
  userId: number;
  amount: string;
  netAmount: string;
  status: string;
  createdAt: string;
  publicReference?: string;
  sendavapayReference?: string;
  inpayOrderNumber?: string;
  inpayOutTradeNo?: string;
  omnipayId?: string;
  omnipayReference?: string;
}

type ActiveTab = "deposits" | "withdrawals";

const CARD_ORANGE = "#bd304c";
const CARD_DARK = "#111827";
const CARD_SUCCESS = "#16a34a";
const CARD_BACKGROUND = "#fff0f3";

const getDepositProviderRef = (deposit: Deposit) =>
  deposit.inpayOutTradeNo ||
  deposit.inpayOrderNumber ||
  deposit.sendavapayReference ||
  deposit.omnipayReference ||
  deposit.omnipayId ||
  deposit.soleaspayReference ||
  deposit.soleaspayOrderId ||
  deposit.westpayReference ||
  deposit.ashtechReference ||
  deposit.ashtechTransactionId ||
  deposit.reference ||
  "";

const getWithdrawalProviderRef = (withdrawal: Withdrawal) =>
  withdrawal.inpayOutTradeNo ||
  withdrawal.inpayOrderNumber ||
  withdrawal.omnipayReference ||
  withdrawal.omnipayId ||
  withdrawal.sendavapayReference ||
  "";

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
};

const formatReceiptDateTime = (dateString: string) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
  const formattedTime = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
  return `${formattedDate}, ${formattedTime}`;
};

const getStatusInfo = (status: string) => {
  switch (status) {
    case "completed":
    case "approved":
      return { label: "Réussi", color: CARD_SUCCESS };
    case "rejected":
      return { label: "Paiement échoué", color: "#b42318" };
    case "processing":
      return { label: "En traitement", color: "#bd304c" };
    default:
      return { label: "En attente...", color: "#bd304c" };
  }
};

const getWithdrawalStatusInfo = (status: string) => {
  const info = getStatusInfo(status);
  if (status === "completed" || status === "approved") {
    return { label: "Succès", color: "#bd304c" };
  }
  return info;
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="history-row">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const Status = ({ label, color }: { label: string; color: string }) => (
  <span className="history-status" style={{ backgroundColor: color }}>
    {label}
  </span>
);

export default function HistoryPage() {
  const { user, refreshUser } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<ActiveTab>("withdrawals");
  const [verifyingId, setVerifyingId] = useState<number | null>(null);

  const isAdmin = !!(user as any)?.isAdmin;
  const countryInfo = user ? getCountryByCode(user.country) : null;
  const currency = countryInfo?.currency === "XOF" || countryInfo?.currency === "XAF"
    ? "FCFA"
    : countryInfo?.currency || "FCFA";

  const { data: deposits = [], isLoading: depositsLoading } = useQuery<Deposit[]>({
    queryKey: ["/api/deposits/history"],
  });

  const { data: withdrawals = [], isLoading: withdrawalsLoading } = useQuery<Withdrawal[]>({
    queryKey: ["/api/withdrawals/history"],
  });

  const isPendingDeposit = (deposit: Deposit) =>
    (deposit.status === "pending" || deposit.status === "processing") &&
    (Boolean(deposit.canVerifyPayment) ||
      Boolean(
        isAdmin &&
          !deposit.sendavapayReference &&
          (deposit.soleaspayReference ||
            deposit.soleaspayOrderId ||
            deposit.omnipayId ||
            deposit.omnipayReference),
      ));

  const handleVerify = async (depositId: number) => {
    setVerifyingId(depositId);
    try {
      await withProcessingIndicator(async () => {
        const response = await fetch(`/api/deposits/${depositId}/verify`, { credentials: "include" });
        const data = await response.json();
        if (data.status === "approved") {
          toast({ title: "Paiement confirmé", description: "Votre compte a été crédité" });
          refreshUser();
          queryClient.invalidateQueries({ queryKey: ["/api/deposits/history"] });
        } else if (data.status === "rejected") {
          toast({ title: "Paiement échoué", description: "Le paiement a été refusé", variant: "destructive" });
          queryClient.invalidateQueries({ queryKey: ["/api/deposits/history"] });
        } else {
          toast({ title: "En cours", description: "Le paiement est toujours en attente" });
        }
      });
    } catch {
      toast({ title: "Vérification du paiement impossible", description: "Impossible de vérifier le paiement", variant: "destructive" });
    } finally {
      setVerifyingId(null);
    }
  };

  if (!user) return null;

  const isLoading = activeTab === "deposits" ? depositsLoading : withdrawalsLoading;

  return (
    <main className="history-page">
      <style>{`
        .history-page {
          width: 100%;
          min-height: 100dvh;
          overflow-x: hidden;
          background: #fff;
          color: #111827;
          font-family: Arial, sans-serif;
        }
        .history-page *,
        .history-page *::before,
        .history-page *::after {
          box-sizing: border-box;
        }
        .history-screen {
          width: 100%;
          max-width: 512px;
          min-height: 100dvh;
          margin: 0 auto;
          background: #fff;
        }
        .history-header {
          position: relative;
          display: flex;
          min-height: 78px;
          align-items: center;
          padding: 17px 16px;
          border-bottom: 2px solid #111827;
        }
        .history-back {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 2px solid #111827;
          border-radius: 11px;
          padding: 0;
          background: #fff;
          box-shadow: 0 3px 0 #111827;
          color: #111827;
          cursor: pointer;
        }
        .history-back svg {
          width: 22px;
          height: 22px;
          stroke-width: 2.5;
        }
        .history-title {
          position: absolute;
          right: 70px;
          left: 70px;
          margin: 0;
          color: #111827;
          font-size: 20px;
          font-weight: 800;
          line-height: 1.2;
          text-align: center;
        }
        .history-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          align-items: center;
          min-height: 78px;
          padding: 12px 16px 16px;
          border-bottom: 2px solid #111827;
        }
        .history-tab {
          display: flex;
          min-width: 0;
          height: 46px;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border: 2px solid #111827;
          border-radius: 11px;
          padding: 0 8px;
          background: #ffffff;
          box-shadow: 0 3px 0 #111827;
          color: #111827;
          font-size: 14px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
        }
        .history-tab.active {
          background: #bd304c;
          color: #ffffff;
          font-weight: 700;
        }
        .history-tab-arrow {
          width: 17px;
          height: 17px;
          color: #111827;
          stroke-width: 2.8;
        }
        .history-tab-arrow.left {
          transform: rotate(180deg);
        }
        .history-content {
          min-height: calc(100dvh - 156px);
          padding: 18px 16px 40px;
          background: #fff0f3;
        }
        .history-list {
          display: grid;
          gap: 16px;
        }
        .history-card {
          position: relative;
          width: 100%;
          min-height: 154px;
          overflow: hidden;
          border: 2px solid #111827;
          border-radius: 12px;
          padding: 0 16px 16px;
          background: #ffffff;
          box-shadow: 0 4px 0 #111827, 0 8px 16px rgba(17, 24, 39, .12);
        }
        .withdrawal-receipt-card {
          min-height: 0;
          padding: 0 16px 16px;
          border-color: #17191c;
          border-radius: 15px;
          box-shadow: 0 4px 0 #17191c, 0 9px 18px rgba(17, 24, 39, .14);
        }
        .withdrawal-receipt-header {
          display: flex;
          min-height: 64px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin: 0 -16px;
          border-bottom: 1.5px solid #e8cbd1;
          padding: 12px 16px;
          background: #ffffff;
        }
        .withdrawal-receipt-reference {
          min-width: 0;
          margin: 0;
          color: #252327;
          font-size: 15px;
          font-weight: 800;
          line-height: 1.25;
          overflow-wrap: anywhere;
        }
        .withdrawal-receipt-status {
          display: inline-flex;
          min-height: 31px;
          align-items: center;
          flex: 0 0 auto;
          border: 1.5px solid #17191c;
          border-radius: 999px;
          padding: 0 10px;
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          line-height: 1;
          white-space: nowrap;
        }
        .withdrawal-receipt-rows {
          display: grid;
          gap: 10px;
          padding-top: 13px;
        }
        .withdrawal-receipt-card .history-row {
          min-height: 22px;
          justify-content: flex-start;
          gap: 9px;
          font-size: 14px;
          line-height: 1.35;
        }
        .withdrawal-receipt-card .history-row > span:first-child {
          flex: 0 0 86px;
          color: #6d6970;
          font-weight: 600;
        }
        .withdrawal-receipt-card .history-row > span:last-child {
          min-width: 0;
          color: #92263d;
          font-weight: 800;
          text-align: left;
          white-space: normal;
          overflow-wrap: anywhere;
        }
        .withdrawal-receipt-card .history-row:last-child > span:last-child {
          color: #252327;
          font-weight: 600;
        }
        .history-card-top {
          display: flex;
          min-height: 76px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin: 0 -16px;
          padding: 14px 16px 13px;
          border-bottom: 2px solid #111827;
          background: ${CARD_ORANGE};
        }
        .history-amount {
          margin: 0;
          color: #111827;
          font-size: 19px;
          font-weight: 800;
          line-height: 1.15;
        }
        .history-card-label {
          margin: 6px 0 0;
          color: #111827;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.15;
        }
        .history-status {
          display: inline-flex;
          min-height: 34px;
          align-items: center;
          flex: 0 0 auto;
          border: 2px solid #111827;
          border-radius: 11px;
          padding: 0 11px;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
        }
        .history-divider {
          height: 0;
          margin: 14px 0 9px;
          border-top: 2px dashed #9ca3af;
        }
        .history-row {
          display: flex;
          min-height: 21px;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #111827;
          font-size: 14px;
          line-height: 1.2;
        }
        .history-row > span:first-child {
          color: #4b5563;
          font-weight: 700;
        }
        .history-row > span:last-child {
          text-align: right;
          white-space: nowrap;
        }
        .history-empty {
          display: flex;
          min-height: 320px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0 4px 0 #111827;
          color: #4b5563;
          font-size: 14px;
        }
        .history-empty img {
          width: 112px;
          height: 112px;
          object-fit: contain;
        }
        .history-verify {
          width: 100%;
          margin-top: 10px;
          min-height: 44px;
          border: 2px solid #111827;
          border-radius: 11px;
          padding: 9px 12px;
          background: ${CARD_ORANGE};
          box-shadow: 0 3px 0 #111827;
          color: #111827;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }
        .history-verify:disabled { cursor: wait; opacity: .7; }
        @media (max-width: 370px) {
          .history-header { height: 62px; padding-top: 6px; }
          .history-title { font-size: 19px; }
          .history-tabs { min-height: 58px; padding-bottom: 11px; }
          .history-tab { font-size: 14px; }
          .history-content { min-height: calc(100dvh - 120px); padding-right: 16px; padding-left: 16px; }
           .history-card { padding-right: 18px; padding-left: 18px; }
          .withdrawal-receipt-card { padding-right: 14px; padding-left: 14px; }
          .withdrawal-receipt-header { margin-right: -14px; margin-left: -14px; padding-right: 14px; padding-left: 14px; }
          .withdrawal-receipt-reference { font-size: 13px; }
          .withdrawal-receipt-card .history-row > span:first-child { flex-basis: 78px; }
          .history-card-label { font-size: 15px; }
          .history-status { font-size: 12px; padding-right: 8px; padding-left: 8px; }
          .history-row { font-size: 13px; }
        }
      `}</style>

      <div className="history-screen">
        <header className="history-header">
          <Link href="/account">
            <button className="history-back" data-testid="button-back" aria-label="Retour">
              <ChevronLeft aria-hidden="true" />
            </button>
          </Link>
          <h1 className="history-title">Enregistrements de fonds</h1>
        </header>

        <nav className="history-tabs" aria-label="Type d'enregistrement">
          <button
            className={`history-tab ${activeTab === "deposits" ? "active" : ""}`}
            onClick={() => setActiveTab("deposits")}
            data-testid="tab-deposits"
          >
            <span>Dépôt</span>
            <ChevronRight className={`history-tab-arrow ${activeTab === "deposits" ? "right" : "left"}`} aria-hidden="true" />
          </button>
          <button
            className={`history-tab ${activeTab === "withdrawals" ? "active" : ""}`}
            onClick={() => setActiveTab("withdrawals")}
            data-testid="tab-withdrawals"
          >
            <span>Retrait</span>
            <ChevronRight className="history-tab-arrow right" aria-hidden="true" />
          </button>
        </nav>

        <section className="history-content" aria-live="polite">
          {isLoading ? (
            <div className="history-empty">
              <Loader2 className="animate-spin" />
            </div>
          ) : activeTab === "deposits" ? (
            deposits.length > 0 ? (
              <div className="history-list">
                {deposits.map((deposit) => {
                  const { label, color } = getStatusInfo(deposit.status);
                  const amount = Number.parseFloat(deposit.amount);
                  const providerReference = getDepositProviderRef(deposit);
                  return (
                    <article className="history-card" key={deposit.id} data-testid={`deposit-item-${deposit.id}`}>
                      <div className="history-card-top">
                        <div>
                          <p className="history-amount">{currency} {amount.toLocaleString("fr-FR")}</p>
                          <p className="history-card-label">Montant du dépôt</p>
                        </div>
                        <Status label={label} color={color} />
                      </div>
                      <div className="history-divider" />
                      <Row label="ID transaction :" value={deposit.publicReference || formatPublicTransactionId("D", deposit.id)} />
                      {isAdmin && providerReference ? (
                        <Row
                          label="Référence paiement :"
                          value={providerReference}
                        />
                      ) : null}
                      <Row label="Heure du dépôt :" value={formatDateTime(deposit.createdAt)} />
                      {isPendingDeposit(deposit) ? (
                        <button
                          className="history-verify"
                          onClick={() => handleVerify(deposit.id)}
                          disabled={verifyingId === deposit.id}
                          data-testid={`button-verify-${deposit.id}`}
                        >
                          {verifyingId === deposit.id ? <Loader2 className="inline animate-spin" /> : <RefreshCw className="mr-1 inline h-3 w-3" />}
                          Vérifier la transaction
                        </button>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="history-empty">
                <img src={nodataImg} alt="Aucune donnée" />
                <span>Plus de données</span>
              </div>
            )
          ) : withdrawals.length > 0 ? (
            <div className="history-list">
              {withdrawals.map((withdrawal) => {
                const { label, color } = getWithdrawalStatusInfo(withdrawal.status);
                const gross = Number.parseFloat(withdrawal.amount);
                const net = Number.parseFloat(withdrawal.netAmount || withdrawal.amount);
                const providerReference = getWithdrawalProviderRef(withdrawal);
                return (
                  <article className="history-card withdrawal-receipt-card" key={withdrawal.id} data-testid={`withdrawal-item-${withdrawal.id}`}>
                    <div className="withdrawal-receipt-header">
                      <p className="withdrawal-receipt-reference">
                        {withdrawal.publicReference || formatPublicTransactionId("R", withdrawal.id)}
                      </p>
                      <span className="withdrawal-receipt-status" style={{ backgroundColor: color }}>
                        {label}
                      </span>
                    </div>
                    <div className="withdrawal-receipt-rows">
                      <Row label="Montant :" value={`${gross.toLocaleString("fr-FR")} ${currency}`} />
                      <Row label="Reçu :" value={`${net.toLocaleString("fr-FR")} ${currency}`} />
                      <Row label="Date :" value={formatReceiptDateTime(withdrawal.createdAt)} />
                      {isAdmin && providerReference ? (
                        <Row
                          label="Référence paiement :"
                          value={providerReference}
                        />
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="history-empty">
              <img src={nodataImg} alt="Aucune donnée" />
              <span>Plus de données</span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}