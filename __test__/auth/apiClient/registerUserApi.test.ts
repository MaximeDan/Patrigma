import request from "supertest";
import { spawn, ChildProcess } from "child_process";
import path from "path";

let server: ChildProcess;

beforeAll(async () => {
  const serverScript = path.resolve(__dirname, "../../customServer.ts");
  server = spawn("ts-node", [serverScript]);

  // Wait for the server to be ready
  await new Promise((resolve, reject) => {
    server.stdout?.on("data", (data) => {
      if (data.toString().includes("> Ready on http://localhost:3000")) {
        resolve(null);
      }
    });
    server.stderr?.on("data", (data) => {
      reject(data.toString());
    });
  });
}, 30000); // Increase the timeout to 30 seconds

afterAll(() => {
  if (server) {
    server.kill();
  }
});

describe("registerUser API Integration Test", () => {
  it("registers a new user successfully", async () => {
    const data = {
      email: "john.doe@example.com",
      password: "Password@123",
      username: "johndoe",
      name: "John",
      lastName: "Doe",
      dateOfBirth: new Date(1990, 1, 1),
    };

    const response = await request("http://localhost:3000")
      .post("/api/auth/register")
      .send(data)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "User registered successfully",
        // Other expected response properties
      }),
    );
  });

  it("returns error for already used email", async () => {
    const data = {
      email: "used.email@example.com",
      password: "Password@123",
      username: "johndoe",
      name: "John",
      lastName: "Doe",
      dateOfBirth: new Date(1990, 1, 1),
    };

    const response = await request("http://localhost:3000")
      .post("/api/auth/register")
      .send(data)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Email already in use",
      }),
    );
  });

  // Add more tests for other use cases as needed
});
