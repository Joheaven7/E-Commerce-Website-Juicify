import React, { createContext, useState, useContext, useEffect } from 'react'
import { getProductById } from '../../data/productsData'

// Create the context
const CartContext = createContext()

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Provider component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('juicify_cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  
  const [cartTotal, setCartTotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('juicify_cart', JSON.stringify(cartItems))
    
    // Calculate total price
    const total = cartItems.reduce((sum, item) => {
      const product = getProductById(item.id)
      return sum + (product?.price || 0) * item.quantity
    }, 0)
    setCartTotal(total)

    // Calculate total items count
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    setItemCount(count)
  }, [cartItems])

  // Add to cart
  const addToCart = (productId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId)
      
      if (existingItem) {
        // Increase quantity if item exists
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Add new item with quantity 1
        return [...prevItems, { id: productId, quantity: 1 }]
      }
    })
  }

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
  }

  // Get cart items with product details
  const getCartItemsWithDetails = () => {
    return cartItems.map(item => {
      const product = getProductById(item.id)
      return {
        ...item,
        ...product,
        subtotal: (product?.price || 0) * item.quantity
      }
    }).filter(item => item.name) // Filter out items where product not found
  }

  const value = {
    cartItems,
    cartTotal,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsWithDetails
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}