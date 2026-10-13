import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, ArrowLeft, Clock3, Gift, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WheelHistoryData } from "./types";
import "./fortune-wheel.css";

const money = (amount: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(amount);

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date indisponible";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function FortuneWheelHistoryPage() {
  const historyQuery = useQuery<WheelHistoryData>({
    queryKey: ["/api/fortune-wheel/history"],
  });
  const data = historyQuery.data;

  return (
    <main className="fw-page fw-redesign fwh-page">
      <div className="fw-shell">
        <header className="fwr-header">
          <Link href="/fortune-wheel" className="fwr-icon-link" aria-label="Retour à la roue">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="fwh-header-title">Historique des gains</h1>
          <span aria-hidden="true" />
        </header>

        <div className="fwr-content">
          <section className="fwr-summary fwh-total" aria-label="Total des gains de la roue">
            <div className="fwr-member">
              <span className="fwr-member-icon"><Gift size={20} /></span>
              <div>
                <span className="fwr-overline">RÉCOMPENSES CONFIRMÉES</span>
                <strong>Total des gains de la roue</strong>
              </div>
            </div>
            <strong className="fwh-total-amount">{money(data?.totalRewards ?? 0)} <small>XOF</small></strong>
          </section>

          {historyQuery.isLoading ? (
            <section className="fwr-summary fwh-loading" aria-label="Chargement de l’historique">
              <div className="fw-skeleton fw-skeleton-copy" />
              <div className="fw-skeleton fw-skeleton-copy" />
              <div className="fw-skeleton fw-skeleton-copy" />
            </section>
          ) : historyQuery.isError ? (
            <div className="fwh-error" role="alert">
              <AlertTriangle size={18} />
              <span>Impossible de charger l’historique des gains.</span>
              <Button variant="outline" size="sm" onClick={() => historyQuery.refetch()}>Réessayer</Button>
            </div>
          ) : data?.entries.length ? (
            <section className="fwh-list" aria-label="Derniers gains de la roue">
              {data.entries.map((entry) => (
                <article className="fwh-entry" key={entry.id}>
                  <span className="fwh-entry-icon"><Gift size={18} /></span>
                  <div className="fwh-entry-copy">
                    <strong>{entry.description}</strong>
                    <time dateTime={entry.createdAt}>{formatDate(entry.createdAt)}</time>
                  </div>
                  <div className="fwh-entry-amount">
                    +{money(Number(entry.amount) || 0)}
                    <small>XOF</small>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <section className="fwh-empty">
              <Clock3 size={24} />
              <strong>Aucun gain à afficher</strong>
              <p>Les récompenses confirmées par la plateforme apparaîtront ici.</p>
            </section>
          )}

          <section className="fwr-balance-note">
            <ShieldCheck size={18} />
            <p>Seuls les gains confirmés sont affichés. Ils sont crédités au solde de revenus retirable, séparément des dépôts.</p>
          </section>
          <Link href="/fortune-wheel" className="fwh-back-link">
            <ArrowLeft size={16} /> Revenir à la roue
          </Link>
        </div>
      </div>
    </main>
  );
}
