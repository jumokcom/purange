/**
 * 유틸리티 함수 모음
 * 프로젝트 전반에서 사용되는 공통 유틸리티 함수들
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * CSS 클래스 이름을 병합하는 유틸리티 함수
 * clsx와 tailwind-merge를 조합하여 클래스 충돌 없이 병합
 * 
 * @param inputs - 병합할 클래스 이름들 (문자열, 객체, 배열 등)
 * @returns 병합된 클래스 이름 문자열
 * 
 * @example
 * cn("px-2 py-1", { "bg-blue-500": isActive }, ["text-white"])
 * // => "px-2 py-1 bg-blue-500 text-white"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 