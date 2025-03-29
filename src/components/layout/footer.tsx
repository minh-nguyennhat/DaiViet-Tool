import Link from "next/link"
import { Facebook, Github, Globe, Heart, Mail, MapPin, Youtube } from "lucide-react"
import { AnimatedFlag } from "../animated-flag"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/50 pointer-events-none" />
      
      {/* Geometric pattern (similar to header) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <div className="grid grid-cols-5 md:grid-cols-10 h-full">
          {Array(10).fill(0).map((_, i) => (
            <div key={i} className="border-r border-primary/5"></div>
          ))}
        </div>
      </div>
      
      <div className="container relative py-8 md:py-14">
        {/* Main footer content */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <AnimatedFlag />
              <h3 className="font-bold text-xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Đại Việt Tool
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Bộ công cụ hiện đại được thiết kế cho người Việt giúp tăng năng suất và hiệu quả công việc
            </p>
            
            <div className="mt-6 flex space-x-3">
              <Link 
                href="https://github.com/minh-nguyennhat" 
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-white shadow-sm hover:shadow text-primary rounded-full p-2.5 transition-all hover:scale-110"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link 
                href="#" 
                className="bg-white shadow-sm hover:shadow text-primary rounded-full p-2.5 transition-all hover:scale-110"
              >
                <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Website</span>
              </Link>
              <Link 
                href="#" 
                className="bg-white shadow-sm hover:shadow text-primary rounded-full p-2.5 transition-all hover:scale-110"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link 
                href="#" 
                className="bg-white shadow-sm hover:shadow text-primary rounded-full p-2.5 transition-all hover:scale-110"
              >
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>
          
          {/* Links section */}
          <div>
            <h3 className="text-base font-bold mb-4 text-foreground/80">Liên kết nhanh</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                  Công cụ
                </Link>
              </li>
              <li>
                <Link href="#developer-info" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                  Nhà phát triển
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-2"></span>
                  Blog công nghệ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact section */}
          <div>
            <h3 className="text-base font-bold mb-4 text-foreground/80">Liên hệ</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center text-muted-foreground group cursor-pointer">
                <div className="bg-white shadow-sm p-1.5 rounded-full mr-3 group-hover:shadow transition-all">
                  <Mail className="h-3.5 w-3.5 text-primary/80" />
                </div>
                <span className="group-hover:text-primary transition-colors">info@nguyennhatminh.net</span>
              </li>
              <li className="flex items-center text-muted-foreground group cursor-pointer">
                <div className="bg-white shadow-sm p-1.5 rounded-full mr-3 group-hover:shadow transition-all">
                  <MapPin className="h-3.5 w-3.5 text-primary/80" />
                </div>
                <span className="group-hover:text-primary transition-colors">Trà Vinh, Việt Nam</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter section */}
          <div>
            <h3 className="text-base font-bold mb-4 text-foreground/80">Nhận cập nhật</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Đăng ký để nhận thông tin về các công cụ mới
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="w-full rounded-full px-4 py-2.5 text-sm border border-border bg-white focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-0.5 top-0.5 bottom-0.5 px-3 sm:px-4 bg-primary text-white rounded-full text-xs font-medium hover:bg-primary/90 transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer bottom section */}
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {currentYear} Đại Việt Tool. Mọi quyền được bảo lưu.
          </p>
          
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <span>Được xây dựng with</span>
            <Heart className="h-3 w-3 text-red-500 mx-0.5 inline" />
            <span>bởi </span>
            <span className="font-medium text-primary">Nguyễn Nhật Minh</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
