import { useState, useEffect } from 'react';
import echidnaImg from '../assets/echidna.png';

export default function TeaParty({ contractSigned, onContractSign }) {
  const [dialogText, setDialogText] = useState("My name is Echidna. The Witch of Greed. I invite you to my tea party, where we can exchange knowledge. What is it you wish to know?");

  useEffect(() => {
    if (!contractSigned) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDialogText(prev => {
        if (prev.includes("Excellent. By signing this contract")) {
          return "Our contract has been severed by your demise. But do not fret... we can always sign another.";
        }
        return prev;
      });
    }
  }, [contractSigned]);

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
    setDialogText("Excellent. By signing this contract, your destiny is bound to my guide. I will help you find the optimal future... though I cannot guarantee your sanity. Welcome to my greed.");
    onContractSign(true);
  };

  const handleRevokeContract = () => {
    setDialogText("You wish to break the agreement? Very well. But remember, without my guidance, your path will be paved with endless, blind deaths.");
    onContractSign(false);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="p-6 md:p-8 rounded-lg bg-bg-card border border-white/5 backdrop-blur-md shadow-lg flex flex-col gap-6 relative overflow-hidden">
        
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
                src={echidnaImg} 
                alt="Echidna"
                width="96"
                height="96"
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
            <blockquote className="text-[11px] text-text-secondary leading-relaxed italic">
              "Won't you have a cup of tea? It's freshly brewed... made directly from my body's fluids."
            </blockquote>
          </div>

          {/* Conversation Window (2 cols) */}
          <div className="md:col-span-2 flex flex-col justify-between gap-6">
            <div className="bg-bg-terminal border border-white/5 rounded-lg p-5 font-mono text-xs leading-relaxed min-h-[140px] relative">
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
                  className="px-4 py-2 rounded border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-xs font-mono text-red-400 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all uppercase tracking-wider font-bold"
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
