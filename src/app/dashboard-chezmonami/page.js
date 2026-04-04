// src/app/dashboard-chezmonami/page.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLoginSecure() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', motDePasse: '' });
  const [erreur, setErreur] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Vérifier si déjà connecté
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErreur('');
    setLoading(true);

    try {
      // Rechercher le compte dans la table `comptes`
      const { data: compte, error: compteError } = await supabase
        .from('comptes')
        .select('*')
        .eq('email', formData.email)
        .eq('actif', true)
        .single();

      if (compteError || !compte) {
        setErreur('Email ou mot de passe incorrect');
        setLoading(false);
        return;
      }

      // Vérifier le mot de passe
      if (formData.motDePasse !== compte.mot_de_passe) {
        setErreur('Email ou mot de passe incorrect');
        setLoading(false);
        return;
      }

      // Connexion réussie - créer session localStorage
      const now = Date.now();
      localStorage.setItem('adminAuth', JSON.stringify({
        id: compte.id,
        nom: compte.nom,
        email: compte.email,
        role: compte.role,
        doit_changer_mdp: compte.doit_changer_mdp || false
      }));
      localStorage.setItem('adminSessionStart', now.toString());
      localStorage.setItem('adminLastActivity', now.toString());

      // Rediriger vers changement de MDP si obligatoire (première connexion ou reset)
      if (compte.doit_changer_mdp) {
        router.push('/admin/changer-mot-de-passe?mode=force');
      } else {
        router.push('/admin/dashboard');
      }

    } catch (error) {
      console.error('Erreur connexion:', error);
      setErreur('Erreur lors de la connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-primary-light flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
            🔒
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Souk Africa</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="space-y-5">
          {erreur && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {erreur}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              placeholder="votre@email.com"
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="input-field"
              value={formData.motDePasse}
              onChange={(e) => setFormData({...formData, motDePasse: e.target.value})}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Infos sécurité */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 mb-2">🔐 Sécurité</p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Session active pendant 2 heures</li>
            <li>• Déconnexion automatique après 30 min d'inactivité</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
