"use client"
import Link from "next/link";
import { useState } from "react";

type PropsDefaultButton = {
    text: string;
    href: string;
  };
function primaryButton({text, href}: PropsDefaultButton){
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
function oneIconButton({text,href,icon}: PropsOneIconButton){
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

function twoIconButton ({text,href,icon1, icon2}: PropsTwoIconButton){
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

function secondaryButton ({text, href}: PropsDefaultButton){
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
    extend: boolean;
  };

function navBarButton ({text, href, icon, extend}: PropsNavBarButton){
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

