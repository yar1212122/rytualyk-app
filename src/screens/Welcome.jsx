import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';

const Welcome = () => {
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
      <div style={{
        marginBottom: '30px'
      }}>
        <img 
          src="/src/assets/radyk-hero.svg" 
          alt="Radyk" 
          style={{ 
            width: '150px', 
            height: '150px',
            objectFit: 'contain'
          }} 
        />
      </div>
      
      <h1 style={{
        fontSize: '32px',
        fontWeight: '800',
        color: 'var(--primary-blue)',
        marginBottom: '40px'
      }}>
        Ритуалик
      </h1>
      
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: 'var(--text-dark)',
        marginBottom: '20px',
        lineHeight: '1.4'
      }}>
        Вітаємо вас у сім'ї Ритуалик
      </h2>
      
      <p style={{
        fontSize: '18px',
        color: 'var(--text-light)',
        marginBottom: '50px',
        lineHeight: '1.5',
        maxWidth: '300px'
      }}>
        Перестаньте боротись з дітьми, перетворіть щоденні ритуали на веселу гру з бобром Радиком
      </p>
      
      <Button 
        onClick={() => navigate('/login')}
        variant="primary"
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

export default Welcome;