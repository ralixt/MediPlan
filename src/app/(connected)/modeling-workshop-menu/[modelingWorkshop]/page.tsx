import ModelingGenerator from "@/components/modelingGenerator";
import { cache } from "react";
import fs from 'fs/promises';
import { precedence } from "@/components/modelingComponents";

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
    let etapesTypes :EtapeType[] = parcours.sequencables.filter((sequencable): sequencable is EtapeType => sequencable.type == "EtapeType")
    let groupesEtapesType :GroupeEtapeType[] = parcours.sequencables.filter((sequencable): sequencable is GroupeEtapeType => sequencable.type == "GroupeEtapeType")
    
    for(let groupeEtapeType of groupesEtapesType){
        const groupEtapeTypeIds = groupeEtapeType.Etapes.map((etape) => etape.uid);
        etapesTypes = etapesTypes.filter((etapeType) => !groupEtapeTypeIds.includes(etapeType.uid))
    }
    let sequencables : sequencable[] = etapesTypes
    sequencables.concat(groupesEtapesType)

    let precedences: precedence[] = parcours.precedences
    
    let element: (sequencable | precedence)[] = []
    for(let precedence of precedences){
        const antecedant = sequencables.find((sequencable) => precedence.antecedent === sequencable.uid)
        const successeur = sequencables.find((sequencable) => precedence.successeur === sequencable.uid)
        if (antecedant !== undefined && successeur !== undefined){
            if(element.indexOf(antecedant) > -1){
                if(element.indexOf(successeur) > -1){
                    element.push(antecedant,precedence,successeur)
                }
                else{
                    const index = element.indexOf(successeur)
                    element.splice(index,0,antecedant,precedence)
                }
            }
            else{
                if(element.indexOf(successeur) > -1){
                    const index = element.indexOf(antecedant)
                    element.splice(index+1,0,precedence,successeur)
                }
                else{
                    const indexA = element.indexOf(antecedant)
                    const indexS = element.indexOf(successeur)
                    
                }
            }
        }
        
    }
    console.log(etapesTypes)
    console.log(groupesEtapesType) 
})

export default async function ModelingWorkshop({params}: NextPageProps<props>){
    const parcours = await getParcours()
    generate(parcours)
    return (
        <ModelingGenerator element={[]} parcour={parcours}/>
    )
}

