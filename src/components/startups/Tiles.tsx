"use client"

import React from "react"
import { motion } from "framer-motion"

interface TilesProps {
  className?: string
  rows?: number
  cols?: number
  tileClassName?: string
  tileSize?: "sm" | "md" | "lg"
}

const tileSizes = {
  sm: "w-8 h-8",
  md: "w-9 h-9 md:w-12 md:h-12",
  lg: "w-12 h-12 md:w-16 md:h-16",
}

export function Tiles({
  className,
  rows = 100,
  cols = 10,
  tileClassName,
  tileSize = "md",
}: TilesProps) {
  const rowsArray = new Array(rows).fill(1)
  const colsArray = new Array(cols).fill(1)

  return (
    <div 
      className={[
        "relative z-0 flex w-full h-full justify-center",
        className
      ].filter(Boolean).join(' ')}
    >
      {rowsArray.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className={[
            tileSizes[tileSize],
            "border-l dark:border-neutral-900 border-neutral-200 relative",
            tileClassName
          ].filter(Boolean).join(' ')}
        >
          {colsArray.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `var(--tile)`,
                transition: { duration: 0 }
              }}
              animate={{
                transition: { duration: 2 }
              }}
              key={`col-${j}`}
              className={[
                tileSizes[tileSize],
                "border-r border-t dark:border-neutral-900 border-neutral-200 relative",
                tileClassName
              ].filter(Boolean).join(' ')}
            />
          ))}
        </motion.div>
      ))}
    </div>
  )
} 