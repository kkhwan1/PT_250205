import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function errorHandler(
  error: Error,
  request: NextRequest
) {
  // 에러 로깅
  console.error(`[Error] ${request.url}:`, error)

  // API 에러 응답 표준화
  const errorResponse = {
    error: {
      message: error.message,
      status: getErrorStatus(error),
      path: request.url
    }
  }

  return NextResponse.json(
    errorResponse,
    { status: getErrorStatus(error) }
  )
}

function getErrorStatus(error: Error): number {
  // 에러 타입에 따른 상태 코드 매핑
  switch(error.name) {
    case 'ValidationError':
      return 400
    case 'UnauthorizedError':
      return 401
    case 'ForbiddenError':
      return 403
    case 'NotFoundError':
      return 404
    default:
      return 500
  }
} 