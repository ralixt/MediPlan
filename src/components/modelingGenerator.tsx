"use client"
import {cache, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {Clock, Door, DotsThreeOutlineVertical, ForkKnife} from "@phosphor-icons/react";
import {DndContext, closestCenter, DragEndEvent} from "@dnd-kit/core"
import {arrayMove, SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy} from  "@dnd-kit/sortable"

type props = {
    element: React.ReactNode[],
    parcour: parcours
}

export default function ModelingGenerator({element, parcour}: props) {
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
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={}>
                  {elements.map((element)=> element)}
                </SortableContext>

            </DndContext>
        </div>


    )

    function handleDragEnd(event:DragEndEvent) {

        console.log(event.over)
    }

}
