import React, { useState } from 'react'
import ProductCard from './ProductCard'
import { products } from '../../data/productsData'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const categories = [
    { id: 'all', name: 'All Juices', icon: '🧃' },
    { id: 'citrus', name: 'Citrus', icon: '🍊' },
    { id: 'creamy', name: 'Creamy Blends', icon: '🥑' },
    { id: 'tropical', name: 'Tropical', icon: '🌴' },
    { id: 'berry', name: 'Berry', icon: '🫐' },
    { id: 'seasonal', name: 'Seasonal', icon: '🌞' }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <section id="products" className="py-16 px-4 bg-linear-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Fresh <span className="text-orange-500">Juices</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cold-pressed daily with organic fruits and vegetables. 
            No additives, no preservatives — just pure goodness.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1
                  ${selectedCategory === category.id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                  }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {/* 3x3 Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <span className="text-6xl mb-4 block">😕</span>
            <p className="text-gray-500 text-lg">No products found</p>
            <button 
              onClick={() => {
                setSelectedCategory('all')
              }}
              className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

       
      </div>
    </section>
  )
}

export default Products