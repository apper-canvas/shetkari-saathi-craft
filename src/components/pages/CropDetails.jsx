import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import { cropService } from "@/services/api/cropService"
import { format, differenceInDays } from "date-fns"

const CropDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [crop, setCrop] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadCrop = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await cropService.getById(id)
      setCrop(data)
    } catch (err) {
      console.error("Error loading crop:", err)
      setError("पिकाची माहिती लोड करताना समस्या आली आहे")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCrop()
  }, [id])

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

  const getTaskIcon = (type) => {
    switch (type) {
      case 'fertilizer': return 'Beaker'
      case 'pesticide': return 'Bug'
      case 'irrigation': return 'Droplets'
      case 'harvest': return 'Scissors'
      case 'weeding': return 'Leaf'
      case 'preparation': return 'Shovel'
      default: return 'FileText'
    }
  }

  if (loading) return <Loading />
  if (error) return <ErrorView message={error} onRetry={loadCrop} />
  if (!crop) return <ErrorView message="पीक सापडली नाही" />

  const daysToHarvest = getDaysToHarvest(crop.expectedHarvest)

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/crops')}
        >
          <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
          परत
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toast.info("संपादन सुविधा लवकरच येईल")}
        >
          <ApperIcon name="Edit" size={16} />
        </Button>
      </div>

      {/* Crop Header */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center">
              <ApperIcon name="Sprout" size={28} className="text-green-700" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-green-900 devanagari-text">
                {crop.name}
              </h1>
              <p className="text-green-700 devanagari-text font-body">
                {crop.variety} • {crop.area} {crop.unit}
              </p>
            </div>
          </div>
          <Badge variant={getStageColor(crop.stage)}>
            {crop.stage}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center text-green-600">
              <ApperIcon name="Calendar" size={16} className="mr-2" />
              <span className="text-sm devanagari-text font-body font-medium">
                लागवड दिनांक
              </span>
            </div>
            <p className="text-green-800 font-medium">
              {format(new Date(crop.plantingDate), 'dd MMMM yyyy', { locale: 'mr' })}
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center text-green-600">
              <ApperIcon name="Harvest" size={16} className="mr-2" />
              <span className="text-sm devanagari-text font-body font-medium">
                कापणीपर्यंत
              </span>
            </div>
            <p className="text-green-800 font-medium">
              {daysToHarvest > 0 ? `${daysToHarvest} दिवस` : 'संपली'}
            </p>
          </div>
        </div>
      </Card>

      {/* Irrigation Schedule */}
      {crop.irrigationSchedule && crop.irrigationSchedule.length > 0 && (
        <Card className="p-4 mb-6">
          <h2 className="text-lg font-display font-semibold devanagari-text mb-4 flex items-center">
            <ApperIcon name="Droplets" size={20} className="mr-2 text-blue-600" />
            सिंचन वेळापत्रक
          </h2>
          {crop.irrigationSchedule.map((schedule, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-600 devanagari-text font-body">
                    पद्धत
                  </p>
                  <p className="font-medium text-blue-900 devanagari-text">
                    {schedule.method}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-600 devanagari-text font-body">
                    वारंवारता
                  </p>
                  <p className="font-medium text-blue-900">
                    {schedule.frequency} दिवसांनी
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-600 devanagari-text font-body">
                    कालावधी
                  </p>
                  <p className="font-medium text-blue-900">
                    {schedule.duration} तास
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-600 devanagari-text font-body">
                    पुढील वेळा
                  </p>
                  <p className="font-medium text-blue-900">
                    {schedule.nextScheduled ? 
                      format(new Date(schedule.nextScheduled), 'dd/MM') : 
                      'निश्चित नाही'
                    }
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* Notes/History */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold devanagari-text flex items-center">
            <ApperIcon name="FileText" size={20} className="mr-2 text-gray-600" />
            टिपा आणि नोंदी
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info("नवीन नोंद जोडण्याची सुविधा लवकरच येईल")}
          >
            <ApperIcon name="Plus" size={14} className="mr-1" />
            नवीन नोंद
          </Button>
        </div>

        {crop.notes && crop.notes.length > 0 ? (
          <div className="space-y-3">
            {crop.notes.map((note, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <ApperIcon 
                      name={getTaskIcon(note.type)} 
                      size={14} 
                      className="text-gray-600" 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 devanagari-text font-body">
                      {note.note}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {format(new Date(note.date), 'dd MMMM yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <ApperIcon name="FileText" size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 devanagari-text font-body">
              अजून कोणत्या नोंदी नाहीत
            </p>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="primary"
          onClick={() => toast.success("पाणी दिल्याची नोंद केली!")}
        >
          <ApperIcon name="Droplets" size={16} className="mr-2" />
          पाणी दिले
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.info("कार्य जोडण्याची सुविधा लवकरच येईल")}
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          कार्य जोडा
        </Button>
      </div>
    </div>
  )
}

export default CropDetails