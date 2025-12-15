import React, { useState } from 'react';
import { GameState } from './types';
import { ChestReveal } from './components/Chest';
import { 
  LevelTrivia, LevelMemory, LevelReflex, LevelMath,
  LevelDecorate, LevelQuiet, LevelOddOne, LevelCode 
} from './components/Levels';
import { Play } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('INTRO');
  const [level, setLevel] = useState(0);

  const levels = [
    { Comp: LevelTrivia, title: "Level 1: Elf Wisdom" },
    { Comp: LevelMemory, title: "Level 2: Toy Match" },
    { Comp: LevelReflex, title: "Level 3: Catch the Elf" },
    { Comp: LevelMath, title: "Level 4: Cookie Count" },
    { Comp: LevelDecorate, title: "Level 5: Light the Tree" },
    { Comp: LevelOddOne, title: "Level 6: Sad Elf Spotter" },
    { Comp: LevelQuiet, title: "Level 7: Sneak Past Santa" },
    { Comp: LevelCode, title: "Level 8: The Secret Code" },
  ];

  const nextLevel = () => {
    if (level < levels.length - 1) {
      setLevel(l => l + 1);
    } else {
      setGameState('REVEAL');
    }
  };

  return (
    <div className="min-h-screen snow-bg text-white flex flex-col items-center justify-center p-4">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-slate-900/80 backdrop-blur z-50 border-b border-white/10">
        <h1 className="text-2xl md:text-3xl text-yellow-400 font-bold festive-font tracking-wide">
          The Elf's Secret Quest
        </h1>
        {gameState === 'PLAYING' && (
          <div className="flex items-center gap-2">
             <div className="h-2 w-24 md:w-48 bg-slate-700 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-green-500 transition-all duration-500"
                 style={{ width: `${((level) / levels.length) * 100}%` }} 
               />
             </div>
             <span className="font-mono text-sm">{level + 1}/{levels.length}</span>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-3xl mt-20 mb-8 relative z-10 flex flex-col items-center">
        
        {/* Intro Screen */}
        {gameState === 'INTRO' && (
          <div className="flex flex-col items-center text-center space-y-10 animate-fade-in bg-slate-800/80 p-10 rounded-[2rem] border border-slate-700 shadow-2xl max-w-xl w-full">
            {/* Custom Elf SVG */}
            <div className="relative w-48 h-48 animate-bounce drop-shadow-2xl">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {/* Hat */}
                <path d="M20,65 C20,65 35,-5 85,55 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2"/>
                <circle cx="85" cy="55" r="9" fill="#FCD34D" stroke="#B45309" strokeWidth="1"/>
                <path d="M15,65 L88,65 L88,80 L15,80 Z" fill="#F0FDF4" stroke="#166534" strokeWidth="2"/>
                {/* Face */}
                <path d="M30,75 Q50,95 70,75" fill="#FECACA" stroke="#F87171" strokeWidth="1" />
                <path d="M30,75 L30,65 L20,55 Z" fill="#FECACA" /> {/* Left Ear */}
                <path d="M70,75 L70,65 L80,55 Z" fill="#FECACA" /> {/* Right Ear */}
                {/* Eyes */}
                <circle cx="42" cy="72" r="3" fill="#1e293b" />
                <circle cx="58" cy="72" r="3" fill="#1e293b" />
                {/* Smile */}
                <path d="M45,82 Q50,85 55,82" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold festive-font text-red-400 drop-shadow-sm">
              Where is the Elf?
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              Complete {levels.length} festive challenges to unlock the magic chest and reveal the Elf on the Shelf's hiding spot!
            </p>
            <button
              onClick={() => setGameState('PLAYING')}
              className="group flex items-center gap-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-10 py-5 rounded-full text-2xl font-bold transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.5)] border-2 border-red-400"
            >
              <Play fill="currentColor" className="w-8 h-8 group-hover:animate-pulse" /> Start Quest
            </button>
            <p className="text-sm text-slate-500 mt-8">Powered by Gemini AI Magic ✨</p>
          </div>
        )}

        {/* Game Levels */}
        {gameState === 'PLAYING' && (
          <div className="w-full px-4">
             <div className="bg-slate-800/90 border border-slate-700 rounded-[2.5rem] p-6 md:p-12 shadow-2xl min-h-[500px] flex flex-col items-center justify-center transition-all duration-500 relative overflow-hidden">
               {/* Decorative background elements for card */}
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500 opacity-50"></div>
               
               <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-12 festive-font absolute top-8 drop-shadow-md">
                 {levels[level].title}
               </h2>
               
               <div className="w-full flex justify-center mt-8">
                 {/* Render current level component */}
                 {React.createElement(levels[level].Comp, {
                   isActive: true,
                   onComplete: nextLevel
                 })}
               </div>
             </div>
          </div>
        )}

        {/* Reveal Screen */}
        {gameState === 'REVEAL' && (
           <ChestReveal />
        )}

      </main>

      {/* Simple Footer */}
      <footer className="fixed bottom-2 w-full text-center text-slate-600 text-xs pointer-events-none">
        Made with Holiday Magic & React
      </footer>
    </div>
  );
};

export default App;
