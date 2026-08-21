"use client";

import { useState, useEffect } from "react";
import { type WishData } from "@/lib/config";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Star, Zap, Shield, Gamepad2 } from "lucide-react";

interface TemplateProps {
  data: WishData;
  slug: string;
}

function safeParse(jsonString: string | undefined, fallback: unknown) {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}

// Konami Code sequence
const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight"
];

// Reusable Retro Dialogue Box
const DialogueBox = ({ text, speaker, onClose }: { text: string; speaker?: string; onClose?: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
      className="bg-blue-900 border-4 border-white p-4 md:p-6 w-full max-w-2xl mx-auto shadow-[8px_8px_0px_rgba(0,0,0,0.5)] font-mono text-white relative z-50"
    >
      {speaker && <div className="absolute -top-4 left-4 bg-yellow-400 text-black px-2 py-1 text-sm font-bold border-2 border-white">{speaker}</div>}
      <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap">{text}</p>
      {onClose && (
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="animate-pulse bg-white text-blue-900 px-3 py-1 font-bold hover:bg-yellow-400 transition-colors">
            PRESS E OR TAP ⬇
          </button>
        </div>
      )}
    </motion.div>
  );
};

const HUD = ({ score, level }: { score: number, level: number }) => (
  <div className="fixed top-0 inset-x-0 p-4 bg-black/80 backdrop-blur-sm border-b-4 border-blue-500 font-mono text-white flex justify-between items-center z-40 shadow-lg">
    <div>
      <div className="text-blue-400 font-bold mb-1">PLAYER 1</div>
      <div className="flex gap-1">
        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
      </div>
    </div>
    <div className="text-center hidden md:block">
      <div className="text-yellow-400 font-bold mb-1">SCORE</div>
      <div className="text-2xl">{score.toString().padStart(6, '0')}</div>
    </div>
    <div className="text-right">
      <div className="text-green-400 font-bold mb-1">LEVEL</div>
      <div className="text-2xl">{level.toString().padStart(2, '0')}</div>
    </div>
  </div>
);

