
export function EtapeType(etapeType:sequencable){
    if(etapeType.type != "EtapeType")
        return <p>error</p>
    return(
        <p>Etape type: {etapeType.name}</p>
    )
}

export function GroupeEtapeType(GroupeEtapeType:sequencable){
    if(GroupeEtapeType.type != "GroupeEtapeType")
        return <p>error</p>
    return (
        <p>Groupe Etape Type: {GroupeEtapeType.name}</p>
    )
}

export function precedence(precedence : precedence){
    return(
        <p>precedence: {precedence.name}</p>
    )
}