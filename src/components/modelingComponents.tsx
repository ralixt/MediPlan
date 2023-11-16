
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
        <div>
            <p>Groupe Etape Type: {GroupeEtapeType.name} :</p>
            {GroupeEtapeType.Etapes?.map((etape:sequencable) => <p>{etape.name}</p>)}
            <p>fin Groupe Etape</p>
        </div> 
    )
}

export function precedence(precedence : precedence){
    return(
        <p>precedence: {precedence.name}</p>
    )
}