"use client";
import React, { useCallback, useEffect, useState } from "react";
import { NextPageProps } from "../../modeling-workshop-menu/[modelingWorkshop]/page";
import { Loader } from "@/components/loader";
import ParcoursTypeSection from "@/components/parcoursTypeSection";
import CompetenceSection from "@/components/CompetenceSection";
import JourneeType from "@/app/models/journeeType";
import { JourneeTypeButton } from "@/components/buttons";
import Image from "next/image";
import { getAllParcoursType } from "@/actions/ParcoursType";
import { getPlanification } from "@/actions/Planification";

type props = {
  planificationId: string;
};
export default function PlanificationPage({ params }: NextPageProps<props>) {
  const [planification, setPlanification] = useState<Planification>();
  const [selectedJourneeType, setSelectedJourneeType] = useState<JourneeType>();
  const [maj, setMaj] = useState<boolean>(false);
  const [parcours, setParcours] = useState<parcoursList>([]);

  useEffect(() => {
    const fetchParcours = async () => {
      try {
        let data: Planification[];
        const response = await fetch("/temporary/Planif.json");
        const response2 = await getPlanification(params.planificationId);
        data = await response.json();

        setPlanification(response2 as Planification);
        console.log("data", response2);
        setSelectedJourneeType((response2 as Planification).liste_JourneeType[0]);
        const reponse2: parcoursList =
          (await getAllParcoursType()) as parcoursList;
        setParcours(reponse2);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des parcours:",
          error
        );
        // Gérer l'erreur ici
      }
    };

    fetchParcours();
  }, []);

  useEffect(() => {
    if (maj) {
      setMaj(false);
    }
  }, [maj, planification]);

  return planification && selectedJourneeType ? (
    <div className="">
      <div className="h-32 w-full text-center flex items-center justify-around font-bold text-2xl bg-light-blue pl-5">
        <Image
          src="/planification-parcours_arrow1.svg"
          alt="Arrow design"
          width={100}
          height={100}
          // className={}
        ></Image>
        <h1>{planification.nom}</h1>
        <Image
          src="/planification-parcours_arrow2.svg"
          alt="Arrow design"
          width={100}
          height={100}
          // className={}
        ></Image>
      </div>

      <div className="flex flex-row items-start justify-start w-full pt-14 bg-white">
        <div className="flex items-center content-center justify-center flex-col gap-5 fixed ml-12">
          {planification.liste_JourneeType.map((value, index) => (
            <JourneeTypeButton
              key={index}
              journeeType={value}
              active={value === selectedJourneeType}
              setSelectedJourneeType={setSelectedJourneeType}
            />
          ))}
        </div>
        <div className="flex flex-col items-center content-center justify-center pl-48 w-full">
          <ParcoursTypeSection
            Planification_id={params.planificationId}
            journeeType={selectedJourneeType}
            setMaj={setMaj}
            parcours={parcours}
          />

          <CompetenceSection
              planificationId = {params.planificationId}
            journeeType={selectedJourneeType}
            setMaj={setMaj}
            parcours={parcours}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-[100vh] bg-white">
      <Loader />
    </div>
  );
}
