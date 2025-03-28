import { 
  Link as LinkIcon, 
  Key, 
  GitFork, 
  FileCode2, 
  Settings, 
  Code2,
  Search,
  ScanSearch,
  Terminal,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { FunDeveloperCard } from "@/components/fun-developer-card"

export default function Home() {
  // Tool items data
  const tools = [
    {
      id: "url-shortener",
      title: "Rút gọn URL",
      description: "Chuyển đổi URL dài thành các liên kết ngắn, dễ dàng chia sẻ.",
      icon: LinkIcon,
      href: "/short-url",
      color: "from-blue-500/20 to-cyan-400/20",
      iconColor: "text-blue-500",
      disabled: false, // Updated to false since we've implemented this feature
    },
    {
      id: "2fa",
      title: "Tạo mã 2FA",
      description: "Tạo mã xác thực hai lớp an toàn.",
      icon: Key,
      href: "/2fa",
      color: "from-amber-500/20 to-orange-400/20",
      iconColor: "text-amber-500",
      disabled: true,
    },
    {
      id: "git-tools",
      title: "Công cụ Git",
      description: "Tiện ích hỗ trợ cho các thao tác Git thông dụng.",
      icon: GitFork,
      href: "/git-tools",
      color: "from-purple-500/20 to-violet-400/20",
      iconColor: "text-purple-500",
      disabled: true,
    },
    {
      id: "formatter",
      title: "Định dạng mã",
      description: "Định dạng và làm đẹp mã của bạn một cách dễ dàng.",
      icon: FileCode2,
      href: "/formatter",
      color: "from-green-500/20 to-emerald-400/20",
      iconColor: "text-green-500",
      disabled: true,
    },
    {
      id: "search-tools",
      title: "Công cụ tìm kiếm",
      description: "Tìm kiếm thông tin một cách nhanh chóng và hiệu quả.",
      icon: Search,
      href: "/search",
      color: "from-red-500/20 to-rose-400/20",
      iconColor: "text-red-500",
      disabled: true,
    },
    {
      id: "code-analysis",
      title: "Phân tích mã",
      description: "Phân tích và tối ưu hóa mã nguồn của bạn.",
      icon: ScanSearch,
      href: "/code-analysis",
      color: "from-indigo-500/20 to-blue-400/20",
      iconColor: "text-indigo-500",
      disabled: true,
    },
    {
      id: "terminal",
      title: "Terminal trực tuyến",
      description: "Thực thi các lệnh terminal trực tiếp từ trình duyệt.",
      icon: Terminal,
      href: "/terminal",
      color: "from-gray-500/20 to-slate-400/20",
      iconColor: "text-gray-500",
      disabled: true,
    },
    {
      id: "ai-tools",
      title: "Công cụ AI",
      description: "Sử dụng trí tuệ nhân tạo để tăng năng suất làm việc.",
      icon: Sparkles,
      href: "/ai-tools",
      color: "from-pink-500/20 to-rose-400/20",
      iconColor: "text-pink-500",
      disabled: true,
    },
    {
      id: "settings",
      title: "Cài đặt",
      description: "Tùy chỉnh trải nghiệm và các tùy chọn của bạn.",
      icon: Settings,
      href: "/settings",
      color: "from-slate-500/20 to-gray-400/20",
      iconColor: "text-slate-500",
      disabled: true,
    }
  ];

  return (
    <>
      {/* Redesigned Tools Section - Without Search and Title */}
      <section className="w-full py-10 md:py-16 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container px-4 md:px-6">
          {/* Tool Grid with New Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {tools.map((tool) => (
              <Card
                key={tool.id}
                className="group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-border hover:border-primary/20 overflow-hidden"
              >
                <Link 
                  href={tool.disabled ? "#" : tool.href}
                  className={`p-6 flex flex-col h-full ${tool.disabled ? 'cursor-not-allowed' : ''}`}
                >
                  <div className={`p-3 w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1.5">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground mb-auto">{tool.description}</p>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <span className={`text-xs ${tool.disabled ? 'text-muted-foreground' : 'text-primary'}`}>
                      {tool.disabled ? 'Sắp ra mắt' : 'Khám phá ngay'}
                    </span>
                    
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center
                      ${tool.disabled ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Information Section - Redesigned with Fun Card */}
      <section id="developer-info" className="w-full py-12 md:py-16 bg-gradient-to-b from-background to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6">
            <div className="inline-block rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary">
              <Code2 className="inline h-4 w-4 mr-1" />
              Nhà Phát Triển
            </div>
          </div>

          {/* New Fun Developer Card */}
          <FunDeveloperCard />
        </div>
      </section>
    </>
  )
}
