// ========================================
// KIDS MATCHING GAME
// Features: Tutorial, Mascot, Celebrations
// ========================================

// ========================================
// CONFIGURATION - EASY TO CUSTOMIZE
// ========================================

const kidsData = [
    // LEVEL 1 - Beginner (Kids 1-8)
    { id: 1, name: "Robin", imageFront: "images/Robin.jpeg", imageBack: "images/Robin2.jpeg", audioDescription: "audio/descriptions/Robin.mp4", level: 1 },
    { id: 2, name: "Sofia", imageFront: "images/Sofia.jpeg", imageBack: "images/Sofia2.jpeg", audioDescription: "audio/descriptions/Sofia.mp4", level: 1 },
    { id: 3, name: "Aya", imageFront: "images/Aya.jpeg", imageBack: "images/Aya2.jpeg", audioDescription: "audio/descriptions/Aya.mp4", level: 1 },
    { id: 4, name: "Maya", imageFront: "images/Maya.jpeg", imageBack: "images/Maya2.jpeg", audioDescription: "audio/descriptions/Maya.mp3", level: 1 },
    { id: 5, name: "Matthis", imageFront: "images/Matthis.jpeg", imageBack: "images/Matthis2.jpeg", audioDescription: "audio/descriptions/Matthis.mp4", level: 1 },
    { id: 6, name: "Giulia", imageFront: "images/Giulia.jpeg", imageBack: "images/Giulia2.jpeg", audioDescription: "audio/descriptions/Giulia.mp4", level: 1 },
    { id: 7, name: "Tiago", imageFront: "images/Tiago.jpeg", imageBack: "images/Tiago2.jpeg", audioDescription: "audio/descriptions/Tiago.mp4", level: 1 },
    { id: 8, name: "Natael", imageFront: "images/Natael.jpeg", imageBack: "images/Natael2.jpeg", audioDescription: "audio/descriptions/Natael.mp4", level: 1 },
    // LEVEL 2 - Intermediate (Kids 9-16)
    { id: 9, name: "Lyna", imageFront: "images/Lyna.jpeg", imageBack: "images/Lyna2.jpeg", audioDescription: "audio/descriptions/Lyna.mp4", level: 2 },
    { id: 10, name: "Artur", imageFront: "images/Artur.jpeg", imageBack: "images/Artur2.jpeg", audioDescription: "audio/descriptions/Artur.mp4", level: 2 },
    { id: 11, name: "Elianna", imageFront: "images/Elianna.jpeg", imageBack: "images/Elianna2.jpeg", audioDescription: "audio/descriptions/Elianna.mp4", level: 2 },
    { id: 12, name: "Issa", imageFront: "images/Issa.jpeg", imageBack: "images/Issa2.jpeg", audioDescription: "audio/descriptions/Issa.mp4", level: 2 },
    { id: 13, name: "Inès", imageFront: "images/Inès.jpeg", imageBack: "images/Inès2.jpeg", audioDescription: "audio/descriptions/Inès.mp4", level: 2 },
    { id: 14, name: "Leondre", imageFront: "images/Leondre.jpeg", imageBack: "images/Leondre2.jpeg", audioDescription: "audio/descriptions/Leondre.mp4", level: 2 },
    { id: 15, name: "Luna", imageFront: "images/Luna.jpeg", imageBack: "images/Luna2.jpeg", audioDescription: "audio/descriptions/Luna.mp4", level: 2 },
    { id: 16, name: "Luca", imageFront: "images/Luca10.jpeg", imageBack: "images/Luca12.jpeg", audioDescription: "audio/descriptions/Luca.mp4", level: 2 },
    // LEVEL 3 - Advanced (Kids 17-22)
    { id: 17, name: "Iliana", imageFront: "images/Iliana.jpeg", imageBack: "images/Iliana2.jpeg", audioDescription: "audio/descriptions/Iliana.mp4", level: 3 },
    { id: 18, name: "Lizie", imageFront: "images/Lizie.jpeg", imageBack: "images/Lizie2.jpeg", audioDescription: "audio/descriptions/Lizie.mp4", level: 3 },
    { id: 19, name: "Lucas", imageFront: "images/Lucas.jpeg", imageBack: "images/Lucas2.jpeg", audioDescription: "audio/descriptions/Lucas.mp4", level: 3 },
    { id: 20, name: "Ismael", imageFront: "images/Ismael.jpeg", imageBack: "images/Ismael2.jpeg", audioDescription: "audio/descriptions/Ismael.mp4", level: 3 },
    { id: 21, name: "Samuel", imageFront: "images/Samuel.jpeg", imageBack: "images/Samuel2.jpeg", audioDescription: "audio/descriptions/Samuel.mp4", level: 3 },
    { id: 22, name: "Elise", imageFront: "images/Elise.jpeg", imageBack: "images/Elise2.jpeg", audioDescription: "audio/descriptions/Elise.mp4", level: 3 },
];

