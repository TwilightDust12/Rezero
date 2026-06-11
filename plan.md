# Re:Zero Portal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a highly interactive, modern, and eye-friendly Re:Zero Single-Page Portal showcasing characters, a text-adventure Death simulator, and a chat interface with Echidna, styled with a soft-dark glassmorphism palette using React and Tailwind CSS v4.

**Architecture:** The application is built as a single-page React app. Global state manages the user's "Loop Count" (for Return by Death checkpoints) and the "Greed Contract Mode" (which applies a black-and-gold aesthetic override). The UI is split into logical modular components: Hero section, Character selector and profile panel, RbdSimulator console, and Echidna Tea Party dialogue drawer.

**Tech Stack:** React 19, Vite, Tailwind CSS v4, Google Fonts (Cinzel, Outfit, Fira Code).

---

### Task 1: Project Setup & Tailwind CSS v4 Configuration

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Modify: `index.html`

- [ ] **Step 1: Install Tailwind CSS v4 packages**
  Run: `npm install tailwindcss @tailwindcss/vite` in `/mnt/GamesAndStuff/Re:Zero Website`
  Expected: Installation finishes successfully and packages are added to `package.json`.

- [ ] **Step 2: Configure Vite plugin for Tailwind v4**
  Replace contents of `vite.config.js` with:
  ```javascript
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from '@tailwindcss/vite'

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [
      react(),
      tailwindcss(),
    ],
  })
  ```

