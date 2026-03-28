// src/hooks/useCurrencyConverter.js
// Version Maroc - devise fixe MAD, pas de conversion nécessaire
export function useCurrencyConverter() {
  const convertPrice = (price) => parseFloat(price) || 0;
  return { userCurrency: 'MAD', convertPrice };
}
