import { useState, useEffect } from 'react';
import { characters } from '../data/characters';

export default function CharacterPortal() {
  const [selectedId, setSelectedId] = useState('subaru');
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const [typewrittenText, setTypewrittenText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const character = characters.find(c => c.id === selectedId) || characters[0];

  // Typewriter effect for selected quote
  useEffect(() => {
    const fullText = character.quotes[activeQuoteIdx] || '';
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
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

    return () => {
      clearInterval(interval);
    };
  }, [selectedId, activeQuoteIdx, character.quotes]);

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
                onClick={() => {
                  setSelectedId(c.id);
                  setActiveQuoteIdx(0);
                  setTypewrittenText('');
                }}
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-wrap border-b border-white/5 pb-4">
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
            <div className="bg-bg-terminal border border-white/5 rounded-lg p-4 font-mono text-xs min-h-[112px] flex items-center relative">
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
                    onClick={() => {
                      setActiveQuoteIdx(idx);
                      setTypewrittenText('');
                    }}
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
