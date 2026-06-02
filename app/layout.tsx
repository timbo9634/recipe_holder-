import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "我的菜谱",
  description: "个人自用菜谱管理 Web App",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
