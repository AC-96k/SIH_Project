import React from 'react';
import { Bus, Navigation, Clock } from 'lucide-react';
import { mockLiveBuses, mockBusRoutes, mockBusStops } from '../data/mockData';
import GoogleMap from './GoogleMap';

export default function LiveMap() {
  const getRouteInfo = (routeId: string) => {
    return mockBusRoutes.find(route => route.id === routeId);
  };

  const getStopInfo = (stopId: string) => {
    return mockBusStops.find(stop => stop.id === stopId);
  };

  const getOccupancyColor = (occupancy: string) => {
    switch (occupancy) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDelayColor = (delay: number) => {
    if (delay <= 0) return 'text-green-600';
    if (delay <= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Navigation className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Live Bus Tracking</h2>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Clock size={16} />
            <span>Live</span>
          </div>
        </div>
      </div>
      
      {/* Google Maps Integration */}
      <GoogleMap 
        center={{ lat: 23.2599, lng: 77.4126 }}
        zoom={13}
        showBuses={true}
        showStops={true}
        showRoutes={true}
      />
      
      {/* Live Bus Status */}
      <div className="p-4 space-y-3 max-h-48 overflow-y-auto">
        <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
          <Bus size={18} className="text-blue-600" />
          <span>Active Buses</span>
        </h3>
        
        {mockLiveBuses.map(bus => {
          const route = getRouteInfo(bus.routeId);
          const nextStop = getStopInfo(bus.nextStopId);
          
          return (
            <div key={bus.id} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: route?.color }}
                  ></div>
                  <span className="font-semibold text-gray-800">{route?.number}</span>
                  <span className="text-sm text-gray-600">{route?.name}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getOccupancyColor(bus.occupancy)}`}></div>
                  <span className="text-xs text-gray-500 capitalize">{bus.occupancy}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-600">
                  Next: <span className="font-medium">{nextStop?.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-600 font-semibold">
                    {bus.estimatedArrival} min
                  </span>
                  {bus.delay !== 0 && (
                    <span className={`text-xs ${getDelayColor(bus.delay)}`}>
                      {bus.delay > 0 ? `+${bus.delay}` : bus.delay} min
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}