import type { MetadataRoute } from 'next';
import { site, divisions } from '@/data/site';
import { projects } from '@/data/projects';

/** Карта сайта для поисковиков: /sitemap.xml */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/about`, lastModified: now, priority: 0.7 },
    ...divisions.map((d) => ({ url: `${site.url}/${d.id}`, lastModified: now, priority: 0.8 })),
    ...projects.map((p) => ({ url: `${site.url}/${p.division}/${p.slug}`, lastModified: now, priority: 0.6 })),
    { url: `${site.url}/privacy`, lastModified: now, priority: 0.2 },
  ];
}
