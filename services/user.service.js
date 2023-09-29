import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
import { alertService } from './alert.service';

// fetchWrapper effectuer des requêtes HTTP
// accés a l'api (gestion des utilisateurs)
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
// stocke l etat de l utilisateur si la fenetre est ouverte cest que  l utilisateur est à l interieur
const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')));


export const userService = {
    //  propriété d'accès pour obtenir la valeur actuelle de l'utilisateur.
    user: userSubject.asObservable(),
    // methode pour interagir avec l api
    get userValue() { return userSubject.value },
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

// (utilisateur enregistrer dans le localstorage)
async function login(email, password) {
    const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { email, password });

    
// met à jour le sujet observable userSubject avec les informations de l'utilisateur et stocke l'utilisateur dans le localStorage
    userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
}

// quand l'utilisateur se deconnecte il le renvoie a la page d'accueil
function logout() {
    // methode qui efface les alerte
    alertService.clear();
    // retire l'utilisateur du stockage local, publie une valeur null et redirige vers la page de connexion
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/');
}

async function register(user) {
    // requete post pour enregistrer un utilisateur
    await fetchWrapper.post(`${baseUrl}/register`, user);
}

// requête GET pour obtenir tous les utilisateurs
async function getAll() {
    return await fetchWrapper.get(baseUrl);
}
// selectionne l 'utilisateur par son id
async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
    // mettre à jour les informations de l'utilisateur avec les nouveaux paramètres fournis
    await fetchWrapper.put(`${baseUrl}/${id}`, params);

    // 
    if (id === userSubject.value.id) {
        // copie les valeurs et les parametre et on modifie l'user dans le localstorage pour lui passer les nouvelles valeur
        const user = { ...userSubject.value, ...params };
        localStorage.setItem('user', JSON.stringify(user));

        // publish updated user to subscribers
        userSubject.next(user);
    }
}

// requete qui supprime l utilisateur par son id
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);

    // Si l'utilisateur supprimé est l'utilisateur actuellement connecté, elle effectue également une déconnexion automatique.
    if (id === userSubject.value.id) {
        logout();
    }
}