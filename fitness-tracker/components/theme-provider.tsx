'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

/**
 * 애플리케이션의 테마를 관리하는 프로바이더 컴포넌트
 * @param props - next-themes의 ThemeProviderProps
 * @returns ThemeProvider 컴포넌트
 */
export function ThemeProvider({ 
  children, 
  defaultTheme = 'system',  // 기본 테마 설정
  ...props 
}: ThemeProviderProps): React.ReactElement {
  return (
    <NextThemesProvider defaultTheme={defaultTheme} {...props}>
      {children}
    </NextThemesProvider>
  )
}
