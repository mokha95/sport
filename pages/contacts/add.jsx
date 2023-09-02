import { Layout, AddEditContact } from 'components/contacts';

export default Add;

function Add() {
    return (
        <Layout>
            <h1>Ajouter un contact</h1>
            <AddEditContact />
        </Layout>
    );
}