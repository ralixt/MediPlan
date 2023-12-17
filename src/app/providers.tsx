"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};
//Provider de NextAuthJS qui permet d'avoir la session dans un composant client
export const NextAuthProvider = ({ children }: Props) => {

  return <SessionProvider>{children}</SessionProvider>;
};
