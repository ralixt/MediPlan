"use server";

import ParcoursType from "@/app/models/parcoursType";
import "@/app/models/etapeType";
import "@/app/models/competence";
import "@/app/models/ressource";
import Database from "@/lib/mongoConnect";
import EtapeType from "@/app/models/etapeType";
import mongoose from "mongoose";
import { disconnect } from "process";
import Competence from "@/app/models/competence";

const dbInstance = Database.getInstance();


export async function createParcoursType(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;

    const sequencablesIds = JSON.parse( formData.get("sequencables") as string);

    const precedencesIds = JSON.parse(formData.get("precedences") as string);



    const newParcoursType = await ParcoursType.create({
      name,
      type,
      sequencables: sequencablesIds,
      precedences:precedencesIds,
    });

    console.log("ParcoursType créé :", newParcoursType);
  } catch (error) {
    console.error("Erreur de création ParcoursType :", error);
  }
}

export async function deleteParcoursType(id: string) {
  try {
    const parcoursType = await ParcoursType.findByIdAndDelete(id);
    console.log("ParcoursType supprimé", parcoursType);
  } catch (error) {
    console.log("Erreur de suppression ParcoursType" + error);
  }
}


function convertObjectIdsToStrings(obj:any) {
  for (let key in obj) {
    if (obj[key] instanceof mongoose.Types.ObjectId) {
      obj[key] = obj[key].toString();
    } else if (typeof obj[key] === "object") {
      convertObjectIdsToStrings(obj[key]);
    }
  }
}

export async function getPlanification(id: string) {
  try {
    const p = await ParcoursType.findById(id)
        .lean()
        .populate({
          path: "sequencables",
          populate: [
            {path: "Competence"},
            {path: "Lieu"},
            {path: "Materiel"},
            {path: "Etapes", populate: ["Competence", "Lieu", "Materiel"]},
          ],
        })

        .then((doc) => {
          if (doc) {
            convertObjectIdsToStrings(doc);
            return doc;
          }
        });
    return p;
    console.log(" Obtention de Parcours réussi ");
  } catch (error) {
    console.log("erreur d'obtention parcours type", error);
  }
}

export async function getAllPlanification() {
  try {
    const parcoursType = await ParcoursType.find()
      .lean()
      .populate({
        path: "sequencables",
        populate: [
          { path: "Competence" },
          { path: "Lieu" },
          { path: "Materiel" },
          {path:"Etapes"},

        ],
      })
      .populate({
        path: "precedences.antecedent",
        populate: [
          { path: "Competence" },
          { path: "Lieu" },
          { path: "Materiel" },
        ],
      })
      .populate({
        path: "precedences.successeur",
        populate: [
          { path: "Competence" },
          { path: "Lieu" },
          { path: "Materiel" },
        ],
      }).then((doc) => {
        if (doc) {
          convertObjectIdsToStrings(doc);
          return doc;
        }
      });

    return parcoursType;
  } catch (error) {
    console.error("Erreur d'obtention des parcours :", error);
  }
}

export async function getNamePlanification() {
  const parcoursTypeNames = await ParcoursType.find().select("name").lean().then((doc) => {
    if (doc) {
      convertObjectIdsToStrings(doc);
      return doc;
    }
  });
  return parcoursTypeNames;
}

export async function searchPlanification(phrase: string){
  try {
    const regex = new RegExp(phrase, 'i');
    const data = await ParcoursType.find({ nom: regex });
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    throw error;
  }
}


export async function updatePlanification(id: string, formData: mongoose.UpdateQuery<any> | undefined) {
  try {
    const parcoursTypeUpdated = await ParcoursType.findByIdAndUpdate(
      id,
      formData
    );
    if (parcoursTypeUpdated) {
      console.log("Planification mis à jour", parcoursTypeUpdated);
    } else {
      console.log("Aucun parcours type trouvé");
    }
  } catch (error) {
    console.log("Erreur de mise à jour - updateParcoursType");
  }
}
export async function deleteAllPlanification() {
  try {
    await ParcoursType.deleteMany();
  } catch (error) {
    console.log("erreur du suppression du parcours type");
  }
}

export async function getNameCompetences() {
  const competencesNames = await Competence.find().select("nom").lean().then((doc) => {
    if (doc) {
      convertObjectIdsToStrings(doc);
      return doc;
    }
  });
  return competencesNames;
}