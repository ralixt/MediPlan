import JourneeType from "@/app/models/journeeType";


export async function getJourneeTypeById(id:string){
    try {
        const Planif=await JourneeType.findById(id)
        return Planif;
        console.log("Planification : ",Planif)
    }catch (e) {
        console.log(e)
    }


}

export async function updateNumberParcours(id:string , newNumberParcours:number){

    try {

        const journeeType = await JourneeType.findById(id);

        if (!journeeType) {
            throw new Error('JourneeType non trouvé');
        }
        journeeType.nbParcours = newNumberParcours;

        const updatedJourneeType = await journeeType.save();
        console.log("JourneeType mis à jour avec les nouvelles compétences :", updatedJourneeType);
        return updatedJourneeType;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la JourneeType :", error);
        throw error;
    }
}

export async function updateCompetencesInJourneeType(id: string, newCompetences: any[]) {
    try {

        const journeeType = await JourneeType.findById(id);

        if (!journeeType) {
            throw new Error('JourneeType non trouvé');
        }
        journeeType.liste_JourneeType.liste_Competence = newCompetences;

        const updatedJourneeType = await journeeType.save();
        console.log("JourneeType mis à jour avec les nouvelles compétences :", updatedJourneeType);
        return updatedJourneeType;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la JourneeType :", error);
        throw error;
    }
}