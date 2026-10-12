import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Copy, Share2, X } from "lucide-react";
import instagramIcon from "@assets/Instagram_icon_1787367952152.png";
import facebookIcon from "@assets/images_(27)_1787367952249.png";
import whatsappIcon from "@assets/images_(26)_1787367952281.png";
import telegramIcon from "@assets/tg-1_1787367952311.png";
import "./team.css";

interface TeamStats {
  level1Count: number;
  level2Count: number;
  level3Count: number;
  totalCommission: number;
  level1Commission: number;
  level2Commission: number;
  level3Commission: number;
  demoMemberCount: number;
  totalDepositAmount: number;
  totalWithdrawalAmount: number;
  todayNewMembers: number;
  todayDepositAmount: number;
  todayWithdrawalAmount: number;
}

function formatNumber(value: number | undefined, loading: boolean) {
  return loading ? "…" : value === undefined ? "—" : value.toLocaleString("fr-FR");
}

function formatRate(value: string | undefined) {
  if (value === undefined || value === "") return "—";
  return `${value}%`;
}

export default function TeamPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const { data: stats, isLoading, isFetching, isError, refetch } = useQuery<TeamStats>({
    queryKey: ["/api/team/stats"],
    staleTime: 30_000,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
  const { data: settings } = useQuery<Record<string, string>>({
    queryKey: ["/api/settings"],
  });

  if (!user) return null;

  const referralLink = `${window.location.origin}/html/register?code=${encodeURIComponent(user.referralCode)}`;
  const referralMessage = `Rejoins mon équipe sur Equinor ! Inscris-toi avec mon lien de parrainage :\n${referralLink}\nMon code d'invitation : ${user.referralCode}`;
  const referralText = `Rejoins mon équipe sur Equinor ! Mon code d'invitation : ${user.referralCode}`;
  const shareUrl = encodeURIComponent(referralLink);
  const shareText = encodeURIComponent(referralText);

  const copy = async (value: string, description: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(field);
        if (!copied) throw new Error("Clipboard unavailable");
      }
      toast({ title: `${description} copié` });
      return true;
    } catch {
      toast({ title: "Copie impossible", description: "Veuillez réessayer.", variant: "destructive" });
      return false;
    }
  };

  const shareNatively = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Mon équipe Equinor", text: referralText, url: referralLink });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        await copy(referralMessage, "Message d'invitation");
      }
      return;
    }
    await copy(referralMessage, "Message d'invitation");
  };

  const totalMembers = stats
    ? stats.level1Count + stats.level2Count + stats.level3Count
    : undefined;
  const levels = [
    { label: "LV1", count: stats?.level1Count, commission: stats?.level1Commission, rate: settings?.level1Commission, level: 1 },
    { label: "LV2", count: stats?.level2Count, commission: stats?.level2Commission, rate: settings?.level2Commission, level: 2 },
    { label: "LV3", count: stats?.level3Count, commission: stats?.level3Commission, rate: settings?.level3Commission, level: 3 },
  ];
  const networkStats = [
    { label: "Dépôts cumulés", value: stats?.totalDepositAmount },
    { label: "Retraits cumulés", value: stats?.totalWithdrawalAmount },
    { label: "Nouveaux membres aujourd'hui", value: stats?.todayNewMembers },
    { label: "Dépôts aujourd'hui", value: stats?.todayDepositAmount },
    { label: "Retraits aujourd'hui", value: stats?.todayWithdrawalAmount },
  ];
  const shareLinks = [
    { name: "WhatsApp", icon: whatsappIcon, url: `https://wa.me/?text=${encodeURIComponent(referralMessage)}` },
    { name: "Telegram", icon: telegramIcon, url: `https://t.me/share/url?url=${shareUrl}&text=${shareText}` },
    { name: "Facebook", icon: facebookIcon, url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}` },
    { name: "X", url: `https://x.com/intent/post?url=${shareUrl}&text=${shareText}` },
  ];

  return (
    <main className="team-page">
      <div className="team-page-inner">
        <header className="team-header">
          <button type="button" className="team-back" onClick={() => navigate("/")} aria-label="Retour à l'accueil">
            <ChevronLeft aria-hidden="true" />
          </button>
          <div className="team-heading">
            <span>Votre réseau</span>
            <h1>Équipe</h1>
          </div>
          <span className="team-wordmark">equinor<span>.</span></span>
        </header>

        <div className="team-content" aria-busy={isLoading || isFetching}>
          <section className="team-hero" aria-label="Votre équipe Equinor">
            <img src="/images/equinor/products/offshore-platform.jpg" alt="Plateforme offshore Equinor au large" />
            <div className="team-hero-shade" />
            <div className="team-hero-copy">
              <span className="team-kicker">Ensemble, plus loin</span>
              <h2>Votre équipe.<br />Votre énergie.</h2>
              <p>Invitez votre réseau et suivez sa progression, niveau par niveau.</p>
            </div>
            <span className="team-hero-mark" aria-hidden="true">E</span>
          </section>

          <section className="team-invite" aria-label="Invitation">
            <div className="team-section-heading">
              <span className="team-index">01</span>
              <div><span className="team-eyebrow">À partager</span><h2>Mon invitation</h2></div>
            </div>
            <div className="team-invite-row">
              <div className="team-invite-text">
                <p>Code d'invitation</p>
                <strong data-testid="text-referral-code">{user.referralCode}</strong>
              </div>
              <button type="button" className="team-copy" onClick={() => void copy(user.referralCode, "Code")} aria-label="Copier le code d'invitation" data-testid="button-copy-code">
                <Copy aria-hidden="true" />
                <span>Copier</span>
              </button>
            </div>
            <div className="team-invite-row">
              <div className="team-invite-text">
                <p>Lien d'invitation</p>
                <strong className="team-invite-link" data-testid="text-referral-link">{referralLink}</strong>
              </div>
              <button type="button" className="team-copy" onClick={() => void copy(referralLink, "Lien")} aria-label="Copier le lien d'invitation" data-testid="button-copy-link">
                <Copy aria-hidden="true" />
                <span>Copier</span>
              </button>
            </div>
          </section>

          <section className="team-summary" aria-label="Statistiques de l'équipe">
            <div className="team-summary-top">
              <div>
                <span className="team-eyebrow">02 / Vue d'ensemble</span>
                <h2>Mon équipe<br />en chiffres</h2>
              </div>
              <div className="team-summary-total">
                <strong>{formatNumber(totalMembers, isLoading)}</strong>
                <span>Membres au total</span>
              </div>
            </div>
            <div className="team-commission">
              <span>Commissions générées</span>
              <strong>{formatNumber(stats?.totalCommission, isLoading)}</strong>
            </div>
            <div className="team-network-stats">
              {networkStats.map((item) => (
                <div className="team-network-stat" key={item.label}>
                  <strong>{formatNumber(item.value, isLoading)}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {!!stats?.demoMemberCount && (
            <p className="team-demo-note">
              {stats.demoMemberCount} filleuls « Démo » sont inclus dans le nombre de membres. Les montants affichés ici restent les montants réels, sans les exemples fictifs.
            </p>
          )}

          {isError && (
            <div className="team-error" role="alert">
              <span>Impossible de charger les statistiques de l'équipe.</span>
              <button type="button" onClick={() => void refetch()} disabled={isFetching}>
                {isFetching ? "Chargement…" : "Réessayer"}
              </button>
            </div>
          )}

          <section className="team-levels" aria-label="Niveaux d'équipe">
            <div className="team-section-heading team-level-heading">
              <span className="team-index">03</span>
              <div><span className="team-eyebrow">Votre réseau, en détail</span><h2>Les niveaux</h2></div>
            </div>
            <p className="team-explainer">Chaque niveau représente une génération de votre équipe. Consultez les membres et les commissions de chaque niveau.</p>
            {levels.map((level, index) => (
              <article className="team-level" key={level.label} data-testid={`vip-row-${index + 1}`}>
                <div className="team-level-rail">
                  <span>{level.label}</span>
                  <i aria-hidden="true" />
                </div>
                <div className="team-level-main">
                  <div className="team-level-topline">
                    <h3>Niveau {index + 1}</h3>
                  </div>
                  <div className="team-level-data">
                    <div><strong>{formatRate(level.rate)}</strong><span>Commission</span></div>
                    <div><strong data-testid={`text-level${index + 1}-count`}>{formatNumber(level.count, isLoading)}</strong><span>Utilisateurs</span></div>
                    <div><strong>{formatNumber(level.commission, isLoading)}</strong><span>Récompenses</span></div>
                  </div>
                  <button type="button" className="team-level-open" onClick={() => navigate(`/team-details?level=${level.level}`)}>
                    Voir les membres <ChevronRight aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </section>

          <section className="team-share" aria-label="Partager mon invitation">
            <div className="team-section-heading">
              <span className="team-index">04</span>
              <div><span className="team-eyebrow">Faites passer le mot</span><h2>Partager</h2></div>
            </div>
            <p className="team-share-intro">Une invitation suffit pour agrandir votre équipe.</p>
            <button type="button" className="team-native-share" onClick={() => void shareNatively()}>
              <Share2 aria-hidden="true" /><span>Partager mon invitation</span><ChevronRight aria-hidden="true" />
            </button>
            <div className="team-share-label">Ou choisir une application</div>
            <div className="team-share-links">
              {shareLinks.map((target) => (
                <a key={target.name} href={target.url} target="_blank" rel="noopener noreferrer"
                  aria-label={`Partager mon lien d'invitation sur ${target.name}`}
                  data-testid={`share-${target.name.toLowerCase()}`}
                  onClick={target.name === "Facebook" ? () => void copy(referralMessage, "Message de parrainage") : undefined}>
                  {target.icon ? <img src={target.icon} alt="" /> : <X aria-hidden="true" />}
                  <span>{target.name}</span>
                </a>
              ))}
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
                aria-label="Copier mon message d'invitation et ouvrir Instagram" data-testid="share-instagram"
                onClick={(event) => {
                  event.preventDefault();
                  const copied = copy(referralMessage, "Message d'invitation");
                  window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
                  void copied;
                }}>
                <img src={instagramIcon} alt="" /><span>Instagram</span>
              </a>
            </div>
            <p className="team-share-note">Instagram ne permet pas le partage direct depuis un site web : votre message est copié, collez-le dans l'application.</p>
          </section>
          <p className="team-footer-note">Votre réseau avance à son rythme. Retrouvez ici les données actualisées de votre équipe.</p>
        </div>
      </div>
    </main>
  );
}
