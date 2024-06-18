/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import * as registerHandler from "../../../src/app/api/auth/register/route";

it("registers a new user successfully", async () => {
  await testApiHandler({
    appHandler: registerHandler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "john.doe@example.com",
          password: "Password@123",
          username: "johndoe",
          name: "John",
          lastName: "Doe",
          dateOfBirth: new Date("1990-01-01"),
        }),
      });
      const data = await res.json();

      expect(res.status).toBe(201);
      expect(data).toEqual(
        expect.objectContaining({
          user: expect.objectContaining({
            email: "john.doe@example.com",
            username: "johndoe",
            name: "John",
            lastName: "Doe",
          }),
        }),
      );
    },
  });
});

it("returns error for already used email", async () => {
  await testApiHandler({
    appHandler: registerHandler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Alice",
          lastName: "Prisma",
          email: "alice@prisma.io",
          username: "aliceUserName",
          password: "alicePassword",
          dateOfBirth: new Date("1990-01-01"),
        }),
      });
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data).toEqual(
        expect.objectContaining({
          message: "Email already in use",
        }),
      );
    },
  });
});

it("returns error for bad request", async () => {
  await testApiHandler({
    appHandler: registerHandler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Alice",
          lastName: "Prisma",
          email: "",
        }),
      });
      const data = await res.json();

      expect(res.status).toBe(400);
      expect(data).toEqual(
        expect.objectContaining({
          message: "email is required",
        }),
      );
    },
  });
});
