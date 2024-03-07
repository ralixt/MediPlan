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
  planificationId: string;
  journeeType: JourneeType;
  setJourneeType: React.Dispatch<React.SetStateAction<JourneeType | undefined>>;
  parcours: parcoursList;
};

const getCompBDD = cache(async () => {
  const response = await getNameCompetences();
  return response;
});

export default function CompetenceSection({
  journeeType,
  setJourneeType,
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

  useEffect(() => {
    competences.map((competence) => {
      let dataPlanif = journeeType.liste_Competence.find(
        (value) => value.idCompetence === competence._id
      );
      if (!dataPlanif) {
        const nouvelleComp = { ...journeeType };
        nouvelleComp.liste_Competence.push({
          idCompetence: competence._id,
          nb_h_cible: 0,
          nb_p_cible: 0,
          nb_h_actuel: 0,
          nb_p_actuel: 0,
        });
        setJourneeType(nouvelleComp);
      }
    });
  }, [competences, journeeType]);

  // console.log(competences)

  return (
    <div className="flex flex-col items-center content-center justify-center w-full">
      <div className="flex items-center content-center justify-center mt-8 mb-16 border-dashed border-lightlightgrey border-4 rounded-xl w-10/12 mx-auto"></div>
      <div className="flex flex-row text-xl mb-6 w-full pl-[555px]">
        <div className="w-52 h-12 bg-positive flex items-center content-center justify-center rounded-xl">
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
        {journeeType.liste_Competence.map((dataPlanif) => {
          const competence = competences.find(
            (value) => value._id === dataPlanif.idCompetence
          );
          if (competence) {
            return (
              <PlanificationCompetences
                key={competence._id}
                setJourneeType={setJourneeType}
                competence={competence}
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
