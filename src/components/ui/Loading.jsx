import React from "react"

const Loading = () => {
  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      {/* Header Skeleton */}
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-green-200 rounded w-3/4"></div>
        
        {/* Weather Widget Skeleton */}
        <div className="bg-surface rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-green-200 rounded w-1/2"></div>
              <div className="h-4 bg-green-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
        
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface rounded-xl p-4 shadow-sm">
              <div className="space-y-3">
                <div className="w-8 h-8 bg-green-200 rounded"></div>
                <div className="h-6 bg-green-200 rounded w-3/4"></div>
                <div className="h-4 bg-green-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* List Items Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-surface rounded-xl p-4 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-green-200 rounded w-3/4"></div>
                <div className="h-3 bg-green-200 rounded w-1/2"></div>
              </div>
              <div className="w-6 h-6 bg-green-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading