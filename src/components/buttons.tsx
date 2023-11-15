"use client"
import Link from "next/link";
import { useState } from "react";
import {CaretRight, MagnifyingGlass, Plus} from "@phosphor-icons/react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from 'next/navigation';


export const LoginButton = () => {
    return (
        <button type="submit" className="bg-dark-blue text-white rounded-lg p-2 w-4/5 mx-auto hover:rounded-3xl mt-8">
            Connexion
        </button>
    );
};


type PropsDefaultButton = {
    text: string;
    href: string;
  };

export function PrimaryButton({text, href}: PropsDefaultButton){
    return (
        <Link href={href}>
            {text}
        </Link>
    )
}

type PropsOneIconButton = {
    text: string;
    href: string;
    icon: React.ReactNode
  };
export function OneIconButton({text,href,icon}: PropsOneIconButton){
    return(
        <Link href={href} className="flex rounded-[10px] bg-dark-blue">
            <div className="flex flex-row gap-8 px-5 py-7 bg-white rounded-[10px] hover:translate-x-[-0.5rem] hover:translate-y-[-0.5rem] transition-all duration-200 ease-in-out active:translate-x-0 active:translate-y-0">
                <div className="flex flex-row gap-2">
                    <p>{text}</p>
                </div>
                {icon} 
            </div>
        </Link>
    )
}

type PropsTwoIconButton = {
    text: string;
    href: string;
    icon1: React.ReactNode;
    icon2: React.ReactNode;
  };

export function TwoIconButton ({text,href,icon1, icon2}: PropsTwoIconButton){
    return(
        <Link href={href} className=" flex rounded-[10px] bg-dark-blue">
            <div className="flex flex-row gap-8 px-5 py-7 bg-white rounded-[10px] hover:translate-x-[-0.5rem] hover:translate-y-[-0.5rem] transition-all duration-200 ease-in-out active:translate-x-0 active:translate-y-0">
                <div className="flex flex-row gap-2">{icon1} 
                <p>{text}</p>
                </div>
                {icon2}
            </div>
                
        </Link>
    )
}

export function SecondaryButton ({text, href}: PropsDefaultButton){
    return (
        <Link href={href}>
            {text}
        </Link>
    )
}

type PropsNavBarButton = {
    text: string;
    href: string;
    icon: React.ReactNode;
    extend: boolean;
  };

export function NavBarButton ({text, href, icon, extend}: PropsNavBarButton){
    const router = usePathname()
    const isActive = router == href
    return(
        <Link href={isActive ? {} : href} className={`flex flex-row items-center transition-all duration-200 ease-in-out ${extend ? 'gap-5' : 'gap-0'} ${isActive? "text-dark-blue font-bold" : "hover:text-light-blue"} `}>
            {icon}
            <span className={`whitespace-nowrap text-sm  transition-opacity duration-200 ease-in-out ${extend ? 'opacity-100 w-full' : 'opacity-0 w-0'} `}>
                {text}
            </span>
            
        </Link>
    )
}


//modeling workshop button

export const ModelingSearchButton = () => {
    return (
        <button type="submit"
                className="w-40 bg-white flex items-center justify-items-center justify-between rounded-lg p-2 ">
            Rechercher
            <MagnifyingGlass size={32} />
        </button>
    );
};



type PropsLogOutButton = {
    text: string;
    icon: React.ReactNode
    extend: boolean;
  };
export function LogOutButton ({text, icon, extend}: PropsLogOutButton){
    return(
        <button onClick={() => signOut()} className={`flex flex-row items-center transition-all duration-200 ease-in-out ${extend ? 'gap-5' : 'gap-0'} hover:text-negative`}>
            {icon}
            <span className={`whitespace-nowrap text-sm transition-opacity duration-200 ease-in-out ${extend ? 'opacity-100' : 'opacity-0'}`}>
                {text}
            </span>
            
        </button>
    )
}




export const NewWorkshopButton = () => {
    return (
        <Link href="/new-workshop" className=" bg-white rounded-lg p-2 flex items-center justify-items-center justify-between">
                <p>Nouveau parcours</p>
                <Plus size={32} />
        </Link>
    );
};


type PropsWorkshopButton = {
    text: string;
    href: string;

};

export function WorkshopButton ({text, href}: PropsWorkshopButton){

    return(
        <Link href={href} className="bg-dark-blue flex  rounded-xl shadow-sm my-8">
            <div className=" flex flex-row font-bold justify-between content-center w-full h-full p-8 bg-white hover:translate-x-[-0.5rem] rounded-xl hover:translate-y-[-0.5rem] transition-all duration-200 ease-in-out active:translate-x-0 active:translate-y-0">
                <p>{text}</p>
                <CaretRight size={32} />
            </div>

        </Link>
    )
}

