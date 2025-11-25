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
    <div className="w-full max-w-3xl h-[81.5vh] m-auto flex flex-col bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      <div className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-gray-100">
        <h1 className="text-xl font-semibold text-gray-700">Community Chat</h1>
        <p className="text-xs text-gray-500">Muvies Global Chat</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className="my-3">
            {msg.name !== data?.name && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">
                    {msg.name}
                  </p>
                  <div className="bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-xl mt-1 max-w-xs">
                    {msg.text}
                  </div>
                </div>
              </div>
            )}

            {/* You */}
            {msg.name === data?.name && (
              <div className="flex items-start justify-end gap-2">
                <div>
                  <p className="text-xs text-gray-500 text-right font-medium">
                    You
                  </p>
                  <div className="bg-blue-500 text-white shadow-md px-4 py-2 rounded-xl mt-1 max-w-xs">
                    {msg.text}
                  </div>
                </div>
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                  Y
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
