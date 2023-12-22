"use client"
import {useCallback, useEffect, useState} from "react";
import {createComp, createRessou, deleteRessource, getComp, getLieu, getMateriel} from "@/actions/CreateCompTest";
import {Ressource} from "@/app/models/ressource"
import {connectMongodb} from "@/lib/mongoConnect";
import {
    createEtapeType,
    deleteEtapeType,
    getAllEtapeType,
    getCompetenceByName,
    getRessourceByName
} from "@/actions/EtapeType";
import {createParcoursType, getAllParcoursType} from "@/actions/ParcoursType";
import "./test.css"
import {flatted} from "flatted";
import {CreateUser} from "@/actions/Compte";
import {Clock, Door, DotsThreeOutlineVertical, ForkKnife, User} from "@phosphor-icons/react";


export default  function test() {
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

        const fetchDeleteRessource = async () => {
            try {
            await deleteRessource()
            } catch (error) {
                console.error("Erreur de suppression ressource :", error);
            }
        };

        const fetchDeleteEtapeType = async () => {
            try {
                await deleteEtapeType()
            } catch (error) {
                console.error("Erreur de suppression etape type :", error);
            }
        };




        fetchDataComp();
        fetchDataLieu();
        fetchDataMateriel();
        fetchDataEtapeType();
        fetchDataParcoursType();
     //   fetchDeleteEtapeType();
       // fetchDeleteRessource();
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


    const handleEtapeTypeChangeLieu = (event) => {
        setLieuId(event.target.value);
    };

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
            <form action={handleCreateOrder}>
                <input type="text" value={name} onChange={handleNameChange}/>
                <select value={type} onChange={handleTypeChange}>
                    <option value="personnel">personnel</option>    
                    <option value="materiel">matériel</option>
                    <option value="lieu">lieu</option>
                </select>        
                <button type={"submit"}>EnvoyerRessource</button>
            </form>


            <form action={handleCreateOrderComp}>
                <input type="text" value={nameComp} onChange={handleNameCompChange}/>

                <button type={"submit"}>EnvoyerCompetence</button>
            </form>


            <form action={handleCreateEtapeType} className="rounded-lg ShadowGlobal">
                <h2 className="text-center">Ajouter une nouvelle Etape Type</h2>


                <div className="input-container">
                    <label htmlFor="name" className={nameEtapeType ? 'input-label moved' : 'input-label'}>Nom :</label>
                    <input type="text" id="name" name="name" value={nameEtapeType} onChange={handleNameEtapeTypeChange}
                           required className="input-field"/>
                </div>

                <label htmlFor="type">Type:</label>
                <select id="type" name="type" value={typeEtapeType} onChange={handleTypeEtapeTypeChange} required>
                    <option value="EtapeType">EtapeType</option>
                    <option value="GroupeEtapeType">GroupeEtapeType</option>
                </select>
                

                <label htmlFor="lieuId">Lieu:</label>
                <select id="lieuId" name="lieuId" value={lieuId} onChange={handleEtapeTypeChangeLieu} required>
                    <option value="" disabled>Sélectionnez un lieu</option>
                    {lieu.map((l) => (
                        <option key={l._id} value={l._id}>{l.nom}</option>
                    ))}
                </select>
                <select
                    id="competenceId"
                    name="competenceId"
                    value={competenceId}
                    onChange={handleEtapeTypeChangeCompetence}
                    required
                >
                    <option value="" disabled>
                        Sélectionnez une compétence
                    </option>
                    {competence.map((comp) => (
                        <option key={comp._id} value={comp.nom}>
                            {comp.nom}
                        </option>
                    ))}
                </select>

                <select id="materielId" name="materielId" value={materielId} onChange={handleEtapeTypeChangeMateriel}
                        required>
                    <option value="" disabled>Sélectionnez un materiel</option>
                    {materiel.map((m) => (
                        <option value={m._id}>{m.nom}</option>
                    ))}
                </select>
                

            </form>
            <form>
            <div className="flex flex-col p-6 space-y-4 bg-white rounded-md shadow-md">
                <h2 className="text-lg font-semibold text-center">Ajouter une nouvelle étape type</h2>
                <div className="flex items-center space-x-2">
                    <label htmlFor="stepName" className="font-medium">Nom de l’étape</label>
                    <input id="stepName" type="text" className="flex-grow p-2 border rounded-md"/>
                </div>
                <div className="flex items-center space-x-2">
                    <label htmlFor="time" className="font-medium">Temps</label>
                    <select id="time" className="flex-grow p-2 border rounded-md">
                    <option>Sélectionnez le temps</option>
                    </select>
                </div>
                <div>
                    <label className="flex switch">
                        <input id="fasting" type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                    <label htmlFor="fasting" className="font-medium items-end">À jeun</label>
                </div>
                <div className="flex items-center space-x-2">
                    <label htmlFor="staff" className="font-medium">Personnel (facultatif)</label>
                    <input id="staff" type="text" className="flex-grow p-2 border rounded-md"/>
                </div>
                <div className="flex flex-auto justify-center space-x-4">
                    <button className="px-4 py-2 text-white bg-gray-400 rounded-md">Annuler</button>
                    <button type={"submit"} className="px-4 py-2 text-white bg-blue-500 rounded-md">Ajouter</button>
                </div>
                </div>
            </form>
            <div>
                <h2>Etape Type</h2>
                {etapeType.map((c) => (
                    <div key={c._id}>
                        <p>{c.name}</p>

                        <button onClick={() => deleteEtapeType(c._id)}>supprimer</button>
                    </div>
                ))}
            </div>


            <div className="container">

                <form className="form" action={handleCreateParcoursType}>


                    <h2>Étapes Type</h2>
                    <div className="etapes-list">
                        {etapeType.map((c) => (
                            <div key={c._id} className="etape-item">
                                <p>{c.name}</p>
                                <button type="button" onClick={() => handleAddEtapeToParcours(c._id)}>Ajouter à
                                    Parcours
                                </button>
                                <br/>

                            </div>
                        ))}
                    </div>

                    {selectedEtapes.length > 0 &&
                        <div>
                            <h3>Étapes Sélectionnées</h3>
                            {selectedEtapes.map((etapeId) => (
                                <p key={etapeId} className="selected-etape">{etapeId}</p>
                            ))}
                        </div>
                    }

                    {selectedEtapes.length == 2 &&
                        <div>
                            <button type="button" onClick={handleAddPrecedence} className="add-precedence-btn">Ajouter
                                Précédence
                            </button>
                        </div>
                    }

                    {precedences.length > 0 &&
                        <div>
                            <h3>Précédences</h3>
                            {precedences.map((precedence, index) => (
                                <p key={index}
                                   className="precedence">{precedence.antecedent} précède {precedence.successeur}</p>
                            ))}
                        </div>
                    }

                    <button type="submit" className="submit-btn">Créer Parcours</button>
                </form>

            </div>


            <h1 className="text-xl font-bold my-4">Register</h1>

            <form action={handleSubmitCreateCompte}>
                <input
                    value={username}
                    onChange={handleUserNameChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Password"
                />
                <button type="submit">
                    Register
                </button>

            </form>


            <div className="bg-white shadow-md rounded-3xl p-4 flex flex-row"
            >
                <div>
                    <h1>hhhhh</h1>
                </div>
                <div className="flex-grow-0 space-y-2 mr-4 ">
                    <div className="flex flex-row items-center">
                        <Clock size={32}/>
                        21
                    </div>


                    <div className="flex flex-row items-center">
                        <ForkKnife size={32}/>
                        a jeun
                    </div>


                    <div className="flex flex-row items-center">
                        <Door size={32}/>
                        lieu
                    </div>

                    <div className="flex flex-row items-center">
                        <User size={32}/>
                        comp
                    </div>

                </div>
                <button className="rounded-full">
                    <DotsThreeOutlineVertical size={32} weight="fill" color="#009BD4"/>
                </button>

            </div>


            <div className="bg-white shadow-md rounded-3xl p-4 flex">
                <div className="mr-4">
                    <h1 className="font-bold text-lg">hhhhh</h1>
                </div>
                <div className="flex-grow space-y-2 mr-4">
                    <div className="flex items-center">
                        <svg className="h-8 w-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">

                        </svg>
                        21
                    </div>
                    <div className="flex items-center">
                        <svg className="h-8 w-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">

                        </svg>
                        a jeun
                    </div>
                    <div className="flex items-center">
                        <svg className="h-8 w-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">

                        </svg>
                        lieu
                    </div>
                    <div className="flex items-center">
                        <svg className="h-8 w-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">

                        </svg>
                        comp
                    </div>
                </div>
                <button className="rounded-full">
                    <svg className="h-8 w-8 fill-current text-blue-500" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                    </svg>
                </button>
            </div>


        </>

    )


}