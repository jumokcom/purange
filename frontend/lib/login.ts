/**
 * 로그인 관련 유틸리티 함수
 * 인증 및 사용자 관리 기능
 */

import { useAuthStore } from './store'

/**
 * 로그인 요청 인터페이스
 */
interface LoginRequest {
  email: string
  password: string
}

/**
 * 로그인 응답 인터페이스
 */
interface LoginResponse {
  user: {
    id: number
    email: string
    name: string
  }
  access_token: string
}

/**
 * 로그인 함수
 * @param credentials - 로그인 정보 (이메일, 비밀번호)
 * @returns 로그인 응답 데이터
 * @throws Error 로그인 실패 시
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('로그인에 실패했습니다.')
  }

  return response.json()
}

/**
 * 로그아웃 함수
 * 로컬 스토리지의 인증 정보를 제거
 */
export function logout() {
  const { logout } = useAuthStore.getState()
  logout()
}
  