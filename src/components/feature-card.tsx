import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  disabled?: boolean
}

export function FeatureCard({ title, description, icon: Icon, href, disabled }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-2 group hover:translate-y-[-5px] duration-300">
      <CardHeader className="pb-2">
        <div className="p-3 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {disabled && (
          <div className="text-sm text-muted-foreground">
            Tính năng này sẽ sớm được ra mắt.
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant={disabled ? "outline" : "default"} 
          className="w-full rounded-xl"
          asChild
          disabled={disabled}
        >
          <Link href={disabled ? "#" : href}>
            {disabled ? "Sắp ra mắt" : "Truy cập công cụ"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
