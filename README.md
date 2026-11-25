# Carte Grise France 2026 — Ododex (`/fr/carte-grise`)

Simulateur du coût de certificat d'immatriculation (carte grise) en France selon les tarifs régionaux du cheval fiscal en vigueur en 2026.

- **URL en production** : [https://ododex.com/fr/carte-grise](https://ododex.com/fr/carte-grise)
- **Worker Cloudflare** : `ododex-carte-grise`
- **Portail parent** : [Ododex](https://ododex.com/fr/)

---

## 🎯 Fonctionnalités Clés

1. **Calculateur Fiscal Régional 2026** :
   - Taxe régionale (Y.1) calculée selon la puissance fiscale (CV) et la région administrative (Île-de-France, Auvergne-Rhône-Alpes, PACA, etc.).
   - Prise en compte de la réduction de 50% pour les véhicules de plus de 10 ans.
   - Exonérations et régimes spécifiques pour véhicules électriques (Crit'Air 0) et hybrides.
   - Taxe de gestion (Y.4 = 11 €) et redevance d'acheminement (Y.5 = 2,76 €).
2. **Fiches Régionales Dédiées** :
   - Pages statiques pour chaque région de France métropolitaine et d'outre-mer avec l'historique d'évolution du prix du cheval fiscal.
3. **Monetisation** :
   - Espacios publicitarios Google AdSense sin CLS (`min-height: 280px / 250px`).
   - Módulos de afiliación con plataformas y gestorías oficiales habilitadas por el Ministerio del Interior (*Carte Grise Minute, Eplaque*), con comisiones de 15 € a 30 € por trámite.

---

## 🛠️ Stack Technique

- **Framework** : Next.js 16 (App Router) avec export statique (`output: 'export'`).
- **Styles** : Tailwind CSS v4 avec thèmes clair/sombre persistants.
- **Accessibilité** : Conforme WCAG AA (ratios de contraste 4,5:1).
- **SEO & Données structurées** : Schema.org `WebApplication` et `BreadcrumbList`.

---

## 🚀 Développement Local & Tests

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Exécuter la suite de tests unitaires
npm test

# Compiler l'export statique pour Cloudflare Workers
npm run build
```
