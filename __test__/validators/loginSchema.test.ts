import { loginSchema } from "@/validators/loginSchema";

describe("loginSchema", () => {
  it("should pass with a valid email and password", () => {
    const data = {
      email: "test@example.com",
      password: "securePassword123",
    };
    expect(() => loginSchema.parse(data)).not.toThrow();
  });

  it("should fail when email is empty", () => {
    const data = {
      email: "",
      password: "securePassword123",
    };
    expect(() => loginSchema.parse(data)).toThrow("Ce champ est requis");
  });

  it("should fail when email is not a valid email address", () => {
    const data = {
      email: "invalid-email",
      password: "securePassword123",
    };
    expect(() => loginSchema.parse(data)).toThrow();
  });

  it("should fail when password is empty", () => {
    const data = {
      email: "test@example.com",
      password: "",
    };
    expect(() => loginSchema.parse(data)).toThrow("Ce champ est requis");
  });

  it("should fail when both email and password are empty", () => {
    const data = {
      email: "",
      password: "",
    };
    expect(() => loginSchema.parse(data)).toThrow("Ce champ est requis");
  });
});
