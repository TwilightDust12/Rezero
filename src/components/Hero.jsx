const SHADOW_HAND_PATH = "M50 0C22.4 0 0 22.4 0 50C0 60.5 3.2 70.3 8.8 78.4L20.5 63.8C18.1 59.8 16.7 55.1 16.7 50C16.7 31.6 31.6 16.7 50 16.7C68.4 16.7 83.3 31.6 83.3 50C83.3 57.5 80.8 64.4 76.7 70L86.8 81.3C95 72.8 100 61.4 100 50C100 22.4 77.6 0 50 0Z";

export default function Hero({ loopCount = 1 }) {
  return (
    <header className="relative w-full py-12 flex flex-col items-center justify-center border-b border-white/5 overflow-hidden">
      {/* Floating Shadow Hands Background Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <svg 
          className="absolute -top-10 -left-10 w-96 h-96 shadow-hand text-accent-crimson" 
          viewBox="0 0 100 100" 
          fill="currentColor"
          aria-hidden="true"
          role="presentation"
        >
          <path d={SHADOW_HAND_PATH} />
        </svg>
        <svg 
          className="absolute -bottom-10 -right-10 w-[500px] h-[500px] shadow-hand text-accent-lavender" 
          style={{ animationDelay: '2s' }} 
          viewBox="0 0 100 100" 
          fill="currentColor"
          aria-hidden="true"
          role="presentation"
        >
          <path d={SHADOW_HAND_PATH} />
        </svg>
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="font-serif text-5xl md:text-7xl font-extrabold tracking-wider text-text-primary mb-2 select-none cursor-default glitch-text transition-all duration-300 leading-normal">
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
