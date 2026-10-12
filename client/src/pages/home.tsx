import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getCountryByCode } from "@/lib/countries";
import { ChevronRight, Send } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import "./home.css";

import noticeBell from "@/assets/notice-bell.png";
import depositIcon from "@/assets/home-actions/deposit.png";
import withdrawalIcon from "@/assets/home-actions/withdrawal.png";
import supportIcon from "@/assets/home-actions/support.png";
import checkinIcon from "@/assets/home-actions/checkin.png";

const quickActions = [
  { label: "Dépôt", href: "/deposit", icon: depositIcon },
  { label: "Retrait", href: "/withdrawal", icon: withdrawalIcon },
  { label: "Aide", href: "/service", icon: supportIcon },
  { label: "Pointage", href: "/checkin", icon: checkinIcon },
] as const;

const announcementLibrary = [
  "052**85 a obtenu 20 000 F de bonus d'équipe",
  "55*368 a retiré 23 654 F",
  "07****42 a obtenu 12 500 F de bonus d'équipe",
  "01****73 a retiré 8 000 F",
  "05****91 a obtenu 15 000 F de bonus d'équipe",
  "07****26 a retiré 32 400 F",
  "05****14 a obtenu 10 000 F de bonus d'équipe",
  "01****82 a retiré 15 000 F",
  "07****63 a obtenu 18 500 F de bonus d'équipe",
  "05****47 a retiré 27 800 F",
  "01****29 a obtenu 25 000 F de bonus d'équipe",
  "07****18 a retiré 11 250 F",
] as const;

