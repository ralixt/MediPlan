"use client";
import React, {
  Dispatch,
  SetStateAction,
  cache,
  useEffect,
  useState,
} from "react";
import ParcoursType from "@/app/models/parcoursType";
import { getNameParcoursType } from "@/actions/ParcoursType";
import { getParcoursType } from "@/actions/ParcoursType";
import { Parachute } from "@phosphor-icons/react";
import PlanificationParcours from "./planificationParcours";

type props = {
  journeeType: JourneeType;
  setJourneeType: React.Dispatch<React.SetStateAction<JourneeType | undefined>>;
  parcours: parcoursList;
};

export default function ParcoursTypeSection({
  journeeType,
  setJourneeType,
  parcours,
}: props) {
  // console.log(parcours)

  useEffect(() => {
    parcours.map((parcour) => {
      let dataPlanif = journeeType.planificationParcours.find(
        (value) => value.idParcours === parcour._id
      );
      if (!dataPlanif) {
        const nouvelleJT = { ...journeeType };
        nouvelleJT.planificationParcours.push({
          idParcours: parcour._id,
          nbParcours: 0,
          pourcentage_utilisation: 0,
        });
        setJourneeType(nouvelleJT);
      }
    });
  }, [parcours, journeeType]);
  return (
    <div>
      <div className="flex items-start content-start justify-between flex-wrap gap-10">
        {parcours.map((parcour) => {
          let dataPlanif = journeeType.planificationParcours.find(
            (value) => value.idParcours === parcour._id
          );

          if (dataPlanif) {
            return (
              <PlanificationParcours
                key={parcour._id}
                id={parcour._id}
                JourneeType={journeeType}
                setJourneeType={setJourneeType}
                name={parcour.name}
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
