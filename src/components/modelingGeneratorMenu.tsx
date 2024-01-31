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
import 'reactjs-popup/dist/index.css';



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

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenuVisibility = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className="w-11/12 mb-4">
            <div className="flex justify-end items-center content-center">
                <div
                    className={`w-20 h-20 bg-light-blue rounded-3xl flex items-center justify-center mr-4 cursor-pointer hover:rounded-full ${
                        menuVisible ? 'hidden' : 'block'
                    }`}
                    onClick={toggleMenuVisibility}
                >
                    <Plus size={32}/>
                </div>
            </div>


            <div
                className={`bg-white pt-4 pl-4 pr-4 pb-2 shadow-lg rounded-3xl ${menuVisible ? 'block' : 'hidden'}`}
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

                        <div className="w-20 h-20 bg-dark-blue rounded-3xl flex items-center justify-center mr-4 hover:rounded-full">
                            <Popup trigger={<Plus size={32}/>} position="left center" modal nested>
                                <Creation></Creation>
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

                <div className="flex flex-row overflow-x-scroll w-full h-24 items-center content-center">
                    {EtapeType.map((etapes) => (
                        <EtapeTypeCompact etape={etapes} SetEtapes={setEtapeType} key={etapes.id}/>
                    ))}
                </div>
            </div>

        </div>
    );


}
