import mongoose, { Schema, Document } from 'mongoose';

interface ICompetence extends Document {
    nom: string;
}

const competenceSchema = new Schema<ICompetence>({
    nom: { type: String },
});

const Competence =mongoose.models.Competence|| mongoose.model<ICompetence>('Competence', competenceSchema);

export default Competence;
