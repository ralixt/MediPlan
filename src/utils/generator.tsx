import {
  EtapeType,
  GroupeEtapeType,
  Precedence,
} from "@/components/modelingComponents";

const findIndex = (
  tableaux: Array<GroupeEtapeType | EtapeType | Precedence>[],
  _id: String
) => {
  for (let indexG = 0; indexG < tableaux.length; indexG++) {
    let index = tableaux[indexG].findIndex((value) => value._id === _id);
    if (index !== -1) {
      return { indexG, index };
    }
  }
  return -1;
};

const generate = (parcours: parcours) => {
  //console.log("generate")
  let etapesTypes: EtapeType[] = parcours.sequencables.filter(
    (sequencable): sequencable is EtapeType => sequencable.type == "EtapeType"
  );
  let groupesEtapesType: GroupeEtapeType[] = parcours.sequencables.filter(
    (sequencable): sequencable is GroupeEtapeType =>
      sequencable.type == "GroupeEtapeType"
  );
  for (let groupeEtapeType of groupesEtapesType) {
    const groupEtapeTypeIds = groupeEtapeType.Etapes.map((etape) => etape._id);
    etapesTypes = etapesTypes.filter(
      (etapeType) => !groupEtapeTypeIds.includes(etapeType._id)
    );
  }
  let sequencables: (GroupeEtapeType | EtapeType)[] = etapesTypes;
  sequencables = sequencables.concat(groupesEtapesType);

  const precedences: Precedence[] = parcours.precedences;
  const groupes: Array<GroupeEtapeType | EtapeType | Precedence>[] = [];

  for (let precedence of precedences) {
    const indexS = findIndex(groupes, precedence.successeur);
    const indexA = findIndex(groupes, precedence.antecedent);

    if (indexS == -1 && indexA == -1) {
      const antecedant = sequencables.find(
        (sequencable) => sequencable._id == precedence.antecedent
      );
      const successeur = sequencables.find(
        (sequencable) => sequencable._id == precedence.successeur
      );
      if (antecedant !== undefined && successeur !== undefined) {
        groupes.push([antecedant, precedence, successeur]);
        // console.log(groupes)
        const indexASupprimer = sequencables.findIndex(
          (sequencable) => sequencable._id === successeur._id
        );
        const indexASupprimer2 = sequencables.findIndex(
          (sequencable) => sequencable._id === antecedant._id
        );

        if (indexASupprimer !== -1 && indexASupprimer2 !== 1) {
          sequencables.splice(indexASupprimer, 1);
          sequencables.splice(indexASupprimer2, 1);
        }
      }
    } else if (indexS == -1 && indexA !== -1) {
      const successeur = sequencables.find(
        (sequencable) => sequencable._id == precedence.successeur
      );
      if (successeur !== undefined) {
        groupes[indexA.indexG].splice(
          indexA.index + 1,
          0,
          precedence,
          successeur
        );
        const indexASupprimer = sequencables.findIndex(
          (sequencable) => sequencable._id === successeur._id
        );

        if (indexASupprimer !== -1) {
          sequencables.splice(indexASupprimer, 1);
        }
      }
    } else if (indexS !== -1 && indexA == -1) {
      const antecedant = sequencables.find(
        (sequencable) => sequencable._id == precedence.antecedent
      );
      if (antecedant !== undefined) {
        groupes[indexS.indexG].splice(indexS.index, 0, antecedant, precedence);
        const indexASupprimer = sequencables.findIndex(
          (sequencable) => sequencable._id === antecedant._id
        );

        if (indexASupprimer !== -1) {
          sequencables.splice(indexASupprimer, 1);
        }
      }
    } else if (indexS !== -1 && indexA !== -1) {
      groupes[indexA.indexG] = groupes[indexA.indexG].concat(
        precedence,
        groupes[indexS.indexG]
      );
      groupes.splice(indexS.indexG, 1);
    }
  }
  groupes.sort((a, b) => b.length - a.length);
  let groupeConcat: (GroupeEtapeType | EtapeType | Precedence | Border)[] =
    Array.prototype.concat.apply([], groupes);
  for (let element of sequencables) {
    groupeConcat.push(element);
  }
  groupeConcat.push({
    _id: "border2",
    type: "Border",
  });
  groupeConcat.splice(0, 0, {
    _id: "border1",
    type: "Border",
  });

  let allElement = parcours.sequencables.map((sequencable) => sequencable._id);
  allElement = allElement.concat(
    parcours.precedences.map((precedence) => precedence._id)
  );
  allElement.push("border1", "border2");

  return { groupeConcat, allElement };
};

export default generate;
