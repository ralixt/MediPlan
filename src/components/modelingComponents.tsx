
export function EtapeType(etapeType:sequencable){
    if(etapeType.type != "EtapeType"){
        return "error"
    }
    return(
        <p>Etape type : {etapeType.name}</p>
    )
}