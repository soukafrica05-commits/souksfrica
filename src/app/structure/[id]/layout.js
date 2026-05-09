// src/app/structure/[id]/layout.js
// Génère les métadonnées Open Graph pour l'aperçu lors du partage
// (WhatsApp, Facebook, LinkedIn, X, etc.)

import { supabase } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.soukafrica.ma';

// Détecte si la chaîne est un UUID
function isUUID(str) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

// Récupère la structure par UUID ou par slug
async function getStructure(idOrSlug) {
  const selectFields = `
    id, nom, slug, description, images,
    categorie:categorie_id(nom, icon),
    ville:ville_id(nom),
    pays:pays_id(nom)
  `;

  if (isUUID(idOrSlug)) {
    const { data } = await supabase
      .from('structures')
      .select(selectFields)
      .eq('id', idOrSlug)
      .maybeSingle();
    return data;
  }

  const { data } = await supabase
    .from('structures')
    .select(selectFields)
    .eq('slug', idOrSlug)
    .maybeSingle();
  return data;
}

export async function generateMetadata({ params }) {
  try {
    const structure = await getStructure(params.id);

    if (!structure) {
      return {
        title: 'Structure non trouvée - Souk Africa',
      };
    }

    // Description courte (max 160 caractères pour le SEO)
    const descriptionBrute = structure.description
      || `${structure.nom} - ${structure.categorie?.nom || 'Entreprise'} à ${structure.ville?.nom || 'Maroc'}`;
    const description = descriptionBrute.length > 160
      ? descriptionBrute.substring(0, 157) + '...'
      : descriptionBrute;

    // Image de couverture (la première image de la structure si disponible)
    const image = Array.isArray(structure.images) && structure.images.length > 0
      ? structure.images[0]
      : null;

    // URL canonique avec le slug
    const slug = structure.slug || structure.id;
    const url = `${SITE_URL}/structure/${slug}`;

    const titre = `${structure.nom} | Souk Africa`;

    return {
      title: titre,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: structure.nom,
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
            alt: structure.nom,
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
        title: structure.nom,
        description,
        images: image ? [image] : [`${SITE_URL}/images/og-default.jpg`],
      },
    };
  } catch (error) {
    console.error('Erreur generateMetadata structure:', error);
    return {
      title: 'Souk Africa - Votre marketplace de proximité au Maroc',
    };
  }
}

export default function StructureLayout({ children }) {
  return children;
}
