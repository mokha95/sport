import Link from "next/link";


export default Index;
// composant pour la page admin
function Index() {
  return (
    <div className="p-4">
      <div className="container">
        <p>Tableau de Bord</p>
        <p>
          <Link href="/users">Gérer les  utilisateurs</Link>
        </p>
        <p>
          <Link href="/articles">Gérer les Articles</Link>
        </p>
        <p>
          <Link href="/events">Gérer les evenements</Link>
        </p>
        <p>
          <Link href="/horaires">Gérer les horaires</Link>
        </p>
      </div>
    </div>
  );
}