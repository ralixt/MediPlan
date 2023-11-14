import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {Login} from "@/components/login";
import Image from "next/image";
import React from "react";
import { RedirectType, redirect } from "next/navigation";


export default async function SignInPage() {
    const session = await getServerSession(authOptions);
    if(session?.user) redirect("/home", RedirectType.replace)
    return(

        <main className="bg-light-blue h-screen w-screen flex">
            <div className={`bg-white h-full w-1/2 rounded-r-1_25rem flex-row z-10`}>

                <Image
                    src="/mediplanLogo.svg"
                    alt="Mediplan Logo"
                    width={200}
                    height={200}
                    className="mt-4"
                />

                <Login></Login>

            </div>
            <div className="bg-light-blue h-full w-1/2 flex text-8xl font-bold flex-col justify-center items-center">
                <Image src="/logoAnimated.gif" alt="Logo gif" height={400} width={400} className=" rotate-[60deg] absolute -top-[3rem] right-[32rem]"/>
                <h1>Bienvenue !</h1>
            </div>

        </main>
    )
}



