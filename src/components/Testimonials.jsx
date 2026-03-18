import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      text: "The Green Detox juice has become my post-workout essential. Pure quality!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      text: "Finally found a juice brand with no added sugar! The Tropical Punch is amazing.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      text: "I recommend these juices to all my yoga students. Fresh and pure!",
      rating: 5
    }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#2c3e2f] mb-4">
          Loved by <span className="text-[#f5a65b]">Thousands</span>
        </h2>
        <p className="text-center text-gray-600 mb-12">See what our customers are saying</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-[#fff9f0] p-8 rounded-3xl shadow-lg">
              <div className="text-[#f5a65b] text-2xl mb-4">★★★★★</div>
              <p className="text-gray-700 mb-6">"{t.text}"</p>
              <p className="font-bold text-[#2c3e2f]">- {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials