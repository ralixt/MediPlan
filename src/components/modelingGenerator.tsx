"use client"
import { cache, useState } from "react";
import { promises as fs } from 'fs';


const getParcours = cache(async () => {
    const file = await fs.readFile(process.cwd() + '/temporary/BDD.json', 'utf8');
    const data :parcours = JSON.parse(file);
    return data
})

const generate = ((parcours : parcours) => {
    
})

type props = {
    uid : string
}

export default function ModelingGenerator({uid}: props){
    const [elements, setElement] = useState([])
    const parcours = getParcours()
}
