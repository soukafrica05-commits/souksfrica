// src/components/FeaturedProductsSection.js
// Section "Produits à la une" affichée en bas des pages détail
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { produitsAPI } from '@/lib/api';

export default function FeaturedProductsSection({ excludeId = null, limit = 10 }) {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeatured();
  }, [excludeId]);

  const loadFeatured = async () => {
    try {
      const now = new Date().toISOString();

      // Récupère les mises en avant produits actives (illimité)
      const { data: misesData } = await supabase
        .from('mises_en_avant')
        .select('*')
        .eq('element_type', 'produit')
        .eq('actif', true)
        .lte('date_debut', now)
        .or(`date_fin.is.null,date_fin.gte.${now}`)
        .order('ordre', { ascending: true });

      if (!misesData || misesData.length === 0) {
        setFeatured([]);
        setLoading(false);
        return;
      }

      // Charge les produits correspondants
      const allProduits = await produitsAPI.getAll();
      const enriched = misesData
        .map(mise => allProduits.find(p => p.id === mise.element_id))
        .filter(Boolean)
        .filter(p => p.id !== excludeId)
        .slice(0, limit);

      setFeatured(enriched);
    } catch (error) {
      console.error('Erreur featured produits:', error);
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
        <h2 className="text-2xl font-bold text-gray-800">Produits à la une</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {featured.map(produit => (
          <Link
            key={produit.id}
            href={`/produit/${produit.id}`}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 overflow-hidden"
          >
            <div className="relative h-40 bg-gray-100">
              {produit.images?.[0] ? (
                <img
                  src={produit.images[0]}
                  alt={produit.nom}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">
                  📦
                </div>
              )}
              <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                ⭐ À la une
              </span>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-gray-800 text-sm truncate group-hover:text-primary transition">
                {produit.nom}
              </h3>
              <p className="text-primary font-bold mt-1">
                {(parseFloat(produit.prix) || 0).toLocaleString()} MAD
              </p>
              {produit.ville && (
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  📍 {produit.ville.nom}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
