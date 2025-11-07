import React, { useState, useEffect } from 'react';
import { FileText, Users, DollarSign, Calendar, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { governmentService } from '@/services/api/governmentService';
import Loading from '@/components/ui/Loading';
import { cn } from '@/utils/cn';

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'सभी योजनाएं' },
    { id: 'subsidy', name: 'सब्सिडी' },
    { id: 'insurance', name: 'बीमा' },
    { id: 'loan', name: 'लोन' },
    { id: 'equipment', name: 'उपकरण' },
    { id: 'training', name: 'प्रशिक्षण' }
  ];

  useEffect(() => {
    loadSchemes();
  }, []);

const loadSchemes = async () => {
    try {
      setLoading(true);
      const data = await governmentService.getAll();
      setSchemes(data);
    } catch (error) {
      console.error('Failed to load schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemes = selectedCategory === 'all' 
    ? schemes 
    : schemes.filter(scheme => scheme.category === selectedCategory);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'ending_soon': return 'bg-yellow-500 text-white';
      case 'closed': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'सक्रिय';
      case 'ending_soon': return 'शीघ्र समाप्त';
      case 'closed': return 'बंद';
      default: return 'अज्ञात';
    }
  };

  const getEligibilityIcon = (eligible) => {
    return eligible ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <AlertCircle className="w-4 h-4 text-red-600" />
    );
  };

if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-display font-bold text-primary devanagari-text">
            सरकारी योजनाएं
          </h1>
          <p className="text-sm text-gray-600 mt-1 font-body devanagari-text">
            किसानों के लिए सरकारी सहायता
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              size="sm"
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
            <div className="p-4 text-center">
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{schemes.length}</div>
              <div className="text-green-100 text-xs font-body devanagari-text">
                कुल योजनाएं
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0">
            <div className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{schemes.filter(s => s.status === 'active').length}</div>
              <div className="text-blue-100 text-xs font-body devanagari-text">
                सक्रिय योजनाएं
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0">
            <div className="p-4 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2" />
              <div className="text-lg font-bold">₹50L+</div>
              <div className="text-purple-100 text-xs font-body devanagari-text">
                कुल लाभ
              </div>
            </div>
          </Card>
        </div>

        {/* Schemes List */}
        <div className="space-y-4">
          {filteredSchemes.map((scheme, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-200">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-body font-semibold text-gray-800 devanagari-text leading-tight">
                      {scheme.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 font-body devanagari-text">
                      {scheme.department}
                    </p>
                  </div>
                  <Badge className={cn(getStatusColor(scheme.status), 'text-xs')}>
                    {getStatusText(scheme.status)}
                  </Badge>
                </div>

                <p className="text-sm text-gray-700 mb-4 font-body devanagari-text leading-relaxed">
                  {scheme.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="font-body devanagari-text">लाभ राशि</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      {scheme.benefit_amount}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="font-body devanagari-text">आवेदन अंतिम तिथि</span>
                    </div>
                    <div className="text-sm font-medium text-gray-800">
                      {scheme.deadline}
                    </div>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2 font-body devanagari-text">
                    पात्रता:
                  </div>
                  <div className="space-y-1">
                    {scheme.eligibility?.map((criteria, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        {getEligibilityIcon(criteria.meets)}
                        <span className="ml-2 font-body devanagari-text text-gray-700">
                          {criteria.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                {scheme.documents && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2 font-body devanagari-text">
                      आवश्यक दस्तावेज:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {scheme.documents.map((doc, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <Button size="sm" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    आवेदन करें
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    विवरण देखें
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border-0">
            <div className="p-8 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 devanagari-text">
                कोई योजना उपलब्ध नहीं
              </h3>
              <p className="text-gray-500 mt-2 font-body devanagari-text">
                इस श्रेणी में अभी कोई योजना नहीं है
              </p>
            </div>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-6 bg-blue-50 border border-blue-200">
          <div className="p-4">
            <h3 className="font-body font-semibold text-blue-800 devanagari-text mb-2">
              सहायता चाहिए?
            </h3>
            <p className="text-sm text-blue-700 font-body devanagari-text mb-3">
              योजना आवेदन में सहायता के लिए नजदीकी कृषि कार्यालय से संपर्क करें।
            </p>
            <Button size="sm" variant="outline">
              हेल्पलाइन: 1800-123-4567
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentSchemes;