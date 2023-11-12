//l asynchrone est que le code s execute pendant q'une ou plusieur requetes sont en cours

// L’AJAX est une technologie permettant de mettre à jour simplement des parties du DOM d'une page HTML au lieu de devoir recharger la page entière. 

// AJAX permet également d’exécuter du code de manière asynchrone, c'est-à-dire que votre code continue à s'exécuter pendant qu’une ou plusieurs requêtes sont en cours.

// fetch est une web api qui permet d envoyer des requetes http

let pathWith = path.split("/");
    if (pathWith.length > 3) {
      path = "/" + pathWith[1] + "/" + pathWith[2];
    }

    // mettre en dessous de const path dans _app (attention const path devient let path)

    // à mettre dans helpers/api/jwt-middleware dans la variable path
    { url: /^\/api\/projets\/.*/, methods: ["GET"] },

    import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import isEmailValidator from "validator/lib/isEmail";
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Register;

function Register() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Le prenom est requis'),
        lastName: Yup.string()
            .required('Le nom est requis'),
            email: Yup.string()
            .email("le format est érroné")
            .required("Email est requis")
            .test(
              "is-valid",
              (message) => `${message.path} est érroné`,
              (value) =>
                value
                  ? isEmailValidator(value)
                  : new Yup.ValidationError("Valeur erronée")
            ),
        password: Yup.string()
            .required('le mot de passe est requis')
            .min(6, 'Le mot de passe doit contenir 6 caractères')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then(() => {
                alertService.success('Inscription reussie', true);
                router.push('login');
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div className="card mb-5">
                <h4 className="card-header">Inscription</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Prenom</label>
                            <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nom</label>
                            <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btnInscription">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Inscription
                        </button>
                        <Link href="/account/login" className="btn btn-link">Annuler</Link>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

// mot de passe pour kent : Weshkent@kent10
// abonnement 
<>
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
          </>

          // AddEdditArticle 
          import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
// Axiox est utilisée pour faire des requetes http et pour interagir avec des serveurs Web et récupérer des données à partir d'URL distantes.
import axios from "axios";

import { articleService, alertService } from "services";
// composant AddEdit est utilisé à la fois pour ajouter et modifier des utilisateurs, il contient un formulaire construit avec la bibliothèque React Hook Form et est utilisé par la page d'ajout d'utilisateur et la page de modification d'utilisateur .

export { AddEditArticle };
// Déclaration de variables et de hooks
function AddEditArticle(props) {
  const article = props?.article;
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  // Gestion du téléchargement de l'image
  //  handleUpload est responsable de la préparation et de l'envoi du fichier image sélectionné vers un endpoint spécifique sur le serveur
  //  puis elle gère la réponse ou les erreurs éventuelles.
  const handleUpload = async () => {
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/fileupload", formData);
      console.log(data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // Les règles de validation de formulaire sont définies avec la bibliothèque de validation de schéma Yup et transmises avec la fonction formOptionsReact Hook Form useForm()
  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Le titre est requis"),
    content: Yup.string().required("Un contenu est requis"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // Initialisation des valeurs par défaut du formulaire en mode édition
  if (article) {
    formOptions.defaultValues = props.article;
  }

  // get functions to build form with useForm() hook
  // La useForm()fonction hook renvoie un objet avec des méthodes pour travailler avec un formulaire, notamment l'enregistrement des entrées, la gestion de la soumission du formulaire, la réinitialisation du formulaire, l'accès à l'état du formulaire, l'affichage des erreurs et plus encore
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // La onSubmitfonction est appelée lorsque le formulaire est soumis et valide, et crée ou met à jour un utilisateur en fonction du mode dans lequel il se trouve.
  async function onSubmit(data) {
    data.image = selectedFile.name;
    console.log(data);
    alertService.clear();
    try {
      // Création ou mise à jour de l'article en fonction du mode
      let message;
      if (article) {
        await articleService.update(article.id, data);
        message = "article modifié";
      } else {
        await articleService.register(data);
        message = "article ajouté";
      }

      // Redirection vers la liste des articles avec un message de succès
      router.push("/articles");
      alertService.success(message, true);
    } catch (error) {
      alertService.error(error);
      console.error(error);
    }
  }
  // Rendu du formulaire
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">Titre</label>
          <input
            name="title"
            type="text"
            {...register("title")}
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.title?.message}</div>
        </div>
        <div className="mb-3 col">
          <label className="form-label">Contenu</label>
          <textarea
            name="content"
            {...register("content")}
            className={`form-control ${errors.content ? "is-invalid" : ""}`}
          ></textarea>
          <div className="invalid-feedback">{errors.content?.message}</div>
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col">
          <div className="max-w-4xl mx-auto p-20 space-y-6">
            <label>
              <input
                type="file"
                hidden
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                    setSelectedFile(file);
                    console.log(file);
                  }
                }}
              />
              <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                {selectedImage ? (
                  <img src={selectedImage} alt="" />
                ) : (
                  <span className="btn btn-primary me-2">Choisir Image</span>
                )}
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button
          type="submit"
          disabled={formState.isSubmitting || !selectedFile}
          onClick={handleUpload}
          className="btn btn-primary me-2"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm me-1"></span>
          )}
          {!selectedFile && (
            <span className="me-1">
              Sélectionnez l&apos;image avant d&apos;
            </span>
          )}
          Enregistrer
        </button>
        <button
          onClick={() => reset(formOptions.defaultValues)}
          type="button"
          disabled={formState.isSubmitting}
          className="btn btn-secondary"
        >
          Reset
        </button>
        <Link href="/articles" className="btn btn-link">
          Annuler
        </Link>
      </div>
    </form>
  );
}

// gestionnaire d erreur 
export { errorHandler };

//  fonction de gestion des erreurs qui aide à rendre les réponses HTTP appropriées en fonction du type d'erreur rencontrée, notamment les erreurs 404 et les erreurs d'authentification JWT, tout en renvoyant un code de statut 500 pour toutes les autres erreurs.
function errorHandler(err, res) {
  // Vérifier si l'erreur est une chaîne (peut être renvoyée par certaines parties du code)
  if (typeof err === "string") {
    // Vérifier si la chaîne d'erreur se termine par ", page introuvable", ce qui pourrait indiquer une erreur 404 (page non trouvée)
    const is404 = err.toLowerCase().endsWith(", page introuvable");
    // Déterminer le code de statut en fonction de l'erreur (404 ou 400)
    const statusCode = is404 ? 404 : 400;
    // Renvoyer la réponse JSON avec le message d'erreur approprié et le code de statut
    return res.status(statusCode).json({ message: err });
  }

  // Si l'erreur est une erreur d'authentification JWT
  if (err.name === "UnauthorizedError") {
    // Renvoyer une réponse JSON avec un message d'erreur approprié et le code de statut 401 (non autorisé)
    return res.status(401).json({ message: "Token Invalide" });
  }

  // Si l'erreur n'est ni une chaîne ni une erreur d'authentification JWT, traiter comme une erreur du serveur
  // Afficher l'erreur dans la console
  console.error(err);
  // Renvoyer une réponse JSON avec un message d'erreur générique et le code de statut 500 (erreur interne du serveur)
  return res.status(500).json({ message: err.message });
}
