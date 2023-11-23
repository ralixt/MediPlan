import mongoose, { Schema, Document } from 'mongoose';

interface ICompetence extends Document {
    nom: string;
}

const competenceSchema = new Schema<ICompetence>({
    nom: { type: String, required: true },
});

const Competence = mongoose.model<ICompetence>('competences', competenceSchema);

export default Competence;
