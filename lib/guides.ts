export interface GuideItem {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  publishedDate: string;
  sections: {
    heading: string;
    content: string[];
  }[];
  faq: {
    q: string;
    a: string;
  }[];
}

export const GUIDES: GuideItem[] = [
  {
    slug: 'prix-cheval-fiscal-par-region',
    title: 'Prix du cheval fiscal par région 2026 : barème complet',
    metaTitle: 'Prix du cheval fiscal 2026 : barème par région',
    metaDescription: 'Barème 2026 du cheval fiscal voté par chaque région : classement du moins cher au plus cher, hausses récentes et méthode pour calculer votre taxe régionale.',
    summary: 'Le montant de la taxe régionale de votre certificat d\'immatriculation dépend directement du tarif unitaire du cheval fiscal voté par le Conseil régional de votre lieu de résidence.',
    publishedDate: '2026-01-01',
    sections: [
      {
        heading: 'Qu\'est-ce que le cheval fiscal unitaire ?',
        content: [
          'Le cheval fiscal (CV), ou puissance fiscale, est une unité de mesure administrative définie par le Code des impositions sur les biens et services (CIBS). Il figure à la case P.6 de votre certificat d\'immatriculation.',
          'Pour obtenir le montant de la taxe régionale principale (taxe Y.1), la formule de calcul légale est très simple : Puissance fiscale (case P.6) × Tarif du cheval fiscal de votre région de résidence.',
          'Cette taxe est perçue directement au profit du budget des collectivités régionales pour financer les infrastructures de transport et les services publics locaux.'
        ]
      },
      {
        heading: 'Classement des tarifs du cheval fiscal en 2026',
        content: [
          'En 2026, de fortes disparités existent sur le territoire français. Alors que la Normandie culmine à 60,00 € par cheval fiscal, la Corse conserve le barème le plus accessible de France métropolitaine à 27,00 €.',
          'Voici un aperçu des principaux barèmes régionaux applicables en 2026 :',
          '• Normandie : 60,00 € / CV\n• Bretagne, Bourgogne-Franche-Comté, Centre-Val de Loire : 55,00 € / CV\n• Île-de-France : 54,95 € / CV\n• Provence-Alpes-Côte d\'Azur (PACA) : 51,20 € / CV\n• Occitanie : 47,00 € / CV\n• Auvergne-Rhône-Alpes : 43,00 € / CV\n• Hauts-de-France : 39,20 € / CV\n• Corse : 27,00 € / CV\n• DROM (Guadeloupe, Guyane, Martinique, La Réunion, Mayotte) : entre 30,00 € et 51,00 € / CV.',
          'Utilisez le simulateur sur notre page d\'accueil pour sélectionner votre département et obtenir le calcul exact centime par centime.'
        ]
      },
      {
        heading: 'Pourquoi les prix augmentent-ils ?',
        content: [
          'Les Conseils régionaux votent chaque année leur budget primitif au mois de décembre. Face à la baisse des dotations globales de l\'État et à la transition énergétique, plusieurs régions ont relevé leur tarif unitaire ces dernières années pour atteindre le plafond légal fixé à 60 €.',
          'C\'est notamment le cas de la Normandie et de plusieurs régions du centre et de l\'ouest de la France. La taxe payée lors de votre immatriculation sert directement aux investissements régionaux (lignes ferroviaires TER, entretien des routes régionales, lycées et mobilité durable).'
        ]
      }
    ],
    faq: [
      {
        q: 'Où trouver le nombre de chevaux fiscaux sur ma carte grise ?',
        a: 'Le nombre de chevaux fiscaux est indiqué à la case P.6 (titrée "Puissance administrative nationale") sur votre certificat d\'immatriculation.'
      },
      {
        q: 'Quelle région détermine le tarif appliqué : celle du vendeur ou de l\'acheteur ?',
        a: 'C\'est exclusivement l\'adresse du domicile principal de l\'acquéreur (nouveau titulaire) qui détermine la région fiscale compétente, quel que soit l\'endroit où le véhicule a été acheté.'
      }
    ]
  },
  {
    slug: 'regle-moins-10-ans',
    title: 'Véhicules de plus de 10 ans : Réduction automatique de 50 %',
    metaTitle: 'Carte grise +10 ans : réduction de 50 % sur la taxe',
    metaDescription: 'Comprendre l\'abattement de 50 % sur la taxe régionale Y.1 pour les véhicules de plus de 10 ans : calculs, exemples et conditions d\'éligibilité.',
    summary: 'Si votre voiture ou votre moto a plus de 10 ans d\'âge, vous bénéficiez automatiquement d\'un abattement fiscal de 50 % sur le tarif de la taxe régionale.',
    publishedDate: '2026-01-01',
    sections: [
      {
        heading: 'La règle légale du demi-tarif (Art. L. 421-35 du CIBS)',
        content: [
          'L\'article L. 421-35 du Code des impositions sur les biens et services prévoit une réduction de plein droit de 50 % sur le montant unitaire de la taxe régionale d\'immatriculation pour les véhicules mis en circulation depuis plus de 10 ans.',
          'Cette mesure historique a été instaurée par le législateur pour tenir compte de la dépréciation vénale des véhicules d\'occasion et limiter le coût administratif d\'acquisition des voitures populaires sur le marché de la seconde main.'
        ]
      },
      {
        heading: 'Comment se calcule l\'âge exact de 10 ans ?',
        content: [
          'L\'âge du véhicule se calcule jour pour jour à compter de la date de sa toute première mise en circulation, inscrite à la case B de la carte grise.',
          'Exemple concret : Si un véhicule a été immatriculé pour la première fois le 15 avril 2015, il bascule officiellement dans la catégorie des véhicules de plus de 10 ans le 15 avril 2025. Avant cette date précise, la taxe Y.1 s\'applique à 100 %. Dès le 15 avril, elle est immédiatement divisée par deux.'
        ]
      },
      {
        heading: 'Quels véhicules sont concernés par la réduction ?',
        content: [
          'L\'abattement de 50 % s\'applique à la très grande majorité des catégories courantes :',
          '• Voitures particulières (genre national VP)\n• Camionnettes et véhicules utilitaires légers (genre CTTE)\n• Deux-roues motorisés et motocyclettes (MTL, MTT1, MTT2) - qui bénéficient déjà d\'un tarif de base réduit à 50%, soit 25% du taux plein après 10 ans.',
          'Attention : Les frais fixes de gestion (taxe Y.4 de 11,00 €) et la redevance d\'acheminement postal (taxe Y.5 de 2,76 €) ne sont jamais divisés par deux et restent intégralement dus (total fixe de 13,76 €).'
        ]
      }
    ],
    faq: [
      {
        q: 'Dois-je faire une demande spéciale pour avoir les 50 % ?',
        a: 'Non, le calcul de l\'abattement est 100 % automatisé dans le système SIV de l\'ANTS dès que la date en case B est antérieure de plus de 10 ans à la date de traitement.'
      },
      {
        q: 'Les utilitaires ont-ils droit à la réduction ?',
        a: 'Oui, les camionnettes (CTTE) de plus de 10 ans bénéficient également de la réduction de 50 % sur la taxe régionale Y.1. En revanche, la taxe parafiscale de formation professionnelle (Y.2 = 34 €) reste due.'
      }
    ]
  },
  {
    slug: 'carte-grise-voiture-electrique',
    title: 'Carte grise pour voiture 100 % électrique : Coût fixe de 13,76 €',
    metaTitle: 'Carte grise voiture électrique : 13,76 € en 2026',
    metaDescription: 'Prix de la carte grise d\'un véhicule électrique en France : exonération totale de la taxe régionale Y.1, coût fixe de 13,76 € et situation des hybrides en 2026.',
    summary: 'Les véhicules électriques bénéficient d\'une exonération totale et permanente de taxe régionale en France. Le coût d\'immatriculation est limité à 13,76 €.',
    publishedDate: '2026-01-01',
    sections: [
      {
        heading: 'Exonération totale de la taxe régionale (Y.1 = 0 €)',
        content: [
          'En application des dispositions nationales en faveur de la transition écologique, les véhicules à motorisation exclusivement électrique (énergie "EL" en case P.3 de la carte grise) et à hydrogène ("H2") sont exonérés à 100 % de la taxe régionale sur tout le territoire national.',
          'Peu importe que votre voiture développe 5 chevaux fiscaux ou 20 chevaux fiscaux, et quelle que soit votre région de résidence (même en Normandie à 60 €/CV ou en Île-de-France à 54,95 €/CV), la taxe Y.1 est égale à 0,00 €.'
        ]
      },
      {
        heading: 'Détail des 13,76 € à régler',
        content: [
          'L\'immatriculation d\'une voiture électrique neuve ou d\'occasion n\'est pas totalement gratuite car deux taxes fixes incompressibles couvrent les coûts administratifs de l\'État :',
          '• Taxe de gestion administrative (Y.4) : 11,00 € (couvre la fabrication du titre sécurisé par l\'Imprimerie Nationale)\n• Redevance d\'acheminement postal (Y.5) : 2,76 € (couvre l\'envoi sous pli sécurisé contre signature par La Poste).\n• Coût total de la carte grise (Y.6) = 11,00 € + 2,76 € = 13,76 €.'
        ]
      },
      {
        heading: 'Qu\'en est-il des voitures hybrides et du bioéthanol E85 ?',
        content: [
          'Attention à ne pas confondre véhicules 100 % électriques et véhicules dits "propres" hybrides (essence-électricité ou diesel-électricité) ou roulant au superéthanol E85.',
          'Auparavant, les Conseils régionaux pouvaient accorder une exonération partielle (50 %) ou totale (100 %) à ces catégories. Cependant, entre 2023 et 2025, la quasi-totalité des régions de France ont supprimé ces exonérations pour combler leur déficit budgétaire.',
          'Désormais, dans la quasi-totalité des départements, un véhicule hybride ou hybride rechargeable paye le tarif plein de la taxe régionale comme un modèle thermique classique.'
        ]
      }
    ],
    faq: [
      {
        q: 'Une Tesla neuve ou d\'occasion paye-t-elle le malus écologique ?',
        a: 'Non, les véhicules 100 % électriques émettent 0 g de CO2/km à l\'échappement. Ils sont donc exemptés de tout malus au CO2 ainsi que du malus au poids (TMOM).'
      },
      {
        q: 'Combien coûte la carte grise d\'un scooter ou d\'une moto électrique ?',
        a: 'Le tarif est identique : 13,76 € (11 € de gestion + 2,76 € d\'envoi postal), sans aucune taxe régionale.'
      }
    ]
  },
  {
    slug: 'documents-immatriculation-ants',
    title: 'Documents et démarches pour immatriculer son véhicule sur l\'ANTS',
    metaTitle: 'Documents carte grise ANTS 2026 : pièces à fournir',
    metaDescription: 'Liste complète des documents à fournir pour un changement de titulaire en ligne sur le portail ANTS / France Titres, afin d\'éviter tout rejet de dossier.',
    summary: 'Préparez votre dossier d\'immatriculation sur le site officiel de l\'État avec la liste exacte des pièces justificatives au format numérique.',
    publishedDate: '2026-01-01',
    sections: [
      {
        heading: 'Où faire sa démarche officielle d\'immatriculation ?',
        content: [
          'Depuis la fermeture définitive des guichets cartes grises en préfecture avec le Plan Préfectures Nouvelle Génération (PPNG), toutes les demandes se font obligatoirement en ligne.',
          'Le portail officiel de l\'État est : immatriculation.ants.gouv.fr (France Titres / Agence Nationale des Titres Sécurisés). Il ne facture aucun honoraire de traitement, seuls les montants légaux des taxes fiscales (Y.1 à Y.6) sont prélevés par télépaiement bancaire sécurisé.'
        ]
      },
      {
        heading: 'Liste des pièces justificatives obligatoires',
        content: [
          'Pour un changement de titulaire suite à l\'achat d\'un véhicule d\'occasion immatriculé en France, vous devez fournir sous format numérique (scan ou photo nette) :',
          '1. L\'ancienne carte grise : barrée lisiblement de la mention "Vendu le [jour/mois/année]" ou "Cédé le", avec l\'heure de la vente et la signature de tous les anciens cotitulaires.',
          '2. Le certificat de cession (formulaire Cerfa n° 15776*02) : complété et signé conjointement par le vendeur et vous-même, ou le code de cession à 5 chiffres généré en ligne par le vendeur.',
          '3. Le justificatif de contrôle technique : en cours de validité, datant de moins de 6 mois pour tout véhicule de plus de 4 ans (ou moins de 2 mois en cas de contre-visite prescrite).',
          '4. Un justificatif de domicile de moins de 6 mois : facture de fournisseur d\'énergie (électricité, gaz), facture internet/téléphone fixe, quittance de loyer délivrée par une agence, ou avis d\'imposition récent.',
          '5. Le permis de conduire : correspondant à la catégorie du véhicule immatriculé (permis B pour voiture, permis A/A2 pour moto).',
          '6. L\'attestation d\'assurance du véhicule : valide au moment de la demande (mémo véhicule ou carte verte).'
        ]
      },
      {
        heading: 'Délai légal et certificat provisoire (CPI)',
        content: [
          'L\'acheteur dispose d\'un délai légal strict d\'un mois (30 jours calendaires) à compter de la date figurant sur le certificat de cession pour effectuer le changement de titulaire.',
          'Dès que votre demande est validée et le télépaiement effectué sur l\'ANTS, vous pouvez immédiatement télécharger votre Certificat Provisoire d\'Immatriculation (CPI). Ce document vous autorise à circuler légalement sur le territoire national pendant un mois en attendant la réception à domicile de votre titre définitif par La Poste.'
        ]
      }
    ],
    faq: [
      {
        q: 'Quel est le délai de réception de la carte grise à domicile ?',
        a: 'En règle générale, le certificat d\'immatriculation définitif est imprimé par l\'Imprimerie Nationale et expédié sous lettre recommandée suivie avec remise contre signature dans un délai de 3 à 5 jours ouvrés.'
      },
      {
        q: 'Que risque-t-on si l\'on dépasse le délai d\'un mois ?',
        a: 'Circuler avec un véhicule sans avoir mis à jour le certificat d\'immatriculation dans le délai d\'un mois constitue une contravention de 4e classe punie d\'une amende forfaitaire de 135 € (pouvant être majorée à 750 €).'
      }
    ]
  }
];

export function findGuideBySlug(slug: string): GuideItem | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
