import React, { useState } from "react";
import { AlertCircle, Calendar, CheckCircle, Clock, Droplets, Settings } from "lucide-react";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const Irrigation = () => {
  const [activeSchedule, setActiveSchedule] = useState(null);

  const irrigationZones = [
    {
      id: 1,
      name: 'गेहूं का खेत',
      crop: 'गेहूं',
      area: '2.5 एकड़',
      status: 'active',
      nextWatering: '2024-01-15 06:00',
      soilMoisture: 45,
      waterNeeded: '500 लीटर',
      lastWatered: '2024-01-13'
    },
    {
      id: 2,
      name: 'धान का खेत',
      crop: 'धान',
      area: '1.8 एकड़',
      status: 'scheduled',
      nextWatering: '2024-01-15 18:00',
      soilMoisture: 65,
      waterNeeded: '800 लीटर',
      lastWatered: '2024-01-14'
    },
    {
      id: 3,
      name: 'सब्जी बगीचा',
      crop: 'मिश्रित सब्जी',
      area: '0.5 एकड़',
      status: 'low_water',
      nextWatering: 'तुरंत आवश्यक',
      soilMoisture: 25,
      waterNeeded: '200 लीटर',
      lastWatered: '2024-01-12'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'low_water': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'सक्रिय';
      case 'scheduled': return 'निर्धारित';
      case 'low_water': return 'पानी कम';
      default: return 'बंद';
    }
  };

  const getMoistureColor = (moisture) => {
    if (moisture >= 60) return 'text-green-600';
    if (moisture >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-cyan-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-primary devanagari-text">
                सिंचाई प्रबंधन
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-body devanagari-text">
                स्मार्ट जल प्रबंधन
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              सेटिंग्स
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0">
            <div className="p-4 text-center">
              <Droplets className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">1,500L</div>
              <div className="text-blue-100 text-sm font-body devanagari-text">
                आज का पानी
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
            <div className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-green-100 text-sm font-body devanagari-text">
                सक्रिय क्षेत्र
              </div>
            </div>
          </Card>
        </div>

        {/* Irrigation Zones */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold text-gray-800 devanagari-text mb-4">
            सिंचाई क्षेत्र
          </h2>
          
          {irrigationZones.map((zone) => (
            <Card key={zone.id} className="bg-white/80 backdrop-blur-sm border-0">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-body font-semibold text-gray-800 devanagari-text">
                      {zone.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-body devanagari-text">
                      {zone.crop} • {zone.area}
                    </p>
                  </div>
                  <Badge className={cn(getStatusColor(zone.status), 'text-white text-xs')}>
                    {getStatusText(zone.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Droplets className="w-4 h-4 mr-1" />
                      <span className="font-body devanagari-text">मिट्टी की नमी</span>
                    </div>
                    <div className={cn("text-lg font-semibold", getMoistureColor(zone.soilMoisture))}>
                      {zone.soilMoisture}%
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="font-body devanagari-text">अगली सिंचाई</span>
                    </div>
                    <div className="text-sm font-medium text-gray-800 devanagari-text">
                      {zone.nextWatering}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className="font-body devanagari-text">
                    पानी की आवश्यकता: <span className="font-semibold text-gray-800">{zone.waterNeeded}</span>
                  </span>
                  <span className="font-body devanagari-text">
                    अंतिम सिंचाई: {zone.lastWatered}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    variant={zone.status === 'low_water' ? 'default' : 'outline'}
                  >
                    <Droplets className="w-4 h-4 mr-2" />
                    अभी सींचें
                  </Button>
                  <Button size="sm" variant="outline">
                    <Clock className="w-4 h-4 mr-2" />
                    शेड्यूल करें
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mt-6 bg-white/60 backdrop-blur-sm border-0">
          <div className="p-4">
            <h3 className="font-body font-semibold text-gray-800 devanagari-text mb-3">
              त्वरित कार्य
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" className="justify-start">
                <AlertCircle className="w-4 h-4 mr-2" />
                अलर्ट सेट करें
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <CheckCircle className="w-4 h-4 mr-2" />
                रिपोर्ट देखें
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Irrigation;