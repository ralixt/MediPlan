"use client";

import {
    Clock,
    Door,
    DotsThreeOutlineVertical,
    ForkKnife, PencilSimpleLine, Plus,
    User, X,
} from "@phosphor-icons/react";
import {cache, useEffect, useState} from "react";
import {getAllParcoursType} from "@/actions/ParcoursType";
import fs from "fs/promises";
import {deleteEtapeTypeById, getAllEtapeType, updateEtapeType} from "@/actions/EtapeType";
import etapeType from "@/app/models/etapeType";
import {getComp, getLieu, getMateriel} from "@/actions/CreateCompTest";

// type propsET = {
//     etapeType: EtapeType;
// };

// export function EtapeTypeCompact({ etapeType }: propsET) {
export function EtapeTypeCompact({etape,SetEtapes}) {

    const [showOptions, setShowOptions] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showModifierForm, setShowModifierForm] = useState(false);

    const [nameEtapeType, setNameEtapeType] = useState("");
    const [type, setType] = useState("");
    const [competenceId, setCompetenceId] = useState("");
    const [lieuId, setLieuId] = useState("");
    const [materielId, setMaterielId] = useState("");
    const [AJeun, setAJeun] = useState(false);
    const [Duree, setDuree] = useState("");
    const [competence,setCompetence]=useState([])
    const [lieu,setLieu]=useState([])
    const [materiel,setMateriel]=useState([])
    const formData = {
        name:nameEtapeType,
        type:  type,
        duree: Duree,
        Competence: competenceId,
        Lieu: lieuId,
        Materiel: materielId,
        a_jeun: AJeun,

    };


    const handleEtapeTypeChangeCompetence = async (event) => {
        setCompetenceId(event.target.value)
    }


    const handleEtapeTypeChangeMateriel = (event) => {
        setMaterielId(event.target.value);
    };



    const handleOptionsClick = () => {
        setShowOptions(!showOptions);
        setConfirmDelete(false);
    };


    const handleModifierClick = () => {
        setShowModifierForm(true);
        setShowOptions(false);
        setConfirmDelete(false);
    };

    const handleSupprimerClick = () => {

        setConfirmDelete(true);
        setShowModifierForm(false);
    };

    const handleRetourClick = () => {
        setShowOptions(false);
        setConfirmDelete(false);
    };

    const handleConfirmationClick = async (event) => {
        event.preventDefault()
        await deleteEtapeTypeById(etape._id)
        console.log("Supprimer confirmed");

        setShowOptions(false);
        setConfirmDelete(false);

        SetEtapes((prevEtapeType) =>
            prevEtapeType.filter((et) => et._id !== etape._id)
        );
    };

    const handleAnnulerClick = () => {
        // Annuler la suppression
        setConfirmDelete(false);
    };


    useEffect(() => {

        const fetchDataComp = async () => {
            try {
                const fetchedCompetence = await getComp();
                setCompetence(fetchedCompetence);
            } catch (error) {
                console.error("Erreur de fetch:", error);
            }
        };

        const fetchDataLieu = async () => {
            try {
                const fetchedLieu = await getLieu();

                setLieu(fetchedLieu);
            } catch (error) {
                console.error("Error de fetch Lieu:", error);
            }
        };

        const fetchDataMateriel = async () => {
            try {
                const fetchedMateriel = await getMateriel();
                setMateriel(fetchedMateriel);
            } catch (error) {
                console.error("Erreur de fetch Materiel:", error);
            }
        };


        fetchDataComp();
        fetchDataLieu();
        fetchDataMateriel();
        setNameEtapeType(etape.name);
        setType(etape.type);
        setCompetenceId(etape.Competence[0]._id);
        setLieuId(etape.Lieu[0]._id);
        setMaterielId(etape.Materiel[0]._id);
        setAJeun(etape.a_jeun);
        setDuree(etape.duree);
    }, [etape]);




    const handleUpdateEtapeType = async (event) => {





        event.preventDefault()


        await updateEtapeType(etape._id, formData);


        setShowModifierForm(false);

        window.location.reload()





    };

    return <>


        {showModifierForm && (
           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
               <div className="bg-white p-8 rounded shadow-md relative flex flex-col items-center w-[400px]">
                   <form  >
                       <div className="flex flex-col p-6 space-y-4 bg-white rounded-md shadow-md">
                           <h2 className="text-lg font-semibold text-center">Ajouter une nouvelle étape type</h2>
                           <div className="flex flex-row w-full border-b-2 mb-8 font-bold border-black mb-10">
                               <input id="stepName" type="text" className="w-full outline-none bg-white text-2xl"
                                      placeholder="Nom de l'étape" value={nameEtapeType} onChange={(e) => {
                                   setNameEtapeType(e.target.value)
                               }}/>
                           </div>
                           <div className="flex flex-row w-full border-b-2 mb-8 mb-10">
                               <input id="time" type="number" className="w-full outline-none bg-white"
                                      placeholder="Temps" value={Duree} onChange={(e) => {
                                   setDuree(e.target.value)
                               }}></input>
                               <Clock size={24}/>
                           </div>
                           <div>
                               <label className="flex switch">
                                   <input id="fasting" type="checkbox" name="aJeun" checked={AJeun}
                                          onChange={() => setAJeun(AJeun => !AJeun)}/>
                                   <span className="slider round"></span>
                               </label>
                               <label htmlFor="fasting" className="font-medium text-center">À jeun</label>
                           </div>
                           <div className="flex flex-row w-full border-b-2 mb-8">
                               <select id="lieuId" name="lieuId" value={lieuId} onChange={(e) => {
                                   setLieuId(e.target.value)
                               }}  className="w-full outline-none bg-white">
                                   <option value="" disabled>Sélectionnez un lieu</option>
                                   {lieu.map((l) => (
                                       <option key={l._id} value={l._id}>{l.nom}</option>
                                   ))}
                               </select>
                               <Door size={24}/>
                           </div>
                           <div className="flex flex-row w-full border-b-2 mb-8">
                               <select id="competenceId" name="competenceId" value={competenceId}
                                       onChange={handleEtapeTypeChangeCompetence}
                                       className="w-full outline-none bg-white">
                                   <option value="" disabled>
                                       Sélectionnez une compétence requise
                                   </option>
                                   {competence.map((comp) => (
                                       <option key={comp._id} value={comp._id}>
                                           {comp.nom}
                                       </option>
                                   ))}
                               </select>
                               <User size={24}/>
                           </div>
                           <div className="flex flex-row w-full border-b-2 mb-8">
                               <select id="materielId" name="materielId" value={materielId}
                                       onChange={handleEtapeTypeChangeMateriel}
                                       className="w-full outline-none bg-white">
                                   <option value="" disabled>Sélectionnez un materiel</option>
                                   {materiel.map((m) => (
                                       <option value={m._id}>{m.nom}</option>
                                   ))}
                               </select>
                           </div>
                           <div className="flex flex-auto justify-center space-x-4">
                               <button className="px-4 py-2 text-white bg-gray-400 rounded-md">Annuler</button>
                               <button onClick={handleUpdateEtapeType} type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Ajouter
                               </button>
                           </div>
                       </div>
                   </form>
               </div>
           </div>
        )}

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
            className="flex flex-row justify-between items-center bg-lightlightgrey shadow-lg rounded-3xl px-8 py-4 w-full h-20 mr-4"
            // ref={setNodeRef}
            // {...listeners}
            // {...attributes}
            // style={style}
        >
            {/*<h2 className="font-bold">{etapeType.name}</h2>*/}
            <h2 className="font-bold text-3xl flex items-center justify-center whitespace-nowrap">{etape.name}</h2>
            <div className="text-xs ml-4 mr-12">
                <div className="flex flex-row items-center">
                    <Clock size={16}/>
                    <p className="ml-2">{etape.duree}</p>'
                </div>

                {/*{etapeType.aJeun && (*/}
                {etape.a_jeun &&
                    <div className="flex flex-row items-center mt-2">
                        <ForkKnife size={16}/>
                        <p className="ml-2">AJeun</p>
                    </div>
                }
                {/*)}*/}

                <div className="flex flex-row items-center mt-2">
                    <Door size={16}/>
                    {/*<p className="ml-2">{etapeType.lieux}</p>*/}
                    <p className="ml-2 whitespace-nowrap">{etape.Lieu[0].nom}</p>
                </div>

                <div className="flex flex-row items-center mt-2">
                    <User size={16}/>
                    {/*<p className="ml-2">{etapeType.competences}</p>*/}
                    <p className="ml-2 whitespace-nowrap">{etape.Competence[0].nom}</p>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button className="rounded-full">
                    <DotsThreeOutlineVertical size={32} weight="fill" color="#009BD4" onClick={handleOptionsClick}/>
                </button>
            </div>
        </div>

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
        <div className="w-11/12 bg-white p-4 mb-4 shadow-lg rounded-3xl">
            {/*max-h-52*/}
            <div className="flex flex-row w-full pb-4 justify-between">
                <div className="border-2 border-dashed h-20 border-grey rounded-3xl p-6 text-grey text-bold">
                    <p className="mx-auto my-auto">Bloc d'étapes</p>
                </div>
                <div className="w-96 h-20 bg-light-blue flex flex-row items-center justify-center rounded-3xl">
                    <PencilSimpleLine size={32}/>
                    <p className="font-bold ml-4">Lier</p>
                </div>

                <div className="w-20 h-20 bg-dark-blue rounded-3xl flex items-center justify-center">
                    <Plus size={32}/>
                </div>

                <div className="w-20 h-20 bg-light-blue rounded-3xl flex items-center justify-center">
                    <X size={32} />
                </div>

            </div>

            <div className="flex flex-row overflow-y-auto h-24">
            {
                    EtapeType.map(((etapes) =>
                            <EtapeTypeCompact etape={etapes} SetEtapes={setEtapeType}/>

                    ))
                }
            </div>


        </div>

    )
}