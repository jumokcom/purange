import { useEffect, useCallback } from 'react'

type KeyHandler = () => void
type KeyMap = { [key: string]: KeyHandler }

export const useHotkeys = (keyMap: KeyMap) => {
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

      if (handler) {
        event.preventDefault()
        handler()
      }
    },
    [keyMap]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])
}

// 사용 예시:
// useHotkeys({
//   'd': () => toggleTheme(),
//   'ctrl+k': () => openCommandPalette(),
//   'escape': () => closeModal(),
// }) 