"use server";

import ParcoursType from "@/app/models/parcoursType";
import "@/app/models/etapeType";
import "@/app/models/competence";
import "@/app/models/ressource";
import Database from "@/lib/mongoConnect";
import EtapeType from "@/app/models/etapeType";
import mongoose from "mongoose";
import { disconnect } from "process";

const dbInstance = Database.getInstance();

// export async function createParcoursType(formData: FormData) {
//     await connectMongodb();
//
//     try {
//         const name = formData.get("name") as string;
//         const type = formData.get("type") as string;
//
//         const sequencablesIds =JSON.parse( formData.get("sequencables") as string);
//
//         const precedencesIds = JSON.parse(formData.get("precedences") as string);
//
//
//
//
//
//
//
//
//         const newParcoursType = await ParcoursType.create({
//             name,
//             type,
//             sequencables: sequencablesIds,
//             precedences:precedencesIds,
//         });
//
//         console.log("ParcoursType créé :", newParcoursType);
//     } catch (error) {
//         console.error("Erreur de création ParcoursType :", error);
//     }
// }

/*export async function createParcoursType(data) {

    const { name, type, sequencables, precedences } = data;

    // Créer un nouveau ParcoursType
    const newParcoursType = new ParcoursType({
        name,
        type,
        sequencables,
        precedences
    });

    // Enregistrer le ParcoursType dans la base de données
    try {

        const savedParcoursType = await newParcoursType.save();
        console.log('ParcoursType créé avec succès:', savedParcoursType);
        return savedParcoursType;

    } catch (error) {
        console.error('Erreur lors de la création du ParcoursType:', error);
        throw error;
    }
}*/

export async function createParcoursType(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;

    /* const sequencablesIds =JSON.parse( formData.get("sequencables") as string);

         const precedencesIds = JSON.parse(formData.get("precedences") as string);

*/

    const newParcoursType = await ParcoursType.create({
      name,
      type,
      //sequencables: sequencablesIds,
      //precedences:precedencesIds,
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

export async function getParcoursType(id: string) {
  function convertObjectIdsToStrings(obj) {
    for (let key in obj) {
      if (obj[key] instanceof mongoose.Types.ObjectId) {
        obj[key] = obj[key].toString();
      } else if (typeof obj[key] === "object") {
        convertObjectIdsToStrings(obj[key]);
      }
    }
  }

  try {
    const p = await ParcoursType.findById(id)
      .lean()
      .populate({
        path: "sequencables",
        populate: [
          { path: "Competence" },
          { path: "Lieu" },
          { path: "Materiel" },
        ],
      })
      .then((doc) => {
        if (doc) {
          console.log("avant convert");
          convertObjectIdsToStrings(doc);
          return doc;
        }
      });
    // .populate({
    //     path: 'precedences.antecedent',
    //     populate: [
    //         { path: 'Competence' },
    //         { path: 'Lieu' },
    //         { path: 'Materiel' }
    //     ]

    // })
    // .populate({
    //     path: 'precedences.successeur',
    //     populate: [
    //         { path: 'Competence' },
    //         { path: 'Lieu' },
    //         { path: 'Materiel' }
    //     ]

    // });
    return p;
    console.log(" Obtention de Parcours réussi ");
  } catch (error) {
    console.log("erreur d'obtention parcours type", error);
  }
}

export async function getAllParcoursType() {
  try {
    const parcoursType = await ParcoursType.find()
      .lean()
      .populate({
        path: "sequencables",
        populate: [
          { path: "Competence" },
          { path: "Lieu" },
          { path: "Materiel" },
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
      });

    return parcoursType;
  } catch (error) {
    console.error("Erreur d'obtention des parcours :", error);
  }
}

export async function getNameParcoursType() {
  const parcoursTypeNames = await ParcoursType.find().select("name").lean();
  return parcoursTypeNames;
}

export async function searchParcoursType(phrase: string){
  try {
    const regex = new RegExp(phrase, 'i');
    const data = await ParcoursType.find({ nom: regex });
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    throw error;
  }
}

/*export async function getAllParcoursType() {
    await connectMongodb();

    try {
        // Désactivez la population automatique
        const parcoursTypes = await ParcoursType.find().lean().exec();
        return parcoursTypes;
    } catch (error) {
        console.error('Erreur lors de la récupération des ParcoursType:', error);
        throw error;
    }
}*/

export async function updateParcoursType(id: string, formData: FormData) {
  try {
    const parcoursTypeUpdated = await ParcoursType.findByIdAndUpdate(
      id,
      formData
    );
    if (parcoursTypeUpdated) {
      console.log("EtapeType mis à jour", parcoursTypeUpdated);
      return parcoursTypeUpdated;
    } else {
      console.log("Aucun parcours type trouvé");
    }
  } catch (error) {
    console.log("Erreur de mise à jour");
  }
}
export async function deleteAllParcoursType() {
  try {
    await ParcoursType.deleteMany();
  } catch (error) {
    console.log("erreur du suppression du parcours type");
  }
}
