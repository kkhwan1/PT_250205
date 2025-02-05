import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import * as z from 'zod';
import { prisma } from '@/lib/prisma';

// 비밀번호 재설정 검증 스키마
const resetPasswordSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      '비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다.'
    ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password } = resetPasswordSchema.parse(body);

    // 토큰 유효성 검사
    const resetRequest = await prisma.passwordReset.findFirst({
      where: {
        token,
        expires: {
          gt: new Date(),
        },
        used: false,
      },
    });

    if (!resetRequest) {
      return NextResponse.json(
        { error: '유효하지 않거나 만료된 토큰입니다.' },
        { status: 400 }
      );
    }

    // 비밀번호 해시화
    const hashedPassword = await hash(password, 12);

    // 비밀번호 업데이트
    await prisma.user.update({
      where: {
        email: resetRequest.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    // 토큰 사용 처리
    await prisma.passwordReset.update({
      where: {
        id: resetRequest.id,
      },
      data: {
        used: true,
      },
    });

    return NextResponse.json(
      { message: '비밀번호가 성공적으로 변경되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('비밀번호 재설정 오류:', error);
    return NextResponse.json(
      { error: '비밀번호 재설정 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 