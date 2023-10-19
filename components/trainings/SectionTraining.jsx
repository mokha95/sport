import { articleService } from "services";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "styles/article.module.css";

export { SectionTraining };

function SectionTraining() {
  const [trainings, setTrainings] = useState(null);
  useEffect(() => {
    articleService.getAll().then((x) => setTrainings(x));
  }, []);

  return (
    <>
      <article>
        <div className={styles.actu}>
          <h2 className="text-center">ACTUALITÉS MPOWER GYM</h2>

          <p className="mt-3 text-center">DÉCOUVREZ NOS DERNIERS ARTICLES</p>
          <div className={styles.trait}></div>
        </div>
        <div className="container mt-5   ">
          <div className="row ">
            {articles &&
              articles.map((article) => (
                <div className="cardTarifs col-lg-4" key={article.id}>
                  <div className="typeAbonnement p-3">
                    <p className="m-0">{article.title}</p>
                  </div>
                  <div className="prixAbonnement pt-4">
                    <p className="fw-bold">
                      <span className="prix"> {article.price}€ </span> /4
                      semaines*
                    </p>
                  </div>
                  <div>
                    <p>
                      Les 4 premières semaines à{" "}
                      <span className="prixCarte">
                        {article.price - 10.99}€
                      </span>{" "}
                    </p>
                  </div>
                  <div>
                    <p>Frais d&apos;adhésion de 25€</p>

                    <p>Plateforme tonicité et minceur</p>

                    <p>Un sac de sport offert</p>
                  </div>
                  {user ? (
                    <button className="btnGlobal mt-2">S&apos;abonner</button>
                  ) : (
                    <button className="btnGlobal mt-2">S&apos;inscrire</button>
                  )}
                </div>
              ))}
          </div>
        </div>
      </article>
    </>
  );
}
