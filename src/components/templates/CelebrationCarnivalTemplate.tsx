"use client";

import { useState, useEffect, useRef } from "react";
import { type WishData } from "@/lib/config";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import confetti from "canvas-confetti";
import { PartyPopper, Flame, Sparkles, Gift, Image as ImageIcon, Ticket, MessageCircleHeart } from "lucide-react";

interface TemplateProps {
  data: WishData;
  slug: string;
}

// Helper to safely parse JSON strings from URL
function safeParse(jsonString: string | undefined, fallback: unknown) {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}

// Confetti levels
const triggerConfetti = (level: "small" | "medium" | "huge", x = 0.5, y = 0.5) => {
  const count = level === "small" ? 20 : level === "medium" ? 80 : 250;
  const spread = level === "small" ? 40 : level === "medium" ? 70 : 120;

  if (level === "huge") {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
    }, 250);
  } else {
    confetti({
      particleCount: count,
      spread: spread,
      origin: { x, y },
      colors: ['#3B82F6', '#EC4899', '#F59E0B', '#10B981', '#8B5CF6', '#F43F5E']
    });
  }
};

// --- Custom Cursor ---
const Cursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (position.x === -100) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: clicked ? 0.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.1 }}
    >
      <Sparkles size={24} />
    </motion.div>
  );
};

const FloatingBalloon = ({ id, msg, delay, colorClass, isPopped, onPop, shouldReduceMotion }: { id: number, msg: string, delay: number, colorClass: string, isPopped: boolean, onPop: (id: number, rect: DOMRect) => void, shouldReduceMotion: boolean | null }) => {


    if (isPopped) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="absolute z-20 bg-white/90 text-slate-800 p-3 rounded-xl shadow-xl text-sm font-medium border border-indigo-100 max-w-[150px] text-center"
        >
          {msg}
        </motion.div>
      );
    }

    return (
      <motion.button
        animate={shouldReduceMotion ? {} : { y: [0, -15, 0], x: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4 + delay, ease: "easeInOut" }}
        className="relative group cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          onPop(id, rect);
        }}
      >
        <div className={`w-16 h-20 rounded-[50%] ${colorClass} shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.2)] relative flex items-center justify-center after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:bg-current after:[clip-path:polygon(50%_0,0_100%,100%_100%)`} />
        <div className="w-0.5 h-24 bg-white/30 mx-auto -mt-1 origin-top" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-xs font-bold drop-shadow-md bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">POP!</span>
        </div>
      </motion.button>
    );
  };


