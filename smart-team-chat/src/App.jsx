import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import NewChat from "./components/NewChat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatList />} />
         <Route path="/chat/:id" element={<ChatWindow />} />
          <Route path="/new" element={<NewChat />} />
      </Routes>
    </Router>
  );
}

export default App;
