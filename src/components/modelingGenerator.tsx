"use client";
import { cache, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {Clock, Door, DotsThreeOutlineVertical, ForkKnife} from "@phosphor-icons/react";
import {DndContext, closestCenter, DragEndEvent, closestCorners, DragOverlay, DragStartEvent} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
    rectSortingStrategy
} from "@dnd-kit/sortable"
import {
    EtapeType,
    EtapeTypeOver,
    GroupeEtapeType,
    GroupeEtapeTypeOver,
    Precedence, PrecedenceOver
} from "@/components/modelingComponents";

type props = {
    element: (GroupeEtapeType|EtapeType|sequencable)[],
    parcour: parcours
}

export default function ModelingGenerator({element, parcour}: props) {
    const [activeId, setActiveId] = useState(null)
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
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                // onDragOver={handleDragOver}
            >
                <SortableContext items={element.map((element) => element._id)} strategy={horizontalListSortingStrategy}>
                    {elements.map((element) => {
                        if(element.type === "EtapeType"){
                            const newElement : EtapeType = element
                            return <EtapeType key={newElement._id} etapeType={newElement}/>
                        }
                        else if (element.type == "GroupeEtapeType"){
                            const newElement : GroupeEtapeType = element
                            return <GroupeEtapeType key={newElement._id} groupeEtapeType={newElement} />
                        }
                        else{
                            const newElement : precedence = element
                            return <Precedence key={newElement._id} precedence={newElement} />

                        }
                    })}
                </SortableContext>
                <DragOverlay>{getDragOverlay()}</DragOverlay>
            </DndContext>
        </div>

    )

    function getDragOverlay(){
        if (!activeId) {
            return null;
        }

        if (isGroupeEtape(activeId)) {
            const element = elements.find((element) => element._id === activeId);

            return <GroupeEtapeTypeOver groupeEtapeType={element}/>
        }
        else if(isEtapeType(activeId)){
            const element = elements.find((element) => element._id === activeId);
            return <EtapeTypeOver etapeType={element}/>
        }
        else{
            const element = elements.find((element) => element._id === activeId);
            return <PrecedenceOver precedence={element}/>
        }


    }

    function isGroupeEtape (id:string){
        const element = elements.find((element) => element._id === id);

        return !!(element && element.type === "GroupeEtapeType");

    }

    function isEtapeType (id:string){
        const element = elements.find((element) => element._id === id);

        return !!(element && element.type === "EtapeType");

    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const { id } = active;
        console.log("start:" + id)
        setActiveId(id);
    }

    function handleDragOver(event) {
        const { active, over, draggingRect } = event;
        const { id } = active;
        let overId;
        if (over) {
            overId = over.id;
        }

        const overIsGroupeEtapeType = isGroupeEtape(overId);
        const activeIsGroupeEtapeType = isGroupeEtape(id);

        if (overIsGroupeEtapeType && !activeIsGroupeEtapeType) {

        }
        else if (!overIsGroupeEtapeType && activeIsGroupeEtapeType) {

        }
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        const { id } = active;
        let overId;
        if (over) {
            overId = over.id;
        }

        const activeIndex = elements.findIndex((element) => element._id === id);
        const overIndex = elements.findIndex((element) => element._id === overId);

        let newIndex = overIndex >= 0 ? overIndex : 0;

        if (activeIndex !== overIndex) {
            setElement((prev) => (arrayMove(prev, activeIndex, newIndex)
            ));
        }

        setActiveId(null);
        // console.log(event.over)


        // Vérifie si l'élément est déplacé du groupeEtapeType vers le sortable principal
        /*if (active.id !== over.id && over.id === 'sortable1') {
            const draggedItemId = active.id; // Identifiant de l'élément déplacé

            // Retirer l'élément déplacé de la liste groupeEtapeType
            const updatedElements = elements.filter((element) => element._id !== draggedItemId);

            // Mettre à jour les éléments dans le state
            setElement(updatedElements);
        }*/
    }
}
