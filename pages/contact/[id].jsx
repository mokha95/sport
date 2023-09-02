import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEditContact } from 'components/horaires';
import { Spinner } from 'components';
import { contactService, alertService } from 'services';

export default Edit;

// page pour modifier un contact
function Edit() {
    const router = useRouter();
    const [contact, setContact] = useState(null);

    // recupere l id dans le query du chemin
    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch contact and set default form values if in edit mode
        contactService.getById(id)
            .then(x => setHoraire(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h1>Modifier Horaire</h1>
            {/* si l contact existe ajoute l'contact sinon affiche le spinner */}
            {contact ? <AddEditContact contact={contact} /> : <Spinner />}
        </Layout>
    );
}