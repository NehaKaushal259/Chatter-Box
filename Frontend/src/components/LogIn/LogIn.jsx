import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", form);
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center -mt-20">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-white">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
            <FaUser className="mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-white placeholder-gray-300"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg relative">
            <FaLock className="mr-3" />
            
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-white placeholder-gray-300"
              required
            />

            {/* Eye Icon */}
            <span
              className="cursor-pointer ml-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <a href="#" className="hover:text-blue-400">
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold transition shadow-lg"
          >
            Login
          </button>

        </form>

        {/* Signup Link */}
        <p className="text-center text-sm mt-5">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LogIn;
