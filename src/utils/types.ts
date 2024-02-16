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
  Lieu: lieu[];
  Materiel: lieu[];
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
  _id: string
  nom: string;
};
type lieu = {
  _id:string
  nom: string;
  type: "Lieu";
};

type materiel= {
  _id:string
  nom: string;
  type: "materiel";
}
type parcours = {
  _id: string;
  name: string;
  type: string;
  sequencables: sequencable[];
  precedences: Precedence[];
};
type parcoursList = parcours[];

type parcoursJourneeType = {
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

type JourneeType = {
  _id: string; 
  nom: string;
  planificationParcours: parcoursJourneeType[];
  liste_Competence: listeUtilisationCompetence[];
}

type Planification = {
  _id: string;
  nom: string;
  liste_JourneeType: JourneeType[];
}