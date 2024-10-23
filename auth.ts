import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { HermesUser, User } from '@/app/lib/definitions';
import { apiFetchServer, getFullPath } from '@/app/lib/api';
 
async function getUser(username: string, password: string): Promise<User | undefined> {
  try {
    const data: FormData = new FormData()
    data.append('username', username);
    data.append('password', password);

    const responseTokens = await apiFetchServer({method: 'POST', path: 'auth/login', body: data, isForm: true});
    const tokens = await responseTokens.json();
    console.log('TOKENS RESPONSE', responseTokens, "TOKENS", tokens);

    const responseUser = await fetchUser(tokens);

    const user: User = {
      email: username,
      password: '',
      id: '1',
      name: 'John Doe',
      tokens: tokens,
      user_data: await responseUser.json()
    }
    
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchUser(tokens: any){
  var headers = new Headers({
    'Accept': 'application/json',
    'Content-type': 'application/json',
    'Authorization': tokens.token_type + " " + tokens.access_token
  });
    
  const response = await fetch(getFullPath('user/users/me'), 
    {
      method: "GET",
      headers: headers
    }
  );

  return response
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username, password);
          if (!user) return null;

          console.log('Valid credentials');
          return user;
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});