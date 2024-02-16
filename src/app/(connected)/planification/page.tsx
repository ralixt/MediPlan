import {cache} from "react";
import {getNameParcoursType} from "@/actions/ParcoursType";


const getParcoursBDD = cache(async () => {
    const response = await getNameParcoursType();
    return response;
});




export default function Planification() {


    return (<>


        </>
    )
}