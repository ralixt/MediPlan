"use client";
import React, {useRef} from "react";
import {signIn} from "next-auth/react";
import {LoginButton} from "@/components.temporary/buttons.component";
import {Password, User} from "@phosphor-icons/react";
import Image from "next/image";


type Props = {
    className?: string;
    callbackUrl?: string;
}


export const Login = (props: Props) => {
    const userName = useRef("")
    const password = useRef("")
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn("credentials", {
            username: userName.current,
            password: password.current,
            redirect: true,
            callbackUrl:props.callbackUrl ?? "http://localhost:3000/home"
        })
    }

    return (
        <main className="bg-light-blue h-screen w-screen flex">
            <div className={'${props.className} bg-white h-full w-1/2 rounded-r-1_25rem flex-row'}>

                <Image
                    src="/mediplanLogo.svg"
                    alt="Mediplan Logo"
                    width={200}
                    height={200}
                />

                <div className="w-full flex justify-center font-bold text-4xl mb-24 mt-8">
                    <h1>Connexion a votre compte</h1>
                </div>
                <form method="POST" onSubmit={onSubmit} className="flex flex-col w-4/5 mx-auto">

                    <div className="flex flex-row w-full">
                        <label className="">
                            {/*Nom d'utilisateur :*/}
                            <input type="text" name="username" placeholder="Nom d'utilisateur" onChange={(e) =>
                                userName.current = e.target.value}/>
                        </label>
                        <User size={32} />
                    </div>

                    <div className="flex flex-row w-full">
                        <label>
                            {/*Mot de passe :*/}
                            <input type="password" name="password" placeholder="Mot de passe" onChange={(e) =>
                                password.current = e.target.value}/>
                        </label>
                        <Password size={32} />
                    </div>

                    <LoginButton></LoginButton>

                </form>
            </div>
            <div className="bg-light-blue h-full w-1/2 flex text-9xl">
                <h1>Bienvenue !</h1>
            </div>

        </main>
    )
}