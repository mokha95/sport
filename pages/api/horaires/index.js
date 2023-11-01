import { apiHandler, horairesRepo } from "helpers/api";

// utilise la methode getAll() pour recuperer les horaires
export default apiHandler({
  get: getAll,
});
// recupere les horaires dans la base de donnee
async function getAll(req, res) {
  const horaires = await horairesRepo.getAll();
  // une fois les horaires recuperé reponse  code 200 envoyé
  return res.status(200).json(horaires);
}
