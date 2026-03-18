import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiHeart } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSmoothScroll = (e, sectionId) => {
    e.preventDefault()

    if (location.pathname !== '/') {
      // If not on home page, navigate to home with hash
      navigate(`/#${sectionId}`)
    } else {
      // If on home page, scroll to section
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
        // Update URL hash without page reload
        window.history.pushState(null, '', `#${sectionId}`)
      }
    }
  }

  const handleHomeClick = (e) => {
    e.preventDefault()
    handleSmoothScroll(e, 'home')
  }

  const handleProductsClick = (e) => {
    e.preventDefault()
    handleSmoothScroll(e, 'products')
  }

  const handleAboutClick = (e) => {
    e.preventDefault()
    handleSmoothScroll(e, 'about')
  }

  const handleContactClick = (e) => {
    e.preventDefault()
    handleSmoothScroll(e, 'contact')
  }

  return (
    <footer className="bg-linear-to-b from-white to-orange-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Brand Section */}
        <div className="text-center mb-8">
          <Link to="/" className="font-bold inline-block mb-2">
            <div className="text-3xl">
              🍊 <sup className="text-sm">🍃</sup>
            </div>
            <div className="text-xl text-gray-900">
              JUI<span className="text-orange-500">CIFY</span>
            </div>
          </Link>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Cold-pressed juices made with love from the freshest organic fruits and vegetables.
            No additives, no preservatives — just pure goodness.
          </p>
        </div>

        {/* Main Footer Content - 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-b border-gray-200">

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={(e) => handleHomeClick(e)}
                  className="text-gray-600 hover:text-orange-500 transition text-sm inline-block cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleProductsClick(e)}
                  className="text-gray-600 hover:text-orange-500 transition text-sm inline-block cursor-pointer"
                >
                  Our Juices
                </button>
              </li>
              <li>
                <button
                  onClick={handleAboutClick}
                  className="text-gray-600 hover:text-orange-500 transition text-sm cursor-pointer bg-transparent border-none p-0 hover:underline"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={handleContactClick}
                  className="text-gray-600 hover:text-orange-500 transition text-sm cursor-pointer bg-transparent border-none p-0 hover:underline"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <FiPhone className="text-orange-500 shrink-0 text-sm" />
                <a href="tel:+251941847108" className="text-gray-600 hover:text-orange-500 transition text-sm">
                  +251 941-847-108
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <FiMail className="text-orange-500 shrink-0 text-sm" />
                <a href="mailto:desajohn5@gmail.com" className="text-gray-600 hover:text-orange-500 transition text-sm break-all">
                  desajohn5@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <FiMapPin className="text-orange-500 shrink-0 text-sm" />
                <a
                  href="https://maps.google.com/?q=123+Bole+Street+Finfine+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-orange-500 transition text-sm"
                >
                  123 Bole St, Finfine
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Fresh */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Stay Fresh</h3>
            <p className="text-sm text-gray-600 mb-3">
              Subscribe to get special offers and updates
            </p>
            <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-2 sm:mb-0"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg text-sm font-medium transition whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center gap-4 pt-6">

          {/* Made with and Freshly pressed - Side by side */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <FiHeart className="text-red-500 animate-pulse" />
              <span>in Finfine</span>
            </div>

            <span className="hidden sm:inline text-gray-300">•</span>

            <div className="flex items-center gap-1">
              <span>Freshly pressed with</span>
              <FiHeart className="text-red-400" />
              <span>every day</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} Juicify. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 flex-wrap">
            <a href="#" className="hover:text-orange-500 transition">
              Privacy Policy
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-orange-500 transition">
              Terms of Service
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-orange-500 transition">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer