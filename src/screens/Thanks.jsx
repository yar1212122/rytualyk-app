import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';

const Thanks = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F2EDDC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div className="mascot-animation" style={{
        marginBottom: '30px'
      }}>
        <img 
          src="/src/assets/radyk-hero.svg" 
          alt="Radyk" 
          style={{ 
            width: '120px', 
            height: '120px',
            objectFit: 'contain'
          }} 
        />
      </div>
      
      <h1 style={{
        fontSize: '28px',
        fontWeight: '800',
        color: 'var(--text-dark)',
        marginBottom: '20px',
        lineHeight: '1.3'
      }}>
        Чудово! Дякую!
      </h1>
      
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: 'var(--primary-blue)',
        marginBottom: '50px'
      }}>
        Ми впоралися
      </h2>
      
      <Button 
        onClick={() => navigate('/home')}
        variant="success"
        fullWidth
        style={{ 
          maxWidth: '280px',
          display: 'inline-flex',
          padding: '14px 24px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '22px',
          borderRadius: '17.114px',
          background: '#8B8FD9',
          color: '#FFF',
          fontFamily: 'Nunito',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal'
        }}
      >
        Почати
      </Button>
    </div>
  );
};

export default Thanks;