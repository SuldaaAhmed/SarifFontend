"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function LiveChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    if (isChatOpen) {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(formatted);
    }
  }, [isChatOpen]);

  const handleSendToWhatsApp = () => {
    if (!message.trim()) return;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/252610631155?text=${encodedMessage}`,
      "_blank"
    );
    setIsChatOpen(false);
    setMessage("");
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendToWhatsApp();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-[#25D366] p-4 rounded-full shadow-xl hover:scale-110 transition-all z-50 flex items-center justify-center"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="text-white h-7 w-7" />
      </button>

      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setIsChatOpen(false)}
          ></div>

          {/* Chat Panel */}
          <div className="w-full md:w-96 bg-white shadow-2xl h-screen rounded-l-3xl animate-slideInRight flex flex-col">

            {/* Header */}
            <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow">
                    <span className="text-[#25D366] font-bold text-lg">
                      K
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Eng Kahiye
                    </h3>
                    <p className="text-xs opacity-90">
                      Usually replies within 1 hour
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white text-xl"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col p-6 overflow-y-auto">

              {/* Welcome Message */}
              <div className="mb-6">
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-xs">
                  <p className="text-gray-800 text-sm">
                    Hello 👋 How can I help you?
                  </p>
                </div>
                <span className="text-xs text-gray-400 mt-2 block">
                  {currentTime}
                </span>
              </div>

              {/* Input Area */}
              <div className="mt-auto">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#25D366] focus:outline-none resize-none text-sm"
                  rows={3}
                />

                <button
                  onClick={handleSendToWhatsApp}
                  disabled={!message.trim()}
                  className={`w-full mt-4 py-3 rounded-xl text-sm font-semibold transition ${
                    message.trim()
                      ? "bg-[#25D366] text-white hover:bg-[#1ebe5d]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Send via WhatsApp
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
}