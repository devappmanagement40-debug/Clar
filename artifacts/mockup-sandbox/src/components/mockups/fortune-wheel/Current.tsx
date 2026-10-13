import "./_group.css";
import "./Current.css";
import { ArrowLeft, CircleHelp, Clock3, ShieldCheck, Sparkles } from "lucide-react";

export function Current() {
  return (
    <main className="fw-page">
      <div className="fw-shell">
        <header className="fw-topbar">
          <a className="fw-back" href="#"><ArrowLeft size={18} /><span>Mon espace</span></a>
          <div className="fw-brandmark"><span className="fw-brand-dot" />EQUINOR</div>
        </header>
        <section className="fw-intro">
          <div className="fw-kicker"><span /> ESPACE RÉCOMPENSES</div>
          <h1>Un tour.<br /><em>Une surprise.</em></h1>
          <p>Chaque jour, tentez votre chance et découvrez la récompense qui vous est réservée.</p>
        </section>
        <section className="fw-content">
          <div className="fw-wheel-column">
            <div className="fw-wheel-meta"><span className="fw-live-mark" />TIRAGE DU JOUR<span className="fw-meta-rule" />EN XOF</div>
            <div className="fw-wheel-stage">
              <div className="fw-pointer" />
              <div className="fw-wheel">
                <div className="fw-wheel-empty"><CircleHelp size={35} strokeWidth={1.6} /><span>En attente des lots</span></div>
              </div>
            </div>
            <div className="fw-wheel-caption"><ShieldCheck size={15} />Résultat attribué par la plateforme</div>
          </div>
          <div className="fw-action-panel">
            <div className="fw-panel-head"><span className="fw-index">01 / RÉCOMPENSES</span><Sparkles size={18} /></div>
            <h2>Votre prochain<br />tirage vous attend.</h2>
            <p className="fw-panel-copy">Lancez votre roue. Votre récompense sera ajoutée automatiquement à votre solde.</p>
            <div className="fw-spins-meter">
              <div className="fw-meter-copy"><span>Tirages disponibles</span><strong>—<small> / —</small></strong></div>
              <div className="fw-meter-track"><span style={{ width: "0%" }} /></div>
              <div className="fw-meter-foot"><Clock3 size={13} />Renouvellement chaque jour</div>
            </div>
            <div className="fw-alert"><CircleHelp size={18} /><span>La roue est momentanément indisponible.</span></div>
            <button className="fw-spin-button" disabled><Sparkles size={18} />Lancer la roue</button>
            <div className="fw-trust-note"><ShieldCheck size={15} />Résultat attribué par la plateforme à l’issue du tirage.</div>
          </div>
        </section>
        <section className="fw-prize-strip">
          <div className="fw-prize-heading"><div><span className="fw-index">LES RÉCOMPENSES</span><h2>Ce que la roue réserve</h2></div><span className="fw-prize-count">00 LOT</span></div>
          <div className="fw-prize-empty">Les récompenses seront affichées ici dès leur activation.</div>
        </section>
      </div>
    </main>
  );
}
