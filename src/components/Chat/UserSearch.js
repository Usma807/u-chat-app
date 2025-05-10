import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/config';
import './UserSearch.css';

const UserSearch = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    setLoading(true);
    const usersRef = db.ref('users');
    const listener = usersRef.on('value', (snapshot) => {
      const usersData = snapshot.val();
      const usersList = [];
      if (usersData) {
        for (let uid in usersData) {
          // O'zini ro'yxatga qo'shmaslik
          if (uid !== currentUser.uid) {
            // Qidiruv termini bo'yicha filtrlash
            if (usersData[uid].displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                usersData[uid].email?.toLowerCase().includes(searchTerm.toLowerCase())) {
                 usersList.push({ uid, ...usersData[uid] });
            }
          }
        }
      }
      setUsers(usersList);
      setLoading(false);
    }, (error) => {
      console.error("Foydalanuvchilarni olishda xatolik:", error);
      setLoading(false);
    });

    // Listenerni tozalash
    return () => usersRef.off('value', listener);
  }, [searchTerm, currentUser.uid]);

  return (
    <div className="user-search-container">
      <input
        type="text"
        placeholder="Foydalanuvchini qidirish..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="user-search-input"
      />
      {loading && <p>Yuklanmoqda...</p>}
      <ul className="user-list">
        {users.map(user => (
          <li key={user.uid} onClick={() => onSelectUser(user)} className="user-list-item">
            {user.displayName || user.email}
          </li>
        ))}
        {!loading && users.length === 0 && searchTerm && <p>Foydalanuvchi topilmadi.</p>}
      </ul>
    </div>
  );
};

export default UserSearch;