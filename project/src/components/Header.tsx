import React from 'react';
import { Bus, Menu, Search, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export default function Header({ onMenuClick, onSearchClick }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <Bus size={28} className="text-blue-200" />
            <div>
              <h1 className="text-lg font-bold">CityBus</h1>
              <p className="text-xs text-blue-200">Smart Transit</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onSearchClick}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Search size={20} />
          </button>
          <button className="p-2 hover:bg-blue-700 rounded-lg transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}