import React from 'react';
import { X, Home, Star, Clock, Settings, HelpCircle, Phone, User, MapPin } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Star, label: 'Favorites' },
    { icon: Clock, label: 'Schedules' },
    { icon: MapPin, label: 'Nearby Stops' },
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: Phone, label: 'Contact Us' }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose}></div>
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Welcome User</h3>
              <p className="text-sm text-gray-600">Tier 2 City, India</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4">
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    item.active 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-gray-800 mb-2">Language / भाषा</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg bg-white border text-sm font-medium text-blue-600">
                English
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:border text-sm text-gray-600">
                हिंदी (Hindi)
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}