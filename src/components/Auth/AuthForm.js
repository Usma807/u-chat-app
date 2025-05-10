import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isLogin, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && !displayName.trim()) {
        alert("Ismingizni kiriting!");
        return;
    }
    onSubmit(email, password, displayName);
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <div>
          <label htmlFor="displayName">Ism:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required={!isLogin}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
          />
        </div>
      )}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        <label htmlFor="password">Parol:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
      </div>
      <button type="submit" disabled={loading} style={{ padding: '10px 15px', cursor: 'pointer' }}>
        {loading ? 'Yuklanmoqda...' : (isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish')}
      </button>
    </form>
  );
};

export default AuthForm;