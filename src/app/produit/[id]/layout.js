// src/app/produit/[id]/layout.js
// Génère les métadonnées Open Graph pour l'aperçu lors du partage d'un produit

import { supabase } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.soukafrica.ma';

async function getProduit(id) {
  const { data } = await supabase
    .from('produits')
    .select(`
      id, nom, description, prix, images,
      structure:structure_id(nom),
      ville:ville_id(nom)
    `)
    .eq('id', id)
    .maybeSingle();
  return data;
}

export async function generateMetadata({ params }) {
  try {
    const produit = await getProduit(params.id);

    if (!produit) {
      return {
        title: 'Produit non trouvé - Souk Africa',
      };
    }

    const descriptionBrute = produit.description
      || `${produit.nom} - ${produit.prix} MAD${produit.structure?.nom ? ' chez ' + produit.structure.nom : ''}`;
    const description = descriptionBrute.length > 160
      ? descriptionBrute.substring(0, 157) + '...'
      : descriptionBrute;

    const image = Array.isArray(produit.images) && produit.images.length > 0
      ? produit.images[0]
      : null;

    const url = `${SITE_URL}/produit/${produit.id}`;
    const titre = `${produit.nom} | Souk Africa`;

    return {
      title: titre,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: produit.nom,
        description,
        url,
        siteName: 'Souk Africa',
        locale: 'fr_MA',
        type: 'website',
        images: image ? [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: produit.nom,
          }
        ] : [
          {
            url: `${SITE_URL}/images/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: 'Souk Africa',
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: produit.nom,
        description,
        images: image ? [image] : [`${SITE_URL}/images/og-default.jpg`],
      },
    };
  } catch (error) {
    console.error('Erreur generateMetadata produit:', error);
    return {
      title: 'Souk Africa',
    };
  }
}

export default function ProduitLayout({ children }) {
  return children;
}
