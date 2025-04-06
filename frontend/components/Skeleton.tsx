/**
 * 스켈레톤 UI 컴포넌트
 * 데이터 로딩 중에 표시되는 로딩 상태 UI
 */

'use client'

import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

/**
 * 기본 스켈레톤 컴포넌트 속성
 */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  count?: number
}

/**
 * 기본 스켈레톤 컴포넌트
 * @param className - 추가 스타일 클래스
 * @param props - HTML div 요소 속성들
 */
export function Skeleton({
  className = '',
  count = 1,
  ...props
}: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn("animate-pulse rounded-md bg-muted", className)}
          {...props}
        />
      ))}
    </>
  )
}

/**
 * 카드 스켈레톤 컴포넌트
 * 카드 형태의 콘텐츠가 로딩 중일 때 표시
 */
export function CardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[200px]" />
      <Skeleton className="h-32" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

/**
 * 프로필 스켈레톤 컴포넌트
 * 사용자 프로필이 로딩 중일 때 표시
 */
export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-16 w-16 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
} 