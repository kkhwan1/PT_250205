'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

// 비밀번호 재설정 요청 스키마
const requestResetSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
});

// 새 비밀번호 설정 스키마
const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      '비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다.'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
});

type RequestResetFormData = z.infer<typeof requestResetSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register: registerRequest,
    handleSubmit: handleSubmitRequest,
    formState: { errors: requestErrors },
  } = useForm<RequestResetFormData>({
    resolver: zodResolver(requestResetSchema),
  });

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onRequestReset = async (data: RequestResetFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/auth/reset-password/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || '비밀번호 재설정 요청 중 오류가 발생했습니다.');
      }

      setSuccess('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('비밀번호 재설정 요청 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPassword = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/auth/reset-password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, token }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || '비밀번호 재설정 중 오류가 발생했습니다.');
      }

      router.push('/login?reset=true');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('비밀번호 재설정 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">비밀번호 재설정</h1>
          <p className="text-sm text-gray-600">
            {token
              ? '새로운 비밀번호를 입력해주세요'
              : '가입한 이메일 주소를 입력해주세요'}
          </p>
        </CardHeader>
        <CardContent>
          {!token ? (
            <form onSubmit={handleSubmitRequest(onRequestReset)} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="이메일"
                  {...registerRequest('email')}
                  className={requestErrors.email ? 'border-red-500' : ''}
                />
                {requestErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {requestErrors.email.message}
                  </p>
                )}
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              {success && (
                <p className="text-green-500 text-sm text-center">{success}</p>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? '요청 중...' : '재설정 링크 받기'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmitReset(onResetPassword)} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="새 비밀번호"
                  {...registerReset('password')}
                  className={resetErrors.password ? 'border-red-500' : ''}
                />
                {resetErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {resetErrors.password.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="새 비밀번호 확인"
                  {...registerReset('confirmPassword')}
                  className={resetErrors.confirmPassword ? 'border-red-500' : ''}
                />
                {resetErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {resetErrors.confirmPassword.message}
                  </p>
                )}
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? '변경 중...' : '비밀번호 변경'}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm">
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800"
          >
            로그인으로 돌아가기
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 