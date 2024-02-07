"use client";

import { getComp, getLieu, getMateriel } from "@/actions/CreateCompTest";
import { updateEtapeType } from "@/actions/EtapeType";
import { Clock, Door, User } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { EtapeType } from "./modelingComponents";

export default function ModifierOverlay({ etape, setShowModifierForm }) {
  const [nameEtapeType, setNameEtapeType] = useState("");
  const [type, setType] = useState("");
  const [competenceId, setCompetenceId] = useState("");
  const [lieuId, setLieuId] = useState("");
  const [materielId, setMaterielId] = useState("");
  const [AJeun, setAJeun] = useState(false);
  const [Duree, setDuree] = useState("");
  const [competence, setCompetence] = useState([]);
  const [lieu, setLieu] = useState([]);
  const [materiel, setMateriel] = useState([]);
  const formData = {
    name: nameEtapeType,
    type: type,
    duree: Duree,
    Competence: competenceId,
    Lieu: lieuId,
    Materiel: materielId,
    a_jeun: AJeun,
  };

  const handleEtapeTypeChangeCompetence = async (event) => {
    setCompetenceId(event.target.value);
  };

  const handleEtapeTypeChangeMateriel = (event) => {
    setMaterielId(event.target.value);
  };

  useEffect(() => {
    const fetchDataComp = async () => {
      try {
        const fetchedCompetence = await getComp();
        setCompetence(fetchedCompetence);
      } catch (error) {
        console.error("Erreur de fetch:", error);
      }
    };

    const fetchDataLieu = async () => {
      try {
        const fetchedLieu = await getLieu();

        setLieu(fetchedLieu);
      } catch (error) {
        console.error("Error de fetch Lieu:", error);
      }
    };

    const fetchDataMateriel = async () => {
      try {
        const fetchedMateriel = await getMateriel();
        setMateriel(fetchedMateriel);
      } catch (error) {
        console.error("Erreur de fetch Materiel:", error);
      }
    };

    fetchDataComp();
    fetchDataLieu();
    fetchDataMateriel();
    setNameEtapeType(etape.name);
    setType(etape.type);
    setCompetenceId(etape.Competence[0]._id);
    setLieuId(etape.Lieu[0]._id);
    setMaterielId(etape.Materiel[0]._id);
    setAJeun(etape.a_jeun);
    setDuree(etape.duree);
  }, [etape]);

  const handleUpdateEtapeType = async (event) => {
    event.preventDefault();
    let id = etape._id;
    if (etape._id.length > 24) {
      id = id.slice(0, -5);
    }
    await updateEtapeType(id, formData);

    setShowModifierForm(false);

    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-[20px] shadow-md relative flex flex-col items-center">
        <form>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-center pb-5">
              Ajouter une nouvelle étape type
            </h2>
            <div className="flex flex-row w-full border-b-2 mb-8 font-bold  mb-10">
              <input
                id="stepName"
                type="text"
                className="w-full outline-none bg-white text-2xl"
                placeholder="Nom de l'étape"
                value={nameEtapeType}
                onChange={(e) => {
                  setNameEtapeType(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-row w-full border-b-2 mb-8 mb-10">
              <input
                id="time"
                type="number"
                className="w-full outline-none bg-white"
                placeholder="Temps"
                value={Duree}
                onChange={(e) => {
                  setDuree(e.target.value);
                }}
              ></input>
              <Clock size={24} />
            </div>
            <div>
              <label className="flex switch">
                <input
                  id="fasting"
                  type="checkbox"
                  name="aJeun"
                  checked={AJeun}
                  onChange={() => setAJeun((AJeun) => !AJeun)}
                />
                <span className="slider round"></span>
              </label>
              <label htmlFor="fasting" className="font-medium text-center">
                À jeun
              </label>
            </div>
            <div className="flex flex-row w-full border-b-2 mb-8">
              <select
                id="lieuId"
                name="lieuId"
                value={lieuId}
                onChange={(e) => {
                  setLieuId(e.target.value);
                }}
                className="w-full outline-none bg-white"
              >
                <option value="" disabled>
                  Sélectionnez un lieu
                </option>
                {lieu.map((l) => (
                  <option key={l._id} value={l._id}>
                    {l.nom}
                  </option>
                ))}
              </select>
              <Door size={24} />
            </div>
            <div className="flex flex-row w-full border-b-2 mb-8">
              <select
                id="competenceId"
                name="competenceId"
                value={competenceId}
                onChange={handleEtapeTypeChangeCompetence}
                className="w-full outline-none bg-white"
              >
                <option value="" disabled>
                  Sélectionnez une compétence requise
                </option>
                {competence.map((comp) => (
                  <option key={comp._id} value={comp._id}>
                    {comp.nom}
                  </option>
                ))}
              </select>
              <User size={24} />
            </div>
            <div className="flex flex-row w-full border-b-2 mb-8">
              <select
                id="materielId"
                name="materielId"
                value={materielId}
                onChange={handleEtapeTypeChangeMateriel}
                className="w-full outline-none bg-white"
              >
                <option value="" disabled>
                  Sélectionnez un materiel
                </option>
                {materiel.map((m) => (
                  <option value={m._id}>{m.nom}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-auto justify-center gap-12 pt-5">
              <button className="px-4 py-2 text-white bg-lightgrey rounded-md">
                Annuler
              </button>
              <button
                onClick={handleUpdateEtapeType}
                type="submit"
                className="px-4 py-2 text-white bg-dark-blue rounded-md"
              >
                Ajouter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
