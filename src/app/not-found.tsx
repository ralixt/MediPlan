import NavBar from '@/components/navBar'
import Link from 'next/link'
import Image from "next/image";
import { getServerSession } from 'next-auth';
import { RedirectType, redirect} from 'next/navigation';
import { authOptions } from '@/lib/auth';

 
export default async function NotFound() {
    const session = await getServerSession(authOptions);
    if(!session?.user) redirect("/", RedirectType.replace)
  return (
      <section className="w-full h-[100vh]">
        <NavBar></NavBar>
        <div className="ml-5 flex flex-col items-center justify-around h-full">
          <h2 className='text-5xl'>Erreur 404</h2>
          <p>La page demandé n'a pas été trouvé</p>
          <Link href="/home">Retour à l'accueil</Link>
        </div>
        
      </section>
  )
}