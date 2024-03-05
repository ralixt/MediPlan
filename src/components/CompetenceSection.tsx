import React, {
  cache,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  getNameCompetences,
  getNameParcoursType,
} from "@/actions/ParcoursType";
import competence from "@/app/models/competence";
import PlanificationParcours from "@/components/planificationParcours";
import PlanificationCompetences from "@/components/planificationCompetences";

type props = {
  journeeType: JourneeType;
  setMaj: Dispatch<SetStateAction<boolean>>;
  parcours: parcoursList;
};

const getCompBDD = cache(async () => {
  const response = await getNameCompetences();
  return response;
});

export default function CompetenceSection({
  journeeType,
  setMaj,
  parcours,
}: props) {
  const [competences, setCompetences] = useState<competencesList>([]);

  useEffect(() => {
    const fetchCompetences = async () => {
      try {
        const data = await getCompBDD();
        //console.log("cache : " ,data)
        setCompetences(data as competencesList);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des parcours:",
          error
        );
      }
    };

    fetchCompetences();
  }, []);

  // console.log(competences)

  return (
    <div className="flex flex-col items-center content-center justify-center w-full">
      <div className="flex items-center content-center justify-center mt-8 mb-16 border-dashed border-lightlightgrey border-4 rounded-xl w-10/12 mx-auto"></div>
      <div className="flex flex-row text-xl mb-6 w-full">
        <div className="w-52 h-12 bg-positive flex items-center content-center justify-center rounded-xl ml-[470px]">
          Cible
        </div>
        <div className="w-52 h-12 bg-light-blue flex items-center content-center justify-center rounded-xl mx-4">
          Actuel
        </div>
        <div className="w-52 h-12 bg-negative flex items-center content-center justify-center rounded-xl">
          Gap à franchir
        </div>
      </div>

      <div className="flex flex-col">
        {competences.map((competence) => {
          let dataPlanif = journeeType.liste_Competence.find(
            (value) => value.idCompetence === competence._id
          );
          if (!dataPlanif) {
            journeeType.liste_Competence.push({
              idCompetence: competence._id,
              nb_h_cible: 0,
              nb_p_cible: 0,
              nb_h_actuel: 0,
              nb_p_actuel: 0,
            });
            setMaj(true);

            dataPlanif = journeeType.liste_Competence.find(
              (value) => value.idCompetence === competence._id
            );
            console.log(dataPlanif);
          }
          if (dataPlanif) {
            return (
              <PlanificationCompetences
                key={competence._id}
                id={competence._id}
                name={competence.nom}
                parcours={parcours}
                journeeType={journeeType}
                dataPlanif={dataPlanif}
              />
            );
          } else {
            return "";
          }
        })}
      </div>
    </div>
  );
}
