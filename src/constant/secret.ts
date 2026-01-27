if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET environment variable is not set");
}

export const secretKey = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
