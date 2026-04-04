// src/app/admin/changer-mot-de-passe/page.js
'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

function ChangerMotDePasseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeForce = searchParams.get('mode') === 'force';

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [succes, setSucces] = useState(false);
  const [formData, setFormData] = useState({
    ancienMdp: '',
    nouveauMdp: '',
    confirmationMdp: ''
  });
  const [erreurs, setErreurs] = useState({});

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      router.push('/dashboard-chezmonami');
      return;
    }
    setAdmin(JSON.parse(adminAuth));
  }, [router]);

  const validerMotDePasse = (mdp) => {
    const errs = [];
    if (mdp.length < 8) errs.push('Au moins 8 caractères');
    if (!/[A-Z]/.test(mdp)) errs.push('Au moins une majuscule');
    if (!/[a-z]/.test(mdp)) errs.push('Au moins une minuscule');
    if (!/[0-9]/.test(mdp)) errs.push('Au moins un chiffre');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(mdp)) errs.push('Au moins un caractère spécial (!@#$%^&*...)');
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreurs({});
    setLoading(true);

    try {
      // Confirmation identique
      if (formData.nouveauMdp !== formData.confirmationMdp) {
        setErreurs({ confirmation: 'Les mots de passe ne correspondent pas' });
        setLoading(false);
        return;
      }

      // Critères sécurité
      const erreursValidation = validerMotDePasse(formData.nouveauMdp);
      if (erreursValidation.length > 0) {
        setErreurs({ nouveau: erreursValidation.join(', ') });
        setLoading(false);
        return;
      }

      // Nouveau MDP identique à l'ancien (interdit en mode forcé)
      if (modeForce && formData.ancienMdp === formData.nouveauMdp) {
        setErreurs({ nouveau: 'Le nouveau mot de passe doit être différent de l\'ancien' });
        setLoading(false);
        return;
      }

      // Vérifier l'ancien mot de passe en base
      const { data: compteData, error: compteError } = await supabase
        .from('comptes')
        .select('mot_de_passe')
        .eq('id', admin.id)
        .single();

      if (compteError || !compteData) {
        setErreurs({ general: 'Erreur lors de la vérification du compte' });
        setLoading(false);
        return;
      }

      if (formData.ancienMdp !== compteData.mot_de_passe) {
        setErreurs({ ancien: 'Mot de passe actuel incorrect' });
        setLoading(false);
        return;
      }

      // Mettre à jour le mot de passe + effacer le flag
      const { error: updateError } = await supabase
        .from('comptes')
        .update({
          mot_de_passe: formData.nouveauMdp,
          doit_changer_mdp: false
        })
        .eq('id', admin.id);

      if (updateError) {
        setErreurs({ general: 'Erreur lors de la mise à jour : ' + updateError.message });
        setLoading(false);
        return;
      }

      // Mettre à jour le localStorage
      const updatedAdmin = { ...admin, doit_changer_mdp: false };
      localStorage.setItem('adminAuth', JSON.stringify(updatedAdmin));

      setSucces(true);

      // Rediriger après 2 secondes
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Erreur:', error);
      setErreurs({ general: 'Une erreur est survenue' });
    } finally {
      setLoading(false);
    }
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-primary-light flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
            🔑
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {modeForce ? 'Changement obligatoire' : 'Changer mon mot de passe'}
          </h1>
          <p className="text-gray-600">
            {modeForce ? 'Créez un nouveau mot de passe sécurisé' : `Connecté en tant que ${admin.nom}`}
          </p>
        </div>

        {/* Bandeau avertissement (mode forcé uniquement) */}
        {modeForce && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Première connexion ou mot de passe réinitialisé :</strong> Vous devez définir un nouveau mot de passe avant de continuer.
            </p>
          </div>
        )}

        {/* Message succès */}
        {succes && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-green-800 font-semibold">✅ Mot de passe modifié avec succès !</p>
            <p className="text-sm text-green-700 mt-1">Redirection vers le dashboard...</p>
          </div>
        )}

        {/* Formulaire */}
        {!succes && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {erreurs.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {erreurs.general}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe actuel *
              </label>
              <input
                type="password"
                required
                className="input-field"
                value={formData.ancienMdp}
                onChange={(e) => setFormData({...formData, ancienMdp: e.target.value})}
                disabled={loading}
              />
              {erreurs.ancien && (
                <p className="text-xs text-red-600 mt-1">{erreurs.ancien}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nouveau mot de passe *
              </label>
              <input
                type="password"
                required
                className="input-field"
                value={formData.nouveauMdp}
                onChange={(e) => setFormData({...formData, nouveauMdp: e.target.value})}
                disabled={loading}
              />
              {erreurs.nouveau && (
                <p className="text-xs text-red-600 mt-1">{erreurs.nouveau}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le nouveau mot de passe *
              </label>
              <input
                type="password"
                required
                className="input-field"
                value={formData.confirmationMdp}
                onChange={(e) => setFormData({...formData, confirmationMdp: e.target.value})}
                disabled={loading}
              />
              {erreurs.confirmation && (
                <p className="text-xs text-red-600 mt-1">{erreurs.confirmation}</p>
              )}
            </div>

            {/* Critères */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-900 mb-2">🔒 Critères de sécurité :</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>✓ Minimum 8 caractères</li>
                <li>✓ Au moins une majuscule (A-Z)</li>
                <li>✓ Au moins une minuscule (a-z)</li>
                <li>✓ Au moins un chiffre (0-9)</li>
                <li>✓ Au moins un caractère spécial (!@#$%^&*...)</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 btn-primary disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Modification...' : 'Modifier le mot de passe'}
              </button>
              {/* Annuler uniquement disponible hors mode forcé */}
              {!modeForce && (
                <button
                  type="button"
                  onClick={() => router.push('/admin/dashboard')}
                  className="px-5 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm font-medium"
                  disabled={loading}
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ChangerMotDePasse() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
      <ChangerMotDePasseContent />
    </Suspense>
  );
}
