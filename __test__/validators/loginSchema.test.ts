import { loginSchema } from "@/validators/loginSchema";

describe("loginSchema", () => {
  it("should pass with a valid email and password", () => {
    const data = {
      email: "test@example.com",
      password: "securePassword123",
    };
    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should fail when email is empty", () => {
    const data = {
      email: "",
      password: "securePassword123",
    };
    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Invalid email");
  });

  it("should fail when email is not a valid email address", () => {
    const data = {
      email: "invalid-email",
      password: "securePassword123",
    };
    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Invalid email");
  });
});
