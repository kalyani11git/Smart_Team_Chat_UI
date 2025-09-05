import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../redux/chatSlice";

const ChatWindow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const chat = useSelector((state) =>
    state.chat.chats.find((c) => c.id === Number(id))
  );

  if (!chat) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Chat not found.</p>
      </div>
    );
  }

  // time 
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Send manual message
  const handleSend = () => {
    if (!input.trim()) return;

    dispatch(
      addMessage({
        chatId: chat.id,
        message: {
          id: Date.now(),
          sender: "Me",
          text: input,
          time: getCurrentTime(),
        },
      })
    );
    setInput("");
  };

  // Icebreaker 
  const handleIcebreaker = () => {
    if (chat.messages.length === 0) {
      setInput("Hey! How's your day going?"); 
    } else {
      alert("Icebreaker is only for new chats.");
    }
  };

  // Summarize Chat
  const handleSummarize = () => {
    if (chat.messages.length === 0) {
      alert("No messages to summarize.");
      return;
    }

    const summary = `Summary of ${chat.name}'s \n\n Last message: "${
      chat.messages[chat.messages.length - 1].text
    }"`;

    alert(summary);
  };

  // Smart Reply 
  const handleSmartReply = () => {
    setInput("Sure, sounds good!"); // suggest
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <Link to="/" className="font-bold">&larr; Back</Link>
        <h2 className="text-lg font-semibold">{chat.name}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {chat.messages.length === 0 ? (
          <p className="text-gray-500 italic">No messages yet.</p>
        ) : (
          chat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 flex ${
                msg.sender === "Me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-xs ${
                  msg.sender === "Me"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                
                {chat.name.includes("Team") && msg.sender !== "Me" && (
                  <p className="font-bold text-sm mb-1">{msg.sender}</p>
                )}
                <p>{msg.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}

      <div className="p-4 border-t space-y-3 space-x-2">
        {/* Icebreaker button */}
        {chat.messages.length === 0 && (
          <button
            onClick={handleIcebreaker}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 mb-2"
          >
            ✨ Suggest Icebreaker
          </button>
        )}

        {/* Smart Reply */}
        <button
          onClick={handleSmartReply}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-black px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          💡 Suggest Reply
        </button>

        {/* Summarize Button */}
        <button
          onClick={handleSummarize}
          className="bg-gradient-to-r from-green-400 to-purple-400  text-black px-4 py-2 rounded-lg hover:bg-green-600"
        >
          📋 Summarize Chat
        </button>

        {/* Input for sending new messages */}
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border px-3 py-2 rounded-lg"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
