const STORAGE_KEY = 'ritualyk_data';

const defaultUserData = {
  isOnboarded: false,
  currentUser: {
    email: '',
    childName: '',
    childAge: 5,
    childrenCount: 1,
    wakeUpTime: '07:00',
    eveningTime: '20:00'
  },
  selectedRituals: [],
  coins: 0,
  weekProgress: {
    monday: { completed: [], date: null },
    tuesday: { completed: [], date: null },
    wednesday: { completed: [], date: null },
    thursday: { completed: [], date: null },
    friday: { completed: [], date: null },
    saturday: { completed: [], date: null },
    sunday: { completed: [], date: null }
  },
  purchasedRewards: [],
  notifications: {
    morning: '07:00',
    evening: '20:00'
  }
};

export const getUserData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return defaultUserData;
    return { ...defaultUserData, ...JSON.parse(data) };
  } catch (error) {
    console.error('Error reading user data:', error);
    return defaultUserData;
  }
};

export const saveUserData = (userData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const updateUserData = (updates) => {
  const currentData = getUserData();
  const updatedData = { ...currentData, ...updates };
  saveUserData(updatedData);
  return updatedData;
};

export const addCoins = (amount) => {
  const userData = getUserData();
  userData.coins += amount;
  saveUserData(userData);
  return userData.coins;
};

export const spendCoins = (amount) => {
  const userData = getUserData();
  if (userData.coins >= amount) {
    userData.coins -= amount;
    saveUserData(userData);
    return true;
  }
  return false;
};

export const completeRitual = (day, ritual) => {
  const userData = getUserData();
  const today = new Date().toISOString().split('T')[0];
  
  if (!userData.weekProgress[day].completed.includes(ritual)) {
    userData.weekProgress[day].completed.push(ritual);
    userData.weekProgress[day].date = today;
    saveUserData(userData);
  }
  
  return userData;
};

export const isDayComplete = (day, selectedRituals) => {
  const userData = getUserData();
  return userData.weekProgress[day].completed.length === selectedRituals.length;
};

export const getWeekCompletionStats = (selectedRituals) => {
  const userData = getUserData();
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  let completedDays = 0;
  let totalRituals = 0;
  let completedRituals = 0;
  
  days.forEach(day => {
    const dayProgress = userData.weekProgress[day];
    totalRituals += selectedRituals.length;
    completedRituals += dayProgress.completed.length;
    
    if (dayProgress.completed.length === selectedRituals.length) {
      completedDays++;
    }
  });
  
  return {
    completedDays,
    totalDays: 7,
    completedRituals,
    totalRituals,
    percentage: Math.round((completedRituals / totalRituals) * 100)
  };
};