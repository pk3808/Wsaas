"use client";

import { useState, useEffect, useRef } from "react";
import { type WishData } from "@/lib/config";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Star, Mail } from "lucide-react";

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

// Custom hook for mouse parallax
function useMouseParallax(multiplier: number = 10) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * multiplier;
      const y = (e.clientY / window.innerHeight - 0.5) * multiplier;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [multiplier]);
  return offset;
}

// Background Star Canvas (Performance friendly)
const StarCanvas = ({ opacity = 1 }: { opacity?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5,
      alpha: Math.random(),
      speed: (Math.random() * 0.02) + 0.005,
    }));

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.speed = -star.speed;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 215, ${Math.abs(star.alpha)})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ opacity }} className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000" />;
};

const StarfieldTransition = () => {
  const [stars, setStars] = useState<{ x: number, y: number, dur: number }[]>([]);
  useEffect(() => {
    // delay logic slightly to avoid synchronous setState warning
    const timeoutId = setTimeout(() => {
      const newStars = [...Array(50)].map(() => ({
        x: (Math.random() - 0.5) * window.innerWidth,
        y: (Math.random() - 0.5) * window.innerHeight,
        dur: 1 + Math.random() * 2
      }));
      setStars(newStars);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {stars.map((star, i) => (
        <motion.div
          key={i}
          initial={{ z: -1000, opacity: 0, x: star.x, y: star.y }}
          animate={{ z: 1000, opacity: [0, 1, 0] }}
          transition={{ duration: star.dur, repeat: Infinity, ease: "linear" }}
          className="absolute w-1 h-1 bg-yellow-100 rounded-full"
          style={{ filter: "blur(1px)" }}
        />
      ))}
    </>
  );
};

export function StarryNight({ data }: TemplateProps) {
  const shouldReduceMotion = useReducedMotion();

  const [stage, setStage] = useState<'door' | 'transition' | 'sky'>('door');
  const [activeModal, setActiveModal] = useState<{ type: string, content: { title?: string, text?: string } | string } | null>(null);

  const parallax = useMouseParallax(15);
  const { scrollYProgress } = useScroll();

  // Transform values for scrolling
  const moonY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const moonScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.4]); // Gets lighter/darker slightly

  const wishes = safeParse(data.starryWishes, [
    "May happiness find you even in the smallest moments.",
    "May there always be another horizon waiting for you.",
    "May you always have the courage to choose the life you truly want."
  ]) as string[];

  const memories = safeParse(data.starryMemories, [
    { title: "One of my favorite memories.", text: "When we lost track of time talking until the sun came up." },
    { title: "A moment I'll never forget.", text: "The day you proved just how incredibly strong you are." }
  ]) as { title: string, text: string }[];

  const letters = safeParse(data.starryLetters, [
    "If I could freeze one thing in time, it would be all the moments we've laughed together."
  ]) as string[];

  const handleEnterNight = () => {
    setStage('transition');
    setTimeout(() => {
      setStage('sky');
    }, 4000);
  };

  const fireCelestialConfetti = () => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100, colors: ['#FDE047', '#FEF08A', '#FFFFFF'] };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 }, shapes: ['star'] });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden font-serif selection:bg-indigo-500/30">

      <AnimatePresence mode="wait">
        {/* --- 1. THE BEGINNING --- */}
        {stage === 'door' && (
          <motion.div
            key="door"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#01030B]"
          >
            {/* Initial tiny star */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1], scale: 1 }}
              transition={{ duration: 3, delay: 1 }}
              className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff] mb-12"
            />

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 2 }}
              className="text-center space-y-6 max-w-md px-4"
            >
              <p className="italic text-lg md:text-xl text-slate-400">&quot;Tonight, the stars have something to tell you...&quot;</p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7, duration: 2 }} className="italic text-lg md:text-xl text-slate-400">
                &quot;They&apos;ve been waiting for you.&quot;
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 10, duration: 2 }} className="pt-8 space-y-8">
                <p className="text-2xl font-light text-indigo-200">For {data.recipientName} ✨</p>
                <button
                  onClick={handleEnterNight}
                  className="px-6 py-2 text-sm uppercase tracking-widest text-indigo-300 hover:text-white border border-indigo-900/50 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:bg-indigo-900/20 rounded-full transition-all duration-700"
                >
                  Enter the night
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* --- 2. CINEMATIC TRANSITION --- */}
        {stage === 'transition' && (
          <motion.div key="transition" className="fixed inset-0 z-40 bg-[#01030B] flex items-center justify-center overflow-hidden">
             {/* Simulating flying through stars */}
             {stage === 'transition' && <StarfieldTransition />}
          </motion.div>
        )}

        {/* --- 3. THE NIGHT SKY --- */}
        {stage === 'sky' && (
          <motion.div key="sky" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }} className="relative min-h-[500vh]">
            <StarCanvas opacity={1} />

            {/* Ambient Background Gradient tied to scroll */}
            <motion.div
              className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-b from-transparent to-indigo-900/20"
              style={{ opacity: bgOpacity }}
            />

            {/* Parallax Moon Container */}
            <div className="fixed inset-0 pointer-events-none z-0 flex items-start justify-center pt-32">
              <motion.div
                style={{ y: moonY, scale: moonScale, x: parallax.x * 0.5 }}
                className="w-48 h-48 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#FFFCE0] to-[#E0D4A0] shadow-[0_0_100px_rgba(255,252,224,0.3),inset_-20px_-20px_40px_rgba(0,0,0,0.1)] relative"
              >
                {/* Moon craters texture simulation */}
                <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-black/5 rounded-full blur-sm" />
                <div className="absolute bottom-1/3 right-1/4 w-12 h-10 bg-black/10 rounded-full blur-md" />
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-black/5 rounded-full blur-md" />
              </motion.div>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 w-full max-w-3xl mx-auto px-6">

              {/* SECTION: First Big Reveal */}
              <section className="h-screen flex flex-col items-center justify-center text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 2 }}
                  className="text-4xl md:text-6xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-200 mb-6 drop-shadow-sm"
                >
                  Happy Birthday,<br/><span className="font-serif italic font-medium">{data.recipientName} ✨</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 1 }}
                  className="text-lg md:text-xl text-indigo-200/80 italic font-light"
                >
                  &quot;Tonight, the whole sky belongs to you.&quot;
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 2 }} className="absolute bottom-10 animate-bounce text-indigo-400/50">
                   ↓ Scroll to follow the stars
                </motion.div>
              </section>

              {/* SECTION: Constellation of Wishes */}
              <section className="min-h-screen flex flex-col justify-center py-32 space-y-32">
                <div className="text-center">
                  <h2 className="text-2xl font-light text-indigo-300 tracking-widest uppercase mb-4">Wishes Written in the Stars</h2>
                  <p className="text-slate-400 italic font-light">&quot;A wish for you...&quot;</p>
                </div>

                {wishes.map((wish, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ margin: "-20%" }}
                    transition={{ duration: 1.5 }}
                    className={`flex flex-col items-center ${i % 2 === 0 ? 'md:items-start' : 'md:items-end'} text-center md:text-left`}
                  >
                    <div className="relative group cursor-pointer" onClick={() => setActiveModal({ type: 'wish', content: wish })}>
                      {/* Abstract constellation dots */}
                      <div className="absolute -inset-10 opacity-30 group-hover:opacity-100 transition-opacity duration-1000">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <line x1="20" y1="50" x2="80" y2="20" stroke="#818CF8" strokeWidth="0.5" strokeDasharray="2,2" />
                          <circle cx="20" cy="50" r="2" fill="#FDE047" />
                          <circle cx="80" cy="20" r="2" fill="#FDE047" />
                        </svg>
                      </div>
                      <div className="p-8 bg-indigo-950/30 backdrop-blur-sm border border-indigo-500/20 rounded-full w-48 h-48 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.1)] hover:shadow-[0_0_50px_rgba(253,224,71,0.2)] transition-all duration-700">
                         <Sparkles className="w-8 h-8 text-yellow-200/50 group-hover:text-yellow-200 transition-colors duration-700" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </section>

              {/* SECTION: Memory Stars */}
              <section className="min-h-screen flex flex-col justify-center py-32">
                <div className="text-center mb-24">
                  <h2 className="text-2xl font-light text-indigo-300 tracking-widest uppercase mb-4">Memories That Still Shine</h2>
                  <p className="text-slate-400 italic font-light max-w-md mx-auto">
                    &quot;Some memories never really disappear. They simply become part of the story.&quot;
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-16 md:gap-32">
                   {memories.map((mem, i) => (
                     <motion.button
                       key={i}
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 1, delay: i * 0.2 }}
                       onClick={() => setActiveModal({ type: 'memory', content: mem })}
                       className="group flex flex-col items-center gap-4"
                     >
                       <div className="w-4 h-4 bg-yellow-100 rounded-full shadow-[0_0_15px_#FEF08A] group-hover:scale-150 transition-transform duration-700 relative">
                         <div className="absolute inset-0 bg-yellow-100 rounded-full animate-ping opacity-50" />
                       </div>
                       <span className="text-xs uppercase tracking-widest text-indigo-400/50 group-hover:text-indigo-300 transition-colors">Discover</span>
                     </motion.button>
                   ))}
                </div>
              </section>

              {/* SECTION: A Lake of Stars (Atmosphere) */}
              <section className="min-h-[80vh] flex flex-col items-center justify-center text-center relative py-32 border-y border-indigo-900/30">
                 {/* Simulate water reflection gradient */}
                 <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent pointer-events-none" />

                 <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} className="text-xl md:text-2xl font-light text-indigo-200/80 italic mb-6 relative z-10">
                   &quot;Some nights are too beautiful to rush through.&quot;
                 </motion.p>
                 <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }} className="text-slate-400 relative z-10">
                   &quot;So stay here for a moment.&quot;
                 </motion.p>

                 <div className="mt-20 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent relative z-10" />
              </section>

              {/* SECTION: Floating Letters */}
              {letters.length > 0 && (
                <section className="min-h-screen flex flex-col justify-center items-center text-center py-32">
                   <p className="text-slate-400 italic mb-16">A message drifting in the night...</p>
                   {letters.map((letter, i) => (
                     <motion.button
                       key={i}
                       animate={shouldReduceMotion ? {} : { y: [0, -20, 0], x: [0, 10, -10, 0] }}
                       transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                       onClick={() => setActiveModal({ type: 'letter', content: letter })}
                       className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-yellow-200/50 transition-all duration-500 group"
                     >
                       <Mail className="w-8 h-8 text-indigo-300 group-hover:text-yellow-200 transition-colors duration-500" />
                     </motion.button>
                   ))}
                </section>
              )}

              {/* SECTION: The Birthday Moon & Finale */}
              <section className="min-h-screen flex flex-col items-center justify-center text-center py-32 relative">
                 <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 3 }} className="space-y-12 relative z-20">
                   <div>
                     <h2 className="text-5xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-200 drop-shadow-[0_0_20px_rgba(253,224,71,0.3)]">
                       HAPPY BIRTHDAY
                     </h2>
                     <p className="text-2xl mt-4 text-indigo-200 font-serif italic">{data.recipientName}</p>
                   </div>

                   <div className="max-w-xl mx-auto p-8 bg-black/40 backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-2xl">
                     <p className="text-lg md:text-xl leading-loose font-light text-slate-300 whitespace-pre-line text-left">
                       {data.message}
                     </p>
                     <p className="text-right mt-8 text-indigo-300 italic">— {data.senderName}</p>
                   </div>

                   <button
                    onClick={fireCelestialConfetti}
                    className="px-8 py-3 rounded-full border border-yellow-200/30 text-yellow-200/70 hover:text-yellow-200 hover:bg-yellow-200/10 hover:border-yellow-200 transition-all duration-500 tracking-widest text-sm"
                   >
                     CELEBRATE ✨
                   </button>
                 </motion.div>
              </section>

              {/* FINAL SCENE */}
              <section className="min-h-[70vh] flex flex-col items-center justify-center text-center pb-32">
                 <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} className="text-slate-500 italic mb-4">
                   &quot;The night is getting quiet...&quot;
                 </motion.p>
                 <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, delay: 2 }} className="text-slate-400 italic mb-16">
                   &quot;But the stars will still be here.&quot;
                 </motion.p>

                 <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, delay: 4 }} className="text-xl text-indigo-300 font-light tracking-wider mb-8">
                   Until your next adventure. 🌙
                 </motion.p>
                 <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, delay: 6 }} className="flex flex-col items-center gap-4">
                   <p className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Happy Birthday ❤️</p>
                   <div className="w-1 h-1 bg-yellow-100 rounded-full shadow-[0_0_15px_#fff] mt-8 animate-pulse" />
                 </motion.div>
              </section>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODALS FOR INTERACTIVE ELEMENTS --- */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/90 backdrop-blur-md"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="max-w-lg w-full bg-indigo-950/40 border border-indigo-500/30 p-8 md:p-12 rounded-2xl shadow-[0_0_50px_rgba(79,70,229,0.1)] text-center relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent" />

              {activeModal.type === 'wish' && (
                <div className="space-y-6">
                  <Star className="w-8 h-8 mx-auto text-yellow-200/50" />
                  <p className="text-xl md:text-2xl font-light italic text-slate-200 leading-relaxed">
                    &quot;{typeof activeModal.content === "string" ? activeModal.content : ""}&quot;
                  </p>
                </div>
              )}

              {activeModal.type === 'memory' && (
                <div className="space-y-6">
                  <h3 className="text-sm tracking-widest uppercase text-indigo-300">{typeof activeModal.content !== "string" ? activeModal.content.title : ""}</h3>
                  <div className="w-full h-[1px] bg-indigo-500/20" />
                  <p className="text-lg text-slate-300 font-light leading-relaxed">
                    {typeof activeModal.content !== "string" ? activeModal.content.text : ""}
                  </p>
                </div>
              )}

              {activeModal.type === 'letter' && (
                <div className="space-y-6">
                  <Mail className="w-8 h-8 mx-auto text-indigo-300" />
                  <p className="text-lg font-serif italic text-slate-200 leading-relaxed whitespace-pre-line">
                    &quot;{typeof activeModal.content === "string" ? activeModal.content : ""}&quot;
                  </p>
                </div>
              )}

              <button onClick={() => setActiveModal(null)} className="mt-12 text-sm text-slate-500 hover:text-slate-300 tracking-widest uppercase transition-colors">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
