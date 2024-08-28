/**
 * @jest-environment node
 */

import { testApiHandler } from "next-test-api-route-handler";
import * as registerHandler from "../../../src/app/api/auth/register/route";

describe("Registration API", () => {
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
            confirmPassword: "Password@123",
            username: "johndoe",
            name: "John",
            lastName: "Doe",
            dateOfBirth: new Date("1990-01-01").toISOString(),
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
            password: "Password@123",
            confirmPassword: "Password@123",
            dateOfBirth: new Date("1990-01-01").toISOString(),
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
            password: "Password@123",
            confirmPassword: "Password@123",
          }),
        });
        const data = await res.json();

        expect(res.status).toBe(400);

        expect(data.message).toContain(
          "Ce champ est requis (expected string, received** undefined)",
        );
        expect(data.message).toContain("Date invalide");
        expect(data.message).toContain(
          "La date ne peut pas être dans le futur",
        );
        expect(data.message).toContain("Email invalide");
      },
    });
  });

  it("returns error for invalid date of birth", async () => {
    await testApiHandler({
      appHandler: registerHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "john2@example.com",
            password: "Password@123",
            confirmPassword: "Password@123",
            username: "johndoe",
            name: "John",
            lastName: "Doe",
            dateOfBirth: "invalid-date",
          }),
        });
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.message).toContain("Date invalide");
        expect(data.message).toContain(
          "La date ne peut pas être dans le futur",
        );
      },
    });
  });

  it("returns error for future date of birth", async () => {
    await testApiHandler({
      appHandler: registerHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "john3@example.com",
            password: "Password@123",
            confirmPassword: "Password@123",
            username: "johndoe",
            name: "John",
            lastName: "Doe",
            dateOfBirth: new Date(Date.now() + 86400000).toISOString(), 
          }),
        });
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.message).toContain(
          "La date ne peut pas être dans le futur",
        );
      },
    });
  });

  it("returns error for missing name", async () => {
    await testApiHandler({
      appHandler: registerHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "missingname@example.com",
            password: "Password@123",
            confirmPassword: "Password@123",
            username: "johndoe",
            lastName: "Doe",
            dateOfBirth: new Date("1990-01-01").toISOString(),
          }),
        });
        const data = await res.json();

        expect(res.status).toBe(400);

        expect(data.message).toContain(
          "Error at name: Ce champ est requis (expected string, received** undefined)",
        );
      },
    });
  });

  it("returns error for invalid email format", async () => {
    await testApiHandler({
      appHandler: registerHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "invalid-email",
            password: "Password@123",
            confirmPassword: "Password@123",
            username: "johndoe",
            name: "John",
            lastName: "Doe",
            dateOfBirth: new Date("1990-01-01").toISOString(),
          }),
        });
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.message).toContain("Email invalide");
      },
    });
  });

  it("returns error for weak password", async () => {
    await testApiHandler({
      appHandler: registerHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "weakpassword@example.com",
            password: "password",
            confirmPassword: "password",
            username: "johndoe",
            name: "John",
            lastName: "Doe",
            dateOfBirth: new Date("1990-01-01").toISOString(),
          }),
        });
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.message).toContain(
          "Veuillez renseigner au moins une lettre majuscule",
        );
        expect(data.message).toContain(
          "Veuillez renseigner au moins un chiffre",
        );
        expect(data.message).toContain(
          "Veuillez renseigner au moins un caractère spécial",
        );
      },
    });
  });

  it("returns error for whitespace in required fields", async () => {
    await testApiHandler({
      appHandler: registerHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "whitespace@example.com",
            password: "Password@123",
            confirmPassword: "Password@123",
            username: "   ",
            name: "   ",
            lastName: "   ",
            dateOfBirth: new Date("1990-01-01").toISOString(),
          }),
        });
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.message).toContain("Ce champ est requis");
      },
    });
  });

  it("returns error for mismatched passwords", async () => {
    await testApiHandler({
      appHandler: registerHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "mismatch@example.com",
            password: "Password@123",
            confirmPassword: "Password@124",
            username: "johndoe",
            name: "John",
            lastName: "Doe",
            dateOfBirth: new Date("1990-01-01").toISOString(),
          }),
        });
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.message).toContain(
          "Les mots de passe ne correspondent pas",
        );
      },
    });
  });
});
