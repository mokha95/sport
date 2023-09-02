import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Spinner } from 'components';
import { Layout } from 'components/users';
import { contactService } from 'services';

export default Index;

// page pour afficher la tables contacts
function Index() {
    const [contacts, setContacts] = useState(null);
// requete pour recupere tout les contacts :useEffect permet de gerer les effets secondaire ds un composant, il recupere des données une seule fois quand le composant est monté , le composant va se recharger avec les donnees des contact mises a jour.
    useEffect(() => {
        contactService.getAll().then(x => setContacts(x));
    }, []);

    // la function deletecontact prend en parametre un id qui est l identifiant que je veux supprimer
    function deleteContact(id) {
        setContacts(contacts.map(x => {
        //   vérifie si l'identifiant id du contact correspond à l'id passé en paramètre. Si c'est le cas, elle ajoute une propriété isDeleting à cet objet contact et la définie à true
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
    // on utilise la fonction contacService pour supprimer le contact via son id quand la suppression est reussie then execute le code a l interieur de la fonction fleché

      contactService.delete(id).then(() => {
        // À l'intérieur de la fonction .then(), la liste contacts est mise à jour à l'aide de la méthode .filter(). Cette méthode filtre les contacts en supprimant tous les objets dont l'identifiant id correspond à celui passé en paramètre
            setContacts(contacts => contacts.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Contact</h1>
            <Link href="/contacts/add" className="btn btn-sm btn-success mb-2">Ajouter un contact</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th style={{ width: '20%' }}>Prenom</th>
                        <th style={{ width: '20%' }}>Nom</th>
                        <th style={{ width: '20%' }}>femail</th>
                        <th style={{ width: '20%' }}>numero</th>
                        <th style={{ width: '20%' }}>message</th>
                    
                    </tr>
                </thead>
                <tbody>
                {/* verifie si la variable contact existe , ensuite la methode map eur le tableau de contact pour parcourir sur chaque element du tableau et genre un nouvel element,
                
                on utilise key pour que react identifie  chaque ligne de maniere unique lors de la mise a jour de l interface utilisateur */}
                    {contacts && contacts.map(contact =>
                    
                        <tr key={contact.id}>
                            <td>{contact.firtsName}</td>
                          <td>{contact.lastName}</td>
                          <td>{contact.email}</td>
                          <td>{contact.numero}</td>
                          <td>{contact.message}</td>
                        
                         
                           {/* modifie le contact est redirige vers la page contact */}
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/contacts/edit/${contact.id}`} className="btn btn-sm btn-primary me-1">Modifier</Link>
                                <button onClick={() => deleteContact(contact.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={contact.isDeleting}>
                                    {contact.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Effacer</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {/* si contact n exite pas affiche le spinner */}
                    {!contacts &&
                       ( <tr>
                       <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>)
                    }

                    {/* si contact  exite et la longeur n exite pas alors n affiche pas les heures */}
                    {contacts && !contacts.length &&
                        (<tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Pas de contacts à afficher</div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </Layout>
    );
}