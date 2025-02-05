"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: '1월', 운동시간: 30 },
  { name: '2월', 운동시간: 45 },
  { name: '3월', 운동시간: 60 },
  { name: '4월', 운동시간: 40 },
]

export function UserDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
        <TabsTrigger value="overview">개요</TabsTrigger>
        <TabsTrigger value="analytics">분석</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-medium">오늘의 운동 목표</h3>
            <div className="mt-4">
              <Progress value={75} className="h-2" />
              <p className="mt-2 text-sm text-muted-foreground">75% 달성</p>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium">이번 주 운동 시간</h3>
            <p className="mt-4 text-3xl font-bold">4시간 30분</p>
            <p className="text-sm text-muted-foreground">지난주 대비 +30분</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium">소모 칼로리</h3>
            <p className="mt-4 text-3xl font-bold">2,450kcal</p>
            <p className="text-sm text-muted-foreground">목표의 82%</p>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">월별 운동 시간</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="운동시간" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

