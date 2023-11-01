import { db, errorHandler, jwtMiddleware } from "helpers/api";

export { apiHandler };

// sert de couche intermédiaire pour gérer les requêtes API de manière centralisée, en vérifiant la méthode HTTP, en initialisant la base de données si nécessaire, en gérant les JWT et en gérant les erreurs globalement. Il facilite la gestion des API
function apiHandler(handler) {
  return async (req, res) => {
    // convertit la methode http en minuscule
    const method = req.method.toLowerCase();

    // verifie si la methode http de la requete est supportée par le gestionnaire (handler). Si elle ne l'est pas, la fonction renvoie une réponse avec le code d'état 405 (Méthode non autorisée) et un message indiquant la méthode non autorisée.
    if (!handler[method])
      return res.status(405).end(`Méthode ${req.method} non autorisée`);

    try {
      // verifie si la db est initialisé , si elle ne l est pas elle l'initialise
      if (!db.initialized) await db.initialize();

      // fonction jwt middlewaare global pour la gestion de jwt
      await jwtMiddleware(req, res);

      // gestionnaire (handler) en fonction de la méthode HTTP de la requête. Cela exécute le gestionnaire de route.
      await handler[method](req, res);
    } catch (err) {
      // en cas d'erreur lors de l'exécution du gestionnaire, la fonction de gestion des erreurs (errorHandler) est appelée pour gérer l'erreur de manière globale
      // prend l'erreur et l'objet de réponse (res) en paramètres.
      errorHandler(err, res);
    }
  };
}
