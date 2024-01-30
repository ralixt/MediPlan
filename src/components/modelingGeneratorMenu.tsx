"use client";

import {
  Clock,
  Door,
  DotsThreeOutlineVertical,
  ForkKnife,
  PencilSimpleLine,
  Plus,
  User,
  X,
} from "@phosphor-icons/react";
import { cache, useEffect, useState } from "react";
import { getAllParcoursType } from "@/actions/ParcoursType";
import fs from "fs/promises";
import {
  deleteEtapeTypeById,
  getAllEtapeType,
  updateEtapeType,
} from "@/actions/EtapeType";
import etapeType from "@/app/models/etapeType";
import { getComp, getLieu, getMateriel } from "@/actions/CreateCompTest";
import ModifierOverlay from "./modifierOverlay";
import OptionOverlay from "./optionOverlay";
import { EtapeTypeCompact } from "./modelingComponents";

export function ModelingGeneratorMenu() {
  const [EtapeType, setEtapeType] = useState([]);

  useEffect(() => {
    const fetchParcours = async () => {
      try {
        const data = await getAllEtapeType();
        //console.log("cache : " ,data.map(i=>i.name))
        setEtapeType(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des étape types:",
          error
        );
      }
    };

    fetchParcours();
  }, []);

  return (
    <div className="w-11/12 bg-white p-4 mb-4 shadow-lg rounded-3xl">
      {/*max-h-52*/}
      <div className="flex flex-row w-full pb-4 justify-between">
        <div className="border-2 border-dashed h-20 border-grey rounded-3xl p-6 text-grey text-bold">
          <p className="mx-auto my-auto">Bloc d'étapes</p>
        </div>
        <div className="w-96 h-20 bg-light-blue flex flex-row items-center justify-center rounded-3xl">
          <PencilSimpleLine size={32} />
          <p className="font-bold ml-4">Lier</p>
        </div>

        <div className="w-20 h-20 bg-dark-blue rounded-3xl flex items-center justify-center">
          <Plus size={32} />
        </div>

        <div className="w-20 h-20 bg-light-blue rounded-3xl flex items-center justify-center">
          <X size={32} />
        </div>
      </div>

      <div className="flex flex-row overflow-y-auto h-24">
        {EtapeType.map((etapes) => (
          <EtapeTypeCompact etape={etapes} SetEtapes={setEtapeType} />
        ))}
      </div>
    </div>
  );
}
