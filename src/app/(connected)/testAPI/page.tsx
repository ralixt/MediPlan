"use client"
import {useCallback, useEffect, useState} from "react";
import {createComp, createRessou, getComp} from "@/actions/CreateCompTest";
import {Ressource} from "@/app/models/ressource"
import {connectMongodb} from "@/lib/mongoConnect";


export default  function test() {
    const [name,setName]=useState("")
    const [nameComp,setNameComp]=useState("")
    const [type,setType]=useState("")
    const [competence,setCompetence]=useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCompetence = await getComp();
                setCompetence(fetchedCompetence);
            } catch (error) {
                console.error("Error fetching competence:", error);
            }
        };

        fetchData();
    }, []);
    const handleCreateOrder=async ()=>{



        await createRessou(name,type);


        // After creating the competence, you might want to fetch the updated list.

        };

    const handleCreateOrderComp=async ()=>{

            const formData=new FormData();
            formData.append('nom',nameComp)

        await createComp(formData);



    };


    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleNameCompChange = (event) => {
        setNameComp(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
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


        {console.log(competence.map((c) => c.nom))};





        </>

    )



}