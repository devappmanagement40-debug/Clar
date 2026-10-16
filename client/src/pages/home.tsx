import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { FRESH_PLATFORM_SETTINGS_QUERY_OPTIONS } from "@/lib/queryClient";
import { getCountryByCode } from "@/lib/countries";
import {
  DEFAULT_MINIMUM_DEPOSIT,
  DEFAULT_MINIMUM_WITHDRAWAL,
  readPositiveIntegerSetting,
} from "@shared/platform-settings";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import "./home.css";

import notificationBell from "@assets/generated_images/home-notification-bell.png";
import depositIcon from "@/assets/images/home-icons/deposit.png";
import withdrawalIcon from "@/assets/images/home-icons/withdrawal.png";
import supportIcon from "@/assets/images/home-icons/support.png";
import checkinIcon from "@/assets/images/home-icons/checkin.png";
import noticeBellIcon from "@/assets/images/home-icons/notification-bell.png";
import catlBatteries from "@/assets/images/catl-auth-background.webp";
import catlBooth1 from "@/assets/images/catl-booth-1.webp";
import catlBooth2 from "@/assets/images/catl-booth-2.webp";
import catlBooth3 from "@/assets/images/catl-booth-3.webp";
import { CatlLogo } from "@/components/catl-logo";

const bannerSlides = [
  { image: catlBatteries, alt: "Batteries CATL" },
  { image: catlBooth1, alt: "Stand CATL dans un salon professionnel" },
  { image: catlBooth2, alt: "Espace d’exposition CATL" },
  { image: catlBooth3, alt: "Stand CATL dans un salon d’exposition" },
] as const;

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

const userActivityLibrary = [
  "059****899 a reçu un bonus de 2 000 XOF",
  "056****862 a souscrit à l’offre VIP 5",
  "052**85 a reçu un bonus d’équipe de 20 000 XOF",
  "07****26 a effectué un retrait de 32 400 XOF",
  "07****42 a reçu une commission de parrainage de 12 500 XOF",
  "05****91 a souscrit à l’offre VIP 2",
  "01****73 a souscrit à l’offre VIP 1",
  "07****18 a souscrit à l’offre VIP 3",
  "05****47 a reçu une prime de fidélité de 27 800 XOF",
  "01****29 a souscrit à l’offre VIP 4",
] as const;

