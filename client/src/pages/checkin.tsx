import { useAuth } from "@/lib/auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { getCountryByCode } from "@/lib/countries";
import { CalendarCheck, ChevronLeft, Coins, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { equinorLogo, equinorPhone } from "@/assets/equinor-media";

interface BonusStatus {
  canClaim: boolean;
  hoursRemaining: number;
  totalBonusClaimed: number;
  daysPointed: number;
}

export default function CheckinPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const { data: bonusStatus, isLoading: bonusStatusLoading } = useQuery<BonusStatus>({
    queryKey: ["/api/daily-bonus-status"],
    refetchInterval: 60000,
  });

  const claimMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/claim-daily-bonus", {});
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Récompense indisponible");
      }
      return response.json();
    },
    onSuccess: (data: { amount?: number }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/daily-bonus-status"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      const amount = Number(data?.amount || 0);
      toast({ title: "Bonus reçu !", description: `${amount} FCFA ajoutés à votre solde` });
    },
    onError: (error: Error) => {
      toast({ title: "Récompense indisponible", description: error.message, variant: "destructive" });
    },
  });

  if (!user) return null;

  const country = getCountryByCode(user.country);
  const currency = country?.currency || "XOF";
  const totalBonusClaimed = bonusStatus?.totalBonusClaimed || 0;
  const canClaim = Boolean(bonusStatus?.canClaim);
  const formatAmount = (amount: number) => `${Math.round(amount).toLocaleString("fr-FR")} ${currency}`;

  return (
    <main className="checkin-reference min-h-full bg-[#f4f4f4] pb-20">
      <style>{`
        .checkin-reference {
          color: #111827;
          font-family: Inter, Arial, sans-serif;
          background: #ffffff;
        }
        .checkin-reference .checkin-screen {
          width: 100%;
          max-width: 512px;
          min-height: 100%;
          margin: 0 auto;
          overflow: hidden;
          background: #ffffff;
        }
        .checkin-reference .topbar {
          display: flex;
          min-height: 72px;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 12px;
          border-bottom: 2px solid #111827;
          background: #ffffff;
        }
        .checkin-reference .back {
          display: inline-flex;
          min-height: 42px;
          align-items: center;
          gap: 5px;
          padding: 7px 11px 7px 7px;
          border: 2px solid #111827;
          border-radius: 11px;
          background: #fff;
          color: #111827;
          font-size: 14px;
          font-weight: 800;
          box-shadow: 0 3px 0 #111827;
        }
        .checkin-reference .back:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 #111827;
        }
        .checkin-reference .back svg {
          width: 22px;
          height: 22px;
          stroke-width: 3;
        }
        .checkin-reference .brand {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #111827;
          font-size: 15px;
          font-weight: 800;
        }
        .checkin-reference .brand img {
          width: 32px;
          height: 32px;
          border: 2px solid #111827;
          border-radius: 50%;
          background: #fff;
          object-fit: contain;
        }
        .checkin-reference .topbar-badge {
          padding: 6px 7px;
          border: 2px solid #bd304c;
          border-radius: 10px;
          color: #9e263c;
          font-size: 8px;
          font-weight: 800;
        }
        .checkin-reference .hero {
          position: relative;
          height: min(54vw, 276px);
          min-height: 210px;
          overflow: hidden;
          border-bottom: 2px solid #111827;
          background: #111827;
        }
        .checkin-reference .hero-art {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .checkin-reference .hero-art::after {
          position: absolute;
          z-index: 1;
          inset: 0;
          background: linear-gradient(180deg, rgba(17, 24, 39, .06), rgba(17, 24, 39, .44));
          content: "";
          pointer-events: none;
        }
        .checkin-reference .hero-art img {
          position: relative;
          z-index: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
        }
        .checkin-reference .hero-copy {
          position: absolute;
          z-index: 3;
          right: 18px;
          bottom: 16px;
          left: 18px;
          color: #fff;
          text-align: right;
          text-shadow: 0 2px 4px rgba(0,0,0,.35);
        }
        .checkin-reference .hero-copy strong {
          display: block;
          font-size: 27px;
          font-weight: 900;
          line-height: 1;
        }
        .checkin-reference .hero-copy span {
          display: inline-block;
          max-width: 320px;
          margin-top: 5px;
          font-size: 13px;
          font-weight: 700;
        }
        .checkin-reference .earnings-card {
          position: relative;
          z-index: 4;
          margin: 14px 16px 0;
          padding: 12px;
          border: 2px solid #111827;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 4px 0 #111827;
        }
        .checkin-reference .reward-panel {
          margin: 14px 16px 0;
          padding: 16px;
          border: 2px solid #111827;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 4px 0 #111827;
        }
        .checkin-reference .reward-heading {
          margin: 0;
          color: #111827;
          font-size: 19px;
          font-weight: 900;
          line-height: 1.05;
        }
        .checkin-reference .reward-heading span {
          color: #9e263c;
        }
        .checkin-reference .reward-row {
          margin-top: 12px;
        }
        .checkin-reference .reward-copy p {
          margin: 0;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.35;
          text-align: center;
        }
        .checkin-reference .reward-copy strong {
          display: block;
          margin-top: 8px;
          color: #9e263c;
          font-size: clamp(30px, 8vw, 38px);
          font-weight: 900;
          line-height: 1;
          text-align: center;
        }
        .checkin-reference .stat {
          min-height: 100px;
          padding: 12px 8px;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #fff;
          text-align: center;
        }
        .checkin-reference .stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        .checkin-reference .stat-icon {
          width: 22px;
          height: 22px;
          margin-bottom: 5px;
          color: #bd304c;
          stroke-width: 2.4;
        }
        .checkin-reference .stat-value {
          margin: 0;
          color: #9e263c;
          font-size: 28px;
          font-weight: 900;
          line-height: 1;
        }
        .checkin-reference .stat-value span {
          padding-left: 4px;
          font-size: 17px;
        }
        .checkin-reference .stat-value.secondary {
          font-size: clamp(16px, 4vw, 22px);
        }
        .checkin-reference .stat-label {
          margin: 7px 0 0;
          color: #4b5563;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.2;
        }
        .checkin-reference .claim {
          display: flex;
          width: calc(100% - 32px);
          min-height: 58px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin: 14px 16px 0;
          border: 2px solid #111827;
          border-radius: 12px;
          background: #bd304c;
          color: #ffffff;
          font-size: clamp(16px, 4.8vw, 19px);
          font-weight: 900;
          line-height: 1;
          box-shadow: 0 4px 0 #111827;
        }
        .checkin-reference .claim:active:not(:disabled) {
          transform: translateY(3px);
          box-shadow: 0 1px 0 #111827;
        }
        .checkin-reference .claim:disabled {
          background: #f2c4cf;
          color: #6b7280;
          box-shadow: 0 3px 0 #111827;
        }
        .checkin-reference .claim svg {
          width: 24px;
          height: 24px;
        }
        .checkin-reference .instructions {
          margin: 14px 16px 24px;
          padding: 16px 16px 7px;
          border: 2px solid #111827;
          border-top: 5px solid #bd304c;
          border-radius: 14px;
          background: #fff;
        }
        .checkin-reference .instructions h2 {
          margin: 0 0 15px;
          color: #111827;
          font-size: 18px;
          font-weight: 900;
        }
        .checkin-reference .instruction {
          display: flex;
          gap: 9px;
          margin: 0 0 13px;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.5;
        }
        .checkin-reference .instruction b {
          color: #bd304c;
          font-size: 16px;
        }
        @media (max-width: 360px) {
          .checkin-reference .topbar { padding-right: 12px; padding-left: 12px; }
          .checkin-reference .topbar-badge { display: none; }
          .checkin-reference .earnings-card,
          .checkin-reference .reward-panel,
          .checkin-reference .instructions { margin-right: 12px; margin-left: 12px; }
          .checkin-reference .claim { width: calc(100% - 24px); margin-right: 12px; margin-left: 12px; }
          .checkin-reference .instruction { font-size: 13px; }
        }
      `}</style>

      <div className="checkin-screen">
        <header className="topbar">
          <button className="back" onClick={() => navigate("/")}>
            <ChevronLeft aria-hidden="true" /><span>Retour</span>
          </button>
          <div className="brand">
            <img src={equinorLogo} alt="Equinor" />
            <span>Pointage du jour</span>
          </div>
          <span className="topbar-badge">BONUS QUOTIDIEN</span>
        </header>

        <section className="hero" aria-label="Bonus quotidien">
          <div className="hero-art">
            <img src={equinorPhone} alt="" />
          </div>
          <div className="hero-copy">
            <strong>Bonus du jour</strong>
            <span>Validez votre présence toutes les 24 heures</span>
          </div>
        </section>

        <section className="reward-panel" aria-label="Récompense quotidienne">
          <h2 className="reward-heading">Votre récompense quotidienne</h2>
          <div className="reward-row">
            <div className="reward-copy">
              <p>Montant attribué après validation</p>
              <strong>20 à 50 {currency}</strong>
            </div>
          </div>
        </section>

        <button
          className="claim"
          onClick={() => claimMutation.mutate()}
          disabled={bonusStatusLoading || !canClaim || claimMutation.isPending}
          data-testid="button-pointer"
        >
          {claimMutation.isPending ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Validation en cours…</span>
            </>
          ) : bonusStatusLoading ? (
            "Chargement…"
          ) : canClaim ? (
            "Valider mon pointage"
          ) : (
            bonusStatus
              ? `Disponible dans ${bonusStatus.hoursRemaining} h`
              : "Statut indisponible"
          )}
        </button>

        <section className="earnings-card" aria-label="Bilan de vos récompenses">
          <div className="stats">
            <div className="stat">
              <Coins className="stat-icon" aria-hidden="true" />
              <p className="stat-value secondary">{formatAmount(totalBonusClaimed)}</p>
              <p className="stat-label">Bonus cumulés</p>
            </div>
            <div className="stat">
              <CalendarCheck className="stat-icon" aria-hidden="true" />
              <p className="stat-value">{bonusStatus?.daysPointed || 0}</p>
              <p className="stat-label">Pointages validés</p>
            </div>
          </div>
        </section>

        <section className="instructions" aria-label="Instructions du pointage">
          <h2>À retenir</h2>
          <p className="instruction"><b>1.</b><span>Vous pouvez valider un pointage toutes les 24 heures.</span></p>
          <p className="instruction"><b>2.</b><span>Chaque validation rapporte un bonus aléatoire de 20 à 50 {currency}.</span></p>
          <p className="instruction"><b>3.</b><span>Le bonus est ajouté à votre solde après validation.</span></p>
        </section>
      </div>
    </main>
  );
}