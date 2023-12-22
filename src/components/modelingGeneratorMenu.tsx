"use client";

import {
    Clock,
    Door,
    DotsThreeOutlineVertical,
    ForkKnife, PencilSimpleLine,
    User,
} from "@phosphor-icons/react";
import {cache, useEffect, useState} from "react";
import {getAllParcoursType} from "@/actions/ParcoursType";
import fs from "fs/promises";
import {getAllEtapeType} from "@/actions/EtapeType";
import etapeType from "@/app/models/etapeType";

// type propsET = {
//     etapeType: EtapeType;
// };

// export function EtapeTypeCompact({ etapeType }: propsET) {
export function EtapeTypeCompact(etape) {



    return (


        <div
            className="flex flex-row justify-between bg-lightlightgrey shadow-lg rounded-3xl p-4 h-28 max-w-xs "
            // ref={setNodeRef}
            // {...listeners}
            // {...attributes}
            // style={style}
        >
            {/*<h2 className="font-bold">{etapeType.name}</h2>*/}
            <h2 className="font-bold text-3xl flex items-center justify-center">{etape.name}</h2>
            <div className="text-xs ml-4 mr-12">
                <div className="flex flex-row items-center">
                    <Clock size={16}/>
                    <p className="ml-2">5</p>'
                </div>

                {/*{etapeType.aJeun && (*/}
                    <div className="flex flex-row items-center mt-2">
                        <ForkKnife size={16}/>
                        <p className="ml-2">Yes</p>
                    </div>
                {/*)}*/}

                <div className="flex flex-row items-center mt-2">
                    <Door size={16}/>
                    {/*<p className="ml-2">{etapeType.lieux}</p>*/}
                    <p className="ml-2">E152</p>
                </div>

                <div className="flex flex-row items-center mt-2">
                    <User size={16}/>
                    {/*<p className="ml-2">{etapeType.competences}</p>*/}
                    <p className="ml-2">IDE</p>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button className="rounded-full">
                    <DotsThreeOutlineVertical size={32} weight="fill" color="#009BD4"/>
                </button>
            </div>
        </div>
    );
}


export function ModelingGeneratorMenu() {

    const [EtapeType, setEtapeType] = useState([]);


    useEffect(() => {
        const fetchParcours = async () => {
            try {
                const data = await getAllEtapeType();
                console.log("cache : " ,data)
                setEtapeType(data);


            } catch (error) {
                console.error("Erreur lors de la récupération des données des étape types:", error);

            }
        };

        fetchParcours();
    }, []);
   




    return(
        <div className="h-52 w-11/12 bg-white p-12 mb-4 shadow-lg rounded-3xl" >
            <div className="flex flex-row">
                <div className="border-2 border-dashed h-20 border-grey rounded-3xl p-6 text-grey text-bold">
                    <p className="mx-auto my-auto">Bloc d'étapes</p>
                </div>
                <div className="w-96 h-20 bg-light-blue flex flex-row">
                    <PencilSimpleLine size={32} />
                    <p>Lier</p>
                </div>
            </div>

            <div className="flex flex-row">
            {
                EtapeType.map(((etapes)=>
                        <EtapeTypeCompact  etape={etapes}  />

                ))
            }
            </div>

            
        </div>
        
    )
}