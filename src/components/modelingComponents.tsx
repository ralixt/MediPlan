"use client"
import {Clock, Door, DotsThreeOutlineVertical, ForkKnife, User} from "@phosphor-icons/react";
import {DndContext, useDraggable, useDroppable} from '@dnd-kit/core';
import {set} from "mongoose";
import {CSS} from '@dnd-kit/utilities';
import {horizontalListSortingStrategy, rectSortingStrategy, SortableContext, useSortable} from "@dnd-kit/sortable";

type propsET = {
    etapeType : EtapeType
}
export function EtapeType({etapeType}: propsET){
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: etapeType._id,
    });
    const style = {
        transform: CSS.Translate.toString(transform), transition
    }
    return(

    <div className="bg-white shadow-md rounded-3xl p-4 w-52 h-64" ref={setNodeRef} {...listeners} {...attributes} style={style} >
        <h1>{etapeType.name}</h1>

        <div>
            <div className="flex flex-row items-center">
                <Clock size={32}/>
                {etapeType.duree}
            </div>

            {etapeType.aJeun && (
                <div className="flex flex-row items-center">
                    <ForkKnife size={32}/>
                    {etapeType.aJeun}
                </div>
            )}

            <div className="flex flex-row items-center">
                <Door size={32}/>
                {etapeType.lieux}
            </div>

            <div className="flex flex-row items-center">
                <User size={32} />
                {etapeType.competences}
            </div>

        </div>
        <button className="rounded-full">
            <DotsThreeOutlineVertical size={32}  weight="fill" color="#009BD4"/>
        </button>

    </div>
    )
}

export function EtapeTypeOver({etapeType}: propsET){
    return (
        <div className="bg-white shadow-md rounded-3xl p-4 w-52 h-64" >
            <h1>{etapeType.name}</h1>

            <div>
                <div className="flex flex-row items-center">
                    <Clock size={32}/>
                    {etapeType.duree}
                </div>

                {etapeType.aJeun && (
                    <div className="flex flex-row items-center">
                        <ForkKnife size={32}/>
                        {etapeType.aJeun}
                    </div>
                )}

                <div className="flex flex-row items-center">
                    <Door size={32}/>
                    {etapeType.lieux}
                </div>

                <div className="flex flex-row items-center">
                    <User size={32} />
                    {etapeType.competences}
                </div>

            </div>
            <button className="rounded-full">
                <DotsThreeOutlineVertical size={32}  weight="fill" color="#009BD4"/>
            </button>

        </div>
    )
}
type propsGET = {
    groupeEtapeType:GroupeEtapeType
}
export function GroupeEtapeType({groupeEtapeType}:propsGET){
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: groupeEtapeType._id,
    });
    const droppable = useDroppable({id : groupeEtapeType._id})
    const style = {
        transform: CSS.Translate.toString(transform), transition
    }
    return (
        <div className="border-2 border-lightgrey rounded-2xl border-dashed p-4 flex flex-row" ref={setNodeRef} {...listeners} {...attributes} style={style}>
            <p>Groupe Etape Type: {groupeEtapeType.name} :</p>
                <div ref={droppable.setNodeRef} className='flex flex-row'>
                    <DndContext>
                        <SortableContext items={groupeEtapeType.Etapes.map((etape) => etape._id)} strategy={horizontalListSortingStrategy}>
                                                {groupeEtapeType.Etapes.map((etape:sequencable) =>
                                                    // <p>{etape.name}</p>
                                                    <EtapeType etapeType={etape}/>
                                                )}
                        </SortableContext>
                    </DndContext>


                </div>

            <p>fin Groupe Etape</p>
        </div> 
    )
}

export function GroupeEtapeTypeOver({groupeEtapeType}:propsGET){
    return (
        <div className="border-2 border-lightgrey rounded-2xl border-dashed p-4 flex flex-row">
            <p>Groupe Etape Type: {groupeEtapeType.name} :</p>
            <div className='flex flex-row'>
                        {groupeEtapeType.Etapes.map((etape:sequencable) =>
                            // <p>{etape.name}</p>
                            <EtapeType etapeType={etape}/>
                        )}
            </div>
            <p>fin Groupe Etape</p>
        </div>
    )
}

type propsP = {
    precedence : precedence
}

export function Precedence({precedence} : propsP){
    const {attributes, listeners, setNodeRef, transform,transition} = useSortable({
        id: precedence._id,
    });
    const style = {
        transform: CSS.Translate.toString(transform), transition
    }
    return(
        <p ref={setNodeRef} {...listeners} {...attributes} style={style}>precedence: {precedence.name}</p>
    )
}

export function PrecedenceOver({precedence} : propsP){
    return(
        <p>precedence: {precedence.name}</p>
    )
}