import { useState, useEffect } from "react";
import { userService, alertService } from "services";
import { useRouter } from "next/router";
import Link from "next/link";

const ConditionalButton = ({ props }) => {
  const router = useRouter();

  // user est initialisé avec la valeur de la propriété user passée en tant que prop.
  const user = props.user;
  const trainingId = props.trainingId;

  function onSuscribe(trainingId) {
    // met à jour la propriété trainingId de l'objet user avec la valeur de trainingId.
    user.trainingId = trainingId;
    // met a jour l utilisateur en utilisant son id
    return userService
      .update(user.id, user)
      .then(() => {
        // si la mise a jour reussi , elle affiche un message de succes et redirige vers la page abonnement
        alertService.success("Inscription reussie", true);
        router.push("abonnement");
      })
      .catch(alertService.error);
  }

  // si ce nest pas l utilisateur on le renvoie a la page d inscription
  if (!user) {
    return (
      <Link href={`/account/register`} className="btnGlobal mt-2">
        S&apos;inscrire
      </Link>
    );
  }
  // User est connecte et on userid est null renvoie a l'abonnement
  if (user && user.trainingId === null) {
    return (
      <button className="btnGlobal mt-2" onClick={() => onSuscribe(trainingId)}>
        S&apos;abonner
      </button>
    );
  }
  // si user et userId est different de null et et si  trainingId de l'objet user est strictement égale à la valeur de trainingId. Cela signifie que l'utilisateur est abonné à la formation spécifique associée à trainingId.
  if (user && user.trainingId !== null && user.trainingId === trainingId) {
    return <button className="btnGlobal mt-2">Vous êtes abonné</button>;
  }
};

export default ConditionalButton;
