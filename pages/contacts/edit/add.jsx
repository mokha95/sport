import { Layout, AddEditContact } from 'components/articles';

export default Add;

function Add() {
    return (
        <Layout>
            <h1>Ajouter un Contact</h1>
            <AddEditContact />
        </Layout>
    );
}