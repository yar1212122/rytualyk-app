import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../utils/storage';

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const userData = getUserData();
      
      if (!userData.currentUser.email) {
        navigate('/welcome');
      } else if (!userData.isOnboarded) {
        navigate('/onboarding');
      } else {
        navigate('/home');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F2EDDC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        marginBottom: '30px'
      }}>
        <img 
          src="/src/assets/radyk-hero.svg" 
          alt="Radyk" 
          style={{ 
            width: '120px', 
            height: '120px',
            objectFit: 'contain',
            animation: 'bounce 2s infinite'
          }} 
        />
      </div>
      
      <h1 style={{
        fontSize: '36px',
        fontWeight: '800',
        color: 'var(--primary-blue)',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Ритуалик
      </h1>
      
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;