import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Validation des données ?
    // ajouter les informations de la session à la requête ?
    return NextResponse.next();
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
