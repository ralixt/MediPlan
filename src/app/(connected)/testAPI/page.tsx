"use client"
import {useCallback, useEffect, useState} from "react";
import {createComp, createRessou, getComp, getLieu, getMateriel} from "@/actions/CreateCompTest";
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


        <form action={handleCreateOrder} >
            <input type="text" value={name} onChange={handleNameChange}    />
            <input type="text" value={type} onChange={handleTypeChange}    />
            <button  type={"submit"}>EnvoyerRessou</button>
        </form>


            <form action={handleCreateOrderComp} >
                <input type="text" value={nameComp} onChange={handleNameCompChange}    />

                <button  type={"submit"}>EnvoyerComp</button>
            </form>


            <form action={handleCreateEtapeType}>
                <label htmlFor="name">Nom:</label>
                <input type="text" id="name" name="name" value={nameEtapeType} onChange={handleNameEtapeTypeChange} required /><br />

                <label htmlFor="type">Type:</label>
                <select id="type" name="type" value={typeEtapeType} onChange={handleTypeEtapeTypeChange}  required>
                    <option value="EtapeType">EtapeType</option>
                    <option value="GroupeEtapeType">GroupeEtapeType</option>
                </select><br />
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

                <label htmlFor="lieuId">Lieu:</label>
                <select id="lieuId" name="lieuId" value={lieuId} onChange={handleEtapeTypeChangeLieu} required>
                    <option value="" disabled>Sélectionnez un lieu</option>
                    {lieu.map((l) => (
                        <option key={l._id} value={l._id}>{l.nom}</option>
                    ))}
                </select><br />

                <select id="materielId" name="materielId" value={materielId} onChange={handleEtapeTypeChangeMateriel}  required>
                    <option value="" disabled>Sélectionnez un materiel</option>
                    {materiel.map((m) => (
                        <option value={m._id}>{m.nom}</option>
                    ))}
                </select><br />
                <button type={"submit"}>Envoyer</button>

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



            {console.log(parcoursType.map((c) => c))};


            <div className="container">

                <form className="form" action={handleCreateParcoursType}>


                    <h2>Étapes Type</h2>
                    <div className="etapes-list">
                        {etapeType.map((c) => (
                            <div key={c._id} className="etape-item">
                                <p>{c.name}</p>
                                <button type="button" onClick={() => handleAddEtapeToParcours(c._id)}>Ajouter à
                                    Parcours
                                </button><br/>

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
                            <button type="button" onClick={handleAddPrecedence} className="add-precedence-btn">Ajouter Précédence</button>
                        </div>
                    }

                    {precedences.length > 0 &&
                        <div>
                            <h3>Précédences</h3>
                            {precedences.map((precedence, index) => (
                                <p key={index} className="precedence">{precedence.antecedent} précède {precedence.successeur}</p>
                            ))}
                        </div>
                    }

                    <button type="submit" className="submit-btn">Créer Parcours</button>
                </form>

            </div>


        </>

    )



}