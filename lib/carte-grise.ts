import regionsData from '../data/regions.json';

export type VehicleCategory =
  | 'car' // Voiture particulière (VP)
  | 'van' // Utilitaire léger (CTTE / VUL <= 3,5t)
  | 'motorcycle' // Moto (> 125 cm3)
  | 'light_motorcycle' // Moto légère (<= 125 cm3)
  | 'trailer'; // Remorque / Caravane

export type FuelType =
  | 'petrol' // Essence
  | 'diesel' // Diesel
  | 'electric' // 100% Électrique / Hydrogène
  | 'hybrid'; // Hybride / GPL / Superéthanol E85

export type VehicleAge =
  | 'under_10' // Moins de 10 ans
  | 'over_10'; // 10 ans et plus (réduction 50% sur Y.1)

export interface RegionInfo {
  slug: string;
  name: string;
  chevalFiscal: number;
  exemptCleanVehicles: boolean;
  departements: { code: string; name: string }[];
}

export interface CarteGriseInput {
  regionSlug: string;
  fiscalPower: number; // CV fiscaux
  vehicleCategory: VehicleCategory;
  fuelType: FuelType;
  vehicleAge: VehicleAge;
  isNewVehicle: boolean;
  co2Emissions?: number; // g/km WLTP
  weightKg?: number; // TMOM en kg
}

export interface CarteGriseResult {
  region: RegionInfo;
  y1TaxeRegionale: number;
  y2TaxeProfessionnelle: number;
  y3MalusEcologique: number;
  y4TaxeGestion: number;
  y5RedevanceAcheminement: number;
  y6Total: number;
  details: {
    chevalFiscalTarif: number;
    puissanceRetenue: number;
    tauxExoneration: number; // 0, 0.5, 1.0
    reductionAge: boolean;
    malusCo2: number;
    malusPoids: number;
  };
}

export const REGIONS: readonly RegionInfo[] = regionsData;

export const TAXE_GESTION_FIXE = 11.0;
export const REDEVANCE_ACHEMINEMENT = 2.76;

export function findRegionBySlug(slug: string): RegionInfo | null {
  return REGIONS.find((r) => r.slug === slug) ?? null;
}

export function findRegionByDepartementCode(code: string): RegionInfo | null {
  const clean = code.trim().toUpperCase();
  return REGIONS.find((r) => r.departements.some((d) => d.code === clean)) ?? null;
}

/**
 * Barème officiel Malus CO2 (WLTP) indicatif 2025/2026.
 * Seuil de déclenchement à 113 g/km.
 */
export function calculateMalusCo2(co2Gkm: number): number {
  if (!co2Gkm || co2Gkm <= 112) return 0;
  if (co2Gkm === 113) return 50;
  if (co2Gkm === 114) return 75;
  if (co2Gkm === 115) return 100;
  if (co2Gkm <= 120) return 100 + (co2Gkm - 115) * 40;
  if (co2Gkm <= 130) return 300 + (co2Gkm - 120) * 80;
  if (co2Gkm <= 140) return 1100 + (co2Gkm - 130) * 150;
  if (co2Gkm <= 150) return 2600 + (co2Gkm - 140) * 300;
  if (co2Gkm <= 160) return 5600 + (co2Gkm - 150) * 600;
  if (co2Gkm <= 170) return 11600 + (co2Gkm - 160) * 1200;
  if (co2Gkm <= 180) return 23600 + (co2Gkm - 170) * 2000;
  if (co2Gkm <= 193) return 43600 + (co2Gkm - 180) * 2500;
  return 70000; // Plafond maximal
}

/**
 * Malus au poids (Taxe sur la masse en ordre de marche - TMOM) à partir de 1 600 kg.
 */
export function calculateMalusPoids(weightKg: number): number {
  if (!weightKg || weightKg <= 1600) return 0;
  const excess = weightKg - 1600;
  if (excess <= 99) return excess * 10;
  if (excess <= 199) return 990 + (excess - 99) * 15;
  if (excess <= 299) return 2490 + (excess - 199) * 20;
  return 4490 + (excess - 299) * 30;
}

