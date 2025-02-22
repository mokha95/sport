import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import isEmailValidator from "validator/lib/isEmail";
import { Layout } from "components/account";
import { userService, alertService } from "services";

export default Register;

function Register() {
  const router = useRouter();

  // Définition des règles de validation du formulaire avec Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Le prénom est requis"),
    lastName: Yup.string().required("Le nom est requis"),
    email: Yup.string()
      .email("Le format est incorrect")
      .required("Email est requis")
      .test("is-valid", "L'email est incorrect", (value) =>
        isEmailValidator(value)
      ),
    // le mot de passe doit contenir une majuscule un chiffre et un caractere special
    password: Yup.string()
      .required("Le mot de passe est requis")
      .min(12, "Le mot de passe doit contenir au moins 12 caractères")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/,
        "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial"
      ),
  });
  // Configuration du formulaire avec Yup Resolver resolver permet de connecter le shema yup au formulaire
  const formOptions = { resolver: yupResolver(validationSchema) };

  // // Obtention des fonctions pour construire le formulaire avec le hook useForm
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  // Fonction appelée lors de la soumission du formulaire
  function onSubmit(user) {
    // Appelle le service d'inscription de l'utilisateur
    return userService
      .register(user)
      .then(() => {
        // Affiche un message de succès
        alertService.success("Inscription reussie", true);
        // Redirige vers la page de connexion
        router.push("login");
      })
      .catch(alertService.error);
  }

  // Affichage du composant
  return (
    <Layout>
      <div className="card mb-5">
        <h4 className="card-header">Inscription</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Prenom</label>
              <input
                name="firstName"
                type="text"
                {...register("firstName")}
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.firstName?.message}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Nom</label>
              <input
                name="lastName"
                type="text"
                {...register("lastName")}
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.lastName?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="text"
                {...register("email")}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button
              disabled={formState.isSubmitting}
              className="btn btnInscription"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
              Inscription
            </button>
            <Link href="/account/login" className="btn btn-link">
              Annuler
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
}
