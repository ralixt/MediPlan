"use server";
import Competence from "@/app/models/competence";
import {models} from "mongoose";

export async function createComp(name:String) {
   console.log(await Competence.create({
       nom:name
   }))
}