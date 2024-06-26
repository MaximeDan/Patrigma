import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/services/userService";
import { NextAuthOptions } from "next-auth";
import { readUserByEmail } from "@/repositories/userRepository";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
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

      async authorize(credentials): Promise<any> {
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
  session: { strategy: "jwt" },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await readUserByEmail(user.user.email);
        token.id = dbUser?.id ?? (user.id as number);
        token.name = dbUser?.name;
        token.email = dbUser?.email;
      }

      return token;
    },
  },
} satisfies NextAuthOptions;
