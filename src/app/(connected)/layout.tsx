import NavBar from "@/components/navBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { RedirectType, redirect } from 'next/navigation';
import Image from "next/image";

export default async function ConnectedLayout({children,}: {children: React.ReactNode}) {
  // nous regardons si il y a deja une session active, sinon on redirige vers "/"
    const session = await getServerSession(authOptions);
    if(!session?.user) redirect("/", RedirectType.replace)

    
    return<div className="flex flex-row">
      <NavBar/>
      <main className="w-full ml-12">  
        {children}
      </main>
    </div> 
  }