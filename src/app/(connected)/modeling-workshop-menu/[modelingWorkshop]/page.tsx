import ModelingGenerator from "@/components/modelingGenerator";
import { cache } from "react";
import fs from 'fs/promises';
import { EtapeType, GroupeEtapeType, Precedence } from "@/components/modelingComponents";
import { StaticImageData } from "next/image";

type props = {
    uid : string
}

export type NextPageProps<T = Record<string, string>> = {
    /**
     * The path parameters received 
     * e.g. : page/[slug] --> params.slug
     */
    params: T,
    /**
     * The HTTP query parameters received
     * e.g. : my-page?page=1&order=asc --> searchParams.page and searchParams.order
     */
    searchParams: { [key: string]: string | string[] | undefined }
  };

const getParcours = cache(async () => {
    const response = await fs.readFile('./public/temporary/BDD.json', 'utf-8');
    const data: parcoursList  = JSON.parse(response)
    return data[0]
})

const findIndex = ((tableaux : (Array<GroupeEtapeType | EtapeType | precedence>)[], uid : String) => {
    for(let indexG = 0; indexG< tableaux.length; indexG++){
        let index = tableaux[indexG].findIndex((value) => value.uid === uid)
        if(index !== -1){
            return {indexG, index}
        }
    }
    return -1
} )

const generate = ((parcours : parcours) => {
    let etapesTypes :EtapeType[] = parcours.sequencables.filter((sequencable): sequencable is EtapeType => sequencable.type == "EtapeType")
    let groupesEtapesType :GroupeEtapeType[] = parcours.sequencables.filter((sequencable): sequencable is GroupeEtapeType => sequencable.type == "GroupeEtapeType")
    for(let groupeEtapeType of groupesEtapesType){
        const groupEtapeTypeIds = groupeEtapeType.Etapes.map((etape) => etape.uid);
        etapesTypes = etapesTypes.filter((etapeType) => !groupEtapeTypeIds.includes(etapeType.uid))
    }
    let sequencables : (GroupeEtapeType|EtapeType)[] = etapesTypes
    sequencables = sequencables.concat(groupesEtapesType)

    const precedences : precedence[]= parcours.precedences
    const groupes: (Array<GroupeEtapeType | EtapeType | precedence>)[] = []

    for(let precedence of precedences){
        const indexS = findIndex(groupes, precedence.successeur)
        const indexA = findIndex(groupes, precedence.antecedent)

        if(indexS == -1 && indexA == -1){
            const antecedant  = sequencables.find((sequencable) => sequencable.uid == precedence.antecedent)
            const successeur = sequencables.find((sequencable) => sequencable.uid == precedence.successeur)
            if (antecedant !== undefined && successeur !== undefined) {
                groupes.push([antecedant, precedence, successeur]);
                const indexASupprimer = sequencables.findIndex((sequencable) => sequencable.uid === successeur.uid);
                const indexASupprimer2 = sequencables.findIndex((sequencable) => sequencable.uid === antecedant.uid);

                if (indexASupprimer !== -1 && indexASupprimer2 !==1) {
                    sequencables.splice(indexASupprimer, 1);
                    sequencables.splice(indexASupprimer2, 1);
                }
            }
        }
        else if (indexS == -1 && indexA !== -1){
            const successeur = sequencables.find((sequencable) => sequencable.uid == precedence.successeur)
            if(successeur !== undefined){
                groupes[indexA.indexG].splice(indexA.index+1,0, precedence, successeur)
                const indexASupprimer = sequencables.findIndex((sequencable) => sequencable.uid === successeur.uid);

                if (indexASupprimer !== -1) {
                    sequencables.splice(indexASupprimer, 1);
                }
            }
        }
        else if (indexS !== -1 && indexA == -1){
            const antecedant = sequencables.find((sequencable) => sequencable.uid == precedence.antecedent)
            if(antecedant !== undefined){
                groupes[indexS.indexG].splice(indexS.index,0, antecedant,precedence)
                const indexASupprimer = sequencables.findIndex((sequencable) => sequencable.uid === antecedant.uid);

                if (indexASupprimer !== -1) {
                    sequencables.splice(indexASupprimer, 1);
                }
            }
        }
        else if (indexS !== -1 && indexA !== -1){
            console.log("fusion")
            
            groupes[indexA.indexG] = groupes[indexA.indexG].concat(precedence,groupes[indexS.indexG])
            groupes.splice(indexS.indexG,1)
            console.log(groupes)
        }
    }

    groupes.sort((a, b) => b.length - a.length)
    const elementNode: React.ReactNode[] = []
    for(const groupe of groupes){
        for(const element of groupe){
            if(element.type === "EtapeType"){
                const newElement : EtapeType = element
                elementNode.push(<EtapeType etapeType={newElement}/>)
            }
            else if (element.type == "GroupeEtapeType"){
                const newElement : GroupeEtapeType = element
                elementNode.push(<GroupeEtapeType groupeEtapeType={newElement} />)
            }
            else{
                const newElement : precedence = element
                elementNode.push(<Precedence precedence={newElement} />)
            }
        }
    }
    for(let element of sequencables){
        if(element.type === "EtapeType"){
            const newElement : EtapeType = element
            elementNode.push(<EtapeType etapeType={newElement}/>)
        }
        else if (element.type == "GroupeEtapeType"){
            const newElement : GroupeEtapeType = element
            elementNode.push(<GroupeEtapeType groupeEtapeType={newElement} />)
        }
        else{
            const newElement : precedence = element
            elementNode.push(<Precedence precedence={newElement} />)
        }
    }
    
    return elementNode
})

export default async function ModelingWorkshop({params}: NextPageProps<props>){
    const parcours = await getParcours()
    const elements = generate(parcours)
    return (
        <ModelingGenerator element={elements} parcour={parcours}/>
    )
}

