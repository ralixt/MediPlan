"use server";
import EtapeType from "@/app/models/etapeType"; // Assurez-vous d'ajuster le chemin d'importation selon votre structure de projet
import { connectMongodb } from "@/lib/mongoConnect";
import Competence from "@/app/models/competence";
import Ressource from "@/app/models/ressource";

export async function getCompetenceByName(name:string) {
    await connectMongodb();
    return await Competence.findOne({ nom: name });
}

export async function getRessourceByName(name:string) {
    await connectMongodb();
    return await Ressource.findOne({ nom: name });
}
export async function createEtapeType(formData: FormData) {
    await connectMongodb();

    try {
        const name = formData.get("names");
        const type = formData.get("type");
        const competenceId = formData.get("competenceId");
        const lieuId = formData.get("lieuId");
        const materielId= formData.get("materielId")
        const competence = await Competence.findById(competenceId);
        const lieu = await Ressource.findById(lieuId);
        const materiel = await Ressource.findById(materielId);
        const newEtapeType = await EtapeType.create({
            name,
            type,
            duree:20,
            Competence: competence ? [competence._id] : [],
            Lieu: lieu ? [lieu._id] : [],
            Materiel: materiel ? [materiel._id] : [],
            a_jeun: false,
            Etapes: [],
        });

        console.log("EtapeType créer:", newEtapeType);
    } catch (error) {
        console.error("Erreur de création  EtapeType:", error);
    }
}
