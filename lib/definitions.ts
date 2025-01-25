import { Roles } from "@/next-auth";

export interface UserDB {
  id: string;
  email: string;
  name: string | null;
  password: string;
  role: Roles.CLIENT | Roles.PROVIDER;
}

export enum RolesClient {
  CLIENT = "CLIENT",
  PROVIDER = "PROVIDER",
}

export interface Error {
  error: boolean;
  message: string;
}