// Mascot tips for different situations
const mascotTips = {
    start: ["Click play to listen! 🎵", "Let's find some matches! 🔍", "You've got this! 💪"],
    playing: ["Listen carefully! 👂", "Who does this sound like? 🤔", "Pay attention to the details!"],
    correct: ["Amazing job! ⭐", "You're so smart! 🧠", "Perfect match! 🎯", "Woohoo! Keep going! 🎉", "You're on fire! 🔥"],
    wrong: ["Try again, you can do it! 💪", "Almost! Listen one more time 🎧", "Don't give up! 🌟", "So close! Try another one!"],
    hint: ["Need a hint? Click 💡", "The hint button can help!", "Use hints if you're stuck!"],
    levelComplete: ["Level complete! You're amazing! 🏆", "Incredible work! Ready for more? 🚀", "You did it! 🎊"]
};

// ========================================
// GAME STATE
// ========================================

let currentLevel = 1;
let score = 0;
let attempts = 0;
let matches = {};
let currentAudio = null;
let stickyAudioElement = null;
let completedLevels = [];
let currentlyPlayingKidId = null;
let audioDisplayIndexMap = {};
let tutorialStep = 1;
let bgMusicPlaying = false;

// ========================================
// TUTORIAL SYSTEM
// ========================================

function initTutorial() {
    const hasSeenTutorial = localStorage.getItem('matchingGameTutorialSeen');
    if (!hasSeenTutorial) {
        showTutorial();
    } else {
        hideTutorial();
    }
    setupTutorialButtons();
}

function showTutorial() {
    const overlay = document.getElementById('tutorialOverlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        tutorialStep = 1;
        updateTutorialStep();
    }
}

function hideTutorial() {
    const overlay = document.getElementById('tutorialOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
        localStorage.setItem('matchingGameTutorialSeen', 'true');
    }
}

function setupTutorialButtons() {
    const prevBtn = document.getElementById('tutorialPrev');
    const nextBtn = document.getElementById('tutorialNext');
    const skipBtn = document.getElementById('tutorialSkip');
    const helpBtn = document.getElementById('helpBtn');

    prevBtn?.addEventListener('click', () => {
        if (tutorialStep > 1) { tutorialStep--; updateTutorialStep(); }
    });

    nextBtn?.addEventListener('click', () => {
        if (tutorialStep < 3) { tutorialStep++; updateTutorialStep(); }
        else { hideTutorial(); }
    });

    skipBtn?.addEventListener('click', hideTutorial);

    helpBtn?.addEventListener('click', () => {
        localStorage.removeItem('matchingGameTutorialSeen');
        showTutorial();
    });
}

