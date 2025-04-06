'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useHotkeys } from '@/hooks/useHotkeys'
import { useAuthStore, useUIStore } from '@/lib/store'

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
  const { isDebugMode, toggleDebugMode } = useUIStore()

  // 키보드 단축키 설정
  useHotkeys({
    'd': () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    'l': () => window.location.href = '/login',
    'r': () => window.location.href = '/register',
    '`': () => toggleDebugMode(),
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#805ad5] to-[#b794f4] dark:from-[#4a2b8a] dark:to-[#6b46c1] text-white">
      {/* 네비게이션 바 */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/20 backdrop-blur-sm sticky top-0 z-10"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">PURANGE</Link>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/jaewoogwak/purange"
              target="_blank"
              className="hover:text-[#f97316] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            {user ? (
              <>
                <span>환영합니다, {user.name}님!</span>
                <Link
                  href="/dashboard"
                  className="bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded-lg transition-colors"
                >
                  대시보드
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded-lg transition-colors"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </motion.nav>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.section
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6 mb-16"
        >
          <Image
            src="/logo.png"
            alt="Purange Logo"
            width={150}
            height={150}
            className="mx-auto rounded-full"
            priority
          />
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-extrabold text-white drop-shadow"
          >
            Welcome to <span className="text-[#f97316]">PURANGE</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white text-lg italic"
          >
            A colorful fullstack project by Go Jae Woo
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-center gap-4"
          >
            <Link
              href="https://github.com/jaewoogwak/purange"
              target="_blank"
              className="bg-[#24292F] hover:bg-[#1a1e23] text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub에서 보기
            </Link>
          </motion.div>
        </motion.section>

        {/* 기술 스택 섹션 */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center space-y-8 mb-16"
        >
          <motion.h2 variants={item} className="text-3xl font-semibold">
            🛠 기술 스택
          </motion.h2>
          <motion.div variants={item} className="flex justify-center gap-4 flex-wrap">
            {techStack.map((tech) => (
              <motion.span
                key={tech.name}
                className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{tech.icon}</span>
                {tech.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        {/* 프로젝트 특징 섹션 */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center space-y-8"
        >
          <motion.h2 variants={item} className="text-3xl font-semibold">
            📌 프로젝트 특징
          </motion.h2>
          <motion.div
            variants={item}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-xl font-semibold mb-3 flex items-center justify-center gap-2">
                  <span>{feature.icon}</span>
                  {feature.title}
                </h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* 단축키 가이드 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center text-white/60 text-sm"
        >
          <p>단축키: [D] 다크모드 전환 • [L] 로그인 • [R] 회원가입 • [`] 디버그 모드</p>
        </motion.div>

        {/* 디버그 정보 */}
        {isDebugMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-black/20 rounded-lg text-sm font-mono"
          >
            <pre className="overflow-auto">
              {JSON.stringify({ user, theme, isDebugMode }, null, 2)}
            </pre>
          </motion.div>
        )}
      </div>
    </main>
  )
}
