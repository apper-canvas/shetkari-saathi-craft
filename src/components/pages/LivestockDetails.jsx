import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import ErrorView from '@/components/ui/ErrorView'
import { livestockService } from '@/services/api/livestockService'
import { format, differenceInYears, differenceInMonths } from 'date-fns'

export default function LivestockDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [animal, setAnimal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadAnimalDetails()
  }, [id])

  async function loadAnimalDetails() {
    try {
      setLoading(true)
      setError(null)
      const data = await livestockService.getById(id)
      setAnimal(data)
    } catch (err) {
      console.error('Error loading animal details:', err)
      setError('पशु की जानकारी लोड नहीं हो सकी')
      toast.error('पशु की जानकारी लोड करने में त्रुटि')
    } finally {
      setLoading(false)
    }
  }

  function getAnimalIcon(type) {
    const icons = {
      cow: 'beef',
      buffalo: 'beef',
      goat: 'sheep',
      sheep: 'sheep',
      chicken: 'bird',
      duck: 'bird'
    }
    return icons[type?.toLowerCase()] || 'pet'
  }

  function getHealthStatusColor(status) {
    const colors = {
      excellent: 'bg-green-100 text-green-800 border-green-200',
      good: 'bg-blue-100 text-blue-800 border-blue-200',
      fair: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      poor: 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[status?.toLowerCase()] || colors.fair
  }

  function getHealthStatusText(status) {
    const statusText = {
      excellent: 'उत्कृष्ट',
      good: 'अच्छा',
      fair: 'ठीक',
      poor: 'चिंताजनक'
    }
    return statusText[status?.toLowerCase()] || 'ठीक'
  }

  function getAge(birthDate) {
    if (!birthDate) return 'अज्ञात'
    
    const birth = new Date(birthDate)
    const years = differenceInYears(new Date(), birth)
    const months = differenceInMonths(new Date(), birth) % 12
    
    if (years > 0) {
      return months > 0 ? `${years} साल ${months} महीने` : `${years} साल`
    }
    return months > 0 ? `${months} महीने` : 'नया जन्मा'
  }

  function handleEdit() {
    navigate(`/livestock/edit/${id}`)
  }

  async function handleDelete() {
    if (!confirm('क्या आप वाकई इस पशु की जानकारी हटाना चाहते हैं?')) {
      return
    }

    try {
      await livestockService.delete(id)
      toast.success('पशु की जानकारी सफलतापूर्वक हटा दी गई')
      navigate('/livestock')
    } catch (err) {
      console.error('Error deleting animal:', err)
      toast.error('पशु की जानकारी हटाने में त्रुटि')
    }
  }

  function handleBack() {
    navigate('/livestock')
  }

  if (loading) {
    return <Loading message="पशु की जानकारी लोड हो रही है..." />
  }

  if (error) {
    return (
      <ErrorView 
        message={error}
        onRetry={loadAnimalDetails}
      />
    )
  }

  if (!animal) {
    return (
      <div className="p-4">
        <Card className="text-center py-12">
          <ApperIcon name="alert-circle" size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">पशु नहीं मिला</h3>
          <p className="text-gray-500 mb-4">यह पशु उपलब्ध नहीं है या हटा दिया गया है।</p>
          <Button onClick={handleBack} variant="outline">
            वापस जाएं
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 pb-20 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={handleBack}
          className="flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          <ApperIcon name="arrow-left" size={20} className="mr-1" />
          वापस
        </button>
        <h1 className="text-xl font-semibold text-gray-800">पशु विवरण</h1>
        <div className="w-16"></div>
      </div>

      {/* Animal Overview */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <ApperIcon name={getAnimalIcon(animal.type)} size={128} />
        </div>
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full bg-primary/10">
                <ApperIcon 
                  name={getAnimalIcon(animal.type)} 
                  size={32} 
                  className="text-primary" 
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{animal.name}</h2>
                <p className="text-gray-600 capitalize">{animal.type} • {animal.breed}</p>
              </div>
            </div>
            
            <Badge className={getHealthStatusColor(animal.healthStatus)}>
              {getHealthStatusText(animal.healthStatus)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">उम्र</p>
              <p className="text-lg font-semibold text-gray-800">{getAge(animal.birthDate)}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">वजन</p>
              <p className="text-lg font-semibold text-gray-800">{animal.weight} किलो</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Details */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">विस्तृत जानकारी</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">जन्म तिथि</span>
            <span className="font-medium text-gray-800">
              {animal.birthDate ? format(new Date(animal.birthDate), 'dd MMM yyyy') : 'अज्ञात'}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">नस्ल</span>
            <span className="font-medium text-gray-800 capitalize">{animal.breed}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">लिंग</span>
            <span className="font-medium text-gray-800">
              {animal.gender === 'male' ? 'नर' : animal.gender === 'female' ? 'मादा' : 'अज्ञात'}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">खरीदारी मूल्य</span>
            <span className="font-medium text-gray-800">₹{animal.purchasePrice?.toLocaleString() || 'N/A'}</span>
          </div>
          
          {animal.lastVaccination && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">अंतिम टीकाकरण</span>
              <span className="font-medium text-gray-800">
                {format(new Date(animal.lastVaccination), 'dd MMM yyyy')}
              </span>
            </div>
          )}
          
          {animal.notes && (
            <div className="py-2">
              <span className="text-gray-600 block mb-2">टिप्पणियां</span>
              <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{animal.notes}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">क्रियाएं</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={handleEdit} variant="outline" className="flex items-center justify-center space-x-2">
            <ApperIcon name="edit" size={18} />
            <span>संपादित करें</span>
          </Button>
          
          <Button 
            onClick={handleDelete} 
            variant="outline" 
            className="flex items-center justify-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            <ApperIcon name="trash-2" size={18} />
            <span>हटाएं</span>
          </Button>
        </div>
      </Card>

      {/* Health Monitoring */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">स्वास्थ्य निगरानी</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <ApperIcon name="heart" size={20} className="text-blue-600" />
              <span className="font-medium text-blue-800">स्वास्थ्य जांच</span>
            </div>
            <Button size="sm" variant="outline">शेड्यूल करें</Button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <ApperIcon name="shield" size={20} className="text-green-600" />
              <span className="font-medium text-green-800">टीकाकरण</span>
            </div>
            <Button size="sm" variant="outline">अपडेट करें</Button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <ApperIcon name="activity" size={20} className="text-orange-600" />
              <span className="font-medium text-orange-800">वजन ट्रैकिंग</span>
            </div>
            <Button size="sm" variant="outline">रिकॉर्ड करें</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}