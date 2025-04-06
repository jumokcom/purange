'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/lib/store'

export default function RegisterPage() {
  const router = useRouter()
  const { setUser, setToken } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!name?.trim()) {
      setError('이름을 입력해주세요.')
      return
    }

    if (!email?.trim()) {
      setError('이메일을 입력해주세요.')
      return
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      return
    }

    try {
      setLoading(true)
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10초 타임아웃

      const response = await fetch('https://purange-backend.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || '회원가입에 실패했습니다.')
      }

      setUser(data.user)
      setToken(data.access_token)

      toast.success('회원가입이 완료되었습니다!')
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setError('서버 응답이 너무 오래 걸립니다. 잠시 후 다시 시도해주세요.')
        } else {
          setError(error.message)
        }
      } else {
        setError('회원가입 중 오류가 발생했습니다.')
      }
      toast.error('회원가입에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#805ad5] to-[#b794f4] dark:from-[#4a2b8a] dark:to-[#6b46c1] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/logo.png"
            alt="Purange Logo"
            width={80}
            height={80}
            className="rounded-full mb-4"
            priority
          />
          <h1 className="text-3xl font-bold text-white">회원가입</h1>
          <p className="text-white/60 mt-2">PURANGE의 새로운 멤버가 되어주세요</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="이름"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="이메일"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호 (6자 이상)"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '회원가입 중...' : '회원가입'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/60">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-[#f97316] hover:text-[#ea580c]">
              로그인
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center text-white/60 text-sm">
          <p>단축키: [Ctrl]+K 이용 안내</p>
        </div>
      </motion.div>
    </div>
  )
} 