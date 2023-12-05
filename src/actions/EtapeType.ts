"use server";
import EtapeType from "@/app/models/etapeType";
import { connectMongodb } from "@/lib/mongoConnect";
import Competence from "@/app/models/competence";
import Ressource from "@/app/models/ressource";
import exp from "constants";

export async function getCompetenceByName(name:string) {
    await connectMongodb();
    return await Competence.findOne({ nom: name });
}

export async function getRessourceByName(name:string) {
    await connectMongodb();
    return await Ressource.findOne({ nom: name });
}

export async function getAllEtapeType(){
    await connectMongodb();
    return await EtapeType.find();
}
export async function createEtapeType(formData: FormData) {
    await connectMongodb();

    try {
        const name = formData.get("names");
        const type = formData.get("type");
        const competenceId = formData.get("competenceId");
        const lieuId = formData.get("lieuId");
        const materielId= formData.get("materielId")
        const etapeId = formData.get("etapeId")
        const competence = await Competence.findById(competenceId);
        const lieu = await Ressource.findById(lieuId);
        const materiel = await Ressource.findById(materielId);
        const groupeEtape =await EtapeType.findById(etapeId)
        const newEtapeType = await EtapeType.create({
            name,
            type,
            duree:20,
            Competence: competence ? [competence._id] : [],
            Lieu: lieu ? [lieu._id] : [],
            Materiel: materiel ? [materiel._id] : [],
            a_jeun: false,
            Etapes: groupeEtape?[groupeEtape._id]:[],
        });

        console.log("EtapeType créer:", newEtapeType);
    } catch (error) {
        console.error("Erreur de création  EtapeType:", error);
    }
}



export async function deleteEtapeType(id:string) {
    await connectMongodb()

    try {
      const etapeType = await EtapeType.findByIdAndDelete(id,);
      console.log("EtapeType supprimé", etapeType)
    } catch (error) {
        console.log("Erreur de suppression EtapeType")
    }

}

export async function updateEtapeType(id:string, formData:FormData){
    await connectMongodb()
    try {
        const etapeTypeUpdated = await EtapeType.findByIdAndUpdate(id,formData)
        if(etapeTypeUpdated){
            console.log("EtapeType mis à jour", etapeTypeUpdated)
            return etapeTypeUpdated
        }
        else {
            console.log("Aucune etape type trouvé")
        }

    } catch (error){
    console.log("Erreur de mise à jour")
    }
}
