import { apiHandler, articlesRepo } from "helpers/api";
// various.js utilise articleRepo pour repondre au requete GET et renvoyer les 3 articles les plus recents.article.repo contient les fonctions pour interagir avec la base d edonnee et effectuer des operation crud sur les articles
export default apiHandler({
  get: getVarious,
});

async function getVarious(req, res) {
  const articles = await articlesRepo.getVarious();
  return res.status(200).json(articles);
}
