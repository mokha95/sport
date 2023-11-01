import { apiHandler, horairesRepo } from "helpers/api";

// methode pour enregistrer les horaires
// gere les requêtes API pour pour enregistrer les horaires cote serveur
export default apiHandler({
  post: register,
});

// enregistre un horaire ds la base de donnee grace a horairesRepo et la methode create
async function register(req, res) {
  await horairesRepo.create(req.body);
  return res.status(200).json({});
}
