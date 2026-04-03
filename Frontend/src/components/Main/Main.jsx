import React from 'react'

function Main() {
  return (
    <div className="relative h-screen w-full -mt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

      {/* Center Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="relative text-4xl md:text-6xl font-bold mb-4 hover:text-gray-200">
          Welcome to Chatter Box 
          <span className="absolute -top-10 -right-22 rotate-12 z-20 p-2 rounded-full shadow-lg">
            💬
          </span>
        </h1>
        <p className="text-lg md:text-xl opacity-80 hover:text-gray-200">
          Connect. Chat. Enjoy.
        </p>
      </div>

    </div>
  )
}

export default Main


