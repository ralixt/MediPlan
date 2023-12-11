"use server"

import {connectMongodb} from "@/lib/mongoConnect";
import ParcoursType from "@/app/models/parcoursType";

export async function createParcoursType(formData: FormData) {
    await connectMongodb();

    try {
        const name = formData.get("name") as string;
        const type = formData.get("type") as string;

        const sequencablesIds = JSON.parse(formData.get("sequencables") as string);
        const precedencesIds = JSON.parse(formData.get("precedences") as string);


        const newParcoursType = await ParcoursType.create({
            name,
            type,
            sequencables: sequencablesIds,
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
    try {
        return await ParcoursType.find()
    }catch (error){
        console.log("Erreur d'obtention des parcours ")
    }
}

