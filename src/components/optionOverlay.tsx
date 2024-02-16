import { deleteEtapeTypeById } from "@/actions/EtapeType";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";

type props = {
  setShowModifierForm: Dispatch<SetStateAction<boolean>>;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  setConfirmDelete: Dispatch<SetStateAction<boolean>>;
  SetEtapes: React.Dispatch<
    React.SetStateAction<
      EtapeType[] | (EtapeType | GroupeEtapeType | Border | Precedence)[]
    >
  >;
  confirmDelete: boolean;
  etape: EtapeType;
};

export default function OptionOverlay({
  setShowModifierForm,
  setShowOptions,
  setConfirmDelete,
  SetEtapes,
  confirmDelete,
  etape,
}: props) {
  const handleModifierClick = () => {
    setShowModifierForm(true);
    setShowOptions(false);
    setConfirmDelete(false);
  };

  const handleSupprimerClick = () => {
    setConfirmDelete(true);
    setShowModifierForm(false);
  };

  const handleRetourClick = () => {
    setShowOptions(false);
    setConfirmDelete(false);
  };

  const handleConfirmationClick : MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    await deleteEtapeTypeById(etape._id);
    console.log("Supprimer confirmed");

    setShowOptions(false);
    setConfirmDelete(false);

    SetEtapes((prevEtapeType) =>
      prevEtapeType.filter((et) => et._id !== etape._id)
    );
    window.location.reload();
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
              <h2 className="text-2xl font-bold mb-4">Supprimer étape</h2>
              <p>Voulez vous supprimer L’étape {etape.name} ?</p>
            </div>

            <button
              onClick={handleConfirmationClick}
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
              onClick={handleModifierClick}
              className="w-full bg-dark-blue text-white px-4 py-2 rounded-xl mb-4 hover:rounded-full"
            >
              Modifier
            </button>
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
