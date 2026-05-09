// src/app/sitemap.js
// Sitemap dynamique généré automatiquement → accessible sur /sitemap.xml
// Liste toutes les pages publiques + structures + produits pour Google Search Console

import { supabase } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.soukafrica.ma';

export default async function sitemap() {
  // Pages statiques publiques
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/structures`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/boutique`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/annonces`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Pages dynamiques : structures
  let structurePages = [];
  try {
    const { data: structures } = await supabase
      .from('structures')
      .select('id, slug, updated_at, created_at')
      .order('created_at', { ascending: false });

    structurePages = (structures || []).map(s => ({
      url: `${SITE_URL}/structure/${s.slug || s.id}`,
      lastModified: s.updated_at ? new Date(s.updated_at) : new Date(s.created_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Erreur sitemap structures:', error);
  }

  // Pages dynamiques : produits
  let produitPages = [];
  try {
    const { data: produits } = await supabase
      .from('produits')
      .select('id, updated_at, created_at')
      .order('created_at', { ascending: false });

    produitPages = (produits || []).map(p => ({
      url: `${SITE_URL}/produit/${p.id}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(p.created_at),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Erreur sitemap produits:', error);
  }

  return [...staticPages, ...structurePages, ...produitPages];
}
