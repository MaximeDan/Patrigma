import prisma from "@/lib/prisma";
import { register } from "@/services/userService";
import request from "supertest";
import { createServer } from "http";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = createServer((req, res) => {
  handle(req, res);
});

beforeAll(async () => {
  // await app.prepare();
  // server.listen(3000);
  try {
    const user = await register({
      email: "test@test.com",
      password: "password",
      name: "test",
      username: "test",
      lastName: "test",
      dateOfBirth: new Date(),
    });
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await prisma.user.delete({ where: { email: "test@test.com" } });
  // server.close();
});

describe("Authentication", () => {
  test("should authenticate user with valid credentials", async () => {
    const response = await request(server)
      .post("/api/auth/signin/credentials")
      .send({ email: "test@test.com", password: "password" });

    expect(response.statusCode).toBe(200);
  });
});
