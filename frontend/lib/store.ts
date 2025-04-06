/**
 * 전역 상태 관리 스토어
 * Zustand를 사용한 상태 관리 로직
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * 사용자 정보 인터페이스
 */
interface User {
  id: number
  email: string
  name: string
}

/**
 * 인증 상태 인터페이스
 */
interface AuthState {
  user: User | null
  token: string | null
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

/**
 * UI 상태 인터페이스
 */
interface UIState {
  debugMode: boolean
  toggleDebugMode: () => void
}

/**
 * 인증 상태 관리 스토어
 * 사용자 정보와 토큰을 로컬 스토리지에 유지
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

/**
 * UI 상태 관리 스토어
 * 디버그 모드 상태 관리
 */
export const useUIStore = create<UIState>((set) => ({
  debugMode: false,
  toggleDebugMode: () => set((state) => ({ debugMode: !state.debugMode })),
})) 