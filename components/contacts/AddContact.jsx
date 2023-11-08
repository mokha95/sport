import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { contactService, alertService } from "services";
// composant AddEdit est utilisé à la fois pour ajouter et modifier des utilisateurs, il contient un formulaire construit avec la bibliothèque React Hook Form et est utilisé par la page d'ajout d'utilisateur et la page de modification d'utilisateur .

export { AddContact };

function AddContact() {
  const router = useRouter();

  // Les règles de validation de formulaire sont définies avec la bibliothèque de validation de schéma Yup et transmises avec la fonction formOptionsReact Hook Form useForm()
  // regex modele de text utiiliser pour valider rechercher ou manipuler des chaînes de caractères
  // regex pour firstname autorise que lettre minuscule et majuscule et les espaces
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(
        /^[A-Za-z\s]+$/,
        "Le prenom doit contenir uniquement des lettres et des espaces "
      )
      .required("Le prenom est requis"),
    lastName: Yup.string()
      .matches(
        /^[A-Za-z\s]+$/,
        "Un nom doit contenir uniquement des lettres et des espaces"
      )
      .required("Un nom est requis"),
    numero: Yup.string()
      // regex pour firstname autorise que les numero de 10 chiffres
      .matches(
        /^[0-9]{10}$/,
        "Le numéro de téléphone doit contenir 10 chiffres"
      )
      .required("Une numero est requise"),
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        "Adresse e-mail non valide "
      )
      .required("Email est requis"),
    message: Yup.string().required("Un contenu est requis"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  //
  // La useForm()fonction hook renvoie un objet avec des méthodes pour travailler avec un formulaire, notamment l'enregistrement des entrées, la gestion de la soumission du formulaire, la réinitialisation du formulaire, l'accès à l'état du formulaire, l'affichage des erreurs et plus encore
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // La onSubmitfonction est appelée lorsque le formulaire est soumis et valide, et crée ou met à jour un utilisateur en fonction du mode dans lequel il se trouve.

  async function onSubmit(data) {
    alertService.clear();
    try {
      // create or update contact based on contact prop
      let message;

      await contactService.register(data);
      message = "contact ajouté";

      // quand l'admin ajoute un contact il revient sur le dashboard des contact
      router.push("/");
      alertService.success(message, true);
    } catch (error) {
      alertService.error(error);
      console.error(error);
    }
  }

  // errors est utilisé pour capturer les erreurs de validation des champs du formulaire et permet d'afficher des messages d'erreur personnalisés à l'utilisateur lorsque des données invalides sont soumises.
  // register est une fonction utilisée pour connecter les champs du formulaire HTML à React Hook Form, ce qui permet une gestion simplifiée des valeurs, de la validation et de la soumission du formulaire.
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">Prenom </label>
          <input
            name="firstName"
            type="text"
            {...register("firstName")}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </div>
        <div className="mb-3 col">
          <label className="form-label">Nom</label>
          <input
            name="lastName"
            type="text"
            {...register("lastName")}
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.lastName?.message}</div>
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="text"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="mb-3 col">
          <label className="form-label">Numero</label>
          <input
            name="numero"
            type="text"
            {...register("numero")}
            className={`form-control ${errors.numero ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.numero?.message}</div>
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            type="text"
            {...register("message")}
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
          ></textarea>
          <div className="invalid-feedback">{errors.message?.message}</div>
        </div>
      </div>
      <div className="mb-3">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btnInscription me-2"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm me-1"></span>
          )}
          Envoyer
        </button>
        {/* au clic reinitialise les valeur du champs */}
        <button
          onClick={() => reset(formOptions.defaultValues)}
          type="button"
          disabled={formState.isSubmitting}
          className="btn btnReset"
        >
          Reset
        </button>
        <Link href="/" className="btn btn-link">
          Annuler
        </Link>
      </div>
    </form>
  );
}
