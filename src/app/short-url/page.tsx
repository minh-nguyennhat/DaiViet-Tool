import { Metadata } from "next"
import { UrlShortenerForm } from "@/components/url-shortener-form"
import { Link2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Rút gọn URL | Đại Việt Tool Pro",
  description: "Công cụ rút gọn liên kết trực tuyến miễn phí giúp tạo URL ngắn gọn, dễ dàng chia sẻ",
}

export default function ShortUrlPage() {
  return (
    <div className="container max-w-5xl py-8 md:py-12">
      {/* Back button */}
      <Link 
        href="/"
        className="inline-flex items-center mb-6 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Trở về trang chủ
      </Link>
      
      <div className="flex flex-col items-center text-center mb-8">
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary/10 mb-4">
          <Link2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Rút gọn URL</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Chuyển đổi URL dài thành các liên kết ngắn giúp dễ dàng chia sẻ trên mạng xã hội, 
          tin nhắn, email và nhiều nền tảng khác một cách chuyên nghiệp.
        </p>
      </div>
      
      <div className="mb-10">
        <UrlShortenerForm />
      </div>
      
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="flex flex-col items-center text-center p-4">
          <div className="p-2 rounded-full bg-blue-100 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">Nhanh chóng & đơn giản</h3>
          <p className="text-sm text-muted-foreground">Rút gọn URL chỉ với một cú nhấp chuột, không cần đăng ký tài khoản</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-4">
          <div className="p-2 rounded-full bg-green-100 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">An toàn & bảo mật</h3>
          <p className="text-sm text-muted-foreground">Các liên kết được mã hóa và bảo vệ, không thu thập thông tin cá nhân</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-4">
          <div className="p-2 rounded-full bg-purple-100 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">Theo dõi chuyển hướng</h3>
          <p className="text-sm text-muted-foreground">Biết được URL của bạn đã được truy cập bao nhiêu lần</p>
        </div>
      </div>
    </div>
  )
}
