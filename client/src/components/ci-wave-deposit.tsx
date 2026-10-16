import { useState } from "react";
import { ArrowLeft, Check, CheckCircle2, Clock3, Download, ExternalLink, Info, QrCode, ShieldCheck, Smartphone } from "lucide-react";
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
  operators: WaveOperator[];
  selectedOperator: WaveOperator | null;
  phone: string;
  phonePrefix: string;
  onPhoneChange: (value: string) => void;
  onChooseOperator: (operator: WaveOperator) => void;
  onContinue: () => void;
  onBack: () => void;
  submitted: boolean;
  status: string;
  depositId?: number | null;
  secondsRemaining?: number;
  paymentLink?: string | null;
  qrImageUrl?: string | null;
  paymentPhone?: string | null;
  ownerName?: string | null;
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

export default function CiWaveDeposit({
  amount, currency, step, operators, selectedOperator, phone, phonePrefix, onPhoneChange,
  onChooseOperator, onContinue, onBack, submitted, status, depositId, secondsRemaining,
  paymentLink, qrImageUrl, paymentPhone, ownerName, transactionReference,
  onTransactionReferenceChange, onSubmitPayment, isSubmitting, onRefreshStatus,
  isRefreshing, onViewHistory, onHome,
}: CiWaveDepositProps) {
  const [view, setView] = useState<"app" | "qr">("app");
  const displayAmount = amount.toLocaleString("fr-FR");
  const selectedName = selectedOperator?.name || "Wave";
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
    <main className="min-h-[100dvh] bg-[#f3a35d] px-3 py-5 text-[#263342] sm:px-5 sm:py-10">
      <div className="mx-auto w-full max-w-[480px] overflow-hidden rounded-[22px] bg-white shadow-[0_18px_55px_rgba(54,61,73,0.2)]">
        <header className="flex items-center justify-between border-b border-[#edf0f3] px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            {!submitted && (
              <button type="button" onClick={onBack} aria-label="Retour" className="grid h-9 w-9 place-items-center rounded-full text-[#40516a] hover:bg-[#f4f6f8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd]">
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            <img src={catlLogo} alt="CATL" className="h-8 w-auto max-w-[112px] object-contain" />
            <span className="hidden h-7 w-px bg-[#e5e9ee] sm:block" />
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#748095]">Dépôt sécurisé</p>
              <p className="text-xs font-semibold text-[#263342]">Côte d’Ivoire</p>
            </div>
          </div>
          <div className="rounded-xl bg-[#f6f7f8] px-3 py-2 text-right">
            <p className="text-[11px] font-semibold text-[#687586]">Montant du paiement</p>
            <p className="mt-0.5 text-sm font-extrabold text-[#d98442]">FCFA {displayAmount}</p>
          </div>
        </header>

        {step === 0 && !submitted ? (
          <section className="space-y-5 px-4 py-5 sm:px-6 sm:py-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a36d43]">Recharger votre compte</p>
              <h1 className="mt-1 text-[23px] font-extrabold leading-tight text-[#25344a]">Choisissez votre moyen de paiement</h1>
              <p className="mt-1.5 text-sm leading-5 text-[#6b7583]">Le dépôt sera créé uniquement après l’envoi de votre référence de transaction.</p>
            </div>
            <div className="grid gap-3">
              {operators.map((item, index) => {
                const active = selectedOperator?.id === item.id && selectedOperator?.name === item.name;
                return (
                  <button
                    type="button"
                    key={`${item.id || item.name}-${index}`}
                    onClick={() => onChooseOperator(item)}
                    aria-pressed={active}
                    className={`flex min-h-[76px] items-center gap-3 rounded-xl border-2 px-3.5 py-3 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#178ebd]/20 ${active ? "border-[#ee9951] bg-[#fff8f0] shadow-[0_3px_0_#db8742]" : "border-[#b8c2cd] bg-white shadow-[0_2px_8px_rgba(37,52,74,0.08)] hover:border-[#d27c35] hover:bg-[#fffdfa]"}`}
                  >
                    {item.manualNumber?.logoUrl ? (
                      <img src={item.manualNumber.logoUrl} alt="" aria-hidden="true" className="h-11 w-11 shrink-0 rounded-lg border border-[#e7edf2] object-contain p-1" />
                    ) : (
                      <img src="/operators/wave.png" alt="" aria-hidden="true" className="h-11 w-11 shrink-0 rounded-lg object-cover" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold text-[#263342]">{item.name || "Wave"}</span>
                      {item.manualNumber?.ownerName && !item.manualNumber.paymentLink && <span className="mt-0.5 block truncate text-xs text-[#718096]">{item.manualNumber.ownerName}</span>}
                      {item.manualNumber?.phone && <span className="mt-1 block font-mono text-xs text-[#52647a]">{item.manualNumber.phone}</span>}
                    </span>
                    <span className={`grid h-6 w-6 place-items-center rounded-full border ${active ? "border-[#ee9951] bg-[#ee9951] text-white" : "border-[#d9e0e7] text-transparent"}`}><Check className="h-4 w-4" /></span>
                  </button>
                );
              })}
            </div>
            <label htmlFor="ci-wave-phone" className="block text-sm font-semibold text-[#344258]">
              Numéro du payeur
                <span className="mt-1.5 flex min-h-[54px] items-center rounded-xl border-2 border-[#d4b18d] bg-white px-3 focus-within:border-[#178ebd] focus-within:ring-2 focus-within:ring-[#178ebd]/20">
                <span className="mr-3 shrink-0 border-r border-[#e1e5ea] pr-3 font-semibold text-[#738094]">+{phonePrefix}</span>
                <input id="ci-wave-phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={phone} onChange={(event) => onPhoneChange(event.target.value)} className="min-w-0 flex-1 bg-transparent text-base text-[#263342] outline-none" placeholder="Votre numéro Wave" />
              </span>
            </label>
            <p className="rounded-lg bg-[#fff4ef] px-3 py-2.5 text-sm font-semibold leading-5 text-[#c75348]">
              Saisissez correctement les 10 chiffres de votre numéro Wave pour que le paiement soit associé au bon compte.
            </p>
            <button type="button" onClick={onContinue} disabled={!selectedOperator || phone.replace(/\D/g, "").length !== 10} className="flex min-h-[54px] w-full items-center justify-center rounded-xl bg-[#b8581b] px-4 text-base font-bold text-white shadow-[0_4px_0_#8f4418] transition hover:bg-[#a34d19] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ee9951]/40 disabled:cursor-not-allowed disabled:opacity-55">
              Soumettre
            </button>
            <p className="flex items-start gap-2 rounded-lg bg-[#eaf6fc] px-3 py-2.5 text-xs leading-5 text-[#21678a]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Vos informations sont protégées. Aucun dépôt n’est enregistré à cette étape.</p>
          </section>
        ) : submitted ? (
          <section className="px-4 py-7 sm:px-6 sm:py-9">
            <div className="text-center">
              <span className="mx-auto grid h-[68px] w-[68px] place-items-center rounded-full bg-[#fff0e2] text-[#ee9951]"><CheckCircle2 className="h-10 w-10" aria-hidden="true" /></span>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#b4794b]">Wave · Côte d’Ivoire</p>
              <h1 className="mt-1 text-2xl font-extrabold text-[#25344a]">
                {status === "approved" ? "Paiement confirmé" : status === "rejected" ? "Paiement refusé" : "Demande envoyée"}
              </h1>
              <p className="mx-auto mt-2 max-w-[330px] text-sm leading-6 text-[#687586]">
                {status === "approved"
                  ? "Votre dépôt a été approuvé."
                  : status === "rejected"
                    ? "Le dépôt n’a pas été approuvé. Consultez votre historique pour plus d’informations."
                    : "Votre paiement est en cours de vérification. Votre solde sera crédité après validation."}
              </p>
            </div>
            <div className="mt-6 space-y-3 rounded-xl border border-[#e5e9ef] bg-[#fafbfc] p-4">
              <div className="flex justify-between gap-4 text-sm"><span className="text-[#798596]">Opérateur</span><strong>{selectedName}</strong></div>
              <div className="flex justify-between gap-4 border-t border-[#e7ebef] pt-3 text-sm"><span className="text-[#798596]">Montant</span><strong>{displayAmount} {currency}</strong></div>
              {depositId && <div className="flex justify-between gap-4 border-t border-[#e7ebef] pt-3 text-sm"><span className="text-[#798596]">Demande</span><strong>#{depositId}</strong></div>}
              <div className="border-t border-[#e7ebef] pt-3 text-sm"><span className="text-[#798596]">Référence de transaction</span><p className="mt-1 break-all font-mono font-bold text-[#263342]">{transactionReference}</p></div>
            </div>
            <div className={`mt-3 flex items-center gap-3 rounded-xl px-4 py-3.5 text-white ${status === "approved" ? "bg-[#168b63]" : status === "rejected" ? "bg-[#c94c4c]" : "bg-[#168bc6]"}`}>
              {status === "approved" ? <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" /> : status === "rejected" ? <Info className="h-5 w-5 shrink-0" aria-hidden="true" /> : <Clock3 className="h-5 w-5 shrink-0" aria-hidden="true" />}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{status === "approved" ? "Paiement confirmé" : status === "rejected" ? "Paiement refusé" : "Vérification en cours"}</p>
                <p className="mt-0.5 text-xs text-white/90">{status === "pending" ? `En attente de validation · ${formatTime(secondsRemaining)} de suivi` : status === "approved" ? "Dépôt approuvé" : "Dépôt refusé"}</p>
              </div>
            </div>
            {status === "pending" && <button type="button" onClick={onRefreshStatus} disabled={!depositId || isRefreshing} className="mt-3 min-h-12 w-full rounded-xl border border-[#cbd5df] bg-white font-bold text-[#315170] hover:bg-[#f7f9fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd] disabled:opacity-55">{isRefreshing ? "Actualisation…" : "Actualiser le statut"}</button>}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" onClick={onViewHistory} className="min-h-12 rounded-xl border border-[#d6dde5] px-3 text-sm font-bold text-[#40516a] hover:bg-[#f7f9fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd]">Mes dépôts</button>
              <button type="button" onClick={onHome} className="min-h-12 rounded-xl bg-[#b8581b] px-3 text-sm font-bold text-white hover:bg-[#a34d19] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd]">Accueil</button>
            </div>
          </section>
        ) : (
          <section className="space-y-4 px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between gap-3">
              <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a36d43]">Paiement Wave</p><h1 className="mt-0.5 text-xl font-extrabold text-[#25344a]">Finalisez votre paiement</h1></div>
              <img src="/operators/wave.png" alt="Wave" className="h-12 w-12 rounded-xl object-cover" />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-[#f5f7f9] px-4 py-3">
              <span className="text-sm font-semibold text-[#687586]">Montant</span><strong className="text-lg text-[#dc8745]">{displayAmount} <span className="text-sm">FCFA</span></strong>
            </div>
            <div role="tablist" aria-label="Mode de paiement Wave" className="grid grid-cols-2 gap-1 rounded-xl bg-[#f0f2f4] p-1">
              <button type="button" role="tab" aria-selected={view === "app"} onClick={() => setView("app")} className={`flex min-h-12 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd] ${view === "app" ? "bg-[#b8581b] text-white shadow-sm" : "text-[#435064] hover:bg-white"}`}><Smartphone className="h-4 w-4" aria-hidden="true" />Ouvrir l’application</button>
              <button type="button" role="tab" aria-selected={view === "qr"} onClick={() => setView("qr")} className={`flex min-h-12 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#178ebd] ${view === "qr" ? "bg-[#b8581b] text-white shadow-sm" : "text-[#435064] hover:bg-white"}`}><QrCode className="h-4 w-4" aria-hidden="true" />Scanner le QR code</button>
            </div>
            {view === "app" ? (
              <>
                <div className="flex gap-2.5 rounded-xl border-l-4 border-[#ee9951] bg-[#eaf5fc] px-3.5 py-3 text-sm leading-5 text-[#315e7e]"><Info className="mt-0.5 h-4 w-4 shrink-0 text-[#178ebd]" aria-hidden="true" /><p>Ouvrez Wave et confirmez le montant affiché. Revenez ensuite ici pour saisir votre référence de transaction.</p></div>
                <div className="rounded-xl border-2 border-[#a74f1b] bg-[#b8581b] px-5 py-5 text-center text-white shadow-[0_5px_14px_rgba(83,49,19,0.18)]">
                  <div className="mx-auto flex items-center justify-center gap-2"><img src="/operators/wave.png" alt="" aria-hidden="true" className="h-12 w-12 rounded-lg object-cover" /><span className="text-2xl font-extrabold leading-tight">Payer avec<br />Wave</span></div>
                  <p className="mx-auto mt-3 max-w-[300px] text-sm font-semibold leading-5">Appuyez ci-dessous pour ouvrir l’application et compléter votre transaction.</p>
                </div>
                {appLink ? <a href={appLink} target="_blank" rel="noopener noreferrer" className="flex min-h-[54px] items-center justify-center gap-2 rounded-lg bg-[#0f6d8d] px-4 text-center font-bold text-white shadow-[0_4px_12px_rgba(15,109,141,.24)] hover:bg-[#0b5d79] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#178ebd]/25"><ExternalLink className="h-5 w-5" aria-hidden="true" />Ouvrir l’application pour payer</a> : <p className="rounded-lg bg-[#fff5e9] p-3 text-sm font-semibold text-[#9b5d29]">Le lien de paiement Wave n’est pas configuré.</p>}
                <p className="text-center text-xs leading-5 text-[#7b8795]">Vérifiez le montant avant de confirmer dans Wave.</p>
              </>
            ) : (
              <>
                <div className="flex gap-2.5 rounded-xl border-l-4 border-[#ee9951] bg-[#eaf5fc] px-3.5 py-3 text-sm leading-5 text-[#315e7e]"><Info className="mt-0.5 h-4 w-4 shrink-0 text-[#178ebd]" aria-hidden="true" /><p>Scannez le code avec Wave sur un autre téléphone, puis confirmez le paiement.</p></div>
                <div id="ci-wave-qr" className="mx-auto w-full max-w-[300px] overflow-hidden rounded-xl border-2 border-[#aebdca] bg-white p-2 shadow-[0_4px_14px_rgba(37,52,74,0.1)]">
                  {qrImageUrl ? <img src={qrImageUrl} alt="QR code Wave pour le paiement en Côte d’Ivoire" className="h-auto w-full object-contain" /> : safeLink ? <div className="grid place-items-center p-3"><QRCodeSVG value={safeLink} size={252} level="M" marginSize={2} title="QR code pour ouvrir le lien de paiement Wave" /></div> : <div className="grid min-h-48 place-items-center text-sm text-[#778596]">QR de paiement non configuré</div>}
                </div>
                <button type="button" onClick={downloadQr} disabled={!safeLink} className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-lg bg-[#187b3a] px-4 font-bold text-white hover:bg-[#12642f] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#32a951]/25 disabled:cursor-not-allowed disabled:opacity-50"><Download className="h-5 w-5" aria-hidden="true" />Enregistrer le code QR</button>
              </>
            )}
            <form onSubmit={(event) => { event.preventDefault(); onSubmitPayment(); }} className="space-y-3 border-t border-[#edf0f3] pt-4">
              <div><h2 className="text-base font-extrabold text-[#25344a]">Confirmer votre paiement</h2><p className="mt-1 text-xs leading-5 text-[#758192]">Après le paiement, saisissez le numéro payeur et la référence reçue par SMS ou sur le reçu.</p></div>
              <label htmlFor="ci-wave-payer-phone" className="block text-sm font-semibold text-[#344258]">Numéro du payeur<span className="mt-1.5 flex min-h-12 items-center rounded-lg border-2 border-[#c7d0d9] px-3 focus-within:border-[#178ebd] focus-within:ring-2 focus-within:ring-[#178ebd]/20"><span className="mr-3 border-r border-[#e1e5ea] pr-3 text-[#738094]">+{phonePrefix}</span><input id="ci-wave-payer-phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} required value={phone} onChange={(event) => onPhoneChange(event.target.value)} className="min-w-0 flex-1 bg-transparent text-base outline-none" placeholder="Numéro Wave" /></span></label>
              <label htmlFor="ci-wave-transaction-reference" className="block text-sm font-semibold text-[#344258]">Référence de transaction<input id="ci-wave-transaction-reference" type="text" required autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={120} value={transactionReference} onChange={(event) => onTransactionReferenceChange(event.target.value)} placeholder="Numéro de transaction" className="mt-1.5 min-h-12 w-full rounded-lg border-2 border-[#c7d0d9] px-3 text-base font-normal outline-none focus:border-[#178ebd] focus:ring-2 focus:ring-[#178ebd]/20" /></label>
              <button type="submit" disabled={(!safeLink && !paymentPhone) || isSubmitting || phone.replace(/\D/g, "").length !== 10 || !transactionReference.trim()} className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-lg bg-[#b8581b] px-4 font-bold text-white hover:bg-[#a34d19] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ee9951]/25 disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? "Envoi en cours…" : "Envoyer pour vérification"}</button>
              <p className="flex gap-2 rounded-lg bg-[#eaf6fc] px-3 py-2.5 text-xs leading-5 text-[#21678a]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />Le dépôt reste en attente jusqu’à sa vérification. Le solde n’est crédité qu’après validation.</p>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
