import React, { useState } from 'react';
import { X, MapPin, ArrowRight, Clock, IndianRupee, Navigation } from 'lucide-react';
import { BusStop } from '../types/transport';
import { mockBusStops, mockBusRoutes } from '../data/mockData';
import GoogleMap from './GoogleMap';
import MapSearch from './MapSearch';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState<BusStop[]>([]);
  const [toSuggestions, setToSuggestions] = useState<BusStop[]>([]);
  const [selectedFrom, setSelectedFrom] = useState<BusStop | null>(null);
  const [selectedTo, setSelectedTo] = useState<BusStop | null>(null);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [useGoogleSearch, setUseGoogleSearch] = useState(false);

  const handleFromChange = (value: string) => {
    setFrom(value);
    if (value.length > 0) {
      const suggestions = mockBusStops.filter(stop =>
        stop.name.toLowerCase().includes(value.toLowerCase())
      );
      setFromSuggestions(suggestions);
      setShowFromSuggestions(true);
    } else {
      setShowFromSuggestions(false);
    }
  };

  const handleToChange = (value: string) => {
    setTo(value);
    if (value.length > 0) {
      const suggestions = mockBusStops.filter(stop =>
        stop.name.toLowerCase().includes(value.toLowerCase())
      );
      setToSuggestions(suggestions);
      setShowToSuggestions(true);
    } else {
      setShowToSuggestions(false);
    }
  };

  const selectFromStop = (stop: BusStop) => {
    setSelectedFrom(stop);
    setFrom(stop.name);
    setShowFromSuggestions(false);
  };

  const selectToStop = (stop: BusStop) => {
    setSelectedTo(stop);
    setTo(stop.name);
    setShowToSuggestions(false);
  };

  const handleGoogleLocationSelect = (location: { lat: number; lng: number; address: string }, isFrom: boolean) => {
    // Create a temporary bus stop object for Google Places results
    const tempStop: BusStop = {
      id: `google_${Date.now()}`,
      name: location.address,
      code: 'GOOGLE',
      location: { lat: location.lat, lng: location.lng },
      routes: [],
      amenities: []
    };

    if (isFrom) {
      setSelectedFrom(tempStop);
      setFrom(location.address);
    } else {
      setSelectedTo(tempStop);
      setTo(location.address);
    }
  };

  const handleSearch = () => {
    if (selectedFrom && selectedTo) {
      setShowResults(true);
    } else {
      // Auto-select if there's an exact match
      const fromMatch = mockBusStops.find(stop => 
        stop.name.toLowerCase() === from.toLowerCase()
      );
      const toMatch = mockBusStops.find(stop => 
        stop.name.toLowerCase() === to.toLowerCase()
      );
      
      if (fromMatch && toMatch) {
        setSelectedFrom(fromMatch);
        setSelectedTo(toMatch);
        setShowResults(true);
      }
    }
  };

  const findRoutes = () => {
    if (!selectedFrom || !selectedTo) return [];
    
    return mockBusRoutes.filter(route => {
      const hasFrom = route.stops.some(stop => stop.id === selectedFrom.id);
      const hasTo = route.stops.some(stop => stop.id === selectedTo.id);
      return hasFrom && hasTo;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-t-3xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Plan Journey</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Search Method</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setUseGoogleSearch(false)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    !useGoogleSearch 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Bus Stops
                </button>
                <button
                  onClick={() => setUseGoogleSearch(true)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    useGoogleSearch 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Any Location
                </button>
              </div>
            </div>

            <div className="relative">
              {useGoogleSearch ? (
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3.5 text-green-600 z-10" />
                  <div className="pl-10">
                    <MapSearch
                      onLocationSelect={(location) => handleGoogleLocationSelect(location, true)}
                      placeholder="From (search any location)"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <MapPin size={16} className="absolute left-3 top-3.5 text-green-600" />
                  <input
                    type="text"
                    placeholder="From (start typing bus stop)"
                    value={from}
                    onChange={(e) => handleFromChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {showFromSuggestions && fromSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                      {fromSuggestions.map(stop => (
                        <button
                          key={stop.id}
                          onClick={() => selectFromStop(stop)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-800">{stop.name}</div>
                          <div className="text-sm text-gray-500">Code: {stop.code}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            
            <div className="flex justify-center">
              <div className="p-2 bg-gray-100 rounded-full">
                <ArrowRight size={16} className="text-gray-600" />
              </div>
            </div>
            
            <div className="relative">
              {useGoogleSearch ? (
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3.5 text-red-600 z-10" />
                  <div className="pl-10">
                    <MapSearch
                      onLocationSelect={(location) => handleGoogleLocationSelect(location, false)}
                      placeholder="To (search any destination)"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <MapPin size={16} className="absolute left-3 top-3.5 text-red-600" />
                  <input
                    type="text"
                    placeholder="To (destination bus stop)"
                    value={to}
                    onChange={(e) => handleToChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {showToSuggestions && toSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                      {toSuggestions.map(stop => (
                        <button
                          key={stop.id}
                          onClick={() => selectToStop(stop)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-800">{stop.name}</div>
                          <div className="text-sm text-gray-500">Code: {stop.code}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          <button
            onClick={handleSearch}
            disabled={!selectedFrom || !selectedTo}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Find Routes
          </button>
          
          {showResults && (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Available Routes</h3>
                <div className="text-sm text-gray-500">
                  {selectedFrom?.name} → {selectedTo?.name}
                </div>
              </div>
              {findRoutes().length > 0 ? (
                findRoutes().map(route => (
                  <div key={route.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: route.color }}
                        ></div>
                        <span className="font-semibold text-gray-800">{route.number}</span>
                        <span className="text-sm text-gray-600">{route.name}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-green-600">
                        <IndianRupee size={14} />
                        <span className="text-sm font-semibold">{route.fare}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>Every {route.frequency} mins</span>
                      </div>
                      <span>{route.operatingHours.start} - {route.operatingHours.end}</span>
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">Journey Details:</div>
                      <div className="text-sm text-gray-700">
                        Estimated time: {Math.floor(Math.random() * 20) + 15} mins • 
                        Distance: {(Math.random() * 5 + 2).toFixed(1)} km
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <div className="text-gray-400 mb-2">🚌</div>
                  <p className="text-gray-600 font-medium">No direct routes found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Try searching for nearby stops or check connecting routes
                  </p>
                </div>
              )}
            </div>
          )}
          
          {showResults && findRoutes().length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Route on Map</h3>
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Navigation size={16} />
                  <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
                </button>
              </div>
              
              {showMap && (
                <div className="h-48 rounded-xl overflow-hidden">
                  <GoogleMap 
                    center={selectedFrom?.location || { lat: 23.2599, lng: 77.4126 }}
                    zoom={14}
                    showBuses={true}
                    showStops={true}
                    showRoutes={true}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}