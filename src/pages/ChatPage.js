import React, { useState } from 'react';
import Navbar from '../components/Chat/Navbar';
import UserSearch from '../components/Chat/UserSearch';
import ChatWindow from '../components/Chat/ChatWindow';
import './ChatPage.css'; // Keyinroq stillarni qo'shamiz

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Kim bilan chatlashayotganimiz

  return (
    <div className="chat-page-container">
      <Navbar />
      <div className="chat-main-content">
        <div className="sidebar">
          <UserSearch onSelectUser={setSelectedUser} />
        </div>
        <div className="chat-area">
          {selectedUser ? (
            <ChatWindow selectedUser={selectedUser} />
          ) : (
            <div className="no-chat-selected">
              Suhbatlashish uchun foydalanuvchini tanlang.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;