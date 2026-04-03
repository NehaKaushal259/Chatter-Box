import React, { useEffect, useRef } from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaApple, FaGooglePlay } from "react-icons/fa";

function Footer() {

  // Scroll Reveal
  const footerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          footerRef.current.classList.add("opacity-100", "translate-y-0");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(footerRef.current);
  }, []);

  return (
    <footer
      ref={footerRef}
      className="opacity-0 translate-y-10 -mt-10 
      bg-black backdrop-blur-lg text-white px-8 py-10 border-t border-white/20"
    >

      {/* Top Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 text-xl font-bold mb-3">
            <div className="bg-blue-500 p-2 rounded-full">💬</div>
            <span>CHATTER BOX</span>
          </div>
          <p className="text-sm opacity-70">
            Connect with friends, share moments, and chat anytime anywhere.
          </p>
        </div>

        {/* What We Do */}
        <div>
          <h3 className="font-semibold mb-3">What We Do</h3>
          <ul className="space-y-2 text-sm">
            {["Real-time Messaging","Secure Chats","Media Sharing","Group Conversations"].map((item,i)=>(
              <li key={i} className="relative group cursor-pointer">
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Who We Are */}
        <div>
          <h3 className="font-semibold mb-3">Who We Are</h3>
          <ul className="space-y-2 text-sm">
            {["About Us","Our Team","Careers","Privacy Policy"].map((item,i)=>(
              <li key={i} className="relative group cursor-pointer">
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Use Chat App */}
        <div>
          <h3 className="font-semibold mb-3">Use Chat App</h3>
          <ul className="space-y-2 text-sm">
            {["Web Version","Android App","iOS App","Desktop App"].map((item,i)=>(
              <li key={i} className="relative group cursor-pointer">
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Help + Newsletter + Download */}
        <div>
          <h3 className="font-semibold mb-3">Need Help?</h3>
          <ul className="space-y-2 text-sm mb-4">
            {["Support Center","FAQs","Contact Us"].map((item,i)=>(
              <li key={i} className="relative group cursor-pointer">
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* Newsletter */}
          <div className="mb-4">
            <p className="text-sm mb-2">Subscribe</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 rounded-l-lg bg-white/20 outline-none text-sm"
              />
              <button className="bg-blue-500 px-3 py-2 rounded-r-lg text-sm hover:bg-blue-600 transition">
                Go
              </button>
            </div>
          </div>

          {/* Download */}
          <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded-lg text-sm hover:scale-105 transition">
              <FaGooglePlay /> Play Store
            </button>

            <button className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded-lg text-sm hover:scale-105 transition">
              <FaApple /> App Store
            </button>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-6"></div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-xs opacity-70">
          © {new Date().getFullYear()} Chatter Box. All rights reserved.
        </p>

        {/* Social */}
        <div className="flex gap-5 text-lg">
          <FaFacebook className="cursor-pointer hover:text-blue-500 hover:scale-110 transition" />
          <FaInstagram className="cursor-pointer hover:text-pink-400 hover:scale-110 transition" />
          <FaTwitter className="cursor-pointer hover:text-blue-400 hover:scale-110 transition" />
        </div>

      </div>

    </footer>
  )
}

export default Footer;
