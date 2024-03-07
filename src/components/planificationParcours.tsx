import { Minus, Plus } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { updateNumberParcours } from "@/actions/Planification";
import JourneeType from "@/app/models/journeeType";

type PlanificationParcoursProps = {
  id: string;
  name: string;
  JourneeType: JourneeType;
  setJourneeType: React.Dispatch<React.SetStateAction<JourneeType | undefined>>;
  dataPlanif: parcoursJourneeType;
};

export default function PlanificationParcours({
  id,
  name,
  JourneeType,
  setJourneeType,
  dataPlanif,
}: PlanificationParcoursProps) {
  const [nbParcours, setNbParcours] = useState<number>(dataPlanif.nbParcours);
  const [maj, setMaj] = useState<boolean>(false);

  const handlePlusClick = () => {
    setNbParcours((i) => i + 1);
    setMaj(true);
  };

  const handleMinusClick = () => {
    if (nbParcours > 0) {
      setNbParcours((i) => i - 1);
      setMaj(true);
    }
  };
  useEffect(() => {
    if (maj) {
      setMaj(false);
      const nouvellePlanification = { ...JourneeType };
      const index = nouvellePlanification.planificationParcours.findIndex(
        (planifParcours) => planifParcours.idParcours === dataPlanif.idParcours
      );
      if (index !== -1) {
        nouvellePlanification.planificationParcours[index].nbParcours =
          nbParcours;
        setJourneeType(nouvellePlanification);
      } else {
        console.error("index non trouvé", dataPlanif, nouvellePlanification);
      }
    }
  }, [maj, nbParcours]);

  useEffect(() => {
    setNbParcours(dataPlanif.nbParcours);
  }, [dataPlanif]);

  return (
    <div key={id} className="w-96 text-xl my-4 ">
      <div className="flex flex-row mr-10">
        <div className="w-52 h-20 bg-lightlightgrey shadow-md rounded-xl flex items-center content-center justify-center p-4">
          <p>{name}</p>
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
