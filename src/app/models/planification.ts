import mongoose, { Schema, Document, Types } from 'mongoose';
import { IJourneeType, journeeTypeSchema } from './journeeType';

interface IPlanification extends Document {
    nom: string;
    liste_JourneeType: IJourneeType[];
}

const planificationSchema = new Schema<IPlanification>({
    nom: { type: String },
    liste_JourneeType: {type: [journeeTypeSchema]},
});


const Planifications = mongoose.models.Planifications||mongoose.model<IPlanification>('Planifications', planificationSchema);

export default Planifications;