import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/workouts/:id - 특정 운동 계획 조회
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const workout = await prisma.workoutPlan.findUnique({
      where: { id: params.id },
      include: {
        exercises: true
      }
    })

    if (!workout) {
      return NextResponse.json(
        { error: '운동 계획을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(workout)
  } catch (error) {
    return NextResponse.json(
      { error: '운동 계획 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// PUT /api/workouts/:id - 운동 계획 수정
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const workout = await prisma.workoutPlan.update({
      where: { id: params.id },
      data: body,
      include: {
        exercises: true
      }
    })

    return NextResponse.json(workout)
  } catch (error) {
    return NextResponse.json(
      { error: '운동 계획 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE /api/workouts/:id - 운동 계획 삭제
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.workoutPlan.delete({
      where: { id: params.id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { error: '운동 계획 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 