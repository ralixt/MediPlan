"use client"
import {Clock, Door, DotsThreeOutlineVertical, ForkKnife, User} from "@phosphor-icons/react";

type propsET = {
    etapeType : EtapeType
}
export function EtapeType({etapeType}: propsET){
    return(

    <div className="bg-white shadow-md rounded-3xl p-4 w-52 h-64">
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
    return (
        <div className="border-2 border-lightgrey rounded-2xl border-dashed p-4 flex flex-row">
            <p>Groupe Etape Type: {groupeEtapeType.name} :</p>
            {groupeEtapeType.Etapes.map((etape:sequencable) =>
                // <p>{etape.name}</p>
                <EtapeType etapeType={etape}/>
            )}
            <p>fin Groupe Etape</p>
        </div> 
    )
}

type propsP = {
    precedence : precedence
}

export function Precedence({precedence} : propsP){
    return(
        <p>precedence: {precedence.name}</p>
    )
}