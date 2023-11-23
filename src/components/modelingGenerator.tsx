"use client"
import { cache, useEffect, useState } from "react";




type props = {
    element : React.ReactNode[],
    parcour : parcours
}

export default function ModelingGenerator({element, parcour}: props){
    const [elements, setElement] = useState(element)
    return(
        <div className="flex flex-col gap-3 m-10">
            {elements.map((element)=> element)}
        </div>
    )

}
