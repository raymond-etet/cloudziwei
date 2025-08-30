import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "../components/providers/session-provider";
import { Navbar } from "../components/layout/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CloudZiwei - 紫微斗数排盘系统",
  description: "基于 Cloudflare 全家桶的专业紫微斗数排盘和合约计算器系统",
  keywords: "紫微斗数,排盘,合约计算器,Cloudflare,Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <div className="min-h-screen bg-base-200">
            <Navbar />
            <main>{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
