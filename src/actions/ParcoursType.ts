"use server"

import {connectMongodb} from "@/lib/mongoConnect";
import ParcoursType from "@/app/models/parcoursType";

export async function createParcoursType(formData: FormData) {
    await connectMongodb();

    try {
        const name = formData.get("name") as string;
        const type = formData.get("type") as string;

        const sequencablesIds = JSON.parse(formData.get("sequencables") as string);


        const newParcoursType = await ParcoursType.create({
            name,
            type,
            sequencables: sequencablesIds,
            precedences:[],
        });

        console.log("ParcoursType créé :", newParcoursType);
    } catch (error) {
        console.error("Erreur de création ParcoursType :", error);
    }
}

