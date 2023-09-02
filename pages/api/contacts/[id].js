import { apiHandler, contactsRepo } from "helpers/api"; 
//  utilise les methodes qui sont dans le repo
export default apiHandler({ 
  get: getById, 
  put: update, 
  delete: _delete, 
}); 
 
async function getById(req, res) { 
  const contact = await contactsRepo.getById(req.query.id); 
 
  if (!contact) throw "contact non existant"; 
 
  return res.status(200).json(contact); 
} 
 
async function update(req, res) { 
  await contactsRepo.update(req.query.id, req.body); 
  return res.status(200).json({}); 
} 
 
async function _delete(req, res) { 
  await contactsRepo.delete(req.query.id); 
  return res.status(200).json({}); 
}