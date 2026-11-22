'use client';

import React, { useState, useMemo } from 'react';
import { ExternalLink, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  REGIONS,
  calculateCarteGrise,
  type VehicleCategory,
  type FuelType,
  type VehicleAge,
} from '@/lib/carte-grise';

interface CarteGriseCalculatorProps {
  initialRegionSlug?: string;
  initialFiscalPower?: number;
}

export function CarteGriseCalculator({
  initialRegionSlug = 'ile-de-france',
  initialFiscalPower = 6,
}: CarteGriseCalculatorProps) {
  const [regionSlug, setRegionSlug] = useState<string>(initialRegionSlug);
  const [fiscalPower, setFiscalPower] = useState<number>(initialFiscalPower);
  const [vehicleCategory, setVehicleCategory] = useState<VehicleCategory>('car');
  const [fuelType, setFuelType] = useState<FuelType>('petrol');
  const [vehicleAge, setVehicleAge] = useState<VehicleAge>('under_10');
  const [isNewVehicle, setIsNewVehicle] = useState<boolean>(false);
  const [co2Emissions, setCo2Emissions] = useState<number>(120);
  const [weightKg, setWeightKg] = useState<number>(1500);

  const result = useMemo(() => {
    return calculateCarteGrise({
      regionSlug,
      fiscalPower,
      vehicleCategory,
      fuelType,
      vehicleAge,
      isNewVehicle,
      co2Emissions: isNewVehicle ? co2Emissions : undefined,
      weightKg: isNewVehicle ? weightKg : undefined,
    });
  }, [regionSlug, fiscalPower, vehicleCategory, fuelType, vehicleAge, isNewVehicle, co2Emissions, weightKg]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Formulaire des paramètres */}
      <div className="lg:col-span-7 space-y-6">
        <div className="card space-y-5">
          <h2 className="text-lg font-bold text-fg flex items-center gap-2">
            <span>1. Localisation</span>
          </h2>

          <div>
            <label htmlFor="region-select" className="block text-xs font-semibold text-secondary uppercase mb-2">
              Région / Département de résidence
            </label>
            <select
              id="region-select"
              value={regionSlug}
              onChange={(e) => setRegionSlug(e.target.value)}
              className="w-full bg-input border border-line rounded-lg px-3 py-2.5 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {REGIONS.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name} ({r.chevalFiscal.toFixed(2)} € / CV)
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-muted">
              Le tarif du cheval fiscal dépend de la région où est domicilié le titulaire principal.
            </p>
          </div>
        </div>

        <div className="card space-y-5">
          <h2 className="text-lg font-bold text-fg">2. Caractéristiques du véhicule</h2>

          {/* Type de véhicule */}
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase mb-2">
              Genre de véhicule
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'car', label: 'Voiture (VP)' },
                { id: 'van', label: 'Utilitaire (CTTE)' },
                { id: 'motorcycle', label: 'Moto (> 125 cm³)' },
                { id: 'light_motorcycle', label: 'Moto (≤ 125 cm³)' },
                { id: 'trailer', label: 'Remorque (> 500 kg)' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setVehicleCategory(item.id as VehicleCategory)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                    vehicleCategory === item.id
                      ? 'border-accent bg-accent-soft text-accent font-semibold'
                      : 'border-line bg-surface hover:border-line-hover text-secondary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Puissance fiscale */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="cv-input" className="text-xs font-semibold text-secondary uppercase">
                Puissance fiscale (Chevaux fiscaux - Case P.6)
              </label>
              <span className="text-sm font-bold text-accent">{fiscalPower} CV</span>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="cv-input"
                type="number"
                min="1"
                max="100"
                value={fiscalPower}
                onChange={(e) => setFiscalPower(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 bg-input border border-line rounded-lg px-3 py-2 text-sm text-fg font-bold text-center focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <div className="flex flex-wrap gap-1.5 flex-1">
                {[4, 5, 6, 7, 8, 9, 10].map((cv) => (
                  <button
                    key={cv}
                    type="button"
                    onClick={() => setFiscalPower(cv)}
                    className={`px-2.5 py-1 rounded text-xs border ${
                      fiscalPower === cv
                        ? 'border-accent bg-accent text-on-btn font-bold'
                        : 'border-line bg-surface hover:border-line-hover text-secondary'
                    }`}
                  >
                    {cv} CV
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Énergie / Carburant */}
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase mb-2">
              Énergie (Case P.3)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'petrol', label: 'Essence' },
                { id: 'diesel', label: 'Diesel' },
                { id: 'electric', label: '100% Électrique / Hydrogène' },
                { id: 'hybrid', label: 'Hybride / GPL / E85' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFuelType(item.id as FuelType)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                    fuelType === item.id
                      ? 'border-accent bg-accent-soft text-accent font-semibold'
                      : 'border-line bg-surface hover:border-line-hover text-secondary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            {fuelType === 'electric' && (
              <p className="mt-2 text-xs text-positive font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                Exonération de 100 % de la taxe régionale dans toute la France pour les véhicules zéro émission.
              </p>
            )}
          </div>

          {/* Âge du véhicule */}
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase mb-2">
              Date de première mise en circulation (Case B)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setVehicleAge('under_10')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  vehicleAge === 'under_10'
                    ? 'border-accent bg-accent-soft text-accent'
                    : 'border-line bg-surface hover:border-line-hover text-secondary'
                }`}
              >
                <div className="font-semibold text-xs text-fg">Moins de 10 ans</div>
                <div className="text-[11px] text-muted">Tarif normal du cheval fiscal</div>
              </button>

              <button
                type="button"
                onClick={() => setVehicleAge('over_10')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  vehicleAge === 'over_10'
                    ? 'border-accent bg-accent-soft text-accent'
                    : 'border-line bg-surface hover:border-line-hover text-secondary'
                }`}
              >
                <div className="font-semibold text-xs text-fg flex items-center justify-between">
                  <span>10 ans et plus</span>
                  <span className="tag tag-positive text-[10px] font-bold">-50 %</span>
                </div>
                <div className="text-[11px] text-muted">Taxe régionale divisée par 2</div>
              </button>
            </div>
          </div>

          {/* Neuf ou occasion */}
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase mb-2">
              Situation d'achat
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsNewVehicle(false)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  !isNewVehicle
                    ? 'border-accent bg-accent-soft text-accent'
                    : 'border-line bg-surface hover:border-line-hover text-secondary'
                }`}
              >
                <div className="font-semibold text-xs text-fg">Véhicule d'occasion</div>
                <div className="text-[11px] text-muted">Déjà immatriculé en France (sans malus)</div>
              </button>

              <button
                type="button"
                onClick={() => setIsNewVehicle(true)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isNewVehicle
                    ? 'border-accent bg-accent-soft text-accent'
                    : 'border-line bg-surface hover:border-line-hover text-secondary'
                }`}
              >
                <div className="font-semibold text-xs text-fg">Véhicule neuf / Importé</div>
                <div className="text-[11px] text-muted">Soumis au barème Malus CO₂ et poids</div>
              </button>
            </div>
          </div>

          {/* Champs complémentaires si neuf */}
          {isNewVehicle && (
            <div className="p-4 rounded-xl border border-warning-line bg-warning-soft/40 space-y-4">
              <div className="flex items-center gap-2 text-warning text-xs font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Barème Malus Écologique (WLTP)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="co2-input" className="block text-xs font-medium text-fg mb-1">
                    Émissions CO₂ (g/km - Case V.7)
                  </label>
                  <input
                    id="co2-input"
                    type="number"
                    min="0"
                    max="400"
                    value={co2Emissions}
                    onChange={(e) => setCo2Emissions(parseInt(e.target.value) || 0)}
                    className="w-full bg-input border border-line rounded-lg px-3 py-2 text-sm text-fg"
                  />
                  <p className="mt-1 text-[11px] text-muted">Malus déclenché dès 113 g/km</p>
                </div>

                <div>
                  <label htmlFor="weight-input" className="block text-xs font-medium text-fg mb-1">
                    Masse en ordre de marche (kg - Case G)
                  </label>
                  <input
                    id="weight-input"
                    type="number"
                    min="500"
                    max="4000"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseInt(e.target.value) || 0)}
                    className="w-full bg-input border border-line rounded-lg px-3 py-2 text-sm text-fg"
                  />
                  <p className="mt-1 text-[11px] text-muted">Malus au poids dès 1 600 kg</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Colonne de résultat : Devis fiscal officiel */}
      <div className="lg:col-span-5 space-y-6">
        <div className="card border-accent/40 bg-surface-elevated space-y-6 sticky top-20">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Coût officiel certificat d'immatriculation
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-accent">
                {result.y6Total.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
              </span>
            </div>
            <p className="mt-1 text-xs text-muted">
              Total officiel à régler auprès de l'État (Taxes Y.1 à Y.6).
            </p>
          </div>

          <hr className="border-line" />

          {/* Décomposition détaillée des taxes */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-fg uppercase tracking-wider">
              Détail des taxes fiscales
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-line/60">
                <div>
                  <span className="font-semibold text-fg">Taxe régionale (Y.1)</span>
                  <div className="text-[11px] text-muted">
                    {result.details.puissanceRetenue} CV × {result.region.chevalFiscal.toFixed(2)} €
                    {result.details.reductionAge ? ' (réduction -50 %)' : ''}
                    {result.details.tauxExoneration === 1 ? ' (exonéré 100 %)' : ''}
                  </div>
                </div>
                <span className="font-mono font-bold text-fg">
                  {result.y1TaxeRegionale.toFixed(2)} €
                </span>
              </div>

              {result.y2TaxeProfessionnelle > 0 && (
                <div className="flex items-center justify-between py-1 border-b border-line/60">
                  <div>
                    <span className="font-semibold text-fg">Formation professionnelle (Y.2)</span>
                    <div className="text-[11px] text-muted">Véhicule utilitaire de transport</div>
                  </div>
                  <span className="font-mono font-bold text-fg">
                    {result.y2TaxeProfessionnelle.toFixed(2)} €
                  </span>
                </div>
              )}

              {result.y3MalusEcologique > 0 && (
                <div className="flex items-center justify-between py-1 border-b border-line/60 text-negative">
                  <div>
                    <span className="font-semibold">Malus écologique & poids (Y.3)</span>
                    <div className="text-[11px]">
                      CO₂: {result.details.malusCo2} € | Poids: {result.details.malusPoids} €
                    </div>
                  </div>
                  <span className="font-mono font-bold">
                    +{result.y3MalusEcologique.toFixed(2)} €
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between py-1 border-b border-line/60">
                <div>
                  <span className="font-semibold text-fg">Taxe fixe de gestion (Y.4)</span>
                  <div className="text-[11px] text-muted">Frais fixes nationaux</div>
                </div>
                <span className="font-mono font-bold text-fg">
                  {result.y4TaxeGestion.toFixed(2)} €
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-line/60">
                <div>
                  <span className="font-semibold text-fg">Frais d'acheminement (Y.5)</span>
                  <div className="text-[11px] text-muted">Envoi postal recommandé à domicile</div>
                </div>
                <span className="font-mono font-bold text-fg">
                  {result.y5RedevanceAcheminement.toFixed(2)} €
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://immatriculation.ants.gouv.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <span>Faire la démarche sur le site ANTS</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="mt-2 text-center text-[11px] text-muted">
              Service public officiel gratuit sans surcoût d'intermédiaire privé.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
