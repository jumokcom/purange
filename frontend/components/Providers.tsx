/**
 * 전역 프로바이더 컴포넌트
 * 애플리케이션 전체에서 필요한 Context Provider들을 관리
 */

"use client"

import { ThemeProvider } from "next-themes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

/**
 * 프로바이더 컴포넌트의 props 타입 정의
 */
interface ProvidersProps {
  children: React.ReactNode
}

/**
 * 프로바이더 컴포넌트
 * - ThemeProvider: 다크모드/라이트모드 테마 관리
 * - QueryClientProvider: React Query 상태 관리
 * 
 * @param props - 컴포넌트 props
 * @param props.children - 자식 컴포넌트들
 */
export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
} 