import React from "react"
import { cn } from "@/utils/cn"

const badgeVariants = {
  success: "bg-gradient-to-r from-success to-green-600 text-white",
  warning: "bg-gradient-to-r from-warning to-orange-600 text-white",
  error: "bg-gradient-to-r from-error to-red-600 text-white",
  info: "bg-gradient-to-r from-info to-blue-600 text-white",
  secondary: "bg-gray-100 text-gray-700",
  primary: "bg-gradient-to-r from-primary to-secondary text-white"
}

const Badge = ({ 
  children, 
  variant = "primary", 
  className,
  ...props 
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        "devanagari-text font-body",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge