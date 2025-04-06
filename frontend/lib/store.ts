import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number
  name: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setError: (error: string | null) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, token: null, error: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

interface UIState {
  isSidebarOpen: boolean
  isDebugMode: boolean
  toggleSidebar: () => void
  toggleDebugMode: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isDebugMode: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleDebugMode: () => set((state) => ({ isDebugMode: !state.isDebugMode })),
})) 