function updateTutorialStep() {
    document.querySelectorAll('.tutorial-step').forEach(step => {
        step.classList.toggle('active', parseInt(step.dataset.step) === tutorialStep);
    });

    document.querySelectorAll('.tutorial-progress-dots .dot').forEach(dot => {
        dot.classList.toggle('active', parseInt(dot.dataset.step) === tutorialStep);
    });

    const prevBtn = document.getElementById('tutorialPrev');
    const nextBtn = document.getElementById('tutorialNext');
    if (prevBtn) prevBtn.disabled = tutorialStep === 1;
    if (nextBtn) nextBtn.textContent = tutorialStep === 3 ? "Let's Play! 🎮" : "Next →";

    const tutorialTexts = [
        "Hi there! I'm Felix the Fox! Let me show you how to play!",
        "Great! Now drag the audio card to match it with the right picture!",
        "Awesome! You're ready to play! Have fun matching! 🎉"
    ];
    const textEl = document.getElementById('tutorialText');
    if (textEl) textEl.textContent = tutorialTexts[tutorialStep - 1];
}

// ========================================
// MASCOT HELPER
// ========================================

function showMascotTip(category) {
    const tips = mascotTips[category];
    if (!tips) return;
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    const tipElement = document.getElementById('mascotTip');
    if (tipElement) {
        const pEl = tipElement.querySelector('p');
        if (pEl) pEl.textContent = randomTip;
        tipElement.classList.add('show');
        setTimeout(() => tipElement.classList.remove('show'), 3000);
    }
}

function initMascotHelper() {
    const mascot = document.querySelector('.mascot-character');
    mascot?.addEventListener('click', () => showMascotTip('hint'));
    setTimeout(() => showMascotTip('start'), 2000);
}

// ========================================
// CELEBRATION SYSTEM
// ========================================

function showCelebration(message, onContinue) {
    const overlay = document.getElementById('celebrationOverlay');
    const messageEl = document.getElementById('celebrationMessage');
    const continueBtn = document.getElementById('celebrationContinue');

    if (messageEl) messageEl.textContent = message;
    if (overlay) overlay.classList.remove('hidden');

    generateConfetti();

    if (continueBtn) {
        continueBtn.onclick = () => {
            overlay?.classList.add('hidden');
            if (onContinue) onContinue();
        };
    }
}

function generateConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['#FF6B9D', '#FFD93D', '#4CAF50', '#2A9D8F', '#F4A261', '#6C5B7B'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        if (Math.random() > 0.5) confetti.style.borderRadius = '50%';
        container.appendChild(confetti);
    }
}

// ========================================
// SOUND CONTROLS
// ========================================

function setupSoundControls() {
    const bgMusicToggle = document.getElementById('bgMusicToggle');
    const bgMusic = document.getElementById('bgMusic');

    bgMusicToggle?.addEventListener('click', () => {
        const soundOn = bgMusicToggle.querySelector('.sound-on');
        const soundOff = bgMusicToggle.querySelector('.sound-off');

        if (bgMusicPlaying) {
            bgMusic?.pause();
            soundOn?.classList.add('hidden');
            soundOff?.classList.remove('hidden');
        } else {
            if (bgMusic) {
                bgMusic.volume = 0.3;
                bgMusic.play().catch(() => { });
            }
            soundOn?.classList.remove('hidden');
            soundOff?.classList.add('hidden');
        }
        bgMusicPlaying = !bgMusicPlaying;
    });
}

// ========================================
// STICKY AUDIO PLAYER
// ========================================

function setupStickyPlayer() {
    stickyAudioElement = document.getElementById('stickyAudio');
    const replayBtn = document.getElementById('stickyReplayBtn');
    const stopBtn = document.getElementById('stickyStopBtn');

    replayBtn?.addEventListener('click', () => {
        // Stop any local audio first to prevent echo
        stopAllLocalAudio();

        // Now replay from sticky player
        if (stickyAudioElement?.src && stickyAudioElement.src !== '') {
            stickyAudioElement.currentTime = 0;
            stickyAudioElement.play();
        }
    });

    stopBtn?.addEventListener('click', () => {
        stopAllAudio();
        document.getElementById('stickyPlayer')?.classList.add('hidden');
    });
}

