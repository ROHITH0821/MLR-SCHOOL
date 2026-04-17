import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const origin = baseUrl.replace(/\/$/, '');

const routes = [
  '/',
  '/life',
  '/curriculum',
  '/testimonials',
  '/gallery',
  '/admission',
  '/about',
  '/principal',
  '/management',
  '/vision',
  '/blog',
  '/contact',
  '/utility',
  '/achievers',
  '/labs',
  '/careers',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${origin}${path}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));
}
