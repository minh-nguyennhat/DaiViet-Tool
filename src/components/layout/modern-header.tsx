"use client"

import React, { useEffect, useRef } from "react"
import Link from "next/link"
import { AnimatedFlag } from "../animated-flag"
import { ProBadge } from "../pro-badge"
import { DeviceInfo } from "../device-info"

export function ModernHeader() {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = bgCanvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)
    
    // Grid lines setup
    const GRID_SIZE = 30
    let gridOffset = 0
    const GRID_COLOR = 'rgba(65, 91, 181, 0.08)'
    
    // Tech nodes setup
    const nodes: {
      x: number;
      y: number;
      size: number;
      speed: number;
      connections: number[];
    }[] = []
    
    const initNodes = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      const nodeCount = Math.floor((width * height) / 30000)
      
      nodes.length = 0
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.2 + 0.1,
          connections: []
        })
      }
    }
    
    initNodes()
    window.addEventListener('resize', initNodes)
    
    const draw = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height)
      
      // Animate grid
      gridOffset += 0.2
      if (gridOffset >= GRID_SIZE) gridOffset = 0
      
      // Draw animated grid
      ctx.beginPath()
      ctx.strokeStyle = GRID_COLOR
      
      // Vertical lines
      for (let x = gridOffset; x < width; x += GRID_SIZE) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
      
      // Horizontal lines
      for (let y = gridOffset; y < height; y += GRID_SIZE) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }
      
      ctx.stroke()
      
      // Draw tech nodes and connections
      const MAX_DISTANCE = 150
      
      // Reset connections
      nodes.forEach(node => {
        node.connections = []
      })
      
      // Find connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < MAX_DISTANCE) {
            nodes[i].connections.push(j)
            nodes[j].connections.push(i)
          }
        }
      }
      
      // Draw connections
      ctx.beginPath()
      nodes.forEach((node, i) => {
        node.connections.forEach(j => {
          if (i < j) { // Draw each connection only once
            const opacity = 1 - (Math.sqrt(
              Math.pow(nodes[i].x - nodes[j].x, 2) + 
              Math.pow(nodes[i].y - nodes[j].y, 2)
            ) / MAX_DISTANCE)
            
            ctx.strokeStyle = `rgba(65, 105, 225, ${opacity * 0.2})`
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        })
      })
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.fillStyle = `rgba(65, 105, 225, ${0.4 + (node.size - 1) / 3})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Move nodes
        node.y += node.speed
        
        // Reset if off-screen
        if (node.y > height) {
          node.y = 0
          node.x = Math.random() * width
        }
      })
      
      requestAnimationFrame(draw)
    }
    
    const animationId = requestAnimationFrame(draw)
    
    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('resize', initNodes)
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  return (
    <header className="relative w-full border-b bg-gradient-to-r from-slate-50 to-blue-50 overflow-hidden">
      {/* Animated background */}
      <canvas 
        ref={bgCanvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center py-4 md:py-6 space-y-3">
          {/* Top row with logo and flag */}
          <div className="flex items-center justify-center space-x-4">
            <AnimatedFlag />
            
            <div className="flex items-center">
              <h1 className="relative text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-pulse">
                Đại Việt Tool
                <ProBadge className="absolute -top-2 -right-12" />
              </h1>
            </div>
          </div>
          
          {/* Device info row */}
          <DeviceInfo />
        </div>
      </div>
      
      {/* Glowing edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
    </header>
  )
}
