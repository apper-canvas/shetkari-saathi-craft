import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const buttonVariants = {
  primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg hover:from-green-700 hover:to-green-800",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300",
  accent: "bg-gradient-to-r from-accent to-orange-600 text-white shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "text-primary hover:bg-green-50",
  danger: "bg-gradient-to-r from-error to-red-600 text-white shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700"
}

const buttonSizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-lg",
  xl: "h-14 px-8 text-xl"
}

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        "devanagari-text font-body",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button