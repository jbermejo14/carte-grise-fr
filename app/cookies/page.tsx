import React from 'react';
import { LegalPage } from '@/components/LegalPage';
import { getAdSenseClient } from '@/components/AdSenseScript';
import { legalMetadata } from '@/lib/legal-text';
import { LEGAL_PAGES_SEO } from '@/lib/seo';

const PATH = LEGAL_PAGES_SEO.cookies.path;
const URL_COOKIES_GOOGLE = 'https://policies.google.com/technologies/cookies?hl=fr';

export const metadata = legalMetadata(
  PATH,
  LEGAL_PAGES_SEO.cookies.title,
  LEGAL_PAGES_SEO.cookies.description
);

export default function CookiesPage() {
  const adsenseActive = getAdSenseClient() !== null;

  return (
    <LegalPage title="Politique relative aux cookies" path={PATH} breadcrumbLabel="Cookies">
      <h2 className="text-base font-bold text-fg">Qu&apos;est-ce qu&apos;un traceur ou cookie ?</h2>
      <p>
        Un cookie est un petit fichier texte ou traceur déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la consultation d&apos;un service en ligne. Son utilisation est régie par l&apos;article 82 de la loi Informatique et Libertés et les recommandations de la CNIL.
      </p>

      <h2 className="text-base font-bold text-fg">Traceurs utilisés sur ce site</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Préférence de thème graphique (<code>ododex-theme</code> dans <code>localStorage</code>) :</strong> mémorise localement votre choix entre affichage sombre et affichage clair. Exempt de consentement préalable car strictement nécessaire au service demandé expressément par l&apos;utilisateur.
        </li>
        {adsenseActive ? (
          <li>
            <strong>Cookies publicitaires Google AdSense :</strong> permettent la personnalisation et la mesure des annonces publicitaires. Ces traceurs ne sont activés qu&apos;après le recueil de votre consentement préalable au moyen de la plateforme de gestion du consentement (CMP) certifiée IAB TCF v2.2 affichée à votre arrivée sur le site.
          </li>
        ) : (
          <li>
            Actuellement, aucun cookie publicitaire tiers n&apos;est déposé sans votre action volontaire.
          </li>
        )}
      </ul>

      {adsenseActive && (
        <>
          <h2 className="text-base font-bold text-fg">Gestion et retrait du consentement</h2>
          <p>
            Vous pouvez à tout moment modifier vos préférences relatives aux cookies ou retirer votre consentement pour la publicité ciblée en cliquant sur le lien de paramétrage de consentement ou en effaçant les cookies de votre navigateur.
          </p>
          <p>
            Pour en savoir plus sur l&apos;utilisation des données par Google, visitez :{' '}
            <a href={URL_COOKIES_GOOGLE} target="_blank" rel="noopener noreferrer" className="text-accent underline">policies.google.com/technologies/cookies</a>.
          </p>
        </>
      )}

      <h2 className="text-base font-bold text-fg">Paramétrage depuis votre navigateur</h2>
      <p>
        Vous pouvez également configurer votre navigateur web pour refuser systématiquement le dépôt de tous les cookies ou être alerté avant leur enregistrement. La suppression de <code>ododex-theme</code> réinitialise simplement le thème vers le mode par défaut de votre système d&apos;exploitation.
      </p>
    </LegalPage>
  );
}
