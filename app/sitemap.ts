import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';
import { REGIONS } from '@/lib/carte-grise';
import { GUIDES } from '@/lib/guides';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const regionRoutes: MetadataRoute.Sitemap = REGIONS.map((region) => ({
    url: absoluteUrl(`/region/${region.slug}`),
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((guide) => ({
    url: absoluteUrl(`/guide/${guide.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: absoluteUrl('/'),
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...regionRoutes,
    ...guideRoutes,
  ];
}
