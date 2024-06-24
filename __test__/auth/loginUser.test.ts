/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import * as loginHandler from "@/app/api/auth/[...nextauth]/route";

describe("NextAuth API", () => {
  it("signs in with valid credentials", async () => {
    await testApiHandler({
      appHandler: loginHandler, // Use appHandler for Next.js API routes
      params: { nextauth: ["callback", "credentials"] },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: "alice@prisma.io",
            password: "alicePassword",
          }),
        });

        console.log("Response status:", res.status);

        if (res.status === 302) {
          const location = res.headers.get("location");
          console.log("Redirect location:", location);

          // Check that the location header contains the expected URL
          expect(location).toContain("/"); // Adjust based on your redirect URL
        }

        // Optionally, if you expect JSON in other cases (e.g., error responses)
        if (res.status !== 302) {
          const data = await res.json();
          console.log("Response data:", data);

          expect(res.status).toBe(200);
          expect(data).toHaveProperty("user");
          expect(data.user).toEqual(
            expect.objectContaining({
              email: "alice@prisma.io",
            }),
          );
        }
      },
    });
  });

  it("fails to sign in with invalid credentials", async () => {
    await testApiHandler({
      appHandler: loginHandler,
      params: { nextauth: ["callback", "credentials"] },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: "invalid-email@example.com",
            password: "invalid-password",
          }),
        });

        console.log("Response status:", res.status);

        const data = await res.json();
        console.log("Response data:", data);

        expect(res.status).toBe(401);
        expect(data).toEqual(
          expect.objectContaining({
            error: "Invalid credentials",
          }),
        );
      },
    });
  });
});
