export const DAYS_OF_WEEK = {
  monday: 'Понеділок',
  tuesday: 'Вівторок', 
  wednesday: 'Середа',
  thursday: 'Четвер',
  friday: "П'ятниця",
  saturday: 'Субота',
  sunday: 'Неділя'
};

export const DAYS_SHORT = {
  monday: 'ПН',
  tuesday: 'ВТ',
  wednesday: 'СР', 
  thursday: 'ЧТ',
  friday: 'ПТ',
  saturday: 'СБ',
  sunday: 'НД'
};

export const AVAILABLE_RITUALS = {
  wake_up: { name: 'Прокинутись', emoji: '🌅', time: 'morning' },
  brush_teeth: { name: 'Почистити зуби', emoji: '🦷', time: 'morning' },
  make_bed: { name: 'Застелити ліжко', emoji: '🛏️', time: 'morning' },
  exercise: { name: 'Зробити зарядку', emoji: '🤸', time: 'morning' },
  get_dressed: { name: 'Одягнутись', emoji: '👕', time: 'morning' },
  walk: { name: 'Прогулянка', emoji: '🚶', time: 'evening' },
  tidy_toys: { name: 'Поскладати іграшки', emoji: '🧸', time: 'evening' },
  pajamas: { name: "Одягнути піжаму", emoji: '👘', time: 'evening' },
  prepare_tomorrow: { name: 'Зібрати речі на завтра', emoji: '🎒', time: 'evening' },
  read_book: { name: 'Почитати книгу', emoji: '📚', time: 'evening' }
};

export const REWARDS_SHOP = [
  { id: 'ice_cream', name: 'Морозиво', cost: 5, emoji: '🍦' },
  { id: 'picnic', name: 'Пікнік', cost: 8, emoji: '🧺' },
  { id: 'cartoon', name: 'Мультик', cost: 15, emoji: '📺' },
  { id: 'cinema', name: 'Кінотеатр', cost: 25, emoji: '🎬' },
  { id: 'toy', name: 'Іграшка', cost: 36, emoji: '🧸' },
  { id: 'amusement_park', name: 'Парк атракціонів', cost: 50, emoji: '🎢' },
  { id: 'bicycle', name: 'Велосипед', cost: 100, emoji: '🚲' }
];

export const getCurrentDay = () => {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date().getDay();
  return dayNames[today];
};

export const SUCCESS_MESSAGES = {
  ritual_complete: "Супер, ти молодець!",
  day_complete: "Круто! Ти зробив це!",
  week_complete: "Ого! Як послідовно!"
};