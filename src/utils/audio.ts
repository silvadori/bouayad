/**
 * Audio synthesis using Web Audio API for paper tear effects and prayer bell chime,
 * plus Text-to-Speech support.
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Synthesize an authentic paper rip / tear sound
   */
  public playPaperTear() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const duration = 0.28;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate crackling noise
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Introduce small micro-bursts to simulate fiber ripping
        const crackle = Math.random() > 0.85 ? Math.random() * 1.5 - 0.75 : 0;
        data[i] = white * 0.7 + crackle * 0.3;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Filter: Bandpass swept to mimic paper rip
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + duration);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);

      // Gain envelope
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Synthesize a gentle prayer tone / soothing bronze chime
   */
  public playPrayerChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const fundamental = 392; // G4 warm tone
      const harmonics = [1, 2.01, 3.02, 4.1];
      const gains = [0.25, 0.12, 0.06, 0.02];

      harmonics.forEach((ratio, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * ratio, now);

        gain.gain.setValueAtTime(gains[idx], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.8);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Speak text in Arabic or French
   */
  public speak(text: string, lang: 'ar' | 'fr' = 'ar'): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return false;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'fr-FR';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch {
      return false;
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundManager = new SoundEffectsManager();
