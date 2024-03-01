import mongoose, { Schema, Document, Types } from 'mongoose';

interface IUtilisationCompetence {
    id_comp : Types.ObjectId;
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

interface IJourneeType extends Document {
    nom: string;
    liste_Parcours: IParcoursJourneeType[];
    liste_Comp: IUtilisationCompetence[];
}

const utilisationCompetenceSchema = new Schema<IUtilisationCompetence>({
    id_comp:{type: Schema.Types.ObjectId, ref: 'Competence', required: true},
    nb_h_cible: { type: Number, required: true },
    nb_p_cible: { type: Number, required: true },
    nb_h_actuel: { type: Number, required: true },
    nb_p_actuel: { type: Number, required: true },
});

const parcoursJourneeTypeSchema = new Schema<IParcoursJourneeType>({
    idParcours: { type: Schema.Types.ObjectId, ref: 'ParcoursType', required: true },
    nbParcours: { type: Number, required: true },
    pourcentage_utilisation: { type: Number, required: true },
});

const journeeTypeSchema = new Schema<IJourneeType>({
    nom: { type: String, required: true },
    liste_Parcours: {type: [parcoursJourneeTypeSchema], required: true},
    liste_Comp: { type: [utilisationCompetenceSchema], required: true },
});


const JourneeType = mongoose.models.JourneeType||mongoose.model<IJourneeType>('JourneeType', journeeTypeSchema);

export default JourneeType;
