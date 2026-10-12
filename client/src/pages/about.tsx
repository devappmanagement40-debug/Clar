import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import "./about.css";

export default function AboutPage() {
  return (
    <main className="cp-about-page">
      <div className="cp-about-screen">
        <header className="cp-about-header">
        <Link href="/account">
          <button className="cp-about-back" data-testid="button-back">
            <ChevronLeft aria-hidden="true" />
            <span>Retour</span>
          </button>
        </Link>
          <h1>À propos d’Equinor</h1>
        </header>

        <div className="cp-about-body">
          <p className="cp-about-lead">
            Cette plateforme est présentée sous la marque Equinor. Elle rassemble dans un même espace les produits disponibles, le suivi des opérations, les outils d’équipe et l’assistance.
          </p>

          <p>
            Depuis votre compte, vous pouvez consulter les offres, suivre vos dépôts et retraits, vérifier l’activité de vos produits et retrouver les informations utiles à votre utilisation du service.
          </p>

          <h2>Les services disponibles</h2>
          <p>
            La plateforme propose un espace personnel, un catalogue de produits, l’historique des opérations, un espace d’équipe et un accès au service client. Les fonctionnalités visibles peuvent dépendre de votre compte, de votre pays et des paramètres actifs.
          </p>

          <h2>Produits et informations financières</h2>
          <p>
            Chaque fiche présente les conditions propres au produit, notamment son prix, la durée du cycle et les revenus indiqués lorsqu’ils s’appliquent. Consultez ces informations avant de confirmer un achat et retrouvez ensuite l’opération dans votre espace personnel.
          </p>
          <p>
            Les montants et durées affichés décrivent les conditions présentées pour chaque offre. Ils ne doivent pas être interprétés comme une garantie de gain ou d’absence de risque.
          </p>

          <h2>Clarté et sécurité</h2>
          <ul>
            <li><strong>Informations lisibles :</strong> les conditions et montants utiles sont présentés avant les opérations importantes.</li>
            <li><strong>Suivi :</strong> les opérations et produits accessibles sont consultables depuis votre compte.</li>
            <li><strong>Protection du compte :</strong> choisissez un mot de passe sûr et ne le communiquez à personne.</li>
            <li><strong>Assistance :</strong> pour une question, utilisez le service client accessible depuis votre espace.</li>
          </ul>

          <h2>À propos des informations affichées</h2>
          <p>
            Les produits, frais, limites et modalités peuvent évoluer. Avant de valider une opération, vérifiez toujours les conditions affichées à l’écran et dans votre compte.
          </p>
        </div>
      </div>
    </main>
  );
}
