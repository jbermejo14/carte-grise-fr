import React from 'react';
import { LegalPage } from '@/components/LegalPage';
import { getAdSenseClient } from '@/components/AdSenseScript';
import { getTitular, type Titular } from '@/lib/legal';
import { legalHolderValue, legalMetadata } from '@/lib/legal-text';
import { LEGAL_PAGES_SEO } from '@/lib/seo';

const PATH = LEGAL_PAGES_SEO.confidentialite.path;
const URL_AEPD = 'https://www.aepd.es';
const URL_CNIL_PLAINTE = 'https://www.cnil.fr/fr/plaintes';

export const metadata = legalMetadata(
  PATH,
  LEGAL_PAGES_SEO.confidentialite.title,
  LEGAL_PAGES_SEO.confidentialite.description
);

export default function ConfidentialitePage() {
  const holder = getTitular();
  const field = (name: keyof Titular) => legalHolderValue(holder, name);
  const adsenseActive = getAdSenseClient() !== null;

  return (
    <LegalPage title="Politique de confidentialité" path={PATH} breadcrumbLabel="Confidentialité">
      <h2 className="text-base font-bold text-fg">Responsable du traitement</h2>
      <p>
        Le responsable du traitement est {field('nombre')} (NIF : {field('nif')}), domicilié à : {field('domicilio')}. Contact : {field('email')}.
      </p>

      <h2 className="text-base font-bold text-fg">Données traitées et absence de compte</h2>
      <p>
        Ce site ne requiert aucune inscription, ne crée aucun compte utilisateur et ne collecte aucune donnée nominative.
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Simulateur de taxe fiscale :</strong> les paramètres saisis (puissance fiscale, région, âge du véhicule, carburant) sont exécutés intégralement en local dans votre navigateur via JavaScript. Ils ne sont ni transmis à un serveur, ni stockés dans une base de données.
        </li>
        <li>
          <strong>Correspondance par courriel :</strong> si vous contactez l&apos;éditeur par courrier électronique, votre adresse et les informations transmises sont uniquement employées pour vous répondre.
        </li>
      </ul>

      <h2 className="text-base font-bold text-fg">Destinataires techniques et sous-traitants</h2>
      <p>
        Lors de votre navigation, des données techniques (adresse IP, en-têtes HTTP, agent utilisateur) sont reçues par les prestataires techniques nécessaires à l&apos;hébergement et à la diffusion du site :
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Cloudflare, Inc. :</strong> hébergement, réseau de distribution de contenu (CDN) et protection contre les attaques par déni de service.
        </li>
        {adsenseActive && (
          <li>
            <strong>Google AdSense (Google Ireland Ltd.) :</strong> diffusion d&apos;annonces publicitaires et mesure d&apos;audience sous réserve de votre consentement explicite recueilli via la bannière CMP.
          </li>
        )}
      </ul>

      <h2 className="text-base font-bold text-fg">Vos droits (RGPD)</h2>
      <p>
        Conformément aux articles 15 à 22 du Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition au traitement de vos données. Pour toute demande, adressez un courriel à {field('email')}.
      </p>
      <p>
        En cas de différend non résolu, vous pouvez déposer une réclamation auprès de l&apos;autorité compétente :{' '}
        <a href={URL_CNIL_PLAINTE} target="_blank" rel="noopener noreferrer" className="text-accent underline">cnil.fr/fr/plaintes</a> (CNIL en France) ou{' '}
        <a href={URL_AEPD} target="_blank" rel="noopener noreferrer" className="text-accent underline">aepd.es</a> (AEPD en Espagne).
      </p>
    </LegalPage>
  );
}
