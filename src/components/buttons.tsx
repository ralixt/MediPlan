"use client";
import Link from "next/link";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { CaretRight, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { DotsThreeOutlineVertical } from "@phosphor-icons/react/dist/ssr";
import OptionMenuOverlay from "./optionMenuOverlay";
import { deleteParcoursType } from "@/actions/ParcoursType";
import planification from "@/app/models/planification";

// Bouton qui permet de se connecter avec NextAuthJS
export const LoginButton = () => {
  return (
    <button
      type="submit"
      className="bg-dark-blue text-white rounded-lg p-2 w-4/5 mx-auto hover:rounded-3xl mt-8"
    >
      Connexion
    </button>
  );
};

type PropsDefaultButton = {
  text: string;
  href: string;
};
// bouton principal
export function PrimaryButton({ text, href }: PropsDefaultButton) {
  return <Link href={href}>{text}</Link>;
}

type PropsOneIconButton = {
  text: string;
  href: string;
  icon: React.ReactNode;
};
// Bouton avec une icone sur la droite
export function OneIconButton({ text, href, icon }: PropsOneIconButton) {
  return (
    <Link href={href} className="flex rounded-[10px] bg-dark-blue">
      <div className="flex flex-row gap-8 px-5 py-7 bg-white rounded-[10px] hover:translate-x-[-0.5rem] hover:translate-y-[-0.5rem] transition-all duration-200 ease-in-out active:translate-x-0 active:translate-y-0">
        <div className="flex flex-row gap-2">
          <p>{text}</p>
        </div>
        {icon}
      </div>
    </Link>
  );
}

type PropsTwoIconButton = {
  text: string;
  href: string;
  icon1: React.ReactNode;
  icon2: React.ReactNode;
};
// Bouton avec deux icones
export function TwoIconButton({
  text,
  href,
  icon1,
  icon2,
}: PropsTwoIconButton) {
  return (
    <Link href={href} className=" flex rounded-[10px] bg-dark-blue">
      <div className="flex flex-row gap-8 px-5 py-7 bg-white rounded-[10px] hover:translate-x-[-0.5rem] hover:translate-y-[-0.5rem] transition-all duration-200 ease-in-out active:translate-x-0 active:translate-y-0">
        <div className="flex flex-row gap-2">
          {icon1}
          <p>{text}</p>
        </div>
        {icon2}
      </div>
    </Link>
  );
}

// bouton secondaire
export function SecondaryButton({ text, href }: PropsDefaultButton) {
  return <Link href={href}>{text}</Link>;
}

type PropsNavBarButton = {
  text: string;
  href: string;
  icon: React.ReactNode;
  extend: boolean;
};
// Bouton de la bar de Navigation
export function NavBarButton({ text, href, icon, extend }: PropsNavBarButton) {
  const router = usePathname();
  const isActive = router == href;
  return (
    <Link
      href={isActive ? "/#" : href}
      className={`flex flex-row items-center transition-all duration-200 ease-in-out ${
        extend ? "gap-5" : "gap-0"
      } ${isActive ? "text-dark-blue font-bold" : "hover:text-light-blue"} `}
    >
      {icon}
      <span
        className={`whitespace-nowrap text-sm  transition-opacity duration-200 ease-in-out ${
          extend
            ? "opacity-100 w-full delay-50"
            : "opacity-0 w-0 absolute -left-full"
        } `}
      >
        {text}
      </span>
    </Link>
  );
}

type PropsLogOutButton = {
  text: string;
  icon: React.ReactNode;
  extend: boolean;
};
//Bouton de deconnexion de la bar de navigation
export function LogOutButton({ text, icon, extend }: PropsLogOutButton) {
  return (
    <button
      onClick={() => signOut()}
      className={`flex flex-row items-center transition-all duration-200 ease-in-out ${
        extend ? "gap-5" : "gap-0"
      } hover:text-negative`}
    >
      {icon}
      <span
        className={`whitespace-nowrap text-sm transition-opacity duration-200 ease-in-out ${
          extend ? "opacity-100 delay-50" : "opacity-0 absolute -left-full"
        }`}
      >
        {text}
      </span>
    </button>
  );
}

type PropsWorkshopButton = {
  index: number;
  href: string;
  handleClick?: (id: string) => void;
  parcours: parcours;
};

export function WorkshopButton({
  index,
  href,
  handleClick,
  parcours,
}: PropsWorkshopButton) {
  const [showOptions, setShowOptions] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
    setConfirmDelete(false);
  };

  const handleDelete = () => {
    if (handleClick && confirmDelete) {
      handleClick(parcours._id);
      setShowOptions(false);
    }
  };
  return (
    <>
      {showOptions ? (
        <OptionMenuOverlay
          setShowOptions={setShowOptions}
          setConfirmDelete={setConfirmDelete}
          handleClick={handleDelete}
          confirmDelete={confirmDelete}
          parcours={parcours}
        />
      ) : (
        ""
      )}
      <div className="bg-dark-blue flex  rounded-2xl shadow-sm my-8">
        <div className="flex flex-row justify-between content-center items-center pr-3 w-full h-full bg-lightlightgrey hover:translate-x-[-0.5rem] rounded-xl hover:translate-y-[-0.5rem] transition-all duration-200 ease-in-out active:translate-x-0 active:translate-y-0">
          <Link key={index} href={href} className="w-full h-full p-8">
            <div className="flex flex-row font-bold justify-between content-center w-full h-full">
              <p>{parcours.name}</p>
            </div>
          </Link>
          {handleClick ? (
            <button
              className="rounded-full hover:bg-gray-200"
              onClick={handleOptionsClick}
            >
              <DotsThreeOutlineVertical size={24} weight="fill" />
            </button>
          ) : (
            ""
          )}
          <CaretRight size={32} />
        </div>
      </div>
    </>
  );
}


