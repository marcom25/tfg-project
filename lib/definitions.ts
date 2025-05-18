import { Roles } from "@/next-auth";
import { Decimal } from "@prisma/client/runtime/library";

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

export enum ContractStates {
  PENDING = 1,
  ON_GOING = 2,
  REJECTED = 3,
  FINISHED = 4,
  ACCEPTED = 5,
}

export enum DecisionStates {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export interface DashboardEarnings {
  total: number | Decimal;
  monthly: number | Decimal;
  pending: number | Decimal;
}