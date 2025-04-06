/**
 * 입력 필드 컴포넌트
 * 사용자 입력을 받는 기본 입력 필드
 */

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * 입력 필드 컴포넌트의 props 타입 정의
 * HTML input 요소의 모든 속성을 상속
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * 입력 필드 컴포넌트
 * - 기본 스타일이 적용된 입력 필드
 * - 포커스, 비활성화 등의 상태에 따른 스타일 변경
 * 
 * @param props - 컴포넌트 props
 * @param props.className - 추가 CSS 클래스
 * @param props.type - 입력 필드 타입 (text, password 등)
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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