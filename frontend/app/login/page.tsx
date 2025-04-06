'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useTheme } from 'next-themes'
import { useHotkeys } from '@/hooks/useHotkeys'
import { useAuthStore } from '@/lib/store'
import { loginSchema, type LoginInput } from '@/lib/validations'

export default function LoginPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { setUser, setToken, setError, setLoading } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  // 키보드 단축키 설정
  useHotkeys('d', () => setTheme(theme === 'dark' ? 'light' : 'dark'))
  useHotkeys('ctrl+k', () => document.querySelector<HTMLInputElement>('input[name="email"]')?.focus())

  const onSubmit = async (data: LoginInput) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://purange-backend.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || '로그인에 실패했습니다.')
      }

      setUser({
        id: String(result.user.id),
        email: result.user.email,
        name: result.user.name,
      })
      setToken(result.token)
      
      toast.success('로그인되었습니다.')
      router.push('/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : '로그인에 실패했습니다.')
      toast.error('로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-gradient-to-b from-[#805ad5] to-[#b794f4] dark:from-[#4a2b8a] dark:to-[#6b46c1] flex flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        {/* 로고 섹션 */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-center mb-8"
        >
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Purange Logo"
              width={100}
              height={100}
              className="mx-auto rounded-full hover:scale-105 transition-transform"
              priority
            />
          </Link>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-white mt-4"
          >
            로그인
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/80 mt-2"
          >
            PURANGE에 오신 것을 환영합니다
          </motion.p>
        </motion.div>

        {/* 로그인 폼 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">이메일</label>
              <input
                {...register('email')}
                type="email"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="your@email.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">비밀번호</label>
              <input
                {...register('password')}
                type="password"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="••••••••"
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="mt-1 text-red-400 text-sm">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/80">
              계정이 없으신가요?{' '}
              <Link href="/register" className="text-[#f97316] hover:text-[#ea580c] font-medium">
                회원가입
              </Link>
            </p>
          </div>
        </motion.div>

        {/* 단축키 가이드 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-white/60 text-sm"
        >
          <p>단축키: [D] 다크모드 전환 • [Ctrl+K] 이메일 입력</p>
        </motion.div>

        {/* 푸터 */}
        <footer className="text-center mt-8 text-white/60 text-sm">
          <p>© 2024 PURANGE. All rights reserved.</p>
        </footer>
      </div>
    </motion.div>
  )
}
