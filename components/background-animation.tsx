"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface BackgroundAnimationProps {
  count?: number
  size?: "small" | "medium" | "large"
}

export function BackgroundAnimation({ count = 10, size = "medium" }: BackgroundAnimationProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getSizeRange = () => {
    switch (size) {
      case "small":
        return { min: 50, max: 100 }
      case "large":
        return { min: 100, max: 200 }
      default:
        return { min: 75, max: 150 }
    }
  }

  const { min, max } = getSizeRange()

  return (
    <>
      {[...Array(count)].map((_, i) => {
        const width = Math.floor(Math.random() * (max - min) + min)
        const height = Math.floor(Math.random() * (max - min) + min)
        const left = Math.floor(Math.random() * 80 + 10)
        const top = Math.floor(Math.random() * 80 + 10)
        const opacity = 0.05 + Math.random() * 0.05

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-500/5 dark:bg-emerald-500/10"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              left: `${left}%`,
              top: `${top}%`,
              opacity,
              transform: `translate(${Math.random() > 0.5 ? "-25%" : "25%"}, ${Math.random() > 0.5 ? "-25%" : "25%"})`,
            }}
            animate={{
              y: [0, Math.floor(Math.random() * 30 - 15)],
              opacity: [opacity, opacity * 2, opacity],
            }}
            transition={{
              duration: Math.floor(Math.random() * 10 + 15),
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        )
      })}
    </>
  )
}

