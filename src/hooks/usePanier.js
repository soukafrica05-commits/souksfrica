// hooks/usePanier.js - Version Maroc (MAD fixe)
'use client';
import { useState, useEffect, useCallback } from 'react';

const PANIER_STORAGE_KEY = 'chezmonami_panier';
const PANIER_CHANGED_EVENT = 'panier-changed';

export function usePanier() {
  const [panier, setPanier] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const chargerPanier = useCallback(() => {
    try {
      const panierSauvegarde = localStorage.getItem(PANIER_STORAGE_KEY);
      if (panierSauvegarde) {
        setPanier(JSON.parse(panierSauvegarde));
      } else {
        setPanier([]);
      }
    } catch (error) {
      setPanier([]);
    }
  }, []);

  useEffect(() => {
    chargerPanier();
    setIsLoaded(true);
  }, [chargerPanier]);

  useEffect(() => {
    const handlePanierChanged = () => chargerPanier();
    window.addEventListener(PANIER_CHANGED_EVENT, handlePanierChanged);
    window.addEventListener('storage', (e) => {
      if (e.key === PANIER_STORAGE_KEY) chargerPanier();
    });
    return () => window.removeEventListener(PANIER_CHANGED_EVENT, handlePanierChanged);
  }, [chargerPanier]);

  const sauvegarderPanier = useCallback((nouveauPanier) => {
    try {
      localStorage.setItem(PANIER_STORAGE_KEY, JSON.stringify(nouveauPanier));
      setPanier(nouveauPanier);
      window.dispatchEvent(new Event(PANIER_CHANGED_EVENT));
    } catch (error) {
      console.error('Erreur sauvegarde panier:', error);
    }
  }, []);

  const ajouterAuPanier = useCallback((produit) => {
    const panierActuel = JSON.parse(localStorage.getItem(PANIER_STORAGE_KEY) || '[]');
    const index = panierActuel.findIndex(item => item.id === produit.id);
    let nouveauPanier;
    if (index !== -1) {
      nouveauPanier = [...panierActuel];
      nouveauPanier[index] = {
        ...nouveauPanier[index],
        quantite: (nouveauPanier[index].quantite || 1) + (produit.quantite || 1)
      };
    } else {
      nouveauPanier = [...panierActuel, { ...produit, quantite: produit.quantite || 1 }];
    }
    sauvegarderPanier(nouveauPanier);
    window.dispatchEvent(new CustomEvent('produit-ajoute-panier', {
      detail: { produit: produit.nom }
    }));
  }, [sauvegarderPanier]);

  const retirerDuPanier = useCallback((index) => {
    const panierActuel = JSON.parse(localStorage.getItem(PANIER_STORAGE_KEY) || '[]');
    sauvegarderPanier(panierActuel.filter((_, i) => i !== index));
  }, [sauvegarderPanier]);

  const modifierQuantite = useCallback((index, nouvelleQuantite) => {
    if (nouvelleQuantite <= 0) { retirerDuPanier(index); return; }
    const panierActuel = JSON.parse(localStorage.getItem(PANIER_STORAGE_KEY) || '[]');
    const nouveauPanier = [...panierActuel];
    if (nouveauPanier[index]) {
      nouveauPanier[index] = { ...nouveauPanier[index], quantite: nouvelleQuantite };
      sauvegarderPanier(nouveauPanier);
    }
  }, [retirerDuPanier, sauvegarderPanier]);

  const viderPanier = useCallback(() => {
    sauvegarderPanier([]);
  }, [sauvegarderPanier]);

  const totalPanier = panier.reduce((sum, item) => {
    return sum + ((parseFloat(item.prix) || 0) * (item.quantite || 1));
  }, 0);

  const nombreArticles = panier.reduce((sum, item) => sum + (item.quantite || 1), 0);

  return {
    panier,
    isLoaded,
    ajouterAuPanier,
    retirerDuPanier,
    modifierQuantite,
    viderPanier,
    totalPanier: totalPanier.toFixed(2),
    nombreArticles,
    userCurrency: 'MAD',
    convertPrice: (price) => parseFloat(price) || 0
  };
}
