"use client";

import {
    Clock,
    Door,
    DotsThreeOutlineVertical,
    ForkKnife,
    User,
} from "@phosphor-icons/react";

// type propsET = {
//     etapeType: EtapeType;
// };

// export function EtapeTypeCompact({ etapeType }: propsET) {
export function EtapeTypeCompact() {
    return (
        <div
            className="flex flex-row justify-between bg-lightlightgrey shadow-md rounded-3xl p-4 h-20"
            // ref={setNodeRef}
            // {...listeners}
            // {...attributes}
            // style={style}
        >
            {/*<h2 className="font-bold">{etapeType.name}</h2>*/}
            <h2 className="font-bold text-3xl">name</h2>
            <div className="my-2 text-xs">
                <div className="flex flex-row items-center">
                    <Clock size={16}/>
                    <p className="ml-2">5</p>'
                </div>

                {/*{etapeType.aJeun && (*/}
                    <div className="flex flex-row items-center mt-2">
                        <ForkKnife size={16}/>
                        <p className="ml-2">Yes</p>
                    </div>
                {/*)}*/}

                <div className="flex flex-row items-center mt-2">
                    <Door size={16}/>
                    {/*<p className="ml-2">{etapeType.lieux}</p>*/}
                    <p className="ml-2">E152</p>
                </div>

                <div className="flex flex-row items-center mt-2">
                    <User size={16}/>
                    {/*<p className="ml-2">{etapeType.competences}</p>*/}
                    <p className="ml-2">IDE</p>
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


export function ModelingGeneratorMenu() {
    return(
        <div>
            <EtapeTypeCompact/>
        </div>
    )
}