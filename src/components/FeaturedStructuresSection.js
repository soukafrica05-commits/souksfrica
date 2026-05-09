// src/components/FeaturedStructuresSection.js
// Section "Entreprises à la une" affichée en bas des pages détail
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { structuresAPI } from '@/lib/api';

export default function FeaturedStructuresSection({ excludeId = null, limit = 10 }) {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeatured();
  }, [excludeId]);

  const loadFeatured = async () => {
    try {
      const now = new Date().toISOString();

      // Récupère les mises en avant actives (sans limite — l'admin pilote)
      const { data: misesData } = await supabase
        .from('mises_en_avant')
        .select('*')
        .eq('element_type', 'structure')
        .eq('actif', true)
        .lte('date_debut', now)
        .or(`date_fin.is.null,date_fin.gte.${now}`)
        .order('ordre', { ascending: true });

      if (!misesData || misesData.length === 0) {
        setFeatured([]);
        setLoading(false);
        return;
      }

      // Charge les structures correspondantes
      const allStructures = await structuresAPI.getAll();
      const enriched = misesData
        .map(mise => allStructures.find(s => s.id === mise.element_id))
        .filter(Boolean)
        .filter(s => s.id !== excludeId)  // exclut la structure en cours
        .slice(0, limit);

      setFeatured(enriched);
    } catch (error) {
      console.error('Erreur featured structures:', error);
      setFeatured([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading || featured.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">⭐</span>
        <h2 className="text-2xl font-bold text-gray-800">Entreprises à la une</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {featured.map(structure => (
          <Link
            key={structure.id}
            href={`/structure/${structure.slug || structure.id}`}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 overflow-hidden"
          >
            <div className="relative h-32 bg-gray-100">
              {structure.images?.[0] ? (
                <img
                  src={structure.images[0]}
                  alt={structure.nom}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">
                  {structure.categorie?.icon || '🏪'}
                </div>
              )}
              <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                ⭐ À la une
              </span>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-gray-800 text-sm truncate group-hover:text-primary transition">
                {structure.nom}
              </h3>
              {structure.categorie && (
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {structure.categorie.icon} {structure.categorie.nom}
                </p>
              )}
              {structure.ville && (
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  📍 {structure.ville.nom}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
