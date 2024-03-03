import mongoose, { Schema, Document, Types } from 'mongoose';

interface IUtilisationCompetence {
    idCompetence : Types.ObjectId;
    nb_h_cible: number;
    nb_p_cible: number;
    nb_h_actuel: number;
    nb_p_actuel: number;
}

interface IParcoursJourneeType {
    idParcours: Types.ObjectId;
    nbParcours: number;
    pourcentage_utilisation: number;
}

export interface IJourneeType extends Document {
    nom: string;
    planificationParcours: IParcoursJourneeType[];
    liste_Competence: IUtilisationCompetence[];
}

const utilisationCompetenceSchema = new Schema<IUtilisationCompetence>({
    idCompetence:{type: Schema.Types.ObjectId, ref: 'Competence'},
    nb_h_cible: { type: Number },
    nb_p_cible: { type: Number },
    nb_h_actuel: { type: Number },
    nb_p_actuel: { type: Number },
});

const parcoursJourneeTypeSchema = new Schema<IParcoursJourneeType>({
    idParcours: { type: Schema.Types.ObjectId, ref: 'ParcoursType' },
    nbParcours: { type: Number },
    pourcentage_utilisation: { type: Number },
});

export const journeeTypeSchema = new Schema<IJourneeType>({
    nom: { type: String },
    planificationParcours: {type: [parcoursJourneeTypeSchema]},
    liste_Competence: { type: [utilisationCompetenceSchema] },
});


const JourneeType = mongoose.models.JourneeType
export default JourneeType;
