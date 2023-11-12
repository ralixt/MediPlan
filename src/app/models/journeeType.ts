import mongoose, { Schema, Document, Types } from 'mongoose';
import { ParcoursType } from './parcoursType';

interface IItem {
    id: string;
    nb_h_cible: number;
    nb_p_cible: number;
    nb_h_actuel: number;
    nb_p_actuel: number;
}

interface IJourneeType extends Document {
    id: number;
    nom: string;
    parcours: {
        parcours_id: Types.ObjectId;
        nbParcours: number;
        pourcentage_util: number;
    }[];
    liste_Comp: IItem[];
}

const itemSchema = new Schema<IItem>({
    id: { type: String, required: true },
    nb_h_cible: { type: Number, required: true },
    nb_p_cible: { type: Number, required: true },
    nb_h_actuel: { type: Number, required: true },
    nb_p_actuel: { type: Number, required: true },
});

const journeeTypeSchema = new Schema<IJourneeType>({
    id: { type: Number, required: true },
    nom: { type: String, required: true },
    parcours: [
        {
            parcours_id: { type: Schema.Types.ObjectId, ref: 'ParcoursType', required: true },
            nbParcours: { type: Number, required: true },
            pourcentage_util: { type: Number, required: true },
        },
    ],
    liste_Comp: { type: [itemSchema], required: true },
});

const JourneeType = mongoose.model<IJourneeType>('JourneeType', journeeTypeSchema);

export default JourneeType;
