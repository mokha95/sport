import { useState, useEffect } from "react";
import { userService } from "services";

const Abonnement = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // verifier si il est inscrit
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);
  return (
    <>
      <div className="container  pageAbonnement">
        {" "}
        <h1 className="titreAbonnement text-center">
          {" "}
          TROUVE FACILEMENT L&apos;ABONNEMENT QUI TE CONVIENT.
        </h1>
        <p className="txtAbonnement text-center pt-4">
          En devenant membre de Mpower Gym, vous bénéficiez d&apos;un accès
          illimité à nos installations modernes et ultramodernes. Des
          équipements dernier cri aux espaces d&apos;entraînement spécialement
          conçus, notre salle de sport offre tout ce dont vous avez besoin pour
          atteindre vos objectifs de fitness.
        </p>
        <h2 className="pt-5 text-center">NOS OFFRES AVEC ENGAGEMENT</h2>
      </div>

      <div className="cardAbonnement container  ">
        <div className=" carteAbonnement d-flex text-center  justify-content-center ">
          <div className="cardTarifs col-lg-4    ">
            <div className="typeAbonnement p-3">
              <p className="m-0">Classic</p>
            </div>
            <div className="prixAbonnement pt-4">
              <p className="fw-bold">
                <span className="prix"> 29.99€ </span> /4 semaines*
              </p>
            </div>
            <div>
              <p>
                Les 4 premières semaines à{" "}
                <span className="prixCarte">19€</span>{" "}
              </p>
            </div>
            <div>
              <p>Frais d&apos;adhésion de 25€</p>

              <p>Plateforme tonicité et minceur</p>

              <p>Un sac de sport offert</p>
            </div>
            {user ? (
              <button>S&apos;abonner</button>
            ) : (
              <button>S&apos;inscrire</button>
            )}
          </div>
          {/*  */}
          <div className="cardTarifs col-lg-4   ">
            <div className="typeAbonnement p-3 ">
              <p className="m-0">essentiel </p>
            </div>
            <div className="prixAbonnement pt-4">
              <p className="fw-bold">
                <span className="prix"> 35.99€ </span> /4 semaines*
              </p>
            </div>
            <div>
              <p>
                Les 4 premières semaines à{" "}
                <span className="prixCarte">19€</span>{" "}
              </p>
            </div>
            <div>
              <p>Frais d&apos;adhésion de 25€</p>

              <p>Plateforme tonicité et minceur</p>

              <p>Suivi des Progrès</p>

              <p>Balance d&apos;analyse corporelle</p>

              <p>Un sac de sport offert</p>
            </div>
          </div>

          <div className="cardTarifs col-lg-4   ">
            <div className="typeAbonnement p-3">
              <p className="m-0">Premium </p>
            </div>
            <div className="prixAbonnement pt-4">
              <p className="fw-bold">
                <span className="prix"> 40.99€ </span> /4 semaines*
              </p>
            </div>
            <div>
              <p>
                Les 4 premières semaines à{" "}
                <span className="prixCarte">19€</span>{" "}
              </p>
            </div>
            <div>
              <p>Frais d&apos;adhésion de 25€</p>

              <p>Plateforme tonicité et minceur</p>
              <p>Balance d&apos;analyse corporelle</p>
              <p>Coaching en ligne</p>
              <p>Entraînement avec un invité</p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        <h2 className="text-center pb-3">
          {" "}
          FAÇONNE TES ENTRAÎNEMENTS SELON TES ENVIES.
        </h2>
        <div className="trait"></div>
        <p className=" text-center pt-4 pb-4">
          En tant que membre, vous avez accès à des experts en fitness et en
          nutrition qui sont déterminés à vous aider à réussir. Bénéficiez de
          séances d&apos;entraînement personnalisées, de conseils nutritionnels
          avisés et de suivis réguliers pour maximiser vos résultats.
        </p>
        {/* img */}
        <div className="container d-flex justify-content-center">
          <div className="imgGroupe w-75   ">
            <img className="img-fluid " src="/img/article1.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Abonnement;
