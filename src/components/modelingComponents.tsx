"use client";
import {
  Clock,
  Door,
  DotsThreeOutlineVertical,
  ForkKnife,
  User,
} from "@phosphor-icons/react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { set } from "mongoose";
import { CSS } from "@dnd-kit/utilities";
import {
  horizontalListSortingStrategy,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { useState } from "react";
import ModifierOverlay from "./modifierOverlay";
import OptionOverlay from "./optionOverlay";

type propsET = {
  etapeType: EtapeType;
  SetEtapes: any;
};

export function EtapeType({ etapeType, SetEtapes }: propsET) {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({
      id: etapeType._id,
    });

  const [showOptions, setShowOptions] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showModifierForm, setShowModifierForm] = useState(false);

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
    setConfirmDelete(false);
  };
  return (
    <>
      {showModifierForm && (
        <ModifierOverlay
          etape={etapeType}
          setShowModifierForm={setShowModifierForm}
        />
      )}

      {showOptions && (
        <OptionOverlay
          setShowModifierForm={setShowModifierForm}
          setShowOptions={setShowOptions}
          setConfirmDelete={setConfirmDelete}
          SetEtapes={SetEtapes}
          confirmDelete={confirmDelete}
          etape={etapeType}
        />
      )}
      <div
        className={`bg-white  rounded-3xl p-8 w-[210px] h-80 mr-4 flex flex-col justify-between ${
          isOver
            ? "shadow-[inset_0px_0px_10px_0px_rgba(6,16,19,0.25)]"
            : "shadow-md"
        }`}
      >
        <div
          className={`flex flex-col justify-start w-full h-full`}
          ref={setNodeRef}
          {...listeners}
          {...attributes}
        >
          <h2 className="font-bold text-2xl overflow-hidden whitespace-nowrap">
            <span className="overflow-ellipsis">{etapeType.name}</span>
          </h2>

          <div className="my-2">
            <div className="flex flex-row items-center">
              <Clock size={25} />
              <p className="ml-2 text-lg">{etapeType.duree}</p>'
            </div>

            {etapeType.a_Jeun && (
              <div className="flex flex-row items-center mt-2">
                <ForkKnife size={25} className=" flex-shrink-0" />
                <p className="ml-2 text-lg">{etapeType.a_Jeun}</p>
              </div>
            )}

            <div className="flex flex-row items-center mt-2">
              <Door size={25} className=" flex-shrink-0" />

              {etapeType.Lieu.map((lieu, index) => (
                <p key={index} className="ml-2 text-lg">
                  {lieu.nom}
                </p>
              ))}
            </div>

            <div className="flex flex-row items-center mt-2">
              <User size={25} className=" flex-shrink-0" />

              {etapeType.Competence.map((competence, index) => (
                <p key={index} className="ml-2 text-lg">
                  {competence.nom}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="rounded-full hover:bg-gray-200">
            <DotsThreeOutlineVertical
              size={32}
              weight="fill"
              color="#009BD4"
              onClick={handleOptionsClick}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export function EtapeTypeOver({ etapeType }: propsET) {
  return (
    <div className="flex flex-col justify-between bg-white shadow-md rounded-3xl p-8 w-52 h-64">
      <h2 className="font-bold text-2xl">{etapeType.name}</h2>

      <div className="my-2">
        <div className="flex flex-row items-center">
          <Clock size={25} />
          <p className="ml-2 text-xl">{etapeType.duree}</p>'
        </div>

        {etapeType.a_Jeun && (
          <div className="flex flex-row items-center mt-2">
            <ForkKnife size={32} />
            <p className="ml-2 text-xl">{etapeType.a_Jeun}</p>
          </div>
        )}

        <div className="flex flex-row items-center mt-2">
          <Door size={25} />
          {etapeType.Lieu.map((lieu, index) => (
            <p key={index} className="ml-2">
              {lieu.nom}
            </p>
          ))}
        </div>

        <div className="flex flex-row items-center mt-2">
          <User size={25} />
          {etapeType.Competence.map((competence, index) => (
            <p key={index} className="ml-2 text-xl">
              {competence.nom}
            </p>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button className="rounded-full">
          <DotsThreeOutlineVertical size={32} weight="fill" color="#009BD4" />
        </button>
      </div>
    </div>
  );
}

type propsGET = {
  groupeEtapeType: GroupeEtapeType;
};

export function GroupeEtapeType({ groupeEtapeType }: propsGET) {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({
      id: groupeEtapeType._id,
    });
  const droppable = useDroppable({ id: groupeEtapeType._id });

  return (
    <div
      className={` rounded-2xl flex flex-col m-12 pt-2 pb-8 px-12 bg-lightlightgrey ${
        isOver
          ? "border-2 border-black"
          : "border-2 border-lightgrey border-dashed"
      }`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <p className="text-grey text-2xl w-full flex items-center content-center justify-center">
        Bloc d'étapes
      </p>
      <p>Groupe Etape Type: {groupeEtapeType.name} :</p>
      <div ref={droppable.setNodeRef} className="flex flex-row h-64">
        {groupeEtapeType.Etapes.map((etape: EtapeType) => (
          <EtapeType key={etape._id} etapeType={etape} />
        ))}
      </div>
    </div>
  );
}

export function GroupeEtapeTypeOver({ groupeEtapeType }: propsGET) {
  return (
    <div className="border-2 border-lightgrey rounded-2xl border-dashed p-4 flex flex-row">
      <p>Groupe Etape Type: {groupeEtapeType.name} :</p>
      <div className="flex flex-row">
        {groupeEtapeType.Etapes.length + " Etapes types"}
      </div>
    </div>
  );
}

type propsP = {
  precedence: Precedence;
};

export function Precedence({ precedence }: propsP) {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({
      id: precedence._id,
    });
  return (
    <div
      className={`m-5 ${isOver ? "border-2 border-black" : ""}`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <p>precedence</p>
    </div>
  );
}

export function PrecedenceOver({ precedence }: propsP) {
  return (
    <div className={`m-5`}>
      <p>precedence: {precedence.name}</p>
    </div>
  );
}

type propsB = {
  border: Border;
};

export function Border({ border }: propsB) {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({ id: border._id });
  return (
    <div
      className={`rounded-3xl p-8 w-52 h-64 ${
        isOver ? "border-2 border-black" : ""
      }`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    ></div>
  );
}

export function EtapeTypeCompact({ etape, SetEtapes }) {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({
      id: etape._id,
    });
  const [showOptions, setShowOptions] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showModifierForm, setShowModifierForm] = useState(false);

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
    setConfirmDelete(false);
  };

  return (
    <>
      {showModifierForm && (
        <ModifierOverlay
          etape={etape}
          setShowModifierForm={setShowModifierForm}
        />
      )}

      {showOptions && (
        <OptionOverlay
          setShowModifierForm={setShowModifierForm}
          setShowOptions={setShowOptions}
          setConfirmDelete={setConfirmDelete}
          SetEtapes={SetEtapes}
          confirmDelete={confirmDelete}
          etape={etape}
        />
      )}
      <div className="bg-lightlightgrey shadow-lg rounded-3xl px-8 py-4 w-full h-20 mr-4 flex flex-row justify-between items-center">
        <div
          className="flex flex-row justify-between items-center"
          ref={setNodeRef}
          {...listeners}
          {...attributes}
        >
          {/*<h2 className="font-bold">{etapeType.name}</h2>*/}
          <h2 className="font-bold text-3xl flex items-center justify-center whitespace-nowrap">
            {etape.name}
          </h2>
          <div className="text-xs ml-4 mr-12">
            <div className="flex flex-row items-center">
              <Clock size={15} />
              <p className="ml-2">{etape.duree}</p>'
            </div>

            {/*{etapeType.aJeun && (*/}
            {etape.a_jeun && (
              <div className="flex flex-row items-center ">
                <ForkKnife size={15} />
                <p className="ml-2">AJeun</p>
              </div>
            )}
            {/*)}*/}

            <div className="flex flex-row items-center ">
              <Door size={15} />
              {/*<p className="ml-2">{etapeType.lieux}</p>*/}
              <p className="ml-2 whitespace-nowrap">{etape.Lieu[0].nom}</p>
            </div>

            <div className="flex flex-row items-center">
              <User size={15} />
              {/*<p className="ml-2">{etapeType.competences}</p>*/}
              <p className="ml-2 whitespace-nowrap">
                {etape.Competence[0].nom}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center content-center">
          <button className="rounded-full">
            <DotsThreeOutlineVertical
              size={32}
              weight="fill"
              color="#009BD4"
              onClick={handleOptionsClick}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export function IconGroupeEtape({ onDragEnd }) {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: "groupeEtapeBlock",
    data: { type: "GroupeEtapeBlock" },
  });

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="flex items-center content-center justify-center border-4 border-dashed h-20 border-grey rounded-3xl p-6 text-grey w-full mr-4"
    >
      <p className="text-bold text-3xl">Bloc d'étapes</p>
    </div>
  );
}
