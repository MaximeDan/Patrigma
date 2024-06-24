import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";
// @ts-ignore
const handler = async (req, res) => {
  console.log("Request received:", req.method, req.url);
  // @ts-ignore
  const response = await NextAuth(req, res, authOptions);
  console.log("Response:", response);
  return response;
};

// TODO
// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
