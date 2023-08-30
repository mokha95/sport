import React from "react";

const abonnement = () => {
  return (
    <>
      <div className="container  pageAbonnement">
        {" "}
        <h1 className="titreAbonnement text-center">
          {" "}
          TROUVE FACILEMENT L&apos;ABONNEMENT QUI TE CONVIENT.
        </h1>
        <p className="txtAbonnement text-center pt-4">
          En devenant membre de Mpower Gym, vous bénéficiez d&apos;un accès illimité
          à nos installations modernes et ultramodernes. Des équipements dernier
          cri aux espaces d&apos;entraînement spécialement conçus, notre salle de
          sport offre tout ce dont vous avez besoin pour atteindre vos objectifs
          de fitness.
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
            <img className="img-fluid " src="/img/groupe.jpg" alt="" />
          </div>
        </div>
      </div>

      {/* <div className="pb-5">
        <h2 className="text-center">
          Viens allier sport et plaisir avec la communauté
        </h2>
      </div> */}

      {/* <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <svg
              class="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#777" />
            </svg>

            <div class="container">
              <div class="carousel-caption text-start">
                <h1>Example headline.</h1>
                <p>
                  Some representative placeholder content for the first slide of
                  the carousel.
                </p>
                <p>
                  <a class="btn btn-lg btn-primary" href="#">
                    Sign up today
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <svg
              class="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#777" />
            </svg>

            <div class="container">
              <div class="carousel-caption">
                <h1>Another example headline.</h1>
                <p>
                  Some representative placeholder content for the second slide
                  of the carousel.
                </p>
                <p>
                  <a class="btn btn-lg btn-primary" href="#">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
          

            <div class="container">
              <div class="carousel-caption text-end">
                <h1>One more for good measure.</h1>
                <p>
                  Some representative placeholder content for the third slide of
                  this carousel.
                </p>
                <p>
                  <a class="btn btn-lg btn-primary" href="#">
                    Browse gallery
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div> */}
    </>
  );
};

export default abonnement;
