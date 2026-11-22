import React from 'react';
import Link from 'next/link';
import { getAdSenseClient } from './AdSenseScript';

export function Footer() {
  const hasAdsense = !!getAdSenseClient();

  return (
    <footer className="border-t border-line bg-surface mt-16 py-10 text-xs text-secondary">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-fg">Ododex</span>
            <span>·</span>
            <span>Simulateur de taxe fiscale d'immatriculation (carte grise)</span>
          </div>

          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="/fr" className="hover:text-fg hover:underline">
              Accueil Ododex
            </a>
            <Link href="/mentions-legales" className="hover:text-fg hover:underline">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-fg hover:underline">
              Confidentialité
            </Link>
            <Link href="/cookies" className="hover:text-fg hover:underline">
              Cookies
            </Link>
          </nav>
        </div>

        <p className="text-muted leading-relaxed">
          Tarifs du cheval fiscal et barèmes fiscaux officiels fixés par les Conseils régionaux et la Loi de finances.
          Ce simulateur gratuit est un outil d'information indépendant non affilié à l'Agence Nationale des Titres Sécurisés (ANTS) ni au Ministère de l'Intérieur.
        </p>

        {hasAdsense && (
          <p className="text-muted">
            Des annonces personnalisées peuvent être affichées conformément à notre politique de cookies et au consentement TCF v2.2.
          </p>
        )}
      </div>
    </footer>
  );
}
