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
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  closestCorners,
  DragOverlay,
  DragStartEvent,
  pointerWithin,
  useSensors,
  useSensor,
  KeyboardSensor,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  Border,
  EtapeType,
  EtapeTypeOver,
  GroupeEtapeType,
  GroupeEtapeTypeOver,
  Precedence,
  PrecedenceOver,
} from "@/components/modelingComponents";

type props = {
  element: (GroupeEtapeType | EtapeType | precedence | border)[];
  parcour: parcours;
  allElement: string[];
};

export default function ModelingGenerator({
  element,
  parcour,
  allElement,
}: props) {
  const [activeId, setActiveId] = useState("");
  const [elements, setElements] = useState(element);
  const [all, setAll] = useState(allElement);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const delta = Math.max(-1, Math.min(1, e.deltaY));
    container.scrollLeft += delta * 100; // Ajustez la valeur pour contrôler la vitesse du défilement horizontal
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
            console.log(element);
            if (element.type === "EtapeType") {
              const newElement: EtapeType = element;
              return <EtapeType key={newElement._id} etapeType={newElement} />;
            } else if (element.type == "GroupeEtapeType") {
              const newElement: GroupeEtapeType = element;
              return (
                <GroupeEtapeType
                  key={newElement._id}
                  groupeEtapeType={newElement}
                />
              );
            } else if (element.type === "Border") {
              const newElement: border = element;
              return <Border key={newElement._id} border={newElement} />;
            } else {
              console.log("precedence");
              const newElement: precedence = element;
              return (
                <Precedence key={newElement._id} precedence={newElement} />
              );
            }
          })}
        </SortableContext>
        {/* {<DragOverlay>{getDragOverlay()}</DragOverlay>} */}
      </DndContext>
    </div>
  );

  //   function getDragOverlay() {
  //     if (activeId === "") {
  //       return null;
  //     }
  //     const element = elements.find((element) => element._id === activeId);

  //     if (isGroupeEtape(activeId)) {
  //       const element = elements.find((element) => element._id === activeId);

  //       return <GroupeEtapeTypeOver groupeEtapeType={element} />;
  //     } else if (isEtapeType(activeId)) {
  //       const element = elements.find((element) => element._id === activeId);
  //       return <EtapeTypeOver etapeType={element} />;
  //     } else {
  //       const element = elements.find((element) => element._id === activeId);
  //       return <PrecedenceOver precedence={element} />;
  //     }
  //   }

  function isGroupeEtape(id: string) {
    const element = elements.find((element) => element._id === id);

    return !!(element && element.type === "GroupeEtapeType");
  }

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

  function isChild(id: string) {
    let element = elements.findIndex((element) => element._id === id);
    if (element === -1) {
      return true;
    }
    return false;
  }

  function isEndBorder(id: string) {
    const element = elements.find((element) => element._id === id);
    if (
      element !== undefined &&
      element.type === "Border" &&
      element._id === "border2"
    ) {
      return true;
    }
    return false;
  }

  function isStartBorder(id: string) {
    const element = elements.find((element) => element._id === id);
    if (
      element !== undefined &&
      element.type === "Border" &&
      element._id === "border1"
    ) {
      return true;
    }
    return false;
  }

  function handleDragStart(event: DragStartEvent) {
    const id: string = event.active.id.toString();
    setActiveId(id);
  }

  function handleDragEnd(event: DragEndEvent) {
    if (activeId === "") {
      return;
    }
    const { active, over } = event;
    const id: string = active.id.toString();
    let overId = "";
    if (over) {
      overId = over.id.toString();
    } else {
      return;
    }

    if (
      (isGroupeEtape(id) && isGroupeEtape(overId)) ||
      isEndBorder(id) ||
      isStartBorder(id)
    ) {
      return;
    }

    // if (isNew(id)) {
    //   console.log("new all");
    //   setAll((all) => {
    //     const activeIndex = newItem.findIndex((item) => item.id === id);
    //     const newItems = { ...newItem[activeIndex] };
    //     newItems.id = newItems.id + 10;
    //     while (all.findIndex((item) => item.id === newItems.id) !== -1) {
    //       newItems.id = newItems.id + 10;
    //     }

    //     all.push(newItems);
    //     return [...all];
    //   });
    // }

    setElements((data) => {
      let items = [...data];
      //   if (isNew(id)) {
      //     const activeIndex = newItem.findIndex((item) => item.id === id);
      //     const newItems = { ...newItem[activeIndex] };
      //     newItems.id = newItems.id + 10;
      //     while (items.findIndex((item) => item.id === newItems.id) !== -1) {
      //       newItems.id = newItems.id + 10;
      //     }
      //     items.splice(1, 0, newItems);
      //     console.log("new item");
      //     return [...items];
      //   } else
      if (isChild(id)) {
        const parentParams = getParent(id);
        if (parentParams !== undefined) {
          const { parentId, indexParent, indexChild } = parentParams;
          if (isGroupeEtape(overId) && parentId !== overId) {
            const indexOver = items.findIndex((item) => item._id === overId);

            if (indexOver === -1) {
              console.error("child-container", id, overId);
              return [...items];
            }
            items[indexOver].Etapes.push(items[indexParent].Etapes[indexChild]);
            items[indexParent].Etapes.splice(indexChild, 1);
            return [...items];
          } else if (parentId !== overId) {
            items.push(items[indexParent].Etapes[indexChild]);
            const activeIndex = items.findIndex((item) => item._id === id);
            let overIndex = items.findIndex((item) => item._id === overId);

            if (overIndex === -1 || activeIndex === -1) {
              console.error("child-other", id, overId);
              return items;
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
        } else {
          console.error("parent");
          return [...items];
        }
      } else if (!isGroupeEtape(id)) {
        console.log("pas groupeEtape");
        if (isGroupeEtape(overId)) {
          const activeIndex = items.findIndex((item) => item._id === id);
          const overIndex = items.findIndex((item) => item._id === overId);
          if (overIndex === -1 || activeIndex === -1) {
            console.error("other-container", id, overId);
            return [...items];
          }
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
          console.log("enfant");
          const parentParams = getParent(overId);
          const activeIndex = items.findIndex((item) => item._id === id);
          if (parentParams !== undefined) {
            const { parentId, indexParent, indexChild } = parentParams;
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
          const activeIndex = items.findIndex((item) => item._id === id);
          let overIndex = items.findIndex((item) => item._id === overId);
          if (overIndex === -1 || activeIndex === -1) {
            console.error("other-other", id, overId);
            return [...items];
          }
          if (isEndBorder(overId)) {
            overIndex -= 1;
          } else if (isStartBorder(overId)) {
            overIndex += 1;
          }
          const newItem = arrayMove(items, activeIndex, overIndex);
          return newItem;
        }
      } else {
        const activeIndex = items.findIndex((item) => item._id === id);
        let overIndex = items.findIndex((item) => item._id === overId);
        if (overIndex === -1 || activeIndex === -1) {
          console.error("other-other", id, overId);
          return [...items];
        }
        if (isEndBorder(overId)) {
          overIndex -= 1;
        } else if (isStartBorder(overId)) {
          overIndex += 1;
        }
        const newItem = arrayMove(items, activeIndex, overIndex);
        return newItem;
      }
      return items;
    });
    setActiveId("");
  }
}
