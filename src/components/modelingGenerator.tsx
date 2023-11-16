"use client"
import { cache, useEffect, useState } from "react";




type props = {
    element : React.ReactNode[],
    parcour : parcours
}

export default function ModelingGenerator({element, parcour}: props){
    const [elements, setElement] = useState(element)
    let parcours = parcour
    return(<p>bonjour</p>)

}
