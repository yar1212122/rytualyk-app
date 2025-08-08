import React from 'react';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
  return (
    <div className="container">
      {children}
      <div style={{ height: '80px' }} />
      <BottomNav />
    </div>
  );
};

export default Layout;