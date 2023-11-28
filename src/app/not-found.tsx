import NavBar from '@/components/navBar'
import Link from 'next/link'
 
export default function NotFound() {
  return (
      <section className="w-full bg-light-blue h-[50vh] ">
        <div className="ml-5 flex flex-col items-center justify-around h-full">
          <h2>Not Found</h2>
          <p>Could not find requested resource</p>
          <Link href="/home">Return Home</Link>
        </div>
      </section>    
  )
}