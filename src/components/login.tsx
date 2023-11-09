"use client";
import React, {useRef, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {LoginButton} from "@/components/buttons";
import {Password, User} from "@phosphor-icons/react";
import Image from "next/image";


type Props = {
    className?: string;
    callbackUrl?: string;
}


export const Login = (props: Props) => {
    const userName = useRef("")
    const password = useRef("")

    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("coucou")
        await signIn("credentials", {
            username: userName.current,
            password: password.current,
            redirect: true,
            callbackUrl: props.callbackUrl ?? "http://localhost:3000/home"
        })

    }
    const session = useSession()
    console.log(session)

    return (


        <form method="POST" onSubmit={onSubmit} className="flex flex-col w-4/5 mx-auto mt-12">
            <div className="w-full flex justify-center font-bold text-4xl mb-24 mt-8">
                <h1>Connexion a votre compte</h1>
            </div>

            <div
                className={`flex flex-row w-full border-b-2 mb-8 ${usernameFocused || userName.current ? 'border-black' : 'text-lightgrey'}`}>
                {/*<label className="">*/}
                {/*Nom d'utilisateur :*/}
                <input type="text"
                       name="username"
                       placeholder="Nom d'utilisateur"
                       className="w-full outline-none bg-white"
                       onChange={(e) =>
                           userName.current = e.target.value}
                       onFocus={() => setUsernameFocused(true)}
                       onBlur={() => setUsernameFocused(false)}/>

                {/*</label>*/}
                <User size={32}/>
            </div>

            <div
                className={`flex flex-row w-full border-b-2 mb-8 ${passwordFocused || password.current ? 'border-black' : 'text-lightgrey'}`}>
                {/*<label>*/}
                {/*Mot de passe :*/}
                <input type="password"
                       name="password"
                       placeholder="Mot de passe"
                       className="w-full outline-none bg-white"
                       onChange={(e) =>
                           password.current = e.target.value}
                       onFocus={() => setPasswordFocused(true)}
                       onBlur={() => setPasswordFocused(false)}/>
                {/*</label>*/}
                <Password size={32}/>
            </div>

            <LoginButton></LoginButton>

        </form>

    )
}