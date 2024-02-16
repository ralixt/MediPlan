"use client";
import {
  Clock,
  Door,
  DotsThreeOutlineVertical,
  ForkKnife,
  PencilSimpleLine,
  User,
} from "@phosphor-icons/react";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import ModifierOverlay from "./modifierOverlay";
import OptionOverlay from "./optionOverlay";

import Image from "next/image";

type propsET = {
  etapeType: EtapeType;
  SetEtapes?: React.Dispatch<
    React.SetStateAction<(EtapeType | GroupeEtapeType | Precedence | Border)[]>
  >;
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
      {showModifierForm && SetEtapes && (
        <ModifierOverlay
          etape={etapeType}
          setShowModifierForm={setShowModifierForm}
        />
      )}

      {showOptions && SetEtapes && (
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
        className={`bg-white  rounded-3xl p-8 w-[210px] h-80 mx-2 flex flex-col justify-between ${
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

            {etapeType.a_jeun && (
              <div className="flex flex-row items-center mt-2">
                <ForkKnife size={25} className=" flex-shrink-0" />
                <p className="ml-2 text-lg">A jeun</p>
              </div>
            )}

            <div className="flex flex-row items-center mt-2">
              <Door size={25} className=" flex-shrink-0" />

              {etapeType.Lieu &&
                etapeType.Lieu.map((lieu, index) => (
                  <p key={index} className="ml-2 text-lg">
                    {lieu.nom}
                  </p>
                ))}
            </div>

            <div className="flex flex-row items-center mt-2">
              <User size={25} className=" flex-shrink-0" />

              {etapeType.Competence &&
                etapeType.Competence.map((competence, index) => (
                  <p key={index} className="ml-2 text-lg">
                    {competence.nom}
                  </p>
                ))}
            </div>
          </div>
        </div>
        {SetEtapes ? (
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
        ) : (
          ""
        )}
      </div>
    </>
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
      className={` rounded-2xl flex flex-col m-5 pt-2 pb-8 px-12 min-w-[18rem] bg-lightlightgrey ${
        isOver
          ? "border-2 border-black"
          : "border-2 border-lightgrey border-dashed"
      }`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <></>
      <p className="text-grey text-2xl w-full flex items-center content-center justify-center mb-5">
        Bloc d'étapes
      </p>
      <div
        ref={droppable.setNodeRef}
        className="flex flex-row h-80 justify-center items-center w-full"
      >
        {groupeEtapeType.Etapes.map((etape: EtapeType) => (
          <EtapeType key={etape._id} etapeType={etape} />
        ))}
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
      className={`w-fit ${isOver ? "border-2 border-black" : ""}`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <Image
        src="/precedence.svg"
        alt="Flèche précédence"
        width={100}
        height={100}
        className="w-32 "
      ></Image>
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

type propsETC = {
  etape: EtapeType;
  setEtapes: React.Dispatch<React.SetStateAction<EtapeType[]>>;
};

export function EtapeTypeCompact({ etape, setEtapes }: propsETC) {
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
          SetEtapes={
            setEtapes as React.Dispatch<
              React.SetStateAction<
                (EtapeType | GroupeEtapeType | Border | Precedence)[]
              >
            >
          }
          confirmDelete={confirmDelete}
          etape={etape}
        />
      )}
      <div className="bg-lightlightgrey shadow-lg rounded-3xl px-8 py-4 w-full h-20 mr-4 flex flex-row justify-between items-center max-w-fit">
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
            {etape.Lieu[0] ? (
              <div className="flex flex-row items-center ">
                <Door size={15} />
                {/*<p className="ml-2">{etapeType.lieux}</p>*/}
                <p className="ml-2 whitespace-nowrap">{etape.Lieu[0].nom}</p>
              </div>
            ) : (
              <div></div>
            )}
            {etape.Competence[0] ? (
              <div className="flex flex-row items-center">
                <User size={15} />
                {/*<p className="ml-2">{etapeType.competences}</p>*/}
                <p className="ml-2 whitespace-nowrap">
                  {etape.Competence[0].nom}
                </p>
              </div>
            ) : (
              <div></div>
            )}
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

export function IconGroupeEtape() {
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

export function IconPrecedence() {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: "PrecedenceData",
  });

  return (
    <div
      className="h-20 bg-light-blue flex flex-row items-center justify-center rounded-3xl w-full"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      <PencilSimpleLine size={32} />
      <p className="font-bold ml-4">Lier</p>
    </div>
  );
}
