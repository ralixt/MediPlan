"use server";
import Competence from "@/app/models/competence";
import {connectMongodb} from "@/lib/mongoConnect";
import Ressource from "@/app/models/ressource";



export async function createEtapeType(formData:FormData) {
    await connectMongodb()
    console.log(await Competence.create({
        name:formData.get('name'),
        type:formData.get('type'),
        duree:formData.get('duree'),
        
        



    }))
}



