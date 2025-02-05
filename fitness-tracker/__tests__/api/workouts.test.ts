import { createMocks } from 'node-mocks-http'
import { NextResponse } from 'next/server'
import { GET, POST } from '@/app/api/workouts/route'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    workoutPlan: {
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn()
    }
  }
}))

describe('Workouts API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/workouts', () => {
    it('운동 목록을 페이지네이션과 함께 반환해야 함', async () => {
      const mockWorkouts = [
        {
          id: '1',
          title: '상체 운동',
          description: '가슴, 어깨, 삼두 운동',
          exercises: []
        }
      ]

      // Prisma mock 설정
      const mockPrisma = prisma as jest.Mocked<typeof prisma>
      mockPrisma.workoutPlan.findMany.mockResolvedValue(mockWorkouts)
      mockPrisma.workoutPlan.count.mockResolvedValue(1)

      const { req } = createMocks({
        method: 'GET',
        query: {
          page: '1',
          limit: '10'
        }
      })

      const response = await GET(req)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({
        data: mockWorkouts,
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1
        }
      })
    })
  })

  describe('POST /api/workouts', () => {
    it('새로운 운동 계획을 생성해야 함', async () => {
      const mockWorkout = {
        name: '상체 운동',
        type: 'STRENGTH',
        description: '가슴, 어깨, 삼두 운동',
        difficulty: 'INTERMEDIATE',
        exercises: [
          {
            name: '벤치프레스',
            sets: 3,
            reps: 10
          }
        ]
      }

      const mockCreatedWorkout = {
        id: '1',
        title: mockWorkout.name,
        description: mockWorkout.description,
        exercises: mockWorkout.exercises
      }

      ;(prisma.workoutPlan.create as jest.Mock).mockResolvedValue(mockCreatedWorkout)

      const { req } = createMocks({
        method: 'POST',
        body: mockWorkout
      })

      const response = await POST(req)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data).toEqual(mockCreatedWorkout)
    })

    it('잘못된 데이터로 요청시 400 에러를 반환해야 함', async () => {
      const invalidWorkout = {
        name: '', // 빈 이름은 허용되지 않음
        type: 'INVALID_TYPE',
        exercises: []
      }

      const { req } = createMocks({
        method: 'POST',
        body: invalidWorkout
      })

      const response = await POST(req)
      expect(response.status).toBe(400)
    })
  })
}) 