// Helper function to stop all local audio elements
function stopAllLocalAudio() {
    document.querySelectorAll('.audio-item audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    document.querySelectorAll('.play-btn').forEach(btn => btn.textContent = '▶');
    currentAudio = null;
}

// Helper function to stop ALL audio (local + sticky)
function stopAllAudio() {
    stopAllLocalAudio();
    if (stickyAudioElement) {
        stickyAudioElement.pause();
        stickyAudioElement.currentTime = 0;
    }
}

function playStickyAudio(kid, displayIndex) {
    const stickyPlayer = document.getElementById('stickyPlayer');
    const stickyLabel = document.getElementById('stickyAudioLabel');

    // DON'T play sticky audio separately - just show the UI
    // The local audio element handles playback to avoid echo
    stickyPlayer?.classList.remove('hidden');
    if (stickyLabel) stickyLabel.textContent = `Track ${displayIndex}`;

    // Store the source but don't play it (local audio is already playing)
    if (stickyAudioElement) {
        stickyAudioElement.src = kid.audioDescription;
        // Don't call play() here - this was causing the echo!
    }

    currentlyPlayingKidId = kid.id;
    showMascotTip('playing');
}

// ========================================
// LEVEL MANAGEMENT
// ========================================

function setupLevelButtons() {
    const levelButtons = document.querySelectorAll('.level-btn');

    levelButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const level = parseInt(btn.dataset.level);

            if (level > 1 && !completedLevels.includes(level - 1) && level !== 4) {
                showMascotTip('hint');
                alert(`Complete Level ${level - 1} first! 🔒`);
                return;
            }

            currentLevel = level;
            levelButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            initializeGame();
        });
    });

    updateLevelLocks();
}

function updateLevelLocks() {
    document.querySelectorAll('.level-btn').forEach(btn => {
        const level = parseInt(btn.dataset.level);
        const lock = btn.querySelector('.level-lock');

        if (level === 1 || completedLevels.includes(level - 1) || level === 4) {
            btn.classList.remove('locked');
            lock?.classList.add('hidden');
        } else {
            btn.classList.add('locked');
            lock?.classList.remove('hidden');
        }

        if (completedLevels.includes(level)) btn.classList.add('completed');
    });
}

function completeLevel() {
    if (!completedLevels.includes(currentLevel)) completedLevels.push(currentLevel);

    document.querySelector(`.level-btn[data-level="${currentLevel}"]`)?.classList.add('completed');
    updateLevelLocks();

    const currentKids = getCurrentLevelKids();
    const accuracy = Math.round((score / attempts) * 100);

    showCelebration(
        `You matched all ${currentKids.length} kids with ${accuracy}% accuracy!`,
        () => {
            document.getElementById('stickyPlayer')?.classList.add('hidden');
            stickyAudioElement?.pause();

            if (currentLevel < 4) {
                const levelKidsCount = document.getElementById('levelKidsCount');
                const levelAccuracy = document.getElementById('levelAccuracy');
                if (levelKidsCount) levelKidsCount.textContent = currentKids.length;
                if (levelAccuracy) levelAccuracy.textContent = accuracy + '%';
                document.getElementById('levelComplete')?.classList.remove('hidden');
            }
        }
    );

    showMascotTip('levelComplete');
}

// ========================================
// PROGRESS BAR
// ========================================

function updateProgressBar() {
    const currentKids = getCurrentLevelKids();
    const progressPercent = (score / currentKids.length) * 100;
    const progressFill = document.getElementById('progressFill');
    const currentMatches = document.getElementById('currentMatches');
    if (progressFill) progressFill.style.width = progressPercent + '%';
    if (currentMatches) currentMatches.textContent = score;
}

