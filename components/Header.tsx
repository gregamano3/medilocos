'use client';

import { useState } from 'react';
import { ShoppingCart, Search, User, Heart, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSearch } from '@/contexts/SearchContext';

interface HeaderProps {
  onCartClick: () => void;
  onAccountClick: () => void;
  onWishlistClick: () => void;
  onCategorySelect: (category: string) => void;
}

export function Header({ onCartClick, onAccountClick, onWishlistClick, onCategorySelect }: HeaderProps) {
  const { state } = useCart();
  const { state: wishlistState } = useWishlist();
  const { state: authState } = useAuth();
  const { state: searchState, setSearchQuery, clearSearch } = useSearch();
  const [searchInput, setSearchInput] = useState('');
  
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistState.items.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    clearSearch();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      {/* Top bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                24/7 Emergency: (555) 123-4567
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Free delivery on orders over $50</span>
              <span>•</span>
              <span>Licensed Pharmacy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="/MEDILOCOS4.jpg" 
                alt="MediLocos Pharmacy Logo"
                className="w-12 h-12 object-contain"
              />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">MediLocos</h1>
                <p className="text-xs text-gray-500">Your Trusted Pharmacy</p>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search medicines, vitamins, health products..."
                className="pl-10 pr-10 py-2 w-full"
                value={searchInput}
                onChange={handleSearchChange}
              />
              {searchInput && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                  onClick={handleClearSearch}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center"
              onClick={onAccountClick}
            >
              <User className="w-5 h-5 mr-1" />
              {authState.isAuthenticated ? authState.user?.firstName || 'Account' : 'Sign In'}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center relative"
              onClick={onWishlistClick}
            >
              <Heart className="w-5 h-5 mr-1" />
              Wishlist
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-5 h-5 mr-1" />
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-3">
            <button 
              onClick={() => onCategorySelect('Prescription')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Prescription
            </button>
            <button 
              onClick={() => onCategorySelect('Pain Relief')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Over-the-Counter
            </button>
            <button 
              onClick={() => onCategorySelect('Vitamins')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Vitamins & Supplements
            </button>
            <button 
              onClick={() => onCategorySelect('Personal Care')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Personal Care
            </button>
            <button 
              onClick={() => onCategorySelect('Baby & Child')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Baby & Child
            </button>
            <button 
              onClick={() => onCategorySelect('Health Devices')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Health Devices
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}