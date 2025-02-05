import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

// 비밀번호 재설정 요청 검증 스키마
const resetRequestSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요.')
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = resetRequestSchema.parse(body)

    // 사용자 확인
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: '등록되지 않은 이메일입니다.' },
        { status: 400 }
      )
    }

    // 토큰 생성
    const token = randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 3600000) // 1시간 후 만료

    // 기존 토큰 만료 처리
    await prisma.passwordReset.updateMany({
      where: {
        email,
        used: false
      },
      data: {
        used: true
      }
    })

    // 새 토큰 저장
    await prisma.passwordReset.create({
      data: {
        email,
        token,
        expires
      }
    })

    // TODO: 이메일 전송 로직 구현
    // 실제 이메일 전송은 이메일 서비스 설정 후 구현

    return NextResponse.json(
      { message: '비밀번호 재설정 링크가 이메일로 전송되었습니다.' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '비밀번호 재설정 요청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 