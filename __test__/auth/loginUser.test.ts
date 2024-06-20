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
          console.log("Redirect location:", res.headers.get("location"));
        }

        // Handle the 302 redirect or other responses as needed
        expect(res.status).toBe(200); // Adjust this expectation based on your actual response

        // Only parse JSON if status is not 302
        if (res.status !== 302) {
          const data = await res.json();
          console.log("Response data:", data);

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
      appHandler: loginHandler, // Use appHandler for Next.js API routes
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

        if (res.status === 302) {
          console.log("Redirect location:", res.headers.get("location"));
        }

        // Handle the 302 redirect or other responses as needed
        expect(res.status).toBe(401); // Adjust this expectation based on your actual response

        // Only parse JSON if status is not 302
        if (res.status !== 302) {
          const data = await res.json();
          console.log("Response data:", data);

          expect(data).toEqual(
            expect.objectContaining({
              error: "CredentialsSignin",
            }),
          );
        }
      },
    });
  });
});
