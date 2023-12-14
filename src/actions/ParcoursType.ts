"use server"

import {connectMongodb, disconnectMongodb} from "@/lib/mongoConnect";
import ParcoursType from "@/app/models/parcoursType";
import "@/app/models/etapeType"
import EtapeType from "@/app/models/etapeType";
import mongoose from "mongoose";
import { disconnect } from "process";

// export async function createParcoursType(formData: FormData) {
//     await connectMongodb();
//
//     try {
//         const name = formData.get("name") as string;
//         const type = formData.get("type") as string;
//
//         const sequencablesIds =JSON.parse( formData.get("sequencables") as string);
//
//         const precedencesIds = JSON.parse(formData.get("precedences") as string);
//
//
//
//
//
//
//
//
//         const newParcoursType = await ParcoursType.create({
//             name,
//             type,
//             sequencables: sequencablesIds,
//             precedences:precedencesIds,
//         });
//
//         console.log("ParcoursType créé :", newParcoursType);
//     } catch (error) {
//         console.error("Erreur de création ParcoursType :", error);
//     }
// }
export async function createParcoursType(formData: FormData) {
    await connectMongodb();

    try {
        const name = formData.get("name") as string;
        const type = formData.get("type") as string;

        // Récupérer les données sérialisées sans les convertir en JSON
        const sequencablesRaw = formData.get("sequencables") as string;
        console.log("sequencablesRaw:", sequencablesRaw);

        // Utiliser directement l'identifiant ObjectId dans le tableau
        const sequencables = sequencablesRaw ? [sequencablesRaw] : [];
        const precedencesRaw = formData.get("precedences") as string;
        const precedences = precedencesRaw ? [precedencesRaw] : [];



        console.log("name:", name);
        console.log("type:", type);
        console.log("sequencables:", sequencables);
        console.log("precedences:", precedences);

        const newParcoursType = await ParcoursType.create({
            name,
            type,
            sequencables,
            precedences,
        });

        console.log("ParcoursType créé :", newParcoursType);
    } catch (error) {
        console.error("Erreur de création Par",error)
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

// export async function getAllParcoursType() {
//     await connectMongodb();
//     try {
//         const parcoursType = await ParcoursType.find()
//             .populate('sequencables' )
//             .populate('precedences.antecedent')
//             .populate('precedences.successeur');
//
//         return parcoursType
//
//
//
//     } catch (error) {
//         console.error("Erreur d'obtention des parcours :", error);
//     } finally {
//         await disconnectMongodb();
//     }
// }

export async function getAllParcoursType(){
    await connectMongodb();
    return await ParcoursType.find();
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

