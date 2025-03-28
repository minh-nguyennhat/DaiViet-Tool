"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, ExternalLink, Code, Coffee, Heart } from "lucide-react"

export function FunDeveloperCard() {
  const [coffeeCount, setCoffeeCount] = useState(0)
  const [isWaving, setIsWaving] = useState(false)
  
  const handleCoffeeClick = () => {
    setCoffeeCount(prev => prev + 1)
  }
  
  const handleAvatarHover = () => {
    setIsWaving(true)
    setTimeout(() => setIsWaving(false), 1000)
  }
  
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Fun gradient header */}
      <div className="h-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500"></div>
      
      <div className="p-6">
        <div className="flex items-center">
          {/* Avatar */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            onHoverStart={handleAvatarHover}
            className="relative"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image 
                src="/images/profile.jpg" 
                alt="Nguyễn Nhật Minh"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Waving hand */}
            <motion.div 
              className="absolute -right-3 -top-3 text-xl"
              animate={isWaving ? {
                rotate: [0, 20, -20, 20, 0],
                transition: { duration: 0.8 }
              } : {}}
            >
              👋
            </motion.div>
          </motion.div>
          
          {/* Name and title */}
          <div className="ml-4">
            <motion.h3 
              className="text-lg font-bold"
              whileHover={{ 
                color: ["#333", "#6366F1", "#EC4899", "#333"],
                transition: { duration: 1, repeat: Infinity } 
              }}
            >
              Nguyễn Nhật Minh
            </motion.h3>
            <div className="flex items-center text-gray-600">
              <Code className="h-3 w-3 mr-1" />
              <span className="text-sm">Coder Lỏ 🤡</span>
            </div>
          </div>
        </div>
        
        {/* Fun facts */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-600"
          >
            <span className="font-medium text-primary">Fun facts:</span> 
            <ul className="mt-1 space-y-1 pl-5 list-disc text-xs">
              <li>Viết 1000 dòng code trước khi ăn sáng 🧑‍💻</li>
              <li>Ngủ với laptop dưới gối 💻</li>
              <li>Mơ thấy bug và fix chúng trong mơ 🐛</li>
            </ul>
          </motion.div>
        </div>
        
        {/* Tech stack */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5">
            {["Next.js", "React", "TypeScript", "Node.js", "Tailwind"].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.1, backgroundColor: "#4F46E5", color: "white" }}
                className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
        
        {/* Coffee counter */}
        <motion.div 
          className="mt-4 flex items-center text-sm text-gray-600"
          whileHover={{ scale: 1.02 }}
        >
          <button 
            onClick={handleCoffeeClick}
            className="flex items-center mr-2 px-2 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors"
          >
            <Coffee className="h-3 w-3 mr-1" />
            <span>Cà phê</span>
          </button>
          <span>Đã uống: {coffeeCount} cốc hôm nay</span>
          
          {/* Coffee animation on click */}
          {coffeeCount > 0 && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="ml-2"
            >
              +1 ☕
            </motion.div>
          )}
        </motion.div>
        
        {/* Social links */}
        <div className="mt-4 flex justify-between items-center pt-3 border-t">
          <div className="flex space-x-2">
            <motion.a 
              href="https://github.com/minh-nguyennhat" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="p-1.5 bg-gray-100 rounded-full text-gray-700 hover:text-primary transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/-nguyennhatminh-" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ y: -3 }}
              className="p-1.5 bg-gray-100 rounded-full text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </motion.a>
            <motion.a 
              href="mailto:info@nguyennhatminh.net" 
              whileHover={{ y: -3 }}
              className="p-1.5 bg-gray-100 rounded-full text-gray-700 hover:text-red-500 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
            </motion.a>
          </div>
          
          <motion.a 
            href="https://nguyennhatminh.net" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-primary flex items-center hover:underline"
            whileHover={{ x: 3 }}
          >
            nguyennhatminh.net <ExternalLink className="ml-0.5 h-2.5 w-2.5" />
          </motion.a>
        </div>
        
        {/* Made with love */}
        <motion.div 
          className="mt-3 text-center text-xs text-gray-500 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.03, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
          }}
        >
          Made with <Heart className="h-2.5 w-2.5 mx-0.5 text-red-500" /> in Vietnam
        </motion.div>
      </div>
    </motion.div>
  )
}
