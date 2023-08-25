
import getConfig from 'next/config';


import { fetchWrapper } from 'helpers';

// methode fetch pour le crud  des evenement
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/events`;


export const eventService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};



async function register(event) {
    await fetchWrapper.post(`${baseUrl}/register`, event);
}

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}

async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);

    
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);

 
}