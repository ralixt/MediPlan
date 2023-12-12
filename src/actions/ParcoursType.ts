"use server"

import {connectMongodb, disconnectMongodb} from "@/lib/mongoConnect";
import ParcoursType from "@/app/models/parcoursType";
import EtapeType from "@/app/models/etapeType";
import mongoose from "mongoose";
import { disconnect } from "process";

export async function createParcoursType(formData: FormData) {
    await connectMongodb();

    try {
        const name = formData.get("name") as string;
        const type = formData.get("type") as string;

        const sequencablesIds = JSON.parse(formData.get("sequencables") as string);
        const precedencesIds = JSON.parse(formData.get("precedences") as string);
        
        // const sequencables = await Promise.all(
        //     sequencablesIds.map(async (id:string) => {
        //         const etapeType = await EtapeType.findById(id);
        //         if (!etapeType) {
        //             throw new Error(`Étape type avec l'ID ${id} introuvable`);
        //         }
        //         return etapeType;
        //     })
        // );

        const sequencables = await Promise.all(
            sequencablesIds.map(async (id:string) => {
                const etapeType = await EtapeType.findById(id);
                if (!etapeType) {
                    throw new Error(`Étape type avec l'ID ${id} introuvable`);
                }
                return etapeType;
            })
        );

        




        const newParcoursType = await ParcoursType.create({
            name,
            type,
            sequencables: sequencables,
            precedences:precedencesIds,
        });

        console.log("ParcoursType créé :", newParcoursType);
    } catch (error) {
        console.error("Erreur de création ParcoursType :", error);
    }
}
export async function deleteParcoursType(id:string){
    await connectMongodb()

    try {
        const parcoursType = await ParcoursType.findByIdAndDelete(id);
        console.log("ParcoursType supprimé", parcoursType)
    } catch (error) {
        console.log("Erreur de suppression ParcoursType"+error)
    }
}

export async function getParcoursType(id:string){
    await connectMongodb()
    try {
        return await ParcoursType.findById(id);
        console.log(" Obtention de Parcours réussi ")
    }catch (error){
        console.log("erreur d'obtention parcours type")
    }
}

export async function getAllParcoursType(){
    await connectMongodb()
    try {
        return await ParcoursType.find().populate("sequencables");
        
      
        
    }catch (error){
        console.log("Erreur d'obtention des parcours ")
    }
    await disconnectMongodb()
}
export async function updateParcoursType(id:string, formData:FormData){
    await connectMongodb()
    try {
        const parcoursTypeUpdated = await ParcoursType.findByIdAndUpdate(id,formData)
        if(parcoursTypeUpdated){
            console.log("EtapeType mis à jour", parcoursTypeUpdated)
            return parcoursTypeUpdated
        }
        else {
            console.log("Aucun parcours type trouvé")
        }

    } catch (error){
    console.log("Erreur de mise à jour")
    }
}
export async function deleteAllParcoursType() {
    await connectMongodb()
   try{
     await ParcoursType.deleteMany()
   }catch(error){
    console.log("erreur du suppression du parcours type")
   }
} 

