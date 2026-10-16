import { CreditCard, ExternalLink, Loader2, QrCode, RefreshCw, ArrowLeft, Copy, CheckCircle2, Clock3 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { withCoteDIvoireWaveAmount } from "@/lib/wave-payment-link";

type PaymentMethod = "wave" | "card";
type DepositStatus = "pending" | "approved" | "rejected" | string;

type HostedPaymentCheckoutProps = {
  method: PaymentMethod;
  amount: number;
  currency: string;
  countryCode: string;
  countryName: string;
  operatorName: string;
  logoUrl?: string | null;
  paymentLink?: string | null;
  qrImageUrl?: string | null;
  paymentPhone?: string | null;
  ownerName?: string | null;
  phonePrefix: string;
  payerPhone: string;
  onPayerPhoneChange: (value: string) => void;
  transactionReference: string;
  onTransactionReferenceChange: (value: string) => void;
  onSubmitPayment: () => void;
  isSubmitting: boolean;
  submitted: boolean;
  status: DepositStatus;
  depositId?: number | null;
  secondsRemaining?: number;
  onRefreshStatus: () => void;
  isRefreshing: boolean;
  onCopyPaymentTarget: () => void;
  onBack: () => void;
  onViewHistory: () => void;
  onHome: () => void;
};

function safeHttpUrl(value?: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function formatRemaining(seconds?: number) {
  if (seconds === undefined) return "—:—";
  const safeSeconds = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safeSeconds / 60)).padStart(2, "0")}:${String(safeSeconds % 60).padStart(2, "0")}`;
}

export default function HostedPaymentCheckout({
  method,
  amount,
  currency,
  countryCode,
  countryName,
  operatorName,
  logoUrl,
  paymentLink,
  qrImageUrl,
  paymentPhone,
  ownerName,
  phonePrefix,
  payerPhone,
  onPayerPhoneChange,
  transactionReference,
  onTransactionReferenceChange,
  onSubmitPayment,
  isSubmitting,
  submitted,
  status,
  depositId,
  secondsRemaining,
  onRefreshStatus,
  isRefreshing,
  onCopyPaymentTarget,
  onBack,
  onViewHistory,
  onHome,
}: HostedPaymentCheckoutProps) {
  const checkoutUrl = safeHttpUrl(paymentLink);
  const checkoutClickUrl = withCoteDIvoireWaveAmount(checkoutUrl, amount, countryCode);
  const isWave = method === "wave";
  const accent = "#1947b8";
  const pale = "#edf2ff";
  const paymentConfigured = Boolean(checkoutUrl || (isWave && paymentPhone?.trim()));
  const displayAmount = amount.toLocaleString("fr-FR");

  return (
    <main className="min-h-[100dvh] bg-[#f6f4f5] text-[#25292d]">
      <div className="mx-auto min-h-[100dvh] w-full max-w-[520px] bg-[#f6f4f5] shadow-[0_0_30px_rgba(20,30,20,0.08)]">
        <header className="flex h-14 items-center gap-3 border-b border-black/5 bg-white px-4">
          {!submitted && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Retour au choix du moyen de paiement"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-gray-700 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2"
              style={{ "--tw-ring-color": accent } as React.CSSProperties}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold">{isWave ? "Paiement Wave" : "Paiement par carte"}</h1>
            <p className="truncate text-xs text-gray-500">{countryName} · {operatorName}</p>
          </div>
        </header>

        <section className="px-4 pb-5 pt-4 text-white" style={{ backgroundColor: accent }}>
          <div className="mx-auto flex min-h-[100px] max-w-[310px] items-center justify-center gap-3 rounded-xl border-2 border-white/70 bg-white px-4 py-3"
            style={{ color: accent }}>
            {isWave ? (
              <>
                <img src={logoUrl || "/operators/wave.png"} alt="Logo Wave" className="h-16 w-16 rounded-lg object-contain" />
                <span className="text-4xl font-extrabold tracking-tight">wave</span>
              </>
            ) : logoUrl ? (
              <img src={logoUrl} alt={`Logo ${operatorName}`} className="h-16 max-w-[200px] object-contain" />
            ) : (
              <>
                <CreditCard aria-hidden="true" className="h-12 w-12" />
                <span className="text-2xl font-extrabold tracking-wide">CARTE</span>
              </>
            )}
          </div>
          <div className="mt-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white/90">Montant à payer</p>
              <p className="mt-1 text-3xl font-extrabold leading-none">
                {displayAmount}<span className="ml-2 text-base font-bold">{currency}</span>
              </p>
            </div>
            <span className="pb-0.5 text-sm font-semibold text-white/90">{countryName}</span>
          </div>
        </section>

        <div className="space-y-4 px-3 py-4 sm:px-4">
          {!submitted ? (
            <>
              <section className="rounded-2xl border-2 border-[#17191c] border-t-[5px] border-t-[#1947b8] bg-white p-4 text-center shadow-[0_3px_0_#17191c] sm:p-5">
                <h2 className="text-lg font-bold leading-7 text-[#424a50]">
                  {checkoutUrl
                    ? isWave
                      ? "Ouvrez l’application Wave pour terminer le paiement"
                      : "Ouvrez la page sécurisée pour payer par carte"
                    : paymentPhone
                      ? "Envoyez le montant sur le compte ci-dessous"
                      : "Le lien de paiement sera ajouté ici"}
                </h2>

                {checkoutUrl ? (
                  <a
                    href={checkoutClickUrl || checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex min-h-[58px] items-center justify-center gap-2 rounded-full px-5 text-base font-bold text-white shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2"
                    style={{ backgroundColor: accent }}
                  >
                    <ExternalLink aria-hidden="true" className="h-5 w-5" />
                    {isWave ? "Ouvrir l’application Wave" : "Ouvrir le paiement par carte"}
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="mt-4 flex min-h-[58px] w-full items-center justify-center gap-2 rounded-full px-5 text-base font-bold text-white opacity-55"
                    style={{ backgroundColor: accent }}
                  >
                    <ExternalLink aria-hidden="true" className="h-5 w-5" />
                    {isWave ? "Lien Wave à configurer" : "Lien carte à configurer"}
                  </button>
                )}

                {paymentPhone && !checkoutUrl && (
                  <div className="mt-4 rounded-xl border border-gray-200 p-3 text-left">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Compte de paiement</p>
                    {ownerName && <p className="mt-1 font-semibold">{ownerName}</p>}
                    <p className="mt-1 font-mono text-lg font-bold">{paymentPhone}</p>
                    <button
                      type="button"
                      onClick={onCopyPaymentTarget}
                      className="mt-2 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border px-3 text-sm font-bold"
                      style={{ borderColor: accent, color: accent }}
                    >
                      <Copy aria-hidden="true" className="h-4 w-4" /> Copier le numéro
                    </button>
                  </div>
                )}

                <div className="mt-5 border-t border-gray-100 pt-5">
                  <p className="text-sm font-semibold leading-6 text-[#525a60]">
                    {checkoutUrl
                      ? qrImageUrl
                        ? "Scannez le QR Wave fourni ou ouvrez l’application Wave pour payer."
                        : "Scannez ce code avec un autre appareil pour ouvrir le lien de paiement."
                      : "Le QR code apparaîtra lorsque le lien de paiement sera configuré."}
                  </p>
                  <div className="mx-auto mt-3 grid min-h-[232px] w-full max-w-[280px] place-items-center overflow-hidden rounded-xl border-2 border-[#17191c] bg-white p-3">
                    {checkoutUrl ? (
                      qrImageUrl ? (
                        <img
                          src={qrImageUrl}
                          alt="QR code Wave fourni pour le paiement en Côte d’Ivoire"
                          className="h-auto max-h-[380px] w-full object-contain"
                        />
                      ) : (
                        <QRCodeSVG
                          value={checkoutUrl}
                          size={208}
                          level="M"
                          marginSize={2}
                          bgColor="#ffffff"
                          fgColor="#101820"
                          title="QR code pour ouvrir le lien de paiement"
                        />
                      )
                    ) : (
                      <div className="flex flex-col items-center gap-3 px-4 text-center text-gray-400">
                        <QrCode aria-hidden="true" className="h-16 w-16" />
                        <span className="text-sm font-medium">QR du prestataire non configuré</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    Après paiement, recopiez la référence affichée dans l’application ou sur le reçu.
                  </p>
                </div>
              </section>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  onSubmitPayment();
                }}
                className="space-y-4 rounded-2xl border-2 border-[#17191c] border-t-[5px] border-t-[#1947b8] bg-white p-4 shadow-[0_3px_0_#17191c] sm:p-5"
              >
                <div className="text-left">
                  <h2 className="text-lg font-bold leading-7 text-[#424a50]">Soumettre la preuve de paiement</h2>
                  <p className="mt-1 text-sm leading-5 text-gray-600">Saisissez le numéro payeur et la référence du SMS ou du reçu.</p>
                </div>

                <label className="block text-left text-sm font-semibold" htmlFor="hosted-payment-payer-phone">
                  Numéro utilisé pour payer
                  <span
                    className="mt-1.5 flex min-h-12 items-center rounded-xl border border-gray-300 px-3 font-normal outline-none transition focus-within:ring-2"
                    style={{ "--tw-ring-color": accent } as React.CSSProperties}
                  >
                    <span className="mr-3 shrink-0 border-r border-gray-200 pr-3 text-gray-500">+{phonePrefix}</span>
                    <input
                      id="hosted-payment-payer-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      required
                    disabled={!paymentConfigured}
                      value={payerPhone}
                      onChange={(event) => onPayerPhoneChange(event.target.value)}
                      placeholder="Numéro Mobile Money"
                      className="min-w-0 flex-1 bg-transparent text-base outline-none"
                    />
                  </span>
                </label>

                <label className="block text-left text-sm font-semibold" htmlFor="hosted-payment-reference">
                  Référence de transaction
                  <input
                    id="hosted-payment-reference"
                    type="text"
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    required
                    disabled={!paymentConfigured}
                    maxLength={120}
                    value={transactionReference}
                    onChange={(event) => onTransactionReferenceChange(event.target.value)}
                    placeholder="Référence du SMS ou du reçu"
                    className="mt-1.5 min-h-12 w-full rounded-xl border border-gray-300 px-3 text-base font-normal outline-none transition focus:ring-2"
                    style={{ "--tw-ring-color": accent } as React.CSSProperties}
                  />
                </label>

                <button
                  type="submit"
                  disabled={!paymentConfigured || isSubmitting || !payerPhone.trim() || !transactionReference.trim()}
                  className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl px-4 text-base font-bold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ backgroundColor: accent }}
                >
                  {isSubmitting ? <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" /> : "Soumettre le paiement"}
                </button>
                <p className="text-center text-xs leading-5 text-gray-500">
                  {paymentConfigured
                    ? "Le dépôt reste en attente jusqu’à sa vérification. Le solde n’est pas crédité avant validation."
                    : "La soumission sera activée après configuration du lien de paiement."}
                </p>
              </form>
            </>
          ) : (
            <>
              <section className="rounded-2xl border-2 border-[#17191c] border-t-[5px] border-t-[#1947b8] bg-white p-5 shadow-[0_3px_0_#17191c]">
                <div className="text-center">
                  {status === "approved" ? (
                    <CheckCircle2 className="mx-auto h-14 w-14" style={{ color: accent }} />
                  ) : status === "rejected" ? (
                    <CreditCard className="mx-auto h-14 w-14 text-red-500" />
                  ) : (
                    <Clock3 className="mx-auto h-14 w-14" style={{ color: accent }} />
                  )}
                  <h2 className="mt-3 text-xl font-bold">
                    {status === "approved"
                      ? "Paiement confirmé"
                      : status === "rejected"
                        ? "Paiement refusé"
                        : "En attente de vérification"}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {status === "approved"
                      ? "Votre dépôt a été approuvé."
                      : status === "rejected"
                        ? "Le dépôt n’a pas été approuvé. Consultez l’historique ou contactez le service client."
                        : "Votre demande est enregistrée. Le délai affiché sert au suivi et ne confirme pas le paiement."}
                  </p>
                </div>

                {status === "pending" && (
                  <div className="mt-5 rounded-xl p-4 text-center" style={{ backgroundColor: pale }}>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-600">Temps de suivi restant</p>
                    <p className="mt-1 font-mono text-5xl font-semibold tabular-nums" style={{ color: accent }}>
                      {formatRemaining(secondsRemaining)}
                    </p>
                  </div>
                )}

                <div className="mt-5 space-y-2 rounded-xl border border-gray-200 p-4 text-sm">
                  <div className="flex justify-between gap-4"><span className="text-gray-500">Méthode</span><strong className="text-right">{operatorName}</strong></div>
                  <div className="flex justify-between gap-4"><span className="text-gray-500">Montant</span><strong>{displayAmount} {currency}</strong></div>
                  <div className="flex justify-between gap-4"><span className="text-gray-500">Numéro payeur</span><strong className="text-right">{payerPhone}</strong></div>
                  <div>
                    <span className="text-gray-500">Référence</span>
                    <p className="mt-1 break-all font-mono font-semibold">{transactionReference}</p>
                  </div>
                  {depositId && (
                    <div className="flex justify-between gap-4"><span className="text-gray-500">Demande</span><strong>#{depositId}</strong></div>
                  )}
                </div>

                {status === "pending" && (
                  <button
                    type="button"
                    onClick={onRefreshStatus}
                    disabled={!depositId || isRefreshing}
                    className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 px-4 font-bold disabled:opacity-60"
                    style={{ borderColor: accent, color: accent }}
                  >
                    <RefreshCw aria-hidden="true" className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    Actualiser le statut
                  </button>
                )}
              </section>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={onViewHistory} className="min-h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm font-bold">
                  Voir mes dépôts
                </button>
                <button type="button" onClick={onHome} className="min-h-12 rounded-xl px-3 text-sm font-bold text-white" style={{ backgroundColor: accent }}>
                  Retour à l’accueil
                </button>
              </div>
            </>
          )}

          <footer className="pb-3 pt-1 text-center text-xs text-gray-500">
            {checkoutUrl
              ? `Lien de paiement fourni pour ${operatorName}.`
              : "Lien et QR de paiement en attente de configuration."}
          </footer>
        </div>
      </div>
    </main>
  );
}
