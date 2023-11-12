import mongoose, { Schema, Document } from 'mongoose';
import { Competence } from './competence';
import { Ressource } from './ressource';

interface IEtapeType extends Document {
  uid: string;
  name: string;
  type: string;
  duree: number;
  Competence: Competence['_id'][];
  Ressource: Ressource['_id'][];
  Materiel: string[];
  a_jeun: boolean;
}

const etapeTypeSchema = new Schema<IEtapeType>({

  name: { type: String, required: true },
  type: { type: String, required: true },
  duree: { type: Number, required: true },
  Competence: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competence' }],
  Ressource: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ressource' }],
  Materiel: { type: [String], default: ['Materiel_non_defini'] },
  a_jeun: { type: Boolean, required: true },
});

const EtapeType = mongoose.model<IEtapeType>('EtapeType', etapeTypeSchema);

export default EtapeType;
