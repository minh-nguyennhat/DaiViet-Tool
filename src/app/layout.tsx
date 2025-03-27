import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/layout/footer"
import { ModernHeader } from "@/components/layout/modern-header"

const fontSans = FontSans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Đại Việt Tool Pro | Công cụ cho Nhà phát triển Web",
  description: "Bộ sưu tập các công cụ hữu ích cho nhà phát triển web",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased flex flex-col",
        fontSans.variable
      )}>
        <ModernHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
