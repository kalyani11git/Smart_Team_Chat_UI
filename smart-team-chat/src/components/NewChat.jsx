import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addChat } from "../redux/chatSlice";

const NewChat = () => {
  const [name, setName] = useState("");
  const chats = useSelector((state) => state.chat.chats);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartChat = () => {
    if (!name.trim()) {
      alert("Please enter a participant name");
      return;
    }

    // Find existing chat
    let chat = chats.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );

    if (!chat) {
      // Create new chat if not exists
      const newChat = {
        id: Date.now(),
        name,
        time: "Now",
      };
      dispatch(addChat(newChat));
      chat = newChat;
    }

    // Navigate to selected chat
    navigate(`/chat/${chat.id}`);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <Link to="/" className="font-bold">&larr; Back</Link>
        <h2 className="text-lg font-semibold">New Chat</h2>
      </div>

      {/* Form */}
      <div className="flex-1 p-6">
        <label className="block mb-2 font-semibold">Participant Name</label>
        <input
          type="text"
          placeholder="Enter name (e.g. Isha)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <button
          onClick={handleStartChat}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default NewChat;
