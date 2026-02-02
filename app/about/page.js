import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-slate-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">About Us</h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Revolutionizing online shopping with quality products, exceptional service, and a commitment to customer satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Founded in 2020, we started with a simple mission: to make high-quality products accessible to everyone. What began as a small venture has grown into a trusted e-commerce platform serving thousands of satisfied customers worldwide.
              </p>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Our passion for innovation and customer service drives everything we do. We carefully curate each product, ensuring it meets our rigorous standards for quality, sustainability, and value.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Today, we're proud to be a leading destination for shoppers seeking unique, high-quality products backed by outstanding customer support.
              </p>
            </div>
            <div className="bg-linear-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    5+
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">Years</p>
                    <p className="text-slate-600">In Business</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    50K+
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">Happy Customers</p>
                    <p className="text-slate-600">Worldwide</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    10K+
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">Products</p>
                    <p className="text-slate-600">Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Quality */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-600">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Quality First</h3>
                <p className="text-slate-600 leading-relaxed">
                  Every product is carefully selected and tested to ensure it meets our high standards. We never compromise on quality.
                </p>
              </div>

              {/* Customer Service */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-purple-600">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Customer Focused</h3>
                <p className="text-slate-600 leading-relaxed">
                  Your satisfaction is our priority. Our dedicated support team is here to help you every step of the way.
                </p>
              </div>

              {/* Innovation */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-pink-600">
                <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Innovation</h3>
                <p className="text-slate-600 leading-relaxed">
                  We continuously improve our platform and processes to provide you with the best shopping experience possible.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-white mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Products</h3>
                <p className="text-slate-300">100% authentic and quality assured</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                <p className="text-slate-300">Competitive pricing guaranteed</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
                <p className="text-slate-300">Quick and reliable delivery</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="text-slate-300">30-day hassle-free returns</p>
              </div>
            </div>
          </div>

          {/* Our Team Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Meet Our Team</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Behind every great shopping experience is a passionate team dedicated to making it happen.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-linear-to-br from-blue-400 to-blue-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Sarah Johnson</h3>
                  <p className="text-blue-600 font-semibold mb-3">Founder & CEO</p>
                  <p className="text-slate-600">
                    Visionary leader with 15 years of e-commerce experience, driving innovation and growth.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-linear-to-br from-purple-400 to-purple-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Michael Chen</h3>
                  <p className="text-purple-600 font-semibold mb-3">Head of Operations</p>
                  <p className="text-slate-600">
                    Ensures seamless operations and timely delivery for all our valued customers.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 bg-linear-to-br from-pink-400 to-pink-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Emily Rodriguez</h3>
                  <p className="text-pink-600 font-semibold mb-3">Customer Success Lead</p>
                  <p className="text-slate-600">
                    Passionate about creating exceptional experiences and building lasting relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover amazing products at unbeatable prices.
            </p>
            <a 
              href="/" 
              className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page