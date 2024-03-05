import { Minus, Plus } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { updateNumberParcours } from "@/actions/Planification";
import JourneeType from "@/app/models/journeeType";

type PlanificationParcoursProps = {
  id: string;
  Planification_id: string;
  name: string;
  JourneeType_id: string;
  JourneeType: JourneeType;
  dataPlanif: parcoursJourneeType;
};

export default function PlanificationParcours({
  id,
  Planification_id,
  name,
  JourneeType_id,
  JourneeType,
  dataPlanif,
}: PlanificationParcoursProps) {
  const [nbParcours, setNbParcours] = useState<number>(dataPlanif.nbParcours);

  const handlePlusClick = () => {
    setNbParcours((i) => i + 1);
  };

  const handleMinusClick = () => {
    if (nbParcours > 0) {
      setNbParcours((i) => i - 1);
    }
  };

  useEffect(() => {
    async function updateParcours() {
      await updateNumberParcours(
        Planification_id,
        JourneeType_id,
        nbParcours,
        dataPlanif.idParcours,
        JourneeType
      );
    }

    updateParcours();
  }, [nbParcours]);
  return (
    <div key={id} className="w-96 text-xl my-4 ">
      <div className="flex flex-row mr-10">
        <div className="w-52 h-20 bg-lightlightgrey shadow-md rounded-xl flex items-center content-center justify-center p-4">
          <p>{name}</p>
        </div>
        <div className="w-20 h-20 bg-lightlightgrey ml-12 mr-6 flex items-center shadow-md rounded-xl p-4">
          <div className="h-full border-negative border-4 rounded-xl"></div>
          <div className="ml-4">{dataPlanif.pourcentage_utilisation}</div>
        </div>
        <div className="w-48 h-20 bg-light-blue rounded-xl ">
          <div className="w-full h-full bg-lightlightgrey text-4xl flex items-center justify-around shadow-md rounded-xl p-4 translate-x-[-0.3rem] translate-y-[-0.3rem]">
            <button onClick={handleMinusClick}>
              <Minus size={32} />
            </button>

            <div>{nbParcours}</div>
            <button onClick={handlePlusClick}>
              <Plus size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
