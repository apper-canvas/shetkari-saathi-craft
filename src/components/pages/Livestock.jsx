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
import { livestockService } from "@/services/api/livestockService"
import { format, differenceInYears, differenceInMonths } from "date-fns"

const Livestock = () => {
  const navigate = useNavigate()
  const [livestock, setLivestock] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadLivestock = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await livestockService.getAll()
      setLivestock(data)
    } catch (err) {
      console.error("Error loading livestock:", err)
      setError("जनावरांची माहिती लोड करताना समस्या आली आहे")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLivestock()
  }, [])

  const getAnimalIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'गाय':
        return 'Cow'
      case 'म्हैस':
        return 'Cow'
      case 'बैल':
        return 'Cow'
      default:
        return 'Cow'
    }
  }

  const getHealthStatus = (animal) => {
    const now = new Date()
    const hasRecentVaccination = animal.vaccinations?.some(v => {
      const vacDate = new Date(v.date)
      const monthsAgo = differenceInMonths(now, vacDate)
      return monthsAgo <= 6
    })

    const hasRecentHealthIssue = animal.healthRecords?.some(h => {
      const recordDate = new Date(h.date)
      const monthsAgo = differenceInMonths(now, recordDate)
      return monthsAgo <= 1 && h.issue !== 'नियमित तपासणी'
    })

    if (hasRecentHealthIssue) return { status: 'तुत्मित तपासणी', variant: 'warning' }
    if (hasRecentVaccination) return { status: 'चांगली', variant: 'success' }
    return { status: 'सामान्य', variant: 'secondary' }
  }

  const getAge = (birthDate) => {
    const years = differenceInYears(new Date(), new Date(birthDate))
    const months = differenceInMonths(new Date(), new Date(birthDate)) % 12
    
    if (years > 0) {
      return `${years} वर्ष ${months} महिने`
    } else {
      return `${months} महिने`
    }
  }

  const handleAnimalClick = (animalId) => {
    navigate(`/livestock/${animalId}`)
  }

  const handleAddAnimal = () => {
    navigate('/add-livestock')
  }

  if (loading) return <Loading />
  if (error) return <ErrorView message={error} onRetry={loadLivestock} />

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 devanagari-text">
            पशुधन व्यवस्थापन
          </h1>
          <p className="text-gray-600 devanagari-text font-body">
            {livestock.length} जनावरे
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleAddAnimal}
          className="h-10 w-10 p-0 rounded-full"
        >
          <ApperIcon name="Plus" size={20} />
        </Button>
      </div>

      {livestock.length === 0 ? (
        <Empty
          title="अजून कोणतेही जनावर नाहीत"
          description="तुमचे पहिले जनावर जोडा आणि व्यवस्थापन सुरू करा"
          actionLabel="पहिले जनावर जोडा"
          onAction={handleAddAnimal}
          icon="Cow"
        />
      ) : (
        <div className="space-y-4">
          {livestock.map((animal) => {
            const healthStatus = getHealthStatus(animal)
            
            return (
              <Card 
                key={animal.Id} 
                className="p-4 hover:shadow-md transition-all"
                onClick={() => handleAnimalClick(animal.Id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                      <ApperIcon 
                        name={getAnimalIcon(animal.type)} 
                        size={20} 
                        className="text-orange-600" 
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg devanagari-text">
                        {animal.name}
                      </h3>
                      <p className="text-gray-600 devanagari-text font-body text-sm">
                        {animal.type} • {animal.breed}
                      </p>
                    </div>
                  </div>
                  <Badge variant={healthStatus.variant}>
                    {healthStatus.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-gray-600">
                      <ApperIcon name="Calendar" size={14} className="mr-2" />
                      <span className="text-sm devanagari-text font-body">
                        वय
                      </span>
                    </div>
                    <p className="text-sm font-medium devanagari-text">
                      {getAge(animal.birthDate)}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center text-gray-600">
                      <ApperIcon name="Users" size={14} className="mr-2" />
                      <span className="text-sm devanagari-text font-body">
                        लिंग
                      </span>
                    </div>
                    <p className="text-sm font-medium devanagari-text">
                      {animal.gender}
                    </p>
                  </div>
                </div>

                {/* Breeding Info */}
                {animal.breedingInfo?.pregnancyStatus && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <ApperIcon name="Heart" size={14} className="text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800 devanagari-text">
                        {animal.breedingInfo.pregnancyStatus}
                      </span>
                      {animal.breedingInfo.expectedDelivery && (
                        <span className="text-sm text-green-600 ml-2 devanagari-text">
                          • अपेक्षित: {format(new Date(animal.breedingInfo.expectedDelivery), 'dd/MM/yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Vaccination Status */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <ApperIcon name="Shield" size={14} className="mr-2" />
                    <span className="text-sm devanagari-text font-body">
                      लसीकरण: {animal.vaccinations?.length || 0} पूर्ण
                    </span>
                  </div>
                  <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
                </div>
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
          onClick={handleAddAnimal}
        >
          <ApperIcon name="Plus" size={24} />
        </Button>
      </div>
    </div>
  )
}

export default Livestock