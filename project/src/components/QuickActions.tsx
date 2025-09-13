import React from 'react';
import { Star, Clock, MapPin, Bell, Ticket, Wifi } from 'lucide-react';

interface QuickActionsProps {
  onSearchClick: () => void;
}

export default function QuickActions({ onSearchClick }: QuickActionsProps) {
  const quickActions = [
    {
      icon: Star,
      label: 'Favorites',
      color: 'bg-yellow-500',
      action: () => {}
    },
    {
      icon: Clock,
      label: 'Schedules',
      color: 'bg-blue-500',
      action: () => {}
    },
    {
      icon: MapPin,
      label: 'Plan Trip',
      color: 'bg-green-500',
      action: onSearchClick
    },
    {
      icon: Bell,
      label: 'Alerts',
      color: 'bg-red-500',
      action: () => {}
    },
    {
      icon: Ticket,
      label: 'Tickets',
      color: 'bg-purple-500',
      action: () => {}
    },
    {
      icon: Wifi,
      label: 'Offline',
      color: 'bg-gray-500',
      action: () => {}
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className="flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95"
            >
              <div className={`p-3 rounded-full ${action.color} mb-2`}>
                <IconComponent size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}