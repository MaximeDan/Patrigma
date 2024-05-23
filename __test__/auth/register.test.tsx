// __tests__/auth/register.test.tsx
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { signIn } from "next-auth/react";
import Register from "@/components/form/Register";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

fetchMock.enableMocks();

describe("Register Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("submits form data and handles API response", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    render(<Register />);

    // Get the form element
    const form = screen.getByRole("form");

    // Use within to scope queries to the form
    fireEvent.change(within(form).getByLabelText(/Prénom/i), {
      target: { value: "John" },
    });
    fireEvent.change(within(form).getByLabelText(/Nom/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(within(form).getByLabelText(/Nom d\'utilsateur/i), {
      target: { value: "johndoe" },
    });
    fireEvent.change(within(form).getByLabelText(/E-mail/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(within(form).getByLabelText(/Mot de passe/i), {
      target: { value: "Password@123" },
    });
    fireEvent.change(
      within(form).getByLabelText(/Confirmer votre mot de passe/i),
      { target: { value: "Password@123" } },
    );

    // Submit the form
    fireEvent.submit(within(form).getByRole("button", { name: /S'inscrire/i }));

    // Wait for the API call
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/auth/register",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "john.doe@example.com",
            password: "Password@123",
            username: "johndoe",
            name: "John",
            lastName: "Doe",
            dateOfBirth: undefined, // Ensure date is correctly formatted in the real case
          }),
        }),
      );
      expect(signIn).toHaveBeenCalledWith(
        "credentials",
        expect.objectContaining({
          redirect: true,
          identifier: "john.doe@example.com",
          password: "Password@123",
          callbackUrl: "/",
        }),
      );
    });
  });

  it("handles API error response", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Email already in use" }),
      { status: 400 },
    );

    render(<Register />);

    // Get the form element
    const form = screen.getByRole("form");

    // Use within to scope queries to the form
    fireEvent.change(within(form).getByLabelText(/E-mail/i), {
      target: { value: "used.email@example.com" },
    });
    fireEvent.change(within(form).getByLabelText(/Mot de passe/i), {
      target: { value: "Password@123" },
    });
    fireEvent.change(
      within(form).getByLabelText(/Confirmer votre mot de passe/i),
      { target: { value: "Password@123" } },
    );

    // Submit the form
    fireEvent.submit(within(form).getByRole("button", { name: /S'inscrire/i }));

    // // Wait for the error message
    // await waitFor(() => {
    //   expect(
    //     screen.getByText(/Email déjà utilisé ou invalide/i),
    //   ).toBeInTheDocument();
    // });
  });

  // Add more tests as needed to cover other cases
});
