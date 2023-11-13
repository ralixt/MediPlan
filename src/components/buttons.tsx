"use client"
import Link from "next/link";
import { useState } from "react";
import {CaretRight, MagnifyingGlass, Plus} from "@phosphor-icons/react";
import { signOut } from "next-auth/react";


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
        <Link href={href}>
            <div>
                {text}
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
        <Link href={href}>
            <div>
                {icon1} 
                {text}
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
    return(
        <Link href={href} className={`flex flex-row content-center transition-[gap] duration-300 ease-in-out ${extend ? 'gap-5' : 'gap-0'}`}>
            {icon}
            <span className={`whitespace-nowrap text-sm  transition-opacity duration-300 ease-in-out ${extend ? 'opacity-100' : 'opacity-0'}`}>
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
        <button onClick={() => signOut()} className={`flex flex-row content-center transition-[gap] duration-300 ease-in-out ${extend ? 'gap-5' : 'gap-0'}`}>
            {icon}
            <span className={`whitespace-nowrap text-sm  transition-opacity duration-300 ease-in-out ${extend ? 'opacity-100' : 'opacity-0'}`}>
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
        <Link href={href} className="bg-white flex flex-row p-8 font-bold justify-between rounded-xl shadow-sm my-4">
                <p>{text}</p>
                <CaretRight size={32} />
        </Link>
    )
}

