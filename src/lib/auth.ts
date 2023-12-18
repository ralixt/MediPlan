import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {authenticateUser} from "@/actions/Compte";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
       const users = authenticateUser(credentials)
        console.log(credentials)
        const user = { id: "1", name: "admin", email: "admin@admin.com",password:"cc"};
        return users;
      },
    }),
  ],
  pages : {
    signIn:"/"
  }
}