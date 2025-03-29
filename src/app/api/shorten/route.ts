import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Initialize Upstash Redis client
const redis = Redis.fromEnv()

// Độ dài mã code rút gọn
const SHORT_CODE_LENGTH = 6

// Thời gian hết hạn mặc định (30 ngày)
const DEFAULT_EXPIRY = 60 * 60 * 24 * 30 // 30 days in seconds

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url } = body
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL không được để trống' },
        { status: 400 }
      )
    }
    
    // Tạo mã ngẫu nhiên
    const shortCode = crypto.randomBytes(SHORT_CODE_LENGTH)
      .toString('base64')
      .replace(/[+/=]/g, '') // Replace non-URL safe characters
      .substring(0, SHORT_CODE_LENGTH)
    
    // Tạo key cho Redis
    const urlKey = `url:${shortCode}`
    const statsKey = `stats:${shortCode}`
    
    // Lưu URL vào Redis với thời hạn 30 ngày
    await redis.set(urlKey, url, { ex: DEFAULT_EXPIRY })
    
    // Khởi tạo số lượt truy cập = 0
    await redis.set(statsKey, 0, { ex: DEFAULT_EXPIRY })
    
    // Tạo URL đầy đủ
    const host = req.headers.get('host') || 'localhost:3000'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const shortUrl = `${protocol}://${host}/${shortCode}`
    
    return NextResponse.json({ shortUrl, shortCode }, { status: 201 })
  } catch (error) {
    console.error('Error shortening URL:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi rút gọn URL' },
      { status: 500 }
    )
  }
}

// Optional: Create a GET endpoint to get statistics for a short URL
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const shortCode = url.searchParams.get('code')
    
    if (!shortCode) {
      return NextResponse.json(
        { error: 'Mã rút gọn không được để trống' },
        { status: 400 }
      )
    }
    
    const statsKey = `stats:${shortCode}`
    const clicks = await redis.get(statsKey) || 0
    
    return NextResponse.json({ shortCode, clicks }, { status: 200 })
  } catch (error) {
    console.error('Error getting stats:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi lấy thống kê' },
      { status: 500 }
    )
  }
}
