import React from 'react';
import { useEffect } from 'react';
import Button from './Button';
import { playSuccessSound, initSounds } from '../../utils/sounds';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div 
        className="popup-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '90vw', width: '350px' }}
      >
        {title && (
          <h2 style={{ 
            marginBottom: '16px', 
            fontSize: '20px',
            fontWeight: '700' 
          }}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export const SuccessModal = ({ 
  isOpen, 
  onClose, 
  message, 
  coins, 
  showMascot = true,
  soundType = 'ritual'
}) => {
  useEffect(() => {
    if (isOpen) {
      // Initialize audio context on first user interaction
      initSounds();
      // Play success sound with a small delay to ensure modal is visible
      setTimeout(() => {
        playSuccessSound(soundType);
      }, 100);
    }
  }, [isOpen, soundType]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {showMascot && (
        <div className="mascot-animation" style={{ marginBottom: '16px' }}>
          <img 
            src="/src/assets/radyk-hero.svg" 
            alt="Radyk" 
            style={{ 
              width: '80px', 
              height: '80px',
              objectFit: 'contain'
            }} 
          />
        </div>
      )}
      
      <h2 style={{ 
        marginBottom: '16px',
        fontSize: '20px',
        fontWeight: '700',
        color: 'var(--text-dark)'
      }}>
        {message}
      </h2>
      
      {coins && (
        <div style={{
          background: '#8B8FD9',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '20px',
          marginBottom: '20px',
          fontSize: '18px',
          fontWeight: '700'
        }} className="coin-animation">
          +{coins} монет 🪙
        </div>
      )}
      
      <Button onClick={onClose} variant="success" fullWidth>
        Продовжити
      </Button>
    </Modal>
  );
};

export default Modal;