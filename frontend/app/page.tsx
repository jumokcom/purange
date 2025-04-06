/**
 * 메인 페이지 컴포넌트
 * 로그인하지 않은 사용자를 위한 랜딩 페이지
 */

'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useHotkeys } from '@/hooks/useHotkeys'
import { useAuthStore, useUIStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const techStack = [
  { name: 'Next.js', icon: '⚛️' },
  { name: 'NestJS', icon: '🦁' },
  { name: 'Prisma', icon: '💎' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Zustand', icon: '🐻' },
  { name: 'Framer Motion', icon: '🎭' },
  { name: 'React Hook Form', icon: '📝' },
]

const features = [
  {
    icon: '🔐',
    title: '보안',
    description: 'JWT 기반 인증 시스템으로 안전한 로그인 구현'
  },
  {
    icon: '💾',
    title: '데이터베이스',
    description: 'Prisma를 활용한 효율적인 데이터 관리'
  },
  {
    icon: '🎨',
    title: 'UI/UX',
    description: 'Tailwind CSS로 구현한 모던한 디자인'
  },
  {
    icon: '🌙',
    title: '다크모드',
    description: '시스템 설정 기반 자동 테마 지원'
  },
  {
    icon: '⌨️',
    title: '키보드 단축키',
    description: '키보드 단축키로 빠른 기능 접근'
  },
  {
    icon: '📱',
    title: 'PWA',
    description: '앱처럼 설치하고 사용 가능'
  },
]

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuthStore()
  const { debugMode, toggleDebugMode } = useUIStore()
  const router = useRouter()

  // 키보드 단축키 설정
  useHotkeys('d', () => toggleDebugMode())
  useHotkeys('h', () => router.push('/'))
  useHotkeys('l', () => router.push('/login'))

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
      {/* 헤더 섹션 */}
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <h1 className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Purange
        </h1>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative flex place-items-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">
            당신의 일정 관리를 더 스마트하게
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Purange와 함께 효율적인 일정 관리를 시작하세요
          </p>
          
          {/* 시작하기 버튼 */}
          <Link href="/login">
            <Button size="lg" className="gap-2">
              시작하기
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
