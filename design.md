# Re:Zero Portal - Design Specification (Vite + React + Tailwind CSS v4)

This document outlines the architecture, visual style, and feature specifications for the Re:Zero themed website.

## 1. Project Goal
To build a highly immersive, aesthetically premium, and eye-friendly single-page portal showcasing main Re:Zero characters alongside interactive experiences (Return by Death Simulator, Witch's Tea Party) built using modern web development standards.

## 2. Tech Stack
*   **Framework:** React 19 (via Vite)
*   **Styling:** Tailwind CSS v4 (CSS-first engine)
*   **Logic:** React Hooks (`useState`, `useEffect`, `useRef`, custom state hooks)
*   **Fonts:** 
    *   Headers: *Cinzel* (Google Fonts) for dark fantasy elegance
    *   Body/Terminal: *Outfit* & *Fira Code* (Google Fonts) for readability and retro-terminal sections
*   **Icons:** Inline SVGs for lightweight and customizable icons

## 3. Visual System (Option A: Soft Dark Fantasy)
The design uses soft, desaturated violet/slate colors to prevent eye strain over long viewing sessions.

### CSS Theme Configurations (Tailwind v4 `@theme` format)
In Tailwind v4, custom theme tokens are configured directly in `src/index.css` using the `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-bg-main: #121017;
  --color-bg-card: rgba(26, 23, 34, 0.65);
  --color-bg-terminal: #0b090f;
  
  --color-accent-lavender: #b298ec;
  --color-accent-crimson: #c7607a;
  
  --color-text-primary: #e2e8f0;
  --color-text-secondary: #9c95a6;
}
```

### Key Aesthetic Elements
*   **Glassmorphic Container:** Frosted glass panels styled with `bg-bg-card backdrop-blur-md border border-white/8 rounded-lg shadow-lg`
*   **Transitions:** Smooth hover scale and fade animations using Tailwind transitions.
*   **Theme Glitch Effect:** Custom CSS animations for retro CRT scanlines and screen glitch shakes during death resets.

---

## 4. UI Architecture & Components

### 4.1 `Hero.jsx` (Landing Section)
*   **Visuals:** Title with a subtle glitch text effect, subtitle showing active loop count, and ambient floating smoke/hands particle effect.
*   **Loop Counter:** Displays `Loop Checkpoint: #{loopCount}` which updates globally.

### 4.2 `CharacterPortal.jsx` (Characters & Info Panel)
*   **Grid:** Left side displays six character selector tiles (Subaru, Emilia, Rem, Ram, Beatrice, Echidna) in a responsive grid.
*   **Interactive Profile Panel:** Selecting a character dynamically renders their card on the right:
    *   Trust/Affection progress bar.
    *   List of abilities/attributes.
    *   Quote player: users can click quotes to hear/see them appear with a dynamic letter-by-letter typewriter animation.

### 4.3 `RbdSimulator.jsx` (Return by Death Text Adventure)
*   **Narrative Console:** Retro terminal style box showing current story branch.
*   **Options Grid:** Presents choices for Subaru's decisions.
*   **Reset Mechanics:** Selecting a fatal option triggers a dramatic glitch screen overlay:
    *   Applies a red CRT flash and distortion.
    *   Increments the global `loopCount` by 1.
    *   Resets the story state back to the last saved checkpoint.

### 4.4 `TeaParty.jsx` (Echidna's Contract Chat)
*   **Dialogue Box:** Interactive conversational interface with Echidna, the Witch of Greed.
*   **Witch's Contract:** High-risk contract prompt. If accepted, it applies a persistent theme change (Greed mode: black & gold theme) to the website layout until a "Return by Death" occurs, which clears the curse and restores the soft slate-violet theme.

---

## 5. File Layout

All project files will be created in `/mnt/GamesAndStuff/Re:Zero Website`:

*   `src/index.css` - Custom fonts import, Tailwind CSS v4 setup, and custom keyframe animations.
*   `src/App.jsx` - App shell, global loop counter state, and section container.
*   `src/data/characters.js` - Character profiles, quotes, and colors.
*   `src/data/story.js` - Text adventure story nodes and checkpoints.
*   `src/components/` - Subcomponents:
    *   `Hero.jsx`
    *   `CharacterPortal.jsx`
    *   `RbdSimulator.jsx`
    *   `TeaParty.jsx`
