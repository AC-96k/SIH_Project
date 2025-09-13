import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SearchModal from './components/SearchModal';
import LiveMap from './components/LiveMap';
import RouteList from './components/RouteList';
import NearbyStops from './components/NearbyStops';
import QuickActions from './components/QuickActions';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuClick={() => setSidebarOpen(true)} 
        onSearchClick={() => setSearchOpen(true)}
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <QuickActions onSearchClick={() => setSearchOpen(true)} />
        
        <div className="grid lg:grid-cols-2 gap-6">
          <LiveMap />
          <div className="space-y-6">
            <RouteList />
            <NearbyStops />
          </div>
        </div>
        
        {/* Emergency Contact Banner */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Emergency Transport Helpline</h3>
              <p className="text-red-100">24/7 support for stranded passengers</p>
            </div>
            <button className="bg-white text-red-600 px-6 py-2 rounded-xl font-semibold hover:bg-red-50 transition-colors">
              Call Now
            </button>
          </div>
        </div>
        
        {/* Government Integration Notice */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-4 rounded-2xl">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-gray-800">Government Partnership</h4>
              <p className="text-sm text-gray-600 mt-1">
                This app is integrated with local transport authorities to provide real-time, 
                accurate information. All bus schedules and GPS data are officially sourced.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;