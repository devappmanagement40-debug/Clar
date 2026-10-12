import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Copy } from "lucide-react";
import instagramIcon from "@assets/Instagram_icon_1787367952152.png";
import facebookIcon from "@assets/images_(27)_1787367952249.png";
import whatsappIcon from "@assets/images_(26)_1787367952281.png";
import telegramIcon from "@assets/tg-1_1787367952311.png";
import "./team.css";

interface TeamStats {
  level1Count: number;
  level2Count: number;
  level3Count: number;
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

  const referralLink = `https://ellvpscc.site/html/register?code=${encodeURIComponent(user.referralCode)}`;
  const referralMessage = `Rejoins mon équipe sur Equinor ! Inscris-toi avec mon lien de parrainage :\n${referralLink}\nMon code d'invitation : ${user.referralCode}`;
  const referralText = "Rejoins mon équipe sur Equinor ! Inscris-toi avec mon lien de parrainage.";
  const shareLinks = [
    { name: "WhatsApp", icon: whatsappIcon, url: `https://wa.me/?text=${encodeURIComponent(referralMessage)}` },
    { name: "Telegram", icon: telegramIcon, url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(`${referralText} Mon code d'invitation : ${user.referralCode}`)}` },
    { name: "Facebook", icon: facebookIcon, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(`${referralText} Mon code d'invitation : ${user.referralCode}`)}` },
  ];
  const totalMembers = stats
    ? stats.level1Count + stats.level2Count + stats.level3Count
    : undefined;
  const summary = [
    { label: "Nombre total de membres", value: totalMembers },
    { label: "Dépôts totaux de l'équipe", value: stats?.totalDepositAmount },
    { label: "Retraits totaux de l'équipe", value: stats?.totalWithdrawalAmount },
    { label: "Nouvelles inscriptions aujourd'hui", value: stats?.todayNewMembers },
    { label: "Dépôts de l'équipe aujourd'hui", value: stats?.todayDepositAmount },
    { label: "Retraits de l'équipe aujourd'hui", value: stats?.todayWithdrawalAmount },
  ];
  const levels = [
    { name: "A", count: stats?.level1Count, rate: settings?.level1Commission },
    { name: "B", count: stats?.level2Count, rate: settings?.level2Commission },
    { name: "C", count: stats?.level3Count, rate: settings?.level3Commission },
  ];

  const copy = async (value: string, description: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({ title: `${description} copié` });
    } catch {
      toast({ title: "Copie impossible", description: "Veuillez réessayer.", variant: "destructive" });
    }
  };

  return (
    <main className="team-page">
      <div className="team-page-inner">
        <header className="team-header">
          <button type="button" className="team-back" onClick={() => navigate("/")} aria-label="Retour à l'accueil">
            <ChevronLeft aria-hidden="true" />
          </button>
          <h1>Équipe</h1>
          <span className="team-header-brand">Equinor</span>
        </header>

        <div className="team-content" aria-busy={isLoading || isFetching}>
          <section className="team-invite" aria-label="Invitation">
            <h2>Mon invitation</h2>
            <div className="team-invite-row">
              <div className="team-invite-text">
                <p>Code d'invitation</p>
                <strong data-testid="text-referral-code">{user.referralCode}</strong>
              </div>
              <button type="button" className="team-copy" onClick={() => copy(user.referralCode, "Code")} aria-label="Copier le code d'invitation" data-testid="button-copy-code">
                <Copy aria-hidden="true" />
              </button>
            </div>
            <div className="team-invite-row">
              <div className="team-invite-text">
                <p>Lien d'invitation</p>
                <strong className="team-invite-link" data-testid="text-referral-link">{referralLink}</strong>
              </div>
              <button type="button" className="team-copy" onClick={() => copy(referralLink, "Lien")} aria-label="Copier le lien d'invitation" data-testid="button-copy-link">
                <Copy aria-hidden="true" />
              </button>
            </div>
          </section>

          <section className="team-summary" aria-label="Statistiques de l'équipe">
            <h2>Mon équipe en chiffres</h2>
            {summary.map(item => (
              <div className="team-summary-item" key={item.label}>
                <strong>{formatNumber(item.value, isLoading)}</strong>
                <span>{item.label}</span>
              </div>
            ))}
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
            {levels.map((level, index) => (
              <article className="team-level" key={level.name} data-testid={`vip-row-${index + 1}`}>
                <h2>Équipe {level.name}</h2>
                <div className="team-level-metrics">
                  <div>
                    <strong data-testid={`text-level${index + 1}-count`}>{formatNumber(level.count, isLoading)}</strong>
                    <span>Nombre total de membres</span>
                  </div>
                  <div>
                    <strong>{level.rate === undefined ? "—" : `${level.rate}%`}</strong>
                    <span>Avantages d'équipe</span>
                  </div>
                </div>
                <button type="button" className="team-level-open" onClick={() => navigate(`/team-details?level=${index + 1}`)}>
                  Voir les membres de l'équipe {level.name} <ChevronRight aria-hidden="true" />
                </button>
              </article>
            ))}
          </section>

          <section className="team-share" aria-label="Partager mon invitation">
            <h2>Partager</h2>
            <div className="team-share-body">
              <p>Invite tes proches à rejoindre ton équipe Equinor.</p>
              <div className="team-share-links">
                {shareLinks.map(target => (
                  <a
                    key={target.name}
                    href={target.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Partager mon lien d'invitation sur ${target.name}`}
                    data-testid={`share-${target.name.toLowerCase()}`}
                    onClick={target.name === "Facebook" ? () => void copy(referralMessage, "Message de parrainage") : undefined}
                  >
                    <img src={target.icon} alt="" />
                    <span>{target.name}</span>
                  </a>
                ))}
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Copier mon message d'invitation et ouvrir Instagram"
                  data-testid="share-instagram"
                  onClick={() => void copy(referralMessage, "Message d'invitation")}
                >
                  <img src={instagramIcon} alt="" />
                  <span>Instagram</span>
                </a>
              </div>
              <p className="team-share-note">Sur Instagram, le message et le lien sont copiés : colle-les dans ta publication ou ton message.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}