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
import { registerSchema, type RegisterInput } from '@/lib/validations'

export default function RegisterPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { setError, setLoading } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  // 키보드 단축키 설정
  useHotkeys('d', () => setTheme(theme === 'dark' ? 'light' : 'dark'))
  useHotkeys('ctrl+k', () => document.querySelector<HTMLInputElement>('input[name="name"]')?.focus())

  const onSubmit = async (data: RegisterInput) => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('회원가입 요청 데이터:', data)
      
      const response = await fetch('https://purange-backend.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        }),
      })

      const result = await response.json()
      console.log('회원가입 응답:', result)

      if (!response.ok) {
        const errorMessage = result.message || '회원가입에 실패했습니다.'
        console.error('회원가입 실패:', errorMessage)
        setError(errorMessage)
        toast.error(errorMessage)
        return
      }

      toast.success('회원가입이 완료되었습니다!')
      router.push('/login')
    } catch (error) {
      console.error('회원가입 에러:', error)
      const errorMessage = error instanceof Error ? error.message : '서버와의 연결에 실패했습니다.'
      setError(errorMessage)
      toast.error(errorMessage)
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
            회원가입
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/80 mt-2"
          >
            PURANGE의 새로운 멤버가 되어주세요
          </motion.p>
        </motion.div>

        {/* 회원가입 폼 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">이름</label>
              <input
                {...register('name')}
                type="text"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="홍길동"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>
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
              <p className="mt-2 text-white/60 text-sm">
                영문과 숫자를 포함하여 최소 6자 이상이어야 합니다
              </p>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? '회원가입 중...' : '회원가입'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/80">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="text-[#f97316] hover:text-[#ea580c] font-medium">
                로그인
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
          <p>단축키: [D] 다크모드 전환 • [Ctrl+K] 이름 입력</p>
        </motion.div>

        {/* 푸터 */}
        <footer className="text-center mt-8 text-white/60 text-sm">
          <p>© 2024 PURANGE. All rights reserved.</p>
        </footer>
      </div>
    </motion.div>
  )
} 