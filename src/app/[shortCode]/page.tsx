import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đang chuyển hướng...',
  description: 'Đang chuyển hướng đến trang đích',
}

export default function ShortCodePage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] flex-col">
      <h1 className="text-2xl font-bold mb-4">Đang chuyển hướng...</h1>
      <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-muted-foreground">Vui lòng đợi trong giây lát</p>
    </div>
  )
}
