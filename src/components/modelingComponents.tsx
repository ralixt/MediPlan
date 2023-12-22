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

type propsET = {
  etapeType: EtapeType;
};
export function EtapeType({ etapeType }: propsET) {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({
      id: etapeType._id,
    });
  return (
    <div
      className={`flex flex-col justify-between bg-white shadow-md rounded-3xl p-8 w-52 h-64 ${
        isOver ? "border-2 border-black" : ""
      }`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <h2 className="font-bold text-2xl">{etapeType.name}</h2>

      <div className="my-2">
        <div className="flex flex-row items-center">
          <Clock size={25} />
          <p className="ml-2 text-xl">{etapeType.duree}</p>'
        </div>

        {etapeType.aJeun && (
          <div className="flex flex-row items-center mt-2">
            <ForkKnife size={32} />
            <p className="ml-2 text-xl">{etapeType.aJeun}</p>
          </div>
        )}

        <div className="flex flex-row items-center mt-2">
          <Door size={25} />

          {etapeType.Lieu.map((lieu, index) => (
            <p key={index} className="ml-2 text-xl">
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
export function EtapeTypeOver({ etapeType }: propsET) {
  return (
    <div className="flex flex-col justify-between bg-white shadow-md rounded-3xl p-8 w-52 h-64">
      <h2 className="font-bold text-2xl">{etapeType.name}</h2>

      <div className="my-2">
        <div className="flex flex-row items-center">
          <Clock size={25} />
          <p className="ml-2 text-xl">{etapeType.duree}</p>'
        </div>

        {etapeType.aJeun && (
          <div className="flex flex-row items-center mt-2">
            <ForkKnife size={32} />
            <p className="ml-2 text-xl">{etapeType.aJeun}</p>
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
      className={` rounded-2xl p-12 flex flex-col m-12 ${
        isOver
          ? "border-2 border-black"
          : "border-2 border-lightgrey border-dashed"
      }`}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <p>Groupe Etape Type: {groupeEtapeType.name} :</p>
      <div ref={droppable.setNodeRef} className="flex flex-row">
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
  precedence: precedence;
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
      <p>precedence: {precedence.name}</p>
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
  border: border;
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