type PropsWorkshopButtonPlanif = {
  index: number;
  href: string;
  handleClick?: (id: string) => void;
  planification: planification;
};

export function WorkshopButtonPlanif({
                                 index,
                                 href,
                                 handleClick,
                                 planification,
                               }: PropsWorkshopButtonPlanif) {
  const [showOptions, setShowOptions] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
    setConfirmDelete(false);
  };

  const handleDelete = () => {
    if (handleClick && confirmDelete) {
      handleClick(planification._id);
      setShowOptions(false);
    }
  };
  return (
      <>
        {showOptions ? (
            <OptionMenuOverlay
                setShowOptions={setShowOptions}
                setConfirmDelete={setConfirmDelete}
                handleClick={handleDelete}
                confirmDelete={confirmDelete}
                parcours={planification}
            />
        ) : (
            ""
        )}
        <div className="bg-dark-blue flex  rounded-2xl shadow-sm my-8">
          <div className="flex flex-row justify-between content-center w-full h-full p-8 bg-lightlightgrey hover:translate-x-[-0.5rem] rounded-xl hover:translate-y-[-0.5rem] transition-all duration-200 ease-in-out active:translate-x-0 active:translate-y-0">
            <Link key={index} href={href} className="w-full h-full">
              <div className="flex flex-row font-bold justify-between content-center w-full h-full">
                <p>{planification.nom}</p>
              </div>
            </Link>
            {handleClick ? (
                <button
                    className="rounded-full hover:bg-gray-200"
                    onClick={handleOptionsClick}
                >
                  <DotsThreeOutlineVertical size={24} weight="fill" />
                </button>
            ) : (
                ""
            )}
            <CaretRight size={32} />
          </div>
        </div>
      </>
  );
}


type PropsWorkshopOneIconButton = {
  icon: React.ReactNode;
  href: string;
  classname?: string;
};
export function WorkshopButtonOneIcon({
  icon,
  href,
  classname,
}: PropsWorkshopOneIconButton) {
  return (
    <Link href={href} className={classname}>
      {icon}
    </Link>
  );
}

type PropsOneIconButtonAddParcoursType = {
  text: string;
  icon: React.ReactNode;
  Click: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export function OneIconButtonAddParcoursType({
  text,
  icon,
  Click,
}: PropsOneIconButtonAddParcoursType) {
  return (
    <button
      className="flex rounded-[10px] bg-dark-blue"
      type="submit"
      onClick={Click}
    >
      <div className="flex flex-row gap-8 px-5 py-7 bg-white rounded-[10px] hover:translate-x-[-0.5rem] hover:translate-y-[-0.5rem] transition-all duration-200 ease-in-out active:translate-x-0 active:translate-y-0">
        <div className="flex flex-row gap-2">
          <p>{text}</p>
        </div>
        {icon}
      </div>
    </button>
  );
}

type propsJourneeTypeButton = {
  journeeType: JourneeType;
  active: boolean;
  setSelectedJourneeType: Dispatch<SetStateAction<JourneeType | undefined>>;
};

export function JourneeTypeButton({
  journeeType,
  active,
  setSelectedJourneeType,
}: propsJourneeTypeButton) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setSelectedJourneeType(journeeType);
  };
  return (
    <button
      className="rounded-lg w-16 h-20 bg-dark-blue"
      disabled={active}
      onClick={handleClick}
    >
      <div
        className={` bg-lightlightgrey rounded-md w-full h-full flex items-center justify-center ${
          active
            ? "translate-x-[-0.3rem] translate-y-[-0.3rem]"
            : "hover:translate-x-[-0.3rem] hover:translate-y-[-0.3rem] transition-all duration-200 ease-in-out"
        }`}
      >
        <p className="font-bold">{journeeType.nom.slice(0, 3)}</p>
      </div>
    </button>
  );
}
