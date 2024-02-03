"use client";

// Import des modules nécessaires
import React, { useEffect, useState } from "react";
import {
  useSensors,
  useSensor,
  KeyboardSensor,
  PointerSensor,
  Active,
  Over,
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
import { ModelingGeneratorMenu } from "./modelingGeneratorMenu";
import { getAllEtapeType } from "@/actions/EtapeType";
import { v4 as uuidv4 } from "uuid";

// Définition des types
type Props = {
  element: (GroupeEtapeType | EtapeType | Precedence | Border)[];
  parcour: parcours;
};

// Composant principal du générateur de modélisation
export default function ModelingGenerator({ element, parcour }: Props) {
  // State pour stocker les éléments
  const [elements, setElements] =
    useState<(GroupeEtapeType | EtapeType | Precedence | Border)[]>(element);

  const [etapeType, setEtapeType] = useState<EtapeType[]>([]);

  useEffect(() => {
    const fetchParcours = async () => {
      try {
        const data = await getAllEtapeType();
        //console.log(data);
        setEtapeType(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des étape types:",
          error
        );
      }
    };

    fetchParcours();
  }, []);

  // Gestion de l'événement de défilement horizontal
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container) {
      const delta = Math.max(-1, Math.min(1, e.deltaY));
      container.scrollLeft += delta * 100; // Ajustez la valeur pour contrôler la vitesse du défilement horizontal
    }
  };

  // Configuration des capteurs pour le déplacement d'éléments
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => console.log(elements), [elements]);

  // Rendu du composant
  return (
    <div className="flex flex-row w-full h-full items-center">
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
        {...sensors}
        id="dnd"
      >
        <div className="flex flex-col w-full h-full">
          <div
            className="overflow-scroll h-full flex items-center content-center"
            id="scroll"
            onWheel={handleWheel}
          >
            <SortableContext
              items={element.map((element) => element._id)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex flex-row gap-10 items-center justify-start mx-48">
                {elements.map((element) => {
                  return renderElement(element);
                })}
              </div>
            </SortableContext>
          </div>
          <div className="w-full h-2/5 flex items-center content-center">
            <ModelingGeneratorMenu
              EtapeType={etapeType}
              setEtapeType={setEtapeType}
            />
          </div>
        </div>
      </DndContext>
    </div>
  );

  // Fonction de rendu pour un élément donné
  function renderElement(
    element: GroupeEtapeType | EtapeType | Precedence | Border
  ) {
    if (element.type === "EtapeType") {
      return (
        <EtapeType
          key={element._id}
          etapeType={element as EtapeType}
          SetEtapes={setElements}
        />
      );
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

  function isPrecedence(id: string) {
    const element = elements.find((element) => element._id === id);

    return !!(element && element.type === "Precedence");
  }

  function isEtape(id: string) {
    let element = elements.find((element) => element._id === id);
    if (element === undefined) {
      element = etapeType.find((element) => element._id === id);
    }
    return !!(element && element.type === "EtapeType");
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
    const idBase = element?._id.slice(0, -5);
    return (
      element !== undefined && element.type === "Border" && idBase === "border2"
    );
  }

  // Fonction pour déterminer si un élément est une bordure de début
  function isStartBorder(id: string) {
    const element = elements.find((element) => element._id === id);
    const idBase = element?._id.slice(0, -5);
    return (
      element !== undefined && element.type === "Border" && idBase === "border1"
    );
  }

  function isNew(active: Active, over: Over) {
    if (
      active.data.current !== undefined &&
      over.data.current !== undefined &&
      active.data.current.sortable.containerId !==
        over.data.current.sortable.containerId
    ) {
      return true;
    }
    return false;
  }

  function ajouterUidAleatoire(uid: string): string {
    let uidAleatoire = uuidv4().substr(0, 5);
    return uid + uidAleatoire;
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeId: string = active.id.toString();
    let overId = "";
    if (over) {
      overId = over.id.toString();
    } else {
      return;
    }

    if (
      (isGroupeEtape(activeId) && isGroupeEtape(overId)) ||
      isEndBorder(activeId) ||
      isStartBorder(activeId) ||
      (activeId === overId && !isNew(active, over)) ||
      (isPrecedence(activeId) && (isGroupeEtape(overId) || isChild(overId)))
    ) {
      return;
    }

    if (isNew(active, over)) {
      if (isEtape(activeId)) {
        if (isGroupeEtape(overId)) {
          const activeIndex = etapeType.findIndex(
            (item) => item._id === activeId
          );
          const overIndex = elements.findIndex((item) => item._id === overId);
          if (overIndex === -1 || activeIndex === -1) {
            console.error("other-container", activeId, overId);
            return;
          }

          if (
            elements[overIndex].Etapes.findIndex(
              (item: EtapeType) => item._id === activeId
            ) === -1
          ) {
            let edit = true;
            setElements((data) => {
              const items = [...data];
              if (edit) {
                edit = false;
                const etapetypepush = { ...etapeType[activeIndex] };
                etapetypepush._id = ajouterUidAleatoire(etapetypepush._id);
                items[overIndex].Etapes.push(etapetypepush);
              }
              return items;
            });
            console.log("DragEnd - New - Etape - GET");
            return;
          }
          return;
        } else if (isChild(overId)) {
          const parentParams = getParent(overId);
          const activeIndex = etapeType.findIndex(
            (item) => item._id === activeId
          );

          if (parentParams !== undefined) {
            const { parentId, indexParent, indexChild } = parentParams;

            if (
              elements[indexParent].Etapes.findIndex(
                (item: EtapeType) => item._id === activeId
              ) === -1
            ) {
              let edit = true;
              setElements((data) => {
                const items = [...data];
                if (edit) {
                  edit = false;
                  let etapetypepush = { ...etapeType[activeIndex] };
                  etapetypepush._id = ajouterUidAleatoire(etapetypepush._id);
                  items[indexParent].Etapes.push(etapetypepush);
                }
                console.log(items);
                return items;
              });
              console.log("DragEnd - New - Etape - Child");
              return;
            }
          }
          return;
        } else {
          let edit = true;
          setElements((data) => {
            const items = [...data];
            if (edit) {
              edit = false;
              let activeIndex = etapeType.findIndex(
                (item) => item._id === activeId
              );
              if (activeIndex === -1) {
                console.error("child-other", activeId, overId);
                return [...data];
              }
              let etapetypepush = { ...etapeType[activeIndex] };
              etapetypepush._id = ajouterUidAleatoire(etapetypepush._id);
              items.push(etapetypepush);

              activeIndex = items.findIndex(
                (item) => item._id === etapetypepush._id
              );
              let overIndex = items.findIndex((item) => item._id === overId);
              if (overIndex === -1 || activeIndex === -1) {
                console.error("child-other", activeId, overId);
                return [...data];
              }

              // if (isEndBorder(overId)) {
              //   console.log("is end border");
              //   overIndex -= 1;
              // }
              if (isStartBorder(overId)) {
                console.log("is start border");
                overIndex += 1;
              }
              console.log(activeIndex);
              console.log(overIndex);

              const newItem = arrayMove(items, activeIndex, overIndex);
              return newItem;
            }
            return items;
          });
          console.log("DragEnd - GET");
          return;
        }
      }
    } else if (isChild(activeId)) {
      const parentParams = getParent(activeId);
      if (parentParams !== undefined) {
        const { parentId, indexParent, indexChild } = parentParams;

        if (isGroupeEtape(overId) && parentId !== overId) {
          const indexOver = elements.findIndex((item) => item._id === overId);
          if (indexOver === -1) {
            console.error("child-container", activeId, overId);
            return;
          }
          let edit = true;
          setElements((data) => {
            const items = [...data];
            if (edit) {
              edit = false;
              items[indexOver].Etapes.push(
                items[indexParent].Etapes[indexChild]
              );
              items[indexParent].Etapes.splice(indexChild, 1);
            }
            return items;
          });
          console.log("DragEnd - Child - GET");
          return;
        } else if (parentId !== overId) {
          let edit = true;
          setElements((data) => {
            const items = [...data];
            if (edit) {
              edit = false;
              items.push(items[indexParent].Etapes[indexChild]);
              const activeIndex = items.findIndex(
                (item) => item._id === activeId
              );
              let overIndex = items.findIndex((item) => item._id === overId);
              if (overIndex === -1 || activeIndex === -1) {
                console.error("child-other", activeId, overId);
                return [...data];
              }
              if (isEndBorder(overId)) {
                overIndex -= 1;
              } else if (isStartBorder(overId)) {
                overIndex += 1;
              }
              const newItem = arrayMove(items, activeIndex, overIndex);
              items[indexParent].Etapes.splice(indexChild, 1);
              return newItem;
            }
            return items;
          });
          console.log("DragEnd - Child - !GET");
          return;
        }
      }
    } else if (!isGroupeEtape(activeId)) {
      if (isGroupeEtape(overId)) {
        const activeIndex = elements.findIndex((item) => item._id === activeId);
        const overIndex = elements.findIndex((item) => item._id === overId);

        if (overIndex === -1 || activeIndex === -1) {
          console.error("other-container", activeId, overId);
          return;
        }

        if (
          elements[overIndex].Etapes.findIndex(
            (item: EtapeType) => item._id === activeId
          ) === -1
        ) {
          let edit = true;
          setElements((data) => {
            const items = [...data];
            if (edit) {
              edit = false;
              items[overIndex].Etapes.push(items[activeIndex]);
              items.splice(activeIndex, 1);
            }

            return items;
          });
          console.log("DragEnd - !GET - GET");
          return;
        }
      } else if (isChild(overId)) {
        const parentParams = getParent(overId);
        const activeIndex = elements.findIndex((item) => item._id === activeId);
        if (parentParams !== undefined) {
          const { parentId, indexParent, indexChild } = parentParams;
          if (
            elements[indexParent].Etapes.findIndex(
              (item: EtapeType) => item._id === activeId
            ) === -1
          ) {
            let edit = true;
            setElements((data) => {
              const items = [...data];
              if (edit) {
                edit = false;
                items[indexParent].Etapes.push(items[activeIndex]);
                items.splice(activeIndex, 1);
              }

              return items;
            });
            console.log("DragEnd - !GET - Child");
            return;
          }
        }
      } else {
        const activeIndex = elements.findIndex((item) => item._id === activeId);
        let overIndex = elements.findIndex((item) => item._id === overId);

        if (overIndex === -1 || activeIndex === -1) {
          console.error("other-other", activeId, overId);
          return;
        }

        // Ajuster l'indice de destination en fonction des bords
        if (isEndBorder(overId)) {
          overIndex -= 1;
        } else if (isStartBorder(overId)) {
          overIndex += 1;
        }

        let edit = true;
        setElements((data) => {
          const items = [...data];
          if (edit) {
            edit = true;
            const newItem = arrayMove(items, activeIndex, overIndex);
            return newItem;
          }
          return items;
        });
        console.log("DragEnd - !GET - !GET/Child");
        return;
      }
    } else {
      const activeIndex = elements.findIndex((item) => item._id === activeId);
      let overIndex = elements.findIndex((item) => item._id === overId);

      if (overIndex === -1 || activeIndex === -1) {
        console.error("other-other", activeId, overId);
        return;
      }

      if (isEndBorder(overId)) {
        overIndex -= 1;
      } else if (isStartBorder(overId)) {
        overIndex += 1;
      }
      let edit = true;
      setElements((data) => {
        const items = [...data];
        if (edit) {
          edit = false;
          const newItem = arrayMove(items, activeIndex, overIndex);
          return newItem;
        }
        return items;
      });
      console.log("DragEnd - GET");
      return;
    }
    return;
  }
}
