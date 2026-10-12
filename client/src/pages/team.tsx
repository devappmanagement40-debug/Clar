import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Copy, Share2, X } from "lucide-react";
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
}

function asFiniteNumber(value: unknown): number | undefined {
  if (typeof value !== "number" && typeof value !== "string") return undefined;
  if (typeof value === "string" && value.trim() === "") return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function formatNumber(value: number | undefined, loading: boolean) {
  if (loading) return "…";
  return asFiniteNumber(value)?.toLocaleString("fr-FR") ?? "—";
}

function formatRate(value: string | undefined, loading: boolean) {
  if (loading) return "…";
  const rate = asFiniteNumber(value);
  return rate === undefined || rate < 0 ? "—" : `${rate.toLocaleString("fr-FR")}%`;
}

export default function TeamPage() {
  const [bannerImageFailed, setBannerImageFailed] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: stats, isLoading, isFetching, isError, refetch } = useQuery<TeamStats>({
    queryKey: ["/api/team/stats"],
    staleTime: 30_000,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
  const {
    data: settings,
    isLoading: isSettingsLoading,
    isFetching: isSettingsFetching,
    isError: isSettingsError,
    refetch: refetchSettings,
  } = useQuery<Record<string, string>>({
    queryKey: ["/api/settings"],
  });

  if (!user) return null;

  const referralLink = `${window.location.origin}/html/register?code=${encodeURIComponent(user.referralCode)}`;
  const referralMessage = `Rejoins mon équipe ! Voici mon lien d'invitation :\n${referralLink}\nMon code : ${user.referralCode}`;
  const referralText = `Rejoins mon équipe ! Mon code d'invitation : ${user.referralCode}`;
  const encodedLink = encodeURIComponent(referralLink);
  const encodedText = encodeURIComponent(referralText);

  const legacyCopy = (value: string) => {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    try {
      field.select();
      if (!document.execCommand("copy")) throw new Error("Clipboard unavailable");
    } finally {
      document.body.removeChild(field);
    }
  };

  const copy = async (value: string, description: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(value);
        } catch {
          legacyCopy(value);
        }
      } else {
        legacyCopy(value);
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
        await navigator.share({ title: "Invitation à rejoindre mon équipe", text: referralText, url: referralLink });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        await copy(referralMessage, "Message d'invitation");
      }
      return;
    }
    await copy(referralMessage, "Message d'invitation");
  };

  const memberCounts = stats
    ? [asFiniteNumber(stats.level1Count), asFiniteNumber(stats.level2Count), asFiniteNumber(stats.level3Count)]
    : [];
  const totalMembers = stats && memberCounts.every((count): count is number => count !== undefined)
    ? memberCounts.reduce((sum, count) => sum + count, 0)
    : undefined;
  const demoMemberCount = asFiniteNumber(stats?.demoMemberCount);
  const levels = [
    { label: "LV1", count: stats?.level1Count, commission: stats?.level1Commission, rate: settings?.level1Commission },
    { label: "LV2", count: stats?.level2Count, commission: stats?.level2Commission, rate: settings?.level2Commission },
    { label: "LV3", count: stats?.level3Count, commission: stats?.level3Commission, rate: settings?.level3Commission },
  ];
  const shareLinks = [
    { name: "WhatsApp", icon: whatsappIcon, url: `https://wa.me/?text=${encodeURIComponent(referralMessage)}` },
    { name: "Telegram", icon: telegramIcon, url: `https://t.me/share/url?url=${encodedLink}&text=${encodedText}` },
    { name: "Facebook", icon: facebookIcon, url: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}&quote=${encodedText}` },
    { name: "X", url: `https://x.com/intent/post?url=${encodedLink}&text=${encodedText}` },
  ];

  return (
    <main className="team-page">
      <div className="team-page-inner">
        <div className="team-content" aria-busy={isLoading || isFetching || isSettingsLoading || isSettingsFetching}>
          <section className="team-banner" aria-label="Votre réseau">
            {!bannerImageFailed && (
              <img
                src="/images/equinor/products/offshore-platform.jpg"
                alt="Plateforme offshore au large"
                onError={() => setBannerImageFailed(true)}
              />
            )}
            <div className="team-banner-shade" />
            <div className="team-banner-copy">
              <span>Mon réseau</span>
              <h2>Créez votre équipe</h2>
            </div>
            <span className="team-banner-rule" aria-hidden="true" />
          </section>

          <section className="team-invite" aria-label="Invitation">
            <div className="team-invite-heading">
              <div>
                <span className="team-eyebrow">Partagez en un clic</span>
                <h2>Mon invitation</h2>
              </div>
            </div>
            <p className="team-invite-explainer">Partagez votre code ou votre lien pour inviter vos amis.</p>
            <div className="team-invite-grid">
              <div className="team-invite-row">
                <div className="team-invite-text">
                  <p>Code d'invitation</p>
                  <strong data-testid="text-referral-code">{user.referralCode}</strong>
                </div>
                <button type="button" className="team-copy" onClick={() => void copy(user.referralCode, "Code")} aria-label="Copier le code d'invitation" data-testid="button-copy-code">
                  <Copy aria-hidden="true" /><span>Copier</span>
                </button>
              </div>
              <div className="team-invite-row">
                <div className="team-invite-text">
                  <p>Lien d'invitation</p>
                  <strong className="team-invite-link" data-testid="text-referral-link">{referralLink}</strong>
                </div>
                <button type="button" className="team-copy" onClick={() => void copy(referralLink, "Lien")} aria-label="Copier le lien d'invitation" data-testid="button-copy-link">
                  <Copy aria-hidden="true" /><span>Copier</span>
                </button>
              </div>
            </div>
          </section>

          <section className="team-summary" aria-label="Résumé de l'équipe">
            <article className="team-summary-card">
              <strong>{formatNumber(totalMembers, isLoading)}</strong>
              <span>Total des membres</span>
            </article>
            <article className="team-summary-card team-summary-card-accent">
              <strong>{formatNumber(stats?.totalCommission, isLoading)} <small>XOF</small></strong>
              <span>Total des récompenses</span>
            </article>
          </section>

          {demoMemberCount !== undefined && demoMemberCount > 0 && (
            <p className="team-demo-note">
              {formatNumber(demoMemberCount, false)} membre{demoMemberCount === 1 ? "" : "s"} de démonstration sont inclus dans le total des membres.
            </p>
          )}

          {isError && (
            <div className="team-error" role="alert">
              <span>{stats ? "Actualisation impossible. Les valeurs affichées peuvent ne pas être à jour." : "Impossible de charger les statistiques de l'équipe."}</span>
              <button type="button" onClick={() => void refetch()} disabled={isFetching}>
                {isFetching ? "Chargement…" : "Réessayer"}
              </button>
            </div>
          )}
          {isSettingsError && (
            <div className="team-error" role="alert">
              <span>{settings ? "Impossible d'actualiser les taux affichés." : "Impossible de charger les taux de commission."}</span>
              <button type="button" onClick={() => void refetchSettings()} disabled={isSettingsFetching}>
                {isSettingsFetching ? "Chargement…" : "Réessayer"}
              </button>
            </div>
          )}

          <section className="team-levels" aria-label="Niveaux de l'équipe">
            <h2>Invitez votre réseau à rejoindre l'équipe</h2>
            {levels.map((level, index) => (
              <article className="team-level" key={level.label} data-testid={`vip-row-${index + 1}`}>
                <div className="team-level-rail">{level.label}</div>
                <div className="team-level-content">
                  <div className="team-level-metric">
                    <strong>{formatRate(level.rate, isSettingsLoading)}</strong>
                    <span>Commission</span>
                  </div>
                  <div className="team-level-metric">
                    <strong data-testid={`text-level${index + 1}-count`}>{formatNumber(level.count, isLoading)}</strong>
                    <span>Membres</span>
                  </div>
                  <div className="team-level-metric">
                    <strong>{formatNumber(level.commission, isLoading)} <small>XOF</small></strong>
                    <span>Commissions</span>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="team-share" aria-label="Partager mon invitation">
            <div className="team-share-heading">
              <div>
                <span className="team-eyebrow">À vous de jouer</span>
                <h2>Partager mon invitation</h2>
              </div>
              <button type="button" className="team-native-share" onClick={() => void shareNatively()} aria-label="Partager avec les options de votre appareil">
                <Share2 aria-hidden="true" />
              </button>
            </div>
            <div className="team-share-links">
              {shareLinks.map((target) => (
                <a key={target.name} href={target.url} target="_blank" rel="noopener noreferrer"
                  aria-label={`Partager sur ${target.name}`}
                  data-testid={`share-${target.name.toLowerCase()}`}
                  onClick={target.name === "Facebook" ? () => void copy(referralMessage, "Message d'invitation") : undefined}>
                  {target.icon ? <img src={target.icon} alt="" /> : <X aria-hidden="true" />}
                  <span>{target.name}</span>
                </a>
              ))}
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
                aria-label="Copier mon invitation puis ouvrir Instagram" data-testid="share-instagram"
                onClick={(event) => {
                  event.preventDefault();
                  const instagramTab = window.open("about:blank", "_blank");
                  if (instagramTab) instagramTab.opener = null;
                   void copy(referralMessage, "Message d'invitation").then((copied) => {
                     if (copied) instagramTab?.location.replace("https://www.instagram.com/");
                     else instagramTab?.close();
                  });
                }}>
                <img src={instagramIcon} alt="" /><span>Instagram</span>
              </a>
            </div>
            <p className="team-share-note">Instagram ne prend pas en charge le partage web direct : copiez le message puis collez-le dans l'application.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
