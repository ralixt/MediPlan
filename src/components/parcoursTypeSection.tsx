"use client";
import React, { Dispatch, SetStateAction, cache, useEffect, useState } from "react";
import ParcoursType from "@/app/models/parcoursType";
import { getNameParcoursType } from "@/actions/ParcoursType";
import { getParcoursType } from "@/actions/ParcoursType";
import { Parachute } from "@phosphor-icons/react";
import PlanificationParcours from "./planificationParcours";

type props = {
  journeeType: JourneeType;
  setMaj:Dispatch<SetStateAction<boolean>>
};

const getParcoursBDD = cache(async () => {
  const response = await getNameParcoursType();
  return response;
});

export default function ParcoursTypeSection({ journeeType, setMaj }: props) {
  const [parcours, setParcours] = useState<parcoursList>([]);

  useEffect(() => {
    const fetchParcours = async () => {
      try {
        const data = await getParcoursBDD();
        //console.log("cache : " ,data)
        setParcours(data as parcoursList);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des parcours:",
          error
        );
      }
    };

    fetchParcours();
  }, []);

  return (
    <div>
      <h2>{journeeType.nom}</h2>

      {parcours.map((parcour) => {
        let dataPlanif = journeeType.planificationParcours.find(
          (value) => value.idParcours === parcour._id
        );
        if (!dataPlanif) {
          journeeType.planificationParcours.push({
            idParcours: parcour._id,
            nbParcours: 0,
            pourcentage_utilisation: 0,
          });
          setMaj(true)
          
          dataPlanif = journeeType.planificationParcours.find(
            (value) => value.idParcours === parcour._id
          );
        }
        if (dataPlanif) {
          return (
            <PlanificationParcours
              key={parcour._id}
              id={parcour._id}
              name={parcour.name}
              dataPlanif={dataPlanif}
            />
          );
        } else {
          return "";
        }
      })}

      {/* {journeeType.planificationParcours.map((planificationParcours) => {
        const parcoursType = parcours?.find(
          (value) => value._id === planificationParcours.idParcours
        );
        if (parcoursType) {
          console.log("ParcoursType", parcoursType);
          return (
            <PlanificationParcours
              key={parcoursType._id}
              id={parcoursType._id}
              name={parcoursType.name}
            ></PlanificationParcours>
          );
        } else {
          return "";
        }
      })} */}
    </div>
  );
}
