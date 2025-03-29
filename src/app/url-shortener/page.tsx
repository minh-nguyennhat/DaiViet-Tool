import { UrlShortenerForm } from "@/components/url-shortener-form"

export default function UrlShortenerPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Rút gọn URL</h1>
      <UrlShortenerForm />
    </div>
  )
}
