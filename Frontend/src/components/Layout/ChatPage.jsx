import React, { useEffect, useState } from "react";

const ChatPage = () => {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 Fetch Friends
  const fetchFriends = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/friends/");
    const data = await res.json();
    setFriends(data);
  };

  // 🔹 Fetch Friend Requests
  const fetchRequests = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/friend-requests/");
    const data = await res.json();
    setRequests(data);
  };

  // 🔹 Fetch Messages
  const fetchMessages = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/api/messages/${id}/`);
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchFriends();
    fetchRequests();
  }, []);

  return (
    <div className="h-screen flex bg-gray-900 text-white -mt-20">

      {/* 🔹 LEFT SIDEBAR */}
      <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto pt-20">

        <h2 className="text-xl font-bold mb-4">Friends</h2>

        {/* Friends List */}
        {friends.map((f) => (
          <div
            key={f.id}
            onClick={() => {
              setSelectedUser(f);
              fetchMessages(f.id);
            }}
            className="p-3 bg-gray-700 rounded-lg mb-2 cursor-pointer hover:bg-gray-600"
          >
            {f.name}
          </div>
        ))}

        {/* Friend Requests */}
        <h2 className="text-xl font-bold mt-6 mb-2">Requests</h2>

        {requests.map((r) => (
          <div key={r.id} className="bg-gray-700 p-3 rounded-lg mb-2">
            <p>{r.from_user.name}</p>

            <div className="flex gap-2 mt-2">
              <button className="bg-green-600 px-3 py-1 rounded">
                Accept
              </button>
              <button className="bg-red-600 px-3 py-1 rounded">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 RIGHT CHAT AREA */}
      <div className="w-2/3 flex flex-col">

        {selectedUser ? (
          <>
            {/* Header */}
            <div className="p-4 bg-gray-800 border-b">
              <h2 className="text-lg font-semibold">
                Chat with {selectedUser.name}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.sender === user.id
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <span className="bg-gray-700 px-3 py-2 rounded-lg inline-block">
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-800 flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type message..."
                className="flex-1 px-4 py-2 rounded bg-gray-700 outline-none"
              />
              <button className="bg-red-600 px-4 rounded">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="h-full w-[61em] m-6 mt-24 bg-red-900/70 rounded-xl">
            <h2>Select a friend to start chatting 💬</h2>

            <div className="absolute bottom-6 right-6 w-[61em] bg-gray-800 p-3 flex items-center gap-3 border-t border-gray-700 rounded-b-xl">
  
                <input
                    type="text"
                    placeholder="Enter your message..."
                    className="flex-1 px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
                />

                <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full text-white font-semibold">
                    Send
                </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;