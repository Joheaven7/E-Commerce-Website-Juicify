import React from 'react'
import { useNavigate } from "react-router-dom";
import assets from '../assets/assets.js'

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div id='home' className='flex flex-col items-center bg-linear-to-b from-[#fff9f0] to-white'>

      {/* Trust badge */}
      <div className='mt-12 inline-flex items-center gap-2 border p-1.5 pr-4 rounded-full border-gray-300 bg-white shadow-sm'>
        <img className="w-20 h-auto" src={assets.group_profile} alt="Happy customers" />
        <p className='text-xs font-medium text-gray-700'>Trusted by 10k+ people</p>
      </div>

      <div id='hero' className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-16 px-4 sm:px-12 lg:px-24 w-full'>

        {/* Left Content */}
        <div className='flex-1 text-center lg:text-left space-y-6'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2c3e2f] leading-tight'>
            Freshly Pressed,
            <span className='text-[#f5a65b] block sm:inline'> Naturally Delicious</span>
          </h1>

          <p className='text-lg text-[#4a5a4a] max-w-lg mx-auto lg:mx-0'>
            Cold-pressed juices made from the freshest organic fruits and vegetables.
            No added sugar, no preservatives — just pure goodness in every sip.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
            <button
              onClick={() => navigate('/cart')}
              className='bg-[#f5a65b] hover:bg-[#e09244] text-white font-semibold px-8 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl'
            >
              Shop Now
            </button>
            <button
              onClick={() => {
                const section = document.getElementById("products");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className='border-2 border-[#f5a65b] text-[#2c3e2f] hover:bg-[#f5a65b] hover:text-white font-semibold px-8 py-3 rounded-full transition duration-300'
            >
              Our Menu
            </button>
          </div>

          {/* Mobile floating badge */}
          <div className='lg:hidden inline-flex mt-4 bg-[#ffb347] text-white p-3 rounded-full w-20 h-20 items-center justify-center shadow-lg mx-auto lg:mx-0'>
            <span className='font-bold text-sm text-center'>Fresh<br />Daily</span>
          </div>
        </div>

        {/* Right Image */}
        <div className='flex-1 relative'>
          <img
            src={assets.hero_image}
            alt="Fresh juice collection"
            className='w-full max-w-md mx-auto lg:max-w-full rounded-2xl shadow-2xl'
          />
          {/* Desktop floating badge */}
          <div className='hidden lg:flex absolute -top-4 -right-4 bg-[#ffb347] text-white p-4 rounded-full w-24 h-24 items-center justify-center shadow-lg animate-bounce'>
            <span className='font-bold text-sm text-center'>Fresh<br />Daily</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero