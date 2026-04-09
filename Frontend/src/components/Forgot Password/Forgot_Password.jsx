import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Forgot_Password = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Check user
  const checkUser = async () => {
    if (!form.email) {
      alert("Enter email first");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/check-user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email }),
      });

      const contentType = res.headers.get("content-type");

        let data;

        if (contentType && contentType.includes("application/json")) {
        data = await res.json();
        } else {
        const text = await res.text();
        console.error("Server error:", text);
        alert("Server error ⚠️");
        return;
        }

      if (data.exists) {
        setStep(2);
      } else {
        alert("User does not exist ❌");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Reset password
  const resetPassword = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/reset-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

        const contentType = res.headers.get("content-type");

        let data;

        if (contentType && contentType.includes("application/json")) {
        data = await res.json();
        } else {
        const text = await res.text();
        console.error("Server error:", text);
        alert("Server error ⚠️");
        return;
        }

      if (res.ok) {
        alert("Password changed successfully ✅");
        setStep(1);
      } else {
        alert(data.error || "Error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center -mt-20">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3b0a1e] via-[#7b1e3a] to-[#ff4d6d]"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl text-white w-[90%] max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Forgot Password 🔒
        </h2>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 mb-4 outline-none"
            />

            <button
              onClick={checkUser}
              className="w-full bg-pink-500 py-2 rounded-lg"
            >
              Continue
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            

            <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                <FaLock className="mr-3" />
                {/* <input
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-transparent outline-none w-full text-white placeholder-gray-200"
                    required
                /> */}
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="New Password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-transparent outline-none w-full text-white placeholder-gray-200"
                />
                <span
                    className="cursor-pointer ml-2"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>

            <br />

            <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                <FaLock className="mr-3" />
                {/* <input
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white placeholder-gray-200"
                required
                /> */}
                <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="bg-transparent outline-none w-full text-white placeholder-gray-200"
                />
                <span
                className="cursor-pointer ml-2"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>

            <br/>

            <button
              onClick={resetPassword}
              className="w-full bg-pink-500 py-2 rounded-lg"
            >
              Change Password
            </button>
          </>
        )}

        <p className="text-center mt-4 text-sm">
          <a href="/login" className="text-pink-300">
            ← Back to Login
          </a>
        </p>

      </div>
    </div>
  );
};

export default Forgot_Password;