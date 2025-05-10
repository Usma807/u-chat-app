import React, { useState, useEffect, useRef } from 'react';
import { db, auth, serverTimestamp } from '../../firebase/config';
import Message from './Message';
import MessageInput from './MessageInput';
import './ChatWindow.css';

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const currentUser = auth.currentUser;
  const messagesEndRef = useRef(null); // Avtoskroll uchun

  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    // Unikal chatId yaratish (ikki foydalanuvchi IDlarini alifbo tartibida birlashtirish)
    const id = [currentUser.uid, selectedUser.uid].sort().join('_');
    setChatId(id);

    const messagesRef = db.ref(`chats/${id}/messages`).orderByChild('timestamp');
    const listener = messagesRef.on('value', (snapshot) => {
      const messagesData = snapshot.val();
      const loadedMessages = [];
      if (messagesData) {
        for (let key in messagesData) {
          loadedMessages.push({ id: key, ...messagesData[key] });
        }
      }
      setMessages(loadedMessages);
    });

    return () => messagesRef.off('value', listener);
  }, [currentUser, selectedUser]);

  // Xabarlar o'zgarganda pastga skroll qilish
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSendMessage = async (text) => {
    if (!text.trim() || !chatId) return;

    const messageData = {
      text,
      senderId: currentUser.uid,
      receiverId: selectedUser.uid,
      timestamp: serverTimestamp,
    };

    try {
      await db.ref(`chats/${chatId}/messages`).push(messageData);
      // Foydalanuvchilarning chat ro'yxatini yangilash (ixtiyoriy, tezroq topish uchun)
      await db.ref(`userChats/${currentUser.uid}/${chatId}`).set(true);
      await db.ref(`userChats/${selectedUser.uid}/${chatId}`).set(true);
    } catch (error) {
      console.error("Xabar yuborishda xato:", error);
    }
  };

  if (!selectedUser) {
    return <div className="chat-window-placeholder">Suhbatdoshni tanlang</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>{selectedUser.displayName || selectedUser.email} bilan suhbat</h3>
      </div>
      <div className="messages-list">
        {messages.map(msg => (
          <Message key={msg.id} message={msg} chatId={chatId} />
        ))}
        <div ref={messagesEndRef} /> {/* Avtoskroll uchun bo'sh element */}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;