"use server"

import {connectMongodb, disconnectMongodb} from "@/lib/mongoConnect";
import ParcoursType from "@/app/models/parcoursType";
import "@/app/models/etapeType"
import "@/app/models/competence"
import "@/app/models/ressource"
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


export async function createParcoursType(data) {

    const { name, type, sequencables, precedences } = data;

    // Créer un nouveau ParcoursType
    const newParcoursType = new ParcoursType({
        name,
        type,
        sequencables,
        precedences
    });

    // Enregistrer le ParcoursType dans la base de données
    try {
        await connectMongodb()
        const savedParcoursType = await newParcoursType.save();
        console.log('ParcoursType créé avec succès:', savedParcoursType);
        return savedParcoursType;
        await disconnectMongodb()
    } catch (error) {
        console.error('Erreur lors de la création du ParcoursType:', error);
        throw error;
    }finally {
      await  disconnectMongodb()
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

export async function getAllParcoursType() {
    await connectMongodb();
    try {
        const parcoursType = await ParcoursType.find().lean()
            .populate({
                path: 'sequencables',
                populate: [
                    { path: 'Competence' },
                    { path: 'Lieu' },
                    { path: 'Materiel' }
                ]
            })
            .populate({
                path: 'precedences.antecedent',
                populate: [
                    { path: 'Competence' },
                    { path: 'Lieu' },
                    { path: 'Materiel' }
                ]

            })
            .populate({
                path: 'precedences.successeur',
                populate: [
                    { path: 'Competence' },
                    { path: 'Lieu' },
                    { path: 'Materiel' }
                ]

            })


        return parcoursType;

    } catch (error) {
        console.error("Erreur d'obtention des parcours :", error);
    } finally {
        await disconnectMongodb();
    }
}


/*export async function getAllParcoursType() {
    await connectMongodb();

    try {
        // Désactivez la population automatique
        const parcoursTypes = await ParcoursType.find().lean().exec();
        return parcoursTypes;
    } catch (error) {
        console.error('Erreur lors de la récupération des ParcoursType:', error);
        throw error;
    }
}*/


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

