import React from 'react';
import { MapPin, Navigation, Clock, Wifi } from 'lucide-react';
import { mockBusStops } from '../data/mockData';

export default function NearbyStops() {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'shelter': return '🏠';
      case 'seating': return '💺';
      case 'water': return '💧';
      case 'toilet': return '🚻';
      case 'shops': return '🛍️';
      default: return '📍';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 border-b border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="text-purple-600" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Nearby Stops</h2>
          </div>
          <button className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700">
            <Navigation size={16} />
            <span>Locate Me</span>
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
        {mockBusStops.map((stop, index) => (
          <div key={stop.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">{stop.name}</h3>
                <p className="text-sm text-gray-600">Code: {stop.code}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-600">{(index + 1) * 150}m</div>
                <div className="text-xs text-gray-500">{(index + 1) * 2} min walk</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {stop.amenities.map(amenity => (
                <span 
                  key={amenity}
                  className="inline-flex items-center space-x-1 px-2 py-1 bg-white rounded-lg text-xs text-gray-600 border"
                >
                  <span>{getAmenityIcon(amenity)}</span>
                  <span>{amenity}</span>
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {stop.routes.map(routeId => (
                  <span 
                    key={routeId}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                  >
                    Route {routeId.replace('R', '')}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-1 text-xs text-green-600">
                <Clock size={12} />
                <span>Next bus: {(index + 1) * 3} min</span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center py-4">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View More Stops
          </button>
        </div>
      </div>
    </div>
  );
}