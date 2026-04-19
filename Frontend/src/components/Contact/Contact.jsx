import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "Bug",
    message: "",
    screenshot: null
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "screenshot") {
      setFormData({ ...formData, screenshot: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/contact/", {
        method: "POST",
        body: data
      });

      if (res.ok) {
        setStatus("✅ Sent successfully!");
      } else {
        setStatus("❌ Failed");
      }
    } catch (err) {
      setStatus("⚠️ Server error");
    }
  };

  return (
  <div className="min-h-screen w-full bg-[#1a1a1a] flex items-center justify-center px-4 -mt-20">
  
  <div className="w-full max-w-lg p-6 bg-[#1e1e1e] rounded-xl text-white text-center shadow-lg">
    
    <h2 className="mb-2 text-xl font-semibold">Contact Support 💬</h2>
    
    <p className="text-sm mb-5 text-gray-400">
      Found a bug or need help? Tell us and we’ll fix it ASAP 🚀
    </p>

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="p-2.5 rounded-lg bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-red-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="p-2.5 rounded-lg bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-red-500"
      />

      <select
        name="issueType"
        value={formData.issueType}
        onChange={handleChange}
        className="p-2.5 rounded-lg bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-red-500"
      >
        <option value="Bug">🐞 Bug Report</option>
        <option value="Help">🙋 Need Help</option>
        <option value="Feedback">💡 Feedback</option>
      </select>

      <textarea
        name="message"
        placeholder="Describe your issue..."
        value={formData.message}
        onChange={handleChange}
        required
        className="p-2.5 rounded-lg bg-[#2a2a2a] text-white outline-none min-h-[100px] focus:ring-2 focus:ring-red-500"
      />

      <input
        type="file"
        name="screenshot"
        onChange={handleChange}
        className="p-2 rounded-lg bg-[#2a2a2a] text-white file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-red-500 file:text-white"
      />

      <button
        type="submit"
        className="p-3 rounded-lg bg-red-500 hover:bg-red-800 transition text-white font-bold"
      >
        Send Message 🚀
      </button>

      <p>{status}</p>
    </form>

    {status && <p className="mt-4">{status}</p>}
  </div>

</div>
  );
};

export default Contact;