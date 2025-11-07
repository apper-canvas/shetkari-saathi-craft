import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, MapPin, Calendar } from 'lucide-react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { marketService } from '@/services/api/marketService';
import LoadingFallback from '@/components/ui/Loading';
import { cn } from '@/utils/cn';

const MarketPrices = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'सभी', name_en: 'All' },
    { id: 'cereals', name: 'अनाज', name_en: 'Cereals' },
    { id: 'vegetables', name: 'सब्जी', name_en: 'Vegetables' },
    { id: 'pulses', name: 'दालें', name_en: 'Pulses' },
    { id: 'spices', name: 'मसाले', name_en: 'Spices' }
  ];

  useEffect(() => {
    loadMarketPrices();
  }, []);

const loadMarketPrices = async () => {
    try {
      setLoading(true);
      const data = await marketService.getAll();
      setMarketData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load market prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = selectedCategory === 'all' 
    ? marketData 
    : marketData.filter(item => item.category === selectedCategory);

  const getPriceColor = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getPriceIcon = (change) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-primary devanagari-text">
                बाजार भाव
              </h1>
              <div className="flex items-center mt-1">
                <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                <p className="text-sm text-gray-600 font-body devanagari-text">
                  मुंबई मंडी
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={loadMarketPrices}>
              <RefreshCw className="w-4 h-4 mr-2" />
              रीफ्रेश
            </Button>
          </div>
          {lastUpdated && (
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              अंतिम अपडेट: {lastUpdated.toLocaleString('hi-IN')}
            </div>
          )}
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

        {/* Market Summary */}
        <Card className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
          <div className="p-4">
            <h3 className="font-display text-lg font-semibold devanagari-text mb-3">
              आज का बाजार सारांश
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">₹2,450</div>
                <div className="text-green-100 text-sm font-body devanagari-text">
                  औसत मूल्य
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-2xl font-bold">
                  <TrendingUp className="w-6 h-6 mr-1" />
                  +5.2%
                </div>
                <div className="text-green-100 text-sm font-body devanagari-text">
                  कुल वृद्धि
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24</div>
                <div className="text-green-100 text-sm font-body devanagari-text">
                  वस्तुएं
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Price List */}
        <div className="space-y-3">
          {filteredData.map((item, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-200">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-body font-semibold text-gray-800 devanagari-text">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.name_en}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">
                      ₹{item.price}
                    </div>
                    <div className="text-xs text-gray-500">
                      प्रति {item.unit}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {item.grade || 'A ग्रेड'}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {item.market || 'मुख्य मंडी'}
                    </span>
                  </div>
                  
                  <div className={cn(
                    "flex items-center space-x-1 text-sm font-medium",
                    getPriceColor(item.change)
                  )}>
                    {getPriceIcon(item.change)}
                    <span>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                  </div>
                </div>

                {item.trend && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>7 दिन का रुझान:</span>
                      <span className={cn(
                        "font-medium",
                        item.trend === 'up' ? 'text-green-600' : 
                        item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      )}>
                        {item.trend === 'up' ? '↗️ बढ़ रहा' : 
                         item.trend === 'down' ? '↘️ घट रहा' : '→ स्थिर'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredData.length === 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border-0">
            <div className="p-8 text-center">
              <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 devanagari-text">
                कोई डेटा उपलब्ध नहीं
              </h3>
              <p className="text-gray-500 mt-2 font-body devanagari-text">
                इस श्रेणी में अभी कोई मूल्य जानकारी नहीं है
              </p>
            </div>
          </Card>
        )}

        {/* Disclaimer */}
        <Card className="mt-6 bg-yellow-50 border border-yellow-200">
          <div className="p-4">
            <p className="text-sm text-yellow-800 font-body devanagari-text">
              <strong>नोट:</strong> ये मूल्य केवल संदर्भ के लिए हैं। वास्तविक बिक्री से पहले स्थानीय मंडी से पुष्टि करें।
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;