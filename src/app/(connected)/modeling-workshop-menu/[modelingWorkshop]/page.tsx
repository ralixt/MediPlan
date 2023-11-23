import ModelingGenerator from "@/components/modelingGenerator";
import { cache } from "react";
import fs from 'fs/promises';
import { EtapeType, GroupeEtapeType, Precedence } from "@/components/modelingComponents";

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

const generate = ((parcours : parcours) => {
    const precedences : precedence[]= parcours.precedences
    const sequencables : (GroupeEtapeType|EtapeType)[] = parcours.sequencables
    const elements : (GroupeEtapeType| EtapeType | precedence)[] = []
    for(let precedence of precedences){
        const indexS = elements.findIndex(x => x.uid === precedence.successeur);
        const indexA = elements.findIndex(x => x.uid === precedence.antecedent);
        if(indexS == -1 && indexA == -1){
            const antecedant  = sequencables.find((sequencable) => sequencable.uid == precedence.antecedent)
            const successeur = sequencables.find((sequencable) => sequencable.uid == precedence.successeur)
            if (antecedant !== undefined && successeur !== undefined) {
                elements.push(antecedant, precedence, successeur);
            }
        }
        else if (indexS == -1 && indexA > -1){
            const successeur = sequencables.find((sequencable) => sequencable.uid == precedence.successeur)
            if(successeur !== undefined){
                elements.splice(indexA+1,0, precedence, successeur)
            }
        }
        else if (indexS > -1 && indexA == -1){
            const antecedant = sequencables.find((sequencable) => sequencable.uid == precedence.antecedent)
            if(antecedant !== undefined){
                elements.splice(indexS,0, antecedant,precedence)
            }
        }
    }
    const elementNode: React.ReactNode[] = []
    for(const element of elements){
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

