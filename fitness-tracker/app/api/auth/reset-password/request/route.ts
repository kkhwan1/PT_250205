import { NextResponse } from 'next/server';
import * as z from 'zod';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { sendEmail } from '@/lib/email';

// 비밀번호 재설정 요청 검증 스키마
const requestResetSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = requestResetSchema.parse(body);

    // 사용자 확인
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: '등록되지 않은 이메일입니다.' },
        { status: 400 }
      );
    }

    // 재설정 토큰 생성
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1시간 후 만료

    // 재설정 토큰 저장
    await prisma.passwordReset.create({
      data: {
        email,
        token,
        expires,
      },
    });

    // 재설정 링크 이메일 전송
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    await sendEmail({
      to: email,
      subject: '비밀번호 재설정',
      html: `
        <h1>비밀번호 재설정</h1>
        <p>아래 링크를 클릭하여 비밀번호를 재설정하세요:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>이 링크는 1시간 동안만 유효합니다.</p>
      `,
    });

    return NextResponse.json(
      { message: '비밀번호 재설정 링크가 이메일로 전송되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('비밀번호 재설정 요청 오류:', error);
    return NextResponse.json(
      { message: '비밀번호 재설정 요청 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 