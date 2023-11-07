import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

// gerer les telechargement d'iamage
// formidable permet de faciliter la manip de formulaire et gérer le telechargement des fichiers
// Importe le module "fs/promises" pour effectuer des opérations asynchrones sur le système de fichiers.
// Configuration de l'API
export const config = {
  api: {
    bodyParser: false, // Le corps de la demande HTTP ne doit pas être analysé automatiquement
  },
};

// Définition de la fonction "readFile"
const readFile = (req, saveLocally) => {
  const options = {};
  console.log(path);
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/img"); // Répertoire de destination pour enregistrer les fichiers
    options.keepExtensions = true; // Conserver les extensions des fichiers
    options.filename = (name, ext, path, form) => {
      return `${name}${ext}`; // Définir un nom de fichier personnalisé
    };
  }
  // Taille maximale des fichiers autorisée
  options.maxFileSize = 4000 * 1024 * 1024; // Taille maximale des fichiers autorisée
  const form = formidable(options); // Crée une instance du module "formidable" avec les options définies
  form.keepExtensions = true; // Conserver les extensions des fichiers
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err); // Gestion des erreurs en cas d'échec de l'analyse du formulai
      resolve({ fields, files }); // Résout la promesse avec les champs et les fichiers
    });
  });
};

// Gestionnaire de route pour le téléchargement de fichiers
const handler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/img")); // Vérifie l'existence du répertoire de destination
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/img"));
  }
  await readFile(req, true); // Appelle la fonction "readFile" pour gérer le téléchargement des fichiers
  res.json({ done: "ok" }); // Répond avec un objet JSON pour indiquer le succès du téléchargement
};

export default handler; // Exporte le gestionnaire de route
