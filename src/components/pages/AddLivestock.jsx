import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'
import { livestockService } from '@/services/api/livestockService'

function AddLivestock() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    weight: '',
    healthStatus: 'healthy',
    location: '',
    notes: ''
  })

  function handleInputChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function calculateAge(birthDate) {
    if (!birthDate) return ''
    const birth = new Date(birthDate)
    const now = new Date()
    const diffTime = Math.abs(now - birth)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 30) {
      return `${diffDays} दिन`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} महिने`
    } else {
      const years = Math.floor(diffDays / 365)
      return `${years} वर्ष`
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    if (!formData.name || !formData.species || !formData.breed || !formData.birthDate) {
      toast.error('कृपया सर्व आवश्यक माहिती भरा')
      return
    }

    if (new Date(formData.birthDate) > new Date()) {
      toast.error('जन्म तारीख भविष्यात असू शकत नाही')
      return
    }

    setLoading(true)
    try {
      const livestockData = {
        ...formData,
        weight: parseFloat(formData.weight) || 0,
        age: calculateAge(formData.birthDate),
        addedDate: new Date().toISOString()
      }
      
      await livestockService.addLivestock(livestockData)
      toast.success('पशुधन यशस्वीरित्या जोडले गेले!')
      navigate('/livestock')
    } catch (error) {
      console.error('Error adding livestock:', error)
      toast.error('पशुधन जोडताना त्रुटी झाली')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-white/50 transition-colors"
          >
            <ApperIcon icon="ArrowLeft" size={24} className="text-primary" />
          </button>
          <h1 className="text-xl font-display font-semibold text-primary">
            नवीन पशुधन जोडा
          </h1>
          <div className="w-10" />
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पशुचे नाव *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="उदा. गाय १, बैल २"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                प्रकार *
              </label>
              <select
                name="species"
                value={formData.species}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">प्रकार निवडा</option>
                <option value="cow">गाय</option>
                <option value="buffalo">म्हैस</option>
                <option value="bull">बैल</option>
                <option value="goat">बकरी</option>
                <option value="sheep">मेंढी</option>
                <option value="chicken">कोंबडी</option>
                <option value="pig">डुक्कर</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                जात *
              </label>
              <Input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                placeholder="उदा. गिर, होल्स्टीन"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                जन्म तारीख *
              </label>
              <Input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                max={new Date().toISOString().split('T')[0]}
                required
              />
              {formData.birthDate && (
                <p className="text-xs text-gray-500 mt-1">
                  वय: {calculateAge(formData.birthDate)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                वजन (किलो)
              </label>
              <Input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="उदा. 450"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                आरोग्य स्थिती
              </label>
              <select
                name="healthStatus"
                value={formData.healthStatus}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="healthy">निरोगी</option>
                <option value="sick">आजारी</option>
                <option value="recovering">बरे होत आहे</option>
                <option value="pregnant">गरोदर</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                स्थान
              </label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="उदा. गोठा १, शेड ए"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                टिप्पण्या
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="अतिरिक्त माहिती..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                रद्द करा
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'जोडत आहे...' : 'जोडा'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default AddLivestock