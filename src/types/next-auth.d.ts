import { User as UserModel } from "@prisma/client";

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
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    id: UserId;
    jwt: string;
  }
}
