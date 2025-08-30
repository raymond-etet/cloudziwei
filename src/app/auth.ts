/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
// import { D1Adapter } from "@auth/d1-adapter";
// import Resend from "next-auth/providers/resend";
import Credentials from "next-auth/providers/credentials";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

// 密码验证逻辑已内联到认证函数中

// Create a function that returns the auth configuration
const createAuthConfig = async () => {
  // const context = await getCloudflareContext({ async: true });

  return NextAuth({
    providers: [
      // 邮箱登录（暂时禁用，需要域名验证）
      // Resend({
      //   apiKey: context.env.AUTH_RESEND_KEY || process.env.AUTH_RESEND_KEY,
      //   from: context.env.AUTH_EMAIL_FROM || process.env.AUTH_EMAIL_FROM,
      // }),
      // 用户名密码登录
      Credentials({
        name: "密码登录",
        credentials: {
          email: {
            label: "邮箱",
            type: "email",
            placeholder: "your@email.com",
          },
          password: {
            label: "密码",
            type: "password",
            placeholder: "请输入密码",
          },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          try {
            const context = await getCloudflareContext({ async: true });
            const { DB } = context.env;

            if (!DB) {
              return null;
            }

            // 查找用户
            const user = await DB.prepare(
              "SELECT id, name, email, password FROM users WHERE email = ?"
            )
              .bind(credentials.email)
              .first();

            if (!user) {
              return null;
            }

            // 验证密码 - 使用 Edge Runtime 兼容的方法
            const encoder = new TextEncoder();
            const data = encoder.encode(
              credentials.password + "cloudziwei-salt-2024"
            );
            const hashBuffer = await crypto.subtle.digest("SHA-256", data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashedInput = hashArray
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("");
            const isValid = hashedInput === user.password;

            if (!isValid) {
              return null;
            }

            return {
              id: user.id as string,
              name: user.name as string,
              email: user.email as string,
            };
          } catch (error) {
            console.error("登录验证失败:", error);
            return null;
          }
        },
      }),
    ],
    // 暂时不使用数据库适配器，改用 JWT
    // adapter: D1Adapter(context.env.DB),
    session: {
      strategy: "jwt",
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
