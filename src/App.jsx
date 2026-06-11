import { useState, useCallback } from 'react';
import Hero from './components/Hero';
import CharacterPortal from './components/CharacterPortal';
import RbdSimulator from './components/RbdSimulator';
import TeaParty from './components/TeaParty';

export default function App() {
  const [loopCount, setLoopCount] = useState(1);
  const [greedMode, setGreedMode] = useState(false);

  const handleDeath = useCallback(() => {
    setLoopCount(prev => prev + 1);
    
    // Breaking Echidna contract automatically on death
    if (greedMode) {
      setGreedMode(false);
    }
  }, [greedMode]);

  return (
    <div 
      className={`min-h-screen pb-16 transition-colors duration-1000 ${
        greedMode 
          ? 'bg-[#0b0804] text-[#f5eedc] [--color-accent-lavender:#d4af37] [--color-accent-lavender-glow:rgba(212,175,55,0.15)] border-amber-500/20' 
          : 'bg-bg-main text-text-primary'
      }`}
    >
      {/* Contract Active border frame indicator */}
      <div className={`fixed inset-0 border-[6px] border-amber-500/20 pointer-events-none z-40 transition-all duration-1000 ${
        greedMode ? 'opacity-100' : 'opacity-0'
      }`} />

      <Hero loopCount={loopCount} />
      
      <main className="flex flex-col gap-12 mt-6">
        {/* Main Characters Panel */}
        <CharacterPortal />

        {/* Interactive Return by Death simulator */}
        <RbdSimulator onDeath={handleDeath} />

        {/* Witch's Tea Party section */}
        <TeaParty contractSigned={greedMode} onContractSign={setGreedMode} />
      </main>

      <footer className="w-full text-center mt-12 text-[10px] font-mono text-text-secondary select-none">
        © {new Date().getFullYear()} Re:Zero Starting Life in Another World Fan Portal | Built with React + Tailwind v4
      </footer>
    </div>
  );
}
