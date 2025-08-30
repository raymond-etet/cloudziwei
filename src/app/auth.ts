import NextAuth from "next-auth";
import { NextAuthResult } from "next-auth";
import { D1Adapter } from "@auth/d1-adapter";
import Resend from "next-auth/providers/resend";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

const authResult = async (): Promise<NextAuthResult> => {
  const context = await getCloudflareContext({ async: true });

  return NextAuth({
    providers: [
      Resend({
        apiKey: context.env.AUTH_RESEND_KEY,
        from: context.env.AUTH_EMAIL_FROM,
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

export const { handlers, signIn, signOut, auth } = await authResult();
