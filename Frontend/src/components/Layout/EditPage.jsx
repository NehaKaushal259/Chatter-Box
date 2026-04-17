import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaImage, FaSave } from "react-icons/fa";

function EditPage() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    bio: storedUser?.bio || "",
    image: null,
  });

  const [preview, setPreview] = useState(
    storedUser?.image || null
  );

  // 🔹 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Handle image
  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedUser = {
//       ...storedUser,
//       name: form.name,
//       email: form.email,
//       bio: form.bio,
//       image: preview,
//     };

//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     window.dispatchEvent(new Event("login"));

//     alert("Profile Updated ✅");
//     navigate("/profile");
//   };



const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("email", form.email);
  formData.append("bio", form.bio);

  if (form.image) {
    formData.append("image", form.image); // 🔥 actual file
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/api/update-profile/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ save backend response (REAL IMAGE URL)
    //   localStorage.setItem("user", JSON.stringify(data));

        const updatedUser = {
            ...storedUser,
            ...data,
        }

        localStorage.setItem("user", JSON.stringify(updatedUser))

        window.dispatchEvent(new Event("login"));

        alert("Profile Updated ✅");
        navigate("/profile");
    } else {
      alert(data.error);
    }

  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white -mt-20">

      {/* 🔥 SAME CARD STYLE AS PROFILE */}
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-[50em]">

        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Profile ✏️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* 👤 IMAGE */}
          <div className="flex flex-col items-center">
            <label className="cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaImage size={24} />
                )}
              </div>
              <input type="file" className="hidden" onChange={handleImage} />
            </label>
            <p className="text-xs mt-2 opacity-70">Change Profile</p>
          </div>

          {/* 📝 NAME */}
          <div className="flex items-center bg-white/10 px-4 py-3 rounded-lg">
            <FaUser className="mr-3 text-gray-300" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="bg-transparent outline-none w-full text-white placeholder-gray-400"
            />
          </div>

          {/* 📧 EMAIL */}
          <div className="flex items-center bg-white/10 px-4 py-3 rounded-lg">
            <FaEnvelope className="mr-3 text-gray-300" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-transparent outline-none w-full text-white placeholder-gray-400"
            />
          </div>

          {/* 🧾 BIO */}
          <div className="bg-white/10 px-4 py-3 rounded-lg">
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Write your bio..."
              rows="3"
              className="bg-transparent outline-none w-full text-white placeholder-gray-400 resize-none"
            />
          </div>

          {/* 💾 SAVE BUTTON */}
          <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition">
            <FaSave /> Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditPage;

