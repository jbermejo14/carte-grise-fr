import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseScript } from '@/components/AdSenseScript';
import { absoluteUrl, getSiteUrl, SITE_NAME } from '@/lib/site';
import { HOME_DESCRIPTION, HOME_TITLE, TITLE_SUFFIX, buildSocialMetadata, fullTitle } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: fullTitle(HOME_TITLE),
    template: `%s${TITLE_SUFFIX}`,
  },
  description: HOME_DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: absoluteUrl('/'),
  },
  ...buildSocialMetadata(HOME_TITLE, HOME_DESCRIPTION, '/'),
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
