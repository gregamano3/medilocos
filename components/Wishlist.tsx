'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Wishlist({ isOpen, onClose }: WishlistProps) {
  const { state, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product: any) => {
    if (product.inStock) {
      addItem(product);
    }
  };

  const handleRemoveFromWishlist = (id: string) => {
    removeItem(id);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Wishlist ({state.items.length} items)
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500">Save products you love for later</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        {item.prescription && (
                          <Badge className="text-xs bg-red-100 text-red-800">
                            Prescription Required
                          </Badge>
                        )}
                        {!item.inStock && (
                          <Badge className="text-xs bg-gray-100 text-gray-800">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-blue-600">
                          ${item.price.toFixed(2)}
                        </span>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.inStock}
                            className="flex items-center space-x-1"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            <span>{item.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}