// ========================================
// HINTS SYSTEM
// ========================================

function showHintForAudio(kidId) {
    const targetPicture = document.querySelector(`.picture-item[data-kid-id="${kidId}"]`);
    if (!targetPicture || matches[kidId]) return;

    targetPicture.classList.add('hint');
    setTimeout(() => targetPicture.classList.remove('hint'), 1500);
}

// ========================================
// AUDIO ELEMENTS
// ========================================

const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    setupEventListeners();
    setupLevelButtons();
    setupStickyPlayer();
    setupSoundControls();
    initTutorial();
    initMascotHelper();
});

function initializeGame() {
    score = 0;
    attempts = 0;
    matches = {};
    audioDisplayIndexMap = {};
    updateScoreBoard();
    updateProgressBar();

    const currentKids = getCurrentLevelKids();
    const shuffledAudio = [...currentKids].sort(() => Math.random() - 0.5);

    generateAudioItems(shuffledAudio);
    generatePictureItems(currentKids);

    document.getElementById('completionMessage')?.classList.add('hidden');
    document.getElementById('levelComplete')?.classList.add('hidden');
    document.getElementById('stickyPlayer')?.classList.add('hidden');

    updateLevelDisplay();
}

function getCurrentLevelKids() {
    if (currentLevel === 4) return [...kidsData].sort(() => Math.random() - 0.5);
    return kidsData.filter(kid => kid.level === currentLevel);
}

function updateLevelDisplay() {
    const currentKids = getCurrentLevelKids();
    const currentLevelEl = document.getElementById('currentLevel');
    const totalInLevel = document.getElementById('totalInLevel');
    const currentMatches = document.getElementById('currentMatches');
    if (currentLevelEl) currentLevelEl.textContent = currentLevel;
    if (totalInLevel) totalInLevel.textContent = currentKids.length;
    if (currentMatches) currentMatches.textContent = score;
}

// ========================================
// GENERATE GAME ITEMS
// ========================================

function generateAudioItems(data) {
    const audioContainer = document.getElementById('audioItems');
    if (!audioContainer) return;
    audioContainer.innerHTML = '';

    data.forEach((kid, index) => {
        const displayIndex = index + 1;
        audioDisplayIndexMap[kid.id] = displayIndex;

        const audioItem = document.createElement('div');
        audioItem.className = 'audio-item';
        audioItem.draggable = true;
        audioItem.dataset.kidId = kid.id;
        audioItem.dataset.displayIndex = displayIndex;

        audioItem.innerHTML = `
            <button class="play-btn" data-audio="${kid.audioDescription}" aria-label="Play Track ${displayIndex}">▶</button>
            <span class="audio-label">Track ${displayIndex}</span>
            <button class="hint-btn" data-kid-id="${kid.id}" aria-label="Get hint">💡</button>
            <audio src="${kid.audioDescription}" preload="auto"></audio>
        `;

        audioItem.addEventListener('dragstart', handleDragStart);
        audioItem.addEventListener('dragend', handleDragEnd);
        audioItem.addEventListener('touchstart', handleTouchStart, { passive: true });
        audioItem.addEventListener('touchmove', handleTouchMove, { passive: false });
        audioItem.addEventListener('touchend', handleTouchEnd);

        const playBtn = audioItem.querySelector('.play-btn');
        const audioEl = audioItem.querySelector('audio');

        playBtn?.addEventListener('click', () => {
            // If clicking on a different track, stop everything first
            if (currentAudio && currentAudio !== audioEl) {
                stopAllAudio();
            }

            // If clicking on the same track that's playing, just toggle off
            if (currentAudio === audioEl && !audioEl.paused) {
                audioEl.pause();
                audioEl.currentTime = 0;
                playBtn.textContent = '▶';
                currentAudio = null;
                document.getElementById('stickyPlayer')?.classList.add('hidden');
            } else {
                // Start fresh playback
                audioEl.currentTime = 0;
                audioEl.play();
                playBtn.textContent = '⏸';
                currentAudio = audioEl;
                playStickyAudio(kid, displayIndex);
            }
        });

        audioEl?.addEventListener('ended', () => {
            playBtn.textContent = '▶';
            currentAudio = null;
        });

        audioItem.querySelector('.hint-btn')?.addEventListener('click', () => showHintForAudio(kid.id));

        audioContainer.appendChild(audioItem);
    });
}

