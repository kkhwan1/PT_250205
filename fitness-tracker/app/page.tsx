import { UserDashboard } from "@/components/user-dashboard"
import { WorkoutPlanner } from "@/components/workout-planner"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex-1">
      <div className="container mx-auto py-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">안녕하세요, 홍길동님!</h1>
            <p className="text-muted-foreground mt-2">오늘도 건강한 하루 보내세요.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              운동 시작하기
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <UserDashboard />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <WorkoutPlanner />
        </div>
      </div>
    </main>
  )
} 