// Success sound utilities using custom audio file
class SoundManager {
  constructor() {
    this.audio = null;
    this.isEnabled = true;
    this.isLoaded = false;
  }

  // Initialize audio with custom sound file
  init() {
    if (!this.audio) {
      this.audio = new Audio('/Game Success.mp3');
      this.audio.preload = 'auto';
      
      // Set up event listeners
      this.audio.addEventListener('canplaythrough', () => {
        this.isLoaded = true;
      });
      
      this.audio.addEventListener('error', (e) => {
        console.warn('Could not load success sound:', e);
        this.isEnabled = false;
      });
      
      // Set volume to a comfortable level
      this.audio.volume = 0.6;
    }
  }

  // Play success sound
  playSuccessSound(type = 'ritual') {
    if (!this.isEnabled || !this.audio) return;

    try {
      // Reset audio to beginning and play
      this.audio.currentTime = 0;
      const playPromise = this.audio.play();
      
      // Handle play promise for better browser compatibility
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Could not play success sound:', error);
        });
      }
    } catch (error) {
      console.warn('Could not play success sound:', error);
    }
  }

  // Enable/disable sounds
  setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  // Check if sounds are supported and loaded
  isSupported() {
    return !!(window.Audio && this.isLoaded);
  }

  // Set volume (0.0 to 1.0)
  setVolume(volume) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }
}

// Create singleton instance
const soundManager = new SoundManager();

// Export functions for easy use
export const initSounds = () => soundManager.init();
export const playSuccessSound = (type) => soundManager.playSuccessSound(type);
export const setSoundsEnabled = (enabled) => soundManager.setEnabled(enabled);
export const isSoundSupported = () => soundManager.isSupported();
export const setSoundVolume = (volume) => soundManager.setVolume(volume);

export default soundManager;