import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .max(100, '비밀번호가 너무 깁니다.'),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 최소 2자 이상이어야 합니다.')
    .max(100, '이름이 너무 깁니다.'),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .max(100, '비밀번호가 너무 깁니다.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      '비밀번호는 영문과 숫자를 모두 포함해야 합니다.'
    ),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema> 