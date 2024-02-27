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
    <div key={id} className="flex flex-row">
      <div className="w-52 h-20 bg-lightGrey shadow-md rounded-xl">
        <p>{name}</p>
      </div>
    </div>
  );
}