function generatePictureItems(data) {
    const pictureContainer = document.getElementById('pictureItems');
    if (!pictureContainer) return;
    pictureContainer.innerHTML = '';

    data.forEach(kid => {
        const pictureItem = document.createElement('div');
        pictureItem.className = 'picture-item';
        pictureItem.dataset.kidId = kid.id;

        pictureItem.innerHTML = `
            <div class="images-container">
                <div class="image-wrapper">
                    <img src="${kid.imageFront}" alt="${kid.name} - Front" class="kid-image" onerror="this.src='https://via.placeholder.com/240x320/CCCCCC/000000?text=Front'">
                    <span class="image-label">Front</span>
                </div>
                <div class="image-wrapper">
                    <img src="${kid.imageBack}" alt="${kid.name} - Back" class="kid-image" onerror="this.src='https://via.placeholder.com/240x320/CCCCCC/000000?text=Back'">
                    <span class="image-label">Back</span>
                </div>
            </div>
            <div class="kid-name">${kid.name}</div>
        `;

        pictureItem.addEventListener('dragover', handleDragOver);
        pictureItem.addEventListener('drop', handleDrop);
        pictureItem.addEventListener('dragleave', handleDragLeave);

        pictureContainer.appendChild(pictureItem);
    });
}

// ========================================
// DRAG AND DROP HANDLERS
// ========================================

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd() {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
    return false;
}

function handleDragLeave() {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    this.classList.remove('drag-over');

    if (!draggedElement) return;

    const audioKidId = draggedElement.dataset.kidId;
    const pictureKidId = this.dataset.kidId;

    if (matches[pictureKidId]) {
        showFeedback(false);
        return;
    }

    attempts++;
    updateScoreBoard();

    // Brief anticipation delay
    this.style.opacity = '0.7';

    setTimeout(() => {
        this.style.opacity = '1';
        if (audioKidId === pictureKidId) {
            handleCorrectMatch(this, draggedElement, pictureKidId);
        } else {
            handleWrongMatch(this);
        }
    }, 300);

    return false;
}

// ========================================
// TOUCH HANDLERS FOR MOBILE
// ========================================

let touchElement = null;
let touchClone = null;

function handleTouchStart(e) {
    if (this.classList.contains('matched')) return;
    touchElement = this;
}

function handleTouchMove(e) {
    if (!touchElement) return;
    e.preventDefault();

    const touch = e.touches[0];

    if (!touchClone) {
        touchClone = touchElement.cloneNode(true);
        touchClone.style.position = 'fixed';
        touchClone.style.pointerEvents = 'none';
        touchClone.style.opacity = '0.8';
        touchClone.style.zIndex = '10000';
        touchClone.style.width = touchElement.offsetWidth + 'px';
        touchClone.style.transform = 'rotate(5deg) scale(1.05)';
        document.body.appendChild(touchClone);
        touchElement.classList.add('dragging');
    }

    touchClone.style.left = (touch.clientX - touchElement.offsetWidth / 2) + 'px';
    touchClone.style.top = (touch.clientY - 30) + 'px';

    const elementsBelow = document.elementsFromPoint(touch.clientX, touch.clientY);
    const pictureItem = elementsBelow.find(el => el.classList.contains('picture-item'));

    document.querySelectorAll('.picture-item').forEach(p => p.classList.remove('drag-over'));
    if (pictureItem) pictureItem.classList.add('drag-over');
}

