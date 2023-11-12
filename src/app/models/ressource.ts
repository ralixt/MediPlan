import mongoose, { Schema, Document } from 'mongoose';


interface IResource extends Document {
    nom: string;
    type: string;
}


const ressourceSchema = new Schema<IResource>({
    nom: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});


const Ressource = mongoose.model<IResource>('Lieu', ressourceSchema);


export default Ressource;
