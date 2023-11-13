"use client"
import Image from "next/image";
import React, {useRef, useState} from "react";
import {ModelingSearchButton} from "@/components/buttons";


export default async function ModelingWorkshop() {

    // const modelingSearch = useRef("")
    const modelingSearch = useState("")
    const [modelingSearchFocused, setModelingSearchFocused] = useState(false);

    return (


        <div className="bg-light-blue w-full flex">
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
            <div className="">
                <h1>Atelier de modélisation</h1>

                <div>
                    <form method="POST"
                        // onSubmit={onSubmit}
                          className="">

                        {/*<div className={` border-b-2 mb-8 ${modelingSearchFocused || modelingSearch.current ? 'border-black' : ''}`}>*/}
                        <div className={` border-b-2 mb-8 `}>
                            <input type="text"
                                   name="search-modeling-workshop"
                                   placeholder="Nom de la modélisation"
                                   className=" outline-none bg-white"
                                // onChange={(e) =>
                                //     modelingSearch.current = e.target.value}
                                   onFocus={() => setModelingSearchFocused(true)}
                                   onBlur={() => setModelingSearchFocused(false)}
                            />
                        </div>
                        <ModelingSearchButton/>

                    </form>
                    <div>

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


        </div>

    )

}