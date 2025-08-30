"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await signIn("resend", {
        email,
        redirect: false,
      });

      if (result?.error) {
        setMessage("登录失败，请检查邮箱地址");
      } else {
        setMessage("验证邮件已发送，请检查您的邮箱");
      }
    } catch (error) {
      setMessage("登录过程中发生错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center text-2xl mb-6">登录账户</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">邮箱地址</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入您的邮箱"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "发送中..." : "发送验证邮件"}
            </button>
          </div>
        </form>

        {message && (
          <div className={`alert ${message.includes("失败") || message.includes("错误") ? "alert-error" : "alert-success"} mt-4`}>
            <span>{message}</span>
          </div>
        )}

        <div className="divider">或</div>

        <div className="text-center text-sm text-base-content/70">
          <p>首次使用？输入邮箱即可自动注册</p>
          <p className="mt-2">我们会向您的邮箱发送验证链接</p>
        </div>
      </div>
    </div>
  );
}
