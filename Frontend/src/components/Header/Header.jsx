import React, { useState, useEffect } from "react";
import { FaComments, FaUser, FaPhoneAlt, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const navigate = useNavigate();
  const [showRequest, setShowRequest] = useState(false)
  const [requests, setRequests] = useState({
    received: [],
    sent: []
  });

  // const requestCount = requests.received.length;

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
    if (!user?.email) return;
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

      if (res.ok) {
        // console.error("Requesta:", data);
        setRequests(data);
      }
      // setRequests(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  

  useEffect(() => {
    if (!user) return;

    fetchRequests();

    // const interval = setInterval(fetchRequests, 3000); // 🔥 auto refresh

    const handleUpdate = () => {
      fetchRequests();
    }
    window.addEventListener("requestUpdated", handleUpdate);
    return () => {
      // clearInterval(interval)
      window.removeEventListener("requestUpdated", handleUpdate)
    };
  }, [user]);

  // console.log("EMAIL SENT:", user?.email);


  const handleResponse = async (id, action) => {
    await fetch("http://127.0.0.1:8000/api/respond-request/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        request_id: id,
        action: action
      })
    });

    fetchRequests(); // refresh
  };


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
              <a href="/contact" className="flex items-center gap-2 hover:text-red-600 transition">
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

              {/* 🔴 Notification Badge */}
            {/* {requests.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {requests.received.length}
              </span>
            )} */}

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
                        <div className="flex mb-3"> 
                          {/* <img src={`http://127.0.0.1:8000${r.from_user.image}`} alt="" className="w-10 h-10 rounded-full" /> */}
                          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-red-500 text-white font-bold">
                            {r.from_user.image ? (
                              <img
                                src={`http://127.0.0.1:8000${r.from_user.image}`}
                                alt="profile"
                                className="w-12 h-12 object-cover"
                              />
                            ) : (
                              r.from_user.name?.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div>
                            <span className="capitalize ml-6 mt-1"> {r.from_user.name} </span> <br />
                            <span className="ml-6 mt-1 text-xs"> {r.from_user.custom_id} </span>
                          </div>
                        </div>

                        <div className="flex gap-6">
                          <button 
                          onClick={() => handleResponse(r.id, "accepted")}
                          className="bg-green-500 px-2 py-1 rounded w-44">
                            Accept
                          </button>
                          <button 
                          onClick={() => handleResponse(r.id, "rejected")}
                          className="bg-red-500 px-2 py-1 rounded w-44">
                            Reject
                          </button>
                        </div>
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