export function CelebrationCarnivalTemplate({ data, slug }: TemplateProps) {
  const shouldReduceMotion = useReducedMotion();

  // Stages: 'door' -> 'reveal' -> 'party' -> 'surprise' -> 'finale'
  const [stage, setStage] = useState<'door' | 'reveal' | 'party' | 'surprise' | 'finale'>('door');

  // Data extraction
  const wishes = safeParse(data.carnivalWishes, ["More adventures", "More laughter", "More unforgettable moments"]);
  const fortunes = safeParse(data.carnivalFortunes, ["find more reasons to laugh", "make a memory you'll talk about for years", "have your best year yet"]);
  const memories = safeParse(data.carnivalMemories, [{ text: "That time we laughed until it hurt." }, { text: "Our favorite adventure together." }]);
  const guestMessages = safeParse(data.carnivalGuestMessages, [{ sender: "Someone who loves you", message: "Never forget how many people are rooting for you.", relationship: "Friend" }]);

  // Party state
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishesExploded, setWishesExploded] = useState(false);
  const [activeMemory, setActiveMemory] = useState<number | null>(null);
  const [fortuneRevealed, setFortuneRevealed] = useState<string | null>(null);
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [boxOpen, setBoxOpen] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Door interaction
  const handleOpenDoor = () => {
    setStage('reveal');
    triggerConfetti("medium");
    setTimeout(() => {
      setStage('party');
    }, 4500);
  };

  // Blow candles
  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    setTimeout(() => {
      triggerConfetti("huge");
      setWishesExploded(true);
    }, 1000);
  };

  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  const handleSurprise = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setCountdown(3);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          setStage('surprise');
          triggerConfetti("huge");
          setTimeout(() => {
            setStage('finale');
          }, 5000);
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  // --- Components ---



  return (
    <div className="min-h-screen bg-[#0B0F19] text-white relative overflow-hidden font-sans selection:bg-pink-500/30 cursor-default">
      <Cursor />

      <AnimatePresence mode="wait">
        {stage === 'door' && (
          <motion.div
            key="door"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "brightness(2)" }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#050810] z-50 px-4"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 italic mb-4"
            >
              Psst... this party is waiting for someone.
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-3xl md:text-5xl font-black text-white mb-12 text-center"
            >
              Is that you, {data.recipientName}?
            </motion.h2>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5 }}
              onClick={handleOpenDoor}
              className="group relative px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white font-bold tracking-widest uppercase transition-all overflow-hidden"
            >
              <span className="relative z-10">Open the Party 🎉</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </motion.div>
        )}

        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            className="absolute inset-0 flex items-center justify-center z-40 bg-[#0B0F19]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", duration: 1.5, bounce: 0.4 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-500 to-purple-600 drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                HAPPY BIRTHDAY,<br/>{data.recipientName.toUpperCase()}! 🎉
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-6 text-xl text-slate-300"
              >
                Okay... now the party can officially begin.
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {(stage === 'party' || stage === 'surprise' || stage === 'finale') && (
          <motion.div
            key="party"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`min-h-screen w-full relative pt-12 pb-32 transition-colors duration-1000 ${candlesBlown && !wishesExploded ? 'bg-slate-900/90' : 'bg-transparent'}`}
          >
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-900/40 to-transparent" />
              <svg className="absolute top-0 w-full h-32 opacity-60" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,20 Q25,60 50,20 T100,20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <circle cx="25" cy="40" r="1" fill="#FBBF24" className="animate-pulse" />
                <circle cx="75" cy="40" r="1" fill="#60A5FA" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                <circle cx="50" cy="20" r="1" fill="#F472B6" className="animate-pulse" style={{ animationDelay: '1s' }} />
              </svg>
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 space-y-32">
              <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center pt-20">
                <div className="absolute top-10 left-10"><FloatingBalloon id={1} msg="You're amazing!" delay={0} colorClass="bg-pink-500" isPopped={poppedBalloons.includes(1)} onPop={(id, rect) => { triggerConfetti("small", (rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight); setPoppedBalloons(prev => [...prev, id]); }} shouldReduceMotion={shouldReduceMotion} /></div>
                <div className="absolute top-32 right-10 md:right-32"><FloatingBalloon id={2} msg="Hope you smile today!" delay={1.5} colorClass="bg-purple-500" isPopped={poppedBalloons.includes(2)} onPop={(id, rect) => { triggerConfetti("small", (rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight); setPoppedBalloons(prev => [...prev, id]); }} shouldReduceMotion={shouldReduceMotion} /></div>
                <div className="absolute bottom-0 left-32 md:left-48"><FloatingBalloon id={3} msg="Pop!" delay={0.7} colorClass="bg-amber-400" isPopped={poppedBalloons.includes(3)} onPop={(id, rect) => { triggerConfetti("small", (rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight); setPoppedBalloons(prev => [...prev, id]); }} shouldReduceMotion={shouldReduceMotion} /></div>
                <div className="absolute top-20 right-4"><FloatingBalloon id={4} msg={data.nickname ? `Favorite ${data.nickname}!` : "Keep shining!"} delay={2.2} colorClass="bg-blue-500" isPopped={poppedBalloons.includes(4)} onPop={(id, rect) => { triggerConfetti("small", (rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight); setPoppedBalloons(prev => [...prev, id]); }} shouldReduceMotion={shouldReduceMotion} /></div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl z-10 max-w-2xl w-full"
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                    Happy Birthday, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-300">{data.recipientName}</span> ❤️
                  </h2>
                  <div className="space-y-6 text-lg md:text-xl text-slate-300 font-medium leading-relaxed text-left">
                    {data.message.split('\n').map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 + 0.5 }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 text-right text-pink-400 font-bold">
                    — {data.senderName}
                  </div>
                </motion.div>
              </section>

              <section className="relative flex flex-col items-center py-20">
                <div className="text-center mb-16">
                  <h3 className="text-sm tracking-widest uppercase text-slate-400 mb-2">The Birthday Table</h3>
                  <h2 className="text-3xl font-bold text-white">Make a Wish ✨</h2>
                </div>

                <div className="relative w-full max-w-lg flex flex-col items-center">
                  <div className="absolute -left-10 md:left-0 top-20">
                    <button
                      className={`relative p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 hover:scale-110 transition-transform ${boxOpen ? 'scale-110' : ''}`}
                      onClick={() => {
                        setBoxOpen(true);
                        if (!boxOpen) triggerConfetti("small");
                      }}
                    >
                      <Gift className={`w-10 h-10 ${boxOpen ? 'text-amber-300' : 'text-pink-400'}`} />
                      {boxOpen && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -40 }} className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                          {data.giftBoxSurprise || "A box full of love!"}
                        </motion.div>
                      )}
                    </button>
                  </div>

                  <div className="relative w-64 h-64 flex flex-col items-center justify-end z-10 mb-12">
                    <div className="flex gap-4 mb-2 z-20">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col items-center relative">
                          {!candlesBlown && (
                            <motion.div
                              animate={{ y: [0, -3, 0], scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ repeat: Infinity, duration: 0.8 + i * 0.2 }}
                              className="text-amber-400 absolute -top-8"
                            >
                              <Flame className="w-8 h-8 fill-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
                            </motion.div>
                          )}
                          {candlesBlown && !wishesExploded && (
                             <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0, y: -20 }} transition={{ duration: 1 }} className="absolute -top-8 w-1 h-8 bg-gray-400/50 blur-sm rounded-full" />
                          )}
                          <div className="w-3 h-10 bg-gradient-to-b from-indigo-200 to-indigo-400 rounded-sm border border-indigo-300 shadow-sm" />
                        </div>
                      ))}
                    </div>
                    <div className="w-48 h-16 bg-gradient-to-r from-pink-400 via-pink-300 to-pink-500 rounded-t-xl rounded-b-md shadow-[inset_0_-5px_10px_rgba(0,0,0,0.1)] relative z-10 border-b border-pink-600">
                      <div className="absolute top-0 w-full h-4 bg-white/40 rounded-t-xl" />
                    </div>
                    <div className="w-56 h-20 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 rounded-t-md rounded-b-xl shadow-xl relative z-0 border-b-4 border-purple-800">
                      <div className="absolute top-0 w-full h-4 bg-white/30 rounded-t-md" />
                      <div className="absolute inset-0 flex items-center justify-center text-white/30 text-4xl overflow-hidden font-black">
                        {data.age || ""}
                      </div>
                    </div>
                    <div className="w-72 h-6 bg-slate-200 rounded-[50%] -mt-3 shadow-2xl border-b-4 border-slate-400" />
                  </div>

                  {!candlesBlown ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBlowCandles}
                      className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(99,102,241,0.4)] border border-indigo-400"
                    >
                      Blow them out 💨
                    </motion.button>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-300 font-bold text-xl flex flex-col items-center gap-2">
                      <span>Wish made. ✨</span>
                      <span className="text-slate-400 text-sm">I hope it comes true.</span>
                    </motion.div>
                  )}

                  {wishesExploded && (
                    <div className="absolute inset-0 pointer-events-none z-50">
                      {wishes.map((wish: string, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.5, y: 100, x: 0 }}
                          animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0.5, 1, 1.1, 0.9],
                            y: -200 - ((i * 47) % 200),
                            x: ((i * 113 % 400) - 200)
                          }}
                          transition={{ duration: 4, delay: i * 0.4, ease: "easeOut" }}
                          className="absolute bottom-1/2 left-1/2 font-bold text-lg text-white whitespace-nowrap bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
                        >
                          {wish} ✨
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              <section className="py-20 relative">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                    <Ticket className="text-amber-400" /> A Few Memories
                  </h2>
                </div>

                <div className="relative">
                  <div className="absolute top-10 w-full h-[1px] bg-white/20 border-b border-dashed border-white/10" />

                  <div className="flex flex-wrap justify-center gap-6 relative z-10 px-4">
                    {memories.map((mem: { text: string }, i: number) => {
                      const isActive = activeMemory === i;
                      return (
                        <motion.div
                          key={i}
                          layout
                          onClick={() => setActiveMemory(isActive ? null : i)}
                          className={`cursor-pointer ${isActive ? 'fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4' : 'relative group'}`}
                        >
                          <motion.div
                            layoutId={`mem-${i}`}
                            className={`bg-white p-4 pb-12 shadow-xl ${isActive ? 'w-full max-w-md rounded-xl' : 'w-48 h-56 rounded-sm rotate-[-3deg] group-hover:rotate-0 transition-transform'}`}
                            style={!isActive ? { rotate: i % 2 === 0 ? '-3deg' : '4deg' } : {}}
                          >
                            <div className={`bg-slate-100 flex items-center justify-center border border-slate-200 ${isActive ? 'h-64 rounded-lg' : 'h-32'}`}>
                               <ImageIcon className="w-12 h-12 text-slate-300" />
                            </div>
                            <div className={`mt-4 text-center font-medium text-slate-800 ${isActive ? 'text-xl' : 'text-sm line-clamp-2'}`}>
                              {mem.text}
                            </div>

                            {!isActive && (
                               <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 shadow-[inset_0_-2px_4px_rgba(255,255,255,0.5)] border border-slate-700" />
                            )}
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </section>

              <section className="py-20 flex flex-col items-center">
                <div className="bg-gradient-to-b from-indigo-900 to-purple-900 p-8 rounded-3xl border-4 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.2)] max-w-sm w-full text-center relative overflow-hidden">
                   <div className="absolute top-0 inset-x-0 h-2 bg-amber-500" />
                   <h2 className="text-2xl font-black text-amber-400 mb-6 uppercase tracking-wider">The Birthday Fortune Machine</h2>

                   <div className="bg-black/50 rounded-xl p-6 mb-8 min-h-[120px] flex items-center justify-center border border-white/10 relative">
                      <AnimatePresence mode="wait">
                        {fortuneRevealed ? (
                           <motion.div key={fortuneRevealed} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-lg text-white font-medium">
                              &quot;This year, you&apos;re going to {fortuneRevealed}.&quot;
                           </motion.div>
                        ) : (
                           <motion.div key="empty" className="text-slate-500 text-4xl animate-pulse">
                              🔮
                           </motion.div>
                        )}
                      </AnimatePresence>
                   </div>

                   <button
                    onClick={() => {
                      setFortuneRevealed(null);
                      setTimeout(() => {
                        const random = fortunes[Math.floor(Math.random() * fortunes.length)];
                        setFortuneRevealed(random);
                        triggerConfetti("small");
                      }, 600);
                    }}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black uppercase rounded-full w-full transition-colors active:scale-95 shadow-[0_4px_0_#B45309]"
                   >
                     Reveal My Wish
                   </button>
                </div>
              </section>

              {guestMessages && guestMessages.length > 0 && (
                <section className="py-20">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                      <MessageCircleHeart className="text-pink-400" /> Messages From Your Little Party
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                     {guestMessages.map((msg: { message: string, sender: string, relationship: string }, i: number) => (
                       <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl relative"
                       >
                         <PartyPopper className="absolute top-4 right-4 text-white/10 w-12 h-12" />
                         <p className="text-lg text-slate-200 mb-6 italic">&quot;{msg.message}&quot;</p>
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center font-bold text-white">
                              {msg.sender.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-white">{msg.sender}</p>
                              <p className="text-xs text-pink-400 uppercase tracking-wider">{msg.relationship}</p>
                            </div>
                         </div>
                       </motion.div>
                     ))}
                  </div>
                </section>
              )}

              <button
                onClick={(e) => {
                  triggerConfetti("medium", e.clientX / window.innerWidth, e.clientY / window.innerHeight);
                  alert(`You found a hidden surprise!\n\n"${data.carnivalHiddenMessages ? safeParse(data.carnivalHiddenMessages, [''])[0] : 'You make the world a better place.'}"`);
                }}
                className="fixed bottom-4 left-4 text-white/20 hover:text-white/50 transition-colors"
                title="Secret Button"
              >
                <Sparkles className="w-6 h-6" />
              </button>

            </div>

            {stage === 'party' && (
              <div className="text-center mt-32 pb-32">
                <button
                  onClick={handleSurprise}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm border border-white/20 font-bold text-white transition-all"
                >
                  Ready for one last surprise?
                </button>
              </div>
            )}
          </motion.div>
        )}

        {(countdown !== null || stage === 'surprise') && (
          <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-black/60 backdrop-blur-sm">
             {countdown !== null && countdown > 0 && (
                <motion.div
                  key={countdown}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  className="text-9xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                >
                  {countdown}
                </motion.div>
             )}
             {stage === 'surprise' && (
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-amber-400 to-indigo-500 drop-shadow-[0_0_50px_rgba(251,191,36,0.8)]"
                >
                  SURPRISE! 🎉
                </motion.div>
             )}
          </div>
        )}

        {stage === 'finale' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 z-[110] bg-[#050810] flex flex-col items-center justify-center p-8 text-center"
          >
             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-slate-400 italic mb-8">
               Every party eventually gets quiet...<br/>...but I hope this little moment stays with you.
             </motion.p>

             <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 }} className="text-4xl md:text-6xl font-black text-white mb-6">
               Happy Birthday, {data.recipientName} ❤️
             </motion.h1>

             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }} className="max-w-2xl text-lg text-slate-300 leading-relaxed mb-12">
               May this year give you countless reasons to laugh, people who make you feel loved, adventures worth remembering, and moments that make you genuinely grateful to be alive.
             </motion.p>

             <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }}
                onClick={() => {
                  setStage('party');
                  setCountdown(null);
                  triggerConfetti("small");
                }}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full font-bold border border-white/20 transition-all flex items-center gap-2"
             >
               Celebrate Again 🎉
             </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
