import React, { useState, useEffect } from 'react'
import { FiMail, FiPhone, FiMapPin, FiUser, FiMessageSquare } from 'react-icons/fi'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: ''
  })

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    let timer
    if (submitStatus.type === 'success') {
      timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' })
      }, 5000)
    }
    return () => clearTimeout(timer)
  }, [submitStatus.type])

  // Validation function
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    const formPayload = {
      access_key: '5573cda6-89a0-4518-a8d5-38b8218b8927',
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: 'New Contact Form Submission from Juicify',
      from_name: 'Juicify Website',
      auto_response: true,
      auto_response_message: `Dear ${formData.name},\n\nThank you for contacting Juicify! We have received your message and will get back to you within one business day.\n\nHere's a copy of your message:\n"${formData.message}"\n\nStay fresh,\nThe Juicify Team`
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
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        })
        
        setFormData({
          name: '',
          email: '',
          message: ''
        })
        setErrors({})
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.'
        })
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-linear-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Contact <span className="text-orange-500">Us</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's talk about your favorite juices or any questions you have. 
            Send us a message and we will be in touch within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
            
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiMessageSquare className="text-orange-500" />
              Send us a message
            </h3>

            {submitStatus.type === 'success' && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-start gap-3 animate-fadeIn">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-medium">Success!</p>
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              </div>
            )}

            {submitStatus.type === 'error' && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="font-medium">Error!</p>
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <FiUser className="text-orange-500" />
                    Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={`w-full px-4 py-3 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-gray-50`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <FiMail className="text-orange-500" />
                    Email <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-gray-50`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <FiMessageSquare className="text-orange-500" />
                  Message <span className="text-orange-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your message here..."
                  className={`w-full px-4 py-3 border ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-gray-50 resize-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <div className="text-sm text-gray-500 bg-orange-50 p-4 rounded-xl">
                <p>
                  By submitting this form, you agree to receive information from Juicify related to our products, events, and promotions. 
                  You may unsubscribe at any time.
                </p>
              </div>

              <p className="text-xs text-gray-400 text-center">
                Powered by <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Web3Forms</a>
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg hover:shadow-xl ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              <p className="text-xs text-center text-gray-400">
                * Required fields | We'll respond within one business day
              </p>
            </form>
          </div>

          {/* Right Column - Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-orange-500 group-hover:text-white transition shrink-0">
                  <FiPhone />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Call us</h3>
                  <a 
                    href="tel:+251941847108" 
                    className="text-2xl font-semibold text-orange-500 mb-2 hover:text-orange-600 transition block"
                  >
                    +251 941-847-108
                  </a>
                  <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm</p>
                  <p className="text-xs text-gray-400 mt-1">Click to call</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-orange-500 group-hover:text-white transition shrink-0">
                  <FiMail />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Email us</h3>
                  <a 
                    href="mailto:desajohn5@gmail.com?subject=Inquiry%20from%20Juicify%20Website" 
                    className="text-xl font-semibold text-orange-500 mb-2 hover:text-orange-600 transition break-all"
                  >
                    desajohn5@gmail.com
                  </a>
                  <p className="text-sm text-gray-500">We reply within 24hrs</p>
                  <p className="text-xs text-gray-400 mt-1">Click to send email</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition group">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-orange-500 group-hover:text-white transition shrink-0">
                  <FiMapPin />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Visit us</h3>
                  <a 
                    href="https://maps.google.com/?q=123+Bole+Street+Finfine+Ethiopia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-gray-800 mb-2 hover:text-orange-500 transition"
                  >
                    123 Bole Street
                  </a>
                  <p className="text-lg text-gray-600 mb-2">Finfine, Ethiopia</p>
                  <p className="text-sm text-gray-500">Open daily 8am-8pm</p>
                  <p className="text-xs text-gray-400 mt-1">Click to open in maps</p>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.google.com/?q=123+Bole+Street+Finfine+Ethiopia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-gray-200 h-48 rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition group"
            >
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-orange-100 to-orange-50 text-gray-600 group-hover:from-orange-200 group-hover:to-orange-100 transition">
                <div className="text-center">
                  <FiMapPin className="text-4xl text-orange-500 mx-auto mb-2" />
                  <p className="font-medium">123 Bole Street, Finfine</p>
                  <p className="text-sm text-orange-500">Click to open in maps →</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact