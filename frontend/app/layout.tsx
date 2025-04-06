/**
 * 전역 레이아웃 컴포넌트
 * 모든 페이지에 공통으로 적용되는 레이아웃과 스타일을 정의
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

// Inter 폰트 설정
const inter = Inter({ subsets: ["latin"] });

// 메타데이터 설정
export const metadata: Metadata = {
  title: "Purange - 당신의 일정 관리 파트너",
  description: "효율적인 일정 관리를 위한 최적의 솔루션",
};

/**
 * 루트 레이아웃 컴포넌트
 * @param children - 자식 컴포넌트들
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
