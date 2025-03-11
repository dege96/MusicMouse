import { gameDialogs } from './story.js';

// Lägg till loggning för att verifiera importen
console.log("Script.js loaded");
console.log("Imported gameDialogs:", gameDialogs);
console.log("Number of dialogs:", gameDialogs ? gameDialogs.length : 0);

// Game variables
let wavFiles = [];
let interactionDone = false;
let lastPlayTime = 0;
let MIN_PLAY_INTERVAL = 0;
let lastMouseMoveTime = 0;
let typingSpeed = 50; // ms per character
let currentDialogIndex = 0;
let isTyping = false;
let skipTyping = false; // Ny variabel för att spåra om användaren vill hoppa över skrivanimationen

// Player stats and game state
let playerHealth = 100;
let badChoices = 0; // Tracks consecutive bad choices
let playerClass = ""; // Will be set to "warrior", "mage", or "scout"
let playerPerks = {}; // Will store character-specific abilities
let inventory = []; // Player's collected items
let discoveredRunes = 0; // Track how many runes found


// Fetch the WAV files from the server
async function fetchWavFiles() {
    console.log('Fetching WAV files...');
    try {
        const response = await fetch('/api/angel-wavs');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch WAV files. Status: ${response.status}`);
        }
        
        wavFiles = await response.json();
        
        console.log('WAV files fetched:', wavFiles);
        
        if (wavFiles.length === 0) {
            console.warn('No WAV files found.');
        }
        
        checkFilesLoaded();
        
    } catch (error) {
        console.error('Error fetching WAV files:', error);
    }
}

// Check if all required files are loaded
function checkFilesLoaded() {
    if (wavFiles.length > 0) {
        hideLoadingScreen();
    }
}

// Hide the loading screen and show the main content
function hideLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('start-overlay').style.display = 'flex';
}

// Play a sound from the wav files
function playSound(x, y) {
    const currentTime = Date.now();

    if (wavFiles.length === 0) {
        console.warn('No WAV files available.');
        return;
    }
    if (!interactionDone) {
        console.warn('User interaction required.');
        return;
    }

    const sound = wavFiles[Math.floor(Math.random() * wavFiles.length)];
    const audioUrl = `/angel-wavs/${encodeURIComponent(sound)}`;
    const audio = new Audio(audioUrl);

    audio.play().then(() => {
        console.log(MIN_PLAY_INTERVAL, 'ms sound played:', sound);
    }).catch(error => {
        console.error('Playback failed:', error);
    });

    lastPlayTime = currentTime;
}

// Update the MIN_PLAY_INTERVAL display
function updateIntervalDisplay() {
    const intervalDisplay = document.getElementById('interval-display');
    if (intervalDisplay) {
        intervalDisplay.textContent = `Sound: ${MIN_PLAY_INTERVAL.toFixed(0)} ms`;
    }
}

// Start the game and show first dialog
function startGame() {
    console.log("startGame function called");
    interactionDone = true;
    
    // Starta med första dialogen (index 0) istället för karaktärsvalsdialogen
    console.log("Visar första dialogen med index: 0");
    showDialog(0);
    console.log("Efter showDialog-anrop");
    
    // Add CSS for game over effect
    const style = document.createElement('style');
    style.textContent = `
        .death-effect {
            animation: death-fade 3s forwards;
            filter: grayscale(100%) brightness(40%);
        }
        
        @keyframes death-fade {
            from { opacity: 1; }
            to { opacity: 0.7; }
        }
        
        .disabled {
            opacity: 0.5;
            cursor: not-allowed !important;
        }
        
        #stats-display {
            background: rgba(0, 0, 0, 0.7);
            border: 2px solid #5cf;
            padding: 10px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            font-size: 0.7em;
        }
        
        .stat {
            margin-right: 10px;
        }
        
        .health {
            color: #f55;
        }
        
        .restart {
            background: #f55 !important;
            border-color: #f55 !important;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Display dialog text with typewriter effect
function showDialog(dialogIndex) {
    console.log(`showDialog called with index: ${dialogIndex}`);
    
    if (dialogIndex >= gameDialogs.length) {
        console.error(`Dialog index ${dialogIndex} is out of bounds. Maximum index is ${gameDialogs.length - 1}`);
        return;
    }
    
    console.log(`Fetching dialog with index ${dialogIndex}:`, gameDialogs[dialogIndex]);
    currentDialogIndex = dialogIndex;
    const dialog = gameDialogs[dialogIndex];
    
    const dialogText = document.getElementById('dialog-text');
    if (!dialogText) {
        console.error("Dialog text element not found!");
        return;
    }
    
    const choicesContainer = document.getElementById('choices');
    if (!choicesContainer) {
        console.error("Choices container not found!");
        return;
    }
    
    // Kontrollera om spelaren har valt en klass (för felsökning)
    console.log(`Aktuell spelarklass: "${playerClass}"`);
    if (!playerClass && dialogIndex >= 260 && dialogIndex <= 290) {
        console.warn("Spelaren har nått en klassspecifik dialog utan att ha valt klass!");
        console.log("Spelaregenskaper:", playerPerks);
    }
    
    // Clear previous choices
    choicesContainer.innerHTML = '';
    
    // Update health display if character has been chosen
    if (playerClass) {
        updateStatsDisplay();
    }
    
    // Type text with animation
    isTyping = true; // Sätt isTyping till true när dialogen börjar skrivas
    typeText(dialogText, dialog.text, 0, () => {
        isTyping = false;
        
        // Add choices after text is fully typed
        let hasEnabledChoice = false;
        
        // Lägg till loggning för att felsöka
        console.log(`Dialog ${dialogIndex} har ${dialog.choices.length} val`);
        
        dialog.choices.forEach((choice, index) => {
            const choiceBtn = document.createElement('div');
            choiceBtn.className = 'choice';
            
            let isDisabled = false;
            
            // Check if this choice requires a specific class/perk
            if (choice.requiresClass && playerClass !== choice.requiresClass) {
                choiceBtn.classList.add('disabled');
                choiceBtn.title = `Requires ${choice.requiresClass} class`;
                isDisabled = true;
                console.log(`Val ${index}: "${choice.text}" inaktiverat - kräver klass: ${choice.requiresClass}`);
            }
            
            if (choice.requiresPerk && !playerPerks[choice.requiresPerk]) {
                choiceBtn.classList.add('disabled');
                choiceBtn.title = `Requires ${choice.requiresPerk} ability`;
                isDisabled = true;
                console.log(`Val ${index}: "${choice.text}" inaktiverat - kräver egenskap: ${choice.requiresPerk}`);
            }
            
            if (!isDisabled) {
                hasEnabledChoice = true;
                console.log(`Val ${index}: "${choice.text}" är aktiverat`);
            } else {
                // Se till att klassen 'disabled' verkligen läggs till
                if (!choiceBtn.classList.contains('disabled')) {
                    choiceBtn.classList.add('disabled');
                }
            }
            
            choiceBtn.textContent = choice.text;
            choiceBtn.addEventListener('click', () => {
                if (!isTyping && !choiceBtn.classList.contains('disabled')) {
                    // Play selection sound
                    playSound(window.innerWidth / 2, window.innerHeight / 2);
                    
                    // Process choice and get result
                    if (processChoice(index, choice.nextIndex)) {
                        // Move to next dialog only if processChoice returns true
                        showDialog(choice.nextIndex);
                    }
                }
            });
            choicesContainer.appendChild(choiceBtn);
        });
        
        // Om inga alternativ är aktiva, lägg till ett "Fortsätt"-alternativ
        if (!hasEnabledChoice && dialog.choices.length > 0) {
            console.log(`VARNING: Dialog ${dialogIndex} har inga klickbara alternativ!`);
            console.log("Lägger till nödutgång som fortsätter spelet");
            
            const emergencyChoice = document.createElement('div');
            emergencyChoice.className = 'choice emergency-choice';
            emergencyChoice.textContent = "Fortsätt...";
            emergencyChoice.style.fontSize = "1.2em";  // Gör den större
            emergencyChoice.style.margin = "15px 0";   // Mer utrymme runt knappen
            emergencyChoice.style.boxShadow = "0 0 12px #f55"; // Mer glow-effekt
            
            emergencyChoice.addEventListener('click', () => {
                if (!isTyping) {
                    // Spela ljudeffekt
                    playSound(window.innerWidth / 2, window.innerHeight / 2);
                    
                    // Kontrollera om detta är en klasspecifik dialog
                    if (dialogIndex >= 260 && dialogIndex <= 290) {
                        console.log("Detta verkar vara en klassrelaterad dialog. Går till första runan.");
                        showDialog(303); // Går till dialogen om att hitta första runan
                    } else {
                        // Gå till nästa dialog i sekvensen eller första dialogen
                        let nextDialogIndex = dialogIndex + 1;
                        
                        // Om nästa index är utanför gränserna, gå tillbaka till början
                        if (nextDialogIndex >= gameDialogs.length) {
                            nextDialogIndex = 0;
                        }
                        
                        showDialog(nextDialogIndex);
                    }
                }
            });
            choicesContainer.appendChild(emergencyChoice);
        }
        
        // Om inga val finns alls, lägg till ett "Fortsätt"-alternativ
        if (dialog.choices.length === 0) {
            console.log("Inga valalternativ hittades - lägger till fortsätt-knapp");
            const continueChoice = document.createElement('div');
            continueChoice.className = 'choice continue-choice';
            continueChoice.textContent = "Fortsätt...";
            continueChoice.addEventListener('click', () => {
                if (!isTyping) {
                    // Spela ljudeffekt
                    playSound(window.innerWidth / 2, window.innerHeight / 2);
                    
                    // Gå till nästa dialog i sekvensen
                    showDialog(dialogIndex + 1);
                }
            });
            choicesContainer.appendChild(continueChoice);
        }
    });
}

// Lägg till event-lyssnare för att detektera "s"-tangentens tryck
document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === 's' && isTyping) {
        console.log("Skipping typing animation");
        skipTyping = true;
    }
});

