import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './components/context/CartContext'
import { AuthProvider } from './components/context/AuthContext'
import { ThemeProvider } from './components/context/ThemeContext'  // Updated path

// Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/products/Products'
import ProductDetails from './components/ProductDetails'
import CartPage from './components/CartPage'
import Contact from './components/Contact'
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            
            <Routes>
              <Route path="/" element={
                <main>
                  <Hero />
                  <About />
                  <Products />
                  <Contact />
                  <Footer />
                </main>
              } />
              
              {/* <Route path="/products" element={
                <>
                  <Products />
                  <Footer />
                </>
              } /> */}
              
              <Route path="/product/:id" element={
                <>
                  <ProductDetails />
                  <Footer />
                </>
              } />
              
              <Route path="/cart" element={
                <>
                  <CartPage />
                  <Footer />
                </>
              } />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App