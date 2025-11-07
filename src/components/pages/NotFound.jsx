import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, MapPin } from 'lucide-react';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';

const NotFound = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: 'होम पेज',
      subtitle: 'मुख्य डैशबोर्ड पर जाएं',
      icon: Home,
      path: '/',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'फसल प्रबंधन',
      subtitle: 'अपनी फसलों को देखें',
      icon: Search,
      path: '/crops',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'पशु प्रबंधन',
      subtitle: 'पशुओं की जानकारी',
      icon: MapPin,
      path: '/livestock',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Error Content */}
        <Card className="text-center mb-6 bg-white/80 backdrop-blur-sm border-0">
          <div className="p-8">
            {/* Large 404 */}
            <div className="text-8xl font-bold text-red-200 mb-4">
              404
            </div>
            
            {/* Error Message */}
            <h1 className="text-2xl font-display font-bold text-gray-800 mb-2 devanagari-text">
              पेज नहीं मिला
            </h1>
            <p className="text-gray-600 mb-6 font-body devanagari-text">
              क्षमा करें, आपके द्वारा खोजा गया पेज उपलब्ध नहीं है। यह हटा दिया गया या स्थानांतरित किया गया हो सकता है।
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleGoBack}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                वापस जाएं
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleNavigate('/')}
                className="w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                होम पेज
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Navigation */}
        <Card className="bg-white/60 backdrop-blur-sm border-0">
          <div className="p-4">
            <h3 className="font-body font-semibold text-gray-800 devanagari-text mb-4 text-center">
              त्वरित लिंक्स
            </h3>
            <div className="space-y-2">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleNavigate(link.path)}
                    className="w-full p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${link.bgColor}`}>
                        <IconComponent className={`w-5 h-5 ${link.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-body font-medium text-gray-800 devanagari-text">
                          {link.title}
                        </h4>
                        <p className="text-xs text-gray-500 font-body devanagari-text">
                          {link.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 font-body devanagari-text">
            यदि समस्या बनी रहे तो सहायता केंद्र से संपर्क करें
          </p>
          <Button 
            variant="link" 
            size="sm" 
            className="text-primary mt-2"
            onClick={() => handleNavigate('/help')}
          >
            सहायता केंद्र
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;