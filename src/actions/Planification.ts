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

      const JourneeTypesBase = [
        {
          nom: "Lundi" + name,
          planificationParcours: parcoursType.map(parcours => ({
            idParcours: parcours._id,
            nbParcours: 0,
            pourcentage_utilisation: 0
          })),
          liste_Competence: competence.map(comp => ({
            idCompetence: comp._id,
            nb_h_cible: 0,
            nb_p_cible: 0,
            nb_h_actuel: 0,
            nb_p_actuel: 0
          })),
        },
        {
          nom: "Mardi" + name,
          planificationParcours: parcoursType.map(parcours => ({
            idParcours: parcours._id,
            nbParcours: 0,
            pourcentage_utilisation: 0
          })),
          liste_Competence: competence.map(comp => ({
            idCompetence: comp._id,
            nb_h_cible: 0,
            nb_p_cible: 0,
            nb_h_actuel: 0,
            nb_p_actuel: 0
          })),
        },
        {
          nom: "Mercredi" + name,
          planificationParcours: parcoursType.map(parcours => ({
            idParcours: parcours._id,
            nbParcours: 0,
            pourcentage_utilisation: 0
          })),
          liste_Competence: competence.map(comp => ({
            idCompetence: comp._id,
            nb_h_cible: 0,
            nb_p_cible: 0,
            nb_h_actuel: 0,
            nb_p_actuel: 0
          })),
        },
        {
          nom: "Jeudi" + name,
          planificationParcours: parcoursType.map(parcours => ({
            idParcours: parcours._id,
            nbParcours: 0,
            pourcentage_utilisation: 0
          })),
          liste_Competence: competence.map(comp => ({
            idCompetence: comp._id,
            nb_h_cible: 0,
            nb_p_cible: 0,
            nb_h_actuel: 0,
            nb_p_actuel: 0
          })),
        },
        {
          nom: "Vendredi" + name,
          planificationParcours: parcoursType.map(parcours => ({
            idParcours: parcours._id,
            nbParcours: 0,
            pourcentage_utilisation: 0
          })),
          liste_Competence: competence.map(comp => ({
            idCompetence: comp._id,
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
        liste_JourneeType:JourneeTypesBase,
    });

    console.log("Planification créés :", newPlanification);
  } catch (error) {
    console.error("Erreur de création Planification :", error);
  }
}

/*export async function updateNumberParcours(id: string,idJourneeType:string, newNumberParcours: number, idParcours: string,JourneeType:JourneeType) {
  try {
    const Planif = await Planifications.findById(id);

    //const journeeType = await Planifications.findById(idJourneeType);

    //console.log("jjjj",JourneeType)

    //console.log("idd",idJourneeType)
    if (!Planif) {
      throw new Error('JourneeType non trouvé');
    }

    const planificationParcoursToUpdate = JourneeType.planificationParcours.find(journee => journee.idParcours === "6585914cdb771bb938489134");

    console.log("pppp",JourneeType.planificationParcours.find(journee => journee.idParcours === idParcours))

    if (!planificationParcoursToUpdate) {
      throw new Error(`PlanificationParcours avec idParcours ${idParcours} non trouvé`);
    }
    planificationParcoursToUpdate.nbParcours = newNumberParcours;


   //const updatedJourneeType = await Planif.save();

    console.log("JourneeType mis à jour avec les nouvelles compétences :", planificationParcoursToUpdate);
    //return planificationParcoursToUpdate;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la JourneeType :", error);
    throw error;
  }
}*/

export async function updateNumberParcours(id: string,idJourneeType:string, newNumberParcours: number, idParcours: string,JourneeType:JourneeType) {
  try {
    const updatedPlanification = await Planifications.findByIdAndUpdate(
        id,
        { $set: { "liste_JourneeType.$[outer].planificationParcours.$[inner].nbParcours": newNumberParcours } },
        { arrayFilters: [{ "outer._id": idJourneeType }, { "inner.idParcours": idParcours }], new: true }
    );

    if (!updatedPlanification) {
      throw new Error('Planification non trouvée');
    }

    console.log("Planification mise à jour avec succès :", updatedPlanification);
    console.log("idParcours",idParcours)
    console.log("num",newNumberParcours)
    console.log(id)

   // return updatedPlanification;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la planification :", error);
    throw error;
  }
}

export async function updateHeuresCible(id: string,idJourneeType:string, newNumberHeuresCible: number, idCompetence: string) {
  try {
    const updatedPlanification = await Planifications.findByIdAndUpdate(
        id,
        { $set: { "liste_JourneeType.$[outer].liste_Competence.$[inner].nb_h_cible": newNumberHeuresCible } },
        { arrayFilters: [{ "outer._id": idJourneeType }, { "inner.idCompetence": idCompetence }], new: true }
    );

    if (!updatedPlanification) {
      throw new Error('Planification non trouvée');
    }

    console.log("Planification mise à jour avec succès :", updatedPlanification);
    console.log("idParcours",idCompetence)
    console.log("num",newNumberHeuresCible)
    console.log(id)

    // return updatedPlanification;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la planification :", error);
    throw error;
  }
}

export async function updateHeuresActuel(id: string,idJourneeType:string, newNumberHeureActuel: number, idCompetence: string) {
  try {
    const updatedPlanification = await Planifications.findByIdAndUpdate(
        id,
        { $set: { "liste_JourneeType.$[outer].liste_Competence.$[inner].nb_h_actuel": newNumberHeureActuel } },
        { arrayFilters: [{ "outer._id": idJourneeType }, { "inner.idCompetence": idCompetence }], new: true }
    );

    if (!updatedPlanification) {
      throw new Error('Planification non trouvée');
    }

    console.log("Planification mise à jour avec succès :", updatedPlanification);
    console.log("idParcours",idCompetence)
    console.log("num",newNumberHeureActuel)
    console.log(id)

    // return updatedPlanification;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la planification :", error);
    throw error;
  }
}

export async function updatePersonnelCible(id: string,idJourneeType:string, newPersonnelCible: number, idCompetence: string) {
  try {
    const updatedPlanification = await Planifications.findByIdAndUpdate(
        id,
        { $set: { "liste_JourneeType.$[outer].liste_Competence.$[inner].nb_p_cible": newPersonnelCible } },
        { arrayFilters: [{ "outer._id": idJourneeType }, { "inner.idCompetence": idCompetence }], new: true }
    );

    if (!updatedPlanification) {
      throw new Error('Planification non trouvée');
    }

    console.log("Planification mise à jour avec succès :", updatedPlanification);
    console.log("idParcours",idCompetence)
    console.log("num",newPersonnelCible)
    console.log(id)

    // return updatedPlanification;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la planification :", error);
    throw error;
  }
}

export async function updatePersonnelActuel(id: string,idJourneeType:string, newNumberPersonnelActuel: number, idCompetence: string) {
  try {
    const updatedPlanification = await Planifications.findByIdAndUpdate(
        id,
        { $set: { "liste_JourneeType.$[outer].liste_Competence.$[inner].nb_p_actuel": newNumberPersonnelActuel } },
        { arrayFilters: [{ "outer._id": idJourneeType }, { "inner.idCompetence": idCompetence }], new: true }
    );

    if (!updatedPlanification) {
      throw new Error('Planification non trouvée');
    }

    console.log("Planification mise à jour avec succès :", updatedPlanification);
    console.log("idParcours",idCompetence)
    console.log("num",newNumberPersonnelActuel)
    console.log(id)

    // return updatedPlanification;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la planification :", error);
    throw error;
  }
}


/*export async function updateNumberParcours(id: string,idJourneeType:string, newNumberParcours: number, idParcours: string,JourneeType:JourneeType) {
  const planificationTrouvee = JourneeType.planificationParcours.find(journee => journee.idParcours === "6585914cdb771bb938489134");

  if (!planificationTrouvee) {
    throw new Error(`PlanificationParcours avec idParcours ${idParcours} non trouvé`);
  }

  console.log("PlanificationParcours trouvé :", planificationTrouvee);


}*/


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