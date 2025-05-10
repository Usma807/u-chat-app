import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import './Message.css';

const Message = ({ message, chatId }) => {
  const { currentUser } = useAuth();
  const isSender = message.senderId === currentUser.uid;

  const handleDelete = async () => {
    if (window.confirm("Haqiqatan ham bu xabarni o'chirmoqchimisiz?")) {
      try {
        await db.ref(`chats/${chatId}/messages/${message.id}`).remove();
      } catch (error) {
        console.error("Xabarni o'chirishda xato:", error);
        alert("Xabarni o'chirishda xatolik yuz berdi.");
      }
    }
  };
  
  const messageTimestamp = message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Yuborilmoqda...';

  return (
    <div className={`message-container ${isSender ? 'sent' : 'received'}`}>
      <div className="message-bubble">
        <p className="message-text">{message.text}</p>
        <span className="message-timestamp">{messageTimestamp}</span>
        {isSender && (
          <button onClick={handleDelete} className="delete-button">
            🗑️
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;