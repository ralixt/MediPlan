"use client";
import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";


import { OneIconButtonAddParcoursType } from "@/components/buttons";
import { Plus } from "@phosphor-icons/react";
import { createPlanification } from "@/actions/Planification";

type props = { setloading: Dispatch<SetStateAction<boolean>> };

export function AddPlanification({ setloading }: props) {
  const [showPopup, setShowPopup] = useState(false);
  const [planificationName, setPlanificationName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    // Afficher la popup lorsque le bouton est cliqué
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("name", planificationName);
    setShowPopup(false);
    setIsLoading(true);
    setloading(true);

    await createPlanification(formData);

    setPlanificationName("");
    setloading(false);
    setIsLoading(false);

    window.location.reload();
  };

  return (
    <>
      <div>
        <div className="h-full flex justify-center items-center content-center">
          <OneIconButtonAddParcoursType
            text="Nouvelle Planification"
            icon={<Plus size={32} />}
            Click={handleButtonClick}
          />
        </div>

        {showPopup && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handlePopupClose}
          >
            <div
              className="bg-white p-8 rounded-[20px] shadow-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold pb-5 px-5">
                Saisir le nom de la planification
              </h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={planificationName}
                  onChange={(e) => setPlanificationName(e.target.value)}
                  placeholder="Nom de la planification"
                  className="border p-2 mb-4 w-full rounded-md"
                />
                <div className="flex flex-row gap-12 items-center justify-center pt-2">
                  <button
                    onClick={handlePopupClose}
                    className=" bg-lightgrey text-white px-4 py-2 rounded"
                  >
                    Annuler
                  </button>
                  <button className=" bg-dark-blue text-white px-4 py-2 rounded">
                    Valider
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
