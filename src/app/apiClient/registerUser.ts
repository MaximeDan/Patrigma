export const registerUserApi = async (data: {
  email: string;
  password: string;
  username: string;
  name: string;
  lastName: string;
  dateOfBirth?: Date;
}) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-cache",
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message);
  }

  return response.json();
};
