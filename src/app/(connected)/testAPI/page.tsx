"use client"
import {useCallback, useState} from "react";
import {createComp} from "@/actions/CreateCompTest";
import {connectMongodb} from "@/lib/mongoConnect";


export default  function test() {
    const [name,setName]=useState("")

    const handleCreateOrder = useCallback(async () => {
        await connectMongodb();
        await createComp("bla");

    }, []);
    return(<>



            <button onClick={handleCreateOrder} type={"submit"}>Envoyer</button>





        </>

    )



}