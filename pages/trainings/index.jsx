import Link from "next/link";
import { useState, useEffect } from "react";

import { Spinner } from "components";
import { Layout } from "components/users";
import { trainingService } from "services";

export default Index;

// page pour afficher la tables trainings
function Index() {
  const [trainings, setTrainings] = useState(null);
  // recupere tout les trainings
  useEffect(() => {
    trainingService.getAll().then((x) => setTrainings(x));
  }, []);

  function deleteTraining(id) {
    setTrainings(
      trainings.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    trainingService.delete(id).then(() => {
      setTrainings((trainings) => trainings.filter((x) => x.id !== id));
    });
  }

  return (
    <Layout>
      <h1>Entrainement</h1>
      <Link href="/trainings/add" className="btn btn-sm btn-success mb-2">
        Ajouter un entrainement
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Nom</th>
            <th style={{ width: "40%" }}>prix</th>
            <th style={{ width: "20%" }}></th>
          </tr>
        </thead>
        <tbody>
          {trainings &&
            trainings.map((training) => (
              <tr key={training.id}>
                <td>{training.id}</td>
                <td>{training.name}</td>
                <td>{training.price}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href={`/trainings/edit/${training.id}`}
                    className="btn btn-sm btn-primary me-1"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => deleteTraining(training.id)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    style={{ width: "60px" }}
                    disabled={training.isDeleting}
                  >
                    {training.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Effacer</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {/* si training n existe pas affiche le spinner */}
          {!trainings && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}

          {/* si training  exite et la longeur n exite pas alors n affiche pas les heures */}
          {trainings && !trainings.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">Pas d&apos;entrainement à afficher</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
