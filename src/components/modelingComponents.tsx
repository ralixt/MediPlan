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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: etapeType._id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      className="flex flex-col justify-between bg-white shadow-md rounded-3xl p-8 w-52 h-64"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
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
          <p className="ml-2 text-xl">{etapeType.lieux}</p>
        </div>

        <div className="flex flex-row items-center mt-2">
          <User size={25} />
          <p className="ml-2 text-xl">{etapeType.competences}</p>
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
            <Clock size={25}/>
            <p className="ml-2 text-xl">{etapeType.duree}</p>'
          </div>

          {etapeType.aJeun && (
              <div className="flex flex-row items-center mt-2">
                <ForkKnife size={32}/>
                <p className="ml-2 text-xl">{etapeType.aJeun}</p>
              </div>
          )}

          <div className="flex flex-row items-center mt-2">
            <Door size={25}/>
            <p className="ml-2 text-xl">{etapeType.lieux}</p>
          </div>

          <div className="flex flex-row items-center mt-2">
            <User size={25}/>
            <p className="ml-2 text-xl">{etapeType.competences}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="rounded-full">
            <DotsThreeOutlineVertical size={32} weight="fill" color="#009BD4"/>
          </button>
        </div>
      </div>
  );
}

type propsGET = {
  groupeEtapeType: GroupeEtapeType;
};

export function GroupeEtapeType({groupeEtapeType}: propsGET) {
  const {attributes, listeners, setNodeRef, transform, transition} =
      useSortable({
        id: groupeEtapeType._id,
      });
  const droppable = useDroppable({id: groupeEtapeType._id});
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
      <div
          className="border-2 border-lightgrey rounded-2xl border-dashed p-12 flex flex-row "
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
      >
        <p>Groupe Etape Type: {groupeEtapeType.name} :</p>
        <div ref={droppable.setNodeRef} className="flex flex-row">
          <DndContext>
            <SortableContext
                items={groupeEtapeType.Etapes.map((etape) => etape._id)}
                strategy={horizontalListSortingStrategy}
            >
              {groupeEtapeType.Etapes.map((etape: sequencable) => (
                  // <p>{etape.name}</p>
              <EtapeType etapeType={etape} />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <p>fin Groupe Etape</p>
    </div>
  );
}
export function GroupeEtapeTypeOver({ groupeEtapeType }: propsGET) {
  return (
    <div className="border-2 border-lightgrey rounded-2xl border-dashed p-4 flex flex-row">
      <p>Groupe Etape Type: {groupeEtapeType.name} :</p>
      <div className="flex flex-row">
        {groupeEtapeType.Etapes.map((etape: sequencable) => (
          // <p>{etape.name}</p>
          <EtapeType etapeType={etape} />
        ))}
      </div>
      <p>fin Groupe Etape</p>
    </div>
  );
}

type propsP = {
  precedence: precedence;
};
export function Precedence({ precedence }: propsP) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: precedence._id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <p
      className="m-5"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      precedence: {precedence.name}
    </p>
  );
}
export function PrecedenceOver({ precedence }: propsP) {
  return <p>precedence: {precedence.name}</p>;
}
