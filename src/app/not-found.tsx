import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] flex-col">
      <h2 className="text-2xl font-bold mb-4">Không tìm thấy URL</h2>
      <p className="text-muted-foreground mb-6">Liên kết rút gọn này không tồn tại hoặc đã hết hạn.</p>
      <Link 
        href="/"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Quay về trang chủ
      </Link>
    </div>
  )
}