/**
 * Calcule les taxes de carte grise officielles de A à Z selon les règles légales françaises.
 */
export function calculateCarteGrise(input: CarteGriseInput): CarteGriseResult {
  const region = findRegionBySlug(input.regionSlug) ?? REGIONS[0];
  const cv = Math.max(1, Math.min(100, Math.round(input.fiscalPower || 1)));

  // 1. Détermination du taux et des coefficients pour Y.1
  let categoryCoeff = 1.0;
  let puissanceRetenue = cv;

  if (input.vehicleCategory === 'motorcycle' || input.vehicleCategory === 'light_motorcycle') {
    categoryCoeff = 0.5; // Demi-tarif cheval fiscal pour les motos
  } else if (input.vehicleCategory === 'trailer') {
    puissanceRetenue = 1.5; // Forfait remorque / caravane = 1.5 CV
  }

  // Exonération véhicule propre
  let isExempt = false;
  if (input.fuelType === 'electric') {
    isExempt = true; // 100% électrique ou hydrogène : toujours 100% exonéré
  } else if (input.fuelType === 'hybrid' && region.exemptCleanVehicles) {
    isExempt = true;
  }

  // Réduction véhicule de plus de 10 ans
  const isOver10 = input.vehicleAge === 'over_10';
  const ageCoeff = isOver10 ? 0.5 : 1.0;

  let y1Raw = 0;
  if (!isExempt) {
    y1Raw = puissanceRetenue * region.chevalFiscal * categoryCoeff * ageCoeff;
  }
  const y1TaxeRegionale = Math.round(y1Raw * 100) / 100;

  // 2. Taxe parafiscale de formation professionnelle (Y.2)
  let y2TaxeProfessionnelle = 0;
  if (input.vehicleCategory === 'van') {
    y2TaxeProfessionnelle = 34.0; // Barème officiel utilitaire <= 3,5 tonnes
  }

  // 3. Malus écologique (Y.3) - Uniquement pour les véhicules neufs (ou première immatriculation en France)
  let malusCo2 = 0;
  let malusPoids = 0;
  let y3MalusEcologique = 0;

  if (input.isNewVehicle && input.fuelType !== 'electric') {
    if (input.co2Emissions) {
      malusCo2 = calculateMalusCo2(input.co2Emissions);
    }
    if (input.weightKg) {
      malusPoids = calculateMalusPoids(input.weightKg);
    }
    y3MalusEcologique = malusCo2 + malusPoids;
  }

  // 4. Taxe de gestion (Y.4) et Redevance d'acheminement (Y.5)
  // La taxe de gestion est de 11 €, redevance 2,76 €
  const y4TaxeGestion = TAXE_GESTION_FIXE;
  const y5RedevanceAcheminement = REDEVANCE_ACHEMINEMENT;

  // 5. Total de la taxe (Y.6)
  // En France, le total des taxes fiscales (Y.1 + Y.2 + Y.3 + Y.4) est arrondi à l'euro,
  // puis on ajoute les 2,76 € d'envoi.
  const fiscalTaxesRounded = Math.round(y1TaxeRegionale + y2TaxeProfessionnelle + y3MalusEcologique + y4TaxeGestion);
  const y6Total = Math.round((fiscalTaxesRounded + y5RedevanceAcheminement) * 100) / 100;

  return {
    region,
    y1TaxeRegionale,
    y2TaxeProfessionnelle,
    y3MalusEcologique,
    y4TaxeGestion,
    y5RedevanceAcheminement,
    y6Total,
    details: {
      chevalFiscalTarif: region.chevalFiscal,
      puissanceRetenue,
      tauxExoneration: isExempt ? 1.0 : isOver10 ? 0.5 : 0,
      reductionAge: isOver10,
      malusCo2,
      malusPoids,
    },
  };
}
