import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseScript } from '@/components/AdSenseScript';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL('https://ododex.com'),
  title: {
    default: "Calculateur Carte Grise 2026 : Prix et Simulation Officielle | Ododex",
    template: "%s | Ododex",
  },
  description:
    "Calculez gratuitement le prix officiel de votre carte grise (certificat d'immatriculation) en 2026. Barème du cheval fiscal par région, réduction de 50% pour les véhicules de plus de 10 ans et exonérations écologiques.",
  authors: [{ name: 'Ododex' }],
  creator: 'Ododex',
  publisher: 'Ododex',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    title: "Calculateur de Carte Grise 2026 | Ododex",
    description:
      "Simulateur officiel du coût de certificat d'immatriculation selon votre région, chevaux fiscaux et type de véhicule.",
    url: absoluteUrl('/'),
    siteName: 'Ododex',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Calculateur de Carte Grise 2026 | Ododex",
    description:
      "Simulateur officiel du coût de certificat d'immatriculation selon votre région, chevaux fiscaux et type de véhicule.",
  },
  icons: {
    icon: '/ododex-favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var theme = null;
                try {
                  var saved = localStorage.getItem('ododex-theme');
                  if (saved === 'light' || saved === 'dark') theme = saved;
                  if (!theme) {
                    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                    theme = prefersDark ? 'dark' : 'light';
                  }
                } catch (e) {
                  theme = 'light';
                }
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
        <AdSenseScript />
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-fg antialiased selection:bg-accent-soft selection:text-accent">
        <Header />
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
