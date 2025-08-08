import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Header from '../components/Layout/Header';
import Button from '../components/Common/Button';
import Modal from '../components/Common/Modal';
import { getUserData, updateUserData } from '../utils/storage';
import { AVAILABLE_RITUALS } from '../utils/constants';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(getUserData());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [editingRituals, setEditingRituals] = useState(false);
  const [tempSelectedRituals, setTempSelectedRituals] = useState(userData.selectedRituals);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/welcome');
  };

  const handleRitualToggle = (ritualKey) => {
    setTempSelectedRituals(prev => 
      prev.includes(ritualKey)
        ? prev.filter(r => r !== ritualKey)
        : [...prev, ritualKey]
    );
  };

  const saveRituals = () => {
    const updatedData = updateUserData({
      selectedRituals: tempSelectedRituals
    });
    setUserData(updatedData);
    setEditingRituals(false);
  };

  const cancelEditRituals = () => {
    setTempSelectedRituals(userData.selectedRituals);
    setEditingRituals(false);
  };

  const formatTime = (time) => {
    return new Date(`1970-01-01T${time}:00`).toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <Header title="Профіль" showCoins={false} />
      
      {/* Child Info Card */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-blue), var(--cta-purple))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px'
          }}>
            👶
          </div>
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '4px'
            }}>
              {userData.currentUser.childName}
            </h2>
            <p style={{
              color: 'var(--text-light)',
              fontSize: '16px'
            }}>
              {userData.currentUser.childAge} років
            </p>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          padding: '16px',
          background: '#F5F5F5',
          borderRadius: '12px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--accent-orange)',
              marginBottom: '4px'
            }}>
              {userData.coins}
            </div>
            <div style={{
              fontSize: '14px',
              color: 'var(--text-light)'
            }}>
              🪙 Монет
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--accent-green)',
              marginBottom: '4px'
            }}>
              {userData.purchasedRewards.length}
            </div>
            <div style={{
              fontSize: '14px',
              color: 'var(--text-light)'
            }}>
              🎁 Нагород
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Card */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>⏰</span>
          Розклад
        </h3>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: 'var(--accent-orange)',
            color: 'white',
            borderRadius: '12px'
          }}>
            <span style={{ fontWeight: '600' }}>🌅 Ранкові ритуали</span>
            <span>{formatTime(userData.currentUser.wakeUpTime)}</span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: 'var(--cta-purple)',
            color: 'white',
            borderRadius: '12px'
          }}>
            <span style={{ fontWeight: '600' }}>🌙 Вечірні ритуали</span>
            <span>{formatTime(userData.currentUser.eveningTime)}</span>
          </div>
        </div>
      </div>

      {/* Rituals Card */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⭐</span>
            Мої ритуали ({userData.selectedRituals.length})
          </h3>
          
          <button
            onClick={() => setEditingRituals(true)}
            style={{
              background: 'none',
              border: '2px solid #8B8FD9',
              color: '#8B8FD9',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              minHeight: '36px'
            }}
          >
            Редагувати
          </button>
        </div>
        
        <div style={{ display: 'grid', gap: '8px' }}>
          {userData.selectedRituals.map(ritualKey => {
            const ritual = AVAILABLE_RITUALS[ritualKey];
            return (
              <div
                key={ritualKey}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: '#F5F5F5',
                  borderRadius: '8px'
                }}
              >
                <span style={{ fontSize: '20px' }}>{ritual.emoji}</span>
                <span style={{ fontSize: '16px' }}>{ritual.name}</span>
                <div style={{
                  marginLeft: 'auto',
                  fontSize: '12px',
                  color: 'var(--text-light)',
                  background: ritual.time === 'morning' ? 'var(--accent-orange)' : 'var(--cta-purple)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '6px'
                }}>
                  {ritual.time === 'morning' ? '🌅 Ранок' : '🌙 Вечір'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings Card */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>⚙️</span>
          Налаштування
        </h3>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid #E5E5E5'
          }}>
            <span>Email</span>
            <span style={{ color: 'var(--text-light)' }}>
              {userData.currentUser.email}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid #E5E5E5'
          }}>
            <span>Кількість дітей</span>
            <span style={{ color: 'var(--text-light)' }}>
              {userData.currentUser.childrenCount}
            </span>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <Button
        onClick={() => setShowLogoutModal(true)}
        variant="secondary"
        fullWidth
        style={{
          marginBottom: '20px',
          color: 'var(--accent-coral)',
          borderColor: 'var(--accent-coral)'
        }}
      >
        Вийти з акаунту
      </Button>

      {/* Edit Rituals Modal */}
      <Modal
        isOpen={editingRituals}
        onClose={cancelEditRituals}
        title="Редагувати ритуали"
      >
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <h4 style={{ 
            marginBottom: '12px', 
            color: 'var(--accent-orange)',
            fontSize: '16px'
          }}>
            🌅 Ранкові ритуали
          </h4>
          
          {Object.entries(AVAILABLE_RITUALS)
            .filter(([_, ritual]) => ritual.time === 'morning')
            .map(([key, ritual]) => (
              <label
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  background: tempSelectedRituals.includes(key) ? 'var(--primary-blue)' : 'white',
                  color: tempSelectedRituals.includes(key) ? 'white' : 'var(--text-dark)',
                  borderRadius: '8px',
                  border: '1px solid #E5E5E5',
                  cursor: 'pointer',
                  gap: '12px',
                  marginBottom: '8px',
                  minHeight: '44px'
                }}
              >
                <input
                  type="checkbox"
                  checked={tempSelectedRituals.includes(key)}
                  onChange={() => handleRitualToggle(key)}
                  style={{ display: 'none' }}
                />
                <span style={{ fontSize: '20px' }}>{ritual.emoji}</span>
                <span>{ritual.name}</span>
              </label>
            ))}
            
          <h4 style={{ 
            marginTop: '20px',
            marginBottom: '12px', 
            color: 'var(--cta-purple)',
            fontSize: '16px'
          }}>
            🌙 Вечірні ритуали
          </h4>
          
          {Object.entries(AVAILABLE_RITUALS)
            .filter(([_, ritual]) => ritual.time === 'evening')
            .map(([key, ritual]) => (
              <label
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  background: tempSelectedRituals.includes(key) ? 'var(--primary-blue)' : 'white',
                  color: tempSelectedRituals.includes(key) ? 'white' : 'var(--text-dark)',
                  borderRadius: '8px',
                  border: '1px solid #E5E5E5',
                  cursor: 'pointer',
                  gap: '12px',
                  marginBottom: '8px',
                  minHeight: '44px'
                }}
              >
                <input
                  type="checkbox"
                  checked={tempSelectedRituals.includes(key)}
                  onChange={() => handleRitualToggle(key)}
                  style={{ display: 'none' }}
                />
                <span style={{ fontSize: '20px' }}>{ritual.emoji}</span>
                <span>{ritual.name}</span>
              </label>
            ))}
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid #E5E5E5'
        }}>
          <Button
            onClick={cancelEditRituals}
            variant="secondary"
            style={{ flex: 1 }}
          >
            Скасувати
          </Button>
          <Button
            onClick={saveRituals}
            variant="primary"
            style={{ flex: 1 }}
            disabled={tempSelectedRituals.length === 0}
          >
            Зберегти
          </Button>
        </div>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Підтвердити вихід"
      >
        <div style={{ textAlign: 'center' }}>
          <img 
            src="/src/assets/radyk-hero.svg" 
            alt="Radyk" 
            style={{ 
              width: '60px', 
              height: '60px',
              objectFit: 'contain',
              marginBottom: '16px'
            }} 
          />
          <p style={{ 
            marginBottom: '20px',
            color: 'var(--text-dark)',
            fontSize: '16px'
          }}>
            Ти впевнений, що хочеш вийти з акаунту?
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              onClick={() => setShowLogoutModal(false)}
              variant="secondary"
              style={{ flex: 1 }}
            >
              Скасувати
            </Button>
            <Button
              onClick={handleLogout}
              variant="primary"
              style={{ 
                flex: 1,
                background: 'var(--accent-coral)',
                boxShadow: '0 4px 12px rgba(232, 93, 78, 0.3)'
              }}
            >
              Вийти
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default Profile;