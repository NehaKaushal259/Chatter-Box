import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaImage } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Password strength
  const getStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) return "Strong";
    return "Medium";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate();


  // Image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
    try{
      
    }catch(err){
      console.error("SignUp error : ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    // console.log("Signup Data:", form);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("confirmPassword", form.confirmPassword);

    if (form.image){
      formData.append("image", form.image);
    }

    try{
      const res = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        body: formData,
      });

      // const data = await res.json();
      let data;
      try {
        data = await res.json();
      } catch {
        data = { error: "Server error (not JSON)" };
      }

      if(res.ok){
        alert("Account created Successfully! ✅");
        navigate("/login")
        console.log(data);
      }else{
        alert("Signup failed: " + data.error);
        console.log(data);
      }
    } catch(err){
      console.error("Signup Error : ", err);
      alert("Signup Failed: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center -mt-20">

      {/* Background */}
      {/* <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#2b2d42] via-[#3a3d5c] to-[#1a1c2c]"></div> */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#3b0a1e] via-[#7b1e3a] to-[#ff4d6d]"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-white">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <label className="cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <FaImage size={24} />
                )}
              </div>
              <input type="file" className="hidden" onChange={handleImage} />
            </label>
            <p className="text-xs mt-2 opacity-70">Upload Profile</p>
          </div>

          {/* Name */}
          <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
            <FaUser className="mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent outline-none w-full placeholder-gray-300"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
            <FaEnvelope className="mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full placeholder-gray-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
              <FaLock className="mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full placeholder-gray-300"
                required
              />
              <span
                className="cursor-pointer ml-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Strength Meter */}
            {form.password && (
              <p className={`text-xs mt-1 ${
                getStrength(form.password) === "Weak"
                  ? "text-red-400"
                  : getStrength(form.password) === "Medium"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}>
                Strength: {getStrength(form.password)}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
            <FaLock className="mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="bg-transparent outline-none w-full placeholder-gray-300"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-900 py-2 rounded-lg font-semibold transition shadow-lg"
          >
            Sign Up
          </button>

        </form>

        {/* Login */}
        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUp;