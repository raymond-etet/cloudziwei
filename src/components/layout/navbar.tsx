"use client";

import Link from "next/link";
import { UserMenu } from "../auth/user-menu";

export function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/astrology/ziwei">紫微斗数</Link>
            </li>
            <li>
              <Link href="/calculator/u-contract">合约计算器</Link>
            </li>
            <li>
              <Link href="/about">关于我们</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          🔮 CloudZiwei
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/astrology/ziwei" className="btn btn-ghost">
              🔮 紫微斗数
            </Link>
          </li>
          <li>
            <Link href="/calculator/u-contract" className="btn btn-ghost">
              📊 合约计算器
            </Link>
          </li>
          <li>
            <Link href="/about" className="btn btn-ghost">
              ℹ️ 关于我们
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="navbar-end">
        <UserMenu />
      </div>
    </div>
  );
}
