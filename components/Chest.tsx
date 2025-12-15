import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const ChestReveal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = async () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
      {!isOpen ? (
        <button 
          onClick={handleOpen}
          className="group relative cursor-pointer transform transition-transform hover:scale-105"
        >
          {/* Closed Chest Icon (Custom SVG for better detail than lucide box) */}
          <svg className="w-56 h-56 text-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]" viewBox="0 0 24 24" fill="currentColor">
             <path d="M2.5 12A2.5 2.5 0 0 1 5 9.5h14a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 20v-8zm2.5-1A1.5 1.5 0 0 0 3.5 12.5v7a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 19 11H5z" />
             <path d="M5 4h14a3 3 0 0 1 3 3v2H2V7a3 3 0 0 1 3-3zm7 3a1 1 0 0 0-1 1v2h2V8a1 1 0 0 0-1-1z" fill="#78350f" />
          </svg>
          <div className="absolute -top-4 -right-4 animate-bounce">
            <Sparkles className="text-yellow-300 w-12 h-12" />
          </div>
          <p className="mt-8 text-3xl font-bold text-yellow-400 animate-pulse drop-shadow-lg festive-font">Tap to Open!</p>
        </button>
      ) : (
        <div className="flex flex-col items-center animate-fade-in gap-6 max-w-2xl w-full">
           
           <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400 festive-font drop-shadow-sm mb-4">
             You Found Him!
           </h2>

           {/* TV with Elf SVG */}
           <div className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Elf Peaking from behind Top Right */}
                <g transform="translate(140, 40) rotate(15)">
                   {/* Hat */}
                   <path d="M0,10 L30,-40 L60,10 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2"/>
                   <circle cx="60" cy="10" r="8" fill="#FCD34D" />
                   {/* Ears */}
                   <ellipse cx="10" cy="25" rx="5" ry="10" fill="#FECACA" transform="rotate(-20)" />
                   <ellipse cx="50" cy="25" rx="5" ry="10" fill="#FECACA" transform="rotate(20)" />
                   {/* Face */}
                   <circle cx="30" cy="25" r="20" fill="#FECACA" stroke="#FCA5A5" strokeWidth="1"/>
                   {/* Eyes */}
                   <circle cx="22" cy="22" r="2" fill="#1e293b" />
                   <circle cx="38" cy="22" r="2" fill="#1e293b" />
                   {/* Smile */}
                   <path d="M22,32 Q30,38 38,32" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round"/>
                   {/* Hands grabbing TV? */}
                   <circle cx="10" cy="50" r="6" fill="#FECACA" />
                   <circle cx="50" cy="50" r="6" fill="#FECACA" />
                </g>

                {/* TV Antenna */}
                <path d="M80,50 L60,20" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                <path d="M120,50 L140,20" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

                {/* TV Body */}
                <rect x="20" y="50" width="160" height="110" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="6" />
                
                {/* Screen */}
                <rect x="35" y="65" width="130" height="80" rx="4" fill="#0f172a" />
                
                {/* Screen Content (Static/Snow) */}
                <pattern id="static" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                   <rect width="2" height="2" fill="#334155" />
                   <rect x="2" y="2" width="2" height="2" fill="#1e293b" />
                </pattern>
                <rect x="35" y="65" width="130" height="80" rx="4" fill="url(#static)" opacity="0.3" />
                <text x="100" y="110" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="monospace" fontWeight="bold" opacity="0.7">NO SIGNAL</text>

                {/* Knobs/Buttons */}
                <circle cx="165" cy="75" r="4" fill="#cbd5e1" />
                <circle cx="165" cy="90" r="4" fill="#cbd5e1" />
                
                {/* Legs */}
                <path d="M40,160 L30,175" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
                <path d="M160,160 L170,175" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
              </svg>
           </div>

           <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border-2 border-white/20 shadow-2xl w-full">
               <p className="text-3xl md:text-5xl leading-tight font-bold text-white drop-shadow-lg festive-font text-center">
                 Go check behind the TV!
               </p>
           </div>

           <button 
             onClick={() => window.location.reload()}
             className="mt-4 px-10 py-4 bg-green-600 hover:bg-green-500 rounded-full text-xl font-bold uppercase tracking-wider transition-colors shadow-lg shadow-green-900/50 festive-font"
           >
             Play Again
           </button>
        </div>
      )}
    </div>
  );
};
