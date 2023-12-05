"use client"
import { cache, useEffect, useState } from "react";




type props = {
    element : React.ReactNode[],
    parcour : parcours
}

export default function ModelingGenerator({element, parcour}: props){
    const [elements, setElement] = useState(element)
    return(
        <div 
            className="flex flex-row gap-56 w-full overflow-x-scroll px-48 h-full items-center"
            onWheel={(e) => {
                e.preventDefault();
                const container = e.currentTarget;
                const delta = Math.max(-1, Math.min(1, e.deltaY));
                container.scrollLeft += delta * 100; // Ajustez la valeur pour contrôler la vitesse du défilement horizontal
              }}
        >
            {elements.map((element)=> element)}
        </div>
    )

}
