import { db } from "helpers/api";
// expose un objet trainingsRepo qui offre des méthodes pour interagir avec la base de données, en utilisant Sequelize pour effectuer des opérations CRUD sur l'entité "training".
export const trainingsRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

// requete avec des methode sequelize sur le model training
// onction asynchrone getAll qui utilise Sequelize pour récupérer tous les etrainings en appelant db.Space.findAll().
async function getAll() {
  return await db.Space.findAll();
}
// fonction asynchrone getById qui utilise Sequelize pour récupérer un etraining par son identifiant en appelant db.Space.findByPk(id).
async function getById(id) {
  return await db.Space.findByPk(id);
}

async function create(params) {
  const Space = new db.Space(params);
  // save training
  await Space.save();
}

async function update(id, params) {
  const training = await db.Space.findByPk(id);

  // validate
  if (!training) throw "L Entrainement n&apos;existe pas";

  // copy params properties to user
  Object.assign(training, params);

  await training.save();
}

async function _delete(id) {
  const training = await db.Space.findByPk(id);
  if (!training) throw "L Entrainement n&apos;existe pas";

  // supprime l evenement
  await training.destroy();
}
