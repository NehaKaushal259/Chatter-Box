import React, { useEffect, useState } from "react";

const messages = [
  "Hello! How are you? 😊",
  "Let's chat 💬",
  "Make new friends 🤝",
  "Stay connected 🌍",
  "Send your first message ✨",
  "Good vibes only 💖",
];

const emojis = ["💖", "💬", "✨", "😊", "🌸", "💕", "🌈"];

const Animated = () => {
  const [visibleMessages, setVisibleMessages] = useState([]);

  // Smooth message animation (slower + limited)
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMsg =
        messages[Math.floor(Math.random() * messages.length)];

      setVisibleMessages((prev) => [
        ...prev.slice(-2), // keep only last 2 messages
        { text: randomMsg, id: Date.now() },
      ]);

      setTimeout(() => {
        setVisibleMessages((prev) => prev.slice(1));
      }, 4000);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 -mt-20 z-20">

      {/* 🌸 Floating Emojis (Background Only) */}
      {emojis.map((emoji, i) => (
        <span
          key={i}
          className="absolute text-2xl opacity-60 animate-floatSlow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 6}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* 🌟 MAIN CONTENT (CLEAN AREA) */}
      <div className="text-center z-10 px-6 py-10 backdrop-blur-md bg-white/20 rounded-3xl shadow-xl">

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          🎉 Yay! Now You Can Chat
        </h1>

        <p className="text-lg text-white/90 mb-6">
          Make friends, share moments & enjoy chatting 💖
        </p>

        <button className="px-6 py-3 bg-white text-pink-500 font-semibold rounded-full shadow-lg hover:scale-105 transition duration-300">
          Start Chatting 💬
        </button>
      </div>

      {/* 💬 Floating Messages (SIDE ONLY, NOT CENTER) */}
      <div className="absolute inset-0 pointer-events-none">
        {visibleMessages.map((msg) => (
          <div
            key={msg.id}
            className="absolute bg-white/80 text-pink-600 px-4 py-2 rounded-full shadow-md animate-fadeSlide"
            style={{
              top: `${10 + Math.random() * 70}%`,
              left: `${Math.random() < 0.5 ? 5 : 75}%`, // only left or right side
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Animated;