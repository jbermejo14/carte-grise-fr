import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  calculateCarteGrise,
  calculateMalusCo2,
  calculateMalusPoids,
  findRegionByDepartementCode,
  findRegionBySlug,
  REGIONS,
} from '../lib/carte-grise';

describe('REGIONS', () => {
  it('contient toutes les 13 régions métropolitaines et 5 DROM', () => {
    assert.equal(REGIONS.length, 18);
    const slugs = REGIONS.map((r) => r.slug);
    assert.ok(slugs.includes('ile-de-france'));
    assert.ok(slugs.includes('auvergne-rhone-alpes'));
    assert.ok(slugs.includes('normandie'));
    assert.ok(slugs.includes('provence-alpes-cote-d-azur'));
  });

  it('chaque région a un tarif de cheval fiscal positif et des départements', () => {
    for (const region of REGIONS) {
      assert.ok(region.chevalFiscal > 20, `${region.slug} cheval fiscal`);
      assert.ok(region.departements.length >= 1, `${region.slug} départements`);
    }
  });

  it('trouve la région par code de département', () => {
    assert.equal(findRegionByDepartementCode('75')?.slug, 'ile-de-france');
    assert.equal(findRegionByDepartementCode('69')?.slug, 'auvergne-rhone-alpes');
    assert.equal(findRegionByDepartementCode('13')?.slug, 'provence-alpes-cote-d-azur');
    assert.equal(findRegionByDepartementCode('33')?.slug, 'nouvelle-aquitaine');
    assert.equal(findRegionByDepartementCode('999'), null);
  });
});

describe('calculateCarteGrise: Cas réels officiels', () => {
  it('Voiture essence 6 CV en Île-de-France d occasion < 10 ans', () => {
    const result = calculateCarteGrise({
      regionSlug: 'ile-de-france',
      fiscalPower: 6,
      vehicleCategory: 'car',
      fuelType: 'petrol',
      vehicleAge: 'under_10',
      isNewVehicle: false,
    });

    // Y.1 = 6 * 54.95 = 329.70 €
    assert.equal(result.y1TaxeRegionale, 329.7);
    assert.equal(result.y2TaxeProfessionnelle, 0);
    assert.equal(result.y3MalusEcologique, 0);
    assert.equal(result.y4TaxeGestion, 11);
    assert.equal(result.y5RedevanceAcheminement, 2.76);
    // Y.6 = round(329.70 + 11) + 2.76 = 341 + 2.76 = 343.76 €
    assert.equal(result.y6Total, 343.76);
  });

  it('Voiture diesel 6 CV en Île-de-France de plus de 10 ans (-50% Y.1)', () => {
    const result = calculateCarteGrise({
      regionSlug: 'ile-de-france',
      fiscalPower: 6,
      vehicleCategory: 'car',
      fuelType: 'diesel',
      vehicleAge: 'over_10',
      isNewVehicle: false,
    });

    // Y.1 = 6 * 54.95 * 0.5 = 164.85 €
    assert.equal(result.y1TaxeRegionale, 164.85);
    // Y.6 = round(164.85 + 11) + 2.76 = 176 + 2.76 = 178.76 €
    assert.equal(result.y6Total, 178.76);
    assert.equal(result.details.reductionAge, true);
  });

  it('Voiture 100% électrique: exonération totale Y.1 (13,76 € fixes)', () => {
    const result = calculateCarteGrise({
      regionSlug: 'normandie',
      fiscalPower: 10,
      vehicleCategory: 'car',
      fuelType: 'electric',
      vehicleAge: 'under_10',
      isNewVehicle: false,
    });

    assert.equal(result.y1TaxeRegionale, 0);
    assert.equal(result.y4TaxeGestion, 11);
    assert.equal(result.y5RedevanceAcheminement, 2.76);
    assert.equal(result.y6Total, 13.76);
  });

  it('Moto 8 CV en PACA (51,20 €/CV): demi-tarif cheval fiscal', () => {
    const result = calculateCarteGrise({
      regionSlug: 'provence-alpes-cote-d-azur',
      fiscalPower: 8,
      vehicleCategory: 'motorcycle',
      fuelType: 'petrol',
      vehicleAge: 'under_10',
      isNewVehicle: false,
    });

    // Y.1 = 8 * 51.20 * 0.5 = 204.80 €
    assert.equal(result.y1TaxeRegionale, 204.8);
    // Y.6 = round(204.80 + 11) + 2.76 = 216 + 2.76 = 218.76 €
    assert.equal(result.y6Total, 218.76);
  });

  it('Utilitaire léger (CTTE): applique la taxe parafiscale Y.2 de 34 €', () => {
    const result = calculateCarteGrise({
      regionSlug: 'auvergne-rhone-alpes',
      fiscalPower: 7,
      vehicleCategory: 'van',
      fuelType: 'diesel',
      vehicleAge: 'under_10',
      isNewVehicle: false,
    });

    // Y.1 = 7 * 43.00 = 301.00 €
    assert.equal(result.y1TaxeRegionale, 301);
    assert.equal(result.y2TaxeProfessionnelle, 34);
    // Y.6 = round(301 + 34 + 11) + 2.76 = 346 + 2.76 = 348.76 €
    assert.equal(result.y6Total, 348.76);
  });
});

describe('Malus écologique et au poids', () => {
  it('calcule le barème progressif CO2 et seuil à 113 g/km', () => {
    assert.equal(calculateMalusCo2(110), 0);
    assert.equal(calculateMalusCo2(113), 50);
    assert.ok(calculateMalusCo2(150) > 1000);
  });

  it('calcule le malus au poids à partir de 1 600 kg', () => {
    assert.equal(calculateMalusPoids(1550), 0);
    assert.equal(calculateMalusPoids(1600), 0);
    assert.equal(calculateMalusPoids(1650), 500); // 50 kg * 10 €
  });
});
