import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 -mt-20">
      
      {/* MAIN CARD */}
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 grid md:grid-cols-2 gap-8">

        {/* 🔹 LEFT SIDE (INFO) */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold">Contact Us 💬</h2>
          <p className="text-gray-300">
            Have questions or want to connect? Feel free to reach out to us anytime.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-red-500" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-red-500" />
              <span>support@chatterbox.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500" />
              <span>India</span>
            </div>
          </div>
        </div>

        {/* 🔹 RIGHT SIDE (FORM) */}
        <form className="space-y-5">
          <h3 className="text-xl font-semibold">Send Message</h3>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-red-500"
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
          >
            Send Message 🚀
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
