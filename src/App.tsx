import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initSounds } from './utils/sounds';

// Import screens
import Loading from './screens/Loading';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Onboarding from './screens/Onboarding';
import Thanks from './screens/Thanks';
import Home from './screens/Home';
import Rituals from './screens/Rituals';
import DayDetail from './screens/DayDetail';
import Rewards from './screens/Rewards';
import Profile from './screens/Profile';

// Import global styles
import './styles/global.css';

function App() {
  useEffect(() => {
    // Initialize sounds on app load
    const handleFirstInteraction = () => {
      initSounds();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rituals" element={<Rituals />} />
          <Route path="/day/:dayName" element={<DayDetail />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;