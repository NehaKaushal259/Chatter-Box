import React from "react";
import { FaComments, FaUser, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="relative w-full z-50">
      
      {/* Background Image */}
      {/* <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-transparent"></div>

      {/* Navbar */}
      <div className="relative flex justify-between items-center px-8 py-5 text-white">
        
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold">
          <div className="bg-red-600 p-2 rounded-full">
            <FaComments />
          </div>
          <span className="tracking-wide">CHATTER BOX</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm md:text-base">
          
          <a href="#" className="flex items-center gap-2 hover:text-red-600 transition">
            <FaPhoneAlt /> Contact
          </a>

          <a href="/login" className="flex items-center gap-2 hover:text-red-600 transition">
            <FaUser /> Login
          </a>

          {/* Sign Up Button */}
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full font-semibold transition shadow-lg">
            <Link to="/signup"> Sign Up </Link>
          </button>
        </div>
      </div>

      {/* Center Content */}
      {/* <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="relative text-4xl md:text-6xl font-bold mb-4 hover:text-gray-200">
          Welcome to Chatter Box 
          <span className="absolute -top-10 -right-22 rotate-12 z-20 p-2 rounded-full shadow-lg">
            💬
          </span>
        </h1>
        <p className="text-lg md:text-xl opacity-80 hover:text-gray-200">
          Connect. Chat. Enjoy.
        </p>
      </div> */}

    </div>
  );
};

export default Header;