export default function HomePage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const {
    data: settings,
    isLoading: settingsLoading,
    isFetching: settingsRefreshing,
  } = useQuery<Record<string, string>>({
    queryKey: ["/api/settings"],
    ...FRESH_PLATFORM_SETTINGS_QUERY_OPTIONS,
  });
  const [welcomePopupOpen, setWelcomePopupOpen] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    if (!user || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setBannerIndex((current) => (current + 1) % bannerSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [user?.id]);

  useEffect(() => {
    if (!user || settingsLoading || settingsRefreshing) return;

    const timer = window.setTimeout(() => {
      setWelcomePopupOpen(true);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [user?.id, settingsLoading, settingsRefreshing]);

  if (!user) return null;
  const currency = getCountryByCode(user.country)?.currency || "XOF";
  const localizeActivityCurrency = (message: string) =>
    message.replace(/\bF\b/g, currency).replaceAll("XOF", currency);
  const announcementMessages = announcementLibrary.map(localizeActivityCurrency);
  const userActivityMessages = userActivityLibrary.map(localizeActivityCurrency);
  const balance = Number.parseFloat(user.depositBalance || "0");
  const totalEarnings = Number.parseFloat(user.earningsBalance || "0");
  const formatMoney = (amount: number) =>
    Number.isFinite(amount) ? `${Math.round(amount).toLocaleString("fr-FR")} ${currency}` : "—";
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
  const minimumDeposit = readPositiveIntegerSetting(settings?.minDeposit, DEFAULT_MINIMUM_DEPOSIT);
  const minimumWithdrawal = readPositiveIntegerSetting(settings?.minWithdrawal, DEFAULT_MINIMUM_WITHDRAWAL);
  const withdrawalFee = parseDecimalSetting("withdrawalFees", 16);
  const withdrawalStartHour = parseIntegerSetting("withdrawalStartHour", 9);
  const withdrawalEndHour = parseIntegerSetting("withdrawalEndHour", 17);
  const maxWithdrawalsPerDay = parseIntegerSetting("maxWithdrawalsPerDay", 3);
  const withdrawalPrepaymentEnabled = settings?.withdrawalPrepaymentEnabled === "true";
  const popupRules = [
    `Montant minimum du dépôt : ${formatPopupMoney(minimumDeposit)}.`,
    `Montant minimum du retrait : ${formatPopupMoney(minimumWithdrawal)}.`,
    `Frais de retrait : ${withdrawalFee.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} % du montant demandé. Le montant net estimé après frais est affiché avant validation.`,
    `Limite quotidienne de retrait : ${maxWithdrawalsPerDay} demande${maxWithdrawalsPerDay === 1 ? "" : "s"} par jour.`,
    `Horaires de retrait : de ${withdrawalStartHour} h à ${withdrawalEndHour} h.`,
    "Délai de traitement : généralement sous 2 heures et, exceptionnellement, jusqu’à 24 heures.",
    ...(withdrawalPrepaymentEnabled ? ["Prépaiement : 25 % du montant demandé, avant traitement."] : []),
    `Bonus de pointage quotidien : de ${formatPopupMoney(25)} à ${formatPopupMoney(100)}, disponible une fois toutes les 24 heures. Le montant de ${formatPopupMoney(100)} reste rare.`,
    "Avant de confirmer une demande, vérifiez les coordonnées du portefeuille et le montant net affiché.",
  ];
  const groupLink = settings?.groupLink || "";
  const popupButtonLabel = "Rejoindre le groupe d’entraide";

  return (
    <>
      <main className="cp-home">
        <div className="cp-shell">
          <section className="cp-hero" aria-label="Bannière défilante CATL">
            <div className="cp-hero-slides" style={{ transform: `translateX(-${bannerIndex * 100}%)` }}>
              {bannerSlides.map(({ image, alt }, index) => (
                <div className="cp-hero-slide" key={image} aria-hidden={index !== bannerIndex}>
                  <img className="cp-hero-image" src={image} alt={index === bannerIndex ? alt : ""} />
                </div>
              ))}
            </div>
            <div className="cp-hero-dots" role="group" aria-label="Images de la bannière CATL">
              {bannerSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  className={index === bannerIndex ? "is-active" : ""}
                  onClick={() => setBannerIndex(index)}
                  aria-label={`Afficher l'image ${index + 1} sur ${bannerSlides.length}`}
                  aria-pressed={index === bannerIndex}
                />
              ))}
            </div>
          </section>

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
            <span className="cp-notice-icon"><img src={noticeBellIcon} alt="" aria-hidden="true" /></span>
            <span className="cp-notice-marquee" aria-hidden="true">
              <span className="cp-notice-track">
                {[0, 1].map((copy) => (
                  <span className="cp-notice-group" key={copy}>
                    {announcementMessages.map((announcement, index) => (
                      <span className="cp-notice-item" key={`${copy}-${index}`}>
                        <span>{announcement}</span>
                        {index < announcementMessages.length - 1 && <span className="cp-notice-separator" aria-hidden="true" />}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </span>
            <span className="sr-only" id="cp-notice-messages">{announcementMessages.join(". ")}</span>
          </button>

          <section className="cp-actions" aria-label="Actions rapides">
            {quickActions.map(({ label, href, icon }) => (
              <button key={label} className="cp-action" type="button" onClick={() => navigate(href)}>
                <span className="cp-action-icon">
                  <img src={icon} alt="" aria-hidden="true" />
                </span>
                <span>{label}</span>
              </button>
            ))}
          </section>

          <section className="cp-secondary-banner" aria-label="Image de batteries CATL">
            <img src={catlBatteries} alt="Modules de batteries CATL" />
          </section>

          <section className="cp-user-activity" aria-label="Activités affichées">
            <div className="cp-user-activity-window" aria-hidden="true">
              <div className="cp-user-activity-track">
                {[...userActivityMessages, ...userActivityMessages].map((activity, index) => (
                  <article className="cp-user-activity-row" key={`${index}-${activity}`}>
                    <CatlLogo className="cp-user-activity-avatar cp-user-activity-brand" alt="" aria-hidden="true" />
                    <span className="cp-user-activity-text">{activity}</span>
                  </article>
                ))}
              </div>
            </div>
            <span className="sr-only">{userActivityMessages.join(". ")}</span>
          </section>

        </div>
      </main>

      <Dialog open={welcomePopupOpen} onOpenChange={setWelcomePopupOpen}>
        <DialogContent className="cp-dialog z-[60]" overlayClassName="cp-dialog-overlay">
          <div className="cp-dialog-banner">
            <DialogTitle className="cp-dialog-title">Informations utiles</DialogTitle>
          </div>
          <div className="cp-dialog-mark" aria-hidden="true">
            <img className="cp-dialog-bell-image" src={notificationBell} alt="" />
          </div>
          <div className="cp-dialog-copy">
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
                <span className="cp-telegram-logo" aria-hidden="true">
                  <svg viewBox="0 0 40 40" focusable="false">
                    <circle cx="20" cy="20" r="20" fill="#229ED9" />
                    <path
                      d="M29.25 10.83 25.1 30.04c-.31 1.36-1.11 1.7-2.25 1.06l-6.22-4.59-3 2.89c-.34.34-.62.62-1.27.62l.45-6.34 11.55-10.43c.5-.45-.11-.7-.78-.25L9.3 22.47l-6.15-1.92c-1.34-.42-1.37-1.34.28-1.96l24.02-9.26c1.11-.41 2.08.27 1.8 1.5Z"
                      fill="white"
                    />
                  </svg>
                </span>
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
