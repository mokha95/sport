import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
import { alertService } from './alert.service';

// accés a l'api (gestion des utilisateurs)
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
// si la fenetre est ouverte cest que  l utilisateur est à l interieur
const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
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

    
// publier l'utilisateur auprès des abonnés et le stocker dans le stockage local pour rester connecté entre les actualisations de la page
    userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
}

// quand l'utilisateur se deconnecte il le renvoie a la page d'accueil
function logout() {
    alertService.clear();
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/');
}

async function register(user) {
    await fetchWrapper.post(`${baseUrl}/register`, user);
}

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}
// selectionne l 'utilisateur par son id
async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);

    // update stored user if the logged in user updated their own record
    if (id === userSubject.value.id) {
        // copie les valeurs et les parametre et on modifie l'user dans le localstorage pour lui passer les nouvelles valeur
        const user = { ...userSubject.value, ...params };
        localStorage.setItem('user', JSON.stringify(user));

        // publish updated user to subscribers
        userSubject.next(user);
    }
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);

    // auto logout if the logged in user deleted their own record
    if (id === userSubject.value.id) {
        logout();
    }
}