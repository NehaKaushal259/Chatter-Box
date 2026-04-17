import React, { useState, useEffect } from "react";
import { FaComments, FaUser, FaPhoneAlt, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const navigate = useNavigate();
  const [showRequest, setShowRequest] = useState(false)
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // const loggedUser = JSON.parse(localStorage.getItem("user"));
    // setUser(loggedUser);
    const handleLogin = () => {
      setUser(JSON.parse(localStorage.getItem("user")))
    }

    window.addEventListener("login", handleLogin)

    return() => window.removeEventListener("login", handleLogin)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);

    window.dispatchEvent(new Event("login"));
    navigate("/login");
  };

  const fetchRequests = async() => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/friend-requests/?email=${user.email}`
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = [];
      }

      if (!res.ok) {
        console.error("Error:", data);
        return;
      }

      setRequests(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  

  useEffect(()=>{
    if(user){
      fetchRequests();
    }

    const handleRequestUpdate = () => {
      fetchRequests();
    }
    window.addEventListener("requestUpdated", handleRequestUpdate);

    return () => window.removeEventListener("requestUpdated", handleRequestUpdate);
  }, [user])

  // console.log("EMAIL SENT:", user?.email);
  return (
    <div className="relative w-full z-10">

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-transparent"></div>

      {/* Navbar */}
      <div className="relative flex justify-between items-center px-8 py-5 text-white">
        
        {/* Logo */}
        {/* <div className="flex items-center gap-2 text-2xl font-bold">
          <div className="bg-red-600 p-2 rounded-full">
            <FaComments />
          </div>
          <span className="tracking-wide">CHATTER BOX</span>
        </div> */}

        <div
          onClick={() => {
            if (user) {
              navigate("/chatPage"); // ✅ logged in
            } else {
              navigate("/"); // ❌ not logged in
            }
          }}
          className="flex items-center gap-2 text-2xl font-bold cursor-pointer"
        >
          <div className="bg-red-600 p-2 rounded-full">
            <FaComments />
          </div>
          <span className="tracking-wide">CHATTER BOX</span>
        </div>

        {/* Links */}
        {/* <div className="flex items-center gap-6 text-sm md:text-base">
          
          <a href="#" className="flex items-center gap-2 hover:text-red-600 transition">
            <FaPhoneAlt /> Contact
          </a>

          <a href="/login" className="flex items-center gap-2 hover:text-red-600 transition">
            <FaUser /> Login
          </a> */}

          {/* Sign Up Button */}
          {/* <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full font-semibold transition shadow-lg">
            <Link to="/signup"> Sign Up </Link>
          </button>
        </div> */}


        {/* 🔥 RIGHT SIDE */}
        <div className="flex items-center gap-6 text-sm md:text-base">

          {/* 🔹 IF USER NOT LOGGED IN */}
          {!user ? (
            <>
              <a href="#" className="flex items-center gap-2 hover:text-red-600 transition">
                <FaPhoneAlt /> Contact
              </a>

              <Link to="/login" className="flex items-center gap-2 hover:text-red-600 transition">
                <FaUser /> Login
              </Link>

              <Link
                to="/signup"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full font-semibold transition shadow-lg"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* ❤️ Friend Requests */}
              <button
                onClick={() => setShowRequest(true)}
                className="text-xl hover:text-red-500 cursor-pointer"
              >
                <FaHeart />
              </button>

              {showRequest && (
                <div className="absolute top-20 right-6 w-96 bg-gray-800 p-4 rounded-xl shadow-lg z-50">
                  
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold">Requests</h2>

                    <button onClick={() => setShowRequest(false)}>❌</button>
                  </div>

                  {/* <p className="text-gray-400">No requests</p> */}

                  {requests.length === 0 ? (
                    <p>No Requests</p>
                  ) : (
                    requests.map((r) => (
                      <div key={r.id} className="bg-gray-700 p-2 rounded mb-2">
                        {r.from_user.name}
                      </div>
                    ))
                  )}

                </div>
              )}

              {/* 👤 Profile */}
              {/* <button
                onClick={() => navigate("/profile")}
                className="text-xl hover:text-blue-400"
              >
                <FaUser />
              </button> */}

              <button
                onClick={() => navigate("/profile")}
                className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
              >
                {user?.image ? (
                  <img
                    src={`http://127.0.0.1:8000${user.image}`}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-red-500 text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {/* 🚪 Logout */}
              {/* <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button> */}
            </>
          )}
        </div>
      </div>

      {/* Center Content */}
      {/* <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="relative text-4xl md:text-6xl font-bold mb-4 hover:text-gray-200">
          Welcome to Chatter Box 
          <span className="absolute -top-10 -right-22 rotate-12 z-20 p-2 rounded-full shadow-lg">
            💬
          </span>
        </h1>
        <p className="text-lg md:text-xl opacity-80 hover:text-gray-200">
          Connect. Chat. Enjoy.
        </p>
      </div> */}

    </div>
  );
};

export default Header;
