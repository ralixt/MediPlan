"use server";
import Competence from "@/app/models/competence";
import {connectMongodb} from "@/lib/mongoConnect";
import Ressource from "@/app/models/ressource";

export async function createRessou(name:String,type:String) {
    await connectMongodb()
   console.log(await Ressource.create({
       nom:name,
       type:type
   }))
}

export async function createComp(name:String) {
    await connectMongodb()
    console.log(await Competence.create({
        nom:name,

    }))
}

export async function getComp(){
    await connectMongodb()
    return await Ressource.find();
}