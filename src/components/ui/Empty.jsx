import React from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "काहीही सापडले नाही", 
  description = "तुमची माहिती येथे दिसेल", 
  actionLabel, 
  onAction,
  icon = "Inbox"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 min-h-[50vh]">
      <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} size={40} className="text-primary" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-display font-semibold text-gray-900 devanagari-text">
          {title}
        </h3>
        <p className="text-gray-600 devanagari-text font-body max-w-sm">
          {description}
        </p>
      </div>
      
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          className="mt-4"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default Empty