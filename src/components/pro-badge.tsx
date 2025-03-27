import React from "react"
import { cn } from "@/lib/utils"

export function ProBadge({ className }: { className?: string }) {
  return (
    <div className={cn(
      "relative inline-flex items-center justify-center",
      className
    )}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 opacity-70 blur-[2px]"></div>
      <span className="relative px-2 py-0.5 text-xs font-bold text-black bg-gradient-to-r from-yellow-300 to-amber-300 rounded-full border border-amber-400 shadow-sm">
        PRO
      </span>
      <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 rounded-full bg-yellow-300 animate-ping"></div>
    </div>
  )
}
