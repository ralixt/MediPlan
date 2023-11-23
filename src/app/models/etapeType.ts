import mongoose, { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';
import { Competence } from './competence';
import { Ressource } from './ressource';

interface IEtapeType extends Document {
  name: string;
  type: string;
  duree: number;
  Competence: Competence['_id'][];
  Lieu: Ressource['_id'][];
  Materiel: Ressource['_id'][]; // materiel dépend du type
  a_jeun: boolean;
  Etapes : Types.ObjectId[];
}

const etapeTypeSchema = new Schema<IEtapeType>({

  name: { type: String, required: true },
  type: { type: String, required: true , enum : ['EtapeType','GroupeEtapeType']},
  duree: { type: Number },
  Competence: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competence' }],
  Lieu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ressource' }],
  Materiel:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ressource' }],
  a_jeun: { type: Boolean },
  Etapes : [ {type: Schema.Types.ObjectId, ref: 'EtapeType'}]
});

const EtapeType = mongoose.models.EtapeType||mongoose.model<IEtapeType>('EtapeType', etapeTypeSchema);

export default EtapeType;
