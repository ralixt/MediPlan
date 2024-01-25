"use client";

// Import des modules nécessaires
import React, { useState } from "react";
import {
  useSensors,
  useSensor,
  KeyboardSensor,
  PointerSensor,
} from "@dnd-kit/core";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  pointerWithin,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  EtapeType,
  GroupeEtapeType,
  Border,
  Precedence,
} from "@/components/modelingComponents";

// Définition des types
type Props = {
  element: (GroupeEtapeType | EtapeType | Precedence | Border)[];
  parcour: parcours;
  allElement: string[];
};

// Composant principal du générateur de modélisation
export default function ModelingGenerator({
  element,
  parcour,
  allElement,
}: Props) {
  // State pour suivre l'élément actif en cours de déplacement
  const [activeId, setActiveId] = useState("");
  // State pour stocker les éléments
  const [elements, setElements] = useState(element);
  // State pour stocker tous les éléments
  const [all, setAll] = useState(allElement);

  // Gestion de l'événement de défilement horizontal
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const delta = Math.max(-1, Math.min(1, e.deltaY));
    container.scrollLeft += delta * 100; // Ajustez la valeur pour contrôler la vitesse du défilement horizontal
  };

  // Configuration des capteurs pour le déplacement d'éléments
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Rendu du composant
  return (
    <div
      className="flex flex-row gap-20 w-full overflow-x-scroll px-48 h-full items-center"
      onWheel={handleWheel}
    >
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        {...sensors}
      >
        <SortableContext
          items={element.map((element) => element._id)}
          strategy={horizontalListSortingStrategy}
        >
          {elements.map((element) => {
            return renderElement(element);
          })}
        </SortableContext>
      </DndContext>
    </div>
  );

  // Fonction de rendu pour un élément donné
  function renderElement(
    element: GroupeEtapeType | EtapeType | Precedence | Border
  ) {
    if (element.type === "EtapeType") {
      return <EtapeType key={element._id} etapeType={element as EtapeType} />;
    } else if (element.type === "GroupeEtapeType") {
      return (
        <GroupeEtapeType
          key={element._id}
          groupeEtapeType={element as GroupeEtapeType}
        />
      );
    } else if (element.type === "Border") {
      return <Border key={element._id} border={element as Border} />;
    } else {
      return (
        <Precedence key={element._id} precedence={element as Precedence} />
      );
    }
  }

  // Fonction pour déterminer si un élément est de type GroupeEtapeType
  function isGroupeEtape(id: string) {
    const element = elements.find((element) => element._id === id);

    return !!(element && element.type === "GroupeEtapeType");
  }

  // Fonction pour obtenir le parent d'un élément
  function getParent(id: string) {
    for (const element of elements) {
      if (element.type === "GroupeEtapeType") {
        for (const child of element.Etapes) {
          if (child._id === id) {
            const parentId = element._id;
            const indexParent = elements.indexOf(element);
            const indexChild = element.Etapes.indexOf(child);
            return { parentId, indexParent, indexChild };
          }
        }
      }
    }
  }

  // Fonction pour déterminer si un élément est un enfant
  function isChild(id: string) {
    let elementIndex = elements.findIndex((element) => element._id === id);
    return elementIndex === -1;
  }

  // Fonction pour déterminer si un élément est une bordure de fin
  function isEndBorder(id: string) {
    const element = elements.find((element) => element._id === id);
    return (
      element !== undefined &&
      element.type === "Border" &&
      element._id === "border2"
    );
  }

  // Fonction pour déterminer si un élément est une bordure de début
  function isStartBorder(id: string) {
    const element = elements.find((element) => element._id === id);
    return (
      element !== undefined &&
      element.type === "Border" &&
      element._id === "border1"
    );
  }

  // Gestion de l'événement de début de glissement
  function handleDragStart(event: DragStartEvent) {
    const id: string = event.active.id.toString();
    setActiveId(id);
  }

  // Gestion de l'événement de fin de glissement
  function handleDragEnd(event: DragEndEvent) {
    // Si aucun élément n'est actif, ne rien faire
    if (activeId === "") {
      return;
    }

    // Récupérer l'élément actif et l'élément survolé
    const { active, over } = event;
    const id: string = active.id.toString();
    let overId = "";
    if (over) {
      overId = over.id.toString();
    } else {
      return;
    }

    // Vérification des conditions pour le déplacement
    if (
      (isGroupeEtape(id) && isGroupeEtape(overId)) ||
      isEndBorder(id) ||
      isStartBorder(id)
    ) {
      return;
    }

    // Mettre à jour les éléments avec la nouvelle disposition
    setElements((data) => {
      let items = [...data];

      // Si l'élément actif est un enfant d'un groupe
      if (isChild(id)) {
        const parentParams = getParent(id);
        if (parentParams !== undefined) {
          const { parentId, indexParent, indexChild } = parentParams;

          // Si l'élément survolé est un groupe différent, déplacer l'élément
          if (isGroupeEtape(overId) && parentId !== overId) {
            const indexOver = items.findIndex((item) => item._id === overId);

            // Vérifier si le groupe de destination existe
            if (indexOver === -1) {
              console.error("child-container", id, overId);
              return [...items];
            }

            // Déplacer l'élément de l'ancien groupe au nouveau groupe
            items[indexOver].Etapes.push(items[indexParent].Etapes[indexChild]);
            items[indexParent].Etapes.splice(indexChild, 1);
            return [...items];
          } else if (parentId !== overId) {
            // Si l'élément survolé n'est pas un groupe, mais un autre élément
            // Ajouter l'élément à la nouvelle position
            items.push(items[indexParent].Etapes[indexChild]);
            const activeIndex = items.findIndex((item) => item._id === id);
            let overIndex = items.findIndex((item) => item._id === overId);

            // Ajuster l'indice de destination en fonction des bords
            if (overIndex === -1 || activeIndex === -1) {
              console.error("child-other", id, overId);
              return items;
            }

            if (isEndBorder(overId)) {
              overIndex -= 1;
            } else if (isStartBorder(overId)) {
              overIndex += 1;
            }

            // Déplacer l'élément à la nouvelle position
            const newItem = arrayMove(items, activeIndex, overIndex);
            items[indexParent].Etapes.splice(indexChild, 1);
            return newItem;
          }
        } else {
          console.error("parent");
          return [...items];
        }
      } else if (!isGroupeEtape(id)) {
        // Si l'élément actif n'est pas un groupe
        console.log("pas groupeEtape");

        if (isGroupeEtape(overId)) {
          // Si l'élément survolé est un groupe, ajouter l'élément à ce groupe
          const activeIndex = items.findIndex((item) => item._id === id);
          const overIndex = items.findIndex((item) => item._id === overId);

          if (overIndex === -1 || activeIndex === -1) {
            console.error("other-container", id, overId);
            return [...items];
          }

          // Vérifier si l'élément n'est pas déjà dans le groupe de destination
          if (
            items[overIndex].Etapes.findIndex(
              (item: EtapeType) => item._id === id
            ) === -1
          ) {
            items[overIndex].Etapes.push(items[activeIndex]);
            items.splice(activeIndex, 1);
          }

          return items;
        } else if (isChild(overId)) {
          // Si l'élément survolé est un enfant, déplacer l'élément à son parent
          console.log("enfant");
          const parentParams = getParent(overId);
          const activeIndex = items.findIndex((item) => item._id === id);

          if (parentParams !== undefined) {
            const { parentId, indexParent, indexChild } = parentParams;

            // Vérifier si l'élément n'est pas déjà dans le groupe de destination
            if (
              items[indexParent].Etapes.findIndex(
                (item: EtapeType) => item._id === id
              ) === -1
            ) {
              items[indexParent].Etapes.push(items[activeIndex]);
              items.splice(activeIndex, 1);
            }
          } else {
            console.error("parent");
            return [...items];
          }
        } else {
          // Si l'élément survolé est un autre élément, déplacer l'élément à la nouvelle position
          const activeIndex = items.findIndex((item) => item._id === id);
          let overIndex = items.findIndex((item) => item._id === overId);

          if (overIndex === -1 || activeIndex === -1) {
            console.error("other-other", id, overId);
            return [...items];
          }

          // Ajuster l'indice de destination en fonction des bords
          if (isEndBorder(overId)) {
            overIndex -= 1;
          } else if (isStartBorder(overId)) {
            overIndex += 1;
          }

          // Déplacer l'élément à la nouvelle position
          const newItem = arrayMove(items, activeIndex, overIndex);
          return newItem;
        }
      } else {
        // Si l'élément actif est un groupe
        const activeIndex = items.findIndex((item) => item._id === id);
        let overIndex = items.findIndex((item) => item._id === overId);

        if (overIndex === -1 || activeIndex === -1) {
          console.error("other-other", id, overId);
          return [...items];
        }

        // Ajuster l'indice de destination en fonction des bords
        if (isEndBorder(overId)) {
          overIndex -= 1;
        } else if (isStartBorder(overId)) {
          overIndex += 1;
        }

        // Déplacer l'élément à la nouvelle position
        const newItem = arrayMove(items, activeIndex, overIndex);
        return newItem;
      }

      // Retourner la liste mise à jour des éléments
      return items;
    });

    // Réinitialiser l'id de l'élément actif
    setActiveId("");
  }
}
