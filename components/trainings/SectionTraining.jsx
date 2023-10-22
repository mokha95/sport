import { trainingService, userService } from "services";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "styles/article.module.css";

export { SectionTraining };

function SectionTraining() {
  const [trainings, setTrainings] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    trainingService.getAll().then((x) => setTrainings(x));
    // verifier si il est inscrit
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <article>
        <div className={styles.actu}>
          <h2 className="text-center">ACTUALITÉS MPOWER GYM</h2>

          <p className="mt-3 text-center">DÉCOUVREZ NOS DERNIERS ARTICLES</p>
          <div className={styles.trait}></div>
        </div>
        {/* abonnement */}
        <div className="container mt-5 ">
          <div className="row justify-content-center gap-5 carteContainerAbonnement ">
            {trainings &&
              trainings.map((training) => (
                <div
                  className="cardTarifs col-lg-4 col-md-5 col-sm-8 col-9 "
                  key={training.id}
                >
                  <div className="typeAbonnement p-3">
                    <p className="m-0">{training.title}</p>
                  </div>
                  <div className="prixAbonnement pt-4">
                    <p className="fw-bold">
                      <span className="prix"> {training.price}€ </span> /4
                      semaines*
                    </p>
                  </div>
                  <div>
                    <p>
                      Les 4 premières semaines à{" "}
                      <span className="prixCarte">
                        {training.price - 10.99}€
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
