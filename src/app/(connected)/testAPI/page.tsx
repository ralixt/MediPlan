"use client"
import {useCallback, useEffect, useState} from "react";
import {createComp, createRessou, getComp, getLieu, getMateriel} from "@/actions/CreateCompTest";
import {Ressource} from "@/app/models/ressource"
import {connectMongodb} from "@/lib/mongoConnect";
import {createEtapeType, getCompetenceByName, getRessourceByName} from "@/actions/EtapeType";


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
        fetchDataMateriel()
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


        {console.log(materiel.map((c) => c))};





        </>

    )



}