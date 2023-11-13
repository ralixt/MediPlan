import NavBar from "@/components/navBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { RedirectType, redirect } from 'next/navigation';
import Image from "next/image";

export default async function ConnectedLayout({children,}: {children: React.ReactNode}) {
    const session = await getServerSession(authOptions);
    console.log(session)
    if(!session?.user)
    redirect("/", RedirectType.replace)
    return( 
    <div className="flex flex-row">
      <NavBar/>
      <main className="flex flex-col items-center w-full">  
        {children}
      </main>
    </div>
    )
  }