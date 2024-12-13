import type { NextAuthConfig } from 'next-auth';
import { SessionUser } from './app/lib/definitions';
import { getActionFromModuleAndPath, getModuleFromPath, ModuleEnum } from './app/lib/enums/authActionModule';
import { userHasPermission } from './app/lib/utils/permissions/userHasPermissions';
import { se } from 'date-fns/locale';

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
        const action = getActionFromModuleAndPath(module, nextUrl.pathname);
        if (action) {
          // Check if the user has permission for this module/action
          const hasPermission = await userHasPermission(module, action, auth);  // Assuming this is an async function
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
        return Response.redirect(new URL('/welcome/premises', nextUrl));
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


function getModule(path: string) {

}
//
