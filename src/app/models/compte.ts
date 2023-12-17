import mongoose, { Schema, Document } from 'mongoose';

interface ICompte extends Document {
    username: string;
    password:string;
}

const compteSchema = new Schema<ICompte>({
    username: { type: String },
    password: { type: String},
});

const Compte = mongoose.models.compte|| mongoose.model<ICompte>('compte', compteSchema);

export default Compte;
