import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const images = [
  "https://img.freepik.com/free-vector/people-social-media-smartphone_24908-56304.jpg?semt=ais_rp_50_assets&w=740&q=80",
  "https://img.freepik.com/free-vector/organic-flat-customer-support-illustration_23-2148899340.jpg?semt=ais_hybrid&w=740&q=80",
  "https://img.freepik.com/free-vector/dating-app-interface_23-2148509974.jpg?semt=ais_incoming&w=740&q=80",
];

const LogIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [current, setCurrent] = useState(0);

    // 🔄 Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Login Data:", form);
    // navigate("/thanku")

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(form),
      })
      const data = await res.json()

      if (res.ok){
        alert("Login Successful ✅");

        localStorage.setItem("user", JSON.stringify(data))
        navigate("/welcome_page")
      }else{alert(data.error || "Login Failed")}
    }catch(err){
      console.error("Login Error : ", err);
      
    }

  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center -mt-20">

      {/* 🌈 Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b0a1e] via-[#7b1e3a] to-[#ff4d6d]"></div>

      {/* 🔴 Big Blurry Circles (MATCHED COLORS) */}
      <div className="absolute w-[420px] h-[420px] bg-[#ff4d6d] rounded-full top-[-120px] left-[-120px] opacity-20 blur-3xl"></div>
      <div className="absolute w-[350px] h-[350px] bg-[#7b1e3a] rounded-full bottom-[-100px] right-[-100px] opacity-25 blur-3xl"></div>
      <div className="absolute w-[250px] h-[250px] bg-[#ff85a1] rounded-full top-[40%] left-[60%] opacity-20 blur-2xl"></div>

        {/* 💎 Main Card */}
      <div className="relative z-10 w-[90%] max-w-5xl h-[500px] bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl flex overflow-hidden">

        {/* 🎠 LEFT SIDE (Image Slider) */}
        <div className="w-1/2 hidden md:block relative">
          <img
            src={images[current]}
            alt="slide"
            className="w-full h-full object-cover transition duration-700"
          />

          {/* Overlay text */}
          {/* <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-2xl font-semibold">
            Chat & Chill 💖
          </div> */}
        </div>

        {/* ✨ RIGHT SIDE (FORM) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 text-white">

          <div className="w-full max-w-sm">

            <h2 className="text-3xl font-bold text-center mb-6">
              Welcome Back 👋
            </h2>

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
                  className="bg-transparent outline-none w-full text-white placeholder-gray-200"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                <FaLock className="mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="bg-transparent outline-none w-full text-white placeholder-gray-200"
                  required
                />
                <span
                  className="cursor-pointer ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Forgot */}
              <div className="text-right text-sm">
                <a href="#" className="hover:text-pink-200">
                  Forgot Password?
                </a>
              </div>

              {/* Button */}
              <button className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg font-semibold transition shadow-lg">
                Login
              </button>
            </form>

            {/* Signup */}
            <p className="text-center text-sm mt-5">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-pink-200 hover:underline">
                Sign Up
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
   
  );
};

export default LogIn;
