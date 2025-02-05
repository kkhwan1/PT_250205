import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withAuth } from '@/middleware/auth'
import * as z from 'zod'

// 운동 계획 생성 스키마
const workoutSchema = z.object({
  name: z.string().min(1, '운동 이름은 필수입니다.'),
  type: z.string(),
  description: z.string().optional(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  exercises: z.array(z.object({
    name: z.string(),
    sets: z.number(),
    reps: z.number(),
    weight: z.number().optional()
  }))
})

// GET /api/workouts - 운동 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 10
    const sort = searchParams.get('sort') || 'createdAt:desc'
    
    const [field, order] = sort.split(':')
    
    const workouts = await prisma.workoutPlan.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        [field]: order.toLowerCase()
      },
      include: {
        exercises: true
      }
    })

    const total = await prisma.workoutPlan.count()

    return NextResponse.json({
      data: workouts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: '운동 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// POST /api/workouts - 운동 계획 생성
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = workoutSchema.parse(body)
    
    const workout = await prisma.workoutPlan.create({
      data: {
        title: data.name,
        description: data.description,
        exercises: {
          create: data.exercises
        }
      },
      include: {
        exercises: true
      }
    })

    return NextResponse.json(workout, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: '운동 계획 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 