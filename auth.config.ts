import type { NextAuthConfig } from 'next-auth';
import { SessionUser } from './app/lib/definitions';
import { getActionsFromModuleAndPath, getModuleFromPath } from './app/lib/enums/authActionModule';
import { userHasPermission } from './app/lib/utils/permissions/userHasPermissions';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  trustHost: true,
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      // const session = auth;
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/welcome');
      const isForbidden = nextUrl.pathname == '/forbidden';

      // If not logged in, no need to check permissions, redirect to login
      if (!isLoggedIn) {
        return false;
        // return Response.redirect('/login');
      }
      // If it's going to the forbidden page, we allow it
      if (isForbidden) return true;

      //Protected pages logic, based on permission from token
      const module = getModuleFromPath(nextUrl.pathname);
      if (module) {
        const action = getActionsFromModuleAndPath(module, nextUrl.pathname);
        if (action) {
          let hasPermission: boolean;

          if (Array.isArray(action)) {
            const permissions = await Promise.all(
              action.map((singleAction) => userHasPermission(module, singleAction, auth))
            );
            hasPermission = permissions.some((permission) => permission === true);
          } else {
            hasPermission = await userHasPermission(module, action, auth);
          }
          if (!hasPermission) {
            // If no permission, redirect to the forbidden page
            return Response.redirect(new URL('/forbidden', nextUrl));
          }
        }
      }

      // Logic for dashboard and non-dashboard paths
      if (isOnDashboard) {
        return true;  // Allow access to dashboard if logged in and permissions are checked
      } else if (isLoggedIn) {
        // If logged in but not on dashboard, redirect to the dashboard (or other page)
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
    session({ session, token, }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user_data = token.user_data as SessionUser;
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

