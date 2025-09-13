import { BusRoute, BusStop, LiveBus } from '../types/transport';

export const mockBusStops: BusStop[] = [
  {
    id: '1',
    name: 'City Bus Stand',
    code: 'CBS001',
    location: { lat: 23.2599, lng: 77.4126 },
    routes: ['R1', 'R2', 'R3'],
    amenities: ['shelter', 'seating', 'water']
  },
  {
    id: '2',
    name: 'Railway Station',
    code: 'RWS002',
    location: { lat: 23.2665, lng: 77.4005 },
    routes: ['R1', 'R4'],
    amenities: ['shelter', 'seating', 'toilet', 'water']
  },
  {
    id: '3',
    name: 'Government Hospital',
    code: 'GH003',
    location: { lat: 23.2456, lng: 77.4234 },
    routes: ['R2', 'R3'],
    amenities: ['shelter', 'seating']
  },
  {
    id: '4',
    name: 'College Square',
    code: 'CS004',
    location: { lat: 23.2789, lng: 77.3987 },
    routes: ['R1', 'R2', 'R4'],
    amenities: ['shelter', 'seating', 'shops']
  },
  {
    id: '5',
    name: 'Market Area',
    code: 'MA005',
    location: { lat: 23.2543, lng: 77.4156 },
    routes: ['R3', 'R4'],
    amenities: ['shelter', 'seating', 'shops', 'water']
  }
];

export const mockBusRoutes: BusRoute[] = [
  {
    id: 'R1',
    name: 'City Circle',
    number: '101',
    color: '#3B82F6',
    stops: [mockBusStops[0], mockBusStops[1], mockBusStops[3]],
    frequency: 15,
    operatingHours: { start: '06:00', end: '22:00' },
    fare: 10
  },
  {
    id: 'R2',
    name: 'Hospital Route',
    number: '102',
    color: '#10B981',
    stops: [mockBusStops[0], mockBusStops[2], mockBusStops[3]],
    frequency: 20,
    operatingHours: { start: '06:30', end: '21:30' },
    fare: 8
  },
  {
    id: 'R3',
    name: 'Market Express',
    number: '103',
    color: '#F59E0B',
    stops: [mockBusStops[0], mockBusStops[2], mockBusStops[4]],
    frequency: 12,
    operatingHours: { start: '07:00', end: '20:00' },
    fare: 12
  },
  {
    id: 'R4',
    name: 'Station Connector',
    number: '104',
    color: '#EF4444',
    stops: [mockBusStops[1], mockBusStops[3], mockBusStops[4]],
    frequency: 25,
    operatingHours: { start: '06:00', end: '23:00' },
    fare: 15
  }
];

export const mockLiveBuses: LiveBus[] = [
  {
    id: 'BUS001',
    routeId: 'R1',
    currentLocation: { lat: 23.2632, lng: 77.4065 },
    nextStopId: '2',
    estimatedArrival: 3,
    occupancy: 'medium',
    delay: -2
  },
  {
    id: 'BUS002',
    routeId: 'R1',
    currentLocation: { lat: 23.2723, lng: 77.4012 },
    nextStopId: '4',
    estimatedArrival: 7,
    occupancy: 'high',
    delay: 5
  },
  {
    id: 'BUS003',
    routeId: 'R2',
    currentLocation: { lat: 23.2511, lng: 77.4191 },
    nextStopId: '3',
    estimatedArrival: 12,
    occupancy: 'low',
    delay: 0
  },
  {
    id: 'BUS004',
    routeId: 'R3',
    currentLocation: { lat: 23.2578, lng: 77.4142 },
    nextStopId: '5',
    estimatedArrival: 5,
    occupancy: 'medium',
    delay: 3
  }
];