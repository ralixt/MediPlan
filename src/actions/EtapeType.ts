"use server";
import EtapeType from "@/app/models/etapeType";
import Database from "@/lib/mongoConnect";
import Competence from "@/app/models/competence";
import Ressource from "@/app/models/ressource";
import exp from "constants";
import mongoose from "mongoose";

const dbInstance = Database.getInstance();

export async function getCompetenceByName(name: string) {
  return await Competence.findOne({ nom: name });
}

export async function getRessourceByName(name: string) {
  return await Ressource.findOne({ nom: name });
}

export async function getAllEtapeType() {
  function convertObjectIdsToStrings(obj) {
    for (let key in obj) {
      if (obj[key] instanceof mongoose.Types.ObjectId) {
        obj[key] = obj[key].toString();
      } else if (typeof obj[key] === "object") {
        convertObjectIdsToStrings(obj[key]);
      }
    }
  }
  return await EtapeType.find()
    .lean()

    .populate({ path: "Competence" })
    .populate({ path: "Lieu" })
    .populate({ path: "Materiel" })
    .then((doc) => {
      if (doc) {
        console.log("avant convert");
        convertObjectIdsToStrings(doc);
        return doc;
      }
    });
}
export async function deleteEtapeType() {
  try {
    return await EtapeType.deleteMany();
  } catch (e) {
    console.log(e);
  }
}

export async function getEtapeType(id: string) {
  return EtapeType.findById(id);
}
export async function createEtapeType(formData: FormData) {
  try {
    const name = formData.get("names");
    const type = formData.get("type");
    const competenceId = formData.get("competenceId");
    const lieuId = formData.get("lieuId");
    const materielId = formData.get("materielId");
    const duree = formData.get("duree");
    const a_jeun = formData.get("AJeun");
    const etapeId = formData.get("etapeId");
    const competence = await Competence.findById(competenceId);
    const lieu = await Ressource.findById(lieuId);
    const materiel = await Ressource.findById(materielId);
    const groupeEtape = await EtapeType.findById(etapeId);
    const newEtapeType = await EtapeType.create({
      name,
      type,
      duree,
      Competence: competence ? [competence._id] : [],
      Lieu: lieu ? [lieu._id] : [],
      Materiel: materiel ? [materiel._id] : [],
      a_jeun,
      Etapes: groupeEtape ? [groupeEtape._id] : [],
    });

    console.log("EtapeType créer:", newEtapeType);
  } catch (error) {
    console.error("Erreur de création  EtapeType:", error);
  }
}

export async function deleteEtapeTypeById(id: string) {
  try {
    const etapeType = await EtapeType.findByIdAndDelete(id);
    console.log("EtapeType supprimé", etapeType);
  } catch (error) {
    console.log("Erreur de suppression EtapeType");
  }
}

export async function updateEtapeType(id: string, formData: FormData) {
  try {
    const etapeTypeUpdated = await EtapeType.findByIdAndUpdate(id, formData);
    if (etapeTypeUpdated) {
      console.log("EtapeType mis à jour", etapeTypeUpdated);
    } else {
      console.log("Aucune etape type trouvé");
    }
  } catch (error) {
    console.log("Erreur de mise à jour - updateEtapeType");
  }
}
