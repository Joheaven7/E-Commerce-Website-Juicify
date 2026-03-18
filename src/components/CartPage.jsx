import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from './context/CartContext'
import { useAuth } from './context/AuthContext'
import { IoClose } from 'react-icons/io5'

const CartPage = () => {
  const { getCartItemsWithDetails, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
  const { user, openAuthModal } = useAuth()
  const navigate = useNavigate()
  
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const [orderData, setOrderData] = useState({
    name: user?.name || '',
    phone: '',
    email: user?.email || '', 
    address: '',
    city: '',
    notes: ''
  })

  const cartItems = getCartItemsWithDetails()
  const shippingCost = cartTotal > 30 ? 0 : 5.99
  const taxRate = 0.08
  const tax = cartTotal * taxRate
  const discount = promoApplied ? cartTotal * 0.1 : 0
  const grandTotal = cartTotal + tax + shippingCost - discount

  const handleRemoveItem = (item) => {
    if (window.confirm(`Remove ${item.name} from your cart?`)) removeFromCart(item.id)
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to remove all items from your cart?')) clearCart()
  }

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'JUICE10') {
      setPromoApplied(true)
      alert('Promo code applied successfully! 10% discount')
    } else {
      alert('Invalid promo code')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOrderData(prev => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (!orderData.name || !orderData.phone || !orderData.address || !orderData.email) {
      alert('Please fill all required fields including email')
      return
    }

    setIsSubmitting(true)

    // Create order details
    const order = {
      customer: {
        ...orderData,
        userId: user.id,
        name: user.name
      },
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      })),
      subtotal: cartTotal,
      shipping: shippingCost,
      tax: tax,
      discount: discount,
      total: grandTotal,
      orderDate: new Date().toLocaleString(),
      orderNumber: 'ORD-' + Math.floor(Math.random() * 10000)
    }

    // Prepare Web3Forms payload
    const formPayload = {
      access_key: '5573cda6-89a0-4518-a8d5-38b8218b8927',
      subject: `New Order #${order.orderNumber} from ${user.name}`,
      from_name: user.name,
      email: orderData.email, // Use the email from form
      name: user.name,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      notes: orderData.notes,
      user_id: user.id,
      order_number: order.orderNumber,
      order_date: order.orderDate,
      items: JSON.stringify(order.items),
      subtotal: `$${order.subtotal.toFixed(2)}`,
      shipping: order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`,
      tax: `$${order.tax.toFixed(2)}`,
      discount: order.discount > 0 ? `-$${order.discount.toFixed(2)}` : '$0.00',
      total: `$${order.total.toFixed(2)}`,
      auto_response: true,
      auto_response_message: `Dear ${user.name},\n\nThank you for your order #${order.orderNumber}!\n\nWe have received your order and will process it soon.\n\nOrder Summary:\n${order.items.map(item => `- ${item.name} x ${item.quantity} = $${item.subtotal.toFixed(2)}`).join('\n')}\n\nSubtotal: $${order.subtotal.toFixed(2)}\nShipping: ${order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}\nTax: $${order.tax.toFixed(2)}\n${order.discount > 0 ? `Discount: -$${order.discount.toFixed(2)}\n` : ''}Total: $${order.total.toFixed(2)}\n\nWe'll notify you when your order is on its way!\n\nBest regards,\nThe Juicify Team`
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      })

      const data = await response.json()

      if (data.success) {
        setOrderDetails(order)
        setOrderPlaced(true)
        
        // Clear cart and form
        clearCart()
        setOrderData({ 
          name: user.name, 
          phone: '', 
          email: user.email || '',
          address: '', 
          city: '', 
          notes: ''
        })
        setPromoApplied(false)
        setPromoCode('')
        
        console.log('Order submitted successfully:', order)
      } else {
        alert('Failed to submit order. Please try again.')
      }
    } catch (error) {
      alert('Network error. Please check your connection and try again.')
      console.error('Order submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-xl p-16">
            <span className="text-8xl mb-6 block">🛒</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any juices to your cart yet.</p>
            <Link 
              to="/#products"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition shadow-lg"
            >
              <span>←</span>
              Browse Our Juices
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Show Order Success with details
  if (orderPlaced && orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-8 text-center">
            <span className="text-6xl mb-4 block">🎉</span>
            <h2 className="text-3xl font-bold text-green-700 mb-2">Order Placed Successfully!</h2>
            <p className="text-green-600">Thank you for your order, {orderDetails.customer.name}!</p>
            <p className="text-green-600">Order Number: <span className="font-bold">{orderDetails.orderNumber}</span></p>
            <p className="text-sm text-green-500 mt-2">A confirmation email has been sent to {orderDetails.customer.email}</p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>📋</span> Order Summary
            </h3>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-500 font-bold">${item.subtotal.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>{orderDetails.shipping === 0 ? 'Free' : `$${orderDetails.shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax:</span>
                <span>$${orderDetails.tax.toFixed(2)}</span>
              </div>
              {orderDetails.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-$${orderDetails.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 mt-2">
                <span>Total:</span>
                <span className="text-orange-500">$${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>🚚</span> Delivery Details
              </h4>
              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                <p className="text-gray-700"><span className="font-medium">Name:</span> {orderDetails.customer.name}</p>
                <p className="text-gray-700"><span className="font-medium">Email:</span> {orderDetails.customer.email}</p>
                <p className="text-gray-700"><span className="font-medium">Phone:</span> {orderDetails.customer.phone}</p>
                <p className="text-gray-700"><span className="font-medium">Address:</span> {orderDetails.customer.address}</p>
                {orderDetails.customer.city && (
                  <p className="text-gray-700"><span className="font-medium">City:</span> {orderDetails.customer.city}</p>
                )}
                {orderDetails.customer.notes && (
                  <p className="text-gray-700"><span className="font-medium">Notes:</span> {orderDetails.customer.notes}</p>
                )}
              </div>
            </div>

            {/* Order Date */}
            <p className="text-sm text-gray-400 text-right mt-4">
              Ordered on: {orderDetails.orderDate}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition shadow-lg"
            >
              Back to Home
            </Link>
            <Link
              to="/products"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full font-bold transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Shopping <span className="text-orange-500">Cart</span>
            </h1>
            <p className="text-gray-600 mt-1">
              You have {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/#products"
              className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1 px-4 py-2 border border-orange-500 rounded-full hover:bg-orange-50 transition"
            >
              <span>←</span> Continue Shopping
            </Link>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-600 font-medium flex items-center gap-2 px-4 py-2 border border-red-200 rounded-full hover:bg-red-50 transition"
              >
                <span>🗑️</span>
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowLoginPrompt(false)} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <IoClose className="text-2xl" />
              </button>
              <div className="text-center mb-6">
                <span className="text-5xl mb-4 block">🔒</span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
                <p className="text-gray-600 mb-6">Please login or sign up to proceed with your order.</p>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowLoginPrompt(false)
                    openAuthModal('login')
                  }}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowLoginPrompt(false)
                    openAuthModal('signup')
                  }}
                  className="w-full border border-orange-500 text-orange-500 py-3 rounded-xl font-bold hover:bg-orange-50 transition"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 mt-2"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cart Items</h2>
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 relative group">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
                  <div className="sm:w-32 h-32 shrink-0 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg hover:bg-red-600"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <Link 
                          to={`/product/${item.id}`} 
                          className="text-xl font-bold text-gray-900 hover:text-orange-500 transition flex items-center gap-2"
                        >
                          {item.name}
                          <span className="text-sm text-gray-400">View Details →</span>
                        </Link>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {item.size}
                          </span>
                        </div>
                      </div>
                      <div className="text-right sm:text-left">
                        <p className="text-2xl font-bold text-orange-500">${item.price}</p>
                        <p className="text-xs text-gray-500">per bottle</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-600">Quantity:</label>
                        <div className="flex items-center border border-gray-300 rounded-full">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 rounded-l-full transition"
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 rounded-r-full transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal and Remove */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-xs text-gray-500">Subtotal</span>
                          <p className="font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition flex items-center gap-1"
                          title="Remove item"
                        >
                          <span>🗑️</span>
                          <span className="text-sm hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Order Summary Calculations */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className="font-medium">{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                
                {/* Free Shipping Progress */}
                {cartTotal < 30 && (
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">
                      Add ${(30 - cartTotal).toFixed(2)} more for free shipping
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 rounded-full h-2 transition-all" 
                        style={{ width: `${Math.min((cartTotal / 30) * 100, 100)}%` }} 
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax:</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%):</span>
                    <span className="font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 my-4"></div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-orange-500">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoCode} 
                    onChange={e => setPromoCode(e.target.value)} 
                    placeholder="Enter code" 
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button 
                    onClick={handleApplyPromo} 
                    className="px-4 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Try "JUICE10" for 10% off</p>
              </div>

              {/* Checkout Form - Only for logged in users */}
              {user ? (
                <div id="checkout-form" className="mt-6 border-t pt-6 space-y-4">
                  <h3 className="text-lg font-bold mb-2 text-gray-900">Delivery Details</h3>
                  
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name *" 
                    // value={user.name} 
                    // disabled 
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700"
                  />
                  
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email Address *" 
                    value={orderData.email} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    required
                  />
                  
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Phone Number *" 
                    value={orderData.phone} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    required
                  />
                  
                  <input 
                    type="text" 
                    name="city" 
                    placeholder="City" 
                    value={orderData.city} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  
                  <textarea 
                    name="address" 
                    placeholder="Delivery Address *" 
                    value={orderData.address} 
                    onChange={handleInputChange} 
                    rows="3" 
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    required
                  />
                  
                  <textarea 
                    name="notes" 
                    placeholder="Order Notes (optional)" 
                    value={orderData.notes} 
                    onChange={handleInputChange} 
                    rows="2" 
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  
                  <p className="text-xs text-gray-400 text-center">
                    Secured by <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Web3Forms</a>
                  </p>
                  
                  <button 
                    onClick={handlePlaceOrder} 
                    disabled={isSubmitting}
                    className={`w-full bg-green-500 text-white py-4 rounded-full font-bold hover:bg-green-600 transition shadow-lg ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Confirm Order ✅'
                    )}
                  </button>
                </div>
              ) : (
                <div className="mt-6 border-t pt-6">
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
                    <span className="text-4xl mb-3 block">🔒</span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Login to Checkout</h3>
                    <p className="text-sm text-gray-600 mb-4">Please login or create an account to place your order.</p>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => openAuthModal('login')}
                        className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => openAuthModal('signup')}
                        className="w-full border border-orange-500 text-orange-500 py-3 rounded-xl font-bold hover:bg-orange-50 transition"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Methods */}
              <div className="text-center text-sm text-gray-500 mt-4">
                <p>We accept:</p>
                <div className="flex justify-center gap-3 mt-2 text-2xl">
                  <span title="Visa">💳</span>
                  <span title="Mastercard">💳</span>
                  <span title="PayPal">📱</span>
                  <span title="Cash">💵</span>
                </div>
              </div>

              <div className="text-center mt-4">
                <Link to="/products" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage