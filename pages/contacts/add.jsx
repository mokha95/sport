import { Layout, AddContact } from "components/contacts";

export default Add;
// page sue voit l utilisateurs avec les composant
function Add() {
  return (
    <Layout>
      <h1>Contactez Mpower Gym</h1>
      <AddContact />
    </Layout>
  );
}
