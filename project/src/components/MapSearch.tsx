import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Search, MapPin, Navigation } from 'lucide-react';

interface MapSearchProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  placeholder?: string;
}

export default function MapSearch({ onLocationSelect, placeholder = "Search for a location..." }: MapSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAutocomplete = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places']
        });

        await loader.load();

        if (!inputRef.current) return;

        const autocompleteInstance = new google.maps.places.Autocomplete(inputRef.current, {
          types: ['establishment', 'geocode'],
          componentRestrictions: { country: 'IN' },
          fields: ['place_id', 'geometry', 'name', 'formatted_address']
        });

        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace();
          
          if (place.geometry && place.geometry.location) {
            const location = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              address: place.formatted_address || place.name || ''
            };
            
            onLocationSelect(location);
          }
        });

        setAutocomplete(autocompleteInstance);
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing Google Places Autocomplete:', error);
        setIsLoading(false);
      }
    };

    initAutocomplete();
  }, [onLocationSelect]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Current Location'
          };
          onLocationSelect(location);
          
          if (inputRef.current) {
            inputRef.current.value = 'Current Location';
          }
        },
        (error) => {
          console.error('Error getting current location:', error);
          alert('Unable to get your current location. Please search manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-3.5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder={isLoading ? "Loading..." : placeholder}
          disabled={isLoading}
          className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        />
        <button
          onClick={getCurrentLocation}
          className="absolute right-3 top-3 p-0.5 text-blue-600 hover:text-blue-700 transition-colors"
          title="Use current location"
        >
          <Navigation size={16} />
        </button>
      </div>
    </div>
  );
}