import { apiHandler, equipmentsRepo } from "helpers/api";
// Un gestionnaire de route API dynamique qui gère les requêtes HTTP avec n'importe quelle valeur comme [id]paramètre (c'est-à-dire /api/users/*). Le paramètre user idest attaché par Next.js à l' req.queryobjet qui est accessible au gestionnaire de route.

// Le gestionnaire de route prend en charge HTTP GETet PUTdemande DELETEen passant un objet avec ces noms de méthode (en minuscules) à apiHandler() qui les mappe aux fonctions getById(), update()et _delete().
//  utilise les methodes qui sont dans le repo
export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const equipment = await equipmentsRepo.getById(req.query.id);

  if (!equipment) throw "eequipment non existant";

  return res.status(200).json(equipment);
}

async function update(req, res) {
  await equipmentsRepo.update(req.query.id, req.body);
  return res.status(200).json({});
}

async function _delete(req, res) {
  await equipmentsRepo.delete(req.query.id);
  return res.status(200).json({});
}
