import Link from "next/link";


export default Index;

function Index() {
  return (
    <div className="p-4">
      <div className="container">
        <p>You&apos;re logged in with Next.js & JWT!!</p>
        <p>
          <Link href="/users">Manage Users</Link>
        </p>
        <p>
          <Link href="/articles">Manage Articles</Link>
        </p>
      </div>
    </div>
  );
}