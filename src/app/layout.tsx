import type { Metadata } from 'next'
import { NextAuthProvider } from './providers'
import "./globals.css"
import { Montserrat_Alternates } from 'next/font/google'

export const metadata: Metadata = {
  title: 'MediPlan',
  description: 'Bienvenue sur MediPlan',
  icons: {
    icon: '/icon.ico',
  },
}

const montserrat_alternates = Montserrat_Alternates({
    weight: "500",
    subsets:["latin"],
    variable:'--font-montserrat_alternates'
})

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="fr">
      <body className={montserrat_alternates.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
