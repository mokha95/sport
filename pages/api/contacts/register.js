import { apiHandler, ContactsRepo } from "helpers/api"; 

// methode pour enregistrer les contacts
export default apiHandler({ 
  post: register, 
}); 
 
async function register(req, res) { 
  await ContactsRepo.create(req.body); 
  return res.status(200).json({}); 
} 