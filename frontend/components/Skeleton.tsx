/**
 * 스켈레톤 UI 컴포넌트 모음
 * 데이터 로딩 중에 표시되는 로딩 상태 UI
 */

'use client'

import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

/**
 * 스켈레톤 컴포넌트의 props 타입 정의
 */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

/**
 * 기본 스켈레톤 컴포넌트
 * 로딩 중인 콘텐츠를 표현하는 애니메이션 효과가 있는 회색 박스
 * 
 * @param props - 컴포넌트 props
 * @param props.className - 추가 CSS 클래스
 */
export function Skeleton({
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

/**
 * 카드 스켈레톤 컴포넌트
 * 카드 형태의 콘텐츠가 로딩 중일 때 표시되는 UI
 */
export function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

/**
 * 프로필 스켈레톤 컴포넌트
 * 사용자 프로필이 로딩 중일 때 표시되는 UI
 */
export function ProfileSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
} 