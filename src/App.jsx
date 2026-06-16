import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { characters } from './data/characters';
import RbdSimulator from './components/RbdSimulator';
import TeaParty from './components/TeaParty';
import { Play, Info, ArrowLeft, ArrowRight, Menu } from 'lucide-react';

const jpNames = {
  subaru: 'ナツキ・スバル',
  emilia: 'エミリア',
  rem: 'レム',
  ram: 'ラム',
  beatrice: 'ベアトリス',
  echidna: 'エキドナ'
};

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loopCount, setLoopCount] = useState(1);
  const [greedMode, setGreedMode] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const char = characters[currentIndex];
  const nextIndex = (currentIndex + 1) % characters.length;
  const prevIndex = (currentIndex - 1 + characters.length) % characters.length;

  const handleDeath = useCallback(() => {
    setLoopCount(prev => prev + 1);
    if (greedMode) setGreedMode(false);
    setActiveModal(null);
  }, [greedMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModal) return;
      if (e.key === 'ArrowRight') setCurrentIndex(nextIndex);
      if (e.key === 'ArrowLeft') setCurrentIndex(prevIndex);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextIndex, prevIndex, activeModal]);

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans select-none flex flex-col bg-[#050408]">
      
      {/* Background Magic & Atmosphere */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={char.id + 'bg'}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* Deep Colored Vignette / Glow */}
          <div 
            className="absolute inset-0 opacity-40 mix-blend-screen transition-colors duration-1000"
            style={{ 
              background: `radial-gradient(circle at 60% 50%, ${char.color} 0%, transparent 60%)` 
            }} 
          />

          {/* Huge Japanese Text Background (Vertical) */}
          <div className="absolute right-[5%] top-[-10%] bottom-[-10%] w-[20vw] flex items-center justify-center opacity-[0.03] overflow-hidden pointer-events-none">
            <h2 
              className="text-[25vh] font-black leading-none text-white whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
            >
              {jpNames[char.id]}
            </h2>
          </div>

          {/* The Diagonal Slash (Re:Zero Motif) */}
          <div className="absolute top-[-50%] bottom-[-50%] right-[35%] w-[1px] rotate-[15deg] opacity-40 shadow-[0_0_15px_2px]" style={{ backgroundColor: char.color, color: char.color }} />
          <div className="absolute top-[-50%] bottom-[-50%] right-[35%] w-[50vw] rotate-[15deg] opacity-5 pointer-events-none" style={{ background: `linear-gradient(to right, ${char.color}, transparent)` }} />

          {/* Grid Overlay / Noise */}
          <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </motion.div>
      </AnimatePresence>

      {/* Decorative Side Text */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-180 z-40 opacity-20 pointer-events-none hidden xl:block" style={{ writingMode: 'vertical-rl' }}>
        <span className="font-mono text-xs tracking-[0.5em] text-white uppercase">Re:Zero - Starting Life in Another World</span>
      </div>

      {/* Top Navbar */}
      <nav className="relative z-40 flex items-center justify-between px-8 lg:px-20 py-8 w-full text-white">
        <div className="flex items-center gap-12 text-xs font-mono tracking-[0.2em] uppercase">
          <button onClick={() => setActiveModal(null)} className={`transition-all duration-300 ${!activeModal ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/40 hover:text-white'}`}>Overview</button>
          <button onClick={() => setActiveModal('rbd')} className={`transition-all duration-300 flex items-center gap-2 ${activeModal === 'rbd' ? 'text-accent-crimson drop-shadow-[0_0_8px_rgba(199,96,122,0.8)]' : 'text-white/40 hover:text-accent-crimson'}`}>
            <span className="w-2 h-2 rounded-full bg-accent-crimson animate-pulse"></span>
            Simulator
          </button>
          <button onClick={() => setActiveModal('tea')} className={`transition-all duration-300 ${activeModal === 'tea' ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'text-white/40 hover:text-amber-400'}`}>Tea Party</button>
        </div>
        <button className="p-3 hover:bg-white/10 rounded-full transition-colors border border-white/10 backdrop-blur-md">
          <Menu size={18} />
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-20 flex-1 w-full h-full flex items-center justify-between px-8 lg:px-20 max-w-[1920px] mx-auto">
        
        {/* Left Content */}
        <div className="relative w-[45%] lg:w-[40%] flex flex-col justify-center z-30 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={char.id + 'left'}
              initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px]" style={{ backgroundColor: char.color }}></span>
                <span className="text-xs font-mono tracking-[0.3em] uppercase" style={{ color: char.color }}>
                  Loop Checkpoint #{String(loopCount).padStart(2, '0')}
                </span>
              </div>
              
              <h1 
                className="font-serif text-[clamp(4rem,7vw,8rem)] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 tracking-tight mb-8"
                style={{ textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
              >
                {char.name.toUpperCase().split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4">
                <button 
                  onClick={() => setActiveModal('rbd')}
                  className="group relative flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-mono uppercase tracking-[0.2em] text-xs rounded-sm backdrop-blur-xl border border-white/10 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${char.color}, transparent)` }} />
                  <Play size={14} fill="currentColor" className={char.id === 'subaru' ? 'text-accent-crimson' : 'text-white'} />
                  <span className="relative z-10">{char.id === 'subaru' ? 'ACTIVATE CURSE' : 'ARCHIVES'}</span>
                </button>
                <button className="flex items-center gap-2 text-white/50 hover:text-white uppercase font-mono tracking-[0.2em] text-xs transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  <Info size={14} />
                  DETAILS
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Character Image (Center) */}
        {/* We use scale-110 and origin-top to hide top cropped edges if any, and object-cover to make it fill appropriately */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden pt-10">
          <AnimatePresence mode="wait">
            <motion.img
              key={char.id + 'img'}
              src={char.avatar}
              alt={char.name}
              initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1.1 }}
              exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.15 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-[95vh] w-auto object-cover object-top origin-top drop-shadow-[0_0_60px_rgba(0,0,0,0.8)]"
              style={{ filter: greedMode ? 'sepia(40%) hue-rotate(-30deg)' : 'none' }}
            />
          </AnimatePresence>
        </div>

        {/* Right Content */}
        <div className="relative w-[35%] lg:w-[30%] flex flex-col justify-center z-30 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={char.id + 'right'}
              initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 rounded-2xl backdrop-blur-2xl bg-black/40 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Inner glowing highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${char.color}, transparent)` }} />
              
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full opacity-50" style={{ backgroundColor: char.color }} />
                <div className="mb-6 font-serif text-lg italic text-white/90 leading-relaxed pl-2">
                  "{char.quotes[0]}"
                </div>
              </div>
              
              <p className="text-sm text-white/60 leading-loose font-sans mb-8 text-justify font-light">
                {char.description}
              </p>

              <div className="flex flex-col gap-4 pt-6 border-t border-white/5">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Title</span>
                  <span className="text-xs font-mono text-white/90 uppercase tracking-[0.1em] text-right" style={{ color: char.color }}>{char.title}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Abilities</span>
                  <span className="text-xs font-mono text-white/90 uppercase tracking-[0.1em] text-right">{char.abilities[0]}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* Bottom Navigation */}
      <footer className="relative z-40 flex items-center justify-between px-8 lg:px-20 py-8 w-full border-t border-white/5 bg-gradient-to-t from-black/80 to-transparent">
        <button 
          onClick={() => setCurrentIndex(prevIndex)}
          className="flex items-center gap-6 text-white/40 hover:text-white transition-all group cursor-pointer w-64"
        >
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/30 group-hover:-translate-x-2 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="font-sans text-xs tracking-[0.2em] uppercase truncate">{characters[prevIndex].name}</span>
        </button>

        {/* Progress Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-white/30">0{currentIndex + 1}</span>
          <div className="flex gap-2">
            {characters.map((c, i) => (
              <button 
                key={c.id} 
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-10 bg-white' : 'w-2 bg-white/20 hover:bg-white/50'}`}
                aria-label={`Go to ${c.name}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-white/30">0{characters.length}</span>
        </div>

        <button 
          onClick={() => setCurrentIndex(nextIndex)}
          className="flex items-center justify-end gap-6 text-white/40 hover:text-white transition-all group cursor-pointer w-64"
        >
          <span className="font-sans text-xs tracking-[0.2em] uppercase truncate text-right">{characters[nextIndex].name}</span>
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/30 group-hover:translate-x-2 transition-all">
            <ArrowRight size={16} />
          </div>
        </button>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-50 bg-[#050408]/80 overflow-y-auto"
          >
            <div className="min-h-screen pt-24 pb-12 px-8">
              <button 
                onClick={() => setActiveModal(null)} 
                className="absolute top-8 right-8 text-white/50 hover:text-white z-50 flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase border border-white/10 px-6 py-3 rounded-full hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                ✕ Close
              </button>
              {activeModal === 'rbd' && <RbdSimulator onDeath={handleDeath} />}
              {activeModal === 'tea' && <TeaParty contractSigned={greedMode} onContractSign={setGreedMode} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
