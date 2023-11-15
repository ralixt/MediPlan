type sequencable = {
    uid: string,
    name: string,
    type: "EtapeType" | "GroupeEtapeType",
    duree?: number,
    competences?: competence[],
    lieux? : ressource[],
    materiels?: ressource[],
    aJeun?:boolean
    Etapes?:sequencable[]
}
type precedence = {
    uid: string,
    name: string,
    antecedent : string,
    successeur : string,
    type:"Precendence"
}
type competence={
    nom: string
}
type ressource = {
    nom: string,
    type: "Lieu"
}
type parcours = {
    uid: string,
    name: string,
    type: string,
    sequencables : sequencable[]
    precedences: precedence[]

}
type parcoursList = parcours[]