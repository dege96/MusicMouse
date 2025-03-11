// Game dialog and story - Spelets huvudsakliga dialoger och berättelse
// Strukturen för varje dialog: 
// {
//   text: "Dialogens text som visas för spelaren",
//   choices: [
//     { text: "Ett alternativ", nextIndex: X },  // Leder till dialogen på index X
//     ...
//   ]
// }
//
// Nedan följer alla dialoger i ett numeriskt index-system (array).
// Speciella dialoger:
// - Index 0-20: Introduktionssekvensen och tidiga val
// - Index 21: Karaktärsval (val av arketyp: krigare, magiker, spejare)
// - Index 260-290: Klasspecifika dialoger och äventyrsstigar
// - Index 300+: Speciella uppföljningsdialoger för krigare
// - Index 310+: Speciella uppföljningsdialoger för magiker
// - Index 320+: Speciella uppföljningsdialoger för spejare
// - Index 600+: Ödesdigra val och slutstrider

export const gameDialogs = [
    // --- INTRODUKTION ---
    // Index 0: Spelets startpunkt - Den mystiska rösten
    {
        text: "Hello, is anyone there?",
        choices: [
            { text: "Yes, I'm here!", nextIndex: 1 },
            { text: "(Stay silent)", nextIndex: 2 }
        ]
    },
    // Index 1: Positiv första respons
    {
        text: "Oh! I can sense your presence... I've been trapped in this forest for centuries. Will you help me escape?",
        choices: [
            { text: "Who are you?", nextIndex: 3 },
            { text: "How can I help?", nextIndex: 4 },
            { text: "I should go...", nextIndex: 5 }
        ]
    },
    // Index 2: Spelarens tystnad - alternativ väg
    {
        text: "I know you're there... I can feel your energy. Please, don't leave me alone in this darkness...",
        choices: [
            { text: "Sorry, I was afraid. Who are you?", nextIndex: 3 },
            { text: "What do you want from me?", nextIndex: 6 },
            { text: "I should leave this place...", nextIndex: 7 }
        ]
    },
    // --- IDENTITETSFRÅGOR ---
    // Index 3: Rösten avslöjar sin identitet - Elara
    {
        text: "I am... or was... Elara, a guardian of these woods. Long ago, a dark enchantment bound my spirit to this place. I can no longer remember my true form.",
        choices: [
            { text: "What is this forest?", nextIndex: 8 },
            { text: "Tell me about this dark enchantment", nextIndex: 9 },
            { text: "How can I help you?", nextIndex: 4 }
        ]
    },
    // --- ERBJUDANDE OM HJÄLP ---
    // Index 4: Spelaren erbjuder hjälp - huvudvägen till uppdraget
    {
        text: "To free me, you must find the ancient runes scattered throughout the forest. There are seven in total, each hidden in a different area. The first is near the old oak to the north.",
        choices: [
            { text: "I'll help you find these runes", nextIndex: 10 },
            { text: "That sounds dangerous", nextIndex: 11 },
            { text: "I need to know more first", nextIndex: 12 }
        ]
    },
    // --- FÖRSÖK ATT LÄMNA ---
    // Index 5: Spelaren tvekar - Elara försöker övertyga
    {
        text: "Wait! Please... The forest won't let you leave so easily now that you've entered. The path behind you has already disappeared. The only way out is forward.",
        choices: [
            { text: "What do you mean the forest won't let me leave?", nextIndex: 13 },
            { text: "Fine, I'll hear you out", nextIndex: 3 },
            { text: "I'll find my own way out", nextIndex: 14 }
        ]
    },
    // --- VAD VILL DU? ---
    // Index 6: Spelaren är misstänksam - Elaras svar på "Vad vill du ha"
    {
        text: "Freedom. That's all I desire. I've been trapped here for so long... I can feel my memories fading. Soon, I'll become just another whisper in these woods.",
        choices: [
            { text: "That's terrible. How can I help?", nextIndex: 4 },
            { text: "Why should I risk myself for you?", nextIndex: 15 },
            { text: "Tell me more about yourself first", nextIndex: 3 }
        ]
    },
    // --- BESTÄMD ATT LÄMNA ---
    // Index 7: Spelaren försöker lämna direkt - konsekvens av misstro
    {
        text: "As you turn to leave, the trees seem to close in around you. The path you came from is gone, replaced by thick, impenetrable brush. A chill runs down your spine as you hear distant whispers.",
        choices: [
            { text: "Return to the voice", nextIndex: 16 },
            { text: "Try to force your way through", nextIndex: 17 },
            { text: "Call out to whoever is whispering", nextIndex: 18 }
        ]
    },
    // --- OM SKOGEN ---
    // Index 8: Elaras beskrivning av skogen - världsbyggande
    {
        text: "This is the Whispering Wilds, an ancient forest that exists between your world and... somewhere else. Time and space work differently here. The forest itself is alive, in its way.",
        choices: [
            { text: "Is it dangerous?", nextIndex: 19 },
            { text: "Are there others trapped here?", nextIndex: 20 },
            { text: "Tell me about the runes you mentioned", nextIndex: 21 }
        ]
    },
    // --- OM FÖRTROLLNINGEN ---
    // Index 9: Förklaring av den mörka förtrollningen - ger bakgrund för uppdraget
    {
        text: "Centuries ago, a powerful mage sought to control the forest's magic. His ritual went wrong, trapping many spirits, including mine. The enchantment has grown stronger over time, feeding on lost travelers.",
        choices: [
            { text: "Is the mage still here?", nextIndex: 22 },
            { text: "Are you the only one trapped?", nextIndex: 20 },
            { text: "So I'm in danger too?", nextIndex: 23 }
        ]
    },
    // --- ACCEPTERAR UPPDRAGET ---
    // Index 10: Huvudberättelsens startpunkt - mer information
    {
        text: "Thank you! I can guide you, though my influence is limited. The forest is full of strange creatures and lost souls - some helpful, others hostile. Trust your instincts.",
        choices: [
            { text: "Let's start with the first rune", nextIndex: 24 },
            { text: "I should prepare before we start", nextIndex: 25 },
            { text: "Tell me more about these creatures", nextIndex: 26 }
        ]
    },
    // --- TVEKSAM TILL UPPDRAGET ---
    // Index 11: Spelaren uttrycker oro över farorna
    {
        text: "It is dangerous, yes. But staying here without purpose is even more so. The forest feeds on indecision and fear. At least with a goal, you have a chance to escape.",
        choices: [
            { text: "You're right, I'll help you", nextIndex: 10 },
            { text: "What happens if I refuse?", nextIndex: 27 },
            { text: "What kind of dangers are there?", nextIndex: 28 }
        ]
    },
    // --- VILL FÖRBEREDA SIG ---
    // Index 12: Spelaren vill veta mer innan man ger sig av
    {
        text: "What would you like to know? I can tell you about the forest, the runes, the dangers, or... what little I remember of myself.",
        choices: [
            { text: "Tell me about the forest", nextIndex: 8 },
            { text: "Tell me about the runes", nextIndex: 21 },
            { text: "Tell me about yourself", nextIndex: 29 }
        ]
    },
    // --- FARLIGT? ---
    // Index 13: Spelaren frågar om faror - varning om konsekvenser
    {
        text: "Yes. The forest is full of illusions and traps for the unwary. Some areas distort time or space. Others twist minds. And there are... entities... that hunt those who wander too deep.",
        choices: [
            { text: "I don't think I want to help anymore", nextIndex: 24 },
            { text: "Will you protect me somehow?", nextIndex: 25 },
            { text: "I'm not afraid. Let's get started", nextIndex: 10 }
        ]
    },
    // --- VARFÖR HJÄLPA? ---
    // Index 14: Motivering för att hjälpa Elara - koppling till spelarens eget öde
    {
        text: "Because your fate is now tied to mine. The forest has already marked you as its own. The only way you'll leave is by breaking the enchantment. Help me, and we both gain our freedom.",
        choices: [
            { text: "You're threatening me?", nextIndex: 26 },
            { text: "I don't believe you", nextIndex: 27 },
            { text: "Fine. Tell me about these runes", nextIndex: 21 }
        ]
    },
    // --- SKOGEN SLÄPPER INTE ---
    // Index 13: Förklaring av skogens fångande natur - ökar känslan av fara
    {
        text: "The Whispering Wilds is not just a place - it's a sentient entity. Once it has a visitor, it doesn't like to let them go. It's curious about you... and hungry for new stories.",
        choices: [
            { text: "That's disturbing", nextIndex: 30 },
            { text: "Has anyone ever escaped?", nextIndex: 31 },
            { text: "Fine, tell me about these runes", nextIndex: 21 }
        ]
    },
    // --- EGEN VÄGEN UT ---
    // Index 14: Spelaren vill hitta sin egen väg ut - Elara varnar
    {
        text: "Many have tried to find their own way out. Their whispers still echo through the trees. If you won't help me, at least let me help you. We both want the same thing - freedom.",
        choices: [
            { text: "I suppose we should work together", nextIndex: 32 },
            { text: "I don't trust you", nextIndex: 33 },
            { text: "Tell me about these whispers", nextIndex: 34 }
        ]
    },
    // --- VARFÖR RISKERA? ---
    // Index 15: Elara försöker övertyga spelaren om att hjälpa
    {
        text: "I understand your hesitation. But know this - no one leaves this forest without understanding its secrets. The runes hold knowledge you'll need, whether you help me or not.",
        choices: [
            { text: "Fine, I'll help you", nextIndex: 10 },
            { text: "What's in it for me?", nextIndex: 35 },
            { text: "I still don't trust you", nextIndex: 33 }
        ]
    },
    // --- ÅTERVÄNDER TILL RÖSTEN ---
    // Index 16: Spelaren återvänder till Elara efter att ha utforskat
    {
        text: "You return to the clearing where you heard the voice. 'I knew you'd come back,' she whispers. 'No one leaves the Wilds without its permission.'",
        choices: [
            { text: "I'll help you find the runes", nextIndex: 10 },
            { text: "Tell me everything you know about this place", nextIndex: 36 },
            { text: "Is there really no other way out?", nextIndex: 37 }
        ]
    },
    // --- FÖRSÖKER TVINGA SIG IGENOM ---
    // Index 17: Spelaren försöker fysiskt ta sig igenom skogen - motstånd
    {
        text: "You push against the thick brush, but the thorns tear at your clothes and skin. The more you struggle, the tighter the forest seems to grip you. You're forced to retreat, bleeding from small cuts.",
        choices: [
            { text: "Return to the voice", nextIndex: 16 },
            { text: "Try another direction", nextIndex: 38 },
            { text: "Rest and recover", nextIndex: 39 }
        ]
    },
    // --- ROPAR PÅ VISKNINGARNA ---
    // Index 18: Spelaren ropar på visslingarna - första steget i utmaningen    
    {
        text: "You call out to the whispers. They grow louder, surrounding you. 'Another lost one,' they seem to say. 'Join us... stay with us forever.' A cold fog begins to envelop you.",
        choices: [
            { text: "Run back to the voice", nextIndex: 40 },
            { text: "Demand answers from the whispers", nextIndex: 41 },
            { text: "Close your eyes and focus your thoughts", nextIndex: 42 }
        ]
    },
    // --- ÄR SKOGEN FARLIG? ---
    // Index 19: Spelaren frågar om skogens farliga sidor
    {
        text: "Yes, very. The forest has many faces. Some parts are peaceful, others deadly. The deeper you go, the more the rules of your world cease to apply. Keep your wits about you.",
        choices: [
            { text: "What kind of dangers should I watch for?", nextIndex: 28 },
            { text: "Let's talk about the runes", nextIndex: 21 },
            { text: "I need to prepare before going further", nextIndex: 25 }
        ]
    },
    // --- FINNS ANDRA FÅNGADE? ---
    // Index 20: Spelaren frågar om andra fångade
    {
        text: "Yes... many souls are bound here. Some have been here so long they've forgotten they were ever human. Others are fresher, still calling out for help. A few have given in to the forest's whispers.",
        choices: [
            { text: "Can I help them too?", nextIndex: 43 },
            { text: "Are they dangerous?", nextIndex: 44 },
            { text: "Let's focus on helping you first", nextIndex: 10 }
        ]
    },
    // Character selection dialog
    // Index 21: Spelaren väljer sin karaktär
    {
        text: "Before you venture deeper into the forest, take a moment to focus. What kind of person are you? Your past experiences will determine how you can face the challenges ahead.",
        choices: [
            { text: "I am a warrior, strong and direct. I face challenges head-on with courage and strength.", nextIndex: 26 },
            { text: "I am a mage, observant and intelligent. I solve problems by understanding the deeper mysteries.", nextIndex: 27 },
            { text: "I am a scout, quick and perceptive. I navigate challenges through stealth and careful planning.", nextIndex: 28 }
        ]
    },
    
    // --- OM RUNERNA ---
    // Index 22: Spelaren frågar om runer
    {
        text: "The seven runes were created to bind and channel the forest's magic. Each represents a different aspect: Life, Death, Time, Space, Mind, Soul, and Power. Together, they can break any enchantment here.",
        choices: [
            { text: "Where is the first rune?", nextIndex: 45 },
            { text: "Will these runes help me escape too?", nextIndex: 46 },
            { text: "Are they guarded or protected?", nextIndex: 47 }
        ]
    },
    
    // --- FINNS MAGIKERN KVAR? ---
    // Index 23: Spelaren frågar om magikern
    {
        text: "In a way. His body perished long ago, but his ambition was so strong that his will remains. He exists now as the Shadow Mage, a being of pure intention without morality or restraint.",
        choices: [
            { text: "Will we face him?", nextIndex: 48 },
            { text: "Is he controlling the forest?", nextIndex: 49 },
            { text: "How do we defeat something like that?", nextIndex: 50 }
        ]
    },
    
    // --- SÅ JAG ÄR I FARA? ---
    // Index 24: Spelaren frågar om hon är i skogen
    {
        text: "I won't lie to you - yes. The forest sees you as both guest and potential captive. It will test you, tempt you, perhaps even try to keep you. But with my help, you have a chance.",
        choices: [
            { text: "I'll take that chance. Let's find the runes", nextIndex: 10 },
            { text: "What's the immediate danger?", nextIndex: 51 },
            { text: "I need to prepare myself", nextIndex: 25 }
        ]
    },
    
    // --- FÖRSTA RUNEN ---
    // Index 25: Spelaren frågar om första runen
    {
        text: "To reach the first rune, follow the sound of running water until you find an ancient oak. The rune is carved into its bark, but be cautious - the tree has developed a consciousness of its own.",
        choices: [
            { text: "Let's go there now", nextIndex: 52 },
            { text: "How do I interact with a conscious tree?", nextIndex: 53 },
            { text: "What happens when I find the rune?", nextIndex: 54 }
        ]
    },
    
    // --- KLASSER ---
    
    // Warrior class choice
    // Index 26: Spelaren väljer sin klass
    {
        text: "You focus on your warrior's strength. Your muscles tense, and you feel the weight of battles past and future. The forest seems to respond, the whispers growing quieter in respect of your physical prowess.",
        choices: [
            { text: "Ready my weapon and continue", nextIndex: 300 },
            { text: "Ask Elara if she knows of any weapons in the forest", nextIndex: 301 },
            { text: "Demonstrate my strength to intimidate potential threats", nextIndex: 302 }
        ]
    },
    
    // Mage class choice
    // Index 27: Spelaren väljer sin klass
    {
        text: "As you concentrate on your magical heritage, you feel the forest's energy respond to your own. The whispers take on a harmonic quality, and faint luminous patterns become visible in the air around you.",
        choices: [
            { text: "Attune myself to the forest's magical currents", nextIndex: 310 },
            { text: "Ask Elara about the magical properties of this place", nextIndex: 311 },
            { text: "Attempt a small spell to test my abilities here", nextIndex: 312 }
        ]
    },
    
    // Scout class choice
    // Index 28: Spelaren väljer sin klass
    {
        text: "You call upon your scout's instincts, and your senses immediately sharpen. You notice hidden paths between the trees, catch subtle movements in the underbrush, and can distinguish individual notes within the whispers.",
        choices: [
            { text: "Scan the area for the safest path forward", nextIndex: 320 },
            { text: "Ask Elara what creatures I should watch for", nextIndex: 321 },
            { text: "Look for signs of other travelers who passed this way", nextIndex: 322 }
        ]
    },
    
    // --- WARRIOR PATHS ---
    // Index 29: Spelaren väljer sin väg
    {
        text: "You ready your stance, feeling prepared for whatever comes. Elara's voice seems impressed. 'Your confidence is reassuring. The forest respects strength, but be wary - not all challenges here can be overcome with might.'",
        choices: [
            { text: "Let's find the first rune", nextIndex: 303 },
            { text: "Tell me more about the challenges ahead", nextIndex: 304 },
            { text: "Are there other warriors trapped here?", nextIndex: 305 }
        ]
    },

    // Index 30: Spelaren frågar om andra krigare
    {
        text: "Elara hesitates. 'Yes... the forest has claimed many warriors before you. Their weapons sometimes remain. I sense a powerful axe nearby, left by a fallen champion at the stone circle to the east.'",
        choices: [
            { text: "Let's find this axe first", nextIndex: 306 },
            { text: "What happened to this champion?", nextIndex: 307 },
            { text: "I prefer to rely on my own strength", nextIndex: 300 }
        ]
    },
    
    // --- MAGE PATHS ---
    // Index 31: Spelaren väljer sin väg
    {
        text: "As you open yourself to the forest's magic, complex patterns of energy become visible to you. Elara's voice brightens: 'You see it! The forest's magical tapestry. Few can perceive it so clearly.'",
        choices: [
            { text: "Can I use this energy to find the runes?", nextIndex: 313 },
            { text: "Is this magic safe to channel?", nextIndex: 314 },
            { text: "Let's proceed to the first rune", nextIndex: 315 }
        ]
    },
    
    // --- SCOUT PATHS ---
        
    {
        text: "Your trained eyes quickly identify a nearly invisible game trail winding between the gnarled trees. Elara whispers, 'Your perception is remarkable. Even I had not noticed that path.'",
        choices: [
            { text: "Follow the game trail", nextIndex: 323 },
            { text: "Check the trail for traps first", nextIndex: 324 },
            { text: "Ask if this trail leads toward the first rune", nextIndex: 325 }
        ]
    },
    
    // --- VILL FÖRBEREDA SIG ---
    {
        text: "A wise decision. The forest can be unforgiving to the unprepared. What would you like to focus on before we continue?",
        choices: [
            { text: "I need to assess my surroundings more carefully", nextIndex: 400 },
            { text: "I should create some kind of weapon or tool", nextIndex: 401 },
            { text: "I need to understand more about the forest's rules", nextIndex: 402 }
        ]
    },
    
    // --- FLER VÄGAR OCH HÄNDELSER ---
    
    // Många fler dialoger kan läggas till här för att bygga ut berättelsen...
    
    {
        text: "As you approach the ancient oak, you hear it groan. The massive trunk shifts slightly, and what appears to be a face forms in the gnarled bark. 'Who disturbs my slumber?' it rumbles in a voice like grinding wood.",
        choices: [
            { text: "I seek the rune carved into your bark", nextIndex: 450 },
            { text: "I mean no harm, ancient one", nextIndex: 451 },
            { text: "I am helping Elara break the forest's curse", nextIndex: 452 }
        ]
    },
    
    // --- SPECIELLA HÄNDELSER OCH STRIDER ---
    
    {
        text: "A twisted creature emerges from the shadows - part wolf, part shadow, with glowing eyes that seem to pierce your soul. It growls, circling you slowly. 'The forest's hunter,' Elara whispers. 'Be careful!'",
        choices: [
            { text: "Stand my ground and prepare to fight", nextIndex: 500 },
            { text: "Try to communicate with it", nextIndex: 501 },
            { text: "Look for a way to escape", nextIndex: 502 }
        ]
    },
    
    // --- DRAMATISKA AVSLUTNINGAR ---
    
    {
        text: "As you place the final rune in the circle, a blinding light erupts around you. The forest seems to scream as the enchantment begins to break. Elara materializes beside you, becoming more solid by the second.",
        choices: [
            { text: "Take Elara's hand", nextIndex: 600 },
            { text: "Step back and watch", nextIndex: 601 },
            { text: "Interrupt the ritual", nextIndex: 602 }
        ]
    },
    
    // AVSLUTNINGAR: TA ELARAS HAND
    {
        text: "You grasp Elara's hand, feeling it grow warm and solid in yours. The light intensifies, enveloping both of you. With a sudden rush, you feel yourself being pulled through a veil between worlds.",
        choices: [
            { text: "Hold on tight", nextIndex: 610 }
        ]
    },
    {
        text: "The light fades. You find yourself standing at the edge of a normal forest, with Elara beside you - no longer a spirit, but a woman of flesh and blood. 'We're free,' she whispers, tears in her eyes.",
        choices: [
            { text: "Ask where you are", nextIndex: 611 },
            { text: "Suggest you stay together", nextIndex: 612 },
            { text: "Say goodbye and go your separate ways", nextIndex: 613 }
        ]
    },
    {
        text: "Elara explains you've returned to your world, but far from where you entered the Whispering Wilds. 'The world has changed while I was trapped,' she says. 'Will you help me find my place in it?'",
        choices: [
            { text: "Offer to be her guide in this new age", nextIndex: 614 },
            { text: "Suggest she come with you to your home", nextIndex: 615 },
            { text: "Give her some advice but prepare to leave", nextIndex: 613 }
        ]
    },
    {
        text: "You and Elara agree to stay together, at least for a time. With your shared experience of the Whispering Wilds, a bond has formed between you that few would understand. A new adventure begins.",
        choices: [
            { text: "THE END - A NEW BEGINNING", nextIndex: 800 } // Happy ending
        ]
    },
    {
        text: "You say goodbye to Elara, each of you heading in different directions. As you walk away, you feel the forest's magic gradually fade from your senses, but the memories remain. You are changed forever.",
        choices: [
            { text: "THE END - PATHS DIVERGE", nextIndex: 801 } // Bittersweet ending
        ]
    },
    {
        text: "In the years that follow, you and Elara explore the world together. She teaches you ancient magic forgotten by modern society, while you help her adjust to a world that changed without her.",
        choices: [
            { text: "THE END - COMPANIONS IN MAGIC", nextIndex: 802 } // Magical happy ending
        ]
    },
    {
        text: "You welcome Elara into your life and home. Though adjusting to modern life is challenging for her, her perspective and wisdom bring new depth to your existence. Together, you build something extraordinary.",
        choices: [
            { text: "THE END - A SHARED LIFE", nextIndex: 803 } // Romantic ending
        ]
    },
    
    // AVSLUTNINGAR: KLIVA TILLBAKA OCH TITTA
    {
        text: "You step back as the ritual completes. Elara fully materializes, her form becoming solid and real. But as the magic settles, you notice a dark shadow coalescing behind her. The Shadow Mage has broken free too.",
        choices: [
            { text: "Warn Elara", nextIndex: 620 },
            { text: "Attack the shadow", nextIndex: 621 },
            { text: "Run for safety", nextIndex: 622 }
        ]
    },
    {
        text: "'Behind you!' you shout. Elara spins around, raising her hands in a defensive gesture. Energy crackles between her and the shadow as they face off, two ancient powers newly freed.",
        choices: [
            { text: "Join forces with Elara to fight", nextIndex: 623 },
            { text: "Look for a way to escape during the confrontation", nextIndex: 624 }
        ]
    },
    {
        text: "You lunge at the shadow with all your might. It feels like striking cold mist, but your attack disrupts its formation. The Shadow Mage hisses in pain and rage, turning its full attention to you.",
        choices: [
            { text: "Stand your ground", nextIndex: 625 },
            { text: "Call to Elara for help", nextIndex: 626 }
        ]
    },
    
    // AVSLUTNINGAR: AVBRYTA RITUALEN
    {
        text: "You disrupted the ritual! The circle of runes flares with chaotic energy. Elara cries out as her partially materialized form flickers. 'What have you done?' The forest around you begins to collapse inward.",
        choices: [
            { text: "Try to fix the ritual", nextIndex: 640 },
            { text: "Grab Elara and run", nextIndex: 641 },
            { text: "Accept the consequences", nextIndex: 642 }
        ]
    },
    
    // SLUTSKÄRMAR
    {
        text: "THE END - A NEW BEGINNING\n\nYou and Elara begin a new life together, forever bonded by your experiences in the Whispering Wilds. The forest's magic remains within you both, a reminder of the journey that brought you together.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    {
        text: "THE END - PATHS DIVERGE\n\nThough you and Elara part ways, the impact you've had on each other's lives remains. Sometimes, when walking through wooded areas, you feel a familiar presence, as if she's watching over you still.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    {
        text: "THE END - COMPANIONS IN MAGIC\n\nWith Elara's guidance, you master ancient magics long forgotten. Together, you use these powers to help others, becoming legendary figures spoken of with awe and respect around evening fires.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    {
        text: "THE END - A SHARED LIFE\n\nThe bond between you and Elara grows into something deeper. Two souls from different worlds and times, finding in each other something that transcends ordinary understanding. A love story for the ages.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // --- KLASSBASERADE AVSLUTNINGAR ---
    
    // Warrior specific ending
    {
        text: "The warrior's path has prepared you for this final battle. As the Shadow Mage attacks, you meet his darkness with disciplined fury. Each strike dispels another piece of his form until nothing remains.",
        choices: [
            { text: "Check on Elara", nextIndex: 628 },
            { text: "Search the battlefield for anything valuable", nextIndex: 660 }
        ]
    },
    
    // Mage specific ending
    {
        text: "Your magical training allows you to understand the forces at work. You weave a counter-spell, turning the Shadow's own magic against him. The forest shimmers as two magical beings duel for supremacy.",
        choices: [
            { text: "Channel the forest's remaining power", nextIndex: 661 },
            { text: "Create a binding spell to trap the Shadow", nextIndex: 662 }
        ]
    },
    
    // Scout specific ending
    {
        text: "Your scout's instincts reveal the Shadow's weakness. You move with precision, striking at exactly the right moment and place. What strength cannot overcome, cunning dismantles with elegant efficiency.",
        choices: [
            { text: "Fade back into the shadows", nextIndex: 663 },
            { text: "Check on Elara", nextIndex: 628 }
        ]
    },
    
    // Warrior loot ending
    {
        text: "Among the remnants of battle, you find a strange black crystal - all that remains of the Shadow Mage. It pulses with dark power. Elara warns you to leave it, but such a weapon could be useful...",
        choices: [
            { text: "Take the crystal", nextIndex: 664 },
            { text: "Destroy the crystal", nextIndex: 665 }
        ]
    },
    
    // Mage channel power ending
    {
        text: "You channel the wild magic of the dying forest. Power surges through you, painful yet exhilarating. The Shadow screams as your spell tears it apart, but as its last tendril fades, you realize you're changing too.",
        choices: [
            { text: "Try to control the transformation", nextIndex: 666 },
            { text: "Let the magic take its course", nextIndex: 647 }
        ]
    },
    
    // Mage binding ending
    {
        text: "Your binding spell encircles the Shadow, drawing tighter until it's compressed into a small, dark gem. The forest stills as you pick it up. 'A prison,' Elara says with awe. 'You've created a powerful artifact.'",
        choices: [
            { text: "Keep the gem for study", nextIndex: 667 },
            { text: "Ask Elara to help dispose of it safely", nextIndex: 668 }
        ]
    },
    
    // Scout companionship ending
    {
        text: "Your abilities combined with Elara's knowledge make you formidable explorers. Together, you journey to places few have ever seen, documenting wonders and mysteries. You become legends in your own right.",
        choices: [
            { text: "THE END - LEGENDARY EXPLORERS", nextIndex: 812 } // Adventure ending
        ]
    },
    
    // Scout lone wolf ending
    {
        text: "'I understand,' Elara says, though sadness tinges her voice. You part ways at the forest's edge, each with new purpose. Your experiences have made you the perfect shadow walker, moving unseen through the world.",
        choices: [
            { text: "THE END - GHOST IN THE SHADOWS", nextIndex: 813 } // Lone wolf ending
        ]
    },
    
    // --- AVSLUTNINGSSKÄRMAR ---
    
    // Happy ending
    {
        text: "THE END - A NEW BEGINNING\n\nYou and Elara begin a new life together, forever bonded by your experiences in the Whispering Wilds. The forest's magic remains within you both, a reminder of the journey that brought you together.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Bittersweet ending
    {
        text: "THE END - PATHS DIVERGE\n\nThough you and Elara part ways, the impact you've had on each other's lives remains. Sometimes, when walking through wooded areas, you feel a familiar presence, as if she's watching over you still.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Magical companions ending
    {
        text: "THE END - COMPANIONS IN MAGIC\n\nWith Elara's guidance, you master ancient magics long forgotten. Together, you use these powers to help others, becoming legendary figures spoken of with awe and respect around evening fires.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Romantic ending
    {
        text: "THE END - A SHARED LIFE\n\nThe bond between you and Elara grows into something deeper. Two souls from different worlds and times, finding in each other something that transcends ordinary understanding. A love story for the ages.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Escape ending
    {
        text: "THE END - NARROW ESCAPE\n\nThough you escaped the Whispering Wilds, you often wonder about Elara and the Shadow Mage. On stormy nights, you sometimes hear whispers that sound like her voice, fighting still in some distant realm.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Sacrifice ending
    {
        text: "THE END - NOBLE SACRIFICE\n\nYour sacrifice saved Elara and closed the rift between worlds. In our world, Elara tells your story to anyone who will listen. In the Whispering Wilds, the trees themselves whisper your name with reverence.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Transformation ending
    {
        text: "THE END - FOREST GUARDIAN\n\nAs the new guardian of the Whispering Wilds, you reshape the forest into a more benevolent place. Lost travelers find their way home, and those seeking knowledge may receive guidance - if worthy.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Dark ending
    {
        text: "THE END - SHADOW'S CHAMPION\n\nYour warrior's strength combined with the Shadow's power makes you nearly invincible. You carve out your own kingdom, ruling with an iron fist. Some call you tyrant, others protector - all fear your might.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Heroic ending
    {
        text: "THE END - LIGHT'S CHAMPION\n\nYour defeat of the Shadow and refusal of dark power marks you as a true hero. You become a legendary warrior whose tales inspire others to stand against darkness. Your name becomes synonymous with honor.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Mage power ending
    {
        text: "THE END - ARCHMAGE ASCENDANT\n\nYour newfound magical abilities make you one of the most powerful mages in existence. You establish an academy to teach responsible use of magic, ensuring the mistakes of the past are not repeated.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Artifact ending
    {
        text: "THE END - KEEPER OF SECRETS\n\nThe Shadow's gem becomes your greatest tool and heaviest burden. Its whispers teach you forgotten magics, but each spell draws you closer to its influence. A dangerous game you play with confidence.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Wise ending
    {
        text: "THE END - WISDOM OVER POWER\n\nYour choice to destroy the Shadow's power rather than use it speaks to your wisdom. Though you walk away with less tangible power, your soul remains unburdened. Elara says this is the greatest strength of all.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Adventure ending
    {
        text: "THE END - LEGENDARY EXPLORERS\n\nThe chronicles of your adventures with Elara fill many volumes. From the deepest caves to the highest peaks, few places remain untouched by your footsteps. A life of discovery and wonder, shared with a true friend.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // Lone wolf ending
    {
        text: "THE END - GHOST IN THE SHADOWS\n\nYou move through the world unseen, righting wrongs and helping those in need before vanishing again. Rumors spread of a mysterious figure with forest magic. Elara smiles when she hears these tales.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // KLASSBASERADE AVSLUTNINGAR - KRIGARE
    {
        text: "Elara is weak but recovering. 'Your strength saved us both,' she says with newfound respect. As the forest settles, you feel your warrior's instincts sharpen even further - this experience has honed your abilities.",
        choices: [
            { text: "Offer to escort Elara to safety", nextIndex: 612 },
            { text: "Prepare to continue your journey alone", nextIndex: 613 }
        ]
    },
    
    // KLASSBASERADE AVSLUTNINGAR - MAGIKER
    {
        text: "You wrestle with the transformative magic, bending it to your will. When the process completes, you remain yourself, but enhanced - your magical abilities have grown exponentially. Such power comes with responsibility.",
        choices: [
            { text: "THE END - ARCHMAGE ASCENDANT", nextIndex: 809 } // Mage power ending
        ]
    },
    {
        text: "You close your eyes as the magic transforms you. When you open them, you find yourself changed - part human, part forest spirit. You can feel the trees, the wind, the creatures. You have become part of the Whispering Wilds.",
        choices: [
            { text: "THE END - FOREST GUARDIAN", nextIndex: 806 } // Transformation ending
        ]
    },
    
    // KLASSBASERADE AVSLUTNINGAR - SPEJARE
    {
        text: "Your scout's instincts reveal the Shadow's weakness. You move with precision, striking at exactly the right moment and place. What strength cannot overcome, cunning dismantles with elegant efficiency.",
        choices: [
            { text: "Fade back into the shadows", nextIndex: 663 },
            { text: "Check on Elara", nextIndex: 628 }
        ]
    },
    {
        text: "You disappear into the shadows as the battle concludes. When you reemerge, Elara is looking for you. 'For a moment, I thought you'd left,' she says with relief. Your ability to vanish impresses even forest spirits.",
        choices: [
            { text: "Suggest using these skills to explore the world together", nextIndex: 669 },
            { text: "Say your path often requires you to walk alone", nextIndex: 670 }
        ]
    },
    {
        text: "Your abilities combined with Elara's knowledge make you formidable explorers. Together, you journey to places few have ever seen, documenting wonders and mysteries. You become legends in your own right.",
        choices: [
            { text: "THE END - LEGENDARY EXPLORERS", nextIndex: 812 } // Adventure ending
        ]
    },
    {
        text: "'I understand,' Elara says, though sadness tinges her voice. You part ways at the forest's edge, each with new purpose. Your experiences have made you the perfect shadow walker, moving unseen through the world.",
        choices: [
            { text: "THE END - GHOST IN THE SHADOWS", nextIndex: 813 } // Lone wolf ending
        ]
    },
    {
        text: "THE END - LEGENDARY EXPLORERS\n\nThe chronicles of your adventures with Elara fill many volumes. From the deepest caves to the highest peaks, few places remain untouched by your footsteps. A life of discovery and wonder, shared with a true friend.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    {
        text: "THE END - GHOST IN THE SHADOWS\n\nYou move through the world unseen, righting wrongs and helping those in need before vanishing again. Rumors spread of a mysterious figure with forest magic. Elara smiles when she hears these tales.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    {
        text: "THE END - ARCHMAGE ASCENDANT\n\nYour newfound magical abilities make you one of the most powerful mages in existence. You establish an academy to teach responsible use of magic, ensuring the mistakes of the past are not repeated.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    {
        text: "THE END - FOREST GUARDIAN\n\nAs the new guardian of the Whispering Wilds, you reshape the forest into a more benevolent place. Lost travelers find their way home, and those seeking knowledge may receive guidance - if worthy.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // YTTERLIGARE ÄVENTYRSBRANCHER (kan kopplas in från andra delar av berättelsen)
    {
        text: "You turn and run, but the Shadow Mage extends tendrils of darkness that wrap around your ankles. 'Leaving so soon?' it whispers in a voice like dying stars. 'After setting us free?'",
        choices: [
            { text: "Struggle to break free", nextIndex: 627 },
            { text: "Call to Elara for help", nextIndex: 626 }
        ]
    },
    {
        text: "Together with Elara, you face the Shadow Mage. Your courage combined with her ancient power makes for a formidable alliance. The battle is fierce but brief - the Shadow dissipates, banished to some distant realm.",
        choices: [
            { text: "Check if Elara is okay", nextIndex: 628 }
        ]
    },
    {
        text: "As you struggle against the tendrils, they tighten painfully. Darkness begins to seep into your skin, cold and invasive. The Shadow's laughter echoes in your mind as your vision starts to fade.",
        choices: [
            { text: "Make one final desperate effort", nextIndex: 671 },
            { text: "Accept your fate", nextIndex: 672 }
        ]
    },
    {
        text: "You look for escape as Elara and the Shadow clash. Their battle tears holes in reality itself, creating rifts between worlds. You dive through one such rift, tumbling through strange dimensions before landing back in your world.",
        choices: [
            { text: "THE END - NARROW ESCAPE", nextIndex: 804 } // Escape ending
        ]
    },
    {
        text: "THE END - NARROW ESCAPE\n\nThough you escaped the Whispering Wilds, you often wonder about Elara and the Shadow Mage. On stormy nights, you sometimes hear whispers that sound like her voice, fighting still in some distant realm.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    // MÖRKA OCH DRAMATISKA SLUT
    {
        text: "You make one last desperate effort, channeling every ounce of strength into breaking free. For a moment, the darkness wavers - then surges back stronger. The Shadow envelops you completely, your consciousness merging with its ancient malice.",
        choices: [
            { text: "THE END - SHADOW'S VESSEL", nextIndex: 814 } // Possession ending
        ]
    },
    {
        text: "As the darkness consumes you, you cease fighting. A strange calm washes over you as your identity dissolves. You become one with the Shadow, neither fully it nor fully yourself. A new entity emerges from this union.",
        choices: [
            { text: "THE END - THE TWILIGHT BEING", nextIndex: 815 } // Merger ending
        ]
    },
    {
        text: "You push Elara through the rift, ensuring her freedom. As it begins to close, you hear her cry your name. You turn back to face the collapsing forest and the approaching Shadow. 'Let's finish this,' you say.",
        choices: [
            { text: "THE END - NOBLE SACRIFICE", nextIndex: 805 } // Sacrifice ending
        ]
    },
    {
        text: "THE END - SHADOW'S VESSEL\n\nThe Shadow wears your body like a glove, walking among humans undetected. Yet deep within, a spark of your consciousness remains, waiting. Sometimes, in quiet moments, the Shadow feels you fighting back.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    {
        text: "THE END - THE TWILIGHT BEING\n\nNeither light nor dark, you exist in the spaces between. Other entities of power sense your uniqueness and seek your counsel. You become a mediator between realms, belonging fully to none.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    {
        text: "THE END - NOBLE SACRIFICE\n\nYour sacrifice saved Elara and closed the rift between worlds. In our world, she tells your story to any who will listen. In the Whispering Wilds, the trees themselves whisper your name with reverence.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    
    // ARTEFAKTSLUT OCH KUNSKAPSVÄGAR
    {
        text: "The gem containing the Shadow becomes your most valuable possession. With it, you can study magic that hasn't been seen for centuries. Elara warns of its dangers, but you're confident in your ability to control it.",
        choices: [
            { text: "THE END - KEEPER OF SECRETS", nextIndex: 810 } // Artifact ending
        ]
    },
    {
        text: "Together with Elara, you perform a ritual to safely dissolve the gem's power. It's a bittersweet moment - so much knowledge lost, but the Shadow's threat ended forever. The forest feels lighter afterward.",
        choices: [
            { text: "THE END - WISDOM OVER POWER", nextIndex: 811 } // Wise ending
        ]
    },
    {
        text: "THE END - KEEPER OF SECRETS\n\nThe gem becomes your greatest tool and heaviest burden. Its whispers teach you forgotten magics, but each spell draws you closer to its influence. You walk a dangerous path with confidence.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    {
        text: "THE END - WISDOM OVER POWER\n\nYour choice to destroy the Shadow's power rather than use it speaks to your wisdom. Though you walk away with less tangible power, your soul remains unburdened. Elara says this is the greatest strength of all.",
        choices: [
            { text: "Start a New Game", nextIndex: 0 }
        ]
    },
    // Index 174: Travelers in the forest
    {
        text: "I know several other travelers have passed through here in recent weeks. The forest has been... active. More so than usual. Something is changing, but I'm not sure what.",
        choices: [
            { text: "What do you mean by 'active'?", nextIndex: 380 },
            { text: "Have you spoken to these travelers?", nextIndex: 381 },
            { text: "Let's stay focused on finding the runes", nextIndex: 352 }
        ]
    },
    // --- AREA: THE SINGING RAVINE ---
    // Index 175: First encounter with the Singing Ravine
    {
        text: "You arrive at the edge of a deep ravine. The air here vibrates with strange harmonies, as if the wind itself carries voices. Looking down, you see a misty river winding through stone formations.",
        choices: [
            { text: "Is the rune down there somewhere?", nextIndex: 177 },
            { text: "What causes these sounds?", nextIndex: 176 },
            { text: "Look for a safe way down", nextIndex: 178 }
        ]
    },
    // Index 176: Understanding the ravine's magic
    {
        text: "Elara's voice seems clearer here. 'The ravine channels magical currents like a flute does with breath. The stones are porous in a special way - they resonate with the forest's energy.'",
        choices: [
            { text: "Is it dangerous?", nextIndex: 179 },
            { text: "Does this have anything to do with the rune?", nextIndex: 177 },
            { text: "Let's find a way down", nextIndex: 178 }
        ]
    },
    // Index 177: Discovery of the Sound Rune's location
    {
        text: "'Yes, the Sound Rune is embedded in stone at the bottom of the ravine. But be careful - the harmonies here can put the unwary into a trance. Some have stood listening until they faded away.'",
        choices: [
            { text: "How do I protect myself from the sound?", nextIndex: 180 },
            { text: "Are there other dangers I should know about?", nextIndex: 181 },
            { text: "I'll be careful. Let's go", nextIndex: 178 }
        ]
    },
    // Index 178: Beginning the descent
    {
        text: "You find a narrow path zigzagging down the ravine wall. As you descend, the harmonies become stronger, more complex. The mist below swirls in patterns that seem to match the sounds.",
        choices: [
            { text: "Continue forward, stay alert", nextIndex: 182 },
            { text: "Stop and listen more carefully to the sounds", nextIndex: 183 },
            { text: "Check if there are any creatures nearby", nextIndex: 184 }
        ]
    },
    // Index 179: Warning about the ravine's dangers
    {
        text: "'Yes, it can be dangerous. The sounds can enchant the mind, confuse your senses. You may lose your perception of time and place. But with focus and will, you can resist their pull.'",
        choices: [
            { text: "How do I protect myself from the sound?", nextIndex: 180 },
            { text: "Are there other dangers I should know about?", nextIndex: 181 },
            { text: "I'll be careful. Let's go", nextIndex: 178 }
        ]
    },
    // Index 180: Learning protection against the ravine's magic
    {
        text: "'Focus on your goal. Imagine a barrier around your mind. And if you notice yourself becoming caught in the sounds, mention my name - it will help you break the enchantment.'",
        choices: [
            { text: "Has something similar happened to you?", nextIndex: 185 },
            { text: "Let's continue down to the ravine", nextIndex: 178 },
            { text: "Are there other dangers?", nextIndex: 181 }
        ]
    },
    // Index 181: Meeting the ravine's inhabitants
    {
        text: "'There are beings drawn to the sounds - creations of light and shadow that dance among the echoes. They are usually not hostile, but they can be frightened by sudden movements or loud noises.'",
        choices: [
            { text: "How do I interact with these beings?", nextIndex: 186 },
            { text: "Let's go down to the ravine now", nextIndex: 178 },
            { text: "Tell me more about how to protect myself", nextIndex: 180 }
        ]
    },
    // Index 182: Careful progression through the ravine
    {
        text: "You continue down the narrow path, each step carefully placed. The harmonies become deeper, more captivating, but you keep your mind focused on the mission. The mist thickens around you.",
        choices: [
            { text: "Continue towards the bottom of the ravine", nextIndex: 187 },
            { text: "Stop and feel for magical energies", nextIndex: 188 },
            { text: "Keep an eye out for signs of life", nextIndex: 189 }
        ]
    },
    // Index 183: Experiencing the ravine's enchantment
    {
        text: "You stop and focus on the sounds. Gradually, you begin to discern patterns - it's almost like a language. You feel drawn deeper into the sound. Everything else begins to fade away... 'Say my name!' Elara's voice echoes in your head.",
        choices: [
            { text: "Elara!", nextIndex: 190 },
            { text: "Fight to break the enchantment yourself", nextIndex: 191 },
            { text: "Let yourself delve into the sound a while longer", nextIndex: 192 }
        ]
    },
    // Index 184: Encountering the mist beings
    {
        text: "You search the mist and notice faint, glowing forms dancing among the stone formations. They resemble human silhouettes made of mist streaks and light, their movements synchronized with the ravine's music.",
        choices: [
            { text: "Try to communicate with them", nextIndex: 193 },
            { text: "Avoid them and continue down the path", nextIndex: 182 },
            { text: "Ask Elara about these creatures", nextIndex: 194 }
        ]
    },
    // Index 185: Elara's personal history with the ravine
    {
        text: "'Yes... when I was first captured, I lost myself in the songs. I don't know how long - years perhaps. Eventually my consciousness merged with the ravine, and I learned to understand its patterns.'",
        choices: [
            { text: "Is that why you understand the forest so well?", nextIndex: 195 },
            { text: "It sounds terrible to be trapped for so long", nextIndex: 196 },
            { text: "We should continue", nextIndex: 178 }
        ]
    },
    // Index 186: Learning to interact with the ravine's beings
    {
        text: "'Approach slowly. Let your presence be felt but don't be intrusive. They might lead you to the rune if they feel goodwill. They have lived with its energy for centuries.'",
        choices: [
            { text: "I'll try that when we get down there", nextIndex: 178 },
            { text: "Are they part of the forest's enchantment?", nextIndex: 197 },
            { text: "Has anyone else spoken with them?", nextIndex: 198 }
        ]
    },
    // Index 187: Reaching the ravine's bottom
    {
        text: "You reach the bottom of the ravine where the mist is thickest. The sound surrounds you now, coming from all directions. Through the mist, you can glimpse a circle of stone pillars, and in the center, a flat stone glowing with a faint blue light.",
        choices: [
            { text: "Go towards the stone circle", nextIndex: 199 },
            { text: "Stay and observe the situation", nextIndex: 200 },
            { text: "Ask Elara about the stone circle", nextIndex: 201 }
        ]
    },
    // Index 199: Finding the Sound Rune
    {
        text: "You approach the stone circle carefully. The sound intensifies, but you keep your mind focused. On the flat stone in the center, you see a symbol engraved - a wave curling in an eternal circle. The rune.",
        choices: [
            { text: "Touch the rune", nextIndex: 210 },
            { text: "Study the rune from a distance first", nextIndex: 211 },
            { text: "Check for traps", nextIndex: 212 }
        ]
    },
    // Index 210: The Sound Rune awakens
    {
        text: "As your fingers touch the rune, it pulses with intense blue light. A wave of sound energy spreads outward, the mist patterns freeze for a moment. The rune lifts from the stone and floats before you.",
        choices: [
            { text: "Take the rune", nextIndex: 220 },
            { text: "Ask Elara what is happening", nextIndex: 221 }
        ]
    },
    // Index 220: Completing the ravine sequence
    {
        text: "You take the rune, feeling it vibrate but light in your hand. As you place it in your bag, the mist begins to clear. 'You did it!' Elara says. 'The first of seven runes. Let's continue our journey.'",
        choices: [
            { text: "Ask about the next rune", nextIndex: 52 },
            { text: "Take a short rest before continuing", nextIndex: 25 },
            { text: "How will these runes be used?", nextIndex: 54 }
        ]
    }
]
