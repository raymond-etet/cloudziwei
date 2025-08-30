import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const context = await getCloudflareContext({ async: true });
    const { R2_BUCKET } = context.env;

    if (!R2_BUCKET) {
      return NextResponse.json(
        { error: "R2 存储未配置" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "未找到文件" },
        { status: 400 }
      );
    }

    // 生成唯一文件名
    const timestamp = Date.now();
    const fileName = `uploads/${timestamp}-${file.name}`;

    // 上传到 R2
    const arrayBuffer = await file.arrayBuffer();
    await R2_BUCKET.put(fileName, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    return NextResponse.json({
      success: true,
      fileName,
      size: file.size,
      type: file.type,
      url: `/api/files/${fileName}`,
    });
  } catch (error) {
    console.error("文件上传失败:", error);
    return NextResponse.json(
      { error: "文件上传失败" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "文件上传 API",
    usage: "POST /api/upload with multipart/form-data containing 'file' field",
  });
}
