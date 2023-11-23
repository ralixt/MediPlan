"use client"
import {useCallback, useState} from "react";
import {createComp} from "@/actions/CreateCompTest";
import {connectMongodb} from "@/lib/mongoConnect";


export default  function test() {
    const [name,setName]=useState("")



    const handleCreateOrder=async ()=>{



        await createComp(name);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    return(<>


        <form action={handleCreateOrder} >
            <input type="text" value={name} onChange={handleNameChange}    />
            <button  type={"submit"}>Envoyer</button>
        </form>






        </>

    )



}