// Sound management
var sounds = {};
var soundsEnabled = true;

// Initialize sounds
function initializeSounds() {
    console.log("Initializing sounds...");
    try {
        // Create sound objects
        sounds.blockClear = new Audio('sounds/block_clear.mp3');
        sounds.blockClear.volume = 0.5; // 音量を調整（0.0〜1.0）
        console.log("Sound initialized successfully");
        
        // プリロードを試みる
        sounds.blockClear.load();
    } catch (e) {
        console.error("Error initializing sounds:", e);
    }
}

// Play a sound if sounds are enabled
function playSound(sound) {
    console.log("Attempting to play sound:", sound);
    if (soundsEnabled && sounds[sound]) {
        try {
            // Stop sound if it's already playing
            sounds[sound].currentTime = 0;
            // Play the sound
            var playPromise = sounds[sound].play();
            
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    console.log("Sound played successfully");
                }).catch(function(error) {
                    console.error('Sound play failed:', error);
                    
                    // ユーザーインタラクションが必要な場合のフォールバック
                    if (error.name === "NotAllowedError") {
                        console.log("Browser requires user interaction before playing audio");
                        // ユーザーインタラクション後に再生を有効にする
                        document.addEventListener('click', function enableAudio() {
                            document.removeEventListener('click', enableAudio);
                            sounds[sound].play().catch(function(e) {
                                console.error("Still couldn't play sound after user interaction:", e);
                            });
                        }, { once: true });
                    }
                });
            }
        } catch (e) {
            console.error("Error playing sound:", e);
        }
    } else {
        console.log("Sound not played. Enabled:", soundsEnabled, "Sound exists:", !!sounds[sound]);
    }
}

// Toggle sounds on/off
function toggleSounds() {
    soundsEnabled = !soundsEnabled;
    console.log("Sounds " + (soundsEnabled ? "enabled" : "disabled"));
    return soundsEnabled;
}

// サウンドのロード状態をチェック
function checkSoundStatus() {
    if (sounds.blockClear) {
        console.log("Block clear sound status:");
        console.log("- Path: " + sounds.blockClear.src);
        console.log("- Ready state: " + sounds.blockClear.readyState);
        console.log("- Error: " + sounds.blockClear.error);
    } else {
        console.log("Block clear sound not initialized");
    }
}

// Initialize sounds when the page loads
$(document).ready(function() {
    initializeSounds();
    
    // 3秒後にサウンドステータスをチェック
    setTimeout(checkSoundStatus, 3000);
    
    // テスト用：ユーザーがクリックしたときに音をテスト
    $('#canvas').on('click', function() {
        console.log("Canvas clicked, testing sound...");
        playSound('blockClear');
    });
});
