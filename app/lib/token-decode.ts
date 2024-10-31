// types.ts (optional) - Define the structure of your token payload
export interface TokenPayload {
  sub: string;
  exp: number;
  email: string;
  scopes: number[];
  premises: Premise[]; // Or use a more specific type based on your data
  // Add other fields in the token payload as needed
}

import { jwtDecode } from "jwt-decode";
import { Premise } from "./definitions";

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded || null; // Return premises if available
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
