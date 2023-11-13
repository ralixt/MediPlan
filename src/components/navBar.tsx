
"use client"
import { Bell, Calendar, ChartBar, CirclesThree, Gear, House, SignOut } from "@phosphor-icons/react/dist/ssr";
import { LogOutButton, NavBarButton } from "./buttons";
import Image from "next/image";
import { useState } from "react";

export default function NavBar(){
    const [isHovered, setIsHovered] = useState(false);
    return(
        <header className={`flex flex-col h-[100vh] justify-self-center pl-5 pr-6 py-[1.30rem] justify-between gap-64 bg-white rounded-r-[20px] shadow transition-all duration-300 ${isHovered ? 'w-[300px]' : 'w-[80px]'}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={()=> setIsHovered(false)}>
            <div className="flex flex-col gap-11" >
                <Image
                    src="/MediplanIcon.svg"
                    alt="Mediplan Icon"
                    width={20}
                    height={110}
                    className="rotate-[25deg]"
                />
                <div className="flex flex-col gap-10">
                    <NavBarButton text="Accueil" href="/home" icon={<House size={24} className="shrink-0"/>} extend={isHovered}/>
                    <NavBarButton text="Atelier" href="/modeling-workshop-menu" icon={<CirclesThree size={24} className="shrink-0"/>} extend={isHovered} />
                    <NavBarButton text="Planification" href="/planificationMenu" icon={<ChartBar size={24} className="shrink-0"/>} extend={isHovered} />
                    <NavBarButton text="Emploi du temps" href="/planningMenu" icon={<Calendar size={24} className="shrink-0"/>} extend={isHovered} />
                </div>
            </div>
            
            <div className="flex flex-col gap-5">
                <NavBarButton text="Parametres" href="/parameters" icon={<Gear size={24} className="shrink-0"/>} extend={isHovered} />
                <NavBarButton text="Notifications" href="/notifications" icon={<Bell size={24} className="shrink-0"/>} extend={isHovered} />
                <LogOutButton text="Déconnexion" icon={<SignOut size={24} className="shrink-0"/>} extend={isHovered} />
            </div>
            
        </header>
    )
}