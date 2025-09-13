import React from 'react';
import { Bus, Clock, IndianRupee, Users } from 'lucide-react';
import { mockBusRoutes } from '../data/mockData';

export default function RouteList() {
  const getStatusColor = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    const currentHour = new Date().getHours();
    
    if (currentHour >= hour && currentHour < 22) {
      return 'text-green-600 bg-green-50';
    }
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 border-b border-green-200">
        <div className="flex items-center space-x-2">
          <Bus className="text-green-600" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Bus Routes</h2>
        </div>
      </div>
      
      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
        {mockBusRoutes.map(route => (
          <div key={route.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: route.color }}
                >
                  {route.number.slice(-2)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{route.name}</h3>
                  <p className="text-sm text-gray-600">Route {route.number}</p>
                </div>
              </div>
              
              <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(route.operatingHours.start)}`}>
                {new Date().getHours() >= 6 && new Date().getHours() < 22 ? 'Active' : 'Inactive'}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock size={14} />
                <span>Every {route.frequency}min</span>
              </div>
              
              <div className="flex items-center space-x-1 text-gray-600">
                <IndianRupee size={14} />
                <span>₹{route.fare}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-gray-600">
                <Users size={14} />
                <span>{route.stops.length} stops</span>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Operating: {route.operatingHours.start} - {route.operatingHours.end}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}