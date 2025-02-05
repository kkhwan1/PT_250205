import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/middleware/auth'
import { verifyToken } from '@/lib/utils/jwt'

jest.mock('@/lib/utils/jwt', () => ({
  verifyToken: jest.fn()
}))

describe('Auth Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('토큰이 없는 요청을 거부해야 함', async () => {
    const request = new NextRequest(new URL('http://localhost:3001/api/workouts'))
    const response = await withAuth(request)

    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('인증이 필요합니다.')
  })

  it('유효한 토큰으로 요청을 허용해야 함', async () => {
    const mockUser = { id: '1', email: 'test@example.com' }
    const mockVerifyToken = verifyToken as jest.MockedFunction<typeof verifyToken>
    mockVerifyToken.mockResolvedValue(mockUser)

    const request = new NextRequest(new URL('http://localhost:3001/api/workouts'), {
      headers: {
        Authorization: 'Bearer valid.token.here'
      }
    })

    const response = await withAuth(request)
    expect(response.status).toBe(200)
  })

  it('유효하지 않은 토큰을 거부해야 함', async () => {
    ;(verifyToken as jest.Mock).mockRejectedValue(new Error('Invalid token'))

    const request = new NextRequest(new URL('http://localhost:3001/api/workouts'), {
      headers: {
        Authorization: 'Bearer invalid.token'
      }
    })

    const response = await withAuth(request)
    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('유효하지 않은 토큰입니다.')
  })
}) 