import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/services/userService";
import { NextAuthOptions } from "next-auth";
import { readUserByEmail } from "@/repositories/userRepository";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
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
        session.accessToken = token.accessToken as string;
      }

      return session;
    },
    async jwt({ token, user, account }) {
      if (account) {
        console.log("ACCOUNT " + account.access_token);
      }
      if (user) {
        // @ts-ignore
        const dbUser = await readUserByEmail(user.user.email);
        token.id = dbUser?.id ?? (user.id as number);
        token.name = dbUser?.name;
        token.email = dbUser?.email;
        token.accessToken = user.accessToken;
      }

      return token;
    },
  },
} satisfies NextAuthOptions;
