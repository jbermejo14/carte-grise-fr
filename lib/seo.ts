import type { Metadata } from 'next';
import { REGIONS, type RegionInfo } from './carte-grise';
import { GUIDES } from './guides';
import { SITE_NAME, absoluteUrl } from './site';

/** Sufijo de marca que añade la plantilla de títulos del layout. */
export const TITLE_SUFFIX = ` | ${SITE_NAME}`;
/** Longitud máxima admitida del título completo (con marca). */
export const TITLE_MAX_LENGTH = 65;
export const DESCRIPTION_MIN_LENGTH = 120;
export const DESCRIPTION_MAX_LENGTH = 160;

export const OG_IMAGE_PATH = '/brand/ododex-og.png';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
const OG_LOCALE = 'fr_FR';
const OG_IMAGE_ALT = 'Ododex : simulateur du coût de la carte grise en France';

const YEAR = 2026;
const REGIONS_WITH_PREPOSITION_AT = ['la-reunion', 'mayotte'];

export const HOME_TITLE = `Calculateur carte grise ${YEAR} : prix par région`;
export const HOME_DESCRIPTION = `Simulez le coût de votre carte grise en ${YEAR} : tarif du cheval fiscal de votre région, réduction de 50 % après 10 ans, exonérations pour les véhicules propres.`;

export interface PageSeoEntry {
  path: string;
  title: string;
  description: string;
}

export const LEGAL_PAGES_SEO = {
  confidentialite: {
    path: '/confidentialite',
    title: 'Politique de confidentialité',
    description: `Politique de confidentialité de ${SITE_NAME} : données personnelles traitées, finalités, durées de conservation, droits RGPD et contact de la CNIL.`,
  },
  cookies: {
    path: '/cookies',
    title: 'Politique relative aux cookies',
    description: `Politique relative aux cookies de ${SITE_NAME} : traceurs utilisés, publicité Google AdSense, stockage local du thème et gestion de votre consentement.`,
  },
  mentionsLegales: {
    path: '/mentions-legales',
    title: 'Mentions légales',
    description: `Mentions légales de ${SITE_NAME} : éditeur du site, hébergeur, sources des barèmes fiscaux de la carte grise, indépendance et limites de responsabilité.`,
  },
} as const satisfies Record<string, PageSeoEntry>;

/** Formate un montant en euros à la française : « 54,95 € ». */
export function formatEuro(amount: number): string {
  return `${amount.toFixed(2).replace('.', ',')} €`;
}

/** Título completo tal como lo muestra el navegador (página + marca). */
export function fullTitle(pageTitle: string): string {
  return `${pageTitle}${TITLE_SUFFIX}`;
}

function regionPreposition(region: RegionInfo): string {
  return REGIONS_WITH_PREPOSITION_AT.includes(region.slug) ? 'à' : 'en';
}

/**
 * Elige el primer candidato (de mejor a peor palabra clave) cuyo título completo cabe en el máximo
 * de 65 caracteres. Nunca trunca: el último candidato es siempre el más corto.
 */
function seoPickTitle(candidates: string[]): string {
  return (
    candidates.find((t) => fullTitle(t).length <= TITLE_MAX_LENGTH) ?? candidates[candidates.length - 1]
  );
}

/** Título de la ficha de una región (sin marca). */
export function regionTitle(region: RegionInfo): string {
  const where = `${regionPreposition(region)} ${region.name}`;
  return seoPickTitle([
    `Carte grise ${where} ${YEAR} : prix du cheval fiscal`,
    `Carte grise ${where} : prix du cheval fiscal`,
    `Carte grise ${where} : cheval fiscal à ${formatEuro(region.chevalFiscal)}`,
    `Carte grise ${where} ${YEAR} : tarif`,
    `Carte grise ${where} ${YEAR}`,
  ]);
}

/** Descripción de la ficha de una región: incluye los departamentos si caben en 160 caracteres. */
export function regionDescription(region: RegionInfo): string {
  const price = formatEuro(region.chevalFiscal);
  const codes = region.departements.map((d) => d.code).join(', ');
  const base = `Carte grise ${regionPreposition(region)} ${region.name} en ${YEAR} : cheval fiscal à ${price}, réduction de 50 % après 10 ans`;
  const candidates = [
    `${base} et calcul des taxes pour les départements ${codes}.`,
    `${base} et calcul détaillé des taxes Y.1 à Y.6.`,
    `${base} et calcul des taxes pour votre véhicule.`,
  ];
  return (
    candidates.find((d) => d.length <= DESCRIPTION_MAX_LENGTH) ?? candidates[candidates.length - 1]
  );
}

/** Metadatos Open Graph y Twitter con imagen, para que ninguna página la pierda. */
export function buildSocialMetadata(
  title: string,
  description: string,
  path: string
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const image = {
    url: absoluteUrl(OG_IMAGE_PATH),
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt: OG_IMAGE_ALT,
  };
  return {
    openGraph: {
      title: fullTitle(title),
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      locale: OG_LOCALE,
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle(title),
      description,
      images: [image.url],
    },
  };
}

/** Metadatos completos de una página de contenido (título sin marca: la añade el layout). */
export function buildPageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    ...buildSocialMetadata(title, description, path),
  };
}

/** Todas las páginas generables con su título (sin marca) y descripción. */
export function allPageSeo(): PageSeoEntry[] {
  const regions = REGIONS.map((r) => ({
    path: `/region/${r.slug}`,
    title: regionTitle(r),
    description: regionDescription(r),
  }));
  const guides = GUIDES.map((g) => ({
    path: `/guide/${g.slug}`,
    title: g.metaTitle,
    description: g.metaDescription,
  }));
  const legal = Object.values(LEGAL_PAGES_SEO).map((p) => ({ ...p }));
  return [{ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION }, ...regions, ...guides, ...legal];
}
