import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Header from '../components/Layout/Header';
import Button from '../components/Common/Button';
import { SuccessModal } from '../components/Common/Modal';
import { 
  getUserData, 
  completeRitual, 
  addCoins, 
  isDayComplete 
} from '../utils/storage';
import { 
  DAYS_OF_WEEK, 
  AVAILABLE_RITUALS, 
  SUCCESS_MESSAGES 
} from '../utils/constants';

const DayDetail = () => {
  const { dayName } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(getUserData());
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [coinsEarned, setCoinsEarned] = useState(0);
  
  const dayProgress = userData.weekProgress[dayName];
  const completedRituals = dayProgress.completed;
  
  const morningRituals = userData.selectedRituals.filter(ritual => 
    AVAILABLE_RITUALS[ritual]?.time === 'morning'
  );
  
  const eveningRituals = userData.selectedRituals.filter(ritual => 
    AVAILABLE_RITUALS[ritual]?.time === 'evening'
  );

  const handleRitualComplete = (ritualKey) => {
    if (completedRituals.includes(ritualKey)) return;
    
    const updatedData = completeRitual(dayName, ritualKey);
    setUserData(updatedData);
    
    // Check if day is complete after this ritual
    const newCompletedRituals = [...completedRituals, ritualKey];
    
    if (newCompletedRituals.length === userData.selectedRituals.length) {
      // Day complete - award 5 coins
      addCoins(5);
      setSuccessMessage(SUCCESS_MESSAGES.day_complete);
      setCoinsEarned(5);
      
      // Check if week is complete
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const weekComplete = days.every(day => 
        isDayComplete(day, userData.selectedRituals)
      );
      
      if (weekComplete) {
        addCoins(10); // Bonus for complete week
        setSuccessMessage(SUCCESS_MESSAGES.week_complete);
        setCoinsEarned(15); // 5 for day + 10 bonus
        setShowSuccessModal(true);
        return; // Use week sound type
      }
      
      // Set sound type for day completion
      setSuccessMessage(prev => ({ ...prev, soundType: 'day' }));
    } else {
      // Individual ritual complete
      setSuccessMessage(SUCCESS_MESSAGES.ritual_complete);
      setCoinsEarned(0);
    }
    
    setShowSuccessModal(true);
  };

  const handleClaimCoins = () => {
    if (isDayComplete(dayName, userData.selectedRituals)) {
      addCoins(5);
      setSuccessMessage("Чудово! Ти отримав 5 монет за день!");
      setCoinsEarned(5);
      setShowSuccessModal(true);
    }
  };

  const RitualSection = ({ title, icon, rituals, bgColor }) => (
    <div className="card" style={{ marginBottom: '20px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        padding: '12px',
        background: bgColor,
        borderRadius: '12px'
      }}>
        <span style={{ fontSize: '32px' }}>{icon}</span>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '700',
          color: 'white'
        }}>
          {title}
        </h3>
      </div>
      
      <div style={{ display: 'grid', gap: '12px' }}>
        {rituals.map(ritualKey => {
          const ritual = AVAILABLE_RITUALS[ritualKey];
          const isCompleted = completedRituals.includes(ritualKey);
          
          return (
            <div
              key={ritualKey}
              onClick={() => handleRitualComplete(ritualKey)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                background: isCompleted ? 'var(--accent-green)' : 'white',
                color: isCompleted ? 'white' : 'var(--text-dark)',
                border: isCompleted ? 'none' : '2px solid #E5E5E5',
                borderRadius: '12px',
                cursor: isCompleted ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                minHeight: '60px'
              }}
              className={isCompleted ? 'success-checkmark' : ''}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: isCompleted ? 'white' : 'transparent',
                border: isCompleted ? 'none' : '2px solid var(--text-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {isCompleted && (
                  <span style={{ 
                    color: 'var(--accent-green)', 
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </span>
                )}
              </div>
              
              <span style={{ fontSize: '24px' }}>{ritual.emoji}</span>
              
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                flex: 1
              }}>
                {ritual.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const dayComplete = isDayComplete(dayName, userData.selectedRituals);
  const progress = (completedRituals.length / userData.selectedRituals.length) * 100;

  return (
    <Layout>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px',
        padding: '16px 0'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            minHeight: '44px'
          }}
        >
          ←
        </button>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--text-dark)',
          flex: 1
        }}>
          {DAYS_OF_WEEK[dayName]}
        </h1>
        <div style={{
          background: 'var(--accent-orange)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {completedRituals.length} / {userData.selectedRituals.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '12px'
        }}>
          <span style={{ fontSize: '24px' }}>📊</span>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>
            Прогрес дня: {Math.round(progress)}%
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Morning Rituals */}
      {morningRituals.length > 0 && (
        <RitualSection
          title="Ранкові ритуали"
          icon="🌅"
          rituals={morningRituals}
          bgColor="var(--accent-orange)"
        />
      )}

      {/* Evening Rituals */}
      {eveningRituals.length > 0 && (
        <RitualSection
          title="Вечірні ритуали"
          icon="🌙"
          rituals={eveningRituals}
          bgColor="var(--cta-purple)"
        />
      )}

      {/* Success Message */}
      {dayComplete && (
        <div 
          className="card"
          style={{
            background: 'linear-gradient(135deg, #8B8FD9, var(--primary-blue))',
            color: 'white',
            textAlign: 'center',
            marginTop: '20px'
          }}
        >
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ marginBottom: '12px', fontSize: '20px' }}>
            Вітаю! День завершено!
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '20px' }}>
            Всі ритуали виконано успішно
          </p>
        </div>
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
        coins={coinsEarned}
        soundType={
          successMessage === SUCCESS_MESSAGES.week_complete ? 'week' :
          successMessage === SUCCESS_MESSAGES.day_complete ? 'day' : 'ritual'
        }
      />
    </Layout>
  );
};

export default DayDetail;