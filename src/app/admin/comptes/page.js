// src/app/admin/comptes/page.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/app/admin/AdminLayout';
import { supabase } from '@/lib/supabase';

export default function AdminComptes() {
  const router = useRouter();
  const [adminConnecte, setAdminConnecte] = useState(null);
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('liste');
  const [compteEnCours, setCompteEnCours] = useState(null);

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    motDePasse: '',
    role: 'admin'
  });

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      router.push('/dashboard-chezmonami');
      return;
    }
    const admin = JSON.parse(adminAuth);
    if (admin.role !== 'super_admin') {
      alert('Accès refusé. Seul le Super Admin peut gérer les comptes.');
      router.push('/admin/dashboard');
      return;
    }
    setAdminConnecte(admin);
    chargerComptes();
  }, [router]);

  const chargerComptes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('comptes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setComptes(data || []);
    } catch (error) {
      console.error('Erreur chargement comptes:', error);
      alert('Erreur lors du chargement des comptes');
    } finally {
      setLoading(false);
    }
  };

  const genererMotDePasseTemporaire = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#';
    let mdp = '';
    for (let i = 0; i < 12; i++) {
      mdp += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return mdp;
  };

  const ajouterCompte = () => {
    setCompteEnCours(null);
    setFormData({ nom: '', email: '', motDePasse: genererMotDePasseTemporaire(), role: 'admin' });
    setMode('formulaire');
  };

  const modifierCompte = (compte) => {
    setCompteEnCours(compte);
    setFormData({ nom: compte.nom, email: compte.email, motDePasse: '', role: compte.role });
    setMode('formulaire');
  };

  const supprimerCompte = async (id) => {
    if (id === adminConnecte?.id) {
      alert('Vous ne pouvez pas supprimer votre propre compte !');
      return;
    }
    if (!confirm('Supprimer ce compte ?')) return;
    try {
      const { error } = await supabase.from('comptes').delete().eq('id', id);
      if (error) throw error;
      alert('Compte supprimé avec succès !');
      chargerComptes();
    } catch (error) {
      alert('Erreur lors de la suppression: ' + error.message);
    }
  };

  const reinitialiserMotDePasse = async (compte) => {
    const nouveauMdp = genererMotDePasseTemporaire();
    if (!confirm('Réinitialiser le mot de passe de ' + compte.nom + ' ?')) return;
    try {
      const { error } = await supabase
        .from('comptes')
        .update({ mot_de_passe: nouveauMdp })
        .eq('id', compte.id);
      if (error) throw error;
      alert('Mot de passe réinitialisé !\n\nNouveau mot de passe : ' + nouveauMdp + '\n\nCommuniquez-le de manière sécurisée.');
      chargerComptes();
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
  };

  const sauvegarderCompte = async () => {
    if (!formData.nom || !formData.email) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (!compteEnCours && !formData.motDePasse) {
      alert('Le mot de passe est obligatoire pour créer un compte');
      return;
    }
    try {
      if (compteEnCours) {
        const updateData = { nom: formData.nom, email: formData.email, role: formData.role };
        if (formData.motDePasse) updateData.mot_de_passe = formData.motDePasse;
        const { error } = await supabase.from('comptes').update(updateData).eq('id', compteEnCours.id);
        if (error) throw error;
        alert('Compte modifié avec succès !');
      } else {
        const { error } = await supabase.from('comptes').insert({
          nom: formData.nom,
          email: formData.email,
          mot_de_passe: formData.motDePasse,
          role: formData.role,
          actif: true
        });
        if (error) throw error;
        alert('Compte créé !\n\nEmail : ' + formData.email + '\nMot de passe : ' + formData.motDePasse + '\n\nCommuniquez ces identifiants de manière sécurisée.');
      }
      setMode('liste');
      chargerComptes();
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
  };

  const toggleActif = async (compte) => {
    try {
      const { error } = await supabase.from('comptes').update({ actif: !compte.actif }).eq('id', compte.id);
      if (error) throw error;
      chargerComptes();
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
  };

  if (!adminConnecte || loading) {
    return (
      <AdminLayout titre="Gestion des Comptes Admin">
        <div className="flex items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </AdminLayout>
    );
  }

  if (mode === 'formulaire') {
    return (
      <AdminLayout titre={compteEnCours ? 'Modifier le compte' : 'Créer un compte admin'}>
        <div className="max-w-2xl">
          <button onClick={() => setMode('liste')} className="mb-6 flex items-center gap-2 text-primary hover:text-primary-dark">
            ← Retour à la liste
          </button>
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
              <input
                type="text"
                placeholder="Ex: Mohammed Alami"
                className="input-field"
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                placeholder="admin@chezmonami.ma"
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe {compteEnCours ? '(vide = ne pas changer)' : '*'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Minimum 8 caractères"
                  className="input-field flex-1"
                  value={formData.motDePasse}
                  onChange={(e) => setFormData({...formData, motDePasse: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setFormData({...formData, motDePasse: genererMotDePasseTemporaire()})}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Générer
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rôle *</label>
              <select
                className="input-field"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <div className="flex gap-4 pt-4">
              <button onClick={sauvegarderCompte} className="btn-primary flex-1">
                {compteEnCours ? 'Modifier' : 'Créer'} le compte
              </button>
              <button onClick={() => setMode('liste')} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                Annuler
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout titre="Gestion des Comptes Admin" sousTitre={comptes.length + ' compte(s) administrateur(s)'}>
      <div className="mb-6 flex items-center justify-between">
        <button onClick={ajouterCompte} className="btn-primary flex items-center gap-2">
          ➕ Créer un compte admin
        </button>
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Connecté : </span>{adminConnecte.nom} (Super Admin)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comptes.map((compte) => {
          const estConnecte = compte.id === adminConnecte.id;
          return (
            <div key={compte.id} className={'bg-white rounded-xl shadow-lg p-6 ' + (estConnecte ? 'ring-2 ring-primary' : '') + (!compte.actif ? ' opacity-60' : '')}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {compte.nom.charAt(0).toUpperCase()}
                </div>
                <div className="text-right space-y-1">
                  {estConnecte && (
                    <span className="px-3 py-1 bg-primary text-white rounded-full text-xs font-bold block">Vous</span>
                  )}
                  {!compte.actif && (
                    <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-bold block">Désactivé</span>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{compte.nom}</h3>
              <p className="text-sm text-gray-600 mb-3">{compte.email}</p>
              <div className="mb-4">
                <span className={'px-3 py-1 rounded-full text-xs font-bold ' + (compte.role === 'super_admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700')}>
                  {compte.role === 'super_admin' ? '⭐ Super Admin' : '👤 Admin'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Créé le {new Date(compte.created_at).toLocaleDateString('fr-FR')}
              </p>
              <div className="flex gap-2">
                <button onClick={() => modifierCompte(compte)} className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium text-sm">
                  Modifier
                </button>
                <button onClick={() => reinitialiserMotDePasse(compte)} className="flex-1 px-3 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition font-medium text-sm">
                  Reset MDP
                </button>
                {!estConnecte && (
                  <>
                    <button
                      onClick={() => toggleActif(compte)}
                      className={'px-3 py-2 rounded-lg transition text-sm ' + (compte.actif ? 'bg-gray-50 text-gray-600 hover:bg-gray-100' : 'bg-green-50 text-green-700 hover:bg-green-100')}
                      title={compte.actif ? 'Désactiver' : 'Activer'}
                    >
                      {compte.actif ? '🚫' : '✅'}
                    </button>
                    <button onClick={() => supprimerCompte(compte.id)} className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition">
                      🗑️
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
