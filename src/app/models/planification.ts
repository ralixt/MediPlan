import mongoose, { Schema, Document, Types } from 'mongoose';
import { IJourneeType, journeeTypeSchema } from './journeeType';

interface IPlanification extends Document {
    nom: string;
    listeJourneeType: IJourneeType[];
}

const planificationSchema = new Schema<IPlanification>({
    nom: { type: String, required: true },
    listeJourneeType: {type: [journeeTypeSchema], required: true},
});


const Planification = mongoose.models.JourneeType||mongoose.model<IPlanification>('Planification', planificationSchema);

export default Planification;