/**
 * 대시보드 페이지 컴포넌트
 * 로그인한 사용자의 메인 화면을 표시
 */

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useTheme } from 'next-themes'
import { useHotkeys } from '@/hooks/useHotkeys'
import { useAuthStore, useUIStore } from '@/lib/store'
import { CardSkeleton } from '@/components/Skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { TodoList } from '@/components/TodoList'

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

export default function DashboardPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { user, logout, token } = useAuthStore()
  const { debugMode, toggleDebugMode } = useUIStore()

  /**
   * 인증 상태 확인
   * 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('인증 실패');
        }
      } catch (error) {
        console.error('인증 확인 중 오류:', error);
        logout();
        router.push('/login');
      }
    };

    if (!user || !token) {
      router.push('/login');
    } else {
      checkAuth();
    }
  }, [user, token, router, logout]);

  // 키보드 단축키 설정
  useHotkeys('d', () => setTheme(theme === 'dark' ? 'light' : 'dark'))
  useHotkeys('h', () => router.push('/dashboard'))
  useHotkeys('x', () => {
    logout()
    toast.success('로그아웃되었습니다.')
    router.push('/login')
  })
  useHotkeys('`', () => toggleDebugMode())

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#805ad5] to-[#b794f4] dark:from-[#4a2b8a] dark:to-[#6b46c1] flex items-center justify-center p-4">
        <CardSkeleton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#805ad5] to-[#b794f4] dark:from-[#4a2b8a] dark:to-[#6b46c1] text-white">
      {/* 네비게이션 바 */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/20 backdrop-blur-sm sticky top-0 z-10"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Purange Logo"
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
            <span className="text-2xl font-bold">PURANGE</span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <span>환영합니다, {user.name}님!</span>
            <button
              onClick={() => {
                logout()
                toast.success('로그아웃되었습니다.')
                router.push('/login')
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold mb-8"
        >
          대시보드
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* 프로필 카드 */}
          <motion.div
            variants={item}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-2xl">👤</span> 프로필 정보
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/80">
                <span className="font-medium">이름:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="font-medium">이메일:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="font-medium">계정 생성일:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>

          {/* 빠른 링크 카드 */}
          <motion.div
            variants={item}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-2xl">🔗</span> 빠른 링크
            </h2>
            <div className="flex flex-col gap-4">
              <Link
                href="/dashboard"
                className="bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-3 rounded-lg transition-colors text-center flex items-center justify-center gap-2"
              >
                <span className="text-xl">🏠</span> 대시보드
              </Link>
              <button
                onClick={() => toggleDebugMode()}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">⚙️</span> 디버그 모드 {debugMode ? 'OFF' : 'ON'}
              </button>
              <button
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">📝</span> 활동 내역
              </button>
            </div>
          </motion.div>

          {/* 통계 카드 */}
          <motion.div
            variants={item}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span> 통계
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-white/60">총 게시물</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-white/60">총 댓글</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-white/60">받은 좋아요</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-white/60">방문수</div>
              </div>
            </div>
          </motion.div>

          {/* 최근 활동 카드 */}
          <motion.div
            variants={item}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-2xl">🕒</span> 최근 활동
            </h2>
            <div className="space-y-4">
              <div className="text-white/60 text-center">아직 활동 내역이 없습니다.</div>
            </div>
          </motion.div>
        </motion.div>

        {/* 단축키 가이드 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center text-white/60 text-sm"
        >
          <p>단축키: [D] 다크모드 전환 • [H] 홈으로 이동 • [X] 로그아웃 • [`] 디버그 모드</p>
        </motion.div>

        {/* 디버그 정보 */}
        {debugMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 p-4 bg-gray-800 dark:bg-gray-900 text-white rounded-lg shadow-lg"
          >
            <pre className="overflow-auto text-xs">
              {JSON.stringify({ user, theme, debugMode }, null, 2)}
            </pre>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 캘린더 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>일정 캘린더</CardTitle>
              <CardDescription>
                이번 달 일정을 한눈에 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar />
            </CardContent>
          </Card>

          {/* 할 일 목록 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>할 일 목록</CardTitle>
              <CardDescription>
                오늘의 할 일을 관리하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TodoList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 