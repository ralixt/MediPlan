import JourneeType from "@/app/models/journeeType";


export async function getJourneeTypeById(id:string){
    try {
        const Planif=await JourneeType.findById(id)
        return Planif;
    }catch (e) {
        console.log(e)
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
        return updatedJourneeType;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la JourneeType :", error);
        throw error;
    }
}