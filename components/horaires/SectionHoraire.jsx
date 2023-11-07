// fichier qui sert a ajouté les horaires dans le footer

import { horaireService } from "services";
import { useState, useEffect } from "react";

export { SectionHoraire };

// demande a l api a travers horaire service d envoyer la liste des horaires
// utilisation de usestate() initialisé à null
// useEffect() definit un effet qui est éxécuté 1[] fois que le composant est monté
// horaireService.getAll() horaireService expose une méthode getAll qui  effectue une requête vers l'API
// a fonction .then() est appelée met à jour l'état horaires en utilisant setHoraires(x). x représente les données d'horaires qui ont été renvoyées par le service.
function SectionHoraire() {
  const [horaires, setHoraires] = useState(null);
  useEffect(() => {
    horaireService.getAll().then((x) => setHoraires(x));
  }, []);

  // affiche  dynamiquement les horaires
  return (
    <>
      <section>
        <div className="container mt-2">
          <ul className="list-unstyled smaller">
            {horaires &&
              horaires.map((horaire) => (
                <li key={horaire.id}>
                  <span className="fw-bold">{horaire.jour} :</span>
                  <span>
                    {/* fermeture_matin" est vrai, elle affiche "Fermé". Sinon, elle affiche les horaires d'ouverture du matin au format "début_matin fin_matin" suivis d'un tiret  */}
                    {horaire.fermeture_matin
                      ? "Fermé"
                      : ` ${horaire.debut_matin}  ${horaire.fin_matin}`}
                    -{" "}
                  </span>
                  <span>
                    {horaire.fermeture_apresmidi
                      ? "Fermé"
                      : ` ${horaire.debut_apresmidi}  ${horaire.fin_apresmidi}`}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
