type sequencable = EtapeType | GroupeEtapeType;

type Border = {
  _id: string;
  type: "Border";
};
type EtapeType = {
  _id: string;
  name: string;
  type: "EtapeType";
  duree: number;
  Competence: competence[];
  Lieu: ressource[];
  Materiel: ressource[];
  aJeun: boolean;
};

type GroupeEtapeType = {
  _id: string;
  name: string;
  type: "GroupeEtapeType";
  Etapes: EtapeType[];
};

type Precedence = {
  _id: string;
  name: string;
  antecedent: string;
  successeur: string;
  type: "Precedence";
};
type competence = {
  nom: string;
};
type ressource = {
  nom: string;
  type: "Lieu";
};
type parcours = {
  _id: string;
  name: string;
  type: string;
  sequencables: sequencable[];
  precedences: Precedence[];
};
type parcoursList = parcours[];
