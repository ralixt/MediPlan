import { Clock, Minus, Plus, Users } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
  updateHeuresActuel,
  updateHeuresCible,
  updateNumberParcours,
  updatePersonnelActuel,
  updatePersonnelCible,
} from "@/actions/Planification";

type PlanificationParcoursProps = {
  competence: competence;
  journeeType: JourneeType;
  parcours: parcoursList;
  dataPlanif: listeUtilisationCompetence;
  setJourneeType: React.Dispatch<React.SetStateAction<JourneeType | undefined>>;
};

export default function PlanificationCompetences({
  setJourneeType,
  competence,
  journeeType,
  parcours,
  dataPlanif,
}: PlanificationParcoursProps) {
  const [maj, setMaj] = useState<boolean>(false);
  const [charge, setCharge] = useState<number>(0);
  const [heuresRequises, setHeuresRequises] = useState<String>("0h");
  const [heuresCible, setHeuresCible] = useState<number>(dataPlanif.nb_h_cible);
  const [heuresActuel, setHeuresActuel] = useState<number>(
    dataPlanif.nb_h_actuel
  );
  const [personnelCible, setPersonnelCible] = useState<number>(
    dataPlanif.nb_p_cible
  );
  const [personnelActuel, setPersonnelActuel] = useState<number>(
    dataPlanif.nb_p_actuel
  );

  const handleHeureCiblePlusClick = () => {
    setHeuresCible((i) => i + 1);
    setMaj(true);
  };

  const handleMinusHeureCibleClick = () => {
    if (heuresCible > 0) {
      setHeuresCible((i) => i - 1);
      setMaj(true);
    }
  };
  const handleHeureActuelPlusClick = () => {
    setHeuresActuel((i) => i + 1);
    setMaj(true);
  };

  const handleMinusHeureActuelClick = () => {
    if (heuresActuel > 0) {
      setHeuresActuel((i) => i - 1);
      setMaj(true);
    }
  };

  const handlePersonnelCiblePlusClick = () => {
    setPersonnelCible((i) => i + 1);
    setMaj(true);
  };

  const handleMinusPersonnelCibleClick = () => {
    if (personnelCible > 0) {
      setPersonnelCible((i) => i - 1);
      setMaj(true);
    }
  };

  const handlePersonnelActuelPlusClick = () => {
    setPersonnelActuel((i) => i + 1);
    setMaj(true);
  };

  const handleMinusPersonnelActuelClick = () => {
    if (personnelActuel > 0) {
      setPersonnelActuel((i) => i - 1);
      setMaj(true);
    }
  };

  useEffect(() => {
    setHeuresActuel(dataPlanif.nb_h_actuel);
    setHeuresCible(dataPlanif.nb_h_cible);
    setPersonnelActuel(dataPlanif.nb_p_actuel);
    setPersonnelCible(dataPlanif.nb_p_cible);
  }, [dataPlanif]);

  useEffect(() => {
    if (maj) {
      setMaj(false);
      const nouvellePlanification = { ...journeeType };
      const index = nouvellePlanification.liste_Competence.findIndex(
        (planifComp) => planifComp.idCompetence === dataPlanif.idCompetence
      );
      if (index !== -1) {
        nouvellePlanification.liste_Competence[index].nb_h_actuel =
          heuresActuel;
        nouvellePlanification.liste_Competence[index].nb_h_cible = heuresCible;
        nouvellePlanification.liste_Competence[index].nb_p_actuel =
          personnelActuel;
        nouvellePlanification.liste_Competence[index].nb_p_cible =
          personnelCible;
        setJourneeType(nouvellePlanification);
      } else {
        console.error("index non trouvé", dataPlanif, nouvellePlanification);
      }
    }
  }, [maj, heuresActuel, heuresCible, personnelActuel, personnelCible]);

  useEffect(() => {
    const totalMinutes = parcours
      .filter((value) => value.sequencables)
      .flatMap((value) => {
        return value.sequencables
          .filter(
            (element) =>
              element.type === "EtapeType" || element.type === "GroupeEtapeType"
          )
          .map((element) => ({ ...element, idParcours: value._id }));
      })
      .reduce((total, element) => {
        let totalElement = 0;
        if (element.type === "GroupeEtapeType") {
          element.Etapes.map((etape) => {
            const competenceCheck = (
              etape.Competence as unknown as string[]
            ).find((comp: string) => {
              return comp === competence._id;
            });
            if (competenceCheck) {
              totalElement += etape.duree;
            }
          });
        } else if (element.type === "EtapeType") {
          const competenceCheck = element.Competence.find((comp) => {
            return comp._id === competence._id;
          });
          if (competenceCheck) {
            totalElement += element.duree;
          }
        }
        const parcour = journeeType.planificationParcours.find(
          (parc) => parc.idParcours === element.idParcours
        );
        if (parcour) {
          console.log(competence.nom, total, totalElement, parcour.nbParcours);
        }
        return total + (parcour ? totalElement * parcour.nbParcours : 0);
      }, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setHeuresRequises(
      totalMinutes === 0
        ? "0h"
        : `${hours}h${minutes < 10 ? "0" : ""}${minutes}`
    );
    if (totalMinutes > 0) {
      let minutesActuel = heuresActuel * personnelActuel * 60;
      if (minutesActuel > 0) {
        let charge = (totalMinutes / minutesActuel) * 100;
        setCharge(charge);
      } else {
        setCharge(100);
      }
    } else {
      setCharge(0);
    }
  }, [journeeType]);

  // useEffect(() => {
  //   console.log(heuresRequises, competence.nom);
  // });

  return (
    <div key={competence._id} className="flex flex-row text-xl my-4">
      <div className="w-96 h-24 flex items-center content-center justify-between rounded-xl shadow-md px-4 py-2">
        <div className="w-24 flex flex-row justify-between h-full">
          <div className="p-4 flex flex-col justify-center content-center items-center">
            <p className="text-[10px]">Charge</p>
            <p className="text-2xl">{charge.toFixed(0)}%</p>
          </div>
          <div
            className={`h-full border-4 ${
              charge > 75
                ? "border-negative"
                : charge > 50
                ? "border-orange"
                : "border-positive"
            } rounded`}
          ></div>
        </div>

        <div className="w-40 flex items-center content-center justify-center text-center px-2">{competence.nom}</div>
        <div className="w-24 flex flex-row h-full">
          <div className=" h-full border-2 border-lightlightgrey rounded mr-4"></div>
          <div className="flex flex-col justify-center content-center items-center">
            <p className="text-[10px]">Heures Requises</p>
            <p className="text-2xl">{heuresRequises}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center content-center">
        <div className="flex flex-row items-center justify-center">
          <div className="h-12 w-12 flex items-center content-center justify-center mx-8">
            <Clock size={25} />
          </div>

          <div className="w-[170px] h-12 flex flex-row items-center justify-around rounded-xl shadow-md mx-5">
            <button
              className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center"
              onClick={handleMinusHeureCibleClick}
            >
              <Minus size={20} />
            </button>
            <p>{heuresCible}</p>
            <button
              className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center"
              onClick={handleHeureCiblePlusClick}
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="w-[170px] h-12 flex flex-row items-center justify-around rounded-xl shadow-md mx-8">
            <button
              className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center "
              onClick={handleMinusHeureActuelClick}
            >
              <Minus size={20} />
            </button>
            <p>{heuresActuel}</p>
            <button
              className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center"
              onClick={handleHeureActuelPlusClick}
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="w-[170px] h-12 flex items-center justify-around rounded-xl shadow-md mx-5">
            <p>{heuresCible - heuresActuel}</p>
          </div>
        </div>

        <div className="flex flex-row items-center content-center justify-center mt-2">
          <div className="h-12 w-12 flex items-center content-center justify-center mx-8">
            <Users size={25} />
          </div>

          <div className="w-[170px] h-12 flex flex-row items-center justify-around rounded-xl shadow-md mx-5">
            <button
              className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center"
              onClick={handleMinusPersonnelCibleClick}
            >
              <Minus size={20} />
            </button>
            <p>{personnelCible}</p>
            <button
              className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center"
              onClick={handlePersonnelCiblePlusClick}
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="w-[170px] h-12 flex flex-row items-center justify-around rounded-xl shadow-md mx-8">
            <button
              className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center"
              onClick={handleMinusPersonnelActuelClick}
            >
              <Minus size={20} />
            </button>
            <p>{personnelActuel}</p>
            <button
              className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center"
              onClick={handlePersonnelActuelPlusClick}
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="w-[170px] h-12 flex items-center justify-around rounded-xl shadow-md mx-5">
            <p>{personnelCible - personnelActuel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
