'use client';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default async function index() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   signOut({ callbackUrl: '/login' });
  // });
  try {
    await signOut({ callbackUrl: '/login' });
  } catch (error) {
    var a = error;
    console.log('error', error);
  }
  return <div> logout page</div>;
}
