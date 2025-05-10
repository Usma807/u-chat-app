import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/Auth/AuthForm'; // Keyinroq yaratamiz

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (email, password, displayName = '') => {
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, displayName);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
      console.error("Auth error:", err);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish'}</h2>
      <AuthForm
        onSubmit={handleSubmit}
        isLogin={isLogin}
        loading={loading}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => setIsLogin(!isLogin)} disabled={loading} style={{ marginTop: '10px' }}>
        {isLogin ? 'Ro\'yxatdan o\'tishga o\'tish' : 'Kirishga o\'tish'}
      </button>
    </div>
  );
};

export default AuthPage;