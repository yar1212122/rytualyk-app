import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from '../utils/storage';
import Button from '../components/Common/Button';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      updateUserData({
        currentUser: { ...formData }
      });
      navigate('/onboarding');
    }
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    updateUserData({
      currentUser: { 
        email: `user@${provider}.com`,
        provider 
      }
    });
    navigate('/onboarding');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F2EDDC',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        paddingTop: '60px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <img 
            src="/src/assets/radyk-hero.svg" 
            alt="Radyk" 
            style={{ 
              width: '100px', 
              height: '100px',
              objectFit: 'contain',
              marginBottom: '20px',
              display: 'block',
              margin: '0 auto 20px auto'
            }} 
          />
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'var(--text-dark)',
            marginBottom: '10px'
          }}>
            Вхід до акаунту
          </h1>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
            
            <Button 
              type="submit"
              variant="primary"
              fullWidth
              style={{ 
                marginBottom: '30px',
                padding: '18px 32px',
                fontSize: '22px',
                fontWeight: '700',
                border: '2px solid #8B8FD9',
                textAlign: 'center',
                minHeight: '56px',
                borderRadius: '12px'
              }}
            >
              Увійти
            </Button>
          </form>

          <div style={{
            textAlign: 'center',
            margin: '20px 0',
            color: 'var(--text-light)',
            position: 'relative'
          }}>
            <span style={{
              background: 'white',
              padding: '0 15px'
            }}>
              Або використай
            </span>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              background: '#E5E5E5',
              zIndex: -1
            }}></div>
          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <button
              onClick={() => handleSocialLogin('google')}
              style={{
                flex: 1,
                padding: '12px',
                border: '2px solid #E5E5E5',
                borderRadius: '12px',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#4285F4',
                minHeight: '44px'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              style={{
                flex: 1,
                padding: '12px',
                border: '2px solid #E5E5E5',
                borderRadius: '12px',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1877F2',
                minHeight: '44px'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;