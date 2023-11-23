
type propsET = {
    etapeType : EtapeType
}
export function EtapeType({etapeType}: propsET){
    return(
        <p>Etape type: {etapeType.name}</p>
    )
}

type propsGET = {
    groupeEtapeType:GroupeEtapeType
}
export function GroupeEtapeType({groupeEtapeType}:propsGET){
    return (
        <div>
            <p>Groupe Etape Type: {groupeEtapeType.name} :</p>
            {groupeEtapeType.Etapes.map((etape:sequencable) => <p>{etape.name}</p>)}
            <p>fin Groupe Etape</p>
        </div> 
    )
}

type propsP = {
    precedence : precedence
}

export function Precedence({precedence} : propsP){
    return(
        <p>precedence: {precedence.name}</p>
    )
}