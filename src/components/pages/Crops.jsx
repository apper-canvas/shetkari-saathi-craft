import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import Empty from "@/components/ui/Empty"
import { cropService } from "@/services/api/cropService"
import { format, differenceInDays } from "date-fns"

const Crops = () => {
  const navigate = useNavigate()
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadCrops = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await cropService.getAll()
      setCrops(data)
    } catch (err) {
      console.error("Error loading crops:", err)
      setError("पिकांची माहिती लोड करताना समस्या आली आहे")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCrops()
  }, [])

  const getStageColor = (stage) => {
    switch (stage.toLowerCase()) {
      case 'बियाणे पेरणी':
      case 'लागवड':
        return 'info'
      case 'वाढीचा काळ':
      case 'फुलण्याची अवस्था':
        return 'success'
      case 'कापसा मोडणी':
      case 'कापणीची तयारी':
        return 'warning'
      case 'कापणी संपली':
        return 'secondary'
      default:
        return 'primary'
    }
  }

  const getDaysToHarvest = (expectedHarvest) => {
    const days = differenceInDays(new Date(expectedHarvest), new Date())
    return days
  }

  const handleCropClick = (cropId) => {
    navigate(`/crops/${cropId}`)
  }

  const handleAddCrop = () => {
    navigate('/add-crop')
  }

  if (loading) return <Loading />
  if (error) return <ErrorView message={error} onRetry={loadCrops} />

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 devanagari-text">
            पिकांचे व्यवस्थापन
          </h1>
          <p className="text-gray-600 devanagari-text font-body">
            {crops.length} पिके
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleAddCrop}
          className="h-10 w-10 p-0 rounded-full"
        >
          <ApperIcon name="Plus" size={20} />
        </Button>
      </div>

      {crops.length === 0 ? (
        <Empty
          title="अजून कोणतीही पिके नाहीत"
          description="तुमची पहिली पीक जोडा आणि व्यवस्थापन सुरू करा"
          actionLabel="पहिली पीक जोडा"
          onAction={handleAddCrop}
          icon="Sprout"
        />
      ) : (
        <div className="space-y-4">
          {crops.map((crop) => {
            const daysToHarvest = getDaysToHarvest(crop.expectedHarvest)
            
            return (
              <Card 
                key={crop.Id} 
                className="p-4 hover:shadow-md transition-all"
                onClick={() => handleCropClick(crop.Id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                      <ApperIcon name="Sprout" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg devanagari-text">
                        {crop.name}
                      </h3>
                      <p className="text-gray-600 devanagari-text font-body text-sm">
                        {crop.variety} • {crop.area} {crop.unit}
                      </p>
                    </div>
                  </div>
                  <Badge variant={getStageColor(crop.stage)}>
                    {crop.stage}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-gray-600">
                      <ApperIcon name="Calendar" size={14} className="mr-2" />
                      <span className="text-sm devanagari-text font-body">
                        लागवड
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      {format(new Date(crop.plantingDate), 'dd/MM/yyyy')}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center text-gray-600">
                      <ApperIcon name="Harvest" size={14} className="mr-2" />
                      <span className="text-sm devanagari-text font-body">
                        कापणी अपेक्षित
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      {daysToHarvest > 0 ? `${daysToHarvest} दिवस` : 'संपली'}
                    </p>
                  </div>
                </div>

                {crop.lastWatered && (
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center text-gray-600">
                      <ApperIcon name="Droplets" size={14} className="mr-2" />
                      <span className="text-sm devanagari-text font-body">
                        शेवटचे पाणी: {format(new Date(crop.lastWatered), 'dd/MM')}
                      </span>
                    </div>
                    <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4">
        <Button
          variant="primary"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={handleAddCrop}
        >
          <ApperIcon name="Plus" size={24} />
        </Button>
      </div>
    </div>
  )
}

export default Crops