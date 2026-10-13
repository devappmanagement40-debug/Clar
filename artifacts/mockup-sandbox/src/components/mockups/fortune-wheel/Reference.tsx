import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeInfo,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Gift,
  House,
  RotateCw,
  ShieldCheck,
  Trophy,
  Wallet,
  X,
} from "lucide-react";
import "./Reference.css";

type Overlay = "rules" | "history" | null;

const segments = [
  { label: "À configurer", color: "#f3e8e9" },
  { label: "Illustratif", color: "#e9d9dc" },
  { label: "À configurer", color: "#f7f3f1" },
  { label: "Illustratif", color: "#ead6da" },
  { label: "À configurer", color: "#f3e8e9" },
  { label: "Illustratif", color: "#e9d9dc" },
  { label: "À configurer", color: "#f7f3f1" },
  { label: "Illustratif", color: "#ead6da" },
];

export function Reference() {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [rotation, setRotation] = useState(0);
  const [demoSpun, setDemoSpun] = useState(false);

  const closeOverlay = () => setOverlay(null);
  const tryDemo = () => {
    if (demoSpun) return;
    setRotation((value) => value + 720 + Math.floor(Math.random() * 360));
    setDemoSpun(true);
  };

  return (
    <main className="fw-ref">
      <div className="fw-ref-device">
        <header className="fw-ref-header">
          <button className="fw-ref-back" type="button" aria-label="Retour">
            <ArrowLeft size={19} />
          </button>
          <div className="fw-ref-title">Roue des récompenses</div>
          <button className="fw-ref-help" type="button" onClick={() => setOverlay("rules")} aria-label="Aide">
            <CircleHelp size={19} />
          </button>
        </header>

        <div className="fw-ref-status" role="status">
          <span className="fw-ref-status-dot" />
          <span>Roue indisponible</span>
          <span className="fw-ref-status-divider" />
          <span>Configuration en attente</span>
        </div>

        <div className="fw-ref-scroll">
          <section className="fw-ref-summary" aria-label="Résumé des récompenses">
            <div className="fw-ref-summary-top">
              <div className="fw-ref-member">
                <span className="fw-ref-member-icon"><Gift size={17} /></span>
                <div>
                  <span className="fw-ref-label">ESPACE MEMBRE</span>
                  <strong>Vos récompenses</strong>
                </div>
              </div>
              <span className="fw-ref-zero-tag">0 XOF</span>
            </div>
            <div className="fw-ref-summary-caption">
              <span>Récompenses gagnées</span>
              <strong>0 <small>XOF</small></strong>
            </div>
            <div className="fw-ref-progress-head">
              <span>Progression</span>
              <strong>0 %</strong>
            </div>
            <div className="fw-ref-progress" aria-label="Progression : 0 pour cent"><span /></div>
            <p className="fw-ref-progress-note">Cette progression est informative et ne conditionne pas vos retraits.</p>
          </section>

          <section className="fw-ref-wheel-card">
            <div className="fw-ref-wheel-eyebrow"><span>RÉCOMPENSES</span><span className="fw-ref-eyebrow-line" /><span>XOF</span></div>
            <div className="fw-ref-wheel-wrap">
              <span className="fw-ref-pointer" aria-hidden="true" />
              <div className="fw-ref-wheel" style={{ transform: `rotate(${rotation}deg)` }}>
                <div className="fw-ref-wedges">
                  {segments.map((segment, index) => (
                    <div
                      className="fw-ref-wedge"
                      key={`${segment.label}-${index}`}
                      style={{ background: segment.color, transform: `rotate(${index * 45}deg) skewY(-45deg)` }}
                    >
                      <span>{segment.label}</span>
                    </div>
                  ))}
                </div>
                <div className="fw-ref-wheel-center"><span><Gift size={24} /></span></div>
              </div>
            </div>
            <div className="fw-ref-wheel-foot"><ShieldCheck size={14} /> Lots et résultats gérés par la plateforme</div>
            <div className="fw-ref-wheel-note"><BadgeInfo size={15} /> Segments décoratifs — aucune récompense n’est configurée.</div>
          </section>

          <section className="fw-ref-actions">
            <div className="fw-ref-draw-row">
              <div>
                <span className="fw-ref-label">VOTRE ESPACE</span>
                <h1>Un tour, une récompense.</h1>
                <p>La roue sera activée après la configuration des lots par l’administrateur.</p>
              </div>
              <span className="fw-ref-draw-count"><strong>0</strong><small>tirages</small></span>
            </div>
            <div className="fw-ref-neutral-alert"><Clock3 size={17} /><span>Les tirages ne sont pas disponibles pour le moment.</span></div>
            <button className="fw-ref-spin" type="button" disabled aria-disabled="true">
              <RotateCw size={17} /> Lancer la roue
            </button>
            <button className="fw-ref-demo" type="button" onClick={tryDemo} disabled={demoSpun}>
              {demoSpun ? <Check size={16} /> : <RotateCw size={16} />}
              {demoSpun ? "Aperçu effectué" : "Essayer une animation illustrative"}
            </button>
            {demoSpun && <p className="fw-ref-demo-note" role="status">Aperçu visuel uniquement. Aucun tirage ni crédit n’a été effectué.</p>}
          </section>

          <section className="fw-ref-links">
            <button type="button" onClick={() => setOverlay("rules")}>
              <span className="fw-ref-link-icon"><CircleHelp size={18} /></span>
              <span><strong>Règles de la roue</strong><small>Fonctionnement et conditions</small></span>
              <ChevronRight size={18} />
            </button>
            <button type="button" onClick={() => setOverlay("history")}>
              <span className="fw-ref-link-icon"><Clock3 size={18} /></span>
              <span><strong>Historique des gains</strong><small>Consulter vos récompenses</small></span>
              <ChevronRight size={18} />
            </button>
          </section>

          <section className="fw-ref-balance-info">
            <ShieldCheck size={17} />
            <p>Les gains en espèces confirmés sont crédités directement dans votre solde retirable. Les dépôts restent séparés.</p>
          </section>
          <div className="fw-ref-footer">Une expérience de récompenses transparente.</div>
        </div>

        <nav className="fw-ref-bottom-nav" aria-label="Navigation principale">
          <button type="button"><House size={19} /><span>Accueil</span></button>
          <button type="button" className="is-active" aria-current="page"><Gift size={19} /><span>Récompenses</span></button>
          <button type="button"><Wallet size={19} /><span>Portefeuille</span></button>
          <button type="button"><Trophy size={19} /><span>Activité</span></button>
        </nav>

        {overlay && (
          <div className="fw-ref-overlay" role="presentation" onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeOverlay();
          }}>
            <section className="fw-ref-dialog" role="dialog" aria-modal="true" aria-labelledby="fw-ref-dialog-title">
              <div className="fw-ref-dialog-head">
                <div className="fw-ref-dialog-icon">{overlay === "rules" ? <BadgeInfo size={20} /> : <Clock3 size={20} />}</div>
                <div>
                  <span className="fw-ref-label">{overlay === "rules" ? "INFORMATIONS" : "VOTRE ACTIVITÉ"}</span>
                  <h2 id="fw-ref-dialog-title">{overlay === "rules" ? "Règles de la roue" : "Historique des gains"}</h2>
                </div>
                <button className="fw-ref-close" type="button" onClick={closeOverlay} aria-label="Fermer"><X size={19} /></button>
              </div>
              {overlay === "rules" ? (
                <div className="fw-ref-rules">
                  <p>La roue est temporairement inactive. Elle sera disponible lorsque les lots auront été configurés par l’administrateur.</p>
                  <div className="fw-ref-rule-item"><span>01</span><p>Les tirages et lots disponibles seront indiqués sur cette page une fois la configuration terminée.</p></div>
                  <div className="fw-ref-rule-item"><span>02</span><p>Seul un résultat confirmé par la plateforme peut donner lieu à un crédit de récompense.</p></div>
                  <div className="fw-ref-rule-item"><span>03</span><p>Les gains en espèces confirmés rejoignent le solde retirable. Les dépôts sont conservés séparément.</p></div>
                  <div className="fw-ref-rule-item"><span>04</span><p>La progression affichée est informative et n’est pas une condition de retrait.</p></div>
                </div>
              ) : (
                <div className="fw-ref-history-empty">
                  <span className="fw-ref-history-mark"><Clock3 size={22} /></span>
                  <strong>Aucun gain à afficher</strong>
                  <p>Vos récompenses confirmées apparaîtront ici.</p>
                  <div className="fw-ref-history-zero"><span>Total des gains</span><strong>0 XOF</strong></div>
                </div>
              )}
              <button className="fw-ref-confirm" type="button" onClick={closeOverlay}>
                Compris <ArrowRight size={16} />
              </button>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default Reference;
