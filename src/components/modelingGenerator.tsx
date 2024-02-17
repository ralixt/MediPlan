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
import {
  createEtapeType,
  createGroupeEtapeType,
  getAllEtapeType,
  getEtapeTypeByName,
  updateEtapeType,
} from "@/actions/EtapeType";
import { v4 as uuidv4 } from "uuid";
import { updateParcoursType } from "@/actions/ParcoursType";
import { stringify } from "flatted";

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

  const [successeur, setSuccesseur] = useState<string[]>([]);
  const [etapeType, setEtapeType] = useState<EtapeType[]>([]);
  const [modified, setModified] = useState(false);
  const [pushBDD, setPushBDD] = useState(false);
  const [precedenceElements, setPrecedenceElements] = useState<Precedence[]>([]);



  console.log(elements);
  useEffect(() => {
    const fetchParcours = async () => {
      try {
        const data = await getAllEtapeType();
        //console.log(data);
        setEtapeType(data as EtapeType[]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des étape types:",
          error
        );
      }
    };

    fetchParcours();
  }, []);

  useEffect(() => {
    const successeurIds: string[] = [];

    elements.forEach((element) => {
      if (element.type === "EtapeType" || element.type === "GroupeEtapeType") {
        const idWithoutSuffix = element._id.slice(0, -5);
        successeurIds.push(idWithoutSuffix);
      }
    });

    setSuccesseur(successeurIds);
  }, [elements]);

  useEffect(() => {
    if (modified) {
      setModified(false);
      //setPrecedenceElements([]);
      setElements((element) => {
        const items = element
          .filter((item, index) => {
            if (item.type === "Precedence") {
              const antecedant = elements[index - 1];
              const successeur = elements[index + 1];
              if (
                antecedant.type === "Border" ||
                successeur.type === "Border" ||
                successeur.type === "Precedence"
              ) {
                return false;
              }
            }
            return true;
          })
          .map((item, index) => {
            const newItem = { ...item };
            if (newItem.type === "Precedence") {
              const antecedant = { ...elements[index - 1] };
              const successeur = { ...elements[index + 1] };
              newItem.antecedent = antecedant._id;
              newItem.successeur = successeur._id;
              console.log("newItem", newItem);
              return newItem;
            }

            return item;
          });


        const precedenceItems = items.filter(item => item.type === "Precedence");
        const formattedPrecedenceElements:Precedence[] = precedenceItems.map(item => ({
          //_id: item._id.slice(0,-5),
          type: item.type,
          antecedent: item.antecedent.slice(0,-5),
          successeur: item.successeur.slice(0,-5)
        }));

        setPrecedenceElements(formattedPrecedenceElements);
        //setPrecedenceElements((prevState) => [...prevState, ...items]);
        console.log("it",items)
        return items;
      });
      setPushBDD(true);
    }
  }, [elements, modified]);


  useEffect(() => {
    if (pushBDD) {
      setPushBDD(false);
      const data = {
        name: parcour.name,
        type: parcour.type,
        sequencables: successeur,
        precedences: precedenceElements,
      };

      updateParcoursType(parcour._id, data);
    }
  }, [successeur, pushBDD,precedenceElements]);

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
  useEffect(() => console.log(successeur), [successeur]);
  useEffect(() => console.log("prec",precedenceElements), [precedenceElements]);
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
    let element = elements.find((element) => element._id === id);
    return !!(
      (element && element.type === "GroupeEtapeType") ||
      id === "groupeEtapeBlock"
    );
  }

  function isPrecedence(id: string) {
    const element = elements.find((element) => element._id === id);

    return !!(
      (element && element.type === "Precedence") ||
      id === "PrecedenceData"
    );
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
    for (let element of elements) {
      if (element.type === "GroupeEtapeType") {
        if (element.Etapes.findIndex((child) => child._id === id) !== -1) {
          return true;
        }
      }
    }
    return false;
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

  function isInParcours(id: string) {
    console.log(id);
    const element = elements.find((element) => element._id === id);
    console.log(element, isChild(id));
    return !!(element || isChild(id));
  }

  function isNew(active: Active, over: Over) {
    let activeData = "";
    if (isInParcours(active.id.toString())) {
      activeData = "InParcour";
    } else if (active.data.current) {
      activeData = active.data.current.sortable.containerId;
    } else {
      return false;
    }
    let overData = "";
    if (isInParcours(over.id.toString())) {
      overData = "InParcour";
    } else if (over.data.current) {
      overData = over.data.current.sortable.containerId;
    } else {
      return false;
    }

    console.log(activeData, overData);

    if (activeData !== overData) {
      return true;
    }
    return false;
  }

  function ajouterUidAleatoireCinq(uid: string): string {
    let uidAleatoire = uuidv4().substr(0, 5);
    return uid + uidAleatoire;
  }

  function ajouterUidAleatoire(): string {
    let uidAleatoire = uuidv4().replace(/-/g, "").substring(0, 29);
    return uidAleatoire;
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
      (activeId === overId && !isNew(active, over))
    ) {
      console.log("annuler");
      return;
    }
    console.log(active, over);
    if (isNew(active, over)) {
      console.log("nouveau");
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
          const elementOver = elements[overIndex];
          if (
            elementOver.type === "GroupeEtapeType" &&
            elementOver.Etapes.findIndex(
              (item: EtapeType) => item._id === activeId
            ) === -1
          ) {
            let edit = true;
            setElements((data) => {
              const items = [...data];
              if (edit) {
                edit = false;
                const etapetypepush = { ...etapeType[activeIndex] };
                etapetypepush._id = ajouterUidAleatoireCinq(etapetypepush._id);
                const itemOver = items[overIndex];
                if (itemOver.type === "GroupeEtapeType") {
                  itemOver.Etapes.push(etapetypepush);
                }
              }
              return items;
            });
            setModified(true);
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
            const elementParent = elements[indexParent];
            if (
              elementParent.type === "GroupeEtapeType" &&
              elementParent.Etapes.findIndex(
                (item: EtapeType) => item._id === activeId
              ) === -1
            ) {
              let edit = true;
              setElements((data) => {
                const items = [...data];
                if (edit) {
                  edit = false;
                  let etapetypepush = { ...etapeType[activeIndex] };
                  etapetypepush._id = ajouterUidAleatoireCinq(
                    etapetypepush._id
                  );
                  const itemParent = items[indexParent];
                  if (itemParent.type === "GroupeEtapeType") {
                    itemParent.Etapes.push(etapetypepush);
                  }
                }

                return items;
              });
              setModified(true);
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
              etapetypepush._id = ajouterUidAleatoireCinq(etapetypepush._id);
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
                //console.log("is start border");
                overIndex += 1;
              }
              //console.log(activeIndex);
              //console.log(overIndex);

              const newItem = arrayMove(items, activeIndex, overIndex);
              return newItem;
            }
            return items;
          });
          setModified(true);
          console.log("DragEnd - GET");
          return;
        }
      } else if (isGroupeEtape(activeId)) {
        console.log("GET");
        let edit = true;
        setElements((data) => {
          const items = [...data];
          if (edit) {
            edit = false;
            let newGroupeEtapeType: GroupeEtapeType;
            let idNewGroupeEtapeType: string;
            idNewGroupeEtapeType = ajouterUidAleatoire();
            newGroupeEtapeType = {
              _id: idNewGroupeEtapeType,
              name: idNewGroupeEtapeType,
              type: "GroupeEtapeType",
              Etapes: [],
            };

            const formData = new FormData();
            formData.append("names", newGroupeEtapeType.name);
            formData.append("type", "GroupeEtapeType");
            createGroupeEtapeType(formData);

            const fetchData = async () => {
              try {
                const result = await getEtapeTypeByName(idNewGroupeEtapeType);
                newGroupeEtapeType._id = result._id;
                newGroupeEtapeType._id = ajouterUidAleatoireCinq(
                  newGroupeEtapeType._id
                );
              } catch (error) {
                // Gérer les erreurs éventuelles
                console.error(
                  "Erreur lors de la récupération des données :",
                  error
                );
              }
            };

            fetchData();

            items.push(newGroupeEtapeType);
            const activeIndex = elements.findIndex(
              (item) => item._id === activeId
            );
            const overIndex = elements.findIndex((item) => item._id === overId);
            const newItem = arrayMove(items, activeIndex, overIndex);
            console.log(newItem);
            return newItem;
          }
          return items;
        });

        setModified(true);
        console.log("DragEnd - GroupeEtape - GET");
        return;
      } else if (isPrecedence(activeId)) {
        console.log("coucou");
        let edit = true;
        setElements((data) => {
          const items = [...data];
          if (edit) {
            edit = false;
            let newPrecedence: Precedence;
            newPrecedence = {
              _id: ajouterUidAleatoire(),
              type: "Precedence",
              antecedent: "",
              successeur: "",
            };
            items.push(newPrecedence);
            const activeIndex = elements.findIndex(
              (item) => item._id === activeId
            );
            const overIndex = elements.findIndex((item) => item._id === overId);
            const newItem = arrayMove(items, activeIndex, overIndex);
            return newItem;
          }
          return items;
        });
        setModified(true);
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
              const itemOver = items[indexOver];
              const itemParent = items[indexParent];
              if (
                itemOver.type === "GroupeEtapeType" &&
                itemParent.type === "GroupeEtapeType"
              ) {
                itemOver.Etapes.push(itemParent.Etapes[indexChild]);
                itemParent.Etapes.splice(indexChild, 1);
              }
            }

            return items;
          });
          setModified(true);
          console.log("DragEnd - Child - GET");
          return;
        } else if (parentId !== overId) {
          let edit = true;
          setElements((data) => {
            const items = [...data];
            if (edit) {
              edit = false;
              const itemParent = items[indexParent];
              if (itemParent.type === "GroupeEtapeType") {
                items.push(itemParent.Etapes[indexChild]);
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
                itemParent.Etapes.splice(indexChild, 1);
                return newItem;
              }
            }
            return items;
          });
          setModified(true);
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
        const elementOver = elements[overIndex];
        if (
          elementOver.type === "GroupeEtapeType" &&
          elementOver.Etapes.findIndex(
            (item: EtapeType) => item._id === activeId
          ) === -1
        ) {
          let edit = true;
          setElements((data) => {
            const items = [...data];
            if (edit) {
              edit = false;
              const itemOver = items[overIndex];
              const itemActive = items[activeIndex];
              if (
                itemOver.type === "GroupeEtapeType" &&
                itemActive.type === "EtapeType"
              ) {
                itemOver.Etapes.push(itemActive);
                items.splice(activeIndex, 1);

                const modifiedEtapes = itemOver.Etapes.map((etape) => {
                  // Supprimer les 5 derniers caractères de l'ID
                  const modifiedId = etape._id.slice(0, -5);
                  // Retourner un nouvel objet avec l'ID modifié
                  return { ...etape, _id: modifiedId };
                });
                const datas = {
                  name: itemOver.name,
                  type: "GroupeEtapeType",
                  duree: null,
                  Competence: [],
                  Lieu: [],
                  Materiel: [],
                  a_jeun: null,
                  Etapes: modifiedEtapes,
                };

                console.log("update", modifiedEtapes);

                const fetchData = async () => {
                  try {
                    const result = await getEtapeTypeByName(itemOver.name);
                    // Mettre à jour l'état lorsque la promesse est résolue
                    /*result.then(function(GroupeEtape) {
                    setGroupeEtape(GroupeEtape)
                  });*/

                    console.log("dans", result._id);

                    await updateEtapeType(result._id, datas);
                  } catch (error) {
                    // Gérer les erreurs éventuelles
                    console.error(
                      "Erreur lors de la récupération des données :",
                      error
                    );
                  }
                };

                fetchData();

                // const c = getEtapeTypeByName(items[overIndex]._id).then(r=>r)

                // console.log("cc",GroupeEtape)

                //updateEtapeType(items[overIndex]._id,datas)

                //console.log("eeeeezz",items[overIndex]._id)

                console.log("items", items);
              }
            }

            return items;
          });
          setModified(true);
          console.log("DragEnd - !GET - GET");
          return;
        }
      } else if (isChild(overId)) {
        const parentParams = getParent(overId);
        const activeIndex = elements.findIndex((item) => item._id === activeId);
        if (parentParams !== undefined) {
          const { parentId, indexParent, indexChild } = parentParams;
          const elementParent = elements[indexParent];
          if (
            elementParent.type === "GroupeEtapeType" &&
            elementParent.Etapes.findIndex(
              (item: EtapeType) => item._id === activeId
            ) === -1
          ) {
            let edit = true;
            setElements((data) => {
              const items = [...data];
              if (edit) {
                edit = false;
                const itemParent = items[indexParent];
                const itemActive = items[activeIndex];
                if (
                  itemParent.type === "GroupeEtapeType" &&
                  itemActive.type === "EtapeType"
                ) {
                  itemParent.Etapes.push(itemActive);
                  items.splice(activeIndex, 1);
                }
              }

              return items;
            });
            setModified(true);
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
        setModified(true);
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
      setModified(true);
      console.log("DragEnd - GET");
      return;
    }
    return;
  }
}
