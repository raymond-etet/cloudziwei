import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const context = await getCloudflareContext({ async: true });
    const { R2_BUCKET } = context.env;

    if (!R2_BUCKET) {
      return NextResponse.json({ error: "R2 存储未配置" }, { status: 500 });
    }

    const filePath = resolvedParams.path.join("/");

    if (!filePath) {
      return NextResponse.json({ error: "文件路径无效" }, { status: 400 });
    }

    // 从 R2 获取文件
    const object = await R2_BUCKET.get(filePath);

    if (!object) {
      return NextResponse.json({ error: "文件未找到" }, { status: 404 });
    }

    // 返回文件内容
    const headers = new Headers();

    if (object.httpMetadata?.contentType) {
      headers.set("Content-Type", object.httpMetadata.contentType);
    }

    headers.set("Content-Length", object.size.toString());
    headers.set("Cache-Control", "public, max-age=31536000"); // 缓存一年

    return new NextResponse(object.body, {
      headers,
    });
  } catch (error) {
    console.error("文件下载失败:", error);
    return NextResponse.json({ error: "文件下载失败" }, { status: 500 });
  }
}
