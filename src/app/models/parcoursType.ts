import mongoose, { Schema, Document, Types } from 'mongoose';
import { EtapeType } from './etapeType';

interface IParcoursType extends Document {
    name: string;
    type: string;
    Sequencable: Types.ObjectId[];
    precedences: {
        name: string;
        antecedent: Types.ObjectId;
        successeur: Types.ObjectId;
    }[];
}

const parcoursTypeSchema = new Schema<IParcoursType>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    Sequencable: [{ type: Schema.Types.ObjectId, ref: 'EtapeType' }],
    precedences: [{
        name: { type: String, required: true },
        antecedent: { type: Schema.Types.ObjectId, ref: 'EtapeType', required: true },
        successeur: { type: Schema.Types.ObjectId, ref: 'EtapeType', required: true },
    }],
});

const ParcoursType = mongoose.model<IParcoursType>('ParcoursType', parcoursTypeSchema);

export default ParcoursType;
