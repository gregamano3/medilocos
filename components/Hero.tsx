'use client';

import { Button } from '@/components/ui/button';
import { Shield, Truck, Clock, Award } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Your Health,
            <span className="block text-blue-200">Our Priority</span>
          </h1>
          <p className="text-xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
            Licensed pharmacy with over 20 years of experience. Fast delivery, 
            competitive prices, and expert pharmaceutical care you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Shop Prescription
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent">
              Browse OTC Products
            </Button>
          </div>
        </div>
      </div>

      {/* Features bar */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Licensed & Certified</h3>
                <p className="text-sm text-gray-600">FDA approved pharmacy</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Truck className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Same day in metro areas</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-sm text-gray-600">Expert pharmacist advice</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Best Prices</h3>
                <p className="text-sm text-gray-600">Price match guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}