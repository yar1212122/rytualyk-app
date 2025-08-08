import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from '../utils/storage';
import { AVAILABLE_RITUALS } from '../utils/constants';
import Button from '../components/Common/Button';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    childrenCount: 1,
    childAge: 5,
    wakeUpTime: '07:00',
    eveningTime: '20:00',
    childName: '',
    selectedRituals: []
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save onboarding data
      updateUserData({
        isOnboarded: true,
        currentUser: {
          ...formData
        },
        selectedRituals: formData.selectedRituals
      });
      navigate('/thanks');
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRitualToggle = (ritualKey) => {
    setFormData(prev => ({
      ...prev,
      selectedRituals: prev.selectedRituals.includes(ritualKey)
        ? prev.selectedRituals.filter(r => r !== ritualKey)
        : [...prev.selectedRituals, ritualKey]
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Скільки у вас дітей?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '30px' }}>
              {[1, 2, 3, 4].map(count => (
                <button
                  key={count}
                  onClick={() => setFormData(prev => ({ ...prev, childrenCount: count }))}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: formData.childrenCount === count ? 'var(--primary-blue)' : 'white',
                    color: formData.childrenCount === count ? 'white' : 'var(--text-dark)',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    minHeight: '44px',
                    border: formData.childrenCount === count ? '3px solid #8B8FD9' : '2px solid #E5E5E5'
                  }}
                >
                  {count === 4 ? 'більше 3' : count}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2>Вік дитини?</h2>
            <select
              value={formData.childAge}
              onChange={(e) => setFormData(prev => ({ ...prev, childAge: parseInt(e.target.value) }))}
              className="input-field"
              style={{ marginTop: '30px' }}
            >
              {Array.from({ length: 10 }, (_, i) => i + 3).map(age => (
                <option key={age} value={age}>{age} років</option>
              ))}
            </select>
          </div>
        );

      case 3:
        return (
          <div>
            <h2>Коли дитина встає?</h2>
            <input
              type="time"
              value={formData.wakeUpTime}
              onChange={(e) => setFormData(prev => ({ ...prev, wakeUpTime: e.target.value }))}
              className="input-field"
              style={{ marginTop: '30px' }}
            />
          </div>
        );

      case 4:
        return (
          <div>
            <h2>Коли розпочинає вечірні ритуали?</h2>
            <input
              type="time"
              value={formData.eveningTime}
              onChange={(e) => setFormData(prev => ({ ...prev, eveningTime: e.target.value }))}
              className="input-field"
              style={{ marginTop: '30px' }}
            />
          </div>
        );

      case 5:
        return (
          <div>
            <h2>Ім'я дитини?</h2>
            <input
              type="text"
              placeholder="Введіть ім'я"
              value={formData.childName}
              onChange={(e) => setFormData(prev => ({ ...prev, childName: e.target.value }))}
              className="input-field"
              style={{ marginTop: '30px' }}
            />
          </div>
        );

      case 6:
        return (
          <div>
            <h2>Оберіть ритуали</h2>
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ marginBottom: '15px', color: 'var(--accent-orange)' }}>🌅 Ранкові</h3>
              <div style={{ display: 'grid', gap: '10px', marginBottom: '30px' }}>
                {Object.entries(AVAILABLE_RITUALS)
                  .filter(([_, ritual]) => ritual.time === 'morning')
                  .map(([key, ritual]) => (
                    <label
                      key={key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px',
                        background: formData.selectedRituals.includes(key) ? 'var(--primary-blue)' : 'white',
                        color: formData.selectedRituals.includes(key) ? 'white' : 'var(--text-dark)',
                        borderRadius: '8px',
                        border: formData.selectedRituals.includes(key) ? '2px solid #8B8FD9' : '2px solid #E5E5E5',
                        cursor: 'pointer',
                        gap: '12px',
                        minHeight: '44px'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedRituals.includes(key)}
                        onChange={() => handleRitualToggle(key)}
                        style={{ display: 'none' }}
                      />
                      <span style={{ fontSize: '20px' }}>{ritual.emoji}</span>
                      <span>{ritual.name}</span>
                    </label>
                  ))}
              </div>

              <h3 style={{ marginBottom: '15px', color: 'var(--cta-purple)' }}>🌙 Вечірні</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {Object.entries(AVAILABLE_RITUALS)
                  .filter(([_, ritual]) => ritual.time === 'evening')
                  .map(([key, ritual]) => (
                    <label
                      key={key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px',
                        background: formData.selectedRituals.includes(key) ? 'var(--primary-blue)' : 'white',
                        color: formData.selectedRituals.includes(key) ? 'white' : 'var(--text-dark)',
                        borderRadius: '8px',
                        border: formData.selectedRituals.includes(key) ? '2px solid #8B8FD9' : '2px solid #E5E5E5',
                        cursor: 'pointer',
                        gap: '12px',
                        minHeight: '44px'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedRituals.includes(key)}
                        onChange={() => handleRitualToggle(key)}
                        style={{ display: 'none' }}
                      />
                      <span style={{ fontSize: '20px' }}>{ritual.emoji}</span>
                      <span>{ritual.name}</span>
                    </label>
                  ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F2EDDC',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        paddingTop: '40px'
      }}>
        {/* Progress Bar */}
        <div className="progress-bar" style={{ marginBottom: '40px' }}>
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Step Content */}
        <div className="card" style={{ marginBottom: '30px' }}>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {step > 1 && (
            <Button
              onClick={handlePrevious}
              variant="secondary"
              style={{ flex: 1 }}
            >
              Назад
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            variant="primary"
            style={{ flex: step > 1 ? 1 : '100%' }}
            style={{
              flex: step > 1 ? 1 : '100%',
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
            disabled={
              (step === 5 && !formData.childName) ||
              (step === 6 && formData.selectedRituals.length === 0)
            }
          >
            {step === totalSteps ? 'Завершити' : 'Далі'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;