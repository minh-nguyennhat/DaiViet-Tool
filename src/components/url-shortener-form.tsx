"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Link2, Copy, Check, Rocket } from "lucide-react"
import { motion } from "framer-motion"

export function UrlShortenerForm() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  
  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  const shortenUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset states
    setError("")
    setShortUrl("")
    
    // Validate URL
    if (!url) {
      setError("Vui lòng nhập URL để rút gọn")
      return
    }
    
    // Add https:// if not present
    let processedUrl = url
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      processedUrl = `https://${url}`
    }
    
    if (!isValidUrl(processedUrl)) {
      setError("URL không hợp lệ. Vui lòng kiểm tra lại.")
      return
    }
    
    // Start loading
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: processedUrl }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra khi rút gọn URL')
      }
      
      setShortUrl(data.shortUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi rút gọn URL')
    } finally {
      setIsLoading(false)
    }
  }
  
  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary/10">
            <Link2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Rút gọn URL</CardTitle>
            <CardDescription>
              Tạo liên kết ngắn gọn từ URL dài
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={shortenUrl} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Nhập URL cần rút gọn"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pr-12 h-12"
              />
              <div className="absolute right-3 top-3 text-gray-400">
                <Rocket className="h-5 w-5" />
              </div>
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500"
              >
                {error}
              </motion.p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 font-medium" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang rút gọn...
              </>
            ) : "Rút gọn URL"}
          </Button>
        </form>
        
        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 overflow-hidden"
          >
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-between">
              <a 
                href={shortUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary font-medium truncate hover:underline"
              >
                {shortUrl}
              </a>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2 h-8 px-2"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Liên kết rút gọn sẽ hết hạn sau 30 ngày nếu không được sử dụng.
      </CardFooter>
    </Card>
  )
}
