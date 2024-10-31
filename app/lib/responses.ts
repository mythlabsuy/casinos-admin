import { Premise, Role } from "./definitions";

export type PremisesResponse = {
  premises: Premise[];
}

export type LoginResponse = {
  user: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  premises: Premise[]; //TODO ver porque esto llega y llega null en la respuesta del login
}

export type UserResponse = {
  id: number;
  email: string;
  username: string;
  premises: Premise[];
  role: Role;
}