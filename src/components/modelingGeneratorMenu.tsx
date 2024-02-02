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
import React, {cache, useEffect, useState} from "react";
import {getAllParcoursType} from "@/actions/ParcoursType";
import fs from "fs/promises";
import {
    deleteEtapeTypeById,
    getAllEtapeType,
    updateEtapeType,
} from "@/actions/EtapeType";
import etapeType from "@/app/models/etapeType";
import {getComp, getLieu, getMateriel} from "@/actions/CreateCompTest";
import ModifierOverlay from "./modifierOverlay";
import OptionOverlay from "./optionOverlay";
import {EtapeTypeCompact} from "./modelingComponents";
import Popup from "reactjs-popup";
import Creation from "@/app/(connected)/Creation/page";
import "reactjs-popup/dist/index.css";
import diacritics from "diacritics";
import {
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

export function ModelingGeneratorMenu({EtapeType, setEtapeType}) {
    const [menuVisible, setMenuVisible] = useState(false);

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

    return (
        <div className="w-full pl-12 pr-8 mb-4">
            <div className="flex justify-end items-center content-center">
                <div
                    className={`w-20 h-20 bg-light-blue rounded-3xl flex items-center justify-center mr-4 cursor-pointer hover:rounded-full ${
                        menuVisible ? "hidden" : "block"
                    }`}
                    onClick={toggleMenuVisibility}
                >
                    <Plus size={32}/>
                </div>
            </div>

            <div
                className={`bg-white pt-4 pl-4 pr-4 pb-2 shadow-lg rounded-3xl ${
                    menuVisible ? "block" : "hidden"
                }`}
            >
                <div className="flex flex-row w-full justify-between mb-2">
                    <div className="flex flex-row items-center content-center w-full justify-between pr-4">
                        <div
                            className="flex items-center content-center justify-center border-4 border-dashed h-20 border-grey rounded-3xl p-6 text-grey w-full mr-4">
                            <p className="text-bold text-3xl">Bloc d'étapes</p>
                        </div>
                        <div
                            className="h-20 bg-light-blue flex flex-row items-center justify-center rounded-3xl w-full">
                            <PencilSimpleLine size={32}/>
                            <p className="font-bold ml-4">Lier</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center content-center border-l-2 pl-4">
                        <div
                            className="w-20 h-20 bg-dark-blue rounded-3xl flex items-center justify-center mr-4 hover:rounded-full">
                            <Popup
                                trigger={<Plus size={32}/>}
                                position="left center"
                                modal
                                nested
                            >
                                {
                                    close => (
                                        <Creation fonctionClose={close}></Creation>
                                    )
                                }
                            </Popup>
                        </div>

                        <button
                            className="w-20 h-20 bg-light-blue rounded-3xl flex items-center justify-center hover:rounded-full"
                            onClick={toggleMenuVisibility}
                        >
                            <X size={32}/>
                        </button>
                    </div>
                </div>

                <div className="flex flex-row items-center content-center">
                    <div className="flex flex-row items-center content-center bg-lightgrey rounded-3xl p-4 mr-4">
                        <MagnifyingGlass size={32}/>
                        <input
                            type="text"
                            placeholder="Rechercher une étape"
                            value={searchEtape}
                            onChange={(e) => setSearchEtape(e.target.value)}
                            className="border-none outline-none bg-lightgrey ml-2"
                        />
                        <button onClick={() => setSearchEtape("")}>
                            <X size={25}/>
                        </button>
                    </div>

                    <div
                        className="flex flex-row overflow-x-scroll w-full h-24 items-center content-center"
                        onWheel={handleWheel}
                    >
                        <SortableContext
                            items={EtapeType.map((element) => element._id)}
                            strategy={horizontalListSortingStrategy}
                        >
                            {EtapeType.filter((etape) =>
                                diacritics
                                    .remove(etape.name.toLowerCase())
                                    .includes(diacritics.remove(searchEtape.toLowerCase()))
                            ).length > 0 ? (
                                EtapeType.filter((etape) =>
                                    diacritics
                                        .remove(etape.name.toLowerCase())
                                        .includes(diacritics.remove(searchEtape.toLowerCase()))
                                ).map((etapes) => (
                                    <EtapeTypeCompact
                                        etape={etapes}
                                        SetEtapes={setSearchEtape}
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
