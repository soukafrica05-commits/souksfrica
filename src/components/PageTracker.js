// src/components/PageTracker.js - TRACKING AUTOMATIQUE
// Adapté au schéma Supabase actuel (tables visites + elements_populaires)
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PageTracker({ pageType = 'page', elementId = null, elementType = null }) {
  const pathname = usePathname();

  useEffect(() => {
    // Génère/récupère un ID visiteur unique (stocké en localStorage)
    const getVisitorId = () => {
      let visitorId = localStorage.getItem('visitor_id');
      if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('visitor_id', visitorId);
      }
      return visitorId;
    };

    // Enregistre une visite de page
    const trackPageVisit = async () => {
      try {
        // 1. Insertion dans la table `visites` — uniquement les colonnes qui existent
        const { error: visiteError } = await supabase
          .from('visites')
          .insert({
            page_url: pathname,
            page_titre: typeof document !== 'undefined' ? document.title : null,
            element_type: elementType,
            element_id: elementId
          });

        if (visiteError) {
          console.error('❌ Erreur visite:', visiteError.message, visiteError.code);
        }

        // 2. Si c'est un élément spécifique (structure/produit/annonce), incrémenter sa popularité
        if (elementId && elementType) {
          await trackElementView(elementId, elementType);
        }

        console.log('✅ Visite enregistrée:', pathname);
      } catch (error) {
        console.error('❌ Erreur tracking complète:', error);
      }
    };

    // Incrémente le compteur de vues d'un élément (table `elements_populaires`)
    const trackElementView = async (id, type) => {
      try {
        const { data: existingView } = await supabase
          .from('elements_populaires')
          .select('*')
          .eq('element_id', id)
          .eq('element_type', type)
          .maybeSingle();

        if (existingView) {
          // Incrémenter les compteurs existants
          await supabase
            .from('elements_populaires')
            .update({
              vues_total: (existingView.vues_total || 0) + 1,
              vues_semaine: (existingView.vues_semaine || 0) + 1,
              vues_mois: (existingView.vues_mois || 0) + 1,
              derniere_mise_a_jour: new Date().toISOString()
            })
            .eq('id', existingView.id);
        } else {
          // Créer une nouvelle entrée
          await supabase
            .from('elements_populaires')
            .insert({
              element_id: id,
              element_type: type,
              element_nom: typeof document !== 'undefined' ? document.title : null,
              vues_total: 1,
              vues_semaine: 1,
              vues_mois: 1,
              derniere_mise_a_jour: new Date().toISOString()
            });
        }
      } catch (error) {
        console.error('Erreur tracking element:', error);
      }
    };

    // Garde l'ID visiteur disponible (pas utilisé directement mais maintenu pour cohérence)
    getVisitorId();

    // Exécute le tracking
    trackPageVisit();

    return () => {};
  }, [pathname, pageType, elementId, elementType]);

  // Composant invisible
  return null;
}
