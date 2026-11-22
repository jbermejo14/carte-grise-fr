import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { REGIONS, findRegionBySlug, TAXE_GESTION_FIXE, REDEVANCE_ACHEMINEMENT } from '@/lib/carte-grise';
import { CarteGriseCalculator } from '@/components/CarteGriseCalculator';
import { AdSlot } from '@/components/AdSlot';
import { absoluteUrl } from '@/lib/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return REGIONS.map((r) => ({
    slug: r.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const region = findRegionBySlug(slug);
  if (!region) return {};

  const title = `Carte Grise ${region.name} 2026 : Prix du Cheval Fiscal (${region.chevalFiscal.toFixed(2)} €) | Ododex`;
  const description = `Calculez le prix officiel de votre carte grise en région ${region.name}. Tarif officiel du cheval fiscal (${region.chevalFiscal.toFixed(2)} €), simulateur pour les départements ${region.departements.map((d) => d.code).join(', ')} et réduction de 50% après 10 ans.`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/region/${region.slug}`),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/region/${region.slug}`),
    },
  };
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const region = findRegionBySlug(slug);
  if (!region) notFound();

  const examples = [4, 5, 6, 7, 8, 9, 10, 15].map((cv) => {
    const under10Y1 = cv * region.chevalFiscal;
    const over10Y1 = under10Y1 * 0.5;
    return {
      cv,
      under10Total: (Math.round(under10Y1 + TAXE_GESTION_FIXE) + REDEVANCE_ACHEMINEMENT).toFixed(2),
      over10Total: (Math.round(over10Y1 + TAXE_GESTION_FIXE) + REDEVANCE_ACHEMINEMENT).toFixed(2),
    };
  });

  return (
    <div className="space-y-10">
      {/* Fil d'Ariane */}
      <nav aria-label="Fil d'Ariane" className="text-xs text-secondary flex items-center gap-2">
        <Link href="/" className="hover:text-fg hover:underline">
          Accueil
        </Link>
        <span>/</span>
        <span className="text-fg font-medium">{region.name}</span>
      </nav>

      {/* En-tête de la région */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag tag-accent font-bold text-xs">
            {region.chevalFiscal.toFixed(2)} € / CV
          </span>
          <span className="tag text-xs">
            {region.departements.length} départements
          </span>
        </div>

        <h1 className="text-3xl font-black text-fg tracking-tight">
          Prix de la Carte Grise en {region.name} (2026)
        </h1>

        <p className="text-sm text-secondary leading-relaxed">
          Le Conseil régional de {region.name} a fixé le montant du cheval fiscal unitaire à{' '}
          <strong className="text-fg">{region.chevalFiscal.toFixed(2)} €</strong>.
          Ce tarif s'applique pour toutes les démarches d'immatriculation des résidents des départements :{' '}
          {region.departements.map((d) => `${d.name} (${d.code})`).join(', ')}.
        </p>

        {/* Liste des départements */}
        <div className="pt-2 flex flex-wrap gap-1.5">
          {region.departements.map((d) => (
            <span
              key={d.code}
              className="px-2.5 py-1 rounded bg-surface border border-line text-xs text-secondary font-medium"
            >
              {d.code} - {d.name}
            </span>
          ))}
        </div>
      </section>

      {/* Simulateur pré-sélectionné */}
      <section>
        <CarteGriseCalculator initialRegionSlug={region.slug} />
      </section>

      <AdSlot className="my-8" />

      {/* Tableau d'exemples de tarifs pour cette région */}
      <section className="card space-y-4">
        <div>
          <h2 className="text-lg font-bold text-fg">
            Exemples de prix de carte grise en {region.name}
          </h2>
          <p className="text-xs text-secondary mt-0.5">
            Estimation du coût total (taxes fiscales Y.1 à Y.6) pour les puissances courantes.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-line bg-surface text-secondary font-semibold">
                <th className="py-2.5 px-3">Puissance fiscale</th>
                <th className="py-2.5 px-3 text-right">Taxe Y.1 (-10 ans)</th>
                <th className="py-2.5 px-3 text-right">Total à payer (-10 ans)</th>
                <th className="py-2.5 px-3 text-right text-positive">Total à payer (+10 ans, -50%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {examples.map((item) => (
                <tr key={item.cv} className="hover:bg-elevated transition-colors">
                  <td className="py-2.5 px-3 font-bold text-fg">{item.cv} CV</td>
                  <td className="py-2.5 px-3 text-right font-mono text-secondary">
                    {(item.cv * region.chevalFiscal).toFixed(2)} €
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-fg">
                    {item.under10Total} €
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-positive">
                    {item.over10Total} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Liens vers d'autres régions */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-fg uppercase tracking-wider">
          Autres régions de France
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {REGIONS.filter((r) => r.slug !== region.slug).map((r) => (
            <Link
              key={r.slug}
              href={`/region/${r.slug}`}
              className="p-2.5 rounded-lg border border-line bg-surface hover:border-accent text-xs font-medium text-secondary hover:text-fg transition-all text-center"
            >
              <span className="block truncate">{r.name}</span>
              <span className="text-[11px] text-muted">{r.chevalFiscal.toFixed(2)} €/CV</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
