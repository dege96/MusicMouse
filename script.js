let wavFiles1 = [];
let wavFiles2 = [];
let currentWavFiles = []; // To track which WAV files are currently loaded
let interactionDone = false; // Flag to track if initial interaction has occurred
let lastPlayTime = 0; // Timestamp of the last sound played
let MIN_PLAY_INTERVAL = 180; // Minimum interval between sounds in milliseconds
let lastMouseMoveTime = 0; // Timestamp of the last mouse move event

let frame = 0;
const totalFrames = 260; // Total number of frames (from 00000 to 00889)
const imgElement = document.getElementById('animation');
let moveCounter = 0; // Counter to track mouse moves

// Fade in control panel over 1 second
const ControlPanel = document.getElementById('control-panel');
const buttons = document.querySelectorAll('.button');

const angelButton = document.getElementById('angel-button');
const demonButton = document.getElementById('demon-button');

//set angels button as active
angelButton.classList.remove('inactive');
angelButton.classList.add('active');

demonButton.classList.add('inactive');

// Fetch the wav files from the server
async function fetchWavFiles(folderName) {
    console.log(`Fetching WAV files from ${folderName}...`);
    try {
        const response = await fetch(`/api/${folderName}`);
        if (!response.ok) {
            throw new Error('Failed to fetch wav files');
        }
        const wavFiles = await response.json();
        console.log(`WAV files fetched from ${folderName}:`, wavFiles);
        if (folderName === 'angel-wavs') {
            wavFiles1 = wavFiles;
        } else if (folderName === 'demon-wavs') {
            wavFiles2 = wavFiles;
        }
        currentWavFiles = wavFiles; // Update currentWavFiles based on folderName
        if (wavFiles.length === 0) {
            console.warn(`No WAV files found in ${folderName}.`);
        }
    } catch (error) {
        console.error('Error fetching wav files:', error);
    }
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
    sparkle.style.position = 'absolute'; // Ensure proper positioning
    sparkle.style.background = 'radial-gradient(circle, #fff, rgba(255, 255, 255, 0))';

    const container = document.getElementById('sparkle-container');
    if (!container) {
        throw new Error('Sparkle container not found');
    }
    container.appendChild(sparkle);

    // Animate sparkle
    setTimeout(() => {
        sparkle.style.opacity = '0';
        sparkle.style.transform = 'scale(2)';
    }, 0);

    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 500); // Adjust to match animation duration
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

    const sound = currentWavFiles[Math.floor(Math.random() * currentWavFiles.length)]; // Play a random sound
    const audioUrl = `/${(angelButton.classList.contains('inactive') ? 'demon-wavs' : 'angel-wavs')}/${encodeURIComponent(sound)}`;
    const audio = new Audio(audioUrl);

    audio.play().then(() => {
        console.log(MIN_PLAY_INTERVAL, 'ms sound played:', sound);
    }).catch(error => {
        console.error('Playback failed:', error);
    });

    lastPlayTime = currentTime; // Update the timestamp of the last sound played
}

// Function to update the image source based on mouse position
function updateFrame(event) {
    // Calculate the frame based on the horizontal mouse position
    frame++;

    // Construct the image filename
    const imgSrc = `pics/Comp1/image${frame}.png`;

    // Update the image source
    imgElement.src = imgSrc;
}

// Starts the fade-in animation
function fadeIn(object, fadeInDuration) {
    const startOpacity = parseFloat(window.getComputedStyle(object).opacity);
    const endOpacity = 1;
    const startTime = Date.now();

    function step() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / fadeInDuration, 1);
        object.style.opacity = startOpacity + (endOpacity - startOpacity) * progress;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
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
        
        // Increment the mouse move counter
        moveCounter++;

        if (frame + 1 <= totalFrames) {
            // Update frame only if moveCounter is even
            if (moveCounter % 2 === 0) {
                updateFrame(event);
            }
        }

        // Create a sparkle at the cursor position
        createSparkle(event.clientX, event.clientY);

        // Calculate MIN_PLAY_INTERVAL based on vertical mouse position
        const windowHeight = window.innerHeight;
        const mouseY = event.clientY;
        MIN_PLAY_INTERVAL = 80 + ((windowHeight - mouseY) / windowHeight) * (380 - 80);

        // Update the display for MIN_PLAY_INTERVAL
        updateIntervalDisplay();

        // Play sound if the time interval has passed
        if (currentTime - lastPlayTime >= MIN_PLAY_INTERVAL) {
            playSound(event.clientX, event.clientY);
        }
        
        lastMouseMoveTime = currentTime;
    }
});

// Initial user interaction to enable sound playback
document.addEventListener('click', () => {
    if (!interactionDone) {
        console.log('User interacted for the first time.');
        interactionDone = true;
        fetchWavFiles('angel-wavs'); // Fetch files on initial interaction
    }
    console.log('User interaction enabled.');

    fadeIn(ControlPanel, 1000)

    // Initialize the MIN_PLAY_INTERVAL display
    updateIntervalDisplay();

    requestAnimationFrame(step);
});
