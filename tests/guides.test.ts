import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { GUIDES, findGuideBySlug } from '../lib/guides';

describe('Guides pratiques pour la carte grise', () => {
  it('contient au moins les 4 guides stratégiques', () => {
    assert.ok(GUIDES.length >= 4);
    const slugs = GUIDES.map((g) => g.slug);
    assert.ok(slugs.includes('prix-cheval-fiscal-par-region'));
    assert.ok(slugs.includes('regle-moins-10-ans'));
    assert.ok(slugs.includes('carte-grise-voiture-electrique'));
    assert.ok(slugs.includes('documents-immatriculation-ants'));
  });

  it('chaque guide a un titre, une description, des sections et une FAQ', () => {
    for (const guide of GUIDES) {
      assert.ok(guide.title.length > 10, `${guide.slug} title`);
      assert.ok(guide.metaTitle.length > 10, `${guide.slug} metaTitle`);
      assert.ok(guide.metaDescription.length > 20, `${guide.slug} metaDescription`);
      assert.ok(guide.sections.length >= 2, `${guide.slug} sections`);
      assert.ok(guide.faq.length >= 1, `${guide.slug} faq`);
      for (const faqItem of guide.faq) {
        assert.ok(faqItem.q.length > 5, `${guide.slug} faq question`);
        assert.ok(faqItem.a.length > 10, `${guide.slug} faq answer`);
      }
    }
  });

  it('trouve un guide par son slug', () => {
    const guide = findGuideBySlug('carte-grise-voiture-electrique');
    assert.ok(guide);
    assert.equal(guide?.slug, 'carte-grise-voiture-electrique');
    assert.equal(findGuideBySlug('guide-inexistant'), undefined);
  });
});
