import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

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