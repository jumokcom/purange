/**
 * 전역 프로바이더 컴포넌트
 * 애플리케이션 전체에 필요한 컨텍스트 프로바이더들을 관리
 */

'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

interface ProvidersProps {
  children: React.ReactNode
}

/**
 * 프로바이더 래퍼 컴포넌트
 * @param children - 자식 컴포넌트들
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-center" />
      {children}
    </ThemeProvider>
  )
} 