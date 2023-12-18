"use server"
import { connectMongodb, disconnectMongodb } from "@/lib/mongoConnect";
import Compte from "@/app/models/compte";
import bcrypt from "bcrypt"



export async function CreateUser(formData: FormData) {
    try {
        await connectMongodb();

        const username = formData.get("username");
        const password = formData.get("password");


        const hashedPassword = await bcrypt.hash(password, 10);

        const comptes = await Compte.create({
            username: username,
            password: hashedPassword,
        });

        console.log("Un compte créé :", comptes);
        return comptes;
    } catch (e) {
        console.error(e);
    } finally {
        await disconnectMongodb();
    }
}

export const authenticateUser = async (credentials: { username: any; password: any; }) => {
    const { username, password } = credentials;

    try {
        await connectMongodb();
        const user = await Compte.findOne({ username });

        if (!user) {
            return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return null;
        }

        return user;
    } catch (error) {
        console.error("Error: ", error);
        throw new Error("Authentication failed");
    }
};
