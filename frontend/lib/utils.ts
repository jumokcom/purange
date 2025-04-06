/**
 * 유틸리티 함수 모음
 * Tailwind CSS와 함께 사용되는 클래스 이름 병합 유틸리티
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 여러 클래스 이름을 병합하는 유틸리티 함수
 * @param inputs - 병합할 클래스 이름들
 * @returns 병합된 클래스 이름 문자열
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 