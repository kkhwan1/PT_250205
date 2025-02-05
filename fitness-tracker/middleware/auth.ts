import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/utils/jwt'

export async function withAuth(request: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 추출
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      )
    }

    // 토큰 검증
    const decoded = await verifyToken(token)
    
    // 요청 객체에 사용자 정보 추가
    const requestWithUser = request.clone()
    requestWithUser.headers.set('user', JSON.stringify(decoded))
    
    return NextResponse.next({
      request: requestWithUser
    })

  } catch (error) {
    return NextResponse.json(
      { error: '유효하지 않은 토큰입니다.' },
      { status: 401 }
    )
  }
} 