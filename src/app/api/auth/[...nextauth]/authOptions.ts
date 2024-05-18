import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "../../../../services/userService";

import NextAuth, { NextAuthOptions } from "next-auth";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      // Todo : implement the authorize method
    async authorize(credentials):Promise<any> {
        if (!credentials) {
            return null;
        }

        const user = await signIn(credentials.username, credentials.password);

        if (user) {
            return user;
        }
        return null;
    },
    }),
  ],
} satisfies NextAuthOptions;

export default NextAuth(authOptions);
