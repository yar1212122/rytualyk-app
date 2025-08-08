import React from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Layout/Header';
import { getUserData } from '../utils/storage';
import { getWeekCompletionStats } from '../utils/storage';
import { DAYS_SHORT, getCurrentDay } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const userData = getUserData();
  const stats = getWeekCompletionStats(userData.selectedRituals);
  const currentDay = getCurrentDay();

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <Layout>
      <Header />
      
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'var(--text-dark)',
          marginBottom: '8px'
        }}>
          Привіт, {userData.currentUser.childName}! 👋
        </h1>
        <p style={{
          color: 'var(--text-light)',
          fontSize: '16px'
        }}>
          Продовжимо наші ритуали з Радиком
        </p>
      </div>

      {/* Week Progress */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          marginBottom: '20px',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          Тиждень успіху
        </h3>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          {days.map(day => {
            const dayProgress = userData.weekProgress[day];
            const isCompleted = dayProgress.completed.length === userData.selectedRituals.length;
            const isCurrentDay = day === currentDay;
            const hasProgress = dayProgress.completed.length > 0;

            return (
              <div
                key={day}
                className={`week-circle ${isCompleted ? 'completed' : isCurrentDay ? 'active' : ''}`}
                onClick={() => navigate(`/day/${day}`)}
                style={{
                  position: 'relative'
                }}
              >
                {isCompleted ? (
                  <span className="success-checkmark">✓</span>
                ) : hasProgress ? (
                  <span style={{ fontSize: '10px' }}>
                    {dayProgress.completed.length}
                  </span>
                ) : (
                  DAYS_SHORT[day]
                )}
              </div>
            );
          })}
        </div>
        
        <div style={{
          background: '#F5F5F5',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '14px', 
            color: 'var(--text-light)',
            marginBottom: '8px'
          }}>
            Виконано днів: {stats.completedDays} з {stats.totalDays}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(stats.completedDays / stats.totalDays) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Month Progress */}
      <div className="card">
        <h3 style={{ 
          marginBottom: '20px',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          Прогрес місяця
        </h3>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '32px' }}>📊</span>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>
                {stats.percentage}%
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: 'var(--text-light)' 
              }}>
                виконано
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'var(--accent-green)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {stats.completedRituals} / {stats.totalRituals} ритуалів
          </div>
        </div>
      </div>

      {/* Quick Action */}
      <div 
        className="card"
        onClick={() => navigate(`/day/${currentDay}`)}
        style={{
          marginTop: '20px',
          background: 'linear-gradient(135deg, var(--primary-blue), #F2A03D)',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ marginBottom: '8px' }}>
              Сьогоднішні ритуали
            </h3>
            <p style={{ opacity: 0.9 }}>
              {userData.weekProgress[currentDay].completed.length} з {userData.selectedRituals.length} виконано
            </p>
          </div>
          <span style={{ fontSize: '32px' }}>⭐</span>
        </div>
      </div>
    </Layout>
  );
};

export default Home;