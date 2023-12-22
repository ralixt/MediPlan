"use server";
import Competence from "@/app/models/competence";
import {connectMongodb, disconnectMongodb} from "@/lib/mongoConnect";
import Ressource from "@/app/models/ressource";

export async function createRessou(name:String,type:String) {
    await connectMongodb()
   console.log(await Ressource.create({
       nom:name,
       type:type
   }))
}

export async function createComp(formData:FormData) {
    await connectMongodb()
    console.log(await Competence.create({
        nom:formData.get('nom'),

    }))
}

export async function deleteRessource(){
    try {
        await connectMongodb()
        return await Ressource.deleteMany()
    }catch (e) {
        console.log(e)
    }finally {
        await disconnectMongodb()
    }


}

export async function getComp(){
 await connectMongodb()
    return await Competence.find();
}

export async function getLieu(){

    return await Ressource.find({type:"lieu"});
}

export async function getMateriel(){
    return await Ressource.find({type:"materiel"});
}

