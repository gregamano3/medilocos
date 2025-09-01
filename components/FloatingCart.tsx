'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface FloatingCartProps {
  onClick: () => void;
}

export function FloatingCart({ onClick }: FloatingCartProps) {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${itemCount === 0 ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'}`}>
      <Button
        onClick={onClick}
        size="lg"
        className="relative bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-16 h-16 p-0 group"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {itemCount}
          </span>
        )}
      </Button>
      
      {/* Cart total preview */}
      {itemCount > 0 && (
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        ${state.total.toFixed(2)}
        </div>
      )}
    </div>
  );
}