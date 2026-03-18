import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart()
  
  const cartItem = cartItems.find(item => item.id === product.id)
  const quantity = cartItem?.quantity || 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product.id)
  }

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden h-56">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-orange-500 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
          {product.category}
        </span>
        
        <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
          {product.size}
        </span>
      </Link>

      <div className="p-5">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-orange-500 transition">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.benefits.slice(0, 2).map((benefit, index) => (
            <span 
              key={index} 
              className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full"
            >
              {benefit}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-500">Price</span>
            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
          </div>
          
          <div className="flex gap-2">
            <Link 
              to={`/product/${product.id}`}
              className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-full text-sm font-semibold hover:bg-orange-500 hover:text-white transition"
            >
              Details
            </Link>
            
            <button 
              onClick={handleAddToCart}
              className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition shadow-md hover:shadow-lg flex items-center gap-1"
            >
              <span>Add to Cart</span>
              {quantity > 0 && (
                <span className="bg-white text-orange-500 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                  {quantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard