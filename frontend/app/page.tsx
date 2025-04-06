/**
 * 메인 페이지 컴포넌트
 * 로그인하지 않은 사용자를 위한 랜딩 페이지
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 flex flex-col items-center justify-center p-4">
      <div className="max-w-5xl w-full space-y-16">
        {/* 헤더 섹션 */}
        <div className="text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Welcome to PURANGE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-purple-100"
          >
            A colorful fullstack project by Go Jae Woo
          </motion.p>
        </div>

        {/* GitHub 버튼 */}
        <div className="flex justify-center">
          <motion.a
            href="https://github.com/jumokcom/purange"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <span className="text-xl">🐙</span>
            GitHub에서 보기
          </motion.a>
        </div>

        {/* 기술 스택 섹션 */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl font-semibold text-center text-white flex items-center justify-center gap-2"
          >
            <span>🛠</span> 기술 스택
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center text-white"
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <div className="font-medium">{tech.name}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 프로젝트 특징 섹션 */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-2xl font-semibold text-center text-white flex items-center justify-center gap-2"
          >
            <span>🎯</span> 프로젝트 특징
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-purple-100">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 시작하기 버튼 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/login"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors text-center"
          >
            로그인
          </Link>
          <Link
            href="/register"
            className="bg-purple-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-400 transition-colors text-center"
          >
            회원가입
          </Link>
        </motion.div>

        {/* 단축키 가이드 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-center text-purple-200 text-sm"
        >
          <p>단축키: [D] 다크모드 • [H] 홈 • [L] 로그인</p>
        </motion.div>
      </div>
    </div>
  );
}
