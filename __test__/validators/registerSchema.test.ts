// __tests__/auth/registerSchema.test.ts
import registerSchema from "@/validators/registerSchema";

describe("registerSchema", () => {
  it("should validate correct input", () => {
    const validData = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date(1990, 1, 1),
      email: "john.doe@example.com",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    expect(() => registerSchema.parse(validData)).not.toThrow();
  });

  it("should throw error for invalid email", () => {
    const invalidData = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date(1990, 1, 1),
      email: "john.doe",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    expect(() => registerSchema.parse(invalidData)).toThrow();
  });
  it("should throw error for password mismatch", () => {
    const invalidData = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date(1990, 1, 1),
      email: "john.doe@example.com",
      password: "Password@123",
      confirmPassword: "DifferentPassword@123",
    };

    expect(() => registerSchema.parse(invalidData)).toThrow();
  });

});
