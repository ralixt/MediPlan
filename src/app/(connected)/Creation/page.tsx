"use client"
import {useCallback, useEffect, useState} from "react";
import {createComp, createRessou, getComp, getLieu, getMateriel} from "@/actions/CreateCompTest";
import {Clock, Door, User, PersonSimple, PersonArmsSpread} from "@phosphor-icons/react";
import {
    createEtapeType
} from "@/actions/EtapeType";
import "./style.css"


export default function Creation(props) {
    const [name,setName]=useState("")
    const [nameComp,setNameComp]=useState("")
    const [type,setType]=useState("")
    const [competence,setCompetence]=useState([])
    const [nameEtapeType,setNameEtapeType]=useState("")
    const [lieu,setLieu]=useState([])
    const [materiel,setMateriel]=useState([])
    const [competenceId, setCompetenceId] = useState("");
    const [lieuId, setLieuId] = useState('');
    const [materielId, setMaterielId] = useState('');
    const [AJeun, setAJeun] = useState(false);
    const [Duree, setDuree] = useState();




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
    }, []);


    const handleCreateEtapeType=async ()=>{
        const formData=new FormData();
        formData.append('names',nameEtapeType)
        formData.append('type',"EtapeType")
        formData.append('competenceId',competenceId)
        formData.append('lieuId',lieuId)
        formData.append('materielId',materielId)
        formData.append("AJeun", AJeun)
        formData.append("duree", Duree)
        await createEtapeType(formData)
        props.fonctionClose()
    }

    const handleEtapeTypeChangeCompetence = async (event) => {
        setCompetenceId(event.target.value)
    }


    const handleEtapeTypeChangeMateriel = (event) => {
        setMaterielId(event.target.value);
    };



    return(<>
            <form action={handleCreateEtapeType}>
                <div className="flex flex-col p-6 space-y-4 bg-white rounded-md shadow-md container sm">
                    <h2 className="text-lg font-semibold text-center">Ajouter une nouvelle étape type</h2>
                    <div className="flex flex-row w-full border-b-2 mb-8 font-bold border-black mb-10">
                        <input id="stepName" type="text" className="w-full outline-none bg-white text-2xl" placeholder="Nom de l'étape" value={nameEtapeType} onChange={(e)=> {setNameEtapeType(e.target.value)}}/>
                    </div>
                    <div className="flex flex-row w-full border-b-2 mb-8 mb-10">
                        <input id="time" type="number" className="w-full outline-none bg-white" placeholder="Temps" value={Duree} onChange={(e)=> {setDuree(e.target.value)}}></input>
                        <Clock size={24}/>
                    </div>
                    <div>
                        <label className="flex switch" >
                            <input id="fasting" type="checkbox" name="aJeun" checked={AJeun} onChange={()=>setAJeun(AJeun => !AJeun)}/>
                            <span className="slider round" ></span>
                        </label>
                        <label htmlFor="fasting" className="font-medium text-center">À jeun</label>
                    </div>
                    <div className="flex flex-row w-full border-b-2 mb-8">
                        <select id="lieuId" name="lieuId" value={lieuId} onChange={(e)=> {setLieuId(e.target.value)}} required className="w-full outline-none bg-white">
                            <option value="" disabled>Sélectionnez un lieu</option>
                            {lieu.map((l) => (
                                <option key={l._id} value={l._id}>{l.nom}</option>
                            ))}
                        </select>
                        <Door size={24}/>
                    </div>
                    <div className="flex flex-row w-full border-b-2 mb-8">
                        <select id="competenceId" name="competenceId" value={competenceId} onChange={handleEtapeTypeChangeCompetence} required className="w-full outline-none bg-white">
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
                        <select id="materielId" name="materielId" value={materielId} onChange={handleEtapeTypeChangeMateriel} required className="w-full outline-none bg-white">
                            <option value="" disabled>Sélectionnez un materiel</option>
                            {materiel.map((m) => (
                                <option value={m._id}>{m.nom}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-auto justify-center space-x-4">
                        <button className="px-4 py-2 text-white bg-gray-400 rounded-md max-w-lg container" onClick={props.fonctionClose}>Annuler</button>
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md max-w-lg container">Ajouter</button>
                    </div>
                </div>
            </form>
        </>
    )
}