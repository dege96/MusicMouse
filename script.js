let wavFiles1 = [];
let wavFiles2 = [];
let currentWavFiles = [];
let imageFiles = []; // To track image files
let interactionDone = false;
let lastPlayTime = 0;
let MIN_PLAY_INTERVAL = 180;
let lastMouseMoveTime = 0;

let frame = 0;
const totalFrames = 260;
const imgElement = document.getElementById('animation');
let moveCounter = 0;

const ControlPanel = document.getElementById('control-panel');
const buttons = document.querySelectorAll('.button');
const angelButton = document.getElementById('angel-button');
const demonButton = document.getElementById('demon-button');

// Set angels button as active
angelButton.classList.remove('inactive');
angelButton.classList.add('active');
demonButton.classList.add('inactive');

// Fetch the WAV files from the server
async function fetchWavFiles(folderName) {
    console.log(`Fetching WAV files from ${folderName}...`);
    try {
        const response = await fetch(`/api/${folderName}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch WAV files from ${folderName}. Status: ${response.status}`);
        }
        
        const wavFiles = await response.json();
        
        console.log(`WAV files fetched from ${folderName}:`, wavFiles);
        
        if (folderName === 'angel-wavs') {
            wavFiles1 = wavFiles;
        } else if (folderName === 'demon-wavs') {
            wavFiles2 = wavFiles;
        }
        
        currentWavFiles = wavFiles;
        
        if (wavFiles.length === 0) {
            console.warn(`No WAV files found in ${folderName}.`);
        }
        
        checkFilesLoaded(); // Call this to check if all files are loaded
        
    } catch (error) {
        console.error('Error fetching WAV files:', error);
        // Optionally handle the error further, e.g., show an error message to the user
    }
}

function preloadImage(imageIndex) {
    return new Promise((resolve, reject) => {
        const imgSrc = `/pics/Comp1/image${imageIndex}.png`; // Update path if necessary
        const img = new Image();

        img.src = imgSrc;
        img.onload = () => resolve(imgSrc);
        img.onerror = () => reject(`Failed to load image ${imageIndex}`);
    });
}

async function preloadImages() {
    try {
        console.log('Preloading images...');

        for (let i = 0; i < totalFrames; i++) {
            const imgSrc = await preloadImage(i);
            imageFiles.push(imgSrc);
            console.log(`Preloaded image ${i}: ${imgSrc}`);
        }

        console.log('All images preloaded successfully');
        checkFilesLoaded(); // Ensure this checks for both WAV and image files
    } catch (error) {
        console.error(error);
    }
}


// Check if all required files are loaded
function checkFilesLoaded() {
    if (wavFiles1.length > 0 && imageFiles.length === totalFrames) {
        hideLoadingScreen();
    }
}

// Hide the loading screen and show the main content
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    loadingScreen.style.display = 'none';
    mainContent.style.display = 'block';
}

// Create a sparkle effect at the cursor position
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.left = `${x - 5}px`;
    sparkle.style.top = `${y - 5}px`;
    sparkle.style.opacity = '1';
    sparkle.style.position = 'absolute';
    sparkle.style.background = 'radial-gradient(circle, #fff, rgba(255, 255, 255, 0))';

    const container = document.getElementById('sparkle-container');
    if (!container) {
        throw new Error('Sparkle container not found');
    }
    container.appendChild(sparkle);

    setTimeout(() => {
        sparkle.style.opacity = '0';
        sparkle.style.transform = 'scale(2)';
    }, 0);

    setTimeout(() => {
        sparkle.remove();
    }, 500);
}

// Play a sound from the wav files
function playSound(x, y) {
    const currentTime = Date.now();

    if (currentTime - lastPlayTime < MIN_PLAY_INTERVAL) {
        console.log('Skipping sound playback to respect interval limit.');
        return;
    }

    if (currentWavFiles.length === 0) {
        console.warn('No WAV files available.');
        return;
    }
    if (!interactionDone) {
        console.warn('User interaction required.');
        return;
    }

    const sound = currentWavFiles[Math.floor(Math.random() * currentWavFiles.length)];
    const audioUrl = `/${(angelButton.classList.contains('inactive') ? 'demon-wavs' : 'angel-wavs')}/${encodeURIComponent(sound)}`;
    const audio = new Audio(audioUrl);

    audio.play().then(() => {
        console.log(MIN_PLAY_INTERVAL, 'ms sound played:', sound);
    }).catch(error => {
        console.error('Playback failed:', error);
    });

    lastPlayTime = currentTime;
}

function updateFrame(event) {
    requestAnimationFrame(() => {
        frame = (frame + 1) % totalFrames;
        const imgSrc = imageFiles[frame];
        imgElement.src = imgSrc;
        console.log(`Updated image source to: ${imgSrc}`);
    });
}


// Fades in the given object over the given duration
function fadeIn(object, fadeInDuration) {
    const startOpacity = parseFloat(window.getComputedStyle(object).opacity);
    const endOpacity = 1;

    return new Promise(resolve => {
        const startTime = Date.now();

        function step() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / fadeInDuration, 1);
            object.style.opacity = startOpacity + (endOpacity - startOpacity) * progress;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                resolve();
            }
        }

        requestAnimationFrame(step);
    });
}

// Update the MIN_PLAY_INTERVAL display
function updateIntervalDisplay() {
    const intervalDisplay = document.getElementById('interval-display');
    if (intervalDisplay) {
        intervalDisplay.textContent = `Interval: ${MIN_PLAY_INTERVAL.toFixed(0)} ms`;
    }
}

// Handle button clicks for loading WAV files
angelButton.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.add('inactive'));
    angelButton.classList.remove('inactive');
    fetchWavFiles('angel-wavs');
});

demonButton.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.add('inactive'));
    demonButton.classList.remove('inactive');
    fetchWavFiles('demon-wavs');
});

// Handle mouse move events with throttling
document.addEventListener('mousemove', (event) => {
    if (interactionDone) {
        const currentTime = Date.now();
        moveCounter++;

        if ((frame + 1) < totalFrames) {
            if (moveCounter % 5 === 0) {
                updateFrame(event);
            }
        }

        createSparkle(event.clientX, event.clientY);

        const windowHeight = window.innerHeight;
        const mouseY = event.clientY;
        MIN_PLAY_INTERVAL = 80 + ((windowHeight - mouseY) / windowHeight) * (380 - 80);

        updateIntervalDisplay();

        if (currentTime - lastPlayTime >= MIN_PLAY_INTERVAL) {
            playSound(event.clientX, event.clientY);
        }

        lastMouseMoveTime = currentTime;
    }
});

// Initial user interaction to enable sound playback
document.addEventListener('click', async () => {
    if (!interactionDone) {
        console.log('User interacted for the first time.');
        interactionDone = true;

    }
    console.log('User interaction enabled.');

    fadeIn(ControlPanel, 1000);
    updateIntervalDisplay();
});

fetchWavFiles('angel-wavs'); // Fetch wavs
preloadImages(); // Preload images