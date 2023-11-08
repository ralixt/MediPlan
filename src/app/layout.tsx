import type { Metadata } from 'next'
import { NextAuthProvider } from './providers'
import "./globals.css"
import { Montserrat_Alternates } from 'next/font/google'
export const metadata: Metadata = {
  title: 'MediPlan - Accueil',
  description: 'Bienvenue sur MediPlan',
}
const montserrat_alternates = Montserrat_Alternates({weight: "500",subsets:["latin"]})
export default function RootLayout({children,}: {children: React.ReactNode}) {

  
  return (

    <html lang="fr">
      <body className={montserrat_alternates.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
