import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Домівка', emoji: '🏠' },
    { path: '/rituals', label: 'Ритуали', emoji: '⭐' },
    { path: '/rewards', label: 'Винагороди', emoji: '🎁' }
  ];

  if (location.pathname === '/' || 
      location.pathname === '/welcome' || 
      location.pathname === '/login' || 
      location.pathname === '/onboarding' ||
      location.pathname === '/thanks') {
    return null;
  }

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <div
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <span style={{ fontSize: '24px', marginBottom: '4px' }}>{item.emoji}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default BottomNav;