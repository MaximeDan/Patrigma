import { User as UserModel } from "@prisma/client";
import { JWT } from "next-auth/jwt";

type UserId = number;

declare module "next-auth" {
  interface User extends UserModel {
    id: number;
    dateOfBirth: Date;
  }
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: User;
    id: UserId;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}
