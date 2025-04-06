import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  token: string | null
  error: string | null
  loading: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

interface UIState {
  debugMode: boolean
  toggleDebugMode: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      error: null,
      loading: false,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ loading }),
      logout: () => set({ user: null, token: null, error: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export const useUIStore = create<UIState>((set) => ({
  debugMode: false,
  toggleDebugMode: () => set((state) => ({ debugMode: !state.debugMode })),
})) 