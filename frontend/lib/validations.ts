/**
 * 유효성 검사 스키마 정의
 * Zod를 사용한 폼 데이터 검증 스키마
 */

import { z } from 'zod'

/**
 * 로그인 폼 유효성 검사 스키마
 * 이메일과 비밀번호 필드 검증
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
})

/**
 * 회원가입 폼 유효성 검사 스키마
 * 이름, 이메일, 비밀번호 필드 검증
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다.')
    .max(50, '이름은 최대 50자까지 가능합니다.'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema> 