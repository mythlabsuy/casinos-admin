'use client'

import { signOut } from "next-auth/react";

const API_HOST = process.env.NEXT_PUBLIC_ADMIN_HOST ? process.env.NEXT_PUBLIC_ADMIN_HOST : ''

export const userSignOut = () => {
  signOut({ callbackUrl:"/login" });
};