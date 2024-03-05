import { Clock, Minus, Plus, Users } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
  updateHeuresActuel,
  updateHeuresCible,
  updateNumberParcours,
  updatePersonnelActuel, updatePersonnelCible
} from "@/actions/Planification";

type PlanificationParcoursProps = {
  planificationId:string,
  id: string;
  name: string;
  journeeType: JourneeType;
  parcours: parcoursList;
  dataPlanif: listeUtilisationCompetence;
};

export default function PlanificationCompetences({
                                                   planificationId,
  id,
  name,
  journeeType,
  parcours,
  dataPlanif,
}: PlanificationParcoursProps) {
  const [heuresRequises, setHeuresRequises] = useState<String>("0h");
  const [heuresCible,setHeuresCible]=useState<number>(dataPlanif.nb_h_cible)
  const [heuresActuel,setHeuresActuel]=useState<number>(dataPlanif.nb_h_actuel)
  const [personnelCible,setPersonnelCible]=useState<number>(dataPlanif.nb_p_cible)
  const [personnelActuel,setPersonnelActuel]=useState<number>(dataPlanif.nb_p_actuel)


  useEffect(() => {
    async function updateHeuresCibles() {
      console.log("journne",journeeType._id)
      await updateHeuresCible(
          planificationId,
          journeeType._id,
          heuresCible,
          dataPlanif.idCompetence


      );
    }

    updateHeuresCibles();
  }, [heuresCible]);

 useEffect(() => {
    async function updateHeuresActuels() {
      console.log("journne",journeeType._id)
      await updateHeuresActuel(
          planificationId,
          journeeType._id,
          heuresActuel,
          dataPlanif.idCompetence


      );
    }

    updateHeuresActuels();
  }, [heuresActuel]);

  useEffect(() => {
    async function updatePersonelActuels() {
      console.log("journne",journeeType._id)
      await updatePersonnelActuel(
          planificationId,
          journeeType._id,
          personnelActuel,
          dataPlanif.idCompetence


      );
    }

    updatePersonelActuels();
  }, [personnelActuel]);

  useEffect(() => {
    async function updatePersonelCibles() {
      console.log("journne",journeeType._id)
      await updatePersonnelCible(
          planificationId,
          journeeType._id,
          personnelCible,
          dataPlanif.idCompetence


      );
    }

    updatePersonelCibles();
  }, [personnelCible]);

  const handleHeureCiblePlusClick = () => {
    setHeuresCible((i)=>i+1)
  };

  const handleMinusHeureCibleClick = () => {
    if (heuresCible > 0) {
      setHeuresCible((i)=>i-1)
    }
  };
  const handleHeureActuelPlusClick = () => {
    setHeuresActuel((i)=>i+1)
  };

  const handleMinusHeureActuelClick = () => {
    if (heuresActuel > 0) {
      setHeuresActuel((i)=>i-1)
    }
  };

  const handlePersonnelCiblePlusClick = () => {
    setPersonnelCible((i)=>i+1)
  };

  const handleMinusPersonnelCibleClick = () => {
    if (personnelCible > 0) {
      setPersonnelCible((i)=>i-1)
    }
  };

  const handlePersonnelActuelPlusClick = () => {
    setPersonnelActuel((i)=>i+1)
  };

  const handleMinusPersonnelActuelClick = () => {
    if (personnelActuel > 0) {
      setPersonnelActuel((i)=>i-1)
    }
  };

  // useEffect(() => {
  //   let minutes = 0;
  //   parcours.forEach((value) => {
  //     if (value.sequencables) {
  //       value.sequencables.forEach((element) => {
  //         if (element.type === "EtapeType") {
  //           element.Competence.forEach((comp) => {
  //             if (comp._id === id) {
  //               const parcour = journeeType.planificationParcours.find(
  //                 (parc) => parc.idParcours === value._id
  //               );
  //               if (parcour) {
  //                 console.log(element, name);
  //                 minutes += element.duree * parcour?.nbParcours;
  //               }
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });

  //   setHeuresRequises(minutes / 60);
  // }, []);

  useEffect(() => {
    const totalMinutes = parcours
      .filter((value) => value.sequencables)
      .flatMap((value) => {
        return value.sequencables
          .filter(
            (element) =>
              element.type === "EtapeType" &&
              element.Competence.some((comp) => comp._id === id)
          )
          .map((element) => ({ ...element, idParcours: value._id }));
      })
      .reduce((total, element) => {
        if (element.type !== "EtapeType") {
          return total;
        }
        const parcour = journeeType.planificationParcours.find(
          (parc) => parc.idParcours === element.idParcours
        );
        return total + (parcour ? element.duree * parcour.nbParcours : 0);
      }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setHeuresRequises(
      totalMinutes === 0
        ? "0h"
        : `${hours}h${minutes < 10 ? "0" : ""}${minutes}`
    );

    
  }, [parcours, journeeType]);

  return (
    <div key={id} className="flex flex-row text-xl my-4">
      <div className="w-96 h-24 flex items-center content-center justify-between rounded-xl shadow-md px-4 py-2">
        <div className="flex flex-row h-full">
          <div className="p-4 flex flex-col justify-center content-center items-center">
            <p className="text-[10px]">Charge</p>
            <p className="text-2xl">45%</p>
          </div>
          <div className=" h-full border-4 border-positive rounded"></div>
        </div>

        <div className="">{name}</div>
        <div className="flex flex-row h-full">
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

          <div className="w-[170px] h-12 flex flex-row items-center justify-around rounded-xl shadow-md">
            <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center" onClick={handleMinusHeureCibleClick} >
              <Minus size={20} />
            </button>
            <p>{heuresCible}</p>
            <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center" onClick={handleHeureCiblePlusClick}>
              <Plus size={20} />
            </button>
          </div>

          <div className="w-[170px] h-12 flex flex-row items-center justify-around rounded-xl shadow-md mx-12">
            <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center " onClick={handleMinusHeureActuelClick}>
              <Minus size={20} />
            </button>
            <p>{heuresActuel}</p>
            <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center" onClick={handleHeureActuelPlusClick}>
              <Plus size={20} />
            </button>
          </div>

          <div className="w-[170px] h-12 flex items-center justify-around rounded-xl shadow-md">
            <p>{heuresCible - heuresActuel}</p>
          </div>
        </div>

        <div className="flex flex-row items-center content-center justify-center mt-2">
          <div className="h-12 w-12 flex items-center content-center justify-center mx-8">
            <Users size={25} />
          </div>

          <div className="w-[170px] h-12 flex flex-row items-center justify-around rounded-xl shadow-md">
            <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center" onClick={handleMinusPersonnelCibleClick}>
              <Minus size={20} />
            </button>
            <p>{personnelCible}</p>
            <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center" onClick={handlePersonnelCiblePlusClick}>
              <Plus size={20} />
            </button>
          </div>

          <div className="w-[170px] h-12 flex flex-row items-center justify-around rounded-xl shadow-md mx-12">
            <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center" onClick={handleMinusPersonnelActuelClick}>
              <Minus size={20} />
            </button>
            <p>{personnelActuel}</p>
            <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center" onClick={handlePersonnelActuelPlusClick}>
              <Plus size={20} />
            </button>
          </div>

          <div className="w-[170px] h-12 flex items-center justify-around rounded-xl shadow-md">
            <p>{personnelCible - personnelActuel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
