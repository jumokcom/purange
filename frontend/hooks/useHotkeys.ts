'use client'

import { useEffect } from 'react'

type KeyHandler = (e: KeyboardEvent) => void

export function useHotkeys(key: string, handler: KeyHandler) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        handler(e)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [key, handler])
}

// 사용 예시:
// useHotkeys('d', () => toggleTheme())
// useHotkeys('ctrl+k', () => openCommandPalette())
// useHotkeys('escape', () => closeModal()) 