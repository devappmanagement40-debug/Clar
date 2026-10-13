import { useMemo, useState } from "react";
import "./fortune-wheel.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeInfo,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Gift,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { WheelPageData, WheelSpinResult } from "./types";

const palette = ["#BD304C", "#232323", "#E9D9D4", "#6F2434", "#D8D0C8", "#9E263C", "#F2E9E6", "#3B3332"];
const money = (amount: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(amount);

function WheelGraphic({
  prizes,
  rotation,
  onRotationEnd,
  onSpin,
  canSpin,
  isSpinning,
}: {
  prizes: WheelPageData["prizes"];
  rotation: number;
  onRotationEnd: () => void;
  onSpin: () => void;
  canSpin: boolean;
  isSpinning: boolean;
}) {
  const wedges = useMemo(() => {
    if (!prizes.length) return [];
    const totalWeight = prizes.reduce((total, prize) => total + Math.max(0, prize.weight), 0);
    if (totalWeight <= 0) return [];
    let cumulativeWeight = 0;
    return prizes.map((prize, index) => {
      const angle = (Math.max(0, prize.weight) / totalWeight) * 360;
      const startOffset = (cumulativeWeight / totalWeight) * 360;
      const centerOffset = startOffset + angle / 2;
      const start = (startOffset - 90) * (Math.PI / 180);
      const end = (startOffset + angle - 90) * (Math.PI / 180);
      const point = (r: number, a: number) => [150 + r * Math.cos(a), 150 + r * Math.sin(a)];
      const [x1, y1] = point(139, start);
      const [x2, y2] = point(139, end);
      const large = angle > 180 ? 1 : 0;
      const [tx, ty] = point(91, (centerOffset - 90) * (Math.PI / 180));
      cumulativeWeight += Math.max(0, prize.weight);
      return {
        prize,
        d: prizes.length === 1
          ? "M 150 150 m 0 -139 a 139 139 0 1 0 0 278 a 139 139 0 1 0 0 -278"
          : `M 150 150 L ${x1} ${y1} A 139 139 0 ${large} 1 ${x2} ${y2} Z`,
        color: palette[index % palette.length],
        tx,
        ty,
        rotation: centerOffset,
      };
    });
  }, [prizes]);

  return (
    <div className="fw-wheel-stage" aria-label="Roue des récompenses">
      <div className="fw-pointer" aria-hidden="true" />
      <div
        className="fw-wheel"
        style={{ transform: `rotate(${rotation}deg)` }}
        onTransitionEnd={(event) => {
          if (event.propertyName === "transform") onRotationEnd();
        }}
      >
        {wedges.length ? (
          <svg viewBox="0 0 300 300" role="img" aria-label={`${prizes.length} récompenses disponibles`}>
            <circle cx="150" cy="150" r="146" fill="#fff" stroke="#181818" strokeWidth="4" />
            {wedges.map((wedge) => (
              <g key={wedge.prize.id}>
                <path d={wedge.d} fill={wedge.color} stroke="#181818" strokeWidth="2.5" />
                <text
                  x={wedge.tx}
                  y={wedge.ty}
                  transform={`rotate(${wedge.rotation}, ${wedge.tx}, ${wedge.ty})`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={["#232323", "#D8D0C8", "#F2E9E6", "#E9D9D4"].includes(wedge.color) ? "#171717" : "#fff"}
                  fontSize={prizes.length > 6 ? "10" : "12"}
                  fontWeight="800"
                  letterSpacing=".1"
                >
                  {wedge.prize.label.length > 15 ? `${wedge.prize.label.slice(0, 13)}…` : wedge.prize.label}
                </text>
              </g>
            ))}
            <circle cx="150" cy="150" r="35" fill="#fff" stroke="#181818" strokeWidth="4" />
            <circle cx="150" cy="150" r="25" fill="#BD304C" />
            <path d="M143 150h14m-7-7v14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <div className="fw-wheel-empty">
            <CircleHelp size={35} strokeWidth={1.6} />
            <span>En attente des lots</span>
          </div>
        )}
      </div>
      {prizes.length > 0 ? (
        <button
          type="button"
          className="fw-wheel-go"
          onClick={onSpin}
          disabled={!canSpin}
          aria-label={isSpinning ? "Tirage en cours" : "Lancer la roue"}
        >
          {isSpinning ? <RotateCw className="fw-spin-icon" size={22} /> : <span>GO</span>}
        </button>
      ) : null}
    </div>
  );
}

function LoadingPage() {
  return (
    <main className="fw-page">
      <div className="fw-shell">
        <div className="fw-topbar"><div className="fw-skeleton fw-skeleton-short" /><div className="fw-skeleton fw-skeleton-round" /></div>
        <div className="fw-loading-layout">
          <div className="fw-skeleton fw-skeleton-title" />
          <div className="fw-skeleton fw-skeleton-wheel" />
          <div className="fw-skeleton fw-skeleton-copy" />
        </div>
      </div>
    </main>
  );
}

export default function FortuneWheelPage() {
  const { user, refreshUser } = useAuth();
  const [rulesOpen, setRulesOpen] = useState(false);
  const [result, setResult] = useState<WheelSpinResult | null>(null);
  const [pendingResult, setPendingResult] = useState<WheelSpinResult | null>(null);
  const [rotation, setRotation] = useState(0);
  const statusQuery = useQuery<WheelPageData>({ queryKey: ["/api/fortune-wheel"] });
  const spinMutation = useMutation({
    mutationFn: async (): Promise<WheelSpinResult> => {
      const response = await apiRequest("POST", "/api/fortune-wheel/spin");
      if (!response.ok) {
        let message = "Le tirage n’a pas pu être effectué.";
        try {
          const error = await response.json();
          message = error.message || message;
        } catch { /* Keep the French fallback message. */ }
        throw new Error(message);
      }
      return response.json();
    },
    onSuccess: (data) => {
      const activePrizes = statusQuery.data?.prizes.filter((prize) => prize.isActive) ?? [];
      const totalWeight = activePrizes.reduce((total, prize) => total + Math.max(0, prize.weight), 0);
      let cumulativeWeight = 0;
      const selectedPrize = activePrizes.find((prize) => prize.id === data.prize.id);
      if (selectedPrize && totalWeight > 0) {
        for (const prize of activePrizes) {
          if (prize.id === data.prize.id) break;
          cumulativeWeight += Math.max(0, prize.weight);
        }
        const centerOffset = ((cumulativeWeight + Math.max(0, selectedPrize.weight) / 2) / totalWeight) * 360;
        const targetRotation = (360 - centerOffset + 360) % 360;
        setResult(null);
        setPendingResult(data);
        setRotation((current) => current + 5 * 360 + ((targetRotation - (current % 360) + 360) % 360));
      } else {
        setResult(data);
      }
      queryClient.invalidateQueries({ queryKey: ["/api/fortune-wheel"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      void refreshUser();
    },
  });

  if (statusQuery.isLoading) return <LoadingPage />;

  const page = statusQuery.data;
  const prizes = page?.prizes?.filter((prize) => prize.isActive) ?? [];
  const canSpin = Boolean(
    page?.isEnabled
    && page.spinsRemaining > 0
    && prizes.some((prize) => prize.weight > 0)
    && !spinMutation.isPending
    && !pendingResult,
  );
  const isSpinning = spinMutation.isPending || Boolean(pendingResult);
  const balance = Number(user?.balance ?? 0);
  const totalRewards = page?.totalRewards ?? 0;
  const spinsUsedPercent = page?.spinsPerDay
    ? Math.min(100, Math.max(0, (page.spinsUsed / page.spinsPerDay) * 100))
    : 0;
  const completeWheelAnimation = () => {
    if (!pendingResult) return;
    setResult(pendingResult);
    setPendingResult(null);
    setRotation((current) => current % 360);
  };
  const unavailableReason = !page?.isEnabled
    ? "La roue est momentanément indisponible."
    : !prizes.length
      ? "Aucune récompense n’est disponible pour le moment."
      : !prizes.some((prize) => prize.weight > 0)
        ? "Aucun lot avec une probabilité active n’est disponible pour le moment."
      : page.spinsRemaining <= 0
        ? "Vous avez utilisé tous vos tirages du jour."
        : "";

  return (
    <main className="fw-page fw-redesign">
      <div className="fw-shell">
        <header className="fwr-header">
          <Link href="/" className="fwr-icon-link" aria-label="Retour à l’accueil"><ArrowLeft size={20} /></Link>
          <h1>Tirage au sort</h1>
          <Link href="/fortune-wheel/history" className="fwr-icon-link" aria-label="Historique des gains"><Clock3 size={20} /></Link>
        </header>

        <div className={`fwr-status ${page?.isEnabled && canSpin ? "is-active" : ""}`} role="status">
          <span className="fwr-status-dot" />
          <strong>{page?.isEnabled && canSpin ? "Roue disponible" : "Roue indisponible"}</strong>
          <span className="fwr-status-separator" />
          <span>{page?.isEnabled ? `${page.spinsRemaining} tirage${page.spinsRemaining === 1 ? "" : "s"} disponible${page.spinsRemaining === 1 ? "" : "s"}` : "Tirages suspendus"}</span>
        </div>

        <div className="fwr-content">
          <section className="fwr-summary" aria-label="Résumé du compte">
            <div className="fwr-summary-top">
              <div className="fwr-member">
                <span className="fwr-member-icon"><Gift size={20} /></span>
                <div>
                  <span className="fwr-overline">VOTRE COMPTE</span>
                  <strong>{user?.phone ? maskPhone(user.phone) : "Mes récompenses"}</strong>
                </div>
              </div>
              <Link href="/withdrawal" className="fwr-withdraw">
                <Wallet size={15} /> Retirer
              </Link>
            </div>

            <div className="fwr-balance-row">
              <div>
                <span className="fwr-muted-label">Solde de revenus</span>
                <strong>{money(balance)} <small>XOF</small></strong>
              </div>
              <div className="fwr-summary-total">
                <span className="fwr-muted-label">Gains confirmés à la roue</span>
                <strong>{money(totalRewards)} <small>XOF</small></strong>
              </div>
            </div>

            <div className="fwr-progress-head">
              <span>Tirages utilisés aujourd’hui</span>
              <strong>{page ? `${page.spinsUsed} / ${page.spinsPerDay}` : "—"}</strong>
            </div>
            <div className="fwr-progress" aria-label={`${page?.spinsUsed ?? 0} tirages utilisés sur ${page?.spinsPerDay ?? 0}`}>
              <span style={{ width: `${spinsUsedPercent}%` }} />
            </div>
            <p className="fwr-progress-note">Cette progression indique les tirages effectués. Elle ne conditionne pas les retraits.</p>
          </section>

          <section className="fwr-wheel-card" aria-label="Roue des récompenses">
            <div className="fwr-wheel-eyebrow"><span>ROUE DES RÉCOMPENSES</span><span className="fwr-rule" /><span>XOF</span></div>
            <WheelGraphic
              prizes={prizes}
              rotation={rotation}
              onRotationEnd={completeWheelAnimation}
              onSpin={() => { setResult(null); spinMutation.mutate(); }}
              canSpin={canSpin}
              isSpinning={isSpinning}
            />
            <div className="fwr-wheel-caption"><ShieldCheck size={15} /> Lots et résultats gérés par la plateforme</div>
          </section>

          <section className="fwr-draw-actions">
            <div className="fwr-draw-copy">
              <span className="fwr-overline">VOTRE PROCHAINE ÉTAPE</span>
              <h2>{canSpin ? "Lancez votre roue." : "Votre roue vous attend."}</h2>
              <p>{canSpin ? "Appuyez sur GO pour lancer le tirage." : "Les tirages seront accessibles dès que la roue et ses lots seront activés."}</p>
            </div>

            {statusQuery.isError ? (
              <div className="fwr-alert fwr-alert-error" role="alert">
                <AlertTriangle size={18} />
                <span>Impossible de charger la roue. Vérifiez votre connexion puis réessayez.</span>
                <Button variant="outline" size="sm" onClick={() => statusQuery.refetch()}>Réessayer</Button>
              </div>
            ) : null}
            {unavailableReason && !statusQuery.isError ? (
              <div className="fwr-alert" role="status"><CircleHelp size={18} /><span>{unavailableReason}</span></div>
            ) : null}
            {spinMutation.isError ? (
              <div className="fwr-alert fwr-alert-error" role="alert"><AlertTriangle size={18} /><span>{spinMutation.error.message || "Une erreur est survenue. Réessayez."}</span></div>
            ) : null}
            {result ? (
              <div className="fwr-result" role="status" aria-live="polite">
                <span className="fwr-result-icon"><Check size={18} /></span>
                <div>
                  <span className="fwr-overline">RÉCOMPENSE CONFIRMÉE</span>
                  <strong>{result.prize.label}</strong>
                  <p>
                    {result.prize.amount > 0
                      ? `${money(result.prize.amount)} XOF ajoutés au solde de revenus.`
                      : "Ce résultat n’ajoute pas de montant au solde."}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="fwr-links">
              <button type="button" onClick={() => setRulesOpen(true)}>
                <span className="fwr-link-icon"><BadgeInfo size={18} /></span>
                <span><strong>Règles de la roue</strong><small>Fonctionnement et conditions</small></span>
                <ChevronRight size={18} />
              </button>
              <Link href="/fortune-wheel/history">
                <span className="fwr-link-icon"><Clock3 size={18} /></span>
                <span><strong>Historique des gains</strong><small>Vos récompenses confirmées</small></span>
                <ChevronRight size={18} />
              </Link>
            </div>
          </section>

          <section className="fwr-balance-note">
            <ShieldCheck size={18} />
            <p>Les gains en espèces confirmés sont crédités au solde de revenus retirable. Les dépôts restent séparés.</p>
          </section>

          <section className="fw-prize-strip" aria-label="Lots disponibles">
            <div className="fw-prize-heading">
              <div><span className="fw-index">RÉCOMPENSES</span><h2>Lots disponibles</h2></div>
              <span className="fw-prize-count">{prizes.length.toString().padStart(2, "0")} LOTS</span>
            </div>
            {prizes.length ? (
              <div className="fw-prize-list">
                {prizes.map((prize, index) => (
                  <div className="fw-prize-item" key={prize.id}>
                    <span className="fw-prize-no">{String(index + 1).padStart(2, "0")}</span>
                    <span className="fw-prize-name">{prize.label}</span>
                    <strong>{money(prize.amount)} <small>XOF</small></strong>
                  </div>
                ))}
              </div>
            ) : (
              <div className="fw-prize-empty">Les récompenses seront affichées ici dès leur activation.</div>
            )}
          </section>
        </div>
      </div>

      <Dialog open={rulesOpen} onOpenChange={setRulesOpen}>
        <DialogContent className="fwr-dialog">
          <DialogHeader className="fwr-dialog-header">
            <span className="fwr-link-icon"><BadgeInfo size={20} /></span>
            <div><span className="fwr-overline">INFORMATIONS</span><DialogTitle>Règles de la roue</DialogTitle></div>
          </DialogHeader>
          <DialogDescription className="fwr-dialog-description">
            {page?.isEnabled
              ? `La limite configurée est de ${page.spinsPerDay} tirage${page.spinsPerDay === 1 ? "" : "s"} par jour. Les tirages restants sont indiqués sur cette page.`
              : "La roue restera indisponible tant que l’administrateur ne l’aura pas activée et configuré ses lots."}
          </DialogDescription>
          <div className="fwr-rule-list">
            <div><span>01</span><p>Le résultat est sélectionné et confirmé par le serveur au moment du tirage.</p></div>
            <div><span>02</span><p>Les gains en espèces confirmés sont ajoutés au solde de revenus retirable. Le solde des dépôts reste séparé.</p></div>
            <div><span>03</span><p>La barre de progression indique uniquement les tirages utilisés. Elle n’est pas une condition de retrait.</p></div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function maskPhone(phone: string) {
  if (phone.length <= 5) return phone;
  return `${phone.slice(0, 2)}${"*".repeat(Math.min(4, phone.length - 4))}${phone.slice(-2)}`;
}
