import React from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const ErrorView = ({ message = "काही तरी चूक झाली आहे", onRetry }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 pb-20">
      <div className="text-center space-y-6 max-w-sm">
        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="AlertCircle" size={40} className="text-error" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-display font-semibold text-gray-900 devanagari-text">
            त्रुटी!
          </h3>
          <p className="text-gray-600 devanagari-text font-body">
            {message}
          </p>
        </div>
        
        {onRetry && (
          <Button
            onClick={onRetry}
            className="mx-auto"
            variant="primary"
          >
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            पुन्हा प्रयत्न करा
          </Button>
        )}
        
        <p className="text-sm text-gray-500 devanagari-text font-body">
          समस्या कायम राहिल्यास कृपया पुन्हा प्रयत्न करा
        </p>
      </div>
    </div>
  )
}

export default ErrorView