export default function HomePage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { data: settings } = useQuery<Record<string, string>>({ queryKey: ["/api/settings"] });
  const [welcomePopupOpen, setWelcomePopupOpen] = useState(false);
  if (!user) return null;
  const currency = getCountryByCode(user.country)?.currency || "XOF";
  const balance = Number.parseFloat(user.balance || "0");
  const totalEarnings = Number.parseFloat(user.totalEarnings || "0");
  const formatMoney = (amount: number) => `${Math.round(amount).toLocaleString("fr-FR")} ${currency}`;
  const popupCurrency = currency === "FCFA" ? "XOF" : currency;
  const formatPopupMoney = (amount: number) => `${Math.round(amount).toLocaleString("fr-FR")} ${popupCurrency}`;
  const parseIntegerSetting = (key: string, fallback: number) => {
    const value = Number.parseInt(settings?.[key] || "", 10);
    return Number.isFinite(value) ? value : fallback;
  };
  const parseDecimalSetting = (key: string, fallback: number) => {
    const value = Number.parseFloat(settings?.[key] || "");
    return Number.isFinite(value) ? value : fallback;
  };
  const minimumDeposit = Math.max(3500, parseIntegerSetting("minDeposit", 3500));
  const minimumWithdrawal = parseIntegerSetting("minWithdrawal", 800);
  const withdrawalFee = parseDecimalSetting("withdrawalFees", 16);
  const withdrawalStartHour = parseIntegerSetting("withdrawalStartHour", 9);
  const withdrawalEndHour = parseIntegerSetting("withdrawalEndHour", 17);
  const maxWithdrawalsPerDay = parseIntegerSetting("maxWithdrawalsPerDay", 1);
  const withdrawalPrepaymentEnabled = settings?.withdrawalPrepaymentEnabled === "true";
  const popupRules = [
    `Montant minimum du dépôt : ${formatPopupMoney(minimumDeposit)}.`,
    `Montant minimum du retrait : ${formatPopupMoney(minimumWithdrawal)}.`,
    `Frais de retrait : ${withdrawalFee.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} % du montant demandé. Le montant net estimé après frais est affiché avant validation.`,
    `Limite quotidienne de retrait : ${maxWithdrawalsPerDay} demande${maxWithdrawalsPerDay === 1 ? "" : "s"} par jour.`,
    `Horaires de retrait : de ${withdrawalStartHour} h à ${withdrawalEndHour} h.`,
    "Délai de traitement : généralement sous 2 heures et, exceptionnellement, jusqu’à 24 heures.",
    ...(withdrawalPrepaymentEnabled ? ["Prépaiement : 25 % du montant demandé, avant traitement."] : []),
    `Bonus de pointage quotidien : de ${formatPopupMoney(20)} à ${formatPopupMoney(50)}, disponible une fois toutes les 24 heures.`,
    "Avant de confirmer une demande, vérifiez les coordonnées du portefeuille et le montant net affiché.",
  ];
  const groupLink = settings?.groupLink || "";
  const popupButtonLabel = "Rejoindre le groupe d’entraide";

  return (
    <>
      <main className="cp-home">
        <div className="cp-shell">
          <section className="cp-hero cp-hero--awaiting-images" aria-hidden="true" />

          <section className="cp-overview" aria-labelledby="overview-title">
            <header className="cp-section-heading">
              <h2 id="overview-title">Mon compte</h2>
            </header>
            <div className="cp-metrics">
              <button className="cp-balance" type="button" onClick={() => navigate("/wallet")} aria-label={`Voir le portefeuille, solde ${formatMoney(balance)}`}>
                <strong data-testid="text-balance">{formatMoney(balance)}</strong>
                <span className="cp-balance-label">Solde du compte</span>
              </button>
              <article className="cp-stat cp-stat-earnings">
                <strong data-testid="text-total-earnings">{formatMoney(totalEarnings)}</strong>
                <span className="cp-stat-label">Revenus cumulés</span>
              </article>
            </div>
          </section>

          <button
            className="cp-notice"
            type="button"
            onClick={() => setWelcomePopupOpen(true)}
            aria-label="Ouvrir les informations du compte"
            aria-describedby="cp-notice-messages"
          >
            <span className="cp-notice-icon"><img src={noticeBell} alt="" width={24} height={24} /></span>
            <span className="cp-notice-marquee" aria-hidden="true">
              <span className="cp-notice-track">
                {[0, 1].map((copy) => (
                  <span className="cp-notice-group" key={copy}>
                    {announcementLibrary.map((announcement, index) => (
                      <span className="cp-notice-item" key={`${copy}-${index}`}>
                        <span>{announcement}</span>
                        {index < announcementLibrary.length - 1 && <span className="cp-notice-separator" aria-hidden="true" />}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </span>
            <span className="sr-only" id="cp-notice-messages">{announcementLibrary.join(". ")}</span>
          </button>

          <section className="cp-actions" aria-label="Actions rapides">
            {quickActions.map(({ label, href, icon }) => (
              <button key={label} className="cp-action" type="button" onClick={() => navigate(href)}>
                <span className="cp-action-icon">
                  <img src={icon} alt="" />
                </span>
                <span>{label}</span>
              </button>
            ))}
          </section>

          <section className="cp-feature cp-feature--awaiting-image" aria-labelledby="feature-title">
            <div className="cp-feature-copy">
              <h2 id="feature-title">Tout est à portée de main.</h2>
              <p>Consultez vos informations et accédez rapidement aux services de votre compte.</p>
            </div>
          </section>
        </div>
      </main>

      <Dialog open={welcomePopupOpen} onOpenChange={setWelcomePopupOpen}>
        <DialogContent className="cp-dialog z-[60]" overlayClassName="cp-dialog-overlay">
          <DialogClose className="cp-dialog-brand-close" aria-label="Fermer les conditions">
            <img src={noticeBell} alt="" />
          </DialogClose>
          <div className="cp-dialog-mark" aria-hidden="true">
            <img src={noticeBell} alt="" />
          </div>
          <div className="cp-dialog-copy">
            <DialogTitle className="cp-dialog-title">Informations utiles</DialogTitle>
            <DialogDescription className="cp-dialog-message">
              Consultez les principales conditions applicables aux dépôts, aux retraits et au pointage.
            </DialogDescription>
            <ol className="cp-dialog-list">
              {popupRules.map((rule) => <li key={rule}>{rule}</li>)}
            </ol>
          </div>
          <div className="cp-dialog-actions">
            {groupLink && (
              <a className="cp-dialog-telegram" href={groupLink} target="_blank" rel="noreferrer" onClick={() => setWelcomePopupOpen(false)}>
                <Send size={18} aria-hidden="true" />
                <span>{popupButtonLabel}</span>
                <ChevronRight size={19} aria-hidden="true" />
              </a>
            )}
            <button className="cp-dialog-close" type="button" onClick={() => setWelcomePopupOpen(false)}>FERMER</button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
