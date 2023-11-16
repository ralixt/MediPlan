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
        enum:['lieu', 'materiel' , 'personel']
    },
});


const Ressource = mongoose.model<IResource>('Ressource', ressourceSchema);


export default Ressource;
