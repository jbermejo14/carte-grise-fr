import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { REGIONS } from '../lib/carte-grise';
import { GUIDES } from '../lib/guides';
import {
  DESCRIPTION_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  OG_IMAGE_PATH,
  TITLE_MAX_LENGTH,
  allPageSeo,
  buildPageMetadata,
  formatEuro,
  fullTitle,
  regionDescription,
  regionTitle,
} from '../lib/seo';
import { absoluteUrl } from '../lib/site';

const PROJECT_ROOT = join(import.meta.dirname, '..');
const SCANNED_DIRECTORIES = ['app', 'components', 'lib'];
const SCANNED_EXTENSIONS = /\.(ts|tsx)$/;
const FORBIDDEN_CLAIMS = [
  'simulateur officiel',
  'simulation officielle',
  'calcul officiel',
  'devis fiscal officiel',
  'guide officiel',
];

function listSourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return listSourceFiles(path);
    return SCANNED_EXTENSIONS.test(entry) ? [path] : [];
  });
}

describe('SEO : titres et descriptions', () => {
  const pages = allPageSeo();

  it('couvre la page d\'accueil, les régions, les guides et les pages légales', () => {
    assert.equal(pages.length, 1 + REGIONS.length + GUIDES.length + 3);
    assert.equal(new Set(pages.map((p) => p.path)).size, pages.length);
  });

  it('chaque titre complet fait 65 caractères au plus, sans marque dupliquée', () => {
    for (const page of pages) {
      const title = fullTitle(page.title);
      assert.ok(title.length <= TITLE_MAX_LENGTH, `${page.path} (${title.length}) : ${title}`);
      assert.ok(!title.includes('| Ododex | Ododex'), `${page.path} : marque dupliquée`);
      assert.ok(!page.title.includes('Ododex'), `${page.path} : la marque est ajoutée par le layout`);
    }
  });

  it('chaque titre est unique', () => {
    assert.equal(new Set(pages.map((p) => p.title)).size, pages.length);
  });

  it('aucune description de région ne répète « en » avant « en 2026 »', () => {
    for (const region of REGIONS) {
      const description = regionDescription(region);
      assert.doesNotMatch(description, /\ben\b.* en \d{4}/, region.slug);
      assert.match(description, /pour \d{4}/, region.slug);
    }
  });

  it('chaque description fait entre 120 et 160 caractères et est unique', () => {
    for (const page of pages) {
      const length = page.description.length;
      assert.ok(
        length >= DESCRIPTION_MIN_LENGTH && length <= DESCRIPTION_MAX_LENGTH,
        `${page.path} : ${length} caractères`
      );
    }
    assert.equal(new Set(pages.map((p) => p.description)).size, pages.length);
  });

  it('les titres de région respectent la casse française et les montants à la française', () => {
    const idf = REGIONS.find((r) => r.slug === 'ile-de-france')!;
    assert.equal(regionTitle(idf), 'Carte grise en Île-de-France : prix du cheval fiscal');
    for (const page of pages) {
      assert.ok(!/\d\.\d{2} €/.test(`${page.title} ${page.description}`), `${page.path} : décimale avec point`);
    }
  });

  it('formate les montants en euros à la française', () => {
    assert.equal(formatEuro(54.95), '54,95 €');
    assert.equal(formatEuro(27), '27,00 €');
  });
});

describe('SEO : Open Graph', () => {
  it('l\'image Open Graph existe dans public/brand', () => {
    assert.ok(existsSync(join(PROJECT_ROOT, 'public', 'brand', 'ododex-og.png')));
  });

  it('les métadonnées de page déclarent l\'image en 1200x630 et la carte Twitter large', () => {
    const meta = buildPageMetadata('Titre', 'Description', '/region/bretagne');
    const images = (meta.openGraph as { images: { url: string; width: number; height: number }[] }).images;
    assert.equal(images[0].url, absoluteUrl(OG_IMAGE_PATH));
    assert.equal(images[0].width, 1200);
    assert.equal(images[0].height, 630);
    const twitter = meta.twitter as { card: string; images: string[] };
    assert.equal(twitter.card, 'summary_large_image');
    assert.deepEqual(twitter.images, [absoluteUrl(OG_IMAGE_PATH)]);
  });
});

describe('Contenu : la web ne se présente pas comme officielle', () => {
  it('aucune formulation « simulateur officiel », « calcul officiel », etc.', () => {
    const offenders: string[] = [];
    for (const directory of SCANNED_DIRECTORIES) {
      for (const file of listSourceFiles(join(PROJECT_ROOT, directory))) {
        const content = readFileSync(file, 'utf8').toLowerCase();
        for (const claim of FORBIDDEN_CLAIMS) {
          if (content.includes(claim)) offenders.push(`${file} : « ${claim} »`);
        }
      }
    }
    assert.deepEqual(offenders, []);
  });
});
