import {Clock, Minus, Plus, Users} from "@phosphor-icons/react";

type PlanificationParcoursProps = {
    id: string;
    name: string;
    dataPlanif: listeUtilisationCompetence;
};

export default function PlanifiactionCompetences({
                                                  id,
                                                  name,
                                                  dataPlanif,
                                              }: PlanificationParcoursProps) {
    return (
        <div key={id} className="flex flex-row text-xl my-4">

            <div className="w-96 h-24 flex items-center content-center justify-between rounded-xl shadow-md px-4 py-2">
                <div className="flex flex-row h-full">
                    <div className="p-4 flex flex-col justify-center content-center items-center">
                        <p className="text-[7px]">Charge</p>
                        <p className="text-2xl">45%</p>
                    </div>
                    <div className=" h-full border-4 border-positive rounded">
                    </div>
                </div>

                <div className="">
                    {name}
                </div>
                <div className="flex flex-row h-full">
                    <div className=" h-full border-2 border-lightlightgrey rounded mr-4">
                    </div>
                    <div className="flex flex-col justify-center content-center items-center">
                        <p className="text-[7px]">Heures Requises</p>
                        <p className="text-2xl">18h</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center content-center">
                <div className="flex flex-row items-center justify-center">
                    <div className="h-12 w-12 flex items-center content-center justify-center mx-8">
                        <Users size={25}/>
                    </div>

                    <div className="w-[170px] h-12 flex flex-row items-center justify-around rounded-xl shadow-md">
                        <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center">
                            <Minus size={20}/>
                        </button>
                        <p>{dataPlanif.nb_h_cible}</p>
                        <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center">
                            <Plus size={20}/>
                        </button>
                    </div>

                    <div className="w-[170px] h-12 flex flex-row items-center justify-around rounded-xl shadow-md mx-12">
                        <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center ">
                            <Minus size={20}/>
                        </button>
                        <p>{dataPlanif.nb_h_actuel}</p>
                        <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center">
                            <Plus size={20}/>
                        </button>
                    </div>


                    <div className="w-[170px] h-12 flex items-center justify-around rounded-xl shadow-md">
                        <p>-1</p>
                    </div>
                </div>


                <div className="flex flex-row items-center content-center justify-center mt-2">
                    <div className="h-12 w-12 flex items-center content-center justify-center mx-8">
                        <Clock size={25}/>
                    </div>


                    <div className="w-[170px] h-12 flex flex-row items-center justify-around rounded-xl shadow-md">
                        <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center">
                            <Minus size={20}/>
                        </button>
                        <p>{dataPlanif.nb_p_cible}</p>
                        <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center">
                            <Plus size={20}/>
                        </button>
                    </div>

                    <div className="w-[170px] h-12 flex flex-row items-center justify-around rounded-xl shadow-md mx-12">
                        <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center">
                            <Minus size={20}/>
                        </button>
                        <p>{dataPlanif.nb_p_actuel}</p>
                        <button className="w-6 h-6 bg-lightlightgrey rounded flex items-center justify-center">
                            <Plus size={20}/>
                        </button>
                    </div>

                    <div className="w-[170px] h-12 flex items-center justify-around rounded-xl shadow-md">
                        <p>-1</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
