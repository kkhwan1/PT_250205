import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.REDIS_URL || '',
  token: process.env.REDIS_TOKEN || ''
})

const WINDOW_SIZE = 60 // 1분
const MAX_REQUESTS = 30 // 분당 최대 요청 수

export async function rateLimit(request: NextRequest) {
  const ip = request.ip || '127.0.0.1'
  const key = `rate-limit:${ip}`
  
  const requests = await redis.incr(key)
  
  if (requests === 1) {
    await redis.expire(key, WINDOW_SIZE)
  }
  
  if (requests > MAX_REQUESTS) {
    return NextResponse.json(
      { error: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 429 }
    )
  }
  
  return NextResponse.next()
} 