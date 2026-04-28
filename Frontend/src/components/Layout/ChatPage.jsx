import React, { useEffect, useState , useRef} from "react";
// import Request from "./Request";   

const ChatPage = () => {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <div>Loading...</div>;

  const messagesEndRef = useRef(null);

  useEffect(() =>{
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth"})
  }, [messages])

  // 🔹 Fetch Friends 
  const fetchFriends = async () => {
    // const res = await fetch(`http://127.0.0.1:8000/api/friend-requests/?email=${user.email}`);
    const res = await fetch(
      `http://127.0.0.1:8000/api/friends/?email=${user.email}`
    )
    try{
      if (!res.ok) {
        console.error("Failed to fetch friends");
        return;
      }

      const data = await res.json();
      setFriends(Array.isArray(data) ? data : []);

      console.log("FRIENDS API RESPONSE:", data);
    } catch (err) {
      console.error("Fetch Friends Error:", err);
    }
  };


  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/users/?email=${user.email}`
      );

      if (!res.ok) {
        console.error("Failed to fetch users");
        return;
      }

      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("Fetch Users Error:", err);
    }
  }

  // 🔹 Fetch Messages
  const fetchMessages = async (friendId) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/get-messages/${user.id}/${friendId}/`
      );

      const data = await res.json();
      console.log("Message : ", data);
      
      // setMessages(Array.isArray(data) ? data : []);
      setMessages((prev) => {
        const newMessages = Array.isArray(data) ? data : [];

        // prevent UI flicker / overwrite
        if (JSON.stringify(prev) !== JSON.stringify(newMessages)) {
          return newMessages;
        }
        return prev;
      });
    } catch (err) {
      console.error("Fetch Messages Error:", err);
    }
  };

  useEffect(() => {
    if (!selectedUser) return;

    fetchMessages(selectedUser.id);
    const interval = setInterval(() => {
      fetchMessages(selectedUser.id);
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedUser]);


  // const sendRequest = async (id) => {
  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/api/send-request/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         from_email: user.email,
  //         to_id: id,
  //       }),
  //     });

  //     if (!res.ok) {
  //       alert("Failed to send request ❌");
  //       return;
  //     }

  //     alert("Request Sent ✅");

  //     setRequests((prev) => prev.filter((u) => u.id !== id));

  //     await fetchFriends();

  //     window.dispatchEvent(new Event("requestUpdated"));

  //   } catch (err) {
  //     console.error("Send Request Error:", err);
  //   }
  // }


  
  useEffect(() => {
    if (!user) return;

    fetchFriends();
    fetchUsers();
  }, []);


const handleSend = async () => {
  if (!text.trim() || !selectedUser) return;

  const messageText = text; // ✅ store before clearing

  // ✅ show instantly in UI
  const tempMessage = {
    sender: user.id,
    message: messageText,
  };

  setMessages((prev) => [...prev, tempMessage]);

  setText(""); // clear input AFTER saving

  try {
    const res = await fetch("http://127.0.0.1:8000/api/send-message/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: user.id,
        receiver: selectedUser.id,
        message: messageText,
      }),
    });

    if (!res.ok) {
      console.error("Failed to send");
    }
  } catch (err) {
    console.error("Send Message Error:", err);
  }
};

  return (
    <div className="h-screen flex bg-gray-900 text-white -mt-20 relative">

      {/* 🔹 LEFT SIDEBAR */}
      <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto pt-20">

        <div className="h-80 ml-4">
          <h2 className="text-xl font-bold mb-4">Friends</h2>

          {/* Friends List */}
          {friends.map((f) => (
            <div
              key={f.id}
              onClick={() => {
                setSelectedUser(f);
                fetchMessages(f.id);
              }}
              className="p-3 bg-gray-700 rounded-lg mb-2 cursor-pointer hover:bg-gray-600 flex mx-5"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-red-500 text-white font-bold">
                  {f.image ? (
                    <img
                      src={`http://127.0.0.1:8000${f.image}`}
                      alt="profile"
                      className="w-12 h-12 object-cover"
                    />
                  ) : (
                    f.name?.charAt(0).toUpperCase()
                  )}
                </div>
              <span className="ml-5 mt-2 text-lg capitalize">{f.name}</span>
            </div>
          ))}

        </div>

        
        {/* Friend Suggestion */}
        <div className=" mt-4 mb-2  h-72 p-3 relative overflow-hidden hover:overflow-y-scroll">
          <h2 className="text-xl font-bold mb-6">Suggestions</h2>

          {requests
          .filter((r) => !friends.some((f) => f.id === r.id))
          .map((r) => (
            <div key={r.id} className="bg-gray-700 p-3 rounded-lg mb-2 flex mx-5 w-[26em]">
              {/* <img src={ r.image ? `http://127.0.0.1:8000${r.image}` : "https://via.placeholder.com/50"}
                alt="profile"
                className="w-12 h-12 rounded-full" /> */}

                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-red-500 text-white font-bold">
                  {r.image ? (
                    <img
                      src={`http://127.0.0.1:8000${r.image}`}
                      alt="profile"
                      className="w-12 h-12 object-cover"
                    />
                  ) : (
                    r.name?.charAt(0).toUpperCase()
                  )}
                </div>
              <div className="mt-1 ml-3"> 
                <p className="">{r.name}</p>
                <p className="text-xs">{r.custom_id}</p>
              </div>

              <button
                onClick={() => sendRequest(r.id)}
                className="bg-blue-600 px-3 py-1 rounded mt-2 ml-20 w-44 cursor-pointer"
              >
                Follow
              </button>
            </div>
          ))}
          
        </div>
      </div>

      {/* 🔹 RIGHT CHAT AREA */}
      <div className="w-2/3 flex flex-col">

        {selectedUser ? (
          <>
            {/* Header */}
            <div className="p-4 bg-gray-800 border-b flex items-center gap-3">
  
              {/* User Image */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-red-500 flex items-center justify-center text-white font-bold">
                {selectedUser.image ? (
                  <img
                    src={`http://127.0.0.1:8000${selectedUser.image}`}
                    alt="profile"
                    className="w-10 h-10 object-cover"
                  />
                ) : (
                  selectedUser.name?.charAt(0).toUpperCase()
                )}
              </div>

              {/* User Name */}
              <h2 className="text-lg font-semibold capitalize">
                {selectedUser.name}
              </h2>
            </div>


            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-gray-400">No messages yet</p>
              ) : (
                messages.map((msg, index) => {
                  const isMe = Number(msg.sender) === Number(user.id);

                  return (
                    <div
                      key={index}
                      className={`mb-2 ${isMe ? "text-right" : "text-left"}`}
                    >
                      <span className="bg-gray-700 px-3 py-2 rounded-lg inline-block">
                        {msg.message || "EMPTY"}
                      </span>
                    </div>
                  );
                })
              )}
            </div>


            <div ref={messagesEndRef}></div>

            {/* Input */}
            <div className="p-4 bg-gray-800 flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key === "Enter") handleSend();
                }}
                placeholder="Type message..."
                className="flex-1 px-4 py-2 rounded bg-gray-700 outline-none"
              />
              <button 
              onClick={handleSend}
              className="bg-red-600 px-4 rounded">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="h-full w-[61em] m-6 mt-24 rounded-xl">
            {/* <h2>Select a friend to start chatting 💬</h2> */}

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


