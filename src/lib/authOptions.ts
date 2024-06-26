import CredentialsProvider from "next-auth/providers/credentials";
import { getUserById, signIn } from "@/services/userService";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

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
    async jwt({ token, user, account, session }) {
      console.log("account jwt callback", session);
      if (user) {
        // @ts-ignore
        token.id = user.user.id;
      }
      return token;
    },

    // @ts-ignore
    async session(session: Session, token: JWT) {
      // @ts-ignore
      const dbUser = await getUserById(token?.id || session?.token?.id);
      // @ts-ignore
      session.session.user = {
        id: dbUser?.id,
        username: dbUser?.username,
        name: dbUser?.name,
        lastName: dbUser?.lastName,
        dateOfBirth: dbUser?.dateOfBirth,
      };

      return session;
    },
  },
} satisfies NextAuthOptions;
