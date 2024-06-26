// import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { secretKey } from "@/constant/secret";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: async ({ token, req }) => {
        const route = req.nextUrl.pathname;

        if (!token) {
          if (route.startsWith("/profil")) {
            return false;
          }

          if (route.startsWith("/api/users")) {
            return false;
          }

          if (req.method === "GET") {
            return true;
          }
        }

        if (token) {
          const { payload } = await jwtVerify(token.jwt, secretKey);
          console.log(payload, "payload in middleware");
          // todo: check if user is admin
          if (req.method === "GET") {
            return true;
          }
        }
        // si token et role !admin => return false pour les routes admins (/api/users en GET)

        return false;
      },
    },
    pages: {
      signIn: "/signin",
    },
  },
);

export const config = {
  matcher: ["/api/:path*", "/:path*"],
};
