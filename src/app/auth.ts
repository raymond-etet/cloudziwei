/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import { D1Adapter } from "@auth/d1-adapter";
import Resend from "next-auth/providers/resend";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

// Create a function that returns the auth configuration
const createAuthConfig = async () => {
  const context = await getCloudflareContext({ async: true });

  return NextAuth({
    providers: [
      Resend({
        apiKey: context.env.AUTH_RESEND_KEY || process.env.AUTH_RESEND_KEY,
        from: context.env.AUTH_EMAIL_FROM || process.env.AUTH_EMAIL_FROM,
      }),
    ],
    adapter: D1Adapter(context.env.DB),
    session: {
      strategy: "database",
    },
    callbacks: {
      session: async ({ session, user }) => {
        if (session?.user) {
          session.user.id = user.id;
        }
        return session;
      },
    },
  });
};

// Export a lazy-loaded auth instance
let authInstance: any = null;

export const getAuth = async () => {
  if (!authInstance) {
    authInstance = await createAuthConfig();
  }
  return authInstance;
};

// Export handlers that use the lazy-loaded instance
export const handlers = {
  GET: async (req: Request) => {
    const auth = await getAuth();
    return auth.handlers.GET(req);
  },
  POST: async (req: Request) => {
    const auth = await getAuth();
    return auth.handlers.POST(req);
  },
};

export const signIn = async (...args: any[]) => {
  const auth = await getAuth();
  return auth.signIn(...args);
};

export const signOut = async (...args: any[]) => {
  const auth = await getAuth();
  return auth.signOut(...args);
};

export const auth = async (...args: any[]) => {
  const authInstance = await getAuth();
  return authInstance.auth(...args);
};
