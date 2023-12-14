"use client";
import { cache, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Door,
  DotsThreeOutlineVertical,
  ForkKnife,
} from "@phosphor-icons/react";
import { DndContext } from "@dnd-kit/core";

type props = {
  element: React.ReactNode[];
  parcour: parcours;
};

export default function ModelingGenerator({ element, parcour }: props) {
  const [elements, setElement] = useState(element);
  return (
    <div
      className="flex flex-row gap-20 w-full overflow-x-scroll pl-48 pr-[50rem] h-full items-center"
      onWheel={(e) => {
        e.preventDefault();
        const container = e.currentTarget;
        const delta = Math.max(-1, Math.min(1, e.deltaY));
        container.scrollLeft += delta * 100; // Ajustez la valeur pour contrôler la vitesse du défilement horizontal
      }}
    >
      <DndContext>{elements.map((element) => element)}</DndContext>
    </div>
  );
}
