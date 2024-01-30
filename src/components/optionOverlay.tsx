import { deleteEtapeTypeById } from "@/actions/EtapeType";

export default function OptionOverlay({setShowModifierForm, setShowOptions, setConfirmDelete,SetEtapes, confirmDelete, etape}) {
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

  const handleConfirmationClick = async (event) => {
    event.preventDefault();
    await deleteEtapeTypeById(etape._id);
    console.log("Supprimer confirmed");

    setShowOptions(false);
    setConfirmDelete(false);

    SetEtapes((prevEtapeType) =>
      prevEtapeType.filter((et) => et._id !== etape._id)
    );
  };

  const handleAnnulerClick = () => {
    // Annuler la suppression
    setConfirmDelete(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md relative flex flex-col items-center w-[400px]">
        {confirmDelete ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Êtes-vous sûr de supprimer l'étape type ?
            </h2>
            <button
              onClick={handleConfirmationClick}
              className="w-full bg-red-500 text-white px-4 py-2 rounded mb-2"
            >
              Oui
            </button>
            <button
              onClick={handleAnnulerClick}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded"
            >
              Annuler
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Options</h2>
            <button
              onClick={handleModifierClick}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-2"
            >
              Modifier
            </button>
            <button
              onClick={handleSupprimerClick}
              className="w-full bg-red-500 text-white px-4 py-2 rounded mb-2"
            >
              Supprimer
            </button>
            <button
              onClick={handleRetourClick}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded"
            >
              Retour
            </button>
          </>
        )}
      </div>
    </div>
  );
}
