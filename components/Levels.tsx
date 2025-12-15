import React, { useState, useEffect } from 'react';
import { LevelProps, TriviaQuestion } from '../types';
import { getFestiveTrivia } from '../services/geminiService';
import { Gift, Snowflake, TreePine, Star, BrainCircuit, MousePointer2, Hash } from 'lucide-react';

// --- Level 1: Gemini Trivia ---
export const LevelTrivia: React.FC<LevelProps> = ({ onComplete }) => {
  const [data, setData] = useState<TriviaQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    getFestiveTrivia().then(q => {
      setData(q);
      setLoading(false);
    });
  }, []);

  const handleGuess = (opt: string) => {
    if (selected || !data) return;
    setSelected(opt);
    const correct = opt === data.correctAnswer;
    setIsCorrect(correct);
    if (correct) setTimeout(onComplete, 1500);
    else setTimeout(() => { setSelected(null); setIsCorrect(null); }, 1500);
  };

  if (loading) return <div className="animate-pulse text-2xl text-center font-bold">Contacting the North Pole...</div>;
  if (!data) return <div>Failed to load question. <button onClick={onComplete} className="underline">Skip</button></div>;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
      <BrainCircuit className="w-16 h-16 text-yellow-400 mb-2" />
      <h3 className="text-3xl md:text-5xl font-bold text-center leading-tight drop-shadow-md">{data.question}</h3>
      <div className="grid grid-cols-1 gap-4 w-full mt-4">
        {data.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleGuess(opt)}
            disabled={!!selected}
            className={`p-6 rounded-2xl text-xl md:text-3xl font-bold transition-all transform hover:scale-105 shadow-lg
              ${selected === opt 
                ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                : 'bg-white/10 hover:bg-white/20 text-white border-2 border-white/10'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {isCorrect === false && <p className="text-red-300 text-2xl font-bold animate-bounce">Try again!</p>}
    </div>
  );
};

// --- Level 2: Memory Match ---
export const LevelMemory: React.FC<LevelProps> = ({ onComplete }) => {
  const icons = [<Gift size={40} />, <TreePine size={40} />, <Star size={40} />, <Snowflake size={40} />];
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    // Create 4 pairs
    const items = [...icons, ...icons].map((icon, i) => ({ id: i, icon, val: i % 4 })).sort(() => Math.random() - 0.5);
    setCards(items);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].val === cards[second].val) {
        setMatched(prev => [...prev, first, second]);
        setFlipped([]);
      } else {
        const timer = setTimeout(() => setFlipped([]), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length) {
      setTimeout(onComplete, 1000);
    }
  }, [matched, cards.length, onComplete]);

  const handleCardClick = (index: number) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
      setFlipped(prev => [...prev, index]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl md:text-3xl mb-8 font-bold">Match the festive pairs!</h3>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(i)}
            className={`w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 transform shadow-xl ${
              flipped.includes(i) || matched.includes(i) ? 'bg-white text-red-600 rotate-y-180' : 'bg-red-700 text-red-700'
            }`}
          >
            {(flipped.includes(i) || matched.includes(i)) && <div>{card.icon}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Level 3: Catch the Elf ---
export const LevelReflex: React.FC<LevelProps> = ({ onComplete }) => {
  const [pos, setPos] = useState({ top: '50%', left: '50%' });
  const [score, setScore] = useState(0);

  const moveElf = () => {
    const top = Math.random() * 80 + 10;
    const left = Math.random() * 80 + 10;
    setPos({ top: `${top}%`, left: `${left}%` });
  };

  const handleClick = () => {
    const newScore = score + 1;
    setScore(newScore);
    if (newScore >= 5) {
      onComplete();
    } else {
      moveElf();
    }
  };

  useEffect(() => {
    const interval = setInterval(moveElf, 1200); // Auto move to make it harder
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-80 relative bg-slate-800/50 rounded-2xl border-2 border-slate-600 overflow-hidden shadow-inner">
      <h3 className="absolute top-4 left-0 w-full text-center text-xl font-bold text-slate-300 pointer-events-none">
        Catch the Elf 5 times! ({score}/5)
      </h3>
      <button
        onClick={handleClick}
        style={{ top: pos.top, left: pos.left }}
        className="absolute w-16 h-16 -ml-8 -mt-8 bg-green-500 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all duration-200 active:scale-90 hover:bg-green-400 border-2 border-green-300"
      >
        🧝
      </button>
    </div>
  );
};

// --- Level 5: Cookie Math (Renumbered logic in App) ---
export const LevelMath: React.FC<LevelProps> = ({ onComplete }) => {
  const [chips, setChips] = useState<number>(0);
  
  useEffect(() => {
    setChips(Math.floor(Math.random() * 5) + 3); // 3 to 7 chips
  }, []);

  // Just show 4 random options, one is correct
  const [choices, setChoices] = useState<number[]>([]);
  useEffect(() => {
    if(chips === 0) return;
    const s = new Set<number>();
    s.add(chips);
    while(s.size < 4) s.add(Math.floor(Math.random() * 10) + 1);
    setChoices(Array.from(s).sort((a,b) => a-b));
  }, [chips]);

  return (
    <div className="flex flex-col items-center gap-8">
      <h3 className="text-3xl font-bold">Count the chocolate chips!</h3>
      <div className="w-48 h-48 bg-amber-200 rounded-full flex flex-wrap items-center justify-center p-8 gap-3 shadow-2xl border-8 border-amber-300 relative transform hover:scale-105 transition-transform">
        {Array.from({length: chips}).map((_, i) => (
          <div key={i} className="w-6 h-6 bg-amber-900 rounded-full shadow-sm" />
        ))}
      </div>
      <div className="flex gap-4">
        {choices.map(c => (
          <button 
            key={c}
            onClick={() => c === chips ? onComplete() : null}
            className="w-16 h-16 bg-white/10 hover:bg-white/20 hover:scale-110 rounded-full text-3xl font-bold transition-all border-2 border-white/20"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Level 7: Decoration Clicker ---
export const LevelDecorate: React.FC<LevelProps> = ({ onComplete }) => {
  const [bulbs, setBulbs] = useState(Array(5).fill(false));

  const toggle = (i: number) => {
    const next = [...bulbs];
    next[i] = !next[i];
    setBulbs(next);
    if (next.every(b => b)) {
      setTimeout(onComplete, 500);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-3xl mb-10 font-bold">Light up all the bulbs!</h3>
      <div className="flex gap-4 md:gap-8 relative">
        {/* Wire */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-600 -z-10 rounded-full" />
        {bulbs.map((on, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-14 h-20 md:w-16 md:h-24 rounded-full transition-all duration-300 transform hover:scale-110 border-2 border-black/20 ${
              on 
                ? 'bg-yellow-400 shadow-[0_0_30px_rgba(250,204,21,1)] translate-y-0' 
                : 'bg-slate-700 translate-y-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Level 8: Don't Wake Santa (Progress Hold) ---
export const LevelQuiet: React.FC<LevelProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);

  useEffect(() => {
    let interval: any;
    if (holding) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            onComplete();
            return 100;
          }
          return p + 1.5; // Speed
        });
      }, 30);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [holding, onComplete]);

  return (
    <div className="flex flex-col items-center gap-8 select-none">
      <MousePointer2 className="w-16 h-16 text-slate-300" />
      <h3 className="text-center text-3xl font-bold">Hold the button to sneak past Santa!<br/><span className="text-lg text-red-300 font-normal">Don't let go!</span></h3>
      
      <button
        onMouseDown={() => setHolding(true)}
        onMouseUp={() => setHolding(false)}
        onMouseLeave={() => setHolding(false)}
        onTouchStart={() => setHolding(true)}
        onTouchEnd={() => setHolding(false)}
        className="w-40 h-40 rounded-full bg-red-600 border-8 border-red-800 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center active:scale-95 transition-transform"
      >
        <div className="text-6xl">🤫</div>
      </button>

      <div className="w-full max-w-sm h-6 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
        <div 
          className="h-full bg-green-500 transition-all duration-75 ease-linear box-content"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// --- Level 9: Find the Difference (Odd one out) ---
export const LevelOddOne: React.FC<LevelProps> = ({ onComplete }) => {
  const [correctIndex, setCorrectIndex] = useState(0);

  useEffect(() => {
    setCorrectIndex(Math.floor(Math.random() * 9));
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-3xl font-bold mb-8">Find the sad elf!</h3>
      <div className="grid grid-cols-3 gap-6">
        {Array.from({length: 9}).map((_, i) => (
          <button 
            key={i}
            onClick={() => i === correctIndex ? onComplete() : null}
            className="text-6xl p-4 hover:bg-white/10 hover:scale-110 rounded-xl transition-all"
          >
            {i === correctIndex ? '🙍‍♂️' : '🧝'}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Level 10: The Code ---
export const LevelCode: React.FC<LevelProps> = ({ onComplete }) => {
  const [code, setCode] = useState("");
  
  const handleNum = (n: number) => {
    if (code.length < 4) {
      const newCode = code + n;
      setCode(newCode);
      if (newCode === "1225") {
        setTimeout(onComplete, 500);
      } else if (newCode.length === 4) {
        setTimeout(() => setCode(""), 500); // Reset on wrong
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Hash className="w-16 h-16 text-yellow-500" />
      <h3 className="text-center text-3xl font-bold">Enter the date of Christmas<br/>(MMDD) to unlock the chest!</h3>
      
      <div className="bg-black/50 px-8 py-4 rounded-xl text-4xl font-mono tracking-[0.5em] h-24 flex items-center mb-4 border border-white/10 shadow-inner">
        {code.padEnd(4, '_')}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[1,2,3,4,5,6,7,8,9].map(n => (
          <button key={n} onClick={() => handleNum(n)} className="w-20 h-20 bg-slate-700 rounded-xl text-3xl font-bold active:bg-slate-600 shadow-lg hover:bg-slate-600 transition-colors">{n}</button>
        ))}
        <div />
        <button onClick={() => handleNum(0)} className="w-20 h-20 bg-slate-700 rounded-xl text-3xl font-bold active:bg-slate-600 shadow-lg hover:bg-slate-600 transition-colors">0</button>
        <button onClick={() => setCode("")} className="w-20 h-20 bg-red-900/50 rounded-xl text-lg font-bold active:bg-red-900 shadow-lg hover:bg-red-900/70 transition-colors">CLR</button>
      </div>
    </div>
  );
};
