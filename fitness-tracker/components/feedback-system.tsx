"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function FeedbackSystem() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>트레이너 피드백</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="feedback">오늘의 피드백</Label>
            <Textarea id="feedback" placeholder="운동 수행에 대한 피드백을 작성하세요" className="min-h-[150px]" />
          </div>
          <Button className="w-full">피드백 전송</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>회원 노트</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes">운동 노트</Label>
            <Textarea
              id="notes"
              placeholder="오늘의 운동에 대한 느낌이나 특이사항을 기록하세요"
              className="min-h-[150px]"
            />
          </div>
          <Button className="w-full">노트 저장</Button>
        </CardContent>
      </Card>
    </div>
  )
}

