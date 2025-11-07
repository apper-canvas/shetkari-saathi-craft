import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  className, 
  label,
  error,
  helperText,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 devanagari-text font-body">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full h-12 px-4 py-3 text-base border rounded-lg",
          "bg-white text-gray-900 placeholder-gray-500",
          "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20",
          "transition-colors duration-200",
          "devanagari-text font-body",
          error && "border-error focus:border-error focus:ring-error/20",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm text-error devanagari-text font-body">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500 devanagari-text font-body">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input