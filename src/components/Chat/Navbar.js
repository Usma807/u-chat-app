import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error("Logout xatosi:", error);
    }
  };

  return (
    <div className="navbar">
      <span className="navbar-brand">UChat</span>
      {currentUser && (
        <div className="navbar-user">
          <span>{currentUser.displayName || currentUser.email}</span>
          <button onClick={handleLogout} className="logout-button">Chiqish</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;