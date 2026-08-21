"use client";

import { type WishData } from "@/lib/config";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Zap, Disc, Music, Camera, Heart, Unlock, Stars, PartyPopper } from "lucide-react";

interface TemplateProps {
  data: WishData;
  slug?: string;
}

// Simulated data parsers
const parseData = (str?: string, fallback: unknown[] = []) => {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

export function NeonNightclub({ data }: TemplateProps) {
  const shouldReduceMotion = useReducedMotion();
  const [stage, setStage] = useState<'door' | 'entrance' | 'club' | 'blackout' | 'celebration' | 'toast' | 'message' | 'afterparty'>('door');
  const [countdown, setCountdown] = useState(10);
  const [partyMode, setPartyMode] = useState(false);
  const [overdrive, setOverdrive] = useState(false);
  const [activeModal, setActiveModal] = useState<{ type: string, content: { time?: string, text?: string } | string } | null>(null);

  // Konami Code Tracker
  const triggerNeonBurst = (size: 'small' | 'medium' | 'large' = 'small') => {
    const count = size === 'small' ? 30 : size === 'medium' ? 80 : 200;
    const spread = size === 'small' ? 45 : size === 'medium' ? 70 : 120;
    confetti({
      particleCount: count,
      spread: spread,
      colors: ['#EC4899', '#8B5CF6', '#3B82F6', '#06B6D4'],
      shapes: ['square', 'circle'],
      ticks: 200,
      gravity: 0.8,
      origin: { y: 0.6 }
    });
  };

  const konamiCode = useRef(['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']);
  const [konamiIndex, setKonamiIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode.current[konamiIndex]) {
        if (konamiIndex === konamiCode.current.length - 1) {
          setOverdrive(true);
          triggerNeonBurst();
          setKonamiIndex(0);
        } else {
          setKonamiIndex(konamiIndex + 1);
        }
      } else {
        setKonamiIndex(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);

  // Data
  const memories = parseData(data.neonMemories, [
    { time: "01:47 AM", text: "We probably should have gone home. I'm glad we didn't." },
    { time: "03:15 AM", text: "That time we laughed until it hurt." }
  ]);
  const wishes = parseData(data.neonWishes, [
    "To more adventures.",
    "To better days.",
    "To ridiculous laughter.",
    "To another unforgettable year."
  ]);
  const signs = parseData(data.neonSigns, [
    "YOU GOT THIS.",
    "MORE MEMORIES.",
    "MORE LIFE."
  ]);
  const vipMessage = data.neonVIPMessage || "Okay. This part isn't for everyone. It's just for you. Thank you for being such an incredible part of my life.";

  // Particle bursts

  // State transitions
  const enterClub = () => {
    setStage('entrance');
    setTimeout(() => {
      setStage('club');
    }, 4000);
  };

  const triggerBlackout = () => {
    setStage('blackout');
    let count = 10;
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(timer);
        setStage('celebration');
        triggerNeonBurst('large');
        setTimeout(() => setStage('toast'), 5000);
      }
    }, 1000);
  };

  const proceedToMessage = () => {
    setStage('message');
    setTimeout(() => {
      setStage('afterparty');
    }, 12000);
  };

  // Styles
  const containerClass = `min-h-screen font-sans flex flex-col relative overflow-x-hidden ${overdrive ? 'bg-zinc-950' : 'bg-[#050505]'} transition-colors duration-1000`;
  const primaryGlow = overdrive ? 'drop-shadow-[0_0_30px_rgba(236,72,153,1)]' : 'drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]';
  const accentGlow = overdrive ? 'drop-shadow-[0_0_30px_rgba(59,130,246,1)]' : 'drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]';

  return (
    <div className={containerClass}>

      {/* GLOBAL AMBIENT FX */}
      {stage !== 'blackout' && stage !== 'message' && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [perspective:1000px] [transform-style:preserve-3d] [transform:rotateX(60deg)_translateY(-100px)] pointer-events-none" />
          <motion.div
            animate={{ opacity: partyMode ? 0.6 : 0.3, scale: partyMode ? 1.1 : 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="fixed top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-pink-600 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none"
          />
          <motion.div
            animate={{ opacity: partyMode ? 0.6 : 0.3, scale: partyMode ? 1.1 : 1 }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none"
          />
        </>
      )}

      {/* OVERDRIVE FX */}
      {overdrive && (
        <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-30 bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-500 animate-pulse" />
      )}

      {/* STAGE 1: DOOR */}
      <AnimatePresence mode="wait">
        {stage === 'door' && (
          <motion.div
            key="door"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
          >
            <div className="border border-white/20 p-6 font-mono text-xs md:text-sm text-center mb-16 opacity-50 tracking-widest animate-pulse">
              <p>┌──────────────────────────┐</p>
              <p>│                          │</p>
              <p>│      AFTER DARK          │</p>
              <p>│                          │</p>
              <p>│      {new Date().toLocaleDateString('en-GB')}          │</p>
              <p>│                          │</p>
              <p>└──────────────────────────┘</p>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} className="text-center space-y-8">
              <p className="font-serif italic text-gray-400 text-lg md:text-xl">&quot;Tonight, there&apos;s only one guest who matters.&quot;</p>
              <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }} className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                {data.recipientName}
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }} className="font-serif italic text-gray-400">&quot;Your table is waiting.&quot;</motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7 }}>
                <button
                  onClick={enterClub}
                  className="mt-12 px-8 py-3 bg-transparent border-2 border-pink-500 text-pink-500 font-bold uppercase tracking-[0.2em] hover:bg-pink-500 hover:text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] transition-all duration-500 rounded-sm flex items-center gap-3 mx-auto"
                >
                  ENTER THE NIGHT <Zap className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 2: ENTRANCE TRANSITION */}
        {stage === 'entrance' && (
          <motion.div
            key="entrance"
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ height: "1px", width: "0%" }}
              animate={{ width: "100%", height: ["1px", "1px", "100vh"] }}
              transition={{ duration: 3, times: [0, 0.4, 1], ease: "easeInOut" }}
              className="bg-white/10 shadow-[0_0_50px_rgba(236,72,153,0.8)] flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mix-blend-overlay animate-pulse" />
              <motion.div
                initial={{ scale: 1 }} animate={{ scale: 3, opacity: 0 }} transition={{ delay: 2, duration: 1 }}
                className="w-full h-full border-[20px] border-black absolute"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 3+: MAIN CLUB ENVIRONMENT */}
      {(stage === 'club' || stage === 'blackout' || stage === 'celebration' || stage === 'toast' || stage === 'message' || stage === 'afterparty') && (
        <motion.main
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          className="w-full max-w-6xl mx-auto px-6 py-20 z-10 space-y-40 relative"
        >
          {/* BLACKOUT OVERLAY */}
          {stage === 'blackout' && (
            <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
              <motion.span
                key={countdown}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                exit={{ opacity: 0 }}
                className="text-8xl md:text-[15rem] font-black text-white mix-blend-difference"
              >
                {countdown}
              </motion.span>
            </div>
          )}

          {/* MAIN DJ REVEAL */}
          {stage !== 'blackout' && stage !== 'message' && stage !== 'toast' && (
            <section className="min-h-[80vh] flex flex-col items-center justify-center text-center relative pt-20">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />

              <motion.div
                animate={{ scale: partyMode ? [1, 1.02, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="space-y-4 relative"
              >
                <h1 className={`text-6xl md:text-9xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 ${primaryGlow} uppercase`}>
                  HAPPY
                </h1>
                <h1 className={`text-6xl md:text-9xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 ${accentGlow} uppercase`}>
                  BIRTHDAY
                </h1>
                <h2 className="text-3xl md:text-5xl text-white font-bold tracking-[0.3em] uppercase mt-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                  {data.recipientName}
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 2 }}
                className="mt-16 text-xl text-gray-400 font-serif italic"
              >
                &quot;Tonight, the whole city is celebrating you.&quot;
              </motion.p>

              {stage === 'afterparty' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 px-4 py-2 border border-pink-500/50 text-pink-400 text-sm tracking-[0.3em] uppercase rounded-full">
                   AFTERPARTY MODE
                 </motion.div>
              )}
            </section>
          )}

          {/* VISUALIZER SECTION */}
          {(stage === 'club' || stage === 'afterparty') && (
            <section className="py-20 border-t border-white/5 relative">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/3 space-y-6">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-cyan-400">Now Playing</h3>
                  <h4 className="text-2xl font-bold text-white tracking-wider">{data.recipientName}&apos;S MIX</h4>
                  <div className="space-y-4">
                    {['01 — Best Memories', '02 — Good Times', '03 — New Adventures', '04 — One More Year'].map((track, i) => (
                      <button
                        key={i}
                        onClick={() => { setPartyMode(true); triggerNeonBurst('small'); setTimeout(() => setPartyMode(false), 2000); }}
                        className="block w-full text-left text-sm md:text-base text-gray-400 hover:text-pink-400 hover:pl-4 transition-all duration-300 font-mono"
                      >
                        {track}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-2/3 h-48 bg-zinc-900/50 rounded-xl border border-white/10 flex items-end justify-between p-4 gap-2 overflow-hidden relative cursor-pointer" onClick={() => { setPartyMode(true); triggerNeonBurst('medium'); setTimeout(() => setPartyMode(false), 3000); }}>
                  <div className="absolute top-4 left-4 text-xs text-white/20 uppercase tracking-widest flex items-center gap-2"><Disc className="w-4 h-4 animate-spin" /> DJ Booth</div>
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: partyMode ? ["80%", "10%", "60%"] : ["10%", "30%", "10%"] }}
                      transition={{ repeat: Infinity, duration: partyMode ? 0.3 : 1 + (i % 2 === 0 ? 0.5 : 1.5), ease: "linear" }}
                      className="w-full bg-gradient-to-t from-pink-500 to-cyan-500 rounded-t-sm opacity-80"
                    />
                  ))}
                  {partyMode && <div className="absolute inset-0 flex items-center justify-center font-black text-4xl text-white/80 mix-blend-overlay tracking-[0.5em] italic">LET&apos;S TURN IT UP</div>}
                </div>
              </div>
            </section>
          )}

          {/* DANCE FLOOR */}
          {(stage === 'club' || stage === 'afterparty') && (
            <section className="py-20 flex flex-col items-center">
              <h3 className="text-xs uppercase tracking-[0.3em] text-pink-500 mb-12">The Dance Floor</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2 w-full max-w-4xl p-4 bg-zinc-900/30 rounded-3xl border border-white/5 [transform:rotateX(20deg)] [transform-style:preserve-3d]">
                {[...Array(32)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 0.95, backgroundColor: "#EC4899", boxShadow: "0 0 20px #EC4899" }}
                    onClick={() => triggerNeonBurst('small')}
                    className="aspect-square bg-zinc-800/50 rounded-lg cursor-pointer transition-colors duration-500"
                  />
                ))}
              </div>
            </section>
          )}

          {/* MEMORY WALL */}
          {(stage === 'club' || stage === 'afterparty') && (
            <section className="py-20 relative">
              <h3 className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-12 text-center">The Memory Wall</h3>
              <div className="flex flex-wrap justify-center gap-8">
                {memories.map((mem: { time?: string, text?: string }, i: number) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10, rotate: (i % 2 === 0 ? 2 : -2) }}
                    onClick={() => setActiveModal({ type: 'memory', content: mem })}
                    className={`w-64 p-4 bg-zinc-900 border border-purple-500/30 rounded-sm shadow-[0_0_20px_rgba(168,85,247,0.1)] cursor-pointer hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all ${i % 2 === 0 ? 'mt-8' : ''}`}
                  >
                    <div className="aspect-square bg-zinc-800 flex items-center justify-center mb-4 relative overflow-hidden group">
                       <Camera className="w-8 h-8 text-white/20 group-hover:text-purple-400 transition-colors" />
                       <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="font-mono text-xs text-purple-400 mb-2">{mem.time || `Memory 0${i + 1}`}</div>
                    <p className="text-sm text-gray-400 truncate">{mem.text}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* FLOATING NEON SIGNS */}
          {(stage === 'club' || stage === 'afterparty') && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               {signs.map((sign: string, i: number) => (
                 <motion.div
                   key={i}
                   animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
                   transition={{ duration: 4 + i, repeat: Infinity, delay: i }}
                   className={`absolute ${i % 2 === 0 ? 'left-[10%] text-cyan-400' : 'right-[10%] text-pink-400'} font-bold text-xl md:text-3xl tracking-widest opacity-30 [writing-mode:vertical-rl] mix-blend-screen drop-shadow-[0_0_10px_currentColor]`}
                   style={{ top: `${20 + (i * 25)}%` }}
                 >
                   {sign}
                 </motion.div>
               ))}
            </div>
          )}

          {/* VIP ROOM ENTRANCE */}
          {(stage === 'club' || stage === 'afterparty') && (
            <section className="py-32 flex flex-col items-center">
              <button
                onClick={() => setActiveModal({ type: 'vip', content: vipMessage })}
                className="group relative flex flex-col items-center gap-4"
              >
                 <div className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-white transition-colors bg-zinc-900 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                   <Unlock className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors" />
                 </div>
                 <span className="text-xs tracking-[0.3em] text-zinc-500 group-hover:text-white font-bold transition-colors">VIP ONLY</span>
              </button>
            </section>
          )}

          {/* INITIATE COUNTDOWN BUTTON */}
          {stage === 'club' && (
            <div className="fixed bottom-10 inset-x-0 flex justify-center z-40">
              <button onClick={triggerBlackout} className="px-6 py-2 bg-black/80 backdrop-blur-md border border-white/10 text-white/50 text-xs tracking-[0.3em] hover:text-white hover:border-white/50 transition-colors rounded-full">
                READY FOR THE SURPRISE?
              </button>
            </div>
          )}

          {/* CELEBRATION MODE */}
          {stage === 'celebration' && (
            <section className="min-h-screen flex items-center justify-center">
               <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-8">
                 <h1 className="text-7xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_50px_rgba(236,72,153,1)] uppercase leading-none">
                   CHEERS!
                 </h1>
                 <PartyPopper className="w-24 h-24 mx-auto text-pink-500 animate-bounce" />
               </motion.div>
            </section>
          )}

          {/* TOAST SEQUENCE */}
          {stage === 'toast' && (
            <section className="min-h-screen flex flex-col items-center justify-center space-y-16">
              <h3 className="text-sm tracking-[0.4em] text-cyan-400 font-bold uppercase mb-8">A Toast To You 🥂</h3>
              <div className="space-y-8 text-center max-w-2xl">
                {wishes.map((wish: string, i: number) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 2, duration: 1 }}
                    className="text-xl md:text-3xl font-serif italic text-gray-200"
                  >
                    &quot;{wish}&quot;
                  </motion.p>
                ))}
              </div>
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: wishes.length * 2 + 2 }}
                onClick={proceedToMessage}
                className="px-8 py-3 bg-pink-600 text-white font-bold tracking-widest text-sm rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:bg-pink-500"
              >
                CHEERS TO ANOTHER YEAR
              </motion.button>
            </section>
          )}

          {/* FINAL MESSAGE & HEART */}
          {stage === 'message' && (
            <section className="min-h-screen flex flex-col items-center justify-center text-center relative z-50">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="max-w-3xl px-6 space-y-12">
                 <h3 className="text-xs uppercase tracking-[0.4em] text-pink-500 font-bold">For You</h3>
                 <p className="text-xl md:text-3xl leading-relaxed text-gray-300 font-serif italic whitespace-pre-line">
                   &quot;{data.message}&quot;
                 </p>
                 <p className="text-lg text-pink-400 font-bold tracking-widest uppercase">— {data.senderName}</p>

                 <motion.div
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 6, duration: 2 }}
                   className="pt-20 flex flex-col items-center gap-6"
                 >
                   <div className="relative">
                     <Heart className="w-24 h-24 text-pink-500 fill-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.8)] animate-pulse" />
                     <motion.div
                       animate={{ opacity: [0, 1, 0], scale: [1, 2, 2] }}
                       transition={{ duration: 2, repeat: Infinity }}
                       className="absolute inset-0 bg-pink-500 rounded-full blur-xl mix-blend-screen"
                     />
                   </div>
                   <h2 className="text-3xl font-black text-white tracking-[0.2em]">{data.recipientName}</h2>
                 </motion.div>
              </motion.div>
            </section>
          )}

        </motion.main>
      )}

      {/* MODALS */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`max-w-lg w-full p-10 rounded-xl relative ${activeModal.type === 'vip' ? 'bg-[#1a0b1f] border border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.2)]' : 'bg-zinc-900 border border-white/10'}`}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>

              {activeModal.type === 'memory' && (
                <div className="space-y-6 text-center">
                  <div className="inline-block p-4 bg-zinc-800 rounded-lg mb-4">
                    <Stars className="w-12 h-12 text-purple-400 mx-auto" />
                  </div>
                  <h4 className="text-xs tracking-[0.3em] text-purple-400 uppercase font-mono">{typeof activeModal.content !== "string" ? activeModal.content.time : ""}</h4>
                  <p className="text-xl text-gray-200 font-serif italic">&quot;{typeof activeModal.content !== "string" ? activeModal.content.text : ""}&quot;</p>
                </div>
              )}

              {activeModal.type === 'vip' && (
                <div className="space-y-8 text-center py-8">
                  <Unlock className="w-12 h-12 text-purple-500 mx-auto drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                  <p className="text-xl md:text-2xl text-purple-100 font-serif italic leading-relaxed">
                    &quot;{typeof activeModal.content === "string" ? activeModal.content : ""}&quot;
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
