'use client';

import { useState } from 'react';
import { Calendar, List, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorkoutPlan } from '@/types/workout';
import { CreateWorkoutPlanDialog } from '@/components/workouts/create-workout-plan-dialog';
import { toast } from 'sonner';

// 임시 데이터
const mockWorkoutPlans: WorkoutPlan[] = [
  {
    id: '1',
    title: '상체 근력 운동',
    description: '가슴, 어깨, 삼두를 타겟으로 하는 운동',
    exercises: [],
    schedule: {
      id: '1',
      startDate: new Date(),
      frequency: 'weekly',
      daysOfWeek: [1, 3, 5],
    },
    difficulty: 'intermediate',
    targetMuscles: ['chest', 'shoulders', 'triceps'],
    duration: 60,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1',
  },
  // 추가 목업 데이터...
];

export default function WorkoutPlansPage() {
  const [view, setView] = useState<'grid' | 'list' | 'calendar'>('grid');
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>(mockWorkoutPlans);

  const handleCreateWorkoutPlan = async (data: any) => {
    try {
      // TODO: API 연동
      const newPlan: WorkoutPlan = {
        id: (workoutPlans.length + 1).toString(),
        ...data,
        exercises: [],
        schedule: {
          id: (workoutPlans.length + 1).toString(),
          startDate: new Date(),
          frequency: 'weekly',
          daysOfWeek: [1, 3, 5],
        },
        targetMuscles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '1',
      };

      setWorkoutPlans([...workoutPlans, newPlan]);
      toast.success('운동 계획이 생성되었습니다.');
    } catch (error) {
      toast.error('운동 계획 생성에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">운동 계획</h1>
        <CreateWorkoutPlanDialog onSubmit={handleCreateWorkoutPlan} />
      </div>

      <div className="mb-6">
        <Tabs defaultValue={view} onValueChange={(v) => setView(v as typeof view)}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">
                <Grid className="mr-2 h-4 w-4" />
                그리드
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="mr-2 h-4 w-4" />
                리스트
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <Calendar className="mr-2 h-4 w-4" />
                캘린더
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workoutPlans.map((plan) => (
                <Card key={plan.id} className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>주 {plan.schedule.daysOfWeek?.length}회</span>
                    <span>{plan.duration}분</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      수정
                    </Button>
                    <Button variant="outline" size="sm">
                      시작
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <div className="space-y-4">
              {workoutPlans.map((plan) => (
                <Card key={plan.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{plan.title}</h3>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        수정
                      </Button>
                      <Button variant="outline" size="sm">
                        시작
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">캘린더 뷰는 개발 중입니다...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 