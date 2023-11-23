"use server";
import Competence from "@/app/models/competence";
import {models} from "mongoose";
import {connectMongodb} from "@/lib/mongoConnect";

export async function createComp(name:String) {
    await connectMongodb()
   console.log(await Competence.create({
       nom:name
   }))
}