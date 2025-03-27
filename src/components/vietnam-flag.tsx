"use client"

import React, { useEffect, useRef } from "react"

export function VietnamFlag({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Draw the flag
    const drawFlag = () => {
      const { width, height } = canvas
      
      // Red background
      ctx.fillStyle = '#DA251D'
      ctx.fillRect(0, 0, width, height)
      
      // Yellow star
      const centerX = width / 2
      const centerY = height / 2
      const starSize = Math.min(width, height) * 0.6
      
      ctx.fillStyle = '#FFFF00'
      drawStar(ctx, centerX, centerY, 5, starSize / 2, starSize / 4)
      
      // Add some animated particles
      drawParticles(ctx, width, height)
    }
    
    // Function to draw a star
    const drawStar = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = Math.PI / 2 * 3
      let x = cx
      let y = cy
      const step = Math.PI / spikes
      
      ctx.beginPath()
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius
        y = cy + Math.sin(rot) * outerRadius
        ctx.lineTo(x, y)
        rot += step
        
        x = cx + Math.cos(rot) * innerRadius
        y = cy + Math.sin(rot) * innerRadius
        ctx.lineTo(x, y)
        rot += step
      }
      ctx.lineTo(cx + Math.cos(Math.PI / 2 * 3) * outerRadius, cy + Math.sin(Math.PI / 2 * 3) * outerRadius)
      ctx.closePath()
      ctx.fill()
    }
    
    // Particles
    let particles: { x: number; y: number; size: number; speed: number }[] = []
    
    const initParticles = (width: number, height: number) => {
      particles = []
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.5 + 0.1
        })
      }
    }
    
    const drawParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      if (particles.length === 0) {
        initParticles(width, height)
      }
      
      ctx.fillStyle = 'rgba(255, 255, 0, 0.5)'
      particles.forEach(particle => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Move particles
        particle.y -= particle.speed
        
        // Reset if off-screen
        if (particle.y < 0) {
          particle.y = height
          particle.x = Math.random() * width
        }
      })
    }
    
    let animationFrameId: number
    
    const render = () => {
      drawFlag()
      animationFrameId = window.requestAnimationFrame(render)
    }
    
    render()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`block w-16 h-10 rounded shadow-md ${className}`}
      style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
    />
  )
}
