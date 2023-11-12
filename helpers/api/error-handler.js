export { errorHandler };

//  fonction de gestion des erreurs qui aide à rendre les réponses HTTP appropriées en fonction du type d'erreur rencontrée, notamment les erreurs 404 et les erreurs d'authentification JWT, tout en renvoyant un code de statut 500 pour toutes les autres erreurs.
function errorHandler(err, res) {
  if (typeof err === "string") {
    // Vérifier si la chaîne d'erreur se termine par ", page introuvable", ce qui pourrait indiquer une erreur 404 (page non trouvée)
    const is404 = err.toLowerCase().endsWith(", page introuvable");
    // Déterminer le code de statut en fonction de l'erreur (404 ou 400)
    const statusCode = is404 ? 404 : 400;
    // Renvoyer la réponse JSON avec le message d'erreur approprié et le code de statut
    return res.status(statusCode).json({ message: err });
  }

  // Si l'erreur est une erreur d'authentification JWT
  if (err.name === "UnauthorizedError") {
    // Renvoyer une réponse JSON avec un message d'erreur approprié et le code de statut 401 (non autorisé)
    return res.status(401).json({ message: "Token Invalide" });
  }

  // Si l'erreur n'est ni une chaîne ni une erreur d'authentification JWT, traiter comme une erreur du serveur
  console.error(err);
  // Renvoyer une réponse JSON avec un message d'erreur générique et le code de statut 500 (erreur interne du serveur)
  return res.status(500).json({ message: err.message });
}
