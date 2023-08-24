import React from "react";
import styles from "styles/section.module.css";
import Link from "next/link";

const Section = () => {
  return (
    <section>
      <div className="container p-5 d-flex align-items-center">
        <div className="row">
          <div className="col-lg-6">
            <div className="imgGauche">
              <img
                className="img-fluid sportifEntrainement"
                src="/img/perso-focus.jpg"
                alt="sportif qui s'entraine"
              />
            </div>
          </div>

          {/* partie droite */}
          <div className="col-lg-6 ">
            <div className="ptexte p-5">
              <h2>
                Mpower gym <br /> Club de Sport
              </h2>

              <div className="texteDroite mt-4">
                <p>
                  {" "}
                  <span className={styles.texteGras}>
                    {" "}
                    Que vous soyez un débutant{" "}
                  </span>
                  cherchant à prendre un nouveau départ ou un athlète chevronné
                  en quête de défis, Mpower Gym vous offre un terrain
                  d&apos;entraînement sans limites. Notre équipe d&apos;experts passionnés
                  est là pour vous guider, vous soutenir et vous encourager à
                  chaque étape de votre parcours.
                </p>

                <p>
                  Dans notre salle de sport, nous ne vendons pas seulement des
                  adhésions, nous offrons un voyage vers une meilleure version
                  de vous-même. Chaque goutte de sueur, chaque série d&apos;exercices
                  et chaque effort que vous investissez vous rapprochent de vos
                  rêves les plus audacieux.
                </p>
              </div>

              <div className="btn2 ">
                <Link href="/">
                  {" "}
                  <button className="btnGlobal mt-2">
                    RÉSERVE TA SÉANCE D&apos;ESSAI
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