- [ ] **Step 3: Setup Google Fonts in `index.html`**
  Modify `/mnt/GamesAndStuff/Re:Zero Website/index.html` to include Cinzel, Outfit, and Fira Code fonts:
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Re:Zero - Starting Life in Another World</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Fira+Code:wght@300..700&family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    </head>
    <body class="bg-[#121017] text-[#e2e8f0] overflow-x-hidden font-sans">
      <div id="root"></div>
      <script type="module" src="/src/main.jsx"></script>
    </body>
  </html>
  ```

---

### Task 2: Setup Data Models

**Files:**
- Create: `src/data/characters.js`
- Create: `src/data/story.js`

- [ ] **Step 1: Create character data file**
  Create `src/data/characters.js` with profile text, trust levels, signature colors, abilities, and quotes:
  ```javascript
  export const characters = [
    {
      id: "subaru",
      name: "Subaru Natsuki",
      title: "The Self-Proclaimed Knight",
      color: "#a78bfa", // Soft violet
      accentClass: "border-violet-400/30 text-violet-300",
      avatar: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&auto=format&fit=crop&q=80",
      description: "A modern-world shut-in suddenly summoned to Lugnica. Possesses no martial might, but holds the terrifying curse 'Return by Death', allowing him to loop back in time upon dying.",
      affectionLabel: "Sanity level",
      affection: 45,
      abilities: ["Return by Death", "Invisible Providence", "Shamak"],
      quotes: [
        "I'm Subaru Natsuki! Not only am I clueless, I'm broke as well!",
        "Even if you forget me, I'll never forget you. I will save you, no matter what!",
        "If I have to die to save you, I'll die a thousand times."
      ]
    },
    {
      id: "emilia",
      name: "Emilia",
      title: "The Half-Elf Candidate",
      color: "#e2e8f0", // Silver-white
      accentClass: "border-slate-300/30 text-slate-200",
      avatar: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&auto=format&fit=crop&q=80",
      description: "A gentle half-elf spirit-arts user candidate for the Royal Selection. Feared due to her resemblance to the Witch of Envy, but possesses a heart of gold.",
      affectionLabel: "Affection",
      affection: 85,
      abilities: ["Spirit Arts (Puck)", "Ice Brand Arts", "Huma"],
      quotes: [
        "I only have one name. I am Emilia. Just Emilia.",
        "Thank you, Subaru. For saving me, and for being by my side.",
        "I want to make a world where everyone is treated equally, regardless of birth."
      ]
    },
    {
      id: "rem",
      name: "Rem",
      title: "The Devoted Demon Maid",
      color: "#60a5fa", // Soft blue
      accentClass: "border-blue-400/30 text-blue-300",
      avatar: "https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=150&auto=format&fit=crop&q=80",
      description: "A demon maid serving at the Roswaal Mansion. Initially distrusting of Subaru due to the Witch's scent, she becomes fiercely loyal and devoted after he saves her.",
      affectionLabel: "Devotion",
      affection: 100,
      abilities: ["Water Magic (El Huma)", "Demon Horn Form", "Almighty Flail"],
      quotes: [
        "When you said you hate yourself, it made me want to tell you all the wonderful things I know about you.",
        "Let us start from here. From step one... No, from zero!",
        "Rem is happiest when she is with Subaru-kun."
      ]
    },
    {
      id: "ram",
      name: "Ram",
      title: "The Proud Wind Sister",
      color: "#f87171", // Soft pink
      accentClass: "border-red-400/30 text-red-300",
      avatar: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=150&auto=format&fit=crop&q=80",
      description: "Rem's elder twin sister. Though she lost her demon horn in childhood, she retains powerful wind magic and handles mansion affairs with a sharp tongue and quiet pride.",
      affectionLabel: "Respect",
      affection: 55,
      abilities: ["Wind Magic (Fura)", "Clairvoyance", "Sharp Tongue"],
      quotes: [
        "Barusu, you really are hopeless.",
        "Ram is different from Rem. Ram is much less forgiving.",
        "The horn may be gone, but the spirit of the demon tribe is not so easily broken."
      ]
    },
    {
      id: "beatrice",
      name: "Beatrice",
      title: "Librarian of the Forbidden Library",
      color: "#fbbf24", // Muted gold
      accentClass: "border-amber-400/30 text-amber-300",
      avatar: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&auto=format&fit=crop&q=80",
      description: "An artificial spirit created by Echidna, she guarded the Forbidden Library for 400 years in isolation, waiting for 'That Person' before Subaru broke her contract.",
      affectionLabel: "Trust",
      affection: 90,
      abilities: ["Yin Magic (Minya)", "Mana Drain", "Library Crossing"],
      quotes: [
        "I suppose you think you can just wander in here as you please, in fact.",
        "Hold Beatrice's hand, Subaru. Don't let go.",
        "Four hundred years is a very long time to wait... I suppose."
      ]
    },
    {
      id: "echidna",
      name: "Echidna",
      title: "The Witch of Greed",
      color: "#94a3b8", // Pale grey
      accentClass: "border-slate-400/30 text-slate-300",
      avatar: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=150&auto=format&fit=crop&q=80",
      description: "The Witch of Greed, possessing an insatiable thirst for knowledge. She invites Subaru to her mental 'Tea Party' in the Sanctuary to observe his Return by Death.",
      affectionLabel: "Curiosity",
      affection: 95,
      abilities: ["Al Shamak", "Insatiable Intellect", "Witch's Tea Party"],
      quotes: [
        "My name is Echidna. Won't you sit down and join me for tea?",
        "I want to know everything. The future, the past, the choices you make... show me all of it.",
        "A contract with me means you will never have to walk this painful path alone."
      ]
    }
  ];
  ```

- [ ] **Step 2: Create text-adventure story nodes**
  Create `src/data/story.js` with story choices, checkpoints, and death flags:
  ```javascript
  export const storyNodes = {
    start: {
      id: "start",
      text: "You awaken in a dark alleyway in the capital city of Lugnica. Three thugs block your exit. You have no money and no magic. What do you do?",
      checkpoint: true,
      options: [
        { text: "Fight back bravely!", nextNode: "fight_thugs" },
        { text: "Call for help at the top of your lungs!", nextNode: "call_help" }
      ]
    },
    fight_thugs: {
      id: "fight_thugs",
      text: "You swing your fists, but you are quickly overwhelmed. One of the thugs draws a knife...",
      options: [
        { text: "Accept your fate...", nextNode: "death_alley" }
      ]
    },
    death_alley: {
      id: "death_alley",
      text: "The knife pierces your chest. The alley fades to black as the Witch's shadow envelops you. Your life ends here.",
      isDeath: true,
      resetNode: "start"
    },
    call_help: {
      id: "call_help",
      text: "A red-haired girl named Felt runs past, chased by a silver-haired girl named Emilia. Hearing your screams, Emilia stops and uses her spirit magic to scare off the thugs.",
      checkpoint: true,
      options: [
        { text: "Thank her and offer to help find her stolen insignia", nextNode: "help_emilia" },
        { text: "Tell her you're busy and walk away", nextNode: "walk_away" }
      ]
    },
    walk_away: {
      id: "walk_away",
      text: "You wander into the slums alone at night. Out of the darkness, a woman with a chilling smile approaches and slices your stomach open before you can react.",
      isDeath: true,
      resetNode: "call_help"
    },
    help_emilia: {
      id: "help_emilia",
      text: "You and Emilia track the stolen insignia to a loot house in the slums. You open the door. Inside, you find a giant giant-man named Rom and Felt. Suddenly, the temperature drops. Elsa Granhiert, the Bowel Hunter, appears behind you.",
      checkpoint: true,
      options: [
        { text: "Stand in front of Emilia and try to block Elsa's blades!", nextNode: "block_elsa" },
        { text: "Grab Emilia and dive out of the window!", nextNode: "dive_window" }
      ]
    },
    block_elsa: {
      id: "block_elsa",
      text: "You rush forward, but Elsa is inhumanly fast. She sidesteps you and slices your stomach open. You collapse onto the floor, bleeding out as you watch Emilia suffer the same fate.",
      isDeath: true,
      resetNode: "help_emilia"
    },
    dive_window: {
      id: "dive_window",
      text: "You crash through the glass window into the canal below, carrying Emilia to safety. Behind you, Reinhard van Astrea rushes into the loot house and subdues Elsa. You have survived the first loop!",
      options: [
        { text: "Celebrate your survival! (Reset Loop to start another attempt)", nextNode: "start" }
      ]
    }
  };
  ```

---

### Task 3: Theme Styling and Core Animations Setup

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Write Custom Tailwind v4 stylesheet**
  Open `src/index.css` and configure Tailwind CSS v4 directives, custom theme properties, animations, and typography:
  ```css
  @import "tailwindcss";

  @theme {
    --color-bg-main: #121017;
    --color-bg-card: rgba(22, 19, 30, 0.75);
    --color-bg-terminal: #09070c;
    
    --color-accent-lavender: #b298ec;
    --color-accent-lavender-glow: rgba(178, 152, 236, 0.15);
    --color-accent-crimson: #c7607a;
    --color-accent-crimson-glow: rgba(199, 96, 122, 0.2);
    
    --color-text-primary: #e2e8f0;
    --color-text-secondary: #9c95a6;

    --font-serif: "Cinzel", serif;
    --font-sans: "Outfit", sans-serif;
    --font-mono: "Fira Code", monospace;
  }

  /* Glitch Text Animation */
  @keyframes textGlitch {
    0% {
      text-shadow: 1px 1px 0 rgba(178, 152, 236, 0.5), -1px -1px 0 rgba(199, 96, 122, 0.5);
    }
    20% {
      text-shadow: -2px 1px 0 rgba(178, 152, 236, 0.5), 1px -2px 0 rgba(199, 96, 122, 0.5);
    }
    40% {
      text-shadow: 1px -1px 0 rgba(178, 152, 236, 0.5), -2px 2px 0 rgba(199, 96, 122, 0.5);
    }
    60% {
      text-shadow: -1px 2px 0 rgba(178, 152, 236, 0.5), 2px -1px 0 rgba(199, 96, 122, 0.5);
    }
    80% {
      text-shadow: 2px 1px 0 rgba(178, 152, 236, 0.5), -1px 1px 0 rgba(199, 96, 122, 0.5);
    }
    100% {
      text-shadow: 1px 1px 0 rgba(178, 152, 236, 0.5), -1px -1px 0 rgba(199, 96, 122, 0.5);
    }
  }

  .glitch-text:hover {
    animation: textGlitch 0.15s infinite;
  }

  /* Shadow Hands Floating Drift */
  @keyframes shadowDrift {
    0% {
      transform: translateY(0) scale(1) rotate(0deg);
      opacity: 0.15;
    }
    50% {
      transform: translateY(-15px) scale(1.05) rotate(3deg);
      opacity: 0.25;
    }
    100% {
      transform: translateY(0) scale(1) rotate(0deg);
      opacity: 0.15;
    }
  }

  .shadow-hand {
    animation: shadowDrift 8s ease-in-out infinite;
  }

  /* CRT Screen Effect */
  .crt::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: linear-gradient(rgba(18, 16, 23, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    z-index: 20;
    background-size: 100% 4px, 3px 100%;
    pointer-events: none;
  }

  /* Glitch Screen Shake during Death Reset */
  @keyframes screenShake {
    0% { transform: translate(0, 0) rotate(0deg); }
    10% { transform: translate(-3px, 2px) rotate(-1deg); }
    20% { transform: translate(3px, -2px) rotate(1deg); }
    30% { transform: translate(-1px, -1px) rotate(0deg); }
    40% { transform: translate(2px, 2px) rotate(1deg); }
    50% { transform: translate(-2px, -3px) rotate(-1deg); }
    60% { transform: translate(1px, 2px) rotate(0deg); }
    70% { transform: translate(-3px, 1px) rotate(-1deg); }
    80% { transform: translate(2px, -1px) rotate(1deg); }
    90% { transform: translate(-1px, 2px) rotate(0deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }

  .death-glitch-active {
    animation: screenShake 0.4s infinite;
  }

  /* Scrollbar Customization */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #121017;
  }
  ::-webkit-scrollbar-thumb {
    background: #231f2d;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #b298ec;
  }
  ```

---

### Task 4: Hero Component Implementation

**Files:**
- Create: `src/components/Hero.jsx`

- [ ] **Step 1: Write Hero component**
  Create `src/components/Hero.jsx` with titles, subtitle checkpoints, loops, and animated floating mist:
  ```jsx
  import React from 'react';

  export default function Hero({ loopCount }) {
    return (
      <header className="relative w-full py-12 flex flex-col items-center justify-center border-b border-white/5 overflow-hidden">
        {/* Floating Shadow Hands Background Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <svg className="absolute -top-10 -left-10 w-96 h-96 opacity-10 shadow-hand text-accent-crimson" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0C22.4 0 0 22.4 0 50C0 60.5 3.2 70.3 8.8 78.4L20.5 63.8C18.1 59.8 16.7 55.1 16.7 50C16.7 31.6 31.6 16.7 50 16.7C68.4 16.7 83.3 31.6 83.3 50C83.3 57.5 80.8 64.4 76.7 70L86.8 81.3C95 72.8 100 61.4 100 50C100 22.4 77.6 0 50 0Z" />
          </svg>
          <svg className="absolute -bottom-10 -right-10 w-[500px] h-[500px] opacity-10 shadow-hand text-accent-lavender" style={{ animationDelay: '2s' }} viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0C22.4 0 0 22.4 0 50C0 60.5 3.2 70.3 8.8 78.4L20.5 63.8C18.1 59.8 16.7 55.1 16.7 50C16.7 31.6 31.6 16.7 50 16.7C68.4 16.7 83.3 31.6 83.3 50C83.3 57.5 80.8 64.4 76.7 70L86.8 81.3C95 72.8 100 61.4 100 50C100 22.4 77.6 0 50 0Z" />
          </svg>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-extrabold tracking-wider text-text-primary mb-2 select-none cursor-default glitch-text transition-all duration-300">
            RE:ZERO
          </h1>
          <p className="text-text-secondary tracking-widest text-xs md:text-sm uppercase font-mono max-w-lg mx-auto">
            Starting Life in Another World — Portal
          </p>

          <div className="mt-6 inline-flex items-center gap-3 px-4 py-1.5 bg-black/40 border border-white/5 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-accent-crimson animate-pulse" />
            <span className="font-mono text-xs text-text-secondary uppercase">
              Current Loop Checkpoint: <strong className="text-accent-crimson font-bold">#{String(loopCount).padStart(2, '0')}</strong>
            </span>
          </div>
        </div>
      </header>
    );
  }
  ```

---

### Task 5: Character Portal Component Implementation

**Files:**
- Create: `src/components/CharacterPortal.jsx`

- [x] **Step 1: Write CharacterPortal component**
  Create `src/components/CharacterPortal.jsx` with character selection grid, detailed card info panel, and dynamic typewriter quotes player:
  ```jsx
  import React, { useState, useEffect } from 'react';
  import { characters } from '../data/characters';

  export default function CharacterPortal() {
    const [selectedId, setSelectedId] = useState('subaru');
    const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
    const [typewrittenText, setTypewrittenText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const character = characters.find(c => c.id === selectedId) || characters[0];

    // Reset quote index on character change
    useEffect(() => {
      setActiveQuoteIdx(0);
    }, [selectedId]);

    // Typewriter effect for selected quote
    useEffect(() => {
      const fullText = character.quotes[activeQuoteIdx] || '';
      setTypewrittenText('');
      setIsTyping(true);
      
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setTypewrittenText(prev => prev + fullText.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 35);

      return () => clearInterval(interval);
    }, [selectedId, activeQuoteIdx]);

    return (
      <section className="w-full max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: Character Grid Selection (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="font-serif text-xl text-text-primary tracking-wide border-l-2 border-accent-lavender pl-3">
            Select Character
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {characters.map(c => {
              const isActive = c.id === selectedId;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  style={{ borderColor: isActive ? c.color : 'rgba(255,255,255,0.05)' }}
                  className={`relative p-4 rounded-lg bg-bg-card border backdrop-blur-md text-left transition-all duration-300 hover:scale-[1.02] flex flex-col gap-2 group cursor-pointer ${
                    isActive ? 'shadow-[0_0_15px_rgba(178,152,236,0.15)] bg-white/[0.03]' : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={c.avatar} 
                      alt={c.name} 
                      className="w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div>
                      <h3 className="font-medium text-sm text-text-primary truncate">{c.name}</h3>
                      <span className="text-[10px] text-text-secondary truncate block">{c.title}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Profile Panel (3 cols) */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="flex-1 p-6 md:p-8 rounded-lg bg-bg-card border border-white/5 backdrop-blur-md shadow-lg flex flex-col gap-6 relative overflow-hidden">
            {/* Ambient Background Character Color Light */}
            <div 
              style={{ background: `radial-gradient(circle, ${character.color}15 0%, transparent 70%)` }}
              className="absolute -top-20 -right-20 w-80 h-80 pointer-events-none rounded-full blur-3xl"
            />
            
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border ${character.accentClass}`}>
                  {character.title}
                </span>
                <h3 className="font-serif text-3xl text-text-primary mt-2">{character.name}</h3>
              </div>
              
              {/* Trust bar */}
              <div className="w-full md:w-48 bg-black/40 p-3 rounded-lg border border-white/5">
                <div className="flex justify-between text-[10px] font-mono text-text-secondary mb-1">
                  <span>{character.affectionLabel}</span>
                  <span>{character.affection}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${character.affection}%`, backgroundColor: character.color }}
                    className="h-full rounded-full transition-all duration-1000"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-text-secondary text-sm leading-relaxed">
              {character.description}
            </p>

            {/* Abilities */}
            <div>
              <h4 className="text-xs font-mono text-text-primary uppercase tracking-wider mb-2">Signature Abilities</h4>
              <div className="flex flex-wrap gap-2">
                {character.abilities.map(ab => (
                  <span 
                    key={ab} 
                    className="text-xs px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-md text-text-secondary font-mono"
                  >
                    {ab}
                  </span>
                ))}
              </div>
            </div>

            {/* Typewritten Quote Player */}
            <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
              <div className="bg-bg-terminal border border-white/5 rounded-lg p-4 font-mono text-xs min-height-[64px] flex items-center relative">
                <span className="text-accent-lavender mr-2 self-start select-none">&gt;</span>
                <p className="text-text-primary italic leading-relaxed">
                  {typewrittenText}
                  {isTyping && <span className="w-1.5 h-3.5 bg-accent-lavender inline-block ml-1 animate-pulse" />}
                </p>
              </div>

              {/* Selector Buttons for Quotes */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-text-secondary">
                  Quote {activeQuoteIdx + 1} of {character.quotes.length}
                </span>
                <div className="flex gap-2">
                  {character.quotes.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveQuoteIdx(idx)}
                      style={{ 
                        backgroundColor: activeQuoteIdx === idx ? character.color : 'transparent',
                        borderColor: character.color
                      }}
                      className={`w-6 h-6 rounded-full border text-[10px] font-mono flex items-center justify-center transition-all cursor-pointer ${
                        activeQuoteIdx === idx ? 'text-black font-bold' : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>
    );
  }
  ```

---

### Task 6: Return by Death Simulator Component

**Files:**
- Create: `src/components/RbdSimulator.jsx`

- [ ] **Step 1: Write RbdSimulator component**
  Create `src/components/RbdSimulator.jsx` with CRT scanline overlays, glitch sound triggers, reset/rewind timers, and checkpoint tracking:
  ```jsx
  import React, { useState } from 'react';
  import { storyNodes } from '../data/story';

  export default function RbdSimulator({ onDeath }) {
    const [currentNodeId, setCurrentNodeId] = useState('start');
    const [checkpointNodeId, setCheckpointNodeId] = useState('start');
    const [glitchActive, setGlitchActive] = useState(false);

    const currentNode = storyNodes[currentNodeId];

    const handleChoice = (option) => {
      const nextNode = storyNodes[option.nextNode];
      
      if (nextNode.checkpoint) {
        setCheckpointNodeId(option.nextNode);
      }

      if (nextNode.isDeath) {
        // Trigger Return by Death Glitch sequence
        setGlitchActive(true);
        onDeath(); // Increment loop counter globally
        
        setTimeout(() => {
          setGlitchActive(false);
          setCurrentNodeId(nextNode.resetNode || checkpointNodeId);
        }, 1200);
      } else {
        setCurrentNodeId(option.nextNode);
      }
    };

    return (
      <section className="w-full max-w-6xl mx-auto px-4 py-8 relative">
        {/* CRT glitch overlay during death */}
        {glitchActive && (
          <div className="fixed inset-0 bg-red-950/90 z-50 flex flex-col items-center justify-center crt death-glitch-active pointer-events-none">
            <h2 className="font-serif text-5xl md:text-7xl text-red-500 font-extrabold tracking-widest text-center animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]">
              RETURN BY DEATH
            </h2>
            <p className="font-mono text-red-400 text-xs md:text-sm uppercase tracking-widest mt-4">
              -- Rewinding to last checkpoint --
            </p>
          </div>
        )}

        <div className="p-6 md:p-8 rounded-lg bg-bg-card border border-white/5 backdrop-blur-md shadow-lg flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="font-serif text-xl text-text-primary tracking-wide border-l-2 border-accent-crimson pl-3">
              Return by Death Simulator
            </h2>
            <div className="flex items-center gap-2 px-2.5 py-1 bg-accent-crimson-glow border border-accent-crimson/20 rounded-md font-mono text-[10px] text-accent-crimson">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-crimson animate-ping" />
              SYSTEM OVERVIEW ACTIVE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Terminal Panel (3 cols) */}
            <div className="md:col-span-3 flex flex-col gap-4">
              <div className="bg-bg-terminal border border-white/5 rounded-lg p-5 font-mono text-xs leading-relaxed min-h-[160px] flex flex-col justify-between crt relative overflow-hidden">
                <div className="text-text-primary">
                  <span className="text-accent-crimson mr-2">&gt;&gt;</span>
                  {currentNode.text}
                </div>
                
                {currentNode.isDeath && (
                  <div className="text-accent-crimson font-bold mt-4 blink">
                    [FATAL ERROR: SUBARU DEAD]
                  </div>
                )}
              </div>
            </div>

            {/* Choices Panel (2 cols) */}
            <div className="md:col-span-2 flex flex-col justify-center gap-3">
              <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">
                Make your choice:
              </span>
              
              <div className="flex flex-col gap-2">
                {currentNode.options ? (
                  currentNode.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoice(opt)}
                      className="w-full text-left p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-accent-crimson/50 hover:bg-white/[0.04] transition-all duration-300 font-mono text-xs text-text-primary cursor-pointer hover:shadow-[0_0_10px_rgba(199,96,122,0.1)] flex items-start gap-3 group"
                    >
                      <span className="text-accent-crimson font-bold group-hover:scale-110 transition-transform">
                        [{String.fromCharCode(65 + idx)}]
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  ))
                ) : (
                  <button
                    onClick={() => handleChoice({ nextNode: currentNode.resetNode || checkpointNodeId })}
                    className="w-full text-center p-4 rounded-lg bg-accent-crimson-glow border border-accent-crimson/40 hover:bg-accent-crimson/20 text-accent-crimson transition-all duration-300 font-mono text-xs cursor-pointer shadow-[0_0_15px_rgba(199,96,122,0.15)] uppercase tracking-wider font-bold"
                  >
                    Activate Return by Death
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  ```

---

### Task 7: Witch's Tea Party Component

**Files:**
- Create: `src/components/TeaParty.jsx`

- [ ] **Step 1: Write TeaParty component**
  Create `src/components/TeaParty.jsx` with chat dialogue interfaces, lore select options, contract overlay overlays, and Greed theme dispatchers:
  ```jsx
  import React, { useState } from 'react';

  export default function TeaParty({ onContractSign }) {
    const [dialogText, setDialogText] = useState("My name is Echidna. The Witch of Greed. I invite you to my tea party, where we can exchange knowledge. What is it you wish to know?");
    const [contractSigned, setContractSigned] = useState(false);

    const handleTopic = (topic) => {
      switch(topic) {
        case 'witch_of_envy':
          setDialogText("Ah, the Witch of Envy... Satella. She is the one who took everything, yet she gave you the curse of Return by Death. Her love is an endless abyss, consuming all other possibilities.");
          break;
        case 'sanctuary':
          setDialogText("The Sanctuary is my final resting ground, enclosed by a barrier. It is an experiment in immortality, but now it serves only as a trial for those seeking to escape their pasts.");
          break;
        case 'greed_witch':
          setDialogText("Greed? Yes, that is my nature. My hunger for knowledge is boundless. I wish to know every path you take, every death you suffer, and every emotion you feel. I am a monster of pure curiosity.");
          break;
        default:
          setDialogText("Ask, and I shall provide. Knowledge is the only true currency here.");
      }
    };

    const handleSignContract = () => {
      setContractSigned(true);
      setDialogText("Excellent. By signing this contract, your destiny is bound to my guide. I will help you find the optimal future... though I cannot guarantee your sanity. Welcome to my greed.");
      onContractSign(true);
    };

    const handleRevokeContract = () => {
      setContractSigned(false);
      setDialogText("You wish to break the agreement? Very well. But remember, without my guidance, your path will be paved with endless, blind deaths.");
      onContractSign(false);
    };

    return (
      <section className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="p-6 md:p-8 rounded-lg bg-bg-card border border-white/5 backdrop-blur-md shadow-lg flex flex-col gap-6 relative">
          
          {/* Subtle greed theme background circle */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="font-serif text-xl text-text-primary tracking-wide border-l-2 border-amber-400 pl-3">
              Witch's Tea Party
            </h2>
            <span className="font-mono text-[10px] text-text-secondary uppercase">
              Sanctuary — Echidna's Tea Party
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Echidna Avatar and Details */}
            <div className="flex flex-col items-center gap-4 text-center md:border-r md:border-white/5 md:pr-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=150&auto=format&fit=crop&q=80" 
                  alt="Echidna"
                  className="w-24 h-24 rounded-full border border-amber-400/30 object-cover shadow-lg filter brightness-90"
                />
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/20 animate-spin" style={{ animationDuration: '20s' }} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-text-primary">Echidna</h3>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                  Witch of Greed
                </span>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                "Won't you have a cup of tea? It's freshly brewed... made directly from my body's fluids."
              </p>
            </div>

            {/* Conversation Window (2 cols) */}
            <div className="md:col-span-2 flex flex-col justify-between gap-6">
              <div className="bg-bg-terminal border border-white/5 rounded-lg p-5 font-mono text-xs leading-relaxed min-h-[120px] relative">
                <div className="text-amber-400 mb-2 font-bold select-none">[ECHIDNA]</div>
                <p className="text-text-primary italic">{dialogText}</p>
              </div>

              {/* Dialogue Choices */}
              <div className="flex flex-wrap gap-2 justify-end">
                <button 
                  onClick={() => handleTopic('witch_of_envy')}
                  className="px-4 py-2 rounded border border-white/5 bg-white/[0.01] hover:border-amber-400/40 text-xs font-mono text-text-primary cursor-pointer hover:bg-white/[0.03] transition-all"
                >
                  &gt; Ask about Satella
                </button>
                <button 
                  onClick={() => handleTopic('sanctuary')}
                  className="px-4 py-2 rounded border border-white/5 bg-white/[0.01] hover:border-amber-400/40 text-xs font-mono text-text-primary cursor-pointer hover:bg-white/[0.03] transition-all"
                >
                  &gt; Inquire of the Sanctuary
                </button>
                <button 
                  onClick={() => handleTopic('greed_witch')}
                  className="px-4 py-2 rounded border border-white/5 bg-white/[0.01] hover:border-amber-400/40 text-xs font-mono text-text-primary cursor-pointer hover:bg-white/[0.03] transition-all"
                >
                  &gt; Ask about Greed
                </button>

                {!contractSigned ? (
                  <button 
                    onClick={handleSignContract}
                    className="px-4 py-2 rounded border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-mono text-amber-400 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all uppercase tracking-wider font-bold"
                  >
                    Sign the Contract
                  </button>
                ) : (
                  <button 
                    onClick={handleRevokeContract}
                    className="px-4 py-2 rounded border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-xs font-mono text-red-400 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all uppercase tracking-wider font-bold"
                  >
                    Break the Contract
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }
  ```

---

### Task 8: Assemble App Component & Connect Theme States

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Write Main App component**
  Open `src/App.jsx` and replace its content to load Hero, CharacterPortal, RbdSimulator, and TeaParty, and inject the global state variables (loop count, contract overlay):
  ```jsx
  import React, { useState } from 'react';
  import Hero from './components/Hero';
  import CharacterPortal from './components/CharacterPortal';
  import RbdSimulator from './components/RbdSimulator';
  import TeaParty from './components/TeaParty';

  export default function App() {
    const [loopCount, setLoopCount] = useState(1);
    const [greedMode, setGreedMode] = useState(false);

    const handleDeath = () => {
      setLoopCount(prev => prev + 1);
      
      // Breaking Echidna contract automatically on death
      if (greedMode) {
        setGreedMode(false);
      }
    };

    return (
      <div 
        className={`min-h-screen pb-16 transition-colors duration-1000 ${
          greedMode 
            ? 'bg-[#0b0804] text-[#f5eedc] [--color-accent-lavender:#d4af37] [--color-accent-lavender-glow:rgba(212,175,55,0.15)] border-amber-500/20' 
            : 'bg-bg-main text-text-primary'
        }`}
      >
        {/* Contract Active border frame indicator */}
        {greedMode && (
          <div className="fixed inset-0 border-[6px] border-amber-500/20 pointer-events-none z-40 transition-all duration-1000" />
        )}

        <Hero loopCount={loopCount} />
        
        <main className="flex flex-col gap-12 mt-6">
          {/* Main Characters Panel */}
          <CharacterPortal />

          {/* Interactive Return by Death simulator */}
          <RbdSimulator onDeath={handleDeath} />

          {/* Witch's Tea Party section */}
          <TeaParty onContractSign={setGreedMode} />
        </main>

        <footer className="w-full text-center mt-12 text-[10px] font-mono text-text-secondary select-none">
          © {new Date().getFullYear()} Re:Zero Starting Life in Another World Fan Portal | Built with React + Tailwind v4
        </footer>
      </div>
    );
  }
  ```

---

### Task 9: Project Verification, Cleanup & Launch

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Clean default template files**
  Delete default files that are unused:
  - `src/App.css` (delete)
  - `src/assets/react.svg` (delete)

- [ ] **Step 2: Run verification and local build**
  Run: `npm run build`
  Expected: Production bundle compiles cleanly without warnings or typescript/syntax errors.

- [ ] **Step 3: Launch local dev server**
  Run: `npm run dev`
  Expected: Dev server runs successfully and output prints local URL.
