import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validation
  if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
    setError('Please fill all required fields');
    return;
  }

  setLoading(true);
  setError('');

  // Prepare data for API
  const userData = isLogin 
    ? { email: formData.email, password: formData.password }
    : { name: formData.name, email: formData.email, phone: formData.phone || '', password: formData.password };

  // Call AuthContext functions (Now connected to Backend!)
  const result = isLogin ? await login(userData) : await signup(userData);

  setLoading(false);

  if (result && result.success) {
    navigate('/home'); // Success → Home page
  } else {
    setError(result?.error || 'Something went wrong!');
  }
};



  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="logo">🍕</div>
          <h1 className="auth-title">Welcome to FoodHub</h1>
          <p className="auth-subtitle">Order your favorite food in minutes</p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
          <button 
            className={`tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <input 
              type="text" 
              required 
              placeholder="Full Name" 
              className="auth-input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <span className="input-icon">👤</span>
          </div>

          <div className="input-group">
            <input 
              type="email" 
              required 
              placeholder="Email" 
              className="auth-input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <span className="input-icon">✉️</span>
          </div>

          {!isLogin && (
            <div className="input-group">
              <input 
                type="tel" 
                required 
                placeholder="Phone Number" 
                className="auth-input"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <span className="input-icon">📱</span>
            </div>
          )}

          <div className="input-group">
            <input 
              type="password" 
              required 
              placeholder="Password" 
              className="auth-input"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <span className="input-icon">🔒</span>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              isLogin ? 'Login' : 'Sign Up'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>By continuing, you agree to our Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
