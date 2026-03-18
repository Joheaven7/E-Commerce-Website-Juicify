import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById, products } from '../data/productsData'
import { useCart } from './context/CartContext'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, removeFromCart, cartItems, updateQuantity } = useCart()
  
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    let isMounted = true // Track if component is mounted
    
    const loadProductData = () => {
      const foundProduct = getProductById(id)
      
      if (!foundProduct) {
        navigate('/products')
        return
      }

      // Only update state if component is still mounted
      if (isMounted) {
        setProduct(foundProduct)
        
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4)
        
        setRelatedProducts(related)
        setLoading(false)
      }
    }

    loadProductData()

    // Cleanup function
    return () => {
      isMounted = false
    }
  }, [id, navigate]) // Add navigate to dependencies

  const cartItem = cartItems.find(item => item.id === product?.id)
  const cartQuantity = cartItem?.quantity || 0
  const isInCart = cartQuantity > 0

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id)
    }
  }

  const handleRemoveFromCart = () => {
    if (window.confirm(`Remove ${product.name} from your cart?`)) {
      removeFromCart(product.id)
    }
  }

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart()
    } else {
      updateQuantity(product.id, newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Single Back to Home Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-orange-500 transition"
          >
            <span>←</span>
            Back to Home
          </Link>
        </div>

        {/* Product Detail Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Image */}
            <div className="lg:w-5/12 p-6 bg-linear-to-br from-orange-50 to-white">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
                <span className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  {product.size}
                </span>
                
                {isInCart && (
                  <span className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <span>✓</span> {cartQuantity} in cart
                  </span>
                )}
              </div>
            </div>

            {/* Right: Details */}
            <div className="lg:w-7/12 p-6 lg:p-8">
              
              <div className="mb-2">
                <span className="inline-block bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              
              <div className="text-2xl font-bold text-orange-500 mb-4">
                ${product.price}
              </div>

              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Key Benefits</h3>
                <div className="flex flex-wrap gap-1.5">
                  {product.benefits.map((benefit, index) => (
                    <span 
                      key={index} 
                      className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {product.longDescription || product.description}
                </p>
              </div>

              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Nutrition Facts</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-gray-400">Calories</span>
                    <p className="font-semibold text-gray-900">{product.calories}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Size</span>
                    <p className="font-semibold text-gray-900">{product.size}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center border border-gray-300 rounded-full">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 rounded-l-full transition"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-semibold text-gray-900">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 rounded-r-full transition"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full transition shadow-md hover:shadow-lg text-sm"
                  >
                    Add to Cart {cartQuantity > 0 && `(${cartQuantity})`}
                  </button>
                </div>

                {isInCart && (
                  <div className="space-y-2">
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">In Your Cart:</h4>
                      <div className="flex justify-between items-center text-sm">
                        <span>Quantity: {cartQuantity}</span>
                        <span className="font-semibold text-orange-500">
                          Subtotal: ${(product.price * cartQuantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(cartQuantity - 1)}
                        className="flex-1 border border-orange-500 text-orange-500 py-1.5 rounded-full text-sm hover:bg-orange-50 transition"
                      >
                        − Remove One
                      </button>
                      <button
                        onClick={() => handleUpdateQuantity(cartQuantity + 1)}
                        className="flex-1 border border-orange-500 text-orange-500 py-1.5 rounded-full text-sm hover:bg-orange-50 transition"
                      >
                        + Add One
                      </button>
                    </div>

                    <button
                      onClick={handleRemoveFromCart}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition shadow-md hover:shadow-xl flex items-center justify-center gap-1 text-sm"
                    >
                      <span>🗑️</span>
                      Remove All
                    </button>
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-500 border-t pt-4 space-y-1">
                <p className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 100% Organic ingredients
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Cold-pressed
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> No added sugar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map(related => (
                <Link 
                  key={related.id} 
                  to={`/product/${related.id}`}
                  className="group bg-white rounded-xl shadow-md hover:shadow-lg transition p-3"
                >
                  <img 
                    src={related.image} 
                    alt={related.name}
                    className="w-full h-28 object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform"
                  />
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition text-sm">
                    {related.name}
                  </h3>
                  <p className="text-orange-500 font-semibold text-sm">${related.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetails