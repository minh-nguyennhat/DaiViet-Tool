import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Upstash Redis client
const redis = Redis.fromEnv()

// Corrected function signature for Next.js 15 route handlers
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await context.params
  
  if (!shortCode) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // Lấy URL đầy đủ từ Redis
  const urlKey = `url:${shortCode}`
  const statsKey = `stats:${shortCode}`
  const originalUrl = await redis.get<string>(urlKey)
  
  if (!originalUrl) {
    // Nếu không tìm thấy URL, chuyển hướng về trang not-found
    return NextResponse.redirect(new URL('/not-found', request.url))
  }
  
  // Tăng số lượt truy cập
  await redis.incr(statsKey)
  
  // Reset expiry time for both keys to extend their life
  await redis.expire(urlKey, 60 * 60 * 24 * 30) // 30 days
  await redis.expire(statsKey, 60 * 60 * 24 * 30) // 30 days
  
  // Chuyển hướng đến URL đích với mã trạng thái 307 (Temporary Redirect)
  return NextResponse.redirect(originalUrl, 307)
}
