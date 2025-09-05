// src/redux/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [
      {
        id: 1,
        name: "Jiya",
        time: "10:00 AM",
        messages: [
          { id: 101, sender: "Jiya", text: "Hi there!", time: "10:00 AM" },
          { id: 102, sender: "Me", text: "Hello Jiya!", time: "10:01 AM" },
        ],
      },
      {
        id: 2,
        name: "Kalyani",
        time: "Yesterday",
        messages: [
          { id: 201, sender: "Kalyani", text: "Hey!", time: "Yesterday" },
          { id: 202, sender: "Me", text: "How's it going?", time: "Yesterday" },
        ],
      },
      {
        id: 3,
        name: "Team Meeting", //Team chat
        time: "9:30 AM",
        messages: [
          { id: 301, sender: "Jiya", text: "Good Morning team!", time: "9:30 AM" },
          {
            id: 302,
            sender: "Kalyani",
            text: "Don't forget today's meeting at 4 PM.",
            time: "9:32 AM",
          },
         
          { id: 303, sender: "Me", text: "Perfect, thanks everyone!", time: "9:36 AM" },
        ],
      },
    ],
  },
  reducers: {
    addChat: (state, action) => {
      state.chats.push({
        id: action.payload.id,
        name: action.payload.name,
        time: action.payload.time,
        messages: [],
      });
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        chat.messages.push(message);
        chat.time = message.time; // update last active time
      }
    },
  },
});

export const { addChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
