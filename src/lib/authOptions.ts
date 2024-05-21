import CredentialsProvider from "next-auth/providers/credentials";
import {signIn} from "@/services/userService";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: {
                    label: "Email",
                    type: "text",
                },
                password: {label: "Password", type: "password"},
            },

            async authorize(credentials): Promise<any> {
                if (!credentials) {
                    return null;
                }

                const data = await signIn(credentials.identifier, credentials.password);

                if (data.user) {
                    return { ...data.user };
                }
                return null;
            },
        }),
    ],
};

