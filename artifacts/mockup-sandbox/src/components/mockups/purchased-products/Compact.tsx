import "./_group.css";

const productImage = "/__mockup/images/purchased-vip-vending.png";

export default function Compact() {
  return (
    <main className="purchased-card-stage">
      <article className="purchased-card purchased-card-compact">
        <header className="purchased-card-heading">
          <div className="purchased-card-image">
            <img src={productImage} alt="" />
          </div>
          <div className="purchased-card-title">
            <h2>VIP 1</h2>
            <p><span>Achat</span><strong>2 500 XOF</strong></p>
          </div>
        </header>

        <div className="purchased-card-data">
          <div className="purchased-card-metric">
            <span>Jours d’exécution</span>
            <strong>28 / 90</strong>
          </div>
          <div className="purchased-card-metric">
            <span>Revenu généré</span>
            <strong>11 200 XOF</strong>
          </div>
          <div className="purchased-card-metric">
            <span>Revenu total</span>
            <strong>36 000 XOF</strong>
          </div>
          <div className="purchased-card-metric purchased-card-date">
            <span>Date d’achat</span>
            <strong>20 Jul 2026, 15:00</strong>
          </div>
        </div>
      </article>

      <style>{`
        .purchased-card-stage {
          box-sizing: border-box;
          min-height: 100%;
          padding: 18px 12px;
          background: #f5f5f6;
          color: var(--purchased-card-ink);
          font-family: Inter, Arial, sans-serif;
        }
        .purchased-card,
        .purchased-card * { box-sizing: border-box; }
        .purchased-card-compact {
          display: flex;
          width: min(100%, 390px);
          min-height: 0;
          flex-direction: column;
          gap: 10px;
          margin: 0 auto;
          padding: 12px;
          border: 2px solid var(--purchased-card-border);
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 3px 0 var(--purchased-card-border), 0 8px 18px rgba(17,24,39,.12);
        }
        .purchased-card-heading {
          display: grid;
          min-width: 0;
          grid-template-columns: 62px minmax(0, 1fr);
          align-items: center;
          gap: 11px;
        }
        .purchased-card-image {
          width: 62px;
          height: 62px;
          overflow: hidden;
          border: 2px solid var(--purchased-card-red);
          border-radius: 10px;
          background: #fff;
        }
        .purchased-card-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .purchased-card-title { min-width: 0; }
        .purchased-card-title h2 {
          margin: 0;
          overflow: hidden;
          color: var(--purchased-card-red);
          font-size: 17px;
          font-weight: 900;
          line-height: 1.2;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .purchased-card-title p {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 4px 8px;
          margin: 6px 0 0;
          color: var(--purchased-card-muted);
          font-size: 12px;
          line-height: 1.2;
        }
        .purchased-card-title p strong {
          color: var(--purchased-card-ink);
          font-size: 14px;
          font-weight: 800;
        }
        .purchased-card-data {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px 12px;
          padding-top: 9px;
          border-top: 1px solid #e5e7eb;
        }
        .purchased-card-metric {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 3px;
          color: var(--purchased-card-muted);
          font-size: 11px;
          line-height: 1.2;
        }
        .purchased-card-metric strong {
          overflow-wrap: anywhere;
          color: var(--purchased-card-ink);
          font-size: 13px;
          font-weight: 800;
        }
        .purchased-card-date {
          grid-column: 1 / -1;
          flex-direction: row;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
        }
        .purchased-card-date strong { text-align: right; }
        @media (max-width: 360px) {
          .purchased-card-stage { padding: 14px 10px; }
          .purchased-card-compact { padding: 10px; }
          .purchased-card-data { gap: 8px; }
          .purchased-card-metric { font-size: 10px; }
          .purchased-card-metric strong { font-size: 12px; }
        }
      `}</style>
    </main>
  );
}
