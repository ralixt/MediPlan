"use client"
import Image from "next/image";
// import React, {useRef, useState} from "react";
import {ModelingSearchButton, NewWorkshopButton, OneIconButton, WorkshopButton} from "@/components/buttons";
import {MagnifyingGlass, Plus} from "@phosphor-icons/react";


export default async function ModelingWorkshop() {

    // const modelingSearch = useRef("")
    // const modelingSearch = useState("")
    // const [modelingSearchFocused, setModelingSearchFocused] = useState(false);

    return (

        <div className="w-full">

            <section className="w-full bg-light-blue h-[50vh] flex justify-between">

                <div>
                    {/*<Image src="/vector1.png"*/}
                    {/*       alt="Arrow design"*/}
                    {/*       width={200}*/}
                    {/*       height={200}*/}
                    {/*       // className={}*/}
                    {/*></Image>*/}
                    <Image src="/vector1.svg"
                           alt="Arrow design"
                           width={200}
                           height={200}
                        // className={}
                    ></Image>


                </div>
                <div className="text-center font-bold">
                    <h1 className="text-4xl">Atelier de modélisation</h1>

                    <div className="flex">
                        <form method="POST"
                            // onSubmit={onSubmit}
                              className="">

                            {/*<div className={` border-b-2 mb-8 ${modelingSearchFocused || modelingSearch.current ? 'border-black' : ''}`}>*/}
                            {/*<div className={` border-b-2 mb-8 `}>*/}
                            {/*    <input type="text"*/}
                            {/*           name="search-modeling-workshop"*/}
                            {/*           placeholder="Nom de la modélisation"*/}
                            {/*           className=" outline-none bg-white"*/}
                            {/*        // onChange={(e) =>*/}
                            {/*        //     modelingSearch.current = e.target.value}*/}
                            {/*           onFocus={() => setModelingSearchFocused(true)}*/}
                            {/*           onBlur={() => setModelingSearchFocused(false)}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <OneIconButton text="Rechercher"
                                           icon={<MagnifyingGlass size={32} />}
                                           href="rechercher"/>

                        </form>
                        <div>
                            <OneIconButton text="Nouveau parcours"
                                           icon={<Plus size={32} />}
                                           href="rechercher"/>
                        </div>
                    </div>


                </div>

                <div>
                    <Image src="/vector2.svg"
                           alt="Arrow design"
                           width={200}
                           height={200}
                        // className={}
                    ></Image>
                </div>


            </section>

            <section className="w-[95%] m-auto">

                <WorkshopButton text="Modéle A" href="/modele-a"></WorkshopButton>
                <WorkshopButton text="Modéle A" href="/modele-a"></WorkshopButton>
                <WorkshopButton text="Modéle A" href="/modele-a"></WorkshopButton>
                <WorkshopButton text="Modéle A" href="/modele-a"></WorkshopButton>
                <WorkshopButton text="Modéle A" href="/modele-a"></WorkshopButton>
                <WorkshopButton text="Modéle A" href="/modele-a"></WorkshopButton>
                <WorkshopButton text="Modéle A" href="/modele-a"></WorkshopButton>
                <WorkshopButton text="Modéle A" href="/modele-a"></WorkshopButton>
                <WorkshopButton text="Modéle A" href="/modele-a"></WorkshopButton>
                <WorkshopButton text="Modéle A" href="/modele-a"></WorkshopButton>
                <WorkshopButton text="Modéle A" href="/modele-a"></WorkshopButton>
                <WorkshopButton text="Modéle A" href="/modele-a"></WorkshopButton>

            </section>
        </div>

    )

}