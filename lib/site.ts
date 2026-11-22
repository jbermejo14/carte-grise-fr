export const SITE_NAME = 'Ododex';
export const SECTION_NAME = 'Carte grise & taxes';
export const BASE_PATH = '/fr/carte-grise';
export const DEFAULT_ORIGIN = 'https://ododex.com';

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!envUrl) return DEFAULT_ORIGIN;
  return envUrl.replace(/\/+$/, '');
}

export function absoluteUrl(path = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${BASE_PATH}${cleanPath === '/' ? '' : cleanPath}`;
}
