import { User, Profile, Trainer, Client, WorkoutPlan, Exercise, WorkoutExercise, WorkoutLog } from '@prisma/client'

export type UserRole = 'USER' | 'TRAINER' | 'ADMIN'

export interface ExtendedUser extends User {
  profile?: Profile
  trainer?: Trainer
  clients?: Client[]
}

export interface WorkoutPlanWithExercises extends WorkoutPlan {
  exercises: (WorkoutExercise & {
    exercise: Exercise
  })[]
}

export interface WorkoutLogWithDetails extends WorkoutLog {
  workoutExercise: WorkoutExercise & {
    exercise: Exercise
  }
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// 페이지네이션 응답 타입
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// 운동 계획 생성/수정 시 사용되는 타입
export interface WorkoutPlanInput {
  title: string
  description?: string
  startDate: Date
  endDate?: Date
  exercises: {
    exerciseId: string
    sets: number
    reps: number
    weight?: number
    duration?: number
    order: number
  }[]
}

// 운동 기록 입력 시 사용되는 타입
export interface WorkoutLogInput {
  workoutExerciseId: string
  completedSets: number
  completedReps: number
  usedWeight?: number
  duration?: number
  feedback?: string
} 