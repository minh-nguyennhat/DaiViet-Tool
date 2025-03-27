import Link from "next/link"
import { Github, Mail, MapPin, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-primary"/>
              <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DevToolsHub
              </span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Bộ công cụ phát triển web chuyên nghiệp giúp tăng năng suất làm việc
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Công cụ
                </Link>
              </li>
              <li>
                <Link href="#developer-info" className="text-muted-foreground hover:text-foreground transition-colors">
                  Nhà phát triển
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                contact@devtoolshub.vn
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                Hà Nội, Việt Nam
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kết nối</h3>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full p-2 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link 
                href="#" 
                className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full p-2 transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DevToolsHub. Được phát triển bởi nhóm DevToolsHub.</p>
          <p className="mt-1">Được xây dựng bằng Next.js, Tailwind CSS và shadcn/ui. Triển khai trên Vercel.</p>
        </div>
      </div>
    </footer>
  )
}
