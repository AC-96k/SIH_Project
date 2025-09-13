import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Bus, MapPin, Navigation } from 'lucide-react';
import { mockLiveBuses, mockBusRoutes, mockBusStops } from '../data/mockData';

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  showBuses?: boolean;
  showStops?: boolean;
  showRoutes?: boolean;
}

export default function GoogleMap({ 
  center = { lat: 23.2599, lng: 77.4126 }, 
  zoom = 13,
  showBuses = true,
  showStops = true,
  showRoutes = true
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        await loader.load();

        if (!mapRef.current) return;

        const mapInstance = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          styles: [
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'transit.station.bus',
              elementType: 'all',
              stylers: [{ visibility: 'on' }]
            }
          ],
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true
        });

        setMap(mapInstance);
        
        // Create info window
        infoWindowRef.current = new google.maps.InfoWindow();

        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps');
        setIsLoading(false);
      }
    };

    initMap();
  }, [center.lat, center.lng, zoom]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add bus stop markers
    if (showStops) {
      mockBusStops.forEach(stop => {
        const marker = new google.maps.Marker({
          position: stop.location,
          map,
          title: stop.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#3B82F6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        });

        marker.addListener('click', () => {
          const routesList = stop.routes.map(routeId => {
            const route = mockBusRoutes.find(r => r.id === routeId);
            return route ? `Route ${route.number} (${route.name})` : routeId;
          }).join('<br>');

          const amenitiesList = stop.amenities.map(amenity => 
            `<span style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 12px; margin-right: 4px;">${amenity}</span>`
          ).join('');

          const content = `
            <div style="max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: bold;">${stop.name}</h3>
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Code: ${stop.code}</p>
              <div style="margin-bottom: 8px;">
                <strong style="color: #374151; font-size: 14px;">Routes:</strong><br>
                <div style="font-size: 13px; color: #4b5563; margin-top: 4px;">${routesList}</div>
              </div>
              <div>
                <strong style="color: #374151; font-size: 14px;">Amenities:</strong><br>
                <div style="margin-top: 4px;">${amenitiesList}</div>
              </div>
            </div>
          `;

          if (infoWindowRef.current) {
            infoWindowRef.current.setContent(content);
            infoWindowRef.current.open(map, marker);
          }
        });

        markersRef.current.push(marker);
      });
    }

    // Add live bus markers
    if (showBuses) {
      mockLiveBuses.forEach(bus => {
        const route = mockBusRoutes.find(r => r.id === bus.routeId);
        const nextStop = mockBusStops.find(s => s.id === bus.nextStopId);
        
        const marker = new google.maps.Marker({
          position: bus.currentLocation,
          map,
          title: `Bus ${route?.number || bus.routeId}`,
          icon: {
            path: 'M12 2C13.1 2 14 2.9 14 4V6H18C19.1 6 20 6.9 20 8V16C20 17.1 19.1 18 18 18H17C17 19.7 15.7 21 14 21S11 19.7 11 21H9C9 19.7 7.7 18 6 18H4C2.9 18 2 17.1 2 16V8C2 6.9 2.9 6 4 6H8V4C8 2.9 8.9 2 10 2H12M10 4V6H12V4H10M6 15.5C6.8 15.5 7.5 16.2 7.5 17S6.8 18.5 6 18.5 4.5 17.8 4.5 17 5.2 15.5 6 15.5M16 15.5C16.8 15.5 17.5 16.2 17.5 17S16.8 18.5 16 18.5 14.5 17.8 14.5 17 15.2 15.5 16 15.5Z',
            fillColor: route?.color || '#3B82F6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 1.2,
            anchor: new google.maps.Point(12, 12)
          }
        });

        marker.addListener('click', () => {
          const occupancyColor = bus.occupancy === 'low' ? '#10B981' : 
                               bus.occupancy === 'medium' ? '#F59E0B' : '#EF4444';
          
          const delayText = bus.delay === 0 ? 'On time' : 
                           bus.delay > 0 ? `${bus.delay} min late` : 
                           `${Math.abs(bus.delay)} min early`;
          
          const delayColor = bus.delay <= 0 ? '#10B981' : 
                            bus.delay <= 5 ? '#F59E0B' : '#EF4444';

          const content = `
            <div style="max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: bold;">
                Bus ${route?.number || bus.routeId}
              </h3>
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${route?.name || 'Unknown Route'}</p>
              
              <div style="margin-bottom: 8px;">
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                  <span style="color: #374151; font-size: 14px; margin-right: 8px;">Next Stop:</span>
                  <strong style="color: #1f2937;">${nextStop?.name || 'Unknown'}</strong>
                </div>
                <div style="color: #3B82F6; font-size: 14px; font-weight: bold;">
                  Arriving in ${bus.estimatedArrival} minutes
                </div>
              </div>
              
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                  <div style="width: 8px; height: 8px; border-radius: 50%; background-color: ${occupancyColor}; margin-right: 6px;"></div>
                  <span style="font-size: 13px; color: #4b5563; text-transform: capitalize;">${bus.occupancy} occupancy</span>
                </div>
                <div style="color: ${delayColor}; font-size: 13px; font-weight: 500;">
                  ${delayText}
                </div>
              </div>
            </div>
          `;

          if (infoWindowRef.current) {
            infoWindowRef.current.setContent(content);
            infoWindowRef.current.open(map, marker);
          }
        });

        markersRef.current.push(marker);
      });
    }

    // Add route polylines
    if (showRoutes) {
      mockBusRoutes.forEach(route => {
        const path = route.stops.map(stop => stop.location);
        
        const polyline = new google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: route.color,
          strokeOpacity: 0.8,
          strokeWeight: 4,
          map
        });
      });
    }

  }, [map, showBuses, showStops, showRoutes]);

  if (error) {
    return (
      <div className="h-64 bg-red-50 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-red-600 font-medium">Failed to load map</p>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="h-64 w-full rounded-2xl"
        style={{ minHeight: '256px' }}
      />
    </div>
  );
}