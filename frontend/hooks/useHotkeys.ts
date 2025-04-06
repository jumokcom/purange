import { useEffect, useCallback } from 'react'

type KeyHandler = (e: KeyboardEvent) => void
type KeyMap = Record<string, KeyHandler>

export function useHotkeys(keyMap: KeyMap) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // 입력 필드에서는 단축키를 비활성화
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      const key = event.key.toLowerCase()
      const handler = keyMap[key]

      if (handler && !event.ctrlKey && !event.altKey && !event.metaKey) {
        event.preventDefault()
        handler(event)
      }

      // Ctrl/Cmd + key 조합
      if (event.ctrlKey || event.metaKey) {
        const ctrlKey = `ctrl+${key}`
        const handler = keyMap[ctrlKey]
        if (handler) {
          event.preventDefault()
          handler(event)
        }
      }
    },
    [keyMap]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])
}

// 사용 예시:
// useHotkeys({
//   'd': () => toggleTheme(),
//   'ctrl+k': () => openCommandPalette(),
//   'escape': () => closeModal(),
// }) 