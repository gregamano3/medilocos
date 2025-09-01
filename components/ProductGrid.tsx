'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Product } from '@/contexts/CartContext';
import { useSearch } from '@/contexts/SearchContext';

const products: Product[] = [
  {
    id: '1',
    name: 'Ibuprofen 200mg',
    price: 12.99,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Pain relief and anti-inflammatory medication. 100 tablets.',
    category: 'Pain Relief',
    inStock: true,
  },
  {
    id: '2',
    name: 'Vitamin D3 1000 IU',
    price: 18.50,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Essential vitamin for bone health and immune support. 120 capsules.',
    category: 'Vitamins',
    inStock: true,
  },
  {
    id: '3',
    name: 'Lisinopril 10mg',
    price: 25.00,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Blood pressure medication. Prescription required. 30 tablets.',
    category: 'Prescription',
    inStock: true,
    prescription: true,
  },
  {
    id: '4',
    name: 'Omega-3 Fish Oil',
    price: 22.99,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Heart and brain health supplement. 180 softgels.',
    category: 'Supplements',
    inStock: true,
  },
  {
    id: '5',
    name: 'Acetaminophen 500mg',
    price: 9.99,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Extra strength pain reliever and fever reducer. 100 caplets.',
    category: 'Pain Relief',
    inStock: true,
  },
  {
    id: '6',
    name: 'Multivitamin Complete',
    price: 16.75,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Daily multivitamin with essential nutrients. 90 tablets.',
    category: 'Vitamins',
    inStock: true,
  },
  {
    id: '7',
    name: 'Metformin 500mg',
    price: 15.50,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Diabetes medication. Prescription required. 60 tablets.',
    category: 'Prescription',
    inStock: false,
    prescription: true,
  },
  {
    id: '8',
    name: 'Probiotics 50 Billion CFU',
    price: 29.99,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Digestive health support with 10 probiotic strains. 60 capsules.',
    category: 'Supplements',
    inStock: true,
  },
  {
    id: '9',
    name: 'Aspirin 325mg',
    price: 8.99,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Pain relief and blood thinner. 100 tablets.',
    category: 'Pain Relief',
    inStock: true,
  },
  {
    id: '10',
    name: 'Vitamin C 1000mg',
    price: 14.99,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Immune system support and antioxidant. 120 tablets.',
    category: 'Vitamins',
    inStock: true,
  },
  {
    id: '11',
    name: 'Atorvastatin 20mg',
    price: 35.00,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Cholesterol-lowering medication. Prescription required. 30 tablets.',
    category: 'Prescription',
    inStock: true,
    prescription: true,
  },
  {
    id: '12',
    name: 'Calcium + Vitamin D',
    price: 19.99,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Bone health supplement with calcium and vitamin D. 90 tablets.',
    category: 'Supplements',
    inStock: true,
  },
  {
    id: '13',
    name: 'Naproxen 220mg',
    price: 11.99,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Anti-inflammatory pain reliever. 100 tablets.',
    category: 'Pain Relief',
    inStock: true,
  },
  {
    id: '14',
    name: 'B-Complex Vitamins',
    price: 13.50,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Energy and nervous system support. 60 capsules.',
    category: 'Vitamins',
    inStock: true,
  },
  {
    id: '15',
    name: 'Amlodipine 5mg',
    price: 28.00,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Blood pressure medication. Prescription required. 30 tablets.',
    category: 'Prescription',
    inStock: true,
    prescription: true,
  },
  {
    id: '16',
    name: 'Magnesium 400mg',
    price: 17.99,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Muscle and nerve function support. 90 tablets.',
    category: 'Supplements',
    inStock: true,
  },
];

const categories = ['All', 'Pain Relief', 'Vitamins', 'Supplements', 'Prescription'];

interface ProductGridProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function ProductGrid({ selectedCategory: externalCategory, onCategoryChange }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { state: searchState } = useSearch();

  // Use external category if provided, otherwise use internal state
  const activeCategory = externalCategory || selectedCategory;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    
    if (!searchState.query) {
      return matchesCategory;
    }

    const searchLower = searchState.query.toLowerCase();
    const matchesSearch = 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {searchState.isSearching ? `Search Results for "${searchState.query}"` : 'Featured Products'}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {searchState.isSearching 
            ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`
            : 'Discover our wide range of quality medications, supplements, and health products'
          }
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => handleCategoryChange(category)}
            className="mb-2"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          {searchState.isSearching ? (
            <div>
              <p className="text-gray-500 mb-4">No products found for "{searchState.query}"</p>
              <p className="text-sm text-gray-400">Try adjusting your search terms or browse our categories</p>
            </div>
          ) : (
            <p className="text-gray-500">No products found in this category. Check back soon for new arrivals!</p>
          )}
        </div>
      )}
    </section>
  );
}