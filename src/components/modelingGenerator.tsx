"use client"
import { cache, useState } from "react";
import { promises as fs } from 'fs';


const getParcours = cache(async () => {
    const response = await fetch('/temporary/BDD.json');
    const data: parcoursList  = await response.json();
    return data[0]
})

const generate = ((parcours : parcours) => {
    const etapesTypes = []
    const groupesEtapesType = []
    for(let sequencable of parcours.sequencables as sequencable[]){
        if(sequencable.type == "EtapeType"){
            etapesTypes.push(sequencable)
        }
        else{
            groupesEtapesType
        }
    }
    
})

type props = {
    uid : string
}

export default function ModelingGenerator({uid}: props){
    const [elements, setElement] = useState([])
    const parcours = getParcours()
}
