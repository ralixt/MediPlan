import { TwoIconButton } from "@/components/buttons";
import NavBar from "@/components/navBar";
import { authOptions } from "@/lib/auth";
import { ArrowRight, CirclesThree } from "@phosphor-icons/react/dist/ssr";
import { getServerSession } from "next-auth/next";

export default async function Home(){
    const session = await getServerSession(authOptions);
    return<>
        <section className="w-full flex flex-col items-center">
            <p className="font-bold text-3xl w-fit">Bonjour {session?.user?.name}</p>
            <div className="flex flex-row justify-around w-full">
                <TwoIconButton text="Atelier de modélisation" href="/modelingWorkshopMenu" icon1={<CirclesThree size={24}/>} icon2={<ArrowRight size={24} />}/>
                <TwoIconButton text="Planifications" href="/modelingWorkshopMenu" icon1={<CirclesThree size={24}/>} icon2={<ArrowRight size={24} />}/>
                <TwoIconButton text="Emploi du temps" href="/modelingWorkshopMenu" icon1={<CirclesThree size={24}/>} icon2={<ArrowRight size={24} />}/>
            </div>
        </section>
        <section>
            <p>WIP</p>
        </section>
    </>
        
}