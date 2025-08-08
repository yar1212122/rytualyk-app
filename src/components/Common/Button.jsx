import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = {
    display: 'inline-flex',
    padding: '14px 24px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '22px',
    borderRadius: '17.114px',
    border: 'none',
    fontSize: '20px',
    fontWeight: '700',
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    lineHeight: 'normal',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    minHeight: '44px',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1
  };

  const variants = {
    primary: {
  ...baseStyles,
  background: '#8B8FD9',
  color: '#FFF',
  boxShadow: '0 4px 12px rgba(139, 143, 217, 0.3)'
},
    secondary: {
      ...baseStyles,
      background: 'white',
      color: 'var(--text-dark)',
      border: '2px solid var(--primary-blue)',
      boxShadow: '0 4px 12px rgba(107, 163, 197, 0.2)'
    },
    success: {
      ...baseStyles,
      background: '#8B8FD9',
      color: '#FFF',
      boxShadow: '0 4px 12px rgba(139, 143, 217, 0.3)'
    }
  };

  return (
    <button
      style={variants[variant]}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;