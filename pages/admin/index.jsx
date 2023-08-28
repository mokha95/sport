import Link from "next/link";


export default Index;

function Index() {
  return (
    <div className="p-4">
      <div className="container">
        <p>You&apos;re logged in with Next.js & JWT!!</p>
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