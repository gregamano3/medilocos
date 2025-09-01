'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { Cart } from '@/components/Cart';
import { Checkout } from '@/components/Checkout';
import { AccountHandler } from '@/components/AccountHandler';
import { Footer } from '@/components/Footer';
import { FloatingCart } from '@/components/FloatingCart';
import { Wishlist } from '@/components/Wishlist';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { AuthProvider } from '@/contexts/AuthContext';

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAccountHandler, setShowAccountHandler] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Scroll to products section
    const productsSection = document.querySelector('#products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Header 
              onCartClick={() => setShowCart(true)}
              onAccountClick={() => setShowAccountHandler(true)}
              onWishlistClick={() => setShowWishlist(true)}
              onCategorySelect={handleCategorySelect}
            />
            <Hero />
            <div id="products-section">
              <ProductGrid 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
            <Footer />
            
            <Cart 
              isOpen={showCart} 
              onClose={() => setShowCart(false)}
              onCheckout={() => {
                setShowCart(false);
                setShowCheckout(true);
              }}
            />
            
            <Wishlist 
              isOpen={showWishlist} 
              onClose={() => setShowWishlist(false)}
            />
            
            <Checkout 
              isOpen={showCheckout} 
              onClose={() => setShowCheckout(false)}
            />
            
            <AccountHandler
              isOpen={showAccountHandler}
              onClose={() => setShowAccountHandler(false)}
            />
            
            <FloatingCart onClick={() => setShowCart(true)} />
          </div>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}