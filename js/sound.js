// Sound management
var sounds = {};
var soundsEnabled = true;

// Initialize sounds
function initializeSounds() {
    // Create sound objects
    sounds.blockClear = new Audio('sounds/block_clear.mp3');
    sounds.blockClear.volume = 0.5; // 音量を調整（0.0〜1.0）
}

// Play a sound if sounds are enabled
function playSound(sound) {
    if (soundsEnabled && sounds[sound]) {
        // Stop sound if it's already playing
        sounds[sound].currentTime = 0;
        // Play the sound
        sounds[sound].play().catch(function(error) {
            console.log('Sound play failed:', error);
        });
    }
}

// Toggle sounds on/off
function toggleSounds() {
    soundsEnabled = !soundsEnabled;
    return soundsEnabled;
}

// Initialize sounds when the page loads
$(document).ready(function() {
    initializeSounds();
});
