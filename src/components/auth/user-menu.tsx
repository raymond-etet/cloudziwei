"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="skeleton w-10 h-10 rounded-full"></div>
    );
  }

  if (!session) {
    return (
      <div className="flex gap-2">
        <Link href="/auth/signin" className="btn btn-ghost">
          登录
        </Link>
        <Link href="/auth/signin" className="btn btn-primary">
          注册
        </Link>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "用户头像"}
              className="rounded-full"
            />
          ) : (
            <div className="bg-neutral text-neutral-content rounded-full w-full h-full flex items-center justify-center">
              {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
            </div>
          )}
        </div>
      </div>
      
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li className="menu-title">
          <span>{session.user?.name || session.user?.email}</span>
        </li>
        <li>
          <Link href="/profile" className="justify-between">
            个人资料
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link href="/history">历史记录</Link>
        </li>
        <li>
          <Link href="/settings">设置</Link>
        </li>
        <li>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-error"
          >
            退出登录
          </button>
        </li>
      </ul>
    </div>
  );
}
