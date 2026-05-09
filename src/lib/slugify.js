// src/lib/slugify.js
// Genere un slug URL-friendly depuis un nom de structure
// IMPORTANT: utilise charCodeAt pour eviter les problemes d'encodage Unicode dans les regex

function removeCombiningMarks(str) {
  // Apres normalize('NFD'), les accents deviennent des "combining marks"
  // dans la plage U+0300 a U+036F. On les retire ici.
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code < 0x0300 || code > 0x036f) {
      result += str[i];
    }
  }
  return result;
}

export function generateSlug(nom) {
  if (!nom) return '';
  let s = nom.toString().toLowerCase();

  // Decompose les caracteres accentues (e + accent grave) puis retire les accents
  s = s.normalize('NFD');
  s = removeCombiningMarks(s);

  // Caracteres speciaux non couverts par NFD
  s = s
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/ð/g, 'd')
    .replace(/þ/g, 'th')
    .replace(/ß/g, 'ss');

  // Tout ce qui n'est pas alphanumerique devient un tiret
  s = s.replace(/[^a-z0-9]+/g, '-');

  // Supprime les tirets en debut/fin
  s = s.replace(/^-+|-+$/g, '');

  // Limite a 100 caracteres
  return s.slice(0, 100);
}
