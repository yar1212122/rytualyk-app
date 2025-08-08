import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Header from '../components/Layout/Header';
import Button from '../components/Common/Button';
import Modal from '../components/Common/Modal';
import { 
  getUserData, 
  spendCoins, 
  updateUserData 
} from '../utils/storage';
import { REWARDS_SHOP } from '../utils/constants';

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('shop');
  const [userData, setUserData] = useState(getUserData());
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePurchase = (reward) => {
    setSelectedReward(reward);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    if (selectedReward && userData.coins >= selectedReward.cost) {
      const success = spendCoins(selectedReward.cost);
      if (success) {
        const newPurchase = {
          ...selectedReward,
          purchaseDate: new Date().toISOString(),
          status: 'pending'
        };
        
        const updatedData = updateUserData({
          purchasedRewards: [...userData.purchasedRewards, newPurchase]
        });
        
        setUserData(updatedData);
        setShowPurchaseModal(false);
        setShowSuccessModal(true);
        
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000);
      }
    }
  };

  const markAsReceived = (rewardIndex) => {
    const updatedRewards = [...userData.purchasedRewards];
    updatedRewards[rewardIndex].status = 'received';
    
    const updatedData = updateUserData({
      purchasedRewards: updatedRewards
    });
    
    setUserData(updatedData);
  };

  const ShopTab = () => (
    <div style={{ display: 'grid', gap: '16px' }}>
      {REWARDS_SHOP.map(reward => {
        const canAfford = userData.coins >= reward.cost;
        
        return (
          <div
            key={reward.id}
            className="card"
            style={{
              opacity: canAfford ? 1 : 0.6,
              border: canAfford ? '1px solid #E5E5E5' : '1px solid #CCC'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flex: 1
              }}>
                <span style={{ fontSize: '48px' }}>{reward.emoji}</span>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    {reward.name}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--accent-orange)',
                    fontWeight: '600'
                  }}>
                    <span>🪙</span>
                    <span>{reward.cost}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => handlePurchase(reward)}
                disabled={!canAfford}
                variant={canAfford ? 'primary' : 'secondary'}
                style={{
                  padding: '8px 20px',
                  fontSize: '14px',
                  minHeight: '40px'
                }}
              >
                {canAfford ? 'Купити' : 'Мало монет'}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const MyRewardsTab = () => (
    <div style={{ display: 'grid', gap: '16px' }}>
      {userData.purchasedRewards.length === 0 ? (
        <div 
          className="card"
          style={{
            textAlign: 'center',
            padding: '40px 20px'
          }}
        >
          <img 
            src="/src/assets/radyk-hero.svg" 
            alt="Radyk" 
            style={{ 
              width: '80px', 
              height: '80px',
              objectFit: 'contain',
              marginBottom: '20px',
              display: 'block',
              margin: '0 auto 20px auto'
            }} 
          />
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '12px',
            color: 'var(--text-dark)'
          }}>
            Поки що немає нагород
          </h3>
          <p style={{
            color: 'var(--text-light)',
            fontSize: '16px'
          }}>
            Виконуй ритуали, збирай монети і купуй нагороди!
          </p>
        </div>
      ) : (
        userData.purchasedRewards.map((reward, index) => {
          const purchaseDate = new Date(reward.purchaseDate).toLocaleDateString('uk-UA');
          
          return (
            <div
              key={`${reward.id}-${index}`}
              className="card"
              style={{
                border: reward.status === 'received' ? '2px solid var(--accent-green)' : '1px solid #E5E5E5'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flex: 1
                }}>
                  <span style={{ fontSize: '48px' }}>{reward.emoji}</span>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      {reward.name}
                    </h3>
                    <div style={{
                      fontSize: '14px',
                      color: 'var(--text-light)',
                      marginBottom: '4px'
                    }}>
                      Куплено: {purchaseDate}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: reward.status === 'received' ? 'var(--accent-green)' : 'var(--accent-orange)',
                      fontWeight: '600'
                    }}>
                      {reward.status === 'received' ? '✓ Отримано' : '⏳ Очікує'}
                    </div>
                  </div>
                </div>
                
                {reward.status === 'pending' && (
                  <Button
                    onClick={() => markAsReceived(index)}
                    variant="success"
                    style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      minHeight: '40px'
                    }}
                  >
                    Отримано
                  </Button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );

  return (
    <Layout>
      <Header title="Винагороди" />
      
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        background: 'white',
        borderRadius: '12px',
        padding: '4px',
        marginBottom: '20px',
        border: '2px solid #E5E5E5'
      }}>
        <button
          onClick={() => setActiveTab('shop')}
          style={{
            flex: 1,
            padding: '12px 16px',
            background: activeTab === 'shop' ? 'var(--primary-blue)' : 'transparent',
            color: activeTab === 'shop' ? 'white' : 'var(--text-dark)',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minHeight: '44px'
          }}
        >
          🛒 Магазин
        </button>
        <button
          onClick={() => setActiveTab('my-rewards')}
          style={{
            flex: 1,
            padding: '12px 16px',
            background: activeTab === 'my-rewards' ? 'var(--primary-blue)' : 'transparent',
            color: activeTab === 'my-rewards' ? 'white' : 'var(--text-dark)',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minHeight: '44px'
          }}
        >
          🎁 Мої ({userData.purchasedRewards.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'shop' ? <ShopTab /> : <MyRewardsTab />}

      {/* Purchase Confirmation Modal */}
      <Modal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        title="Підтвердити покупку"
      >
        {selectedReward && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '80px', marginBottom: '16px' }}>
              {selectedReward.emoji}
            </div>
            <h3 style={{ marginBottom: '12px', fontSize: '20px' }}>
              {selectedReward.name}
            </h3>
            <div style={{
              background: 'var(--accent-orange)',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '20px',
              marginBottom: '20px',
              fontSize: '18px',
              fontWeight: '700'
            }}>
              🪙 {selectedReward.cost} монет
            </div>
            <p style={{ 
              color: 'var(--text-light)', 
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              Після покупки залишиться: {userData.coins - selectedReward.cost} монет
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button
                onClick={() => setShowPurchaseModal(false)}
                variant="secondary"
                style={{ flex: 1 }}
              >
                Скасувати
              </Button>
              <Button
                onClick={confirmPurchase}
                variant="primary"
                style={{ flex: 1 }}
              >
                Купити
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      >
        <div style={{ textAlign: 'center' }}>
        soundType="purchase"
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
          <h2 style={{ marginBottom: '12px', color: 'var(--accent-green)' }}>
            Чудово!
          </h2>
          <p style={{ color: 'var(--text-dark)' }}>
            Нагорода додана до "Мої винагороди"
          </p>
        </div>
      </Modal>
    </Layout>
  );
};

export default Rewards;