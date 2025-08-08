import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Header from '../components/Layout/Header';
import { getUserData } from '../utils/storage';
import { DAYS_OF_WEEK, getCurrentDay } from '../utils/constants';

const Rituals = () => {
  const navigate = useNavigate();
  const userData = getUserData();
  const currentDay = getCurrentDay();

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <Layout>
      <Header title="Мій тиждень" />
      
      <div style={{
        display: 'grid',
        gap: '16px'
      }}>
        {days.map(day => {
          const dayProgress = userData.weekProgress[day];
          const isCompleted = dayProgress.completed.length === userData.selectedRituals.length;
          const isCurrentDay = day === currentDay;
          const completionPercentage = (dayProgress.completed.length / userData.selectedRituals.length) * 100;

          return (
            <div
              key={day}
              className="card"
              onClick={() => navigate(`/day/${day}`)}
              style={{
                cursor: 'pointer',
                border: isCurrentDay ? '3px solid #8B8FD9' : '1px solid #E5E5E5',
                background: isCompleted ? '#8B8FD9' : 'white',
                color: isCompleted ? 'white' : 'var(--text-dark)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    {DAYS_OF_WEEK[day]}
                    {isCurrentDay && (
                      <span style={{
                        fontSize: '12px',
                        background: isCompleted ? 'rgba(255,255,255,0.2)' : 'var(--primary-blue)',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        marginLeft: '10px'
                      }}>
                        Сьогодні
                      </span>
                    )}
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      opacity: isCompleted ? 0.9 : 0.7
                    }}>
                      {dayProgress.completed.length} з {userData.selectedRituals.length}
                    </span>
                    
                    <div style={{
                      width: '80px',
                      height: '4px',
                      background: isCompleted ? 'rgba(255,255,255,0.3)' : '#E5E5E5',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div
                        style={{
                          width: `${completionPercentage}%`,
                          height: '100%',
                          background: isCompleted ? 'white' : '#8B8FD9',
                          transition: 'width 0.3s ease'
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div style={{ fontSize: '32px' }}>
                  {isCompleted ? '🎉' : isCurrentDay ? '⭐' : '📅'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Rituals;