import { TwoIconButton } from "@/components/buttons";
import NavBar from "@/components/navBar";
import { authOptions } from "@/lib/auth";
import { ArrowRight, Calendar, ChartBar, CirclesThree } from "@phosphor-icons/react/dist/ssr";
import { getServerSession } from "next-auth/next";

export default async function Home(){
    const session = await getServerSession(authOptions);
    return<>
        <section className="w-full bg-light-blue h-[50vh] ">
            <div className="ml-5 flex flex-col items-center justify-around h-full">
                <p className="font-bold text-3xl w-fit">Bonjour {session?.user?.name}</p>
                <div className="flex flex-row justify-around w-full">
                    <TwoIconButton text="Atelier de modélisation" href="/modeling-workshop-menu" icon1={<CirclesThree size={24}/>} icon2={<ArrowRight size={24} />}/>
                    <TwoIconButton text="Planifications" href="/modelingWorkshopMenu" icon1={<ChartBar size={24}/>} icon2={<ArrowRight size={24} />}/>
                    <TwoIconButton text="Emploi du temps" href="/modelingWorkshopMenu" icon1={<Calendar size={24}/>} icon2={<ArrowRight size={24} />}/>
                </div>
            </div>
            
        </section>
        <section className="h-[50vh]">
            <div className="ml-5 flex flex-col items-center justify-around h-full">
                <p className=" text-left justify-self-start">WIP</p>
            </div>
        </section>
    </>
        
}