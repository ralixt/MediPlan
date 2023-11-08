import NavBar from "@/components/navBar";

export default function ConnectedLayout({children,}: {children: React.ReactNode}) {
    return <>
      <NavBar/>
      {children}
    </>
  }