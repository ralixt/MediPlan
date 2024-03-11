"use client";

import {
  Clock,
  Door,
  DotsThreeOutlineVertical,
  ForkKnife,
  MagnifyingGlass,
  PencilSimpleLine,
  Plus,
  User,
  X,
} from "@phosphor-icons/react";
import React, { cache, useEffect, useState } from "react";
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
import { EtapeTypeCompact, IconPrecedence } from "./modelingComponents";
import Popup from "reactjs-popup";
import Creation from "@/components/creation-etape";
import "reactjs-popup/dist/index.css";
import diacritics from "diacritics";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IconGroupeEtape } from "./modelingComponents";
import handleDragEnd from "./modelingGenerator";

type ModelingGeneratorMenuProps = {
  EtapeType: EtapeType[];
  setEtapeType: React.Dispatch<React.SetStateAction<EtapeType[]>>;
};

export function ModelingGeneratorMenu({
  EtapeType,
  setEtapeType,
}: ModelingGeneratorMenuProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [newET, setNewET] = useState(false);

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible);
  };

  const [searchEtape, setSearchEtape] = useState("");

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container) {
      const delta = Math.max(-1, Math.min(1, e.deltaY));
      container.scrollLeft += delta * 100; // Ajustez la valeur pour contrôler la vitesse du défilement horizontal
    }
  };

  const handleClickNew = () => {
    setNewET(true);
  };

  return (
    <div className="w-full pl-12 pr-8 mb-4">
      {newET ? (
        <Creation
          fonctionClose={setNewET}
          setEtapeType={setEtapeType}
          etapeType={EtapeType}
        />
      ) : (
        ""
      )}
      <div className="flex justify-end items-center content-center">
        <div
          className={`w-20 h-20 bg-light-blue rounded-3xl flex items-center justify-center mr-4 cursor-pointer hover:rounded-full ${
            menuVisible ? "hidden" : "block"
          }`}
          onClick={toggleMenuVisibility}
        >
          <Plus size={32} />
        </div>
      </div>

      <div
        className={`bg-white pt-4 pl-4 pr-4 pb-2 shadow-lg rounded-3xl ${
          menuVisible ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-row w-full justify-between mb-2">
          <div className="flex flex-row items-center content-center w-full justify-between pr-4">
            <IconGroupeEtape></IconGroupeEtape>
            <IconPrecedence></IconPrecedence>
          </div>

          <div className="flex flex-row items-center content-center border-l-2 pl-4">
            <button
              className="w-20 h-20 bg-dark-blue rounded-3xl flex items-center justify-center mr-4 hover:rounded-full"
              onClick={handleClickNew}
            >
              <Plus size={32} />
            </button>

            <button
              className="w-20 h-20 bg-light-blue rounded-3xl flex items-center justify-center hover:rounded-full"
              onClick={toggleMenuVisibility}
            >
              <X size={32} />
            </button>
          </div>
        </div>

        <div className="flex flex-row items-center content-center">
          <div className="flex flex-row items-center content-center bg-lightgrey rounded-3xl p-4 mr-4">
            <MagnifyingGlass size={32} />
            <input
              type="text"
              placeholder="Rechercher une étape"
              value={searchEtape}
              onChange={(e) => setSearchEtape(e.target.value)}
              className="border-none outline-none bg-lightgrey ml-2"
            />
            <button onClick={() => setSearchEtape("")}>
              <X size={25} />
            </button>
          </div>

          <div
            className="flex flex-row overflow-x-scroll w-full h-32 items-center content-center"
            onWheel={handleWheel}
          >
            <SortableContext
              items={EtapeType.map((element) => element._id)}
              strategy={horizontalListSortingStrategy}
            >
              {EtapeType.filter((etape) => {
                return (
                  etape.type === "EtapeType" &&
                  diacritics
                    .remove(etape.name.toLowerCase())
                    .includes(diacritics.remove(searchEtape.toLowerCase()))
                );
              }).length > 0 ? (
                EtapeType.filter((etape) => {
                  return (
                    etape.type === "EtapeType" &&
                    diacritics
                      .remove(etape.name.toLowerCase())
                      .includes(diacritics.remove(searchEtape.toLowerCase()))
                  );
                }).map((etapes) => (
                  <EtapeTypeCompact
                    etape={etapes}
                    setEtapes={setEtapeType}
                    key={etapes._id}
                  />
                ))
              ) : (
                <div className="flex items-center content-center justify-center w-full">
                  <p className="text-2xl">Aucune étape trouvée</p>
                </div>
              )}
            </SortableContext>
          </div>
        </div>
      </div>
    </div>
  );
}
