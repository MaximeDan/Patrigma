import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../services/userService";


export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },

    async authorize(credentials):Promise<any> {
        if (!credentials) {
            return null;
        }

        const user = await signIn(credentials.identifier, credentials.password);

        if (user) {
            return user;
        }
        return null;
    },
    }),
  ],
};

