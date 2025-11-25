import { createSocketConnection } from "../utils/socket";
import BASE_URL from "../utils/constanst";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Chat = () => {
  const [data, setData] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const getProfile = async () => {
    try {
      const user = await axios.get(BASE_URL + "user", {
        withCredentials: true,
      });
      setData(user.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      const socket = createSocketConnection();
      const user = await getProfile();

      const name = data.name;
      socket.emit("joinChat", { name });
      socket.on("messageRecieved", ({ name, text }) => {
        setMessages((message) => [...message, { name, text }]);
      });
      return () => {
        socket.disconnect();
      };
    };

    init();
  }, [data?._id]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      name: data?.name,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full max-w-5xl h-screen sm:h-[90vh] mx-auto flex flex-col bg-white sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-xl overflow-hidden sm:my-4">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-700">
        <h1 className="text-lg sm:text-xl font-bold text-white">
          Community Chat
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
          Muvies Global Chat
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 bg-gray-50 space-y-3 sm:space-y-4">
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.name !== data?.name ? (
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm flex-shrink-0">
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col max-w-[75%] sm:max-w-md">
                  <p className="text-xs font-semibold text-gray-700 mb-1 px-1">
                    {msg.name}
                  </p>
                  <div className="bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-200 text-sm sm:text-base text-gray-800 break-words">
                    {msg.text}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-end gap-2 sm:gap-3">
                <div className="flex flex-col items-end max-w-[75%] sm:max-w-md">
                  <p className="text-xs font-semibold text-gray-600 mb-1 px-1">
                    You
                  </p>
                  <div className="bg-blue-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl rounded-tr-sm shadow-sm text-sm sm:text-base break-words">
                    {msg.text}
                  </div>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm flex-shrink-0">
                  {data?.name?.charAt(0).toUpperCase() || "Y"}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2 sm:gap-3">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <button
            onClick={sendMessage}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-blue-600 active:scale-95 transition-all shadow-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
