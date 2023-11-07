import type { Metadata } from 'next'
import { NextAuthProvider } from './providers'

export const metadata: Metadata = {
  title: 'MediPlan - Accueil',
  description: 'Bienvenue sur MediPlan',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
