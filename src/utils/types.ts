type sequencable = EtapeType | GroupeEtapeType

type EtapeType = {
    _id: string,
    name: string,
    type: "EtapeType",
    duree: number,
    competences: competence[],
    lieux : ressource[],
    materiels: ressource[],
    aJeun:boolean
}

type GroupeEtapeType = {
    _id: string,
    name: string,
    type: "GroupeEtapeType",
    Etapes:sequencable[]
}

type precedence = {
    _id: string,
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
    _id: string,
    name: string,
    type: string,
    sequencables : sequencable[]
    precedences: precedence[]

}
type parcoursList = parcours[]