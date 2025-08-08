import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../utils/storage';

const Header = ({ showProfile = true, showCoins = true, title }) => {
  const navigate = useNavigate();
  const userData = getUserData();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 0',
      marginBottom: '20px'
    }}>
      {title ? (
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: '800',
          color: 'var(--text-dark)'
        }}>
          {title}
        </h1>
      ) : (
        <img 
          src="/src/assets/radyk-logo-app.svg" 
          alt="Radyk" 
          style={{ 
            height: '60px',
            objectFit: 'contain'
          }} 
        />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {showCoins && (
          <div 
            className="coin-balance"
            style={{
              background: 'var(--accent-orange)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🪙</span>
            <span>{userData.coins}</span>
          </div>
        )}
        
        {showProfile && (
          <div
            onClick={() => navigate('/profile')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <img 
              src="/src/assets/iconoir_profile-circle.svg" 
              alt="Profile" 
              style={{ 
                width: '24px', 
                height: '24px',
                filter: 'brightness(0) invert(1)'
              }} 
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;