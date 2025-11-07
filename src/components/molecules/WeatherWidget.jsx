import React from "react"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const WeatherWidget = ({ weather }) => {
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'Sun'
      case 'cloudy':
      case 'overcast':
        return 'Cloud'
      case 'rainy':
      case 'rain':
        return 'CloudRain'
      case 'thunderstorm':
        return 'Zap'
      default:
        return 'CloudSun'
    }
  }

  if (!weather) {
    return (
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
            <ApperIcon name="CloudSun" size={32} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold devanagari-text">
              हवामान माहिती
            </h3>
            <p className="text-sm text-gray-600 devanagari-text font-body">
              डेटा लोड होत आहे...
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center">
            <ApperIcon 
              name={getWeatherIcon(weather.condition)} 
              size={32} 
              className="text-blue-700" 
            />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-blue-900">
              {weather.temperature}°C
            </h3>
            <p className="text-blue-700 devanagari-text font-body font-medium">
              {weather.location}
            </p>
            <p className="text-blue-600 devanagari-text font-body text-sm">
              {weather.condition}
            </p>
          </div>
        </div>
        
        <div className="text-right space-y-1">
          <div className="flex items-center text-blue-700">
            <ApperIcon name="Droplets" size={16} className="mr-1" />
            <span className="text-sm devanagari-text font-body">
              {weather.humidity}%
            </span>
          </div>
          <div className="flex items-center text-blue-700">
            <ApperIcon name="Wind" size={16} className="mr-1" />
            <span className="text-sm devanagari-text font-body">
              {weather.windSpeed} km/h
            </span>
          </div>
          <div className="flex items-center text-blue-700">
            <ApperIcon name="CloudRain" size={16} className="mr-1" />
            <span className="text-sm devanagari-text font-body">
              {weather.rainfall}mm
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-blue-600 devanagari-text font-body text-center">
          शेवटची अपडेट: {new Date(weather.lastUpdated).toLocaleString('mr-IN')}
        </p>
      </div>
    </Card>
  )
}

export default WeatherWidget