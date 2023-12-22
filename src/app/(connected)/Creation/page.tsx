"use client"
import {useCallback, useEffect, useState} from "react";
import {createComp, createRessou, getComp, getLieu, getMateriel} from "@/actions/CreateCompTest";
import {Ressource} from "@/app/models/ressource"
import {connectMongodb} from "@/lib/mongoConnect";
import {Clock, Door, User, PersonSimple, PersonArmsSpread} from "@phosphor-icons/react";
import {
    createEtapeType,
    deleteEtapeType,
    getAllEtapeType,
    getCompetenceByName,
    getRessourceByName
} from "@/actions/EtapeType";
import {createParcoursType, getAllParcoursType} from "@/actions/ParcoursType";
import "./style.css"
import {flatted} from "flatted";
import {CreateUser} from "@/actions/Compte";


export default  function creation() {
    const [name,setName]=useState("")
    const [nameComp,setNameComp]=useState("")
    const [type,setType]=useState("")
    const [competence,setCompetence]=useState([])
    const [nameEtapeType,setNameEtapeType]=useState("")
    const [typeEtapeType,setTypeEtapeType]=useState("EtapeType")
    const [lieu,setLieu]=useState([])
    const [materiel,setMateriel]=useState([])
    const [competenceId, setCompetenceId] = useState('');
    const [lieuId, setLieuId] = useState('');
    const [materielId, setMaterielId] = useState('');
    const [etapeType,setEtapeType]=useState([]);
    const [parcoursType,setParcoursType]=useState([]);
    const [selectedEtapes, setSelectedEtapes] = useState([]);
    const [precedences, setPrecedences] = useState([]);
    const [parcoursName, setParcoursName] = useState('');
    const [etapesSelect,setEtapesSelect]=useState([])
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    const handleAddEtapeToParcours = (etapeId) => {
        console.log('Ajout etape to parcours:', etapeId);
        setSelectedEtapes([...selectedEtapes, etapeId]);
       const d = selectedEtapes

            setEtapesSelect([...etapesSelect, etapesSelect.includes(etapeId)? null:etapeId])

    };
    const handleAddSquencable = (etapeId) => {
        setSelectedEtapes([...selectedEtapes, etapeId]);
    };

    const handleAddPrecedence = () => {
        if (selectedEtapes.length === 2) {
            const [antecedent, successeur] = selectedEtapes;
            setPrecedences([...precedences, { antecedent, successeur }]);
            setSelectedEtapes([]);
        }
    };





    // const handleCreateParcoursType = async () => {
    //     // Crée le parcours type avec les étapes et les précédences
    //     const formData = new FormData();
    //     formData.append('name', parcoursName);
    //     formData.append('type', 'ParcoursType');
    //     formData.append('sequencables', JSON.stringify(etapesSelect)) ;
    //     formData.append('precedences', JSON.stringify(precedences) );
    //
    //     await createParcoursType(formData);
    //
    //     // Après la création, réinitialisez les séquencables et les précédences sélectionnées
    //     setSelectedEtapes([]);
    //     setEtapesSelect([])
    //     setPrecedences([]);
    // };

    const handleCreateParcoursType = async () => {
        // Crée le parcours type avec les étapes et les précédences
        const data = {
            name: '',
            type: 'ParcoursType',
            sequencables: etapesSelect,
            precedences: precedences
        };

        try {
            await createParcoursType(data);

            // Après la création, réinitialisez les séquencables et les précédences sélectionnées
            // setSelectedEtapes([]);
            // setEtapesSelect([]);
            // setPrecedences([]);
        } catch (error) {
            console.error('Erreur lors de la création du ParcoursType:', error);
        }
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

        const fetchDataEtapeType = async () => {
            try {
                const fetchedEtapeType = await getAllEtapeType();
                setEtapeType(fetchedEtapeType);
            } catch (error) {
                console.error("Erreur de fetch Etape type :", error);
            }
        };
        const fetchDataParcoursType = async () => {
            try {
                const fetchedParcoursType = await getAllParcoursType();
                setParcoursType(fetchedParcoursType);
            } catch (error) {
                console.error("Erreur de fetch Parcours type :", error);
            }
        };




        fetchDataComp();
        fetchDataLieu();
        fetchDataMateriel();
        fetchDataEtapeType();
        fetchDataParcoursType();
    }, []);

    const handleCreateOrder=async ()=>{
        await createRessou(name,type);

    };

    const handleCreateOrderComp=async ()=>{

            const formData=new FormData();
            formData.append('nom',nameComp)


        await createComp(formData);
    };

    const handleCreateEtapeType=async ()=>{
        const formData=new FormData();
        formData.append('names',nameEtapeType)
        formData.append('type',typeEtapeType)
        formData.append('competenceId',competenceId)
        formData.append('lieuId',lieuId)
        formData.append('materielId',materielId)
        await createEtapeType(formData)
    }


    const handleSubmitCreateCompte = async ()=>{
        const formData=new FormData();
        formData.append('username',username)
        formData.append('password',password)
       return  await CreateUser(formData)



    }


    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleNameCompChange = (event) => {
        setNameComp(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleNameEtapeTypeChange = (event) => {
        setNameEtapeType(event.target.value);
    };

    const handleUserNameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleTypeEtapeTypeChange = (event) => {
        setTypeEtapeType(event.target.value);
    };
   /* const handleEtapeTypeChangeCompetence = (event) => {
        setCompetenceId(event.target.value);
    };*/

    const handleEtapeTypeChangeCompetence = async (event) => {
        const selectedName = event.target.value;
        try {
            const competence = await getCompetenceByName(selectedName);
            setCompetenceId(competence._id);
        } catch (error) {
            console.error('Error fetching materiel by name:', error);
        }
    }
  /*  const handleEtapeTypeChangeMateriel = async (event) => {
        const selectedName = event.target.value;
        try {
            const materiel = await getRessourceByName(selectedName);
            setMaterielId(materiel._id);
        } catch (error) {
            console.error('Error fetching materiel by name:', error);
        }
    };*/

    const handleEtapeTypeChangeMateriel = (event) => {
        setMaterielId(event.target.value);
    };






    return(<>
            <form action={handleCreateEtapeType}>
                <div className="flex flex-col p-6 space-y-4 bg-white rounded-md shadow-md">
                    <h2 className="text-lg font-semibold text-center">Ajouter une nouvelle étape type</h2>
                    <div className="flex flex-row w-full border-b-2 mb-8 font-bold border-black mb-10">
                        <input id="stepName" type="text" className="w-full outline-none bg-white text-2xl" placeholder="Nom de l'étape"/>
                    </div>
                    <div className="flex flex-row w-full border-b-2 mb-8 mb-10">
                        <input id="time" className="w-full outline-none bg-white" placeholder="Temps"></input>
                        <Clock size={24}/>
                    </div>
                    <div>
                        <label className="flex switch">
                            <input id="fasting" type="checkbox"/>
                            <span className="slider round"></span>
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
                                <option key={comp._id} value={comp.nom}>
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
                        <button className="px-4 py-2 text-white bg-gray-400 rounded-md">Annuler</button>
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md">Ajouter</button>
                    </div>
                </div>
            </form>
        </>

    )


}