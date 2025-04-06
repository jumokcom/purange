'use client'

import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  count?: number
}

export function Skeleton({ className = '', count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
        />
      ))}
    </>
  )
}

export function CardSkeleton() {
  return (
    <div className="w-full h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
  )
}

export function ProfileSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center space-x-4"
    >
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
      <div className="space-y-2">
        <div className="w-32 h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="w-24 h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      </div>
    </motion.div>
  )
} 