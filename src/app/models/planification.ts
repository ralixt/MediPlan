import mongoose, { Schema, Document, Types } from 'mongoose';
import { IJourneeType, journeeTypeSchema } from './journeeType';

interface IPlanification extends Document {
    nom: string;
    listeJourneeType: IJourneeType[];
}

const planificationSchema = new Schema<IPlanification>({
    nom: { type: String },
    listeJourneeType: {type: [journeeTypeSchema]},
});


const Planifications = mongoose.models.Planifications||mongoose.model<IPlanification>('Planifications', planificationSchema);

export default Planifications;