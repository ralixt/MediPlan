"use client"
import { Bell, Calendar, ChartBar, CirclesThree, Gear, House } from "@phosphor-icons/react";
import { NavBarButton } from "./buttons";

export default function NavBar(){
    return(
        <header className="flex flex-col w-fit h-full justify-self-center m-4 justify-between">
            <div className="flex flex-col">
                <NavBarButton text="Accueil" href="/home" icon={<House size={24}/>} />
                <NavBarButton text="Atelier" href="/modelingWorkshopMenu" icon={<CirclesThree size={24}/>} />
                <NavBarButton text="Planification" href="/planificationMenu" icon={<ChartBar size={24}/>} />
                <NavBarButton text="Emploi du temps" href="/planningMenu" icon={<Calendar size={24}/>} />
            </div>
            <div className="flex flex-col">
                <NavBarButton text="Parametres" href="/parameters" icon={<Gear size={24}/>} />
                <NavBarButton text="Notifications" href="/notifications" icon={<Bell size={24}/>} />
            </div>
            
        </header>
    )
}