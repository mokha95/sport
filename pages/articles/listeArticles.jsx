import { articleService } from "services";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "styles/article.module.css";
import { userService } from "services";


export default ListeArticles ;

function ListeArticles() {

  const [articles, setArticles] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    articleService.getAll().then((x) => setArticles(x));
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  return (
      <>
    { user  ? ( 
      <article className="mb-3">
        <div className={styles.actu}>
          <h2 className="text-center">ACTUALITÉS MPOWER GYM</h2>

          <p className="mt-3 text-center">DÉCOUVREZ NOS DERNIERS ARTICLES</p>
          <div className={styles.trait}></div>
        </div>
        <div className="container mt-5   ">
          <div className="row ">
            {articles &&
              articles.map((article) => (
                <div className="col-lg-4 mt-3" key={article.id}>
                  <div className={styles.txtBas}>
                  <img
                      className="img-fluid"
                      src={`/img/${article.image}`}
                      alt="repas "
                    />
                    <div className={styles.separation}></div>
                    <div className={styles.blocCard}>
                      <h4 className={styles.titreBlog}>{article.title}</h4>
                      <div className={styles.trait2}></div>
                      <Link
                        className={styles.liensArticle}
                        href={`/article/${article.id}`}
                      >
                        Lire la suite
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </article>
    ) : (
        <>
            <p>Vous devez être connecté pour accéder à nos articles</p>
        </>
    )}
    </>

  );
}