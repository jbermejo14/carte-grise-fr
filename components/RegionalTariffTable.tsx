import React from 'react';
import Link from 'next/link';
import { REGIONS, TAXE_GESTION_FIXE, REDEVANCE_ACHEMINEMENT } from '@/lib/carte-grise';

export function RegionalTariffTable() {
  const sorted = [...REGIONS].sort((a, b) => a.chevalFiscal - b.chevalFiscal);

  const calculateExample = (chevalFiscal: number, cv: number, isOver10 = false) => {
    const y1 = cv * chevalFiscal * (isOver10 ? 0.5 : 1.0);
    return (Math.round(y1 + TAXE_GESTION_FIXE) + REDEVANCE_ACHEMINEMENT).toFixed(2);
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-fg">Prix du cheval fiscal par région en 2026</h2>
          <p className="text-xs text-secondary mt-0.5">
            Classement du tarif unitaire officiel voté par les Conseils régionaux (du moins cher au plus cher).
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-line bg-surface text-secondary font-semibold">
              <th className="py-3 px-3">Région</th>
              <th className="py-3 px-3 text-right">Tarif / CV</th>
              <th className="py-3 px-3 text-right hidden sm:table-cell">Exemple 5 CV (-10 ans)</th>
              <th className="py-3 px-3 text-right hidden md:table-cell">Exemple 7 CV (-10 ans)</th>
              <th className="py-3 px-3 text-right">7 CV (+10 ans, -50%)</th>
              <th className="py-3 px-3 text-center">Fiche</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {sorted.map((r) => (
              <tr key={r.slug} className="hover:bg-elevated transition-colors">
                <td className="py-3 px-3 font-medium text-fg">
                  <Link href={`/region/${r.slug}`} className="hover:text-accent hover:underline">
                    {r.name}
                  </Link>
                  <span className="block text-[11px] text-muted sm:hidden">
                    {r.departements.length} départements
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-fg">
                  {r.chevalFiscal.toFixed(2)} €
                </td>
                <td className="py-3 px-3 text-right font-mono text-secondary hidden sm:table-cell">
                  {calculateExample(r.chevalFiscal, 5)} €
                </td>
                <td className="py-3 px-3 text-right font-mono text-secondary hidden md:table-cell">
                  {calculateExample(r.chevalFiscal, 7)} €
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-positive">
                  {calculateExample(r.chevalFiscal, 7, true)} €
                </td>
                <td className="py-3 px-3 text-center">
                  <Link
                    href={`/region/${r.slug}`}
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    Simuler →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
