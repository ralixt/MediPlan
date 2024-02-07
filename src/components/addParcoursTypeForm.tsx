"use client";
import { cache, useCallback, useEffect, useState } from "react";

import { createParcoursType, getAllParcoursType } from "@/actions/ParcoursType";

import { XIcon } from "@heroicons/react/outline";
import { OneIconButtonAddParcoursType } from "@/components/buttons";
import ParcoursType from "@/app/models/parcoursType";
import { Loader } from "@/components/loader";
import { Plus } from "@phosphor-icons/react";

export function AddParcoursType({ setloading, SetParcours }) {
  const [showPopup, setShowPopup] = useState(false);
  const [parcoursTypeName, setParcoursTypeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    // Afficher la popup lorsque le bouton est cliqué
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();

    console.log("Nom du parcours type:", parcoursTypeName);

    setShowPopup(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("name", parcoursTypeName);
    formData.append("type", "ParcoursType");
    setShowPopup(false);
    setIsLoading(true);
    setloading(true);

    await createParcoursType(formData);

    setParcoursTypeName("");
    setloading(false);
    setIsLoading(false);

    window.location.reload();
  };

  return (
    <>
      <div>
        <div className="h-full flex justify-center items-center content-center">
          <OneIconButtonAddParcoursType
            text="Nouveau parcours"
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
                Saisir le nom du parcours type
              </h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={parcoursTypeName}
                  onChange={(e) => setParcoursTypeName(e.target.value)}
                  placeholder="Nom du parcours type"
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
