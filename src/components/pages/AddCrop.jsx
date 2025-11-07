import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { cropService } from "@/services/api/cropService"

const AddCrop = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    variety: "",
    plantingDate: new Date().toISOString().split('T')[0],
    expectedHarvest: "",
    area: "",
    unit: "एकर",
    stage: "बियाणे पेरणी"
  })
  const [loading, setLoading] = useState(false)

  const cropOptions = [
    "धान", "गहू", "कापूस", "मूग", "ऊस", "तूर", "सोयाबीन", "ज्वार", "बाजरा", "मका"
  ]

  const unitOptions = ["एकर", "गुंठा", "हेक्टर"]
  
  const stageOptions = [
    "बियाणे पेरणी", "वाढीचा काळ", "फुलण्याची अवस्था", 
    "कापणीची तयारी", "कापसा मोडणी", "कापणी संपली"
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateExpectedHarvest = (plantingDate, cropName) => {
    const planting = new Date(plantingDate)
    let daysToAdd = 120 // default

    switch (cropName.toLowerCase()) {
      case 'धान':
        daysToAdd = 120
        break
      case 'गहू':
        daysToAdd = 150
        break
      case 'कापूस':
        daysToAdd = 180
        break
      case 'मूग':
        daysToAdd = 90
        break
      case 'ऊस':
        daysToAdd = 365
        break
      case 'तूर':
        daysToAdd = 150
        break
      case 'सोयाबीन':
        daysToAdd = 100
        break
      default:
        daysToAdd = 120
    }

    planting.setDate(planting.getDate() + daysToAdd)
    return planting.toISOString().split('T')[0]
  }

  React.useEffect(() => {
    if (formData.plantingDate && formData.name) {
      const expectedHarvest = calculateExpectedHarvest(formData.plantingDate, formData.name)
      setFormData(prev => ({
        ...prev,
        expectedHarvest
      }))
    }
  }, [formData.plantingDate, formData.name])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.variety || !formData.area) {
      toast.error("कृपया सर्व आवश्यक माहिती भरा")
      return
    }

    try {
      setLoading(true)
      await cropService.create({
        ...formData,
        area: parseFloat(formData.area)
      })
      toast.success("नवीन पीक यशस्वीरित्या जोडली!")
      navigate('/crops')
    } catch (err) {
      console.error("Error adding crop:", err)
      toast.error("पीक जोडताना समस्या आली")
    } finally {
      setLoading(false)
    }
  }

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
        <h1 className="text-xl font-display font-bold text-gray-900 devanagari-text">
          नवीन पीक जोडा
        </h1>
        <div className="w-16"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-4 mb-6">
          <div className="space-y-4">
            {/* Crop Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 devanagari-text font-body">
                पिकाचे नाव *
              </label>
              <select
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full h-12 px-4 py-3 text-base border rounded-lg bg-white text-gray-900 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 devanagari-text font-body"
                required
              >
                <option value="">पीक निवडा</option>
                {cropOptions.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            {/* Variety */}
            <Input
              label="जात *"
              name="variety"
              value={formData.variety}
              onChange={handleInputChange}
              placeholder="उदा. बासमती, लोक-१"
              required
            />

            {/* Area and Unit */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="क्षेत्रफळ *"
                name="area"
                type="number"
                step="0.1"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="0.0"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 devanagari-text font-body">
                  एकक
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 py-3 text-base border rounded-lg bg-white text-gray-900 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 devanagari-text font-body"
                >
                  {unitOptions.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Planting Date */}
            <Input
              label="लागवड दिनांक *"
              name="plantingDate"
              type="date"
              value={formData.plantingDate}
              onChange={handleInputChange}
              required
            />

            {/* Expected Harvest */}
            <Input
              label="अपेक्षित कापणी"
              name="expectedHarvest"
              type="date"
              value={formData.expectedHarvest}
              onChange={handleInputChange}
              helperText="लागवडीच्या आधारे आपोआप गणना होते"
            />

            {/* Current Stage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 devanagari-text font-body">
                सध्याची अवस्था
              </label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleInputChange}
                className="w-full h-12 px-4 py-3 text-base border rounded-lg bg-white text-gray-900 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 devanagari-text font-body"
              >
                {stageOptions.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/crops')}
          >
            रद्द करा
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                जतन करत आहे...
              </>
            ) : (
              <>
                <ApperIcon name="Check" size={16} className="mr-2" />
                जतन करा
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddCrop