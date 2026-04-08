import React from 'react'

const Forgot_Password = () => {
  return (
    <div className="relative h-screen flex items-center justify-center">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b0a1e] via-[#7b1e3a] to-[#ff4d6d]"></div>

        {/* Card */}
        <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl text-white w-[90%] max-w-md">

            <h2 className="text-2xl font-bold mb-3 text-center">
            Forgot Password 🔒
            </h2>

            <p className="text-sm text-center text-gray-300 mb-5">
            Enter your email to receive a reset link
            </p>

            <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-white/20 outline-none mb-4"
            />

            <button className="w-full bg-pink-500 py-2 rounded-lg">
            Send Reset Link
            </button>

            <p className="text-center mt-4 text-sm">
            <a href="/login" className="text-pink-300">
                ← Back to Login
            </a>
            </p>

        </div>
    </div>
  )
}

export default Forgot_Password
