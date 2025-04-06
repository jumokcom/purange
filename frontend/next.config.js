/**
 * Next.js 설정 파일
 * 이미지 도메인, PWA 설정 등을 관리
 */

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * 이미지 도메인 설정
   * 외부 이미지 소스를 허용할 도메인 목록
   */
  images: {
    domains: [
      'localhost',
      'purange-backend.onrender.com'
    ],
  },
  
  /**
   * 실험적 기능 설정
   */
  experimental: {
    serverActions: true,
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    }
    return config
  },

  /**
   * TypeScript 설정
   * 타입 체크 관련 설정
   */
  typescript: {
    ignoreBuildErrors: true
  },

  /**
   * ESLint 설정
   * 린트 관련 설정
   */
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = withPWA(nextConfig) 