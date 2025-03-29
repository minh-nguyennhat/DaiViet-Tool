import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Upstash Redis client
const redis = Redis.fromEnv()

export async function GET(
  request: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  const shortCode = params.shortCode
  
  if (!shortCode) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // Lấy URL đầy đủ từ Redis
  const urlKey = `url:${shortCode}`
  const statsKey = `stats:${shortCode}`
  const originalUrl = await redis.get<string>(urlKey)
  
  if (!originalUrl) {
    // Nếu không tìm thấy URL, chuyển hướng về trang chủ với thông báo lỗi
    return NextResponse.redirect(new URL('/?error=not-found', request.url))
  }
  
  // Tăng số lượt truy cập
  await redis.incr(statsKey)
  
  // Reset expiry time for both keys to extend their life
  await redis.expire(urlKey, 60 * 60 * 24 * 30) // 30 days
  await redis.expire(statsKey, 60 * 60 * 24 * 30) // 30 days
  
  // Chuyển hướng đến URL đích với mã trạng thái 307 (Temporary Redirect)
  return NextResponse.redirect(originalUrl, { status: 307 })
}
