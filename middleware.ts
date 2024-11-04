import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextRequest, NextResponse } from 'next/server';

export default NextAuth(authConfig).auth;

// Middleware function to log request headers and body
export async function middleware(req: NextRequest) {
  console.log("Request Headers:", JSON.stringify(req.headers));

  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const body = await req.json();
      console.log("Request Body:", JSON.stringify(body));
    } catch (error) {
      console.log("Failed to read request body:", error);
    }
  }

  return NextResponse.next();
}

// Matcher to apply the middleware selectively
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
