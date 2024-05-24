// Utilitaire pour obtenir les types des attributs de T
type TypeDesAttributs<T> = {
  [K in keyof T]: T[K];
};

// Fonction pour afficher les types des attributs de T
export function afficherTypesDesAttributs<T extends object>(
  body: T,
  ctor: new () => T
) {
  console.log("AFFICHER TYPES DES ATTRIBUTS");

  // Instancier un nouvel objet de type T
  const bodyTypeTarget = new ctor();

  // Obtenir les clés de l'objet (y compris les symboles)
  const keys = [
    ...Object.keys(bodyTypeTarget),
    ...Object.getOwnPropertySymbols(bodyTypeTarget),
  ] as (keyof T)[];

  // Créer un objet pour stocker les types des attributs
  const types: Record<string, string> = {};

  // Parcourir les clés et obtenir les types
  keys.forEach((key) => {
    const keyAsString = String(key); // Convertir la clé en chaîne de caractères
    const valeur = body[key as keyof T];
    types[keyAsString] = typeof valeur;
    console.log(`Clé: ${keyAsString}, Type: ${typeof valeur}`);
  });

  // Retourner les types des attributs
  return types;
}
