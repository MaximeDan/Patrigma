import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    // ajouter les informations de la session à la requête ?
    const bearerToken = req.headers.get("Authorization");
    const token = bearerToken?.split("Bearer ")[1];

    console.log("middleware token", token);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("Authorization", `Bearer ${token}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const route = req.nextUrl.pathname;
        console.log("middleware route", route, "methode", req.method);
        console.log("middleware token callback", token);

        // routes qui ne requièrent pas d'authentification
        if (!token) {
          if (!route.startsWith("/api/users") && req.method === "GET") {
            return true;
          } else {
            return false;
          }
        }

        // si token et role !admin => return false pour les routes admins (/api/users en GET)

        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/api/:path*"], // Appliquer le middleware à toutes les routes sous /api
};
