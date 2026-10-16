import { useEffect, useState } from "react";
import { ArrowLeft, Check, CheckCircle2, ChevronDown, Clock3, Download, ExternalLink, Globe2, Info, QrCode, ShieldCheck, Smartphone, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { withCoteDIvoireWaveAmount } from "@/lib/wave-payment-link";
import catlLogo from "@/assets/images/catl-logo.png";

type WaveOperator = {
  id?: string;
  name?: string;
  manualNumber?: {
    logoUrl?: string | null;
    phone?: string | null;
    paymentLink?: string | null;
    ownerName?: string | null;
  };
};

type CiWaveDepositProps = {
  amount: number;
  currency: string;
  step: number;
  selectedOperator: WaveOperator | null;
  phone: string;
  phonePrefix: string;
  onPhoneChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
  submitted: boolean;
  status: string;
  depositId?: number | null;
  secondsRemaining?: number;
  paymentLink?: string | null;
  qrImageUrl?: string | null;
  paymentPhone?: string | null;
  transactionReference: string;
  onTransactionReferenceChange: (value: string) => void;
  onSubmitPayment: () => void;
  isSubmitting: boolean;
  onRefreshStatus: () => void;
  isRefreshing: boolean;
  onViewHistory: () => void;
  onHome: () => void;
};

function formatTime(seconds = 0) {
  const safe = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

const copyByLanguage = {
  fr: {
    secureDeposit: "Dépôt sécurisé",
    country: "Côte d’Ivoire",
    countryCode: "+225",
    waveLogoAlt: "Logo Wave",
    languageButton: "Français",
    languageShort: "FR",
    languageAria: "Passer en anglais",
    indicative: "Indicatif",
    close: "Fermer",
    back: "Retour",
    paymentAmount: "Montant du paiement",
    payerNumber: "Numéro du payeur",
    phonePlaceholder: "Votre numéro Wave",
    phoneHint: "Veuillez saisir correctement les 10 chiffres de votre numéro Wave pour que votre paiement soit associé au bon compte.",
    submit: "Soumettre",
    secureTitle: "Paiement sécurisé protégé",
    secureBody: "Vos informations de paiement sont protégées. Vérifiez les détails avant de poursuivre.",
    approved: "Paiement confirmé",
    rejected: "Paiement refusé",
    requestSent: "Demande envoyée",
    approvedBody: "Votre dépôt a été approuvé.",
    rejectedBody: "Le dépôt n’a pas été approuvé. Consultez votre historique pour plus d’informations.",
    pendingBody: "Votre paiement est en cours de vérification. Votre solde sera crédité après validation.",
    operator: "Opérateur",
    amount: "Montant",
    request: "Demande",
    transactionReference: "Numéro de transaction",
    waiting: "En attente de validation",
    approvedStatus: "Dépôt approuvé",
    rejectedStatus: "Dépôt refusé",
    refresh: "Actualiser le statut",
    refreshing: "Actualisation…",
    history: "Mes dépôts",
    home: "Accueil",
    openApp: "Ouvrir l’application",
    scanQr: "Scanner le code QR",
    openWaveInfo: "Ouvrez Wave et confirmez le montant affiché. Revenez ensuite ici pour saisir votre référence de transaction.",
    payWith: "Payer avec",
    openAppInstructions: "Appuyez ci-dessous pour ouvrir l’application et compléter votre transaction.",
    openAppToPay: "Ouvrir l’application pour payer",
    paymentLinkMissing: "Le lien de paiement Wave n’est pas configuré.",
    returnAfterPayment: "Après le paiement, revenez sur cette page pour envoyer votre numéro de transaction.",
    completedTransfer: "Si le transfert est terminé, saisissez la référence figurant sur le reçu ou le SMS pour envoyer votre demande.",
    scanInstructions: "Scannez le code avec Wave sur un autre téléphone, puis confirmez le paiement.",
    qrAlt: "Code QR Wave pour le paiement en Côte d’Ivoire",
    qrMissing: "Code QR de paiement non configuré",
    qrReferenceInfo: "Après le paiement, entrez le numéro de transaction ci-dessous pour envoyer la demande de vérification.",
    transactionInstructions: "Saisissez la référence reçue dans Wave après le paiement.",
    sendForReview: "Envoyer pour vérification",
    sending: "Envoi en cours…",
    pendingNotice: "Le dépôt reste en attente jusqu’à sa vérification. Le solde n’est crédité qu’après validation.",
    downloadQr: "Enregistrer le code QR",
  },
  en: {
    secureDeposit: "Secure deposit",
    country: "Ivory Coast",
    countryCode: "+225",
    waveLogoAlt: "Wave logo",
    languageButton: "English",
    languageShort: "EN",
    languageAria: "Switch to French",
    indicative: "Indicative",
    close: "Close",
    back: "Back",
    paymentAmount: "Payment amount",
    payerNumber: "Payer phone number",
    phonePlaceholder: "Your Wave number",
    phoneHint: "Enter all 10 digits of your Wave number correctly so your payment is linked to the right account.",
    submit: "Submit",
    secureTitle: "Secure payment protected",
    secureBody: "Your payment details are protected. Check the information before continuing.",
    approved: "Payment confirmed",
    rejected: "Payment declined",
    requestSent: "Request submitted",
    approvedBody: "Your deposit has been approved.",
    rejectedBody: "The deposit was not approved. Check your history for more information.",
    pendingBody: "Your payment is being reviewed. Your balance will be credited after approval.",
    operator: "Payment method",
    amount: "Amount",
    request: "Request",
    transactionReference: "Transaction number",
    waiting: "Awaiting review",
    approvedStatus: "Deposit approved",
    rejectedStatus: "Deposit declined",
    refresh: "Refresh status",
    refreshing: "Refreshing…",
    history: "My deposits",
    home: "Home",
    openApp: "Open the app",
    scanQr: "Scan QR code",
    openWaveInfo: "Open Wave and confirm the amount shown. Return here afterward to enter your transaction number.",
    payWith: "Pay with",
    openAppInstructions: "Tap below to open the app and complete your transaction.",
    openAppToPay: "Open the app to pay",
    paymentLinkMissing: "The Wave payment link is not configured.",
    returnAfterPayment: "After paying, return to this page to submit your transaction number.",
    completedTransfer: "If the transfer is complete, enter the reference from your receipt or SMS to submit your request.",
    scanInstructions: "Scan this code with Wave on another phone, then confirm the payment.",
    qrAlt: "Wave payment QR code for Côte d’Ivoire",
    qrMissing: "Payment QR code is not configured",
    qrReferenceInfo: "After paying, enter the transaction number below to submit your request for review.",
    transactionInstructions: "Enter the transaction reference shown in Wave after payment.",
    sendForReview: "Submit for review",
    sending: "Submitting…",
    pendingNotice: "The deposit stays pending until it is reviewed. The balance is credited only after approval.",
    downloadQr: "Save QR code",
  },
} as const;

export default function CiWaveDeposit({
  amount, currency, step, selectedOperator, phone, phonePrefix, onPhoneChange,
  onContinue, onBack, submitted, status, depositId, secondsRemaining,
  paymentLink, qrImageUrl, paymentPhone, transactionReference,
  onTransactionReferenceChange, onSubmitPayment, isSubmitting, onRefreshStatus,
  isRefreshing, onViewHistory, onHome,
}: CiWaveDepositProps) {
  const [view, setView] = useState<"app" | "qr">("app");
  const [language, setLanguage] = useState<keyof typeof copyByLanguage>("fr");
  const [indicativeSeconds, setIndicativeSeconds] = useState(30 * 60);
  const copy = copyByLanguage[language];
  const displayAmount = amount.toLocaleString(language === "fr" ? "fr-FR" : "en-US");
  const selectedName = selectedOperator?.name || "Wave";
  useEffect(() => {
    const countdown = window.setInterval(() => {
      setIndicativeSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearInterval(countdown);
  }, []);
  const safeLink = (() => {
    if (!paymentLink) return null;
    try {
      const url = new URL(paymentLink);
      return url.protocol === "https:" ? url.toString() : null;
    } catch {
      return null;
    }
  })();
  const appLink = withCoteDIvoireWaveAmount(safeLink, amount, "CI");
  const downloadQr = () => {
    if (qrImageUrl) {
      const anchor = document.createElement("a");
      anchor.href = qrImageUrl;
      anchor.download = "catl-wave-ci-qr.jpg";
      anchor.click();
      return;
    }
    if (!safeLink) return;
    const svg = document.querySelector("#ci-wave-qr svg");
    if (!svg) return;
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "catl-wave-ci-qr.svg";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <main
      className="min-h-[100dvh] px-3 py-5 text-[#263342] sm:px-5 sm:py-10"
      style={{ background: step === 0 ? "linear-gradient(180deg, #ee9a59 0%, #df9053 52%, #ec9958 100%)" : "linear-gradient(135deg, #ee9a59 0%, #32859d 100%)" }}
    >
      <div className="mx-auto w-full max-w-[480px] overflow-hidden rounded-[22px] border-2 border-white bg-white shadow-[0_18px_55px_rgba(25,45,65,0.3)]">
        <header className="flex items-center justify-between border-b border-[#edf0f3] px-4 py-3.5 sm:px-6">
          <div className="flex min-w-0 flex-col">
            <img src={catlLogo} alt="CATL" className="h-7 w-auto max-w-[100px] object-contain" />
            <span className="mt-0.5 flex items-center gap-1 text-[10px] font-bold leading-3 text-[#52647a]"><span aria-hidden="true">🇨🇮</span>{copy.country} · {copy.countryCode}</span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {!submitted && <div className="flex min-w-12 flex-col items-center rounded-lg bg-white px-1.5 py-1 text-[#ee9a59] shadow-[0_3px_10px_rgba(20,30,50,0.12)]" aria-label={`${copy.indicative} ${formatTime(indicativeSeconds)}`}>
              <span className="font-mono text-xs font-extrabold tabular-nums">{formatTime(indicativeSeconds)}</span>
              <span className="text-[8px] font-bold uppercase leading-3">{copy.indicative}</span>
            </div>}
            <button
              type="button"
              onClick={() => setLanguage((current) => current === "fr" ? "en" : "fr")}
              aria-label={copy.languageAria}
              title={copy.languageAria}
              className="flex min-h-9 items-center gap-1 rounded-full border border-[#d5dce4] bg-white px-2 text-xs font-bold text-[#52647a] hover:border-[#178ebd] hover:bg-[#f5fbfe] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd]"
            >
              <Globe2 className="h-4 w-4 text-[#178ebd]" aria-hidden="true" />
              <span className="hidden min-[380px]:inline">{copy.languageButton}</span>
              <span className="min-[380px]:hidden">{copy.languageShort}</span>
              <ChevronDown className="h-3 w-3" aria-hidden="true" />
            </button>
            {!submitted && (
              <button type="button" onClick={onBack} aria-label={step === 0 ? copy.close : copy.back} className="grid h-9 w-9 place-items-center rounded-full bg-[#263342] text-white hover:bg-[#3d4b5c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd]">
                {step === 0 ? <X className="h-4 w-4" aria-hidden="true" /> : <ArrowLeft className="h-5 w-5" aria-hidden="true" />}
              </button>
            )}
          </div>
        </header>

        {step === 0 && !submitted ? (
          <section className="space-y-5 px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between rounded-xl border-2 border-[#d5dce4] bg-[#f7f8fa] px-4 py-3 shadow-sm">
              <span className="text-sm font-semibold text-[#687586]">{copy.paymentAmount}</span>
              <strong className="text-base font-extrabold text-[#ee9a59]">FCFA {displayAmount}</strong>
            </div>
            <div className="space-y-2.5">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-white bg-white shadow-[0_4px_14px_rgba(23,139,198,0.28)]">
                <img src="/operators/wave-brand.png" alt={copy.waveLogoAlt} className="h-full w-full rounded-full object-contain" />
              </div>
              <div className="flex min-h-[52px] items-center justify-center rounded-xl border-2 border-[#ee9a59] bg-[#efa266] px-4 text-base font-bold text-white shadow-[0_4px_12px_rgba(238,154,89,0.32)]">
                <span>{selectedName}</span>
                <span className="ml-auto grid h-7 w-7 place-items-center rounded-full bg-white text-[#ee9a59] shadow-sm"><Check className="h-4 w-4" aria-hidden="true" /></span>
              </div>
            </div>
            <label htmlFor="ci-wave-phone" className="block text-sm font-semibold text-[#344258]">
              {copy.payerNumber}
                <span className="mt-1.5 flex min-h-[54px] items-center rounded-xl border-2 border-[#d4b18d] bg-white px-3 focus-within:border-[#178ebd] focus-within:ring-2 focus-within:ring-[#178ebd]/20">
                <span className="mr-3 shrink-0 border-r border-[#e1e5ea] pr-3 font-semibold text-[#738094]">+{phonePrefix}</span>
                <input id="ci-wave-phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={phone} onChange={(event) => onPhoneChange(event.target.value)} className="min-w-0 flex-1 bg-transparent text-base text-[#263342] outline-none" placeholder={copy.phonePlaceholder} />
              </span>
            </label>
            <p className="rounded-lg bg-[#fff4ef] px-3 py-2.5 text-sm font-semibold leading-5 text-[#c75348]">{copy.phoneHint}</p>
            <button type="button" onClick={onContinue} disabled={!selectedOperator || phone.replace(/\D/g, "").length !== 10} className="flex min-h-[54px] w-full items-center justify-center rounded-xl bg-[#ee9a59] px-4 text-base font-bold text-white shadow-[0_4px_10px_rgba(0,0,0,0.16)] transition hover:bg-[#df9053] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ee9a59]/40 disabled:cursor-not-allowed disabled:opacity-100">
              {copy.submit}
            </button>
            <div className="flex items-center gap-3 rounded-xl bg-[#1d86e3] px-4 py-3.5 text-white shadow-[0_4px_12px_rgba(29,134,227,0.24)]">
              <ShieldCheck className="h-6 w-6 shrink-0" aria-hidden="true" />
              <div><p className="text-sm font-bold">{copy.secureTitle}</p><p className="mt-0.5 text-xs leading-4 text-white/95">{copy.secureBody}</p></div>
            </div>
          </section>
        ) : submitted ? (
          <section className="px-4 py-7 sm:px-6 sm:py-9">
            <div className="text-center">
              <span className="mx-auto grid h-[68px] w-[68px] place-items-center rounded-full bg-[#fff0e2] text-[#ee9951]"><CheckCircle2 className="h-10 w-10" aria-hidden="true" /></span>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#b4794b]">Wave · {copy.country}</p>
              <h1 className="mt-1 text-2xl font-extrabold text-[#25344a]">
                {status === "approved" ? copy.approved : status === "rejected" ? copy.rejected : copy.requestSent}
              </h1>
              <p className="mx-auto mt-2 max-w-[330px] text-sm leading-6 text-[#687586]">
                {status === "approved"
                  ? copy.approvedBody
                  : status === "rejected"
                    ? copy.rejectedBody
                    : copy.pendingBody}
              </p>
            </div>
            <div className="mt-6 space-y-3 rounded-xl border border-[#e5e9ef] bg-[#fafbfc] p-4">
              <div className="flex justify-between gap-4 text-sm"><span className="text-[#798596]">{copy.operator}</span><strong>{selectedName}</strong></div>
              <div className="flex justify-between gap-4 border-t border-[#e7ebef] pt-3 text-sm"><span className="text-[#798596]">{copy.amount}</span><strong>{displayAmount} {currency}</strong></div>
              {depositId && <div className="flex justify-between gap-4 border-t border-[#e7ebef] pt-3 text-sm"><span className="text-[#798596]">{copy.request}</span><strong>#{depositId}</strong></div>}
              <div className="border-t border-[#e7ebef] pt-3 text-sm"><span className="text-[#798596]">{copy.transactionReference}</span><p className="mt-1 break-all font-mono font-bold text-[#263342]">{transactionReference}</p></div>
            </div>
            <div className={`mt-3 flex items-center gap-3 rounded-xl px-4 py-3.5 text-white ${status === "approved" ? "bg-[#168b63]" : status === "rejected" ? "bg-[#c94c4c]" : "bg-[#168bc6]"}`}>
              {status === "approved" ? <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" /> : status === "rejected" ? <Info className="h-5 w-5 shrink-0" aria-hidden="true" /> : <Clock3 className="h-5 w-5 shrink-0" aria-hidden="true" />}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{status === "approved" ? copy.approved : status === "rejected" ? copy.rejected : copy.waiting}</p>
                <p className="mt-0.5 text-xs text-white/90">{status === "pending" ? `${copy.waiting} · ${formatTime(secondsRemaining)}` : status === "approved" ? copy.approvedStatus : copy.rejectedStatus}</p>
              </div>
            </div>
            {status === "pending" && <button type="button" onClick={onRefreshStatus} disabled={!depositId || isRefreshing} className="mt-3 min-h-12 w-full rounded-xl border border-[#cbd5df] bg-white font-bold text-[#315170] hover:bg-[#f7f9fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd] disabled:opacity-55">{isRefreshing ? copy.refreshing : copy.refresh}</button>}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" onClick={onViewHistory} className="min-h-12 rounded-xl border border-[#d6dde5] px-3 text-sm font-bold text-[#40516a] hover:bg-[#f7f9fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd]">{copy.history}</button>
              <button type="button" onClick={onHome} className="min-h-12 rounded-xl bg-[#ee9a59] px-3 text-sm font-bold text-white hover:bg-[#df9053] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd]">{copy.home}</button>
            </div>
          </section>
        ) : (
          <section className="space-y-4 px-4 py-5 sm:px-6 sm:py-6">
            <div role="tablist" aria-label={copy.openApp} className="grid grid-cols-2 gap-1 rounded-xl bg-[#f0f2f4] p-1">
              <button type="button" role="tab" aria-selected={view === "app"} onClick={() => setView("app")} className={`flex min-h-12 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd] ${view === "app" ? "bg-[#ee9a59] text-white shadow-sm" : "text-[#435064] hover:bg-white"}`}><Smartphone className="h-4 w-4" aria-hidden="true" />{copy.openApp}</button>
              <button type="button" role="tab" aria-selected={view === "qr"} onClick={() => setView("qr")} className={`flex min-h-12 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd] ${view === "qr" ? "bg-[#ee9a59] text-white shadow-sm" : "text-[#435064] hover:bg-white"}`}><QrCode className="h-4 w-4" aria-hidden="true" />{copy.scanQr}</button>
            </div>
            <div className="flex items-center justify-between rounded-xl border-2 border-[#d5dce4] bg-[#f7f8fa] px-4 py-3 shadow-sm">
              <span className="text-sm font-semibold text-[#687586]">{copy.amount}</span><strong className="text-lg font-extrabold text-[#c85e1d]">{displayAmount} <span className="text-sm">FCFA</span></strong>
            </div>
            {view === "app" ? (
              <>
                <div className="flex gap-2.5 rounded-xl border-l-4 border-[#ee9951] bg-[#eaf5fc] px-3.5 py-3 text-sm leading-5 text-[#315e7e]"><Info className="mt-0.5 h-4 w-4 shrink-0 text-[#178ebd]" aria-hidden="true" /><p>{copy.openWaveInfo}</p></div>
                <div className="rounded-xl border-2 border-[#ee9a59] bg-[#ee9a59] px-5 py-5 text-center text-white shadow-[0_7px_18px_rgba(238,154,89,0.28)]">
                  <div className="mx-auto flex items-center justify-center gap-3">
                    <img src="/operators/wave-brand.png" alt={copy.waveLogoAlt} className="h-24 w-24 shrink-0 rounded-2xl border-2 border-white bg-white p-1 object-contain shadow-md" />
                    <span className="text-2xl font-extrabold leading-tight">{copy.payWith}</span>
                  </div>
                  <p className="mx-auto mt-3 max-w-[300px] text-sm font-semibold leading-5">{copy.openAppInstructions}</p>
                </div>
                {appLink ? <a href={appLink} target="_blank" rel="noopener noreferrer" className="flex min-h-[54px] items-center justify-center gap-2 rounded-lg bg-[#0d8bb8] px-4 text-center font-bold text-white shadow-[0_4px_12px_rgba(13,139,184,0.24)] hover:bg-[#0b7ca6] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#178ebd]/25"><ExternalLink className="h-5 w-5" aria-hidden="true" />{copy.openAppToPay}</a> : <p className="rounded-lg bg-[#fff5e9] p-3 text-sm font-semibold text-[#9b5d29]">{copy.paymentLinkMissing}</p>}
                <p className="text-center text-xs leading-5 text-[#7b8795]">{copy.returnAfterPayment}</p>
                <div className="flex gap-2.5 rounded-xl border-l-4 border-[#ee9951] bg-[#eaf5fc] px-3.5 py-3 text-sm leading-5 text-[#315e7e]"><Info className="mt-0.5 h-4 w-4 shrink-0 text-[#178ebd]" aria-hidden="true" /><p>{copy.completedTransfer}</p></div>
              </>
            ) : (
              <>
                <div className="flex gap-2.5 rounded-xl border-l-4 border-[#ee9951] bg-[#eaf5fc] px-3.5 py-3 text-sm leading-5 text-[#315e7e]"><Info className="mt-0.5 h-4 w-4 shrink-0 text-[#178ebd]" aria-hidden="true" /><p>{copy.scanInstructions}</p></div>
                <div id="ci-wave-qr" className="mx-auto w-full max-w-[320px] overflow-hidden rounded-xl border-[3px] border-[#178ebd] bg-white p-2.5 shadow-[0_8px_24px_rgba(23,139,198,0.24)] ring-4 ring-[#178ebd]/10">
                  {qrImageUrl ? <img src={qrImageUrl} alt={copy.qrAlt} className="h-auto w-full object-contain" /> : safeLink ? <div className="grid place-items-center p-3"><QRCodeSVG value={safeLink} size={252} level="M" marginSize={2} title={copy.qrAlt} /></div> : <div className="grid min-h-48 place-items-center text-sm text-[#778596]">{copy.qrMissing}</div>}
                </div>
                <div className="flex gap-2.5 rounded-xl border-l-4 border-[#ee9951] bg-[#eaf5fc] px-3.5 py-3 text-sm leading-5 text-[#315e7e]"><Info className="mt-0.5 h-4 w-4 shrink-0 text-[#178ebd]" aria-hidden="true" /><p>{copy.qrReferenceInfo}</p></div>
              </>
            )}
            <form onSubmit={(event) => { event.preventDefault(); onSubmitPayment(); }} className="space-y-3 border-t border-[#edf0f3] pt-4">
              <div><h2 className="text-base font-extrabold text-[#25344a]">{copy.transactionReference}</h2><p className="mt-1 text-xs leading-5 text-[#758192]">{copy.transactionInstructions}</p></div>
              <label htmlFor="ci-wave-transaction-reference" className="sr-only">{copy.transactionReference}</label>
              <input id="ci-wave-transaction-reference" type="text" required autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={120} value={transactionReference} onChange={(event) => onTransactionReferenceChange(event.target.value)} placeholder={copy.transactionReference} className="min-h-12 w-full rounded-lg border-2 border-[#c7d0d9] px-3 text-base outline-none focus:border-[#178ebd] focus:ring-2 focus:ring-[#178ebd]/20" />
              <button type="submit" disabled={(!safeLink && !paymentPhone) || isSubmitting || phone.replace(/\D/g, "").length !== 10 || !transactionReference.trim()} className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-lg bg-[#ee9a59] px-4 font-bold text-white hover:bg-[#df9053] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ee9a59]/25 disabled:cursor-not-allowed disabled:bg-[#e5e5e5] disabled:opacity-100">{isSubmitting ? copy.sending : copy.sendForReview}</button>
              <p className="flex gap-2 rounded-lg bg-[#eaf6fc] px-3 py-2.5 text-xs leading-5 text-[#21678a]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{copy.pendingNotice}</p>
            </form>
            {view === "qr" && <button type="button" onClick={downloadQr} disabled={!safeLink} className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-lg bg-[#4caf50] px-4 font-bold text-white hover:bg-[#43a047] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4caf50]/25 disabled:cursor-not-allowed disabled:opacity-100"><Download className="h-5 w-5" aria-hidden="true" />{copy.downloadQr}</button>}
          </section>
        )}
      </div>
    </main>
  );
}
