import { deleteEtapeTypeById } from "@/actions/EtapeType";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";

type props = {
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  setConfirmDelete: Dispatch<SetStateAction<boolean>>;
  handleClick: () => void;
  confirmDelete: boolean;
  name: string;
};

export default function OptionMenuOverlay({
  setShowOptions,
  setConfirmDelete,
  confirmDelete,
  name,
  handleClick,
}: props) {
  const handleSupprimerClick = () => {
    setConfirmDelete(true);
    handleClick();
  };

  const handleRetourClick = () => {
    setShowOptions(false);
    setConfirmDelete(false);
  };

  const handleAnnulerClick = () => {
    // Annuler la suppression
    setConfirmDelete(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-3xl shadow-md relative flex flex-col items-center content-center justify-center w-[415px] h-64">
        {confirmDelete ? (
          <>
            <div className="flex flex-col items-center content-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Supprimer le parcours</h2>
              <p>Voulez vous supprimer La parcours {name} ?</p>
            </div>

            <button
              onClick={handleClick}
              className="w-full bg-negative text-white px-4 py-2 rounded-xl mb-2 hover:rounded-full"
            >
              Oui
            </button>
            <button
              onClick={handleAnnulerClick}
              className="w-full bg-lightgrey px-4 py-2 rounded-xl hover:rounded-full"
            >
              Annuler
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-8">Options</h2>
            <button
              onClick={handleSupprimerClick}
              className="w-full bg-negative text-white px-4 py-2 rounded-xl mb-4 hover:rounded-full"
            >
              Supprimer
            </button>
            <button
              onClick={handleRetourClick}
              className="w-full bg-lightgrey px-4 py-2 rounded-xl hover:rounded-full"
            >
              Retour
            </button>
          </>
        )}
      </div>
    </div>
  );
}
