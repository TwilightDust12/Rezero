import { useState, useRef, useEffect } from 'react';
import { storyNodes } from '../data/story';
import rbdSfx from '../assets/return-by-death.mp3';

export default function RbdSimulator({ onDeath }) {
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [checkpointNodeId, setCheckpointNodeId] = useState('start');
  const [glitchActive, setGlitchActive] = useState(false);
  const timeoutRef = useRef(null);

  const currentNode = storyNodes[currentNodeId];

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChoice = (option) => {
    if (glitchActive) return;

    const nextNode = storyNodes[option.nextNode];
    
    if (nextNode.checkpoint) {
      setCheckpointNodeId(option.nextNode);
    }

    if (nextNode.isDeath) {
      // Trigger Return by Death Glitch sequence
      setGlitchActive(true);
      onDeath(); // Increment loop counter globally
      
      // Play Return by Death sound effect
      try {
        const audio = new Audio(rbdSfx);
        audio.volume = 0.45;
        audio.play().catch(err => console.warn("SFX playback failed:", err));
      } catch (err) {
        console.warn("SFX initialization failed:", err);
      }
      
      const targetNode = nextNode.resetNode || checkpointNodeId;
      timeoutRef.current = setTimeout(() => {
        setGlitchActive(false);
        setCurrentNodeId(targetNode);
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
