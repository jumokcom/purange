/**
 * 입력 필드 컴포넌트
 * 사용자 입력을 받는 기본 입력 필드
 */

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * 입력 필드 속성 인터페이스
 * HTML 입력 요소의 모든 속성을 상속
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * 입력 필드 컴포넌트
 * @param className - 추가 스타일 클래스
 * @param type - 입력 필드 타입
 * @param props - 기타 HTML 입력 요소 속성들
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input } 