"use server";
import Competence from "@/app/models/competence";
import Database from "@/lib/mongoConnect";
import Ressource from "@/app/models/ressource";
const dbInstance = Database.getInstance();
export async function createRessou(name:String,type:String) {

   console.log(await Ressource.create({
       nom:name,
       type:type
   }))
}

export async function createComp(formData:FormData) {

    console.log(await Competence.create({
        nom:formData.get('nom'),

    }))
}

export async function deleteRessource(){
    try {

        return await Ressource.deleteMany()
    }catch (e) {
        console.log(e)
    }


}

export async function getComp(){

    return await Competence.find();
}

export async function getLieu(){

    return await Ressource.find({type:"lieu"});
}

export async function getMateriel(){
    return await Ressource.find({type:"materiel"});
}