function handleTouchEnd(e) {
    if (!touchElement) return;
    touchElement.classList.remove('dragging');

    if (touchClone) {
        const touch = e.changedTouches[0];
        const elementsBelow = document.elementsFromPoint(touch.clientX, touch.clientY);
        const pictureItem = elementsBelow.find(el => el.classList.contains('picture-item'));

        if (pictureItem) {
            draggedElement = touchElement;
            handleDrop.call(pictureItem, { stopPropagation: () => { }, preventDefault: () => { } });
        }

        touchClone.remove();
        touchClone = null;
    }

    document.querySelectorAll('.picture-item').forEach(p => p.classList.remove('drag-over'));
    touchElement = null;
}

// ========================================
// MATCH HANDLING
// ========================================

function handleCorrectMatch(pictureItem, audioItem, kidId) {
    score++;
    matches[kidId] = true;

    pictureItem.classList.add('matched');
    pictureItem.innerHTML += `
        <div class="dropped-audio">✓ Matched!</div>
        <span class="match-status">✅</span>
    `;

    audioItem.classList.add('matched');
    audioItem.draggable = false;

    showFeedback(true);
    showMascotTip('correct');

    updateScoreBoard();
    updateProgressBar();
    checkCompletion();
}

function handleWrongMatch(pictureItem) {
    pictureItem.classList.add('wrong');
    showFeedback(false);
    showMascotTip('wrong');
    setTimeout(() => pictureItem.classList.remove('wrong'), 500);
}

// ========================================
// FEEDBACK
// ========================================

function showFeedback(isCorrect) {
    if (isCorrect) {
        correctSound?.play().catch(() => { });
    } else {
        wrongSound?.play().catch(() => { });
    }
}

// ========================================
// SCORE AND COMPLETION
// ========================================

function updateScoreBoard() {
    const scoreEl = document.getElementById('score');
    const attemptsEl = document.getElementById('attempts');
    if (scoreEl) scoreEl.textContent = score;
    if (attemptsEl) attemptsEl.textContent = attempts;
}

function checkCompletion() {
    const currentKids = getCurrentLevelKids();
    if (score === currentKids.length) {
        setTimeout(() => {
            if (currentLevel === 4) {
                const finalScore = document.getElementById('finalScore');
                if (finalScore) finalScore.textContent = `${score}/${attempts} (${Math.round((score / attempts) * 100)}% accuracy)`;
                showCelebration("You completed ALL levels! You're a matching master! 🏆", () => {
                    document.getElementById('completionMessage')?.classList.remove('hidden');
                });
            } else {
                completeLevel();
            }
        }, 500);
    }
}

// ========================================
// CONTROLS
// ========================================

function setupEventListeners() {
    document.getElementById('resetBtn')?.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset this level?')) {
            initializeGame();
            showMascotTip('start');
        }
    });

    document.getElementById('checkAllBtn')?.addEventListener('click', checkAllAnswers);

    document.getElementById('nextLevelBtn')?.addEventListener('click', () => {
        if (currentLevel < 4) {
            currentLevel++;
            document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
            document.querySelector(`.level-btn[data-level="${currentLevel}"]`)?.classList.add('active');
            initializeGame();
            showMascotTip('start');
        } else {
            alert('Congratulations! You completed all levels! 🎉');
        }
    });
}

function checkAllAnswers() {
    const currentKids = getCurrentLevelKids();

    document.querySelectorAll('.picture-item').forEach(pictureItem => {
        const kidId = pictureItem.dataset.kidId;
        if (matches[kidId]) return;

        pictureItem.style.border = '4px solid orange';
        setTimeout(() => { pictureItem.style.border = ''; }, 2000);
    });

    alert(`You have ${score} correct matches out of ${currentKids.length} total! Keep going! 💪`);
}

// ========================================
// UTILITY
// ========================================

document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('drop', e => e.preventDefault());
