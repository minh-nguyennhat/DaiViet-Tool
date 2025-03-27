"use client"

import React from "react"
import { VietnamFlag } from "./vietnam-flag"

export function AnimatedFlag() {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative">
        <VietnamFlag />
      </div>
    </div>
  )
}
