/**
 * 할 일 목록 컴포넌트
 * 사용자의 할 일 항목들을 카드 형태로 표시
 */

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

/**
 * 할 일 목록 컴포넌트
 * - 할 일 항목들을 카드 형태로 표시
 * - 할 일이 없을 경우 안내 메시지 표시
 */
export function TodoList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>할 일 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 추후 할 일 목록이 여기에 들어갈 예정 */}
          <p className="text-sm text-muted-foreground">아직 할 일이 없습니다.</p>
        </div>
      </CardContent>
    </Card>
  )
} 