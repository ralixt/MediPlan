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
  a_Jeun: boolean;
};

type GroupeEtapeType = {
  _id: string;
  name: string;
  type: "GroupeEtapeType";
  Etapes: EtapeType[];
};

type Precedence = {
  _id: string;
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

type planificationParcours = {
  idParcours: string;
  nbParcours: number;
  pourcentage_utilisation: number;
}

type listeUtilisationCompetence = {
  idCompetence: string;
  nb_h_cible: number;
  nb_p_cible: number;
  nb_h_actuel: number;
  nb_p_actuel: number;
}

type Planification = {
  _id: string;
  nom: string;
  planificationParcours: planificationParcours[];
  liste_Competence: listeUtilisationCompetence[];
}
