import {Minus, Plus} from "@phosphor-icons/react";

type PlanificationParcoursProps = {
  id: string;
  name: string;
  dataPlanif: parcoursJourneeType;
};

export default function PlanificationParcours({
  id,
  name,
  dataPlanif,
}: PlanificationParcoursProps) {
  return (
      <div key={id} className="flex flex-row text-xl my-4 w-1/2">
        <div className="w-52 h-20 bg-lightlightgrey shadow-md rounded-xl flex items-center content-center justify-center p-4">
          <p>{name}</p>
        </div>
        <div className="w-20 h-20 bg-lightlightgrey ml-12 mr-6 flex items-center shadow-md rounded-xl p-4">
            <div className="h-full border-negative border-4 rounded-xl">
            </div>
            <div className="ml-4">
                {dataPlanif.pourcentage_utilisation}
            </div>
        </div>
        <div className="w-48 h-20 bg-light-blue rounded-xl ">
            <div className="w-full h-full bg-lightlightgrey text-4xl flex items-center justify-around shadow-md rounded-xl p-4 translate-x-[-0.3rem] translate-y-[-0.3rem]">
                <button>
                    <Minus size={32}/>
                </button>

                <div>
                    {dataPlanif.nbParcours}
                </div>
                <button>
                    <Plus size={32}/>
                </button>
            </div>
        </div>
      </div>
  );
}
