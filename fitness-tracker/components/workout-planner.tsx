"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const workoutPlans = [
  {
    name: "상체 운동",
    exercises: ["벤치프레스", "숄더프레스", "푸시업"],
    duration: "45분",
  },
  {
    name: "하체 운동",
    exercises: ["스쿼트", "데드리프트", "런지"],
    duration: "50분",
  },
  {
    name: "전신 운동",
    exercises: ["버피", "마운틴 클라이머", "점프로프"],
    duration: "40분",
  },
]

export function WorkoutPlanner() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">운동 계획</h2>
      <div className="space-y-4">
        {workoutPlans.map((plan) => (
          <div
            key={plan.name}
            className="p-4 border rounded-lg hover:bg-accent transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{plan.name}</h3>
              <span className="text-sm text-muted-foreground">{plan.duration}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {plan.exercises.join(", ")}
            </p>
            <Button className="mt-2 w-full">시작하기</Button>
          </div>
        ))}
      </div>
    </Card>
  )
}

