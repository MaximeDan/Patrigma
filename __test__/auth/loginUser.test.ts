/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import * as loginHandler from "@/app/api/auth/[...nextauth]/route";

describe("NextAuth API", () => {
  it("signs in with valid credentials", async () => {
    await testApiHandler({
      appHandler: loginHandler,
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

        if (res.status === 302) {
          const location = res.headers.get("location");
          expect(location).toContain("/");
        }

        if (res.status !== 302) {
          const data = await res.json();

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

        expect(res.status).toBe(302);
        const locationHeader = res.headers.get("location");

        expect(locationHeader).toMatch(
          /^http:\/\/localhost:3000\/api\/auth\/signin\?/,
        );
      },
    });
  });
});
