"use client";
import React, { cache, useEffect, useRef, useState } from "react";
import { getNameParcoursType } from "@/actions/ParcoursType";
import Image from "next/image";
import {MagnifyingGlass, Password, User} from "@phosphor-icons/react";
import {AddParcoursType} from "@/components/addParcoursTypeForm";
import {Loader} from "@/components/loader";
import {WorkshopButton} from "@/components/buttons";
import {usePathname} from "next/navigation";
import diacritics from "diacritics";

const getPlanificationBDD = cache(async () => {
  const response = await getNameParcoursType();
  return response;
});

export default function Planification() {
  const [planification, setPlanification] = useState<Planification[]>([]); // État pour stocker les données des parcours
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [searchPlanification, setSearchPlanification] = useState("");
  const [planifiactionFiltre, setPlanificationFiltre] = useState<
    Planification[]
  >([]);

  const userName = useRef("");
  const [searchBarFocused, setSearchBarFocused] = useState(false);

  useEffect(() => {
    const fetchParcours = async () => {
      try {
        const data = await getPlanificationBDD();
        //console.log("cache : " ,data)
        setPlanification(data as Planification[]);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des planifications:",
          error
        );
        setLoading(false);
      }
    };

    fetchParcours();
  }, []);

                    <div className="flex flex-row justify-around items-center w-full">

                            {/*flex flex-row w-full border-b-2 mb-8*/}
                            <div
                                className={`bg-white mb-8 p-4 rounded-lg w-96 flex  ${searchBarFocused || userName.current ? 'border-black' : 'text-lightgrey'}`}>
                                <input
                                    type="text"
                                    name="search-modeling-workshop"
                                    placeholder="Nom de la planification"
                                    className={`w-full outline-none bg-white border-b-2 ${searchBarFocused || userName.current ? 'border-black' : 'text-lightgrey'}`}
                                    // className="w-full outline-none bg-white"
                                    value={searchPlanification}
                                    onChange={(e) =>
                                        setSearchPlanification(e.target.value)}
                                    onFocus={() => setSearchBarFocused(true)}
                                    onBlur={() => setSearchBarFocused(false)}
                                />
                                <MagnifyingGlass size={32}/>
                            </div>


                        <AddParcoursType
                            setloading={setLoading}
                            SetParcours={setPlanification}
                        />

                    </div>
                </div>

                <div className="w-[15%] h-full mt-16">
                    <Image
                        src="/planification_vector_2.svg"
                        alt="Arrow design"
                        width={350}
                        height={350}
                        // className={}
                    ></Image>
                </div>
            </section>

            <section
                className={`w-[95%] m-auto min-h-[50vh] ${
                    loading ? "flex flex-col items-center justify-center" : ""
                }`}
            >
                {loading ? (
                    <Loader />
                ) : (
                    planifiactionFiltre.map((planification, index) => (
                        <WorkshopButton
                            key={index}
                            index={index}
                            text={planification.name}
                            href={pathname + "/" + planification._id}
                        />
                    ))
                )}
            </section>
        </div>
    );
  }, [searchPlanification, planification]);

  return (
    <div className="w-full">
      <section className="w-full bg-light-blue h-[50vh] flex justify-between">
        <div className="flex justify-end content-center w-[15%] h-full">
          <Image
            src="/planification_vector_1.svg"
            alt="Arrow design"
            width={200}
            height={200}
            // className={}
          ></Image>
        </div>
        <div className="text-center font-bold w-[70%] h-full flex flex-col justify-center content-center items-center">
          <div className="text-4xl mb-20">
            <h1>Planifications</h1>
          </div>

          <div className="flex flex-row justify-around items-center content-center w-full">
            <form
              method="POST"
              className="h-full flex flex-col justify-center items-center content-center"
            >
              <div
                className={`flex flex-row w-full border-b-2 mb-8 ${
                  searchBarFocused || userName.current
                    ? "border-black"
                    : "text-lightgrey"
                }`}
              >
                <input
                  type="text"
                  name="search-modeling-workshop"
                  placeholder="Nom de la planification"
                  className="w-full outline-none bg-white"
                  value={searchPlanification}
                  onChange={(e) => setSearchPlanification(e.target.value)}
                  onFocus={() => setSearchBarFocused(true)}
                  onBlur={() => setSearchBarFocused(false)}
                />
                <MagnifyingGlass size={32} />
              </div>
            </form>
            <AddParcoursType
              setloading={setLoading}
              SetParcours={setPlanification}
            />
          </div>
        </div>

        <div className="w-[15%] h-full mt-16">
          <Image
            src="/planification_vector_2.svg"
            alt="Arrow design"
            width={350}
            height={350}
            // className={}
          ></Image>
        </div>
      </section>

      <section
        className={`w-[95%] m-auto min-h-[50vh] ${
          loading ? "flex flex-col items-center justify-center" : ""
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          planifiactionFiltre.map((planification, index) => (
            <WorkshopButton
              key={index}
              index={index}
              text={planification.name}
              href={pathname + "/" + planification._id}
            />
          ))
        )}
      </section>
    </div>
  );
}
