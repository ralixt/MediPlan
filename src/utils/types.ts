type sequencable = EtapeType | GroupeEtapeType

type EtapeType = {
    uid: string,
    name: string,
    type: "EtapeType",
    duree: number,
    competences: competence[],
    lieux : ressource[],
    materiels: ressource[],
    aJeun:boolean
}

type GroupeEtapeType = {
    uid: string,
    name: string,
    type: "GroupeEtapeType",
    Etapes:sequencable[]
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