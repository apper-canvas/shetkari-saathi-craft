import React from 'react';
import { NavLink } from 'react-router-dom';
import { Settings, TrendingUp, FileText, Droplets, Bell, User, Globe, HelpCircle, Phone, Star } from 'lucide-react';
import Card from '@/components/atoms/Card';
import { cn } from '@/utils/cn';

const More = () => {
  const menuItems = [
    {
      title: 'सेटिंग्स',
      subtitle: 'ऐप सेटिंग्स और प्राथमिकताएं',
      icon: Settings,
      path: '/settings',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'बाजार भाव',
      subtitle: 'फसलों के वर्तमान मूल्य देखें',
      icon: TrendingUp,
      path: '/market-prices',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'सरकारी योजनाएं',
      subtitle: 'किसान योजनाएं और सब्सिडी',
      icon: FileText,
      path: '/government-schemes',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'सिंचाई प्रबंधन',
      subtitle: 'पानी और सिंचाई का प्रबंधन',
      icon: Droplets,
      path: '/irrigation',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      title: 'मौसम अलर्ट',
      subtitle: 'मौसम की चेतावनी और सूचना',
      icon: Bell,
      path: '/weather-alerts',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'प्रोफाइल',
      subtitle: 'व्यक्तिगत जानकारी संपादित करें',
      icon: User,
      path: '/profile',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'भाषा',
      subtitle: 'हिंदी / English',
      icon: Globe,
      path: '/language',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'सहायता',
      subtitle: 'मदद और सहायता केंद्र',
      icon: HelpCircle,
      path: '/help',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'संपर्क',
      subtitle: 'हमसे संपर्क करें',
      icon: Phone,
      path: '/contact',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      title: 'रेटिंग',
      subtitle: 'ऐप को रेट करें',
      icon: Star,
      path: '/rate-app',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-display font-bold text-primary devanagari-text">
            अधिक सुविधाएं
          </h1>
          <p className="text-sm text-gray-600 mt-1 font-body devanagari-text">
            सभी उपकरण और सेटिंग्स
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Quick Stats */}
        <Card className="mb-6 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold devanagari-text">
                  शेतकारी साथी
                </h3>
                <p className="text-green-100 text-sm font-body devanagari-text">
                  आपका डिजिटल कृषि सहायक
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">v1.0</div>
                <div className="text-green-100 text-xs">Latest</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "block transition-all duration-200 transform hover:scale-105",
                    isActive && "scale-105"
                  )
                }
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 border-0 bg-white/80 backdrop-blur-sm">
                  <div className="p-4 text-center space-y-3">
                    <div className={cn("mx-auto w-12 h-12 rounded-full flex items-center justify-center", item.bgColor)}>
                      <IconComponent className={cn("w-6 h-6", item.color)} />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-gray-800 devanagari-text text-sm leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 font-body devanagari-text leading-tight">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </Card>
              </NavLink>
            );
          })}
        </div>

        {/* App Info */}
        <Card className="mt-6 bg-white/60 backdrop-blur-sm border-0">
          <div className="p-4 text-center">
            <p className="text-sm text-gray-600 font-body devanagari-text">
              भारतीय किसानों के लिए बनाया गया
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Made with ❤️ for Indian Farmers
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default More;