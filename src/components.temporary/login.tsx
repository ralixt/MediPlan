"use client";
import React, {useRef} from "react";
import {signIn} from "next-auth/react";


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
        <main>
            <div className={props.className}>
                <h1>Connexion a votre compte</h1>
                <form method="POST" onSubmit={onSubmit}>
                    <label>
                        Nom d'utilisateur :
                        <input type="text" name="username" onChange={(e) =>
                            userName.current = e.target.value}/>
                    </label>

                    <label>
                        Mot de passe :
                        <input type="password" name="password" onChange={(e) =>
                            password.current = e.target.value}/>
                    </label>

                    <button type="submit">
                        Connexion
                    </button>


                </form>

            </div>
        </main>
    )
}