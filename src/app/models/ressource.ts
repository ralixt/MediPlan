import mongoose, { Schema, Document } from 'mongoose';


export interface IResource extends Document {
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
        enum:['lieu', 'materiel' , 'personnel']
    },
});


const Ressource = mongoose.models.Ressource||mongoose.model<IResource>('Ressource', ressourceSchema);


export default Ressource;
