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
  Planification_id:string;
  journeeType: JourneeType;
  setMaj: Dispatch<SetStateAction<boolean>>;
  parcours: parcoursList;
};

export default function ParcoursTypeSection({
                                              Planification_id,
  journeeType,
  setMaj,
  parcours,
}: props) {
  // console.log(parcours)

  return (
    <div>
      <div className="flex items-center content-center justify-center flex-wrap">
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
            setMaj(true);

            dataPlanif = journeeType.planificationParcours.find(
              (value) => value.idParcours === parcour._id
            );
            console.log(dataPlanif);
          }


          if (dataPlanif) {

            console.log("cc",dataPlanif);
            return (
              <PlanificationParcours
                key={parcour._id}
                id={parcour._id}
                Planification_id={Planification_id}
                JourneeType_id={journeeType._id}
                JourneeType = {journeeType}
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
