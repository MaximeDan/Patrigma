// __tests__/auth/registerSchema.test.ts
import registerSchema from "@/validators/registerSchema";

describe("registerSchema", () => {
  it("validates a correct user registration input", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    expect(() => registerSchema.parse(input)).not.toThrow();
  });
  it("fails validation with invalid email format", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: "1990-01-01",
      email: "invalid-email",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    expect(() => registerSchema.parse(input)).toThrow("Email invalide");
  });

  it("fails validation with name longer than 255 characters", () => {
    const input = {
      name: "J".repeat(256),
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    expect(() => registerSchema.parse(input)).toThrow(
      "Veuillez renseigner moins de 255 caractères",
    );
  });

  it("fails validation with password missing uppercase letter", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "password@123",
      confirmPassword: "password@123",
    };

    expect(() => registerSchema.parse(input)).toThrow(
      "Veuillez renseigner au moins une lettre majuscule",
    );
  });

  it("fails validation with password missing number", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "Password@",
      confirmPassword: "Password@",
    };

    expect(() => registerSchema.parse(input)).toThrow(
      "Veuillez renseigner au moins un chiffre",
    );
  });

  it("fails validation with password missing special character", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "Password123",
      confirmPassword: "Password123",
    };

    expect(() => registerSchema.parse(input)).toThrow(
      "Veuillez renseigner au moins un caractère spécial",
    );
  });

  it("fails validation with password shorter than 8 characters", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "Pass@1",
      confirmPassword: "Pass@1",
    };

    expect(() => registerSchema.parse(input)).toThrow(
      "Veuillez renseigner au moins 8 caractères",
    );
  });

  it("fails validation with passwords not matching", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "Password@123",
      confirmPassword: "Password@124",
    };

    expect(() => registerSchema.parse(input)).toThrow(
      "Les mots de passe ne correspondent pas",
    );
  });

  it("fails validation with missing required fields", () => {
    const input = {
      email: "john.doe@example.com",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    expect(() => registerSchema.parse(input)).toThrow("Ce champ est requis");
  });

  it("fails validation with invalid date of birth", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: "invalid-date", // This should be a string to trigger the invalid date error
      email: "john.doe@example.com",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    expect(() => registerSchema.parse(input)).toThrow(
      "Expected date, received string",
    );
  });

  it("fails validation with date of birth in the future", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date(Date.now() + 86400000), // Future date
      email: "john.doe@example.com",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    expect(() => registerSchema.parse(input)).toThrow(
      "La date ne peut pas être dans le futur",
    );
  });

  it("fails validation with whitespace in required fields", () => {
    const input = {
      name: "   ",
      lastName: "   ",
      username: "   ",
      dateOfBirth: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    expect(() => registerSchema.parse(input)).toThrow("Ce champ est requis");
  });

  it("fails validation with password exactly 8 characters but lacking complexity", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "Abc12345",
      confirmPassword: "Abc12345",
    };

    expect(() => registerSchema.parse(input)).toThrow(
      "Veuillez renseigner au moins un caractère spécial",
    );
  });

  it("fails validation with password including spaces", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "Password 123",
      confirmPassword: "Password 123",
    };

    expect(() => registerSchema.parse(input)).toThrow(
      "Veuillez renseigner au moins un caractère spécial",
    );
  });

  it("validates username case insensitivity", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "JohnDoe",
      dateOfBirth: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    expect(() => registerSchema.parse(input)).not.toThrow();
  });

  it("validates email case insensitivity", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date("1990-01-01"),
      email: "JOHN.DOE@EXAMPLE.COM",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    expect(() => registerSchema.parse(input)).not.toThrow();
  });

  it("fails validation with email containing leading or trailing spaces", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      username: "johndoe",
      dateOfBirth: new Date("1990-01-01"),
      email: " john.doe@example.com ",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    expect(() => registerSchema.parse(input)).toThrow(
      "L'email ne doit pas contenir d'espaces de début ou de fin",
    );
  });

  it("fails validation with non-string input for string fields", () => {
    const input = {
      name: 123,
      lastName: {},
      username: [],
      dateOfBirth: new Date("1990-01-01"),
      email: 456,
      password: true,
      confirmPassword: false,
    };

    expect(() => registerSchema.parse(input)).toThrow(
      "Expected string, received number",
    );
  });
});
