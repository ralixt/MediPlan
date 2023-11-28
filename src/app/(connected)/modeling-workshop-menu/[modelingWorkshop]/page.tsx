import ModelingGenerator from "@/components/modelingGenerator";
import { cache } from "react";
import fs from 'fs/promises';
import { EtapeType, GroupeEtapeType, Precedence } from "@/components/modelingComponents";
import { StaticImageData } from "next/image";
import generate from "@/utils/generator"

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

export default async function ModelingWorkshop({params}: NextPageProps<props>){
    const parcours = await getParcours()
    const elements = generate(parcours)
    return (
        <ModelingGenerator element={elements} parcour={parcours}/>
    )
}

