import mongoose, { Schema, Document, Types } from 'mongoose';
import { EtapeType } from './etapeType';

interface IParcoursType extends Document {
    name: string;
    type: string;
    sequencables: Types.ObjectId[];
    precedences: {
        antecedent: Types.ObjectId;
        successeur: Types.ObjectId;
    }[];
}

const parcoursTypeSchema = new Schema<IParcoursType>({
    name: { type: String },
    type: { type: String },
    sequencables: [{ type: Schema.Types.ObjectId, ref: 'EtapeType' }],
    precedences: [{
        antecedent: { type: Schema.Types.ObjectId, ref: 'EtapeType' },
        successeur: { type: Schema.Types.ObjectId, ref: 'EtapeType' },
    }],
});

const ParcoursType = mongoose.models.ParcoursType||mongoose.model<IParcoursType>('ParcoursType', parcoursTypeSchema);

export default ParcoursType;
