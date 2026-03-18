import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('juicify_user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  
  const [loading, setLoading] = useState(true)
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' })
  const [welcomeMessage, setWelcomeMessage] = useState({ show: false, name: '' })

  // Save to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('juicify_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('juicify_user')
    }
    setLoading(false)
  }, [user])

  // Auto-hide welcome message after 3 seconds
  useEffect(() => {
    let timer
    if (welcomeMessage.show) {
      timer = setTimeout(() => {
        setWelcomeMessage({ show: false, name: '' })
      }, 3000)
    }
    return () => clearTimeout(timer)
  }, [welcomeMessage.show])

  // Signup function
  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('juicify_users') || '[]')
    
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return { success: false, message: 'User already exists' }
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: btoa(password), // Simple encoding (not secure for production!)
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('juicify_users', JSON.stringify(users))
    
    const userWithoutPassword = { id: newUser.id, name: newUser.name, email: newUser.email }
    setUser(userWithoutPassword)
    
    // Show welcome message after signup
    setWelcomeMessage({ show: true, name })
    
    return { success: true, message: 'Account created successfully' }
  }

  // Login function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('juicify_users') || '[]')
    
    const foundUser = users.find(u => u.email === email && u.password === btoa(password))
    
    if (foundUser) {
      const userWithoutPassword = { 
        id: foundUser.id, 
        name: foundUser.name, 
        email: foundUser.email 
      }
      setUser(userWithoutPassword)
      
      // Show welcome back message after login
      setWelcomeMessage({ show: true, name: foundUser.name })
      
      return { success: true, message: 'Login successful' }
    } else {
      return { success: false, message: 'Invalid email or password' }
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
  }

  // Open auth modal
  const openAuthModal = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode })
  }

  // Close auth modal
  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' })
  }

  const value = {
    user,
    loading,
    authModal,
    welcomeMessage,
    signup,
    login,
    logout,
    openAuthModal,
    closeAuthModal
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}