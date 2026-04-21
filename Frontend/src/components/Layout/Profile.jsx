import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaSignOutAlt, FaImage } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("login"));
    navigate("/login");
  };

  // console.log(user.email);
  
  // console.log(user.custom_id);
  

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white -mt-20">

      {/* 🔥 Profile Card */}
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-[50em]  ">

        {/* 👤 Profile Image */}
        <div className="flex flex-col items-center">

            {/* <div className="flex flex-col items-center">
                <label className="cursor-pointer">
                    <img src={user?.image} alt="preview" className="w-full h-full object-cover" />
                </label>
                <p className="text-xs mt-2 opacity-70">Upload Profile</p>
            </div> */}

            <div className="flex flex-col items-center">

                <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center text-white text-4xl font-bold"
                    style={{
                        backgroundColor: user?.image ? "transparent" : "#ef4444" // red fallback
                    }}
                >
                    {user?.image ? (
                    <img
                        src={user.image ? `http://127.0.0.1:8000${user.image}` : null}
                        alt="profile"
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    user?.name?.charAt(0).toUpperCase()
                    )}
                </div>

                <p className="text-xs mt-2 opacity-70">Profile</p>

                </div>

          <h2 className="text-2xl font-bold mt-4 capitalize">
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
            <p className="font-semibold">{user?.custom_id}</p>  

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
            onClick={() => navigate("/editProfile")}
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