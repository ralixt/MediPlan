"use server";

import ParcoursType from "@/app/models/parcoursType";
import "@/app/models/etapeType";
import "@/app/models/competence";
import "@/app/models/ressource";
import Database from "@/lib/mongoConnect";
import mongoose from "mongoose";
import Competence from "@/app/models/competence";
import Planifications from "@/app/models/planification";
import JourneeType, {journeeTypeSchema} from "@/app/models/journeeType";
import {getAllParcoursType} from "@/actions/ParcoursType";
import {getComp} from "@/actions/CreateCompTest";

const dbInstance = Database.getInstance();


export async function createPlanification(formData: FormData) {
  try {
    const name = formData.get("name") as string;

    const parcoursType = await getAllParcoursType()
    const competence = await getComp()

      console.log("pp",parcoursType)
      //const name : string = "rrrrrr"
   /* const JourneeTypesBase = [
        {
            nom: name + "Lundi",
            liste_Parcours: [


                {
                    idParcours: "6585914cdb771bb938489134",
                    nbParcours: 5,
                    pourcentage_utilisation: 2
                }
            ],
            liste_Comp: [
                {
                    idCompetence: "65858269db771bb938488e6d",
                    nb_h_cible: 8,
                    nb_p_cible: 2,
                    nb_h_actuel: 8,
                    nb_p_actuel: 3
                }
            ],
        },
        /*{
            nom: name + "Mardi",
            liste_Parcours: [],
            liste_Comp: [],
        },
        {
            nom: name + "Mercredi",
            liste_Parcours: [],
            liste_Comp: [],
        },
        {
            nom: name + "Jeudi",
            liste_Parcours: [],
            liste_Comp: [],
        },
        {
            nom: name + "Vendredi",
            liste_Parcours: [],
            liste_Comp: [],
        },*/

      const JourneeTypesBase = [
        {
          nom: name + "Lundi",
          liste_Parcours: parcoursType.map(parcours => ({
            idParcours: parcours._id,
            nbParcours: 0,
            pourcentage_utilisation: 0
          })),
          liste_Comp: competence.map(comp => ({

            id_comp: comp._id,
            nb_h_cible: 0,
            nb_p_cible: 0,
            nb_h_actuel: 0,
            nb_p_actuel: 0


          })),
        },
        {
          nom: name + "Mardi",
          liste_Parcours: parcoursType.map(parcours => ({
            idParcours: parcours._id,
            nbParcours: 0,
            pourcentage_utilisation: 0
          })),
          liste_Comp: competence.map(comp => ({

            id_comp: comp._id,
            nb_h_cible: 0,
            nb_p_cible: 0,
            nb_h_actuel: 0,
            nb_p_actuel: 0


          })),
        },
        {
          nom: name + "Mercredi",
          liste_Parcours: parcoursType.map(parcours => ({
            idParcours: parcours._id,
            nbParcours: 0,
            pourcentage_utilisation: 0
          })),
          liste_Comp: competence.map(comp => ({

            id_comp: comp._id,
            nb_h_cible: 0,
            nb_p_cible: 0,
            nb_h_actuel: 0,
            nb_p_actuel: 0


          })),
        },

        {
          nom: name + "Jeudi",
          liste_Parcours: parcoursType.map(parcours => ({
            idParcours: parcours._id,
            nbParcours: 0,
            pourcentage_utilisation: 0
          })),
          liste_Comp: competence.map(comp => ({

            id_comp: comp._id,
            nb_h_cible: 0,
            nb_p_cible: 0,
            nb_h_actuel: 0,
            nb_p_actuel: 0


          })),
        },
        {
          nom: name + "vendredi",
          liste_Parcours: parcoursType.map(parcours => ({
            idParcours: parcours._id,
            nbParcours: 0,
            pourcentage_utilisation: 0
          })),
          liste_Comp: competence.map(comp => ({

            id_comp: comp._id,
            nb_h_cible: 0,
            nb_p_cible: 0,
            nb_h_actuel: 0,
            nb_p_actuel: 0


          })),
        },
      ];

      console.log(JourneeTypesBase);

  const newPlanification = await Planifications.create({
        nom: name,
        listeJourneeType:JourneeTypesBase,
    });

    console.log("Planification créés :", newPlanification);
  } catch (error) {
    console.error("Erreur de création Planification :", error);
  }
}

export async function deletePlanification(id: string) {
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
    const p = await Planifications.findById(id)
        .lean()
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
  const planificationNames = await Planifications.find().select("nom").lean().then((doc) => {
    if (doc) {
      convertObjectIdsToStrings(doc);
      return doc;
    }
  });
  return planificationNames;
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