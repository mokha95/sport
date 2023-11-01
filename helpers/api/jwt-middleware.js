import { expressjwt } from "express-jwt";
import util from "util";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

// un middleware de gestion des jetons JWT utilisé  pour vérifier l'authenticité des utilisateurs lors de l'accès à certaines routes protégées par JWT. Il permet de protéger les routes nécessitant une authentification tout en excluant certaines routes publiques de cette vérification.
export { jwtMiddleware };
// construction d'un token avec la clé secrete
function jwtMiddleware(req, res) {
  const middleware = expressjwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ["HS256"],
  }).unless({
    // routes publiques qui ne nécessitent pas d'authentification
    path: [
      "/api/contacts/register",
      "/api/horaires",
      "/api/events/various",
      "/api/articles/various",
      "/api/users/register",
      "/api/users/authenticate",
      "/api/trainings",
    ],
  });

  return util.promisify(middleware)(req, res);
}
