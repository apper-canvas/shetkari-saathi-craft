import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ 
  className, 
  children,
  onClick,
  ...props 
}, ref) => {
  return (
    <div
      className={cn(
        "bg-surface rounded-xl shadow-sm border border-gray-100",
        "transition-all duration-200",
        onClick && "cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      ref={ref}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card