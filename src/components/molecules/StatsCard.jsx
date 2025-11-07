import React from "react"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  color = "primary", 
  subtitle,
  trend,
  onClick 
}) => {
  const colorClasses = {
    primary: {
      bg: "from-green-100 to-green-200",
      icon: "text-primary",
      text: "text-green-900",
      value: "text-green-800"
    },
    secondary: {
      bg: "from-orange-100 to-orange-200", 
      icon: "text-accent",
      text: "text-orange-900",
      value: "text-orange-800"
    },
    info: {
      bg: "from-blue-100 to-blue-200",
      icon: "text-info", 
      text: "text-blue-900",
      value: "text-blue-800"
    },
    success: {
      bg: "from-emerald-100 to-emerald-200",
      icon: "text-success",
      text: "text-emerald-900", 
      value: "text-emerald-800"
    }
  }

  const colors = colorClasses[color] || colorClasses.primary

  return (
    <Card 
      className={`p-4 bg-gradient-to-br ${colors.bg} border-transparent`}
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <ApperIcon 
            name={icon} 
            size={24} 
            className={colors.icon}
          />
          {trend && (
            <div className={`flex items-center text-xs ${
              trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-gray-500'
            }`}>
              <ApperIcon 
                name={trend > 0 ? 'TrendingUp' : trend < 0 ? 'TrendingDown' : 'Minus'} 
                size={12} 
                className="mr-1"
              />
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        
        <div>
          <h3 className={`text-2xl font-bold ${colors.value}`}>
            {value}
          </h3>
          <p className={`text-sm font-medium devanagari-text font-body ${colors.text}`}>
            {title}
          </p>
          {subtitle && (
            <p className={`text-xs devanagari-text font-body ${colors.text} opacity-70`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}

export default StatsCard