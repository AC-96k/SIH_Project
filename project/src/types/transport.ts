export interface BusRoute {
  id: string;
  name: string;
  number: string;
  color: string;
  stops: BusStop[];
  frequency: number; // minutes
  operatingHours: {
    start: string;
    end: string;
  };
  fare: number;
}

export interface BusStop {
  id: string;
  name: string;
  code: string;
  location: {
    lat: number;
    lng: number;
  };
  routes: string[];
  amenities: string[];
}

export interface LiveBus {
  id: string;
  routeId: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
  nextStopId: string;
  estimatedArrival: number; // minutes
  occupancy: 'low' | 'medium' | 'high';
  delay: number; // minutes (positive = late, negative = early)
}

export interface Journey {
  id: string;
  from: BusStop;
  to: BusStop;
  routes: {
    routeId: string;
    boardingStop: string;
    alightingStop: string;
    duration: number;
    walkingTime?: number;
  }[];
  totalDuration: number;
  totalFare: number;
}