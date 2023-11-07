import Link from "next/link";
import { useState, useEffect } from "react";

import { Spinner } from "components";
import { Layout } from "components/users";
import {
  trainingService,
  spaceService,
  equipmentService,
  userService,
} from "services";

// récupère des données d'entraînements, d'espaces, d'équipements et d'employés depuis la base de données et les affiche sous forme de tableau. Les utilisateurs peuvent ajouter, modifier ou supprimer des entraînements à l'aide des boutons correspondants.
export default Index;

// page pour afficher la tables trainings
function Index() {
  const [trainings, setTrainings] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    spaceService.getAll().then((x) => setSpaces(x));
    // recupere tout les trainings
    trainingService.getAll().then((x) => setTrainings(x));
    equipmentService.getAll().then((x) => setEquipments(x));
    userService.getAll().then((users) => {
      const filteredUsers = users.filter(
        (user) => user.roles === "EMPLOYEE" || user.roles === "ADMIN"
      );
      setEmployees(filteredUsers);
    });
  }, []);
  // supprime un entrainement par son id
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
  // recherche l'espace correspondant à l'entraînement en comparant les ID. Si un espace avec le même ID que l'ID de l'entraînement est trouvé, la fonction renvoie le nom de cet espace.
  function printSpaceName(spaces, training) {
    if (spaces.length > 0) {
      const space = spaces.find((space) => space.id === training.spaceId);
      return space.name;
    }
  }
  // recherche le nom de l'équipement correspondant à l'entraînement en utilisant l'ID de l'équipement.
  function printEquipmentName(equipments, training) {
    if (equipments.length > 0) {
      const equipment = equipments.find(
        (equipment) => equipment.id === training.equipmentId
      );

      return equipment.name;
    }
  }
  // recherche le nom de l'employé (instructeur) correspondant à l'entraînement en utilisant l'ID de l'employé.
  function printEmployeeName(employees, training) {
    if (employees.length > 0) {
      const employee = employees.find(
        (employee) => employee.id === training.employeeId
      );
      return employee.lastName;
    }
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
            <th style={{ width: "18%" }}>Titre</th>
            <th style={{ width: "18%" }}>prix</th>
            <th style={{ width: "18%" }}>Espace</th>
            <th style={{ width: "18%" }}>Equipement</th>
            <th style={{ width: "18%" }}>Instructeur</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {/* , ce code génère un tableau d'entraînements avec des détails tels que le titre, le prix, l'espace, l'équipement et l'instructeur. Il permet également de modifier ou supprimer des entraînements. */}
          {trainings &&
            trainings.map((training) => (
              <tr key={training.id}>
                <td>{training.title}</td>
                <td>{training.price}</td>
                <td>{spaces && printSpaceName(spaces, training)}</td>
                <td>
                  {equipments && printEquipmentName(equipments, training)}
                </td>
                <td>{employees && printEmployeeName(employees, training)}</td>
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
