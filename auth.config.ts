import type { NextAuthConfig } from 'next-auth';
import { SystemUser } from './app/lib/definitions';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/welcome');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/welcome', nextUrl));
      }
      return false;
    },
    jwt({ token, user }) {
      if (user && user.tokens) {
        token.accessToken = user.tokens.token_type + " " + user.tokens.access_token; // Set access token in JWT
        token.refreshToken = user.tokens.token_type + " " + user.tokens.refresh_token; // Set access token in JWT
        token.user_data = user.user_data;
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user_data = token.user_data as SystemUser;
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;