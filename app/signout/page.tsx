'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default async function index() {
  const router = useRouter();

  try {
    await signOut({ callbackUrl: '/login' });
  } catch (error) {
    console.log('error', error);
  }
  return <div> logout page</div>;
}
