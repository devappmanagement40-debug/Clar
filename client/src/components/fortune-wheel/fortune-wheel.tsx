import { useMemo, useState } from "react";
import "./fortune-wheel.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Check, CircleHelp, Clock3, RotateCw, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";
import type { WheelPageData, WheelSpinResult } from "./types";

const palette = ["#BD304C", "#232323", "#E9D9D4", "#6F2434", "#D8D0C8", "#9E263C", "#F2E9E6", "#3B3332"];
const money = (amount: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(amount);

function WheelGraphic({
  prizes,
  rotation,
  onRotationEnd,
}: {
  prizes: WheelPageData["prizes"];
  rotation: number;
  onRotationEnd: () => void;
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
  const { refreshUser } = useAuth();
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
  const canSpin = Boolean(page?.isEnabled && page.spinsRemaining > 0 && prizes.length > 0 && !spinMutation.isPending && !pendingResult);
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
      : page.spinsRemaining <= 0
        ? "Vous avez utilisé tous vos tirages du jour."
        : "";

  return (
    <main className="fw-page">
      <div className="fw-shell">
        <header className="fw-topbar">
          <Link href="/" className="fw-back"><ArrowLeft size={18} /><span>Mon espace</span></Link>
          <div className="fw-brandmark" aria-label="Equinor"><span className="fw-brand-dot" />EQUINOR</div>
        </header>

        <section className="fw-intro">
          <div className="fw-kicker"><span /> ESPACE RÉCOMPENSES</div>
          <h1>Un tour.<br /><em>Une surprise.</em></h1>
          <p>Chaque jour, tentez votre chance et découvrez la récompense qui vous est réservée.</p>
        </section>

        <section className="fw-content" aria-label="Roue de la fortune">
          <div className="fw-wheel-column">
            <div className="fw-wheel-meta"><span className="fw-live-mark" />TIRAGE DU JOUR <span className="fw-meta-rule" /> <span>EN XOF</span></div>
            <WheelGraphic prizes={prizes} rotation={rotation} onRotationEnd={completeWheelAnimation} />
            <div className="fw-wheel-caption"><ShieldCheck size={15} /> Résultat attribué par la plateforme</div>
          </div>

          <div className="fw-action-panel">
            <div className="fw-panel-head">
              <span className="fw-index">01 / RÉCOMPENSES</span>
              <Sparkles size={18} strokeWidth={1.7} />
            </div>
            <h2>Votre prochain<br />tirage vous attend.</h2>
            <p className="fw-panel-copy">Lancez votre roue. Votre récompense sera ajoutée automatiquement à votre solde.</p>

            <div className="fw-spins-meter">
              <div className="fw-meter-copy"><span>Tirages disponibles</span><strong>{page?.spinsRemaining ?? "—"}<small> / {page?.spinsPerDay ?? "—"}</small></strong></div>
              <div className="fw-meter-track" aria-label={`${page?.spinsRemaining ?? 0} tirages restants sur ${page?.spinsPerDay ?? 0}`}>
                <span style={{ width: `${page && page.spinsPerDay > 0 ? Math.max(0, Math.min(100, (page.spinsRemaining / page.spinsPerDay) * 100)) : 0}%` }} />
              </div>
              <div className="fw-meter-foot"><Clock3 size={13} /> Renouvellement chaque jour</div>
            </div>

            {statusQuery.isError ? (
              <div className="fw-alert fw-alert-error" role="alert">
                <AlertTriangle size={18} />
                <div><strong>Chargement impossible</strong><span>Vérifiez votre connexion puis réessayez.</span></div>
                <Button variant="outline" size="sm" onClick={() => statusQuery.refetch()}>Réessayer</Button>
              </div>
            ) : null}

            {unavailableReason && !statusQuery.isError ? (
              <div className="fw-alert" role="status"><CircleHelp size={18} /><span>{unavailableReason}</span></div>
            ) : null}

            {spinMutation.isError ? (
              <div className="fw-alert fw-alert-error" role="alert"><AlertTriangle size={18} /><span>{spinMutation.error.message || "Une erreur est survenue. Réessayez."}</span></div>
            ) : null}

            <Button
              className="fw-spin-button"
              disabled={!canSpin}
              onClick={() => { setResult(null); spinMutation.mutate(); }}
              aria-label={spinMutation.isPending ? "Tirage en cours" : "Lancer la roue"}
            >
              {spinMutation.isPending || pendingResult ? <RotateCw className={spinMutation.isPending || pendingResult ? "fw-spin-icon" : ""} size={18} /> : <Sparkles size={18} />}
              {spinMutation.isPending ? "Tirage en cours…" : pendingResult ? "Révélation…" : "Lancer la roue"}
            </Button>

            {result ? (
              <div className="fw-result" role="status" aria-live="polite">
                <div className="fw-result-icon"><Check size={19} /></div>
                <div className="fw-result-body">
                  <span>RÉCOMPENSE CONFIRMÉE</span>
                  <strong>{result.prize.label}</strong>
                  <div className="fw-result-line"><b>{money(result.prize.amount)} XOF</b><span>Solde : {result.balance} XOF</span></div>
                </div>
              </div>
            ) : null}
            <div className="fw-trust-note"><ShieldCheck size={15} /><span>Résultat attribué par la plateforme à l’issue du tirage.</span></div>
          </div>
        </section>

        <section className="fw-prize-strip" aria-label="Lots disponibles">
          <div className="fw-prize-heading"><div><span className="fw-index">LES RÉCOMPENSES</span><h2>Ce que la roue réserve</h2></div><span className="fw-prize-count">{prizes.length.toString().padStart(2, "0")} LOTS</span></div>
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
        <footer className="fw-footer"><span>Votre espace de confiance</span><span>Les conditions du tirage s’appliquent.</span></footer>
      </div>
    </main>
  );
}
