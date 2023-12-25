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
import {deleteEtapeTypeById, getAllEtapeType} from "@/actions/EtapeType";
import etapeType from "@/app/models/etapeType";

// type propsET = {
//     etapeType: EtapeType;
// };

// export function EtapeTypeCompact({ etapeType }: propsET) {
export function EtapeTypeCompact(etape) {

    const [showOptions, setShowOptions] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleOptionsClick = () => {
        setShowOptions(!showOptions);
        setConfirmDelete(false); // Réinitialiser l'état de confirmation lors de l'ouverture des options
    };

    const handleModifierClick = () => {
        console.log("Modifier clicked");
    };

    const handleSupprimerClick = () => {
        // Afficher le message de confirmation
        setConfirmDelete(true);
    };

    const handleRetourClick = () => {
        setShowOptions(false);
        setConfirmDelete(false); // Réinitialiser l'état de confirmation lors du retour
    };

    const handleConfirmationClick = async (event) => {
        event.preventDefault()
        // Appeler la fonction de suppression si confirmé
        await deleteEtapeTypeById(etape.etape._id)
        console.log("Supprimer confirmed");

        setShowOptions(false);
        setConfirmDelete(false);
        window.location.reload();
    };

    const handleAnnulerClick = () => {
        // Annuler la suppression
        setConfirmDelete(false);
    };



    return <>


        {console.log(etape)}

        {showOptions && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded shadow-md relative flex flex-col items-center w-[400px]">
                    {confirmDelete ? (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Êtes-vous sûr de supprimer l'étape type ?</h2>
                            <button onClick={handleConfirmationClick}
                                    className="w-full bg-red-500 text-white px-4 py-2 rounded mb-2">
                                Oui
                            </button>
                            <button onClick={handleAnnulerClick}
                                    className="w-full bg-gray-500 text-white px-4 py-2 rounded">
                                Annuler
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Options</h2>
                            <button onClick={handleModifierClick}
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-2">
                                Modifier
                            </button>
                            <button onClick={handleSupprimerClick}
                                    className="w-full bg-red-500 text-white px-4 py-2 rounded mb-2">
                                Supprimer
                            </button>
                            <button onClick={handleRetourClick}
                                    className="w-full bg-gray-500 text-white px-4 py-2 rounded">
                                Retour
                            </button>
                        </>
                    )}
                </div>
            </div>
        )}
        <div


            className="flex flex-row justify-between bg-lightlightgrey shadow-lg rounded-3xl p-4 h-32 "
            // ref={setNodeRef}
            // {...listeners}
            // {...attributes}
            // style={style}
        >
            {/*<h2 className="font-bold">{etapeType.name}</h2>*/}
            <h2 className="font-bold text-3xl flex items-center justify-center">{etape.etape.name}</h2>
            <div className="text-xs ml-4 mr-12">
                <div className="flex flex-row items-center">
                    <Clock size={16}/>
                    <p className="ml-2">{etape.etape.duree}</p>'
                </div>

                {/*{etapeType.aJeun && (*/}
                {etape.etape.a_jeun &&
                    <div className="flex flex-row items-center mt-2">
                        <ForkKnife size={16}/>
                        <p className="ml-2">AJeun</p>
                    </div>
                }
                {/*)}*/}

                <div className="flex flex-row items-center mt-2">
                    <Door size={16}/>
                    {/*<p className="ml-2">{etapeType.lieux}</p>*/}
                    <p className="ml-2">{etape.etape.Lieu[0].nom}</p>
                </div>

                <div className="flex flex-row items-center mt-2">
                    <User size={16}/>
                    {/*<p className="ml-2">{etapeType.competences}</p>*/}
                    <p className="ml-2">{etape.etape.Competence[0].nom}</p>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button className="rounded-full">
                    <DotsThreeOutlineVertical size={32} weight="fill" color="#009BD4" onClick={handleOptionsClick}/>
                </button>
            </div>
        </div>
        );
    </>

}
export function ModelingGeneratorMenu() {

    const [EtapeType, setEtapeType] = useState([]);


    useEffect(() => {
        const fetchParcours = async () => {
            try {
                const data = await getAllEtapeType();
                console.log("cache : " ,data.map(i=>i.name))
                setEtapeType(data);


            } catch (error) {
                console.error("Erreur lors de la récupération des données des étape types:", error);

            }
        };

        fetchParcours();
    }, []);





    return(
        <div className="overflow-y-auto max-h-52 w-11/12 bg-white p-12 mb-4 shadow-lg rounded-3xl">

            <div className="flex flex-row">
                <div className="border-2 border-dashed h-20 border-grey rounded-3xl p-6 text-grey text-bold">
                    <p className="mx-auto my-auto">Bloc d'étapes</p>
                </div>
                <div className="w-96 h-20 bg-light-blue flex flex-row">
                    <PencilSimpleLine size={32}/>
                    <p>Lier</p>
                </div>
            </div>

            <div className="flex flex-row">
                {
                    EtapeType.map(((etapes) =>
                            <EtapeTypeCompact etape={etapes}/>

                    ))
                }
            </div>


        </div>

    )
}