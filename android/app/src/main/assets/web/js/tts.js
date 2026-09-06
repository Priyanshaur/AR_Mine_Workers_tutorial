// SafetyLens AR - Offline Text-to-Speech (TTS) Narration Engine

const TTSEngine = {
  enabled: true,
  synth: window.speechSynthesis,

  speak: function(text, langCode) {
    if (!this.enabled || !this.synth) return;
    this.synth.cancel(); // Stop previous utterance

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = langCode || currentLang || 'en';

    if (targetLang === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (targetLang === 'sat') {
      // Fallback for Santali voice synthesizer to hi-IN or en-IN with slower rate if native sat voice unavailable
      utterance.lang = 'hi-IN';
      utterance.rate = 0.85;
    } else {
      utterance.lang = 'en-IN';
      utterance.rate = 0.95;
    }

    utterance.pitch = 1.0;
    this.synth.speak(utterance);
  },

  stop: function() {
    if (this.synth) {
      this.synth.cancel();
    }
  },

  toggle: function(btnElem) {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stop();
    }
    if (btnElem) {
      btnElem.textContent = this.enabled ? '🔊' : '🔇';
      btnElem.setAttribute('title', this.enabled ? 'Mute Audio' : 'Unmute Audio');
    }
  }
};
