"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import {OneIconButton, WorkshopButton} from "@/components/buttons";
import {MagnifyingGlass, Plus} from "@phosphor-icons/react";
import {cache} from 'react'
import { usePathname } from 'next/navigation'
import {getAllParcoursType} from "@/actions/ParcoursType";


const getParcours = cache(async () => {
    const response = await fetch('/temporary/BDD.json');
    const data = await response.json();
    return data;
});

const getParcoursBDD = cache(async () => {
    const response = await getAllParcoursType();
    return response;
});



export default function ModelingWorkshop() {
    const [Parcours, setParcours] = useState([]); // État pour stocker les données des parcours
    const pathname = usePathname()

    useEffect(() => {
        const fetchParcours = async () => {
            try {
                const data = await getParcoursBDD();
                console.log("cache : " ,data)
                setParcours(data);

            } catch (error) {
                console.error("Erreur lors de la récupération des données des parcours:", error);
            }
        };

        fetchParcours();
    }, []);




    return (
        <div className="w-full">

            <section className="w-full bg-light-blue h-[50vh] flex justify-between">

                <div className="flex justify-center content-center w-[15%] h-full">
                    <Image src="/vector1.svg"
                           alt="Arrow design"
                           width={150}
                           height={150}
                        // className={}
                    ></Image>


                </div>
                <div className="text-center font-bold w-[70%] h-full flex flex-col justify-center content-center items-center">
                    <div className="text-4xl mb-20">
                        <h1 >Atelier de modélisation </h1>
                        <h1>des parcours</h1>
                    </div>

                    <div className="flex flex-row justify-around items-center content-center w-full">
                        <form method="POST" className="h-full flex flex-col justify-center items-center content-center">

                            {/* <div className={` border-b-2 mb-8 ${modelingSearchFocused || modelingSearch.current ? 'border-black' : ''}`}>*/}
                            {/*<div className={` border-b-2 mb-8 `}>*/}
                            {/*    <input type="text"*/}
                            {/*           name="search-modeling-workshop"*/}
                            {/*           placeholder="Nom de la modélisation"*/}
                            {/*           className=" outline-none bg-white"*/}
                            {/*        // onChange={(e) =>*/}
                            {/*        //     modelingSearch.current = e.target.value}*/}
                            {/*           onFocus={() => setModelingSearchFocused(true)}*/}
                            {/*           onBlur={() => setModelingSearchFocused(false)}*/}
                            {/*    /> */}
                            {/* </div> */}



                            <div className=" bg-white mb-8 p-4 rounded w-96">
                                <input type="text"
                                       name="search-modeling-workshop"
                                       placeholder="Nom de la modélisation"
                                       className=" border-b-2 outline-none bg-white w-full"
                                />
                            </div>

                            <OneIconButton text="Rechercher"
                                           icon={<MagnifyingGlass size={32} />}
                                           href="rechercher"/>

                        </form>
                        <div className="h-full flex justify-center items-center content-center">
                            <OneIconButton
                                text="Nouveau parcours"
                                icon={<Plus size={32} />}
                                href="rechercher"/>

                        </div>
                    </div>


                </div>

                <div className="w-[15%] h-full flex justify-center content-center items-center">
                    <Image src="/vector2.svg"
                           alt="Arrow design"
                           width={350}
                           height={350}
                        // className={}
                    ></Image>
                </div>


            </section>

            <section className="w-[95%] m-auto">

                {Parcours.map((parcours, index) =>
                    (
                        <WorkshopButton index={index} text={parcours.name} href={pathname+"/"+parcours.name} />
                    )

                )}


            </section>
        </div>
    );
}
