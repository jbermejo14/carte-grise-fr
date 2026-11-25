import React from 'react';
import Link from 'next/link';
import { CarteGriseCalculator } from '@/components/CarteGriseCalculator';
import { RegionalTariffTable } from '@/components/RegionalTariffTable';
import { AdSlot } from '@/components/AdSlot';
import { REGIONS } from '@/lib/carte-grise';

const FAQ_ITEMS = [
  {
    q: "Comment est calculé le prix d'une carte grise en France ?",
    a: "Le prix total d'une carte grise (taxe Y.6) est composé de 5 taxes : la taxe régionale Y.1 (puissance fiscale × tarif du cheval fiscal de votre région, avec réduction de 50 % si le véhicule a plus de 10 ans), la taxe professionnelle Y.2 (pour les utilitaires), le malus écologique Y.3 (sur les véhicules neufs), la taxe fixe de gestion Y.4 (11 €) et la redevance d'acheminement postal Y.5 (2,76 €).",
  },
  {
    q: "Quel est le prix du cheval fiscal dans ma région ?",
    a: "Le tarif unitaire du cheval fiscal est voté chaque année par le Conseil régional. En 2026, il varie de 27,00 € en Corse à 60,00 € en Normandie. Par exemple, il est de 54,95 € en Île-de-France, 43,00 € en Auvergne-Rhône-Alpes et 51,20 € en PACA.",
  },
  {
    q: "Mon véhicule a plus de 10 ans, ai-je droit à une réduction ?",
    a: "Oui ! Tous les véhicules particuliers (VP), camionnettes (CTTE) et deux-roues de plus de 10 ans d'âge (date de 1ère immatriculation en case B) bénéficient automatiquement d'une réduction de 50 % sur le montant de la taxe régionale (taxe Y.1).",
  },
  {
    q: "Les voitures électriques payent-elles la carte grise ?",
    a: "Les véhicules 100 % électriques ou à hydrogène sont totalement exonérés de la taxe régionale (Y.1 = 0 €) dans toutes les régions de France métropolitaine et d'outre-mer. Vous ne payez que la taxe fixe de gestion (11 €) et les frais d'envoi postal (2,76 €), soit un coût total de seulement 13,76 €.",
  },
  {
    q: "Où faire la demande de certificat d'immatriculation ?",
    a: "Depuis la fermeture des guichets en préfecture (Plan Préfectures Nouvelle Génération), toutes les démarches d'immatriculation se font obligatoirement en ligne sur le site officiel de l'État : immatriculation.ants.gouv.fr (Agence Nationale des Titres Sécurisés / France Titres), sans frais de dossier supplémentaires.",
  },
];

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Titre et introduction */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-fg tracking-tight">
          Calculateur Carte Grise 2026
        </h1>
        <p className="text-sm sm:text-base text-secondary leading-relaxed">
          Simulez en direct le coût exact de votre certificat d'immatriculation selon votre région,
          la puissance fiscale de votre véhicule et son âge. Calcul transparent conforme à la Loi de finances.
        </p>
      </section>

      {/* Simulateur principal interactif */}
      <section>
        <CarteGriseCalculator />
      </section>

      {/* Emplacement publicitaire après le simulateur (avec min-height anti-CLS) */}
      <AdSlot className="my-8" />

      {/* Tableau comparatif des tarifs du cheval fiscal par région */}
      <section>
        <RegionalTariffTable />
      </section>

      {/* Guides pratiques et légaux */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-fg">Guides pratiques pour votre carte grise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/guide/prix-cheval-fiscal-par-region"
            className="card hover:border-accent transition-all group"
          >
            <h3 className="font-bold text-sm text-fg group-hover:text-accent">
              Prix du cheval fiscal par région 2026 →
            </h3>
            <p className="mt-1 text-xs text-secondary leading-relaxed">
              Consultez les barèmes votés par chaque Conseil régional et l'historique des hausses de tarifs en France.
            </p>
          </Link>

          <Link
            href="/guide/regle-moins-10-ans"
            className="card hover:border-accent transition-all group"
          >
            <h3 className="font-bold text-sm text-fg group-hover:text-accent">
              Véhicules de plus de 10 ans : réduction de 50 % →
            </h3>
            <p className="mt-1 text-xs text-secondary leading-relaxed">
              Comment fonctionne le demi-tarif sur la taxe régionale pour les voitures et motos d'occasion de plus de 10 ans.
            </p>
          </Link>

          <Link
            href="/guide/carte-grise-voiture-electrique"
            className="card hover:border-accent transition-all group"
          >
            <h3 className="font-bold text-sm text-fg group-hover:text-accent">
              Carte grise véhicule 100 % électrique : 13,76 € →
            </h3>
            <p className="mt-1 text-xs text-secondary leading-relaxed">
              Comprendre l'exonération totale de taxe régionale pour les voitures électriques et les hybrides.
            </p>
          </Link>

          <Link
            href="/guide/documents-immatriculation-ants"
            className="card hover:border-accent transition-all group"
          >
            <h3 className="font-bold text-sm text-fg group-hover:text-accent">
              Documents et démarches sur l'ANTS →
            </h3>
            <p className="mt-1 text-xs text-secondary leading-relaxed">
              La liste complète des pièces justificatives demandées lors d'un changement de titulaire en ligne.
            </p>
          </Link>
        </div>
      </section>

      {/* Foire aux questions (FAQ) */}
      <section className="card space-y-4">
        <h2 className="text-xl font-bold text-fg">Questions fréquentes sur la carte grise</h2>
        <div className="divide-y divide-line/60">
          {FAQ_ITEMS.map((item, idx) => (
            <details key={idx} className="py-3.5 group">
              <summary className="font-semibold text-sm text-fg cursor-pointer list-none flex items-center justify-between">
                <span>{item.q}</span>
                <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-2 text-xs text-secondary leading-relaxed pl-1">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Deuxième emplacement publicitaire en bas de page */}
      <AdSlot className="mt-8" />
    </div>
  );
}