export function RetroArcade({ data }: TemplateProps) {
  const shouldReduceMotion = useReducedMotion();

  // Game State
  const [gameState, setGameState] = useState<'boot' | 'intro' | 'level1' | 'level2' | 'boss' | 'ending'>('boot');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [cheatActivated, setCheatActivated] = useState(false);

  // Collections
  const [collectedMemories, setCollectedMemories] = useState<number[]>([]);
  const [collectedPowerups, setCollectedPowerups] = useState<number[]>([]);
  const [activeDialogue, setActiveDialogue] = useState<{ text: string, speaker?: string } | null>(null);

  // Boss State
  const [candlesBlown, setCandlesBlown] = useState(false);

  // Data
  const memories = safeParse(data.arcadeMemories, [
    { title: "First Quest", date: "Level 1", text: "Remember when we couldn't stop laughing?" },
    { title: "Co-op Mode", date: "Level 2", text: "Best player 2 I could ask for." }
  ]) as { title: string, date: string, text: string }[];

  const powerups = safeParse(data.arcadePowerups, [
    { type: "heart", name: "More Love", wish: "May you feel loved every single day." },
    { type: "star", name: "Star Power", wish: "May this year bring amazing moments." },
    { type: "zap", name: "Speed Boost", wish: "For all the new adventures ahead." }
  ]) as { type: string, name: string, wish: string }[];

  const secrets = safeParse(data.arcadeSecrets, [
    "You found a secret area! You mean more to me than words can say."
  ]) as string[];

  // Konami Code Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (cheatActivated) return;
      if (e.key === KONAMI_CODE[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          setCheatActivated(true);
          setScore(s => s + 9999);
          setActiveDialogue({ speaker: "SYSTEM", text: "CHEAT CODE ACCEPTED. YOU DESERVE ONE MORE WISH." });
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex, cheatActivated]);

  // Boot sequence
  const startGame = () => {
    const screen = document.getElementById("arcade-screen");
    if (screen && !shouldReduceMotion) {
      screen.classList.add("animate-crt-flicker");
      setTimeout(() => {
        setGameState('intro');
        screen.classList.remove("animate-crt-flicker");
      }, 800);
    } else {
      setGameState('intro');
    }
  };

  const addScore = (amount: number) => {
    setScore(s => s + amount);
  };

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    addScore(5000);

    setTimeout(() => {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: ['#ff00ff', '#00ffff', '#ffff00'] });
      setGameState('ending');
    }, 2500);
  };

  return (
    <div id="arcade-screen" className="min-h-screen bg-black text-white overflow-x-hidden font-mono selection:bg-pink-500/30 crt-overlay">

      <style dangerouslySetInnerHTML={{__html: `
        .crt-overlay::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 999;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
        }
        @keyframes crtFlicker {
          0% { opacity: 0.8; transform: scale(1.02); }
          50% { opacity: 0.1; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-crt-flicker {
          animation: crtFlicker 0.4s infinite;
        }
        .pixel-shadow {
          box-shadow: 4px 4px 0px rgba(0,0,0,0.5);
        }
      `}} />

      <AnimatePresence mode="wait">

        {gameState === 'boot' && (
          <motion.div key="boot" className="min-h-screen flex flex-col items-center justify-center p-4 relative">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center space-y-8">
              <pre className="text-green-500 font-bold text-[8px] md:text-sm leading-tight text-left mx-auto w-fit">
{`██████╗ ██╗██████╗ ████████╗██╗  ██╗
██╔══██╗██║██╔══██╗╚══██╔══╝██║  ██║
██████╔╝██║██████╔╝   ██║   ███████║
██╔══██╗██║██╔══██╗   ██║   ██╚══██║
██████╔╝██║██║  ██║   ██║   ██║  ██║
╚═════╝ ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝`}
              </pre>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-blue-400 tracking-widest text-sm md:text-base">
                A SPECIAL GAME HAS BEEN CREATED FOR YOU
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-2xl font-bold text-yellow-400">
                PLAYER 1: {data.recipientName.toUpperCase()}
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="pt-12">
                <h2 className="text-4xl font-black text-pink-500 mb-8 animate-pulse">INSERT COIN</h2>
                <button
                  onClick={startGame}
                  className="px-8 py-3 bg-white text-black font-black text-xl hover:bg-yellow-400 hover:text-black border-4 border-white transition-colors pixel-shadow"
                >
                  START GAME
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {gameState !== 'boot' && (
          <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pb-32">
            <HUD score={score} level={level} />

            <AnimatePresence>
              {activeDialogue && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <DialogueBox
                    text={activeDialogue.text}
                    speaker={activeDialogue.speaker}
                    onClose={() => setActiveDialogue(null)}
                  />
                </div>
              )}
            </AnimatePresence>

            <div className="max-w-4xl mx-auto px-4 pt-32 space-y-48">

              {(gameState === 'intro' || gameState === 'level1' || gameState === 'level2' || gameState === 'boss' || gameState === 'ending') && (
                <section className="min-h-[50vh] flex flex-col items-center justify-center relative">
                  <div className="text-center mb-12">
                    <h2 className="text-blue-400 text-xl font-bold mb-2">LEVEL 01</h2>
                    <h1 className="text-4xl md:text-5xl font-black text-white pixel-shadow drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">THE DAY YOU ARRIVED</h1>
                  </div>

                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-16 h-20 bg-pink-500 border-4 border-white shadow-[8px_8px_0_#000] relative mb-12 flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      setActiveDialogue({ speaker: "SYSTEM", text: "Welcome to your game.\nScroll down to explore!" });
                      addScore(50);
                    }}
                  >
                     <div className="absolute top-2 left-2 w-3 h-3 bg-white" />
                     <div className="absolute top-2 right-2 w-3 h-3 bg-white" />
                     <Gamepad2 className="text-white mt-4" />
                  </motion.div>

                  <div className="w-full max-w-xl">
                    <DialogueBox speaker="NARRATOR" text={`Hey Player 1...\nToday isn't an ordinary day.\nIt's your birthday.\n\nHAPPY BIRTHDAY, ${data.recipientName.toUpperCase()}! 🎮`} />
                  </div>
                </section>
              )}

              <section className="min-h-screen relative pt-20">
                <div className="text-center mb-16">
                  <h2 className="text-green-400 text-xl font-bold mb-2">LEVEL 02</h2>
                  <h1 className="text-4xl md:text-5xl font-black text-white pixel-shadow">MEMORY LANE</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                   {memories.map((mem, i) => {
                     const isCollected = collectedMemories.includes(i);
                     return (
                       <div key={i} className="flex flex-col items-center relative group">
                          <motion.button
                            animate={isCollected ? { y: -50, opacity: 0, scale: 0 } : (shouldReduceMotion ? {} : { y: [0, -10, 0] })}
                            transition={isCollected ? { duration: 0.5 } : { repeat: Infinity, duration: 2 + i * 0.2 }}
                            onClick={() => {
                              if (!isCollected) {
                                setCollectedMemories(prev => [...prev, i]);
                                addScore(100);
                                setActiveDialogue({ speaker: "MEMORY UNLOCKED", text: `${mem.title} (${mem.date})\n\n"${mem.text}"` });
                              }
                            }}
                            className="w-24 h-24 bg-yellow-400 border-4 border-white pixel-shadow flex items-center justify-center relative cursor-pointer hover:bg-yellow-300"
                          >
                             <div className="text-black font-black text-4xl">?</div>
                             <div className="absolute -bottom-8 whitespace-nowrap text-xs font-bold text-yellow-400 opacity-0 group-hover:opacity-100 bg-black p-1 border border-yellow-400">TAP TO COLLECT</div>
                          </motion.button>

                          <div className="w-32 h-6 bg-green-600 border-t-4 border-green-400 border-x-4 border-x-green-800 border-b-4 border-b-green-900 mt-4" />
                       </div>
                     );
                   })}
                </div>

                <div className="absolute bottom-20 right-10">
                   <button
                    onClick={() => {
                      addScore(500);
                      setActiveDialogue({ speaker: "SECRET AREA", text: secrets[0] });
                      confetti({ particleCount: 50, spread: 40, colors: ['#22c55e'] });
                    }}
                    className="w-12 h-12 bg-green-900/50 border-2 border-green-800 border-dashed hover:bg-green-800/80 cursor-pointer text-transparent hover:text-green-400 flex items-center justify-center text-xs"
                   >
                     _
                   </button>
                </div>
              </section>

              <section className="min-h-screen relative pt-20">
                <div className="text-center mb-16">
                  <h2 className="text-pink-400 text-xl font-bold mb-2">BONUS STAGE</h2>
                  <h1 className="text-4xl md:text-5xl font-black text-white pixel-shadow">POWER-UPS</h1>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                  {powerups.map((pu, i) => {
                    const Icon = pu.type === 'heart' ? Heart : pu.type === 'star' ? Star : pu.type === 'shield' ? Shield : Zap;
                    const isCollected = collectedPowerups.includes(i);

                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          if (!isCollected) {
                            setCollectedPowerups(prev => [...prev, i]);
                            addScore(250);
                            setActiveDialogue({ speaker: `POWER UP: ${pu.name.toUpperCase()}`, text: pu.wish });
                            confetti({ particleCount: 30, spread: 60 });
                          }
                        }}
                        className={`w-32 h-32 md:w-40 md:h-40 border-4 border-white pixel-shadow flex flex-col items-center justify-center gap-2 transition-colors ${
                          isCollected ? 'bg-gray-800 text-gray-600 cursor-default' : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
                        }`}
                      >
                         <Icon className={`w-12 h-12 ${isCollected ? 'text-gray-600 fill-gray-600' : 'text-yellow-400 fill-yellow-400'}`} />
                         <span className="font-bold text-xs md:text-sm text-center px-2">{pu.name}</span>
                         {isCollected && <span className="text-xs text-green-400 mt-2 font-bold">+250</span>}
                      </motion.button>
                    );
                  })}
                </div>
              </section>

              <section className="min-h-screen flex flex-col items-center justify-center relative pt-20">
                <div className="text-center mb-16">
                  <h2 className="text-red-500 text-xl font-bold mb-2 animate-pulse">FINAL LEVEL</h2>
                  <h1 className="text-4xl md:text-5xl font-black text-white pixel-shadow">THE BIRTHDAY BOSS</h1>
                  <p className="mt-4 text-yellow-400 font-bold">FINAL CHALLENGE: MAKE A WISH</p>
                </div>

                <div className="relative flex flex-col items-center">
                   <div className="flex gap-4 mb-1 z-10">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="flex flex-col items-center relative">
                          {!candlesBlown && (
                            <motion.div animate={{ y: [0, -2, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }} className="absolute -top-6">
                              <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                            </motion.div>
                          )}
                          {candlesBlown && (
                            <div className="absolute -top-8 w-2 h-6 bg-gray-500/50 animate-pulse rounded-full blur-[1px]" />
                          )}
                          <div className="w-3 h-8 bg-white border-2 border-gray-300" />
                       </div>
                     ))}
                   </div>
                   <div className="w-40 h-16 bg-pink-500 border-4 border-white pixel-shadow relative z-20 flex items-center justify-center">
                     <div className="absolute top-0 w-full h-4 bg-pink-300 border-b-4 border-white" />
                   </div>
                   <div className="w-56 h-24 bg-purple-600 border-4 border-white pixel-shadow relative z-10 flex items-center justify-center overflow-hidden">
                     <div className="absolute top-0 w-full h-6 bg-purple-400 border-b-4 border-white" />
                     <span className="text-white font-black text-4xl opacity-50">{data.age || "P1"}</span>
                   </div>
                   <div className="w-72 h-8 bg-gray-300 border-4 border-white mt-1 pixel-shadow rounded-sm" />
                </div>

                <div className="mt-16 h-24">
                  {!candlesBlown ? (
                    <button
                      onClick={handleBlowCandles}
                      className="px-8 py-4 bg-red-500 text-white font-black text-xl md:text-2xl hover:bg-red-400 border-4 border-white pixel-shadow active:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0.5)] transition-all"
                    >
                      TAP TO BLOW
                    </button>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                       <h2 className="text-4xl font-black text-green-400 animate-pulse">LEVEL COMPLETE! 🎉</h2>
                       <p className="mt-4 text-white">Wish unlocked.</p>
                    </motion.div>
                  )}
                </div>
              </section>

              {gameState === 'ending' && (
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="min-h-screen flex flex-col items-center justify-center relative bg-blue-950 p-4 border-8 border-double border-white"
                >
                  <div className="text-center space-y-12 w-full max-w-2xl">
                     <div>
                       <h1 className="text-3xl md:text-5xl font-black text-yellow-400 mb-4">GAME COMPLETE</h1>
                       <h2 className="text-2xl font-bold text-white">HAPPY BIRTHDAY, {data.recipientName.toUpperCase()}!</h2>
                     </div>

                     <div className="bg-black border-4 border-white p-6 text-left space-y-4">
                        <div className="text-center text-pink-500 font-bold mb-6">HIGH SCORES / ACHIEVEMENTS</div>

                        <div className="flex justify-between border-b border-gray-800 pb-2">
                          <span className="text-gray-400">FINAL SCORE</span>
                          <span className="text-yellow-400 font-bold">{score.toString().padStart(6, '0')}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-800 pb-2">
                          <span className="text-gray-400">MEMORIES FOUND</span>
                          <span className="text-green-400 font-bold">{collectedMemories.length} / {memories.length}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-800 pb-2">
                          <span className="text-gray-400">POWER-UPS</span>
                          <span className="text-blue-400 font-bold">{collectedPowerups.length} / {powerups.length}</span>
                        </div>
                        {cheatActivated && (
                          <div className="flex justify-between border-b border-gray-800 pb-2">
                            <span className="text-pink-500 font-bold">★ CHEAT CODE</span>
                            <span className="text-pink-500 font-bold">ACTIVATED</span>
                          </div>
                        )}
                     </div>

                     <div className="space-y-6 bg-white text-black p-6 border-4 border-blue-500 pixel-shadow">
                       <h3 className="font-black text-xl text-blue-600">THIS IS NOT GAME OVER.</h3>
                       <p className="text-sm font-bold">&quot;It&apos;s just the beginning of another year.&quot;</p>
                       <p className="text-base whitespace-pre-line border-t-2 border-dashed border-gray-300 pt-4">
                         {data.message}
                       </p>
                       <p className="text-right text-sm font-bold text-gray-500 mt-4">— {data.senderName}</p>
                     </div>

                     <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-3 bg-yellow-400 text-black font-black hover:bg-white border-4 border-white pixel-shadow animate-pulse"
                     >
                       PRESS START TO PLAY AGAIN
                     </button>
                  </div>
                </motion.section>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
