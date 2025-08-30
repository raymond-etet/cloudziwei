import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { z } from "zod";

export const runtime = "edge";

// Edge Runtime 兼容的密码加密函数
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "cloudziwei-salt-2024"); // 添加盐值
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// 验证密码函数已移至 auth.ts 中内联使用

// 注册数据验证
const registerSchema = z.object({
  name: z.string().min(2, "姓名至少2个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  password: z.string().min(6, "密码至少6个字符"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证输入数据
    const validatedData = registerSchema.parse(body);
    const { name, email, password } = validatedData;

    // 获取数据库连接
    const context = await getCloudflareContext({ async: true });
    const { DB } = context.env;

    if (!DB) {
      return NextResponse.json({ error: "数据库连接失败" }, { status: 500 });
    }

    // 检查邮箱是否已存在
    const existingUser = await DB.prepare(
      "SELECT id FROM users WHERE email = ?"
    )
      .bind(email)
      .first();

    if (existingUser) {
      return NextResponse.json({ error: "该邮箱已被注册" }, { status: 400 });
    }

    // 加密密码
    const hashedPassword = await hashPassword(password);

    // 创建用户
    const userId = crypto.randomUUID();
    await DB.prepare(
      "INSERT INTO users (id, name, email, password, emailVerified, createdAt) VALUES (?, ?, ?, ?, ?, ?)"
    )
      .bind(
        userId,
        name,
        email,
        hashedPassword,
        Date.now(), // 直接设为已验证
        Date.now()
      )
      .run();

    return NextResponse.json(
      {
        message: "注册成功",
        user: { id: userId, name, email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("注册失败:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "注册过程中发生错误" }, { status: 500 });
  }
}
