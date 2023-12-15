"use client";
import { cache, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {Clock, Door, DotsThreeOutlineVertical, ForkKnife} from "@phosphor-icons/react";
import {DndContext, closestCenter, DragEndEvent, closestCorners} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
    rectSortingStrategy
} from "@dnd-kit/sortable"
import {EtapeType, GroupeEtapeType, Precedence} from "@/components/modelingComponents";

type props = {
    element: (GroupeEtapeType|EtapeType|sequencable)[],
    parcour: parcours
}

export default function ModelingGenerator({element, parcour}: props) {
    const [elements, setElement] = useState(element)

    return (
        <div
            className="flex flex-row gap-56 w-full overflow-x-scroll px-48 h-full items-center"
            onWheel={(e) => {
                e.preventDefault();
                const container = e.currentTarget;
                const delta = Math.max(-1, Math.min(1, e.deltaY));
                container.scrollLeft += delta * 100; // Ajustez la valeur pour contrôler la vitesse du défilement horizontal
            }}>
            <DndContext
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={element.map((element) => element.uid)} strategy={horizontalListSortingStrategy}>
                    {elements.map((element) => {
                        if(element.type === "EtapeType"){
                            const newElement : EtapeType = element
                            return <EtapeType key={newElement.uid} etapeType={newElement}/>
                        }
                        else if (element.type == "GroupeEtapeType"){
                            const newElement : GroupeEtapeType = element
                            return <GroupeEtapeType key={newElement.uid} groupeEtapeType={newElement} />
                        }
                        else{
                            const newElement : precedence = element
                            return <Precedence key={newElement.uid} precedence={newElement} />

                        }
                    })}
                </SortableContext>
            </DndContext>
        </div>

    )

    function handleDragEnd(event: DragEndEvent) {

        // console.log(event.over)

        const { active, over } = event;

        // Vérifie si l'élément est déplacé du groupeEtapeType vers le sortable principal
        if (active.id !== over.id && over.id === 'sortable1') {
            const draggedItemId = active.id; // Identifiant de l'élément déplacé

            // Retirer l'élément déplacé de la liste groupeEtapeType
            const updatedElements = elements.filter((element) => element.uid !== draggedItemId);

            // Mettre à jour les éléments dans le state
            setElement(updatedElements);
        }
    }
}
