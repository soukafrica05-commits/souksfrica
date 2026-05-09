// src/app/robots.js
// Fichier robots.txt généré automatiquement → accessible sur /robots.txt
// Indique aux moteurs de recherche quelles pages crawler et où trouver le sitemap

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.soukafrica.ma';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard-chezmonami',
          '/mes-commandes',
          '/desinscription',
          '/api/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
