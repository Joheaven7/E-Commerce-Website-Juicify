import React from 'react'
import assets from '../assets/assets.js'

const About = () => {
  // Stats data
  const stats = [
    { number: "50+", label: "Unique Flavors" },
    { number: "10k+", label: "Happy Customers" },
    { number: "100%", label: "Organic Ingredients" },
    { number: "24/7", label: "Fresh Pressed" }
  ]

  // Values data
  const values = [
    {
      icon: "🌱",
      title: "100% Organic",
      description: "Only the finest organic fruits and vegetables go into our juices"
    },
    {
      icon: "🤝",
      title: "Local Partnerships",
      description: "Supporting local farmers and reducing our carbon footprint"
    },
    {
      icon: "💚",
      title: "No Additives",
      description: "Pure juice with no added sugar, preservatives, or concentrates"
    },
    {
      icon: "♻️",
      title: "Eco-Friendly",
      description: "Sustainable packaging and zero-waste production process"
    }
  ]

  // Scroll to contact section function
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="about" className="py-20 px-4 bg-linear-to-b from-white to-[#fff9f0]">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e2f] mb-4">
            Our <span className="text-[#f5a65b]">Story</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From a small kitchen to your favorite juice brand — serving freshness since 2020
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="flex-1">
            <img 
              src={assets.about_image} 
              alt="Our team pressing fresh juices" 
              className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto hover:scale-105 transition duration-500"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-bold text-[#2c3e2f]">Fresh Pressed With Love</h3>
            
            {/* Shortened impactful paragraph - 3 lines */}
            <p className="text-gray-600 text-lg leading-relaxed">
              What started as a small kitchen experiment is now a thriving juice brand serving 10,000+ happy customers. We partner with local farmers to bring you 50+ unique, organic flavors — each bottle cold-pressed to perfection with zero additives.
            </p>
            
            <div className="pt-4">
              <button 
                onClick={scrollToContact}
                className="bg-[#f5a65b] hover:bg-[#e09244] text-white px-8 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-xl"
              >
                Meet The Team
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-linear-to-b from-[#fff9f0] to-white rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100"
            >
              <div className="text-4xl font-bold text-[#f5a65b] mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-20">
  <h3 className="text-3xl font-bold text-center text-[#2c3e2f] mb-12">What We Stand For</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    {values.map((value, index) => (
      <div 
        key={index} 
        className="flex gap-5 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100 group"
      >
        {/* Icon with circular background */}
        <div className="shrink-0">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300  group-hover:text-white">
            {value.icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h4 className="text-xl font-bold text-[#2c3e2f] mb-2">{value.title}</h4>
          <p className="text-gray-600 leading-relaxed">{value.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Call to Action */}
        <div className="text-center bg-linear-to-r from-[#f5a65b] to-[#ffb347] rounded-3xl p-12 shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Taste the Freshness?
          </h3>
          <p className="text-white text-lg mb-8 opacity-90">
            Join thousands of happy customers enjoying our fresh-pressed juices daily
          </p>
          <button className="bg-white text-[#f5a65b] hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition shadow-lg hover:shadow-xl">
            Shop Our Collection
          </button>
        </div>
      </div>
    </section>
  )
}

export default About