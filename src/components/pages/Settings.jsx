import React, { useState } from 'react';
import { User, Bell, Globe, Shield, Smartphone, HelpCircle, Info, ChevronRight, Toggle } from 'lucide-react';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import { cn } from '@/utils/cn';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    weather: true,
    market: true,
    tasks: false,
    schemes: true
  });
  
  const [language, setLanguage] = useState('hi');
  const [theme, setTheme] = useState('light');

  const settingsSections = [
    {
      title: 'खाता सेटिंग्स',
      icon: User,
      items: [
        {
          title: 'प्रोफाइल संपादित करें',
          subtitle: 'व्यक्तिगत जानकारी बदलें',
          action: 'navigate',
          path: '/profile'
        },
        {
          title: 'खेती की जानकारी',
          subtitle: 'फसल और खेत का विवरण',
          action: 'navigate',
          path: '/farm-info'
        }
      ]
    },
    {
      title: 'नोटिफिकेशन',
      icon: Bell,
      items: [
        {
          title: 'मौसम अलर्ट',
          subtitle: 'मौसम की चेतावनी',
          action: 'toggle',
          key: 'weather',
          enabled: notifications.weather
        },
        {
          title: 'बाजार भाव',
          subtitle: 'मूल्य अपडेट',
          action: 'toggle',
          key: 'market',
          enabled: notifications.market
        },
        {
          title: 'कार्य रिमाइंडर',
          subtitle: 'खेती के कार्य',
          action: 'toggle',
          key: 'tasks',
          enabled: notifications.tasks
        },
        {
          title: 'सरकारी योजनाएं',
          subtitle: 'नई योजनाओं की जानकारी',
          action: 'toggle',
          key: 'schemes',
          enabled: notifications.schemes
        }
      ]
    },
    {
      title: 'ऐप सेटिंग्स',
      icon: Smartphone,
      items: [
        {
          title: 'भाषा',
          subtitle: language === 'hi' ? 'हिंदी' : 'English',
          action: 'select',
          options: [
            { value: 'hi', label: 'हिंदी' },
            { value: 'en', label: 'English' }
          ]
        },
        {
          title: 'थीम',
          subtitle: theme === 'light' ? 'Light' : 'Dark',
          action: 'select',
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' }
          ]
        }
      ]
    },
    {
      title: 'सहायता और जानकारी',
      icon: HelpCircle,
      items: [
        {
          title: 'सहायता केंद्र',
          subtitle: 'सामान्य प्रश्न और मदद',
          action: 'navigate',
          path: '/help'
        },
        {
          title: 'संपर्क करें',
          subtitle: 'सहायता के लिए संपर्क करें',
          action: 'navigate',
          path: '/contact'
        },
        {
          title: 'ऐप के बारे में',
          subtitle: 'संस्करण और जानकारी',
          action: 'navigate',
          path: '/about'
        },
        {
          title: 'प्राइवेसी पॉलिसी',
          subtitle: 'गोपनीयता नीति',
          action: 'navigate',
          path: '/privacy'
        }
      ]
    }
  ];

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    // Here you would implement language change logic
  };

  const handleThemeChange = (value) => {
    setTheme(value);
    // Here you would implement theme change logic
  };

  const renderSettingItem = (item, sectionIndex, itemIndex) => {
    switch (item.action) {
      case 'toggle':
        return (
          <div 
            key={`${sectionIndex}-${itemIndex}`}
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150"
            onClick={() => handleToggle(item.key)}
          >
            <div className="flex-1">
              <h4 className="font-body font-medium text-gray-800 devanagari-text">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 font-body devanagari-text">
                {item.subtitle}
              </p>
            </div>
            <div className={cn(
              "w-12 h-6 rounded-full transition-colors duration-200 relative cursor-pointer",
              item.enabled ? 'bg-primary' : 'bg-gray-300'
            )}>
              <div className={cn(
                "w-5 h-5 rounded-full bg-white transition-transform duration-200 absolute top-0.5",
                item.enabled ? 'translate-x-6' : 'translate-x-0.5'
              )} />
            </div>
          </div>
        );

      case 'select':
        return (
          <div 
            key={`${sectionIndex}-${itemIndex}`}
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex-1">
              <h4 className="font-body font-medium text-gray-800 devanagari-text">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 font-body devanagari-text">
                {item.subtitle}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        );

      default:
        return (
          <div 
            key={`${sectionIndex}-${itemIndex}`}
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex-1">
              <h4 className="font-body font-medium text-gray-800 devanagari-text">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 font-body devanagari-text">
                {item.subtitle}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-display font-bold text-primary devanagari-text">
            सेटिंग्स
          </h1>
          <p className="text-sm text-gray-600 mt-1 font-body devanagari-text">
            ऐप की सेटिंग्स और प्राथमिकताएं
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Profile Summary */}
        <Card className="mb-6 bg-gradient-to-r from-primary to-secondary text-white border-0">
          <div className="p-4">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mr-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold devanagari-text">
                  राज पटेल
                </h3>
                <p className="text-green-100 text-sm font-body devanagari-text">
                  किसान • महाराष्ट्र
                </p>
                <p className="text-green-100 text-xs mt-1">
                  raj.patel@example.com
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => {
            const IconComponent = section.icon;
            return (
              <Card key={sectionIndex} className="bg-white/80 backdrop-blur-sm border-0 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center">
                    <IconComponent className="w-5 h-5 text-primary mr-2" />
                    <h3 className="font-body font-semibold text-gray-800 devanagari-text">
                      {section.title}
                    </h3>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {section.items.map((item, itemIndex) => 
                    renderSettingItem(item, sectionIndex, itemIndex)
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* App Version */}
        <Card className="mt-6 bg-white/60 backdrop-blur-sm border-0">
          <div className="p-4 text-center">
            <Info className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 font-body devanagari-text">
              शेतकारी साथी - संस्करण 1.0.0
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Made with ❤️ for Indian Farmers
            </p>
          </div>
        </Card>

        {/* Logout Button */}
        <Card className="mt-4 bg-red-50 border border-red-200">
          <div className="p-4">
            <Button 
              variant="outline" 
              className="w-full text-red-600 border-red-300 hover:bg-red-100"
            >
              लॉग आउट
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;