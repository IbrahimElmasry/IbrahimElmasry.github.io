// 2026 Features & Voice Greeting JavaScript Utilities
window.playVoiceGreeting = function (text, lang) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
};

window.stopVoiceGreeting = function () {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
};