function typeText(element, text, index, callback) {
    if (skipTyping) {
        // Om skipTyping är true, visa all text direkt och avsluta
        element.textContent = text;
        skipTyping = false; // Återställ för nästa textblock
        callback();
        return;
    }
    
    if (index < text.length) {
        element.textContent = text.substring(0, index + 1);
        // Play typing sound occasionally
        if (index % 3 === 0) {
            playSound(window.innerWidth / 2, window.innerHeight / 2);
        }
        
        setTimeout(() => {
            typeText(element, text, index + 1, callback);
        }, typingSpeed);
    } else {
        callback();
    }
}

// Handle mouse move events with throttling
document.addEventListener('mousemove', (event) => {
    if (interactionDone) {
        const currentTime = Date.now();

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

// Create particles on mouse move
document.body.addEventListener('mousemove', (e) => {
    createDot(e.clientX, e.clientY);
});
  
function createDot(x, y) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
  
    // Append to the document
    document.body.appendChild(dot);
  
    // Add movement to the dot
    moveDotRandomly(dot, x, y);
  
    // Remove dot after 3 seconds
    setTimeout(() => {
        dot.remove();
    }, 1500);
}
  
function moveDotRandomly(dot, startX, startY) {
    let circleArea = 0; // Initial radius of the circle area
    const growthRate = 0; // Radius grows by 1 units every move cycle
    const maxRadius = 1; // Example maximum radius
  
    const move = () => {
        // Get the dot's current position
        const dotRect = dot.getBoundingClientRect();
        const dotX = dotRect.left + dotRect.width / 2;
        const dotY = dotRect.top + dotRect.height / 2;
  
        // Calculate distance from the cursor
        const distanceFromCursor = Math.hypot(startX - dotX, startY - dotY);
  
        // Define circle area radius (smaller when closer to the cursor)
        const radius = Math.max(circleArea - distanceFromCursor, 10); // Min radius of 10
  
        // Random angle and distance within the adjusted radius
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * radius;
  
        // Calculate new position
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
  
        // Update dot position
        const newX = dotX + offsetX;
        const newY = dotY + offsetY;
  
        dot.style.left = `${newX}px`;
        dot.style.top = `${newY}px`;
  
        // Repeat the movement every 300ms
        setTimeout(move, 70);
    };
  
    move();
}

// Function to handle player death
function playerDeath(reason) {
    const dialogText = document.getElementById('dialog-text');
    const choicesContainer = document.getElementById('choices');
    
    // Clear previous choices
    choicesContainer.innerHTML = '';
    
    // Show death message
    dialogText.textContent = `GAME OVER: ${reason}`;
    
    // Add restart button
    const restartBtn = document.createElement('div');
    restartBtn.className = 'choice restart';
    restartBtn.textContent = "Restart Game";
    restartBtn.addEventListener('click', () => {
        resetGame();
        startGame();
    });
    choicesContainer.appendChild(restartBtn);
    
    // Visual effect for death
    document.body.classList.add('death-effect');
    playSound(window.innerWidth / 2, window.innerHeight / 2); // Death sound
}

// Function to reset game state
function resetGame() {
    playerHealth = 100;
    badChoices = 0;
    playerClass = "";
    playerPerks = {};
    inventory = [];
    discoveredRunes = 0;
    document.body.classList.remove('death-effect');
}

// Function to set player class and perks
function setPlayerClass(className) {
    playerClass = className;
    
    // Set perks based on class
    switch(className) {
        case "warrior":
            playerPerks = {
                combat: true,        // Better at fighting
                strength: true,      // Can move heavy objects
                intimidation: true   // Can scare certain creatures
            };
            break;
        case "mage":
            playerPerks = {
                spellcasting: true,  // Can cast spells
                knowledge: true,     // Knows about magical creatures
                detection: true      // Can detect magical traps
            };
            break;
        case "scout":
            playerPerks = {
                stealth: true,       // Can sneak past enemies
                perception: true,    // Notices hidden objects
                survival: true       // Better at navigating the forest
            };
            break;
    }
    
    console.log(`Character class set to ${className} with perks:`, playerPerks);
}

// Function to check if a choice is considered "bad" based on context
function isBadChoice(choiceIndex, dialogIndex) {
    // List of known bad choices (dialogIndex, choiceIndex)
    const badChoicesList = [
        {dialog: 5, choice: 2}, // Leaving when warned
        {dialog: 7, choice: 1}, // Trying to find way out alone
        {dialog: 24, choice: 2}, // Being too brave/careless
        {dialog: 85, choice: 0}, // Touching unknown magical entity
        {dialog: 104, choice: 0}, // Confronting shadow creature
        // More can be added
    ];
    
    return badChoicesList.some(bc => bc.dialog === dialogIndex && bc.choice === choiceIndex);
}

// Function to process choice consequences
function processChoice(choiceIndex, nextDialogIndex) {
    // Check for bad choice
    if (isBadChoice(choiceIndex, currentDialogIndex)) {
        badChoices++;
        playerHealth -= 20; // Damage from bad choice
        console.log(`Bad choice made! Health: ${playerHealth}, Bad choices: ${badChoices}`);
        
        // Check for death conditions
        if (badChoices >= 3) {
            playerDeath("Too many bad decisions led to your demise");
            return false; // Don't proceed to next dialog
        }
        
        if (playerHealth <= 0) {
            playerDeath("Your health reached zero");
            return false; // Don't proceed to next dialog
        }
    } else {
        // Reset bad choices counter for good choices
        badChoices = Math.max(0, badChoices - 1);
    }
    
    // Check for special dialog that leads to death
    if (nextDialogIndex === 0 && currentDialogIndex !== 0) {
        playerDeath("You have met a tragic end");
        return false;
    }
    
    // Check for class selection dialogs
    if (currentDialogIndex === 200) {
        switch(choiceIndex) {
            case 0: 
                setPlayerClass("warrior"); 
                break;
            case 1: 
                setPlayerClass("mage"); 
                break;
            case 2: 
                setPlayerClass("scout"); 
                break;
        }
    }
    
    // Handle warrior confirmation
    if (currentDialogIndex === 201 && choiceIndex === 0) {
        setPlayerClass("warrior");
    }
    
    // Handle mage confirmation
    if (currentDialogIndex === 202 && choiceIndex === 0) {
        setPlayerClass("mage");
    }
    
    // Handle scout confirmation
    if (currentDialogIndex === 203 && choiceIndex === 0) {
        setPlayerClass("scout");
    }
    
    // Process rune discovery
    if (nextDialogIndex === 302) { // After successful guardian encounter
        discoveredRunes++;
        inventory.push("blue rune");
        console.log(`Found blue rune. Total: ${discoveredRunes} of 3`);
        
        // Check for game win condition
        if (discoveredRunes >= 3) {
            // Player has all runes - show victory dialog
            setTimeout(() => {
                showDialog(400); // Victory dialog
            }, 1000);
            return false;
        }
    }
    
    // Process class-specific encounters
    if (currentDialogIndex === 62) { // Guardian dialog
        // Redirect to class-specific dialogs
        if (playerClass === "warrior") {
            showDialog(300);
            return false;
        } else if (playerClass === "mage") {
            showDialog(301);
            return false;
        } else if (playerClass === "scout") {
            showDialog(302);
            return false;
        }
    }
    
    return true; // Proceed to next dialog
}

// Process special events based on dialog and choice
function processSpecialEvents(dialogIndex, choiceIndex) {
    // Character selection
    if (gameDialogs[dialogIndex] && gameDialogs[dialogIndex].text.includes("What kind of person are you?")) {
        console.log("Karaktärsval identifierat i dialog", dialogIndex, "val:", choiceIndex);
        if (choiceIndex === 0) {
            setPlayerClass("warrior");
        } else if (choiceIndex === 1) {
            setPlayerClass("mage");
        } else if (choiceIndex === 2) {
            setPlayerClass("scout");
        }
    }

    // Class-specific paths at certain points
    if (dialogIndex === 601 && choiceIndex === 0) { // Face Shadow Mage
        if (playerClass === "warrior") {
            showDialog(650); // Warrior specific battle
            return false;
        } else if (playerClass === "mage") {
            showDialog(651); // Mage specific battle
            return false;
        } else if (playerClass === "scout") {
            showDialog(652); // Scout specific battle
            return false;
        }
    }
    
    // Items and inventory
    if (dialogIndex === 53 && choiceIndex === 0) { // Receive amulet
        inventory.push("protective amulet");
        console.log("Added protective amulet to inventory");
    }
    
    // Rune discovery
    if ([64, 120, 150].includes(dialogIndex)) { // Dialogs where runes are found
        discoveredRunes++;
        console.log(`Hittade runa ${discoveredRunes} av 7`);
        
        // When all runes are found, trigger ending sequence
        if (discoveredRunes >= 7) {
            // Hitta slutritualsscenen baserat på text istället för fast index
            let ritualSceneIndex = -1;
            for (let i = 0; i < gameDialogs.length; i++) {
                if (gameDialogs[i].text.includes("final rune in the circle")) {
                    ritualSceneIndex = i;
                    break;
                }
            }
            
            if (ritualSceneIndex !== -1) {
                console.log("Visar slutritual med index:", ritualSceneIndex);
                showDialog(ritualSceneIndex);
            } else {
                console.error("Kunde inte hitta slutritualscenen!");
                // Fortsätt med vanlig dialog som fallback
            }
            return false;
        }
    }
    
    // Class-specific advantages
    if (dialogIndex === 62 && playerClass === "mage" && playerPerks.knowledge) {
        // Mage gets special knowledge about the guardian
        showSpecialDialog(300); // Show special dialog for mages
        return false; // Don't proceed to regular next dialog
    }
    
    // If at an ending dialog and player reaches end of story
    if (dialogIndex >= 800) {
        // We are at a game ending scene
        console.log("Game ending reached: " + dialogIndex);
    }
    
    // More special events can be added
    
    return true;
}

// Function to show special class-specific dialog
function showSpecialDialog(specialDialogIndex) {
    showDialog(specialDialogIndex);
}

// Update stats display
function updateStatsDisplay() {
    let statsDisplay = document.getElementById('stats-display');
    if (!statsDisplay) {
        // Create stats display if it doesn't exist
        const statsDiv = document.createElement('div');
        statsDiv.id = 'stats-display';
        document.getElementById('game-container').prepend(statsDiv);
        statsDisplay = statsDiv;
    }
    
    // Update stats content
    let statsContent = `
        <div class="stat health">Hälsa: ${playerHealth}%</div>
        <div class="stat">Klass: ${playerClass.charAt(0).toUpperCase() + playerClass.slice(1)}</div>
    `;
    
    // Add runes info if any discovered
    if (discoveredRunes > 0) {
        statsContent += `<div class="stat runes">Runor: ${discoveredRunes}/7</div>`;
    }
    
    // Add inventory display if items exist
    if (inventory.length > 0) {
        statsContent += `<div class="stat items">Föremål: ${inventory.join(', ')}</div>`;
    }
    
    statsDisplay.innerHTML = statsContent;
}

// Add event listener for the start button
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded: Document has loaded');
    
    // Vi behöver inte lägga till en event-lyssnare här eftersom vi använder onclick i HTML
    // Detta förhindrar att startGame körs dubbelt
    console.log('Startknappen hanteras via inline onclick i HTML');
});

// Alternativ lösning - vi behöver inte detta heller
window.onload = function() {
    console.log('Window.onload: Window has loaded');
    // Tar bort dubbla event-lyssnare
    console.log('Startknappen hanteras redan via inline onclick i HTML');
};

// Gör startGame tillgänglig globalt
window.startGame = startGame;

// Initialize the game
fetchWavFiles();