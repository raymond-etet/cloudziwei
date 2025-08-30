import Link from "next/link";
import { SignInForm } from "../../../components/auth/signin-form";

export const runtime = "edge";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 返回首页链接 */}
        <div className="text-center mb-8">
          <Link href="/" className="btn btn-ghost btn-sm">
            ← 返回首页
          </Link>
        </div>

        {/* 登录表单 */}
        <SignInForm />

        {/* 底部信息 */}
        <div className="text-center mt-8 text-sm text-base-content/60">
          <p>登录即表示您同意我们的</p>
          <div className="flex justify-center gap-2 mt-1">
            <Link href="/terms" className="link link-primary">
              服务条款
            </Link>
            <span>和</span>
            <Link href="/privacy" className="link link-primary">
              隐私政策
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
