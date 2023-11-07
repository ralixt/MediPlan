import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components.temporary/buttons.component";
import { User } from "@/components.temporary/user.component";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {Login} from "@/components.temporary/login";

// export default async function Home() {
//   const session = await getServerSession(authOptions);
//   console.log("session: " + JSON.stringify(session));
//   return (
//     <main
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "70vh",
//       }}
//     >
//       <div>
//
//         <LoginButton />
//         <RegisterButton />
//         <LogoutButton />
//         <ProfileButton />
//         <User />
//       </div>
//     </main>
//   );
// }


export default async function SignInPage() {
    return(
        <Login></Login>
    )
}



