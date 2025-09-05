import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatList = () => {
  const chats = useSelector((state) => state.chat.chats);

  return (
    <div className="h-screen bg-white text-black p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Smart Team Chat</h1>

      <div className="space-y-3">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            to={`/chat/${chat.id}`}
            className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 p-3 rounded-lg shadow cursor-pointer"
          >
            <div>
              <p className="font-semibold">{chat.name}</p>
              <p className="text-sm text-gray-600">
                {chat.messages.length > 0
                  ? chat.messages[chat.messages.length - 1].text
                  : "No messages yet"}
              </p>
            </div>
            <p className="text-xs text-gray-500">
              {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].time : ""}
            </p>
          </Link>
        ))}
      </div>

      {/* Button to start a new chat */}
      <div className="fixed bottom-5 right-5">
        <Link
          to="/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
        >
          + New Chat
        </Link>
      </div>
    </div>
  );
};

export default ChatList;
