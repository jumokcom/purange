'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/lib/store'

export default function LoginPage() {
  const router = useRouter()
  const { setUser, setToken } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      setLoading(true)
      
      const response = await fetch('https://purange-backend.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || '로그인에 실패했습니다.')
      }

      setToken(data.access_token)
      setUser(data.user)
      toast.success('로그인되었습니다!')
      router.push('/dashboard')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '로그인에 실패했습니다.')
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
          <h1 className="text-3xl font-bold text-white">로그인</h1>
          <p className="text-white/60 mt-2">PURANGE의 새로운 멤버가 되어주세요</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
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
              placeholder="비밀번호"
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/60">
            아직 계정이 없으신가요?{' '}
            <Link href="/register" className="text-[#f97316] hover:text-[#ea580c]">
              회원가입
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
