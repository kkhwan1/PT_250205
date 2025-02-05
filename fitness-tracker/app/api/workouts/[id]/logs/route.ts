import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as z from 'zod'

// 운동 로그 생성 스키마
const workoutLogSchema = z.object({
  date: z.string(),
  duration: z.number(),
  exercises: z.array(z.object({
    exerciseId: z.string(),
    sets: z.array(z.object({
      reps: z.number(),
      weight: z.number().optional(),
      completed: z.boolean()
    }))
  }))
})

// GET /api/workouts/:id/logs - 운동 로그 목록 조회
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const logs = await prisma.workoutLog.findMany({
      where: {
        workoutPlanId: params.id
      },
      include: {
        exercises: {
          include: {
            sets: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json(logs)
  } catch (error) {
    return NextResponse.json(
      { error: '운동 로그 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// POST /api/workouts/:id/logs - 운동 로그 생성
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const data = workoutLogSchema.parse(body)

    const log = await prisma.workoutLog.create({
      data: {
        workoutPlanId: params.id,
        date: new Date(data.date),
        duration: data.duration,
        exercises: {
          create: data.exercises.map(exercise => ({
            exerciseId: exercise.exerciseId,
            sets: {
              create: exercise.sets
            }
          }))
        }
      },
      include: {
        exercises: {
          include: {
            sets: true
          }
        }
      }
    })

    return NextResponse.json(log, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '운동 로그 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 