import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components.temporary/buttons.component";
import { User } from "@/components.temporary/user.component";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {Login} from "@/components/login";
import Image from "next/image";
import React from "react";

// export default async function Home() {
//   const session = await getServerSession(authOptions);
//   console.log("session: " + JSON.stringify(session));
//   return (
//     <main
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "70vh",
//       }}
//     >
//       <div>
//
//         <LoginButton />
//         <RegisterButton />
//         <LogoutButton />
//         <ProfileButton />
//         <User />
//       </div>
//     </main>
//   );
// }


export default async function SignInPage() {
    return(

        <main className="bg-light-blue h-screen w-screen flex">
            <div className={'${props.className} bg-white h-full w-1/2 rounded-r-1_25rem flex-row'}>

                <Image
                    src="/mediplanLogo.svg"
                    alt="Mediplan Logo"
                    width={200}
                    height={200}
                    className="mt-4"
                />

                <Login></Login>

            </div>
            <div className="bg-light-blue h-full w-1/2 flex text-8xl justify-center items-center font-bold">
                <h1>Bienvenue !</h1>
            </div>

        </main>
    )
}



