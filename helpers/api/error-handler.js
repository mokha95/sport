export { errorHandler };

//  fonction de gestion des erreurs qui aide à rendre les réponses HTTP appropriées en fonction du type d'erreur rencontrée, notamment les erreurs 404 et les erreurs d'authentification JWT, tout en renvoyant un code de statut 500 pour toutes les autres erreurs.
function errorHandler(err, res) {
  if (typeof err === "string") {
    const is404 = err.toLowerCase().endsWith(", page introuvable");
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt erreur d'authentification
    return res.status(401).json({ message: "Token Invalide" });
  }

  // default erreur 500 serveur
  console.error(err);
  return res.status(500).json({ message: err.message });
}
