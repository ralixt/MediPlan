"use client"
import Link from "next/link";
import { useState } from "react";


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
    icon: React.ReactNode
    extend?: boolean;
  };

export function NavBarButton ({text, href, icon, extend = false}: PropsNavBarButton){
    const [extended, setExtended] = useState(extend)
    return(
        <Link href={href}>
            <div>
                {icon}
                {extended ? text : ""}
            </div>
        </Link>
    )
}

