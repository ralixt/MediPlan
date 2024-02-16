"use client";
import {
  Bell,
  Calendar,
  ChartBar,
  CirclesThree,
  Gear,
  House,
  SignOut,
} from "@phosphor-icons/react/dist/ssr";
import { LogOutButton, NavBarButton } from "./buttons";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

//Composant de la barre de navigation sur la gauche de l'écran
export default function NavBar() {
  // nous regardons si la souris survole ou pas la barre de navigation
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header
      className={`flex flex-col h-[100vh] justify-self-center pl-5 pr-6 py-[1.30rem] justify-between gap-64 bg-white rounded-r-[20px] shadow transition-all duration-300 fixed z-10 ${
        isHovered ? "w-[14.375rem]" : "w-[4.25rem]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-11">
        <div>
          <Link href="/home" className="flex flex-row gap-1 items-end">
            <Image
              src="/MediplanIcon.svg"
              alt="Mediplan Icon"
              width={20}
              height={110}
              className="rotate-[25deg] shrink-0"
            />
            <Image
              src="/MediplanText.svg"
              alt="Mediplan Text"
              width={100} // largeur fixe
              height={30} // hauteur fixe
              className={`transition-all duration-300 ease-in-out ${
                isHovered ? " opacity-100 delay-50" : "opacity-0"
              }`}
            />
          </Link>
        </div>

        <div className="flex flex-col gap-10">
          <NavBarButton
            text="Accueil"
            href="/home"
            icon={<House size={24} className="shrink-0" />}
            extend={isHovered}
          />
          <NavBarButton
            text="Atelier"
            href="/modeling-workshop-menu"
            icon={<CirclesThree size={24} className="shrink-0" />}
            extend={isHovered}
          />
          <NavBarButton
            text="Planification"
            href="/planification"
            icon={<ChartBar size={24} className="shrink-0" />}
            extend={isHovered}
          />
          <NavBarButton
            text="Emploi du temps"
            href="/#"
            icon={<Calendar size={24} className="shrink-0" />}
            extend={isHovered}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <NavBarButton
          text="Parametres"
          href="/#"
          icon={<Gear size={24} className="shrink-0" />}
          extend={isHovered}
        />
        <NavBarButton
          text="Notifications"
          href="/#"
          icon={<Bell size={24} className="shrink-0" />}
          extend={isHovered}
        />
        <LogOutButton
          text="Déconnexion"
          icon={<SignOut size={24} className="shrink-0" />}
          extend={isHovered}
        />
      </div>
    </header>
  );
}
