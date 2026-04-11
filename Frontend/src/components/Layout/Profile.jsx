import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaSignOutAlt, FaImage } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
 const [preview, setPreview] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("login"));
    navigate("/login");
  };

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

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white -mt-20">

      {/* 🔥 Profile Card */}
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-[50em]  ">

        {/* 👤 Profile Image */}
        <div className="flex flex-col items-center">
          {/* <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-red-800 shadow-lg">
            <img
              src={user?.image }
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div> */}

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

          <h2 className="text-2xl font-bold mt-4">
            {user?.name || "User Name"}
          </h2>

          <p className="text-gray-300 text-sm">
            {user?.email || "user@email.com"}
          </p>
        </div>

        {/* 📊 Info Section */}
        <div className="mt-6 space-y-3">

          <div className="bg-white/10 p-3 rounded-lg">
            <p className="text-sm text-gray-300">User ID</p>
            <p className="font-semibold">{user?.id}</p>
          </div>

          <div className="bg-white/10 p-3 rounded-lg">
            <p className="text-sm text-gray-300">Email</p>
            <p className="font-semibold">{user?.email}</p>
          </div>

          <div className="bg-white/10 p-3 rounded-lg">
            <p className="text-sm text-gray-300">Bio</p>
            <p className="font-semibold">{user?.bio}</p>
          </div>

        </div>

        {/* ⚙️ Buttons */}
        <div className="mt-6 flex gap-3">

          {/* Edit */}
          <button
            onClick={() => navigate("/edit-profile")}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition"
          >
            <FaUserEdit /> Edit
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-lg transition"
          >
            <FaSignOutAlt /> Logout
          </button>

        </div>

      </div>
    </div>
  );
};

export default Profile;