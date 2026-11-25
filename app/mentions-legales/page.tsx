import React from 'react';
import { LegalPage } from '@/components/LegalPage';
import { getTitular, type Titular } from '@/lib/legal';
import { legalHolderValue, legalMetadata } from '@/lib/legal-text';
import { LEGAL_PAGES_SEO } from '@/lib/seo';
import { SITE_NAME } from '@/lib/site';

const PATH = LEGAL_PAGES_SEO.mentionsLegales.path;
const URL_CLOUDFLARE = 'https://www.cloudflare.com';
const URL_SERVICE_PUBLIC = 'https://www.service-public.fr/particuliers/vosdroits/N367';
const URL_ANTS = 'https://immatriculation.ants.gouv.fr';

export const metadata = legalMetadata(
  PATH,
  LEGAL_PAGES_SEO.mentionsLegales.title,
  LEGAL_PAGES_SEO.mentionsLegales.description
);

export default function MentionsLegalesPage() {
  const holder = getTitular();
  const field = (name: keyof Titular) => legalHolderValue(holder, name);

  return (
    <LegalPage title="Mentions légales" path={PATH}>
      <h2 className="text-base font-bold text-fg">Éditeur du site</h2>
      <p>
        Conformément à l&apos;article 6 III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN), ce site est édité par :
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Nom : {field('nombre')}</li>
        <li>Numéro d&apos;identification fiscale (NIF, Espagne) : {field('nif')}</li>
        <li>Adresse : {field('domicilio')}</li>
        <li>Adresse e-mail de contact : {field('email')}</li>
        {holder.tipo === 'empresa' && <li>Immatriculation au registre du commerce : {field('registroMercantil')}</li>}
      </ul>

      <h2 className="text-base font-bold text-fg">Directeur de la publication</h2>
      <p>Le directeur de la publication est l&apos;éditeur du site : {field('nombre')}.</p>

      <h2 className="text-base font-bold text-fg">Hébergeur</h2>
      <p>
        Le site est hébergé par Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis (<a href={URL_CLOUDFLARE} target="_blank" rel="noopener noreferrer" className="text-accent underline">cloudflare.com</a>).
      </p>

      <h2 className="text-base font-bold text-fg">Objet du site et indépendance</h2>
      <p>
        {SITE_NAME} est un simulateur gratuit de calcul du coût de la taxe sur les certificats d&apos;immatriculation (carte grise) en France métropolitaine et outre-mer.
      </p>
      <p>
        {SITE_NAME} est un site d&apos;information strictement <strong>indépendant</strong>. Il n&apos;est pas affilié, ni mandaté, ni associé à l&apos;Agence Nationale des Titres Sécurisés (ANTS / France Titres), ni au Ministère de l&apos;Intérieur, ni à aucune préfecture ou collectivité régionale. Les démarches d&apos;immatriculation officielles se réalisent sans intermédiaire sur le portail de l&apos;État :{' '}
        <a href={URL_ANTS} target="_blank" rel="noopener noreferrer" className="text-accent underline">immatriculation.ants.gouv.fr</a>.
      </p>

      <h2 className="text-base font-bold text-fg">Sources des barèmes et données fiscales</h2>
      <p>
        Les tarifs unitaires du cheval fiscal par région sont votés annuellement par les Conseils régionaux en vertu du Code des impositions sur les biens et services (CIBS). Les montants des taxes fixes (gestion Y.4 : 11,00 € et acheminement postal Y.5 : 2,76 €) sont fixés par décret ministériel et consultables sur{' '}
        <a href={URL_SERVICE_PUBLIC} target="_blank" rel="noopener noreferrer" className="text-accent underline">service-public.fr</a>.
      </p>

      <h2 className="text-base font-bold text-fg">Caractère indicatif des calculs</h2>
      <p>
        Les résultats fournis par le simulateur sont des estimations calculées avec le plus grand soin selon la réglementation en vigueur. Seul le décompte officiel émis par le système d&apos;immatriculation des véhicules (SIV) de l&apos;État lors de la validation finale de votre dossier fait foi.
      </p>

      <h2 className="text-base font-bold text-fg">Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des textes, graphismes, simulateurs et code source développés pour {SITE_NAME} constituent des œuvres protégées par le Code de la propriété intellectuelle. Toute reproduction non autorisée est prohibée.
      </p>

      <h2 className="text-base font-bold text-fg">Droit applicable</h2>
      <p>
        Le site est édité depuis l&apos;Union européenne (Espagne). Les présentes mentions sont régies par le droit européen et le droit espagnol, sans préjudice des dispositions impératives de protection des consommateurs de votre lieu de résidence.
      </p>
    </LegalPage>
  );
}
