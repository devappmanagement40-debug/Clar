import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { FRESH_PLATFORM_SETTINGS_QUERY_OPTIONS } from "@/lib/queryClient";
import { catlBooth2, catlBooth3 } from "@/assets/catl-media";
import {
  DEFAULT_MINIMUM_DEPOSIT,
  DEFAULT_MINIMUM_WITHDRAWAL,
  readPositiveIntegerSetting,
} from "@shared/platform-settings";
import "./rules.css";

export default function RulesPage() {
  const { data: settings } = useQuery<Record<string, string>>({
    queryKey: ["/api/settings"],
    ...FRESH_PLATFORM_SETTINGS_QUERY_OPTIONS,
  });

  const signupBonus = settings?.signupBonus || "500";
  const minDeposit = readPositiveIntegerSetting(settings?.minDeposit, DEFAULT_MINIMUM_DEPOSIT);
  const minWithdrawal = readPositiveIntegerSetting(settings?.minWithdrawal, DEFAULT_MINIMUM_WITHDRAWAL);
  const withdrawalFees = settings?.withdrawalFees || "18";
  const withdrawalStartHour = settings?.withdrawalStartHour || "9";
  const withdrawalEndHour = settings?.withdrawalEndHour || "17";
  const maxWithdrawalsPerDay = settings?.maxWithdrawalsPerDay || "3";
  const lv1 = settings?.level1Commission || "28";
  const lv2 = settings?.level2Commission || "1";
  const lv3 = settings?.level3Commission || "1";
  const formatXof = (value: string) => {
    const amount = Number.parseInt(value, 10);
    return Number.isFinite(amount) ? amount.toLocaleString("fr-FR") : value;
  };
  return (
    <main className="cp-rules-page">
      <div className="cp-rules-screen">
        <header className="cp-rules-header">
          <Link href="/account" className="cp-rules-back" data-testid="button-back">
            <ChevronLeft aria-hidden="true" />
            <span>Retour</span>
          </Link>
          <h1>Bon à savoir</h1>
        </header>

        <div className="cp-rules-body">
          <p className="cp-rules-intro">
            Ces règles résument le fonctionnement de la plateforme. Les montants et limites sont présentés selon les paramètres disponibles dans l’application. Avant de confirmer une opération, vérifiez toujours le récapitulatif affiché.
          </p>

          <section className="cp-rules-section">
            <h2>1. Produits et offres</h2>
            <ul>
              <li>Chaque fiche produit présente son prix et les conditions applicables avant l’achat.</li>
              <li>La durée du cycle dépend du produit choisi et correspond à celle affichée sur sa fiche.</li>
              <li>Les revenus éventuels sont calculés selon les conditions du produit. Les montants affichés ne constituent pas une garantie de gain ni une absence de risque.</li>
              <li>Après l’achat, consultez la rubrique « Mes produits » pour suivre le produit et les opérations associées.</li>
            </ul>
          </section>

          <figure className="cp-rules-photo">
            <img src={catlBooth2} alt="Espace d’exposition CATL présentant des solutions de batteries et de stockage" loading="lazy" />
            <figcaption>Visuel professionnel illustratif, sans lien de propriété ou d’approbation avec la plateforme.</figcaption>
          </figure>

          <section className="cp-rules-section">
            <h2>2. Dépôts et Retraits</h2>
            <ul>
              <li>Le dépôt minimum est de {minDeposit.toLocaleString("fr-FR")} XOF.</li>
              <li>Le retrait minimum est de {minWithdrawal.toLocaleString("fr-FR")} XOF.</li>
              <li>Les frais de retrait affichés avant validation sont de {withdrawalFees}%.</li>
              <li>Les retraits sont disponibles entre {withdrawalStartHour} h et {withdrawalEndHour} h, dans la limite de {maxWithdrawalsPerDay} demande(s) par jour.</li>
              <li>Le montant net reçu et les frais sont présentés avant la confirmation du retrait.</li>
            </ul>
          </section>

          <figure className="cp-rules-photo">
            <img src={catlBooth3} alt="Stand CATL vu de l’intérieur, avec une présentation de technologies énergétiques" loading="lazy" />
            <figcaption>Illustration du secteur des technologies énergétiques. Les conditions du service sont celles affichées dans votre compte.</figcaption>
          </figure>

          <section className="cp-rules-section">
            <h2>3. Équipe et parrainage</h2>
            <ul>
              <li>Les taux affichés pour les niveaux 1, 2 et 3 sont respectivement de {lv1}%, {lv2}% et {lv3}% selon les paramètres chargés.</li>
              <li>Une commission est attribuée uniquement lorsqu’une opération répond aux conditions d’éligibilité de la plateforme.</li>
              <li>La création de comptes multiples ou toute tentative de fraude peut entraîner la suspension du compte et la vérification des opérations.</li>
            </ul>
          </section>

          <section className="cp-rules-section">
            <h2>4. Bonus</h2>
            <ul>
              <li>Le bonus d’inscription actuellement configuré est de {formatXof(signupBonus)} XOF. Il est crédité sur le solde des dépôts et réservé aux achats.</li>
              <li>Les bonus et récompenses sont soumis aux conditions affichées dans la rubrique correspondante de l’application.</li>
            </ul>
          </section>

          <section className="cp-rules-section">
            <h2>5. Sécurité du compte</h2>
            <ul>
              <li>Vous êtes responsable de la confidentialité de votre mot de passe et de vos codes de sécurité.</li>
              <li>Ne communiquez jamais vos identifiants à une autre personne.</li>
              <li>En cas d’activité inhabituelle, contactez le service client depuis votre espace personnel.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
