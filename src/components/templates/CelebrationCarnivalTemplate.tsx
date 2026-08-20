"use client";

import { useState } from "react";
import { type WishData } from "@/lib/config";
import { VisitorComments } from "@/components/VisitorComments";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { PartyPopper, Flame, Sparkles, Heart, Gift, Volume2 } from "lucide-react";

interface TemplateProps {
  data: WishData;
  slug: string;
}

export function CelebrationCarnivalTemplate({ data, slug }: TemplateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#3B82F6']
    });
  };

  const handleOpen = () => {
    setIsOpen(true);
    triggerConfetti();
  };

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    triggerConfetti();
    setTimeout(triggerConfetti, 300);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background Animated Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="sealed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="flex flex-col items-center gap-6 z-10"
          >
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full shadow-lg animate-bounce">
              <PartyPopper className="w-8 h-8 text-white" />
            </div>
            <button
              onClick={handleOpen}
              className="group relative px-8 py-10 bg-slate-900/80 backdrop-blur-xl border border-indigo-500/40 hover:border-pink-500/80 rounded-3xl shadow-2xl flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105"
            >
              <div className="p-5 rounded-2xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                <Gift className="w-12 h-12" />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Celebration Page</span>
                <h1 className="text-3xl font-extrabold capitalize mt-1 text-white">For {data.recipientName}</h1>
                <p className="text-xs text-slate-400 mt-2">Sent with ❤️ by {data.senderName}</p>
              </div>
              <div className="mt-2 text-xs font-bold text-pink-400 bg-pink-500/10 px-4 py-2 rounded-full border border-pink-500/20">
                Tap to Open Celebration 🎉
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl z-10 my-8 space-y-8"
          >
            {/* Main Card */}
            <div className="bg-slate-900/90 backdrop-blur-2xl border border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Sparkles className="w-48 h-48 text-indigo-400" />
              </div>

              <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Celebration Carnival 🎂
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-amber-300 capitalize">
                  Happy Birthday, <br />
                  <span>{data.recipientName}!</span>
                </h1>

                {data.age && (
                  <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                    🎈 Turning {data.age} Years Young! 🎈
                  </div>
                )}

                {/* Cake & Candles Blowout Interactive Area */}
                <div className="py-6 flex flex-col items-center gap-4">
                  <div className="relative p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center gap-4">
                    <div className="text-6xl">🎂</div>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          animate={candlesBlown ? { scale: 0.8 } : { y: [0, -3, 0] }}
                          transition={{ repeat: Infinity, duration: 1 + i * 0.2 }}
                          className="flex flex-col items-center"
                        >
                          <Flame
                            className={`w-6 h-6 transition-all duration-500 ${
                              candlesBlown
                                ? "text-slate-600 scale-50 opacity-20"
                                : "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                            }`}
                          />
                          <div className="w-2 h-8 bg-indigo-300 rounded-t-sm" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleBlowCandles}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2"
                  >
                    {candlesBlown ? "Candles Blown! 🎉" : "Blow Out Birthday Candles 🕯️"}
                  </button>
                </div>

                {/* Personal Message */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left space-y-3">
                  <p className="text-xs uppercase font-bold text-indigo-400 tracking-wider">A Special Note from {data.senderName}</p>
                  <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-medium whitespace-pre-line">
                    "{data.message}"
                  </p>
                </div>

                {data.nickname && (
                  <p className="text-sm text-pink-300 font-semibold italic">
                    "Forever our favorite {data.nickname}!"
                  </p>
                )}

                <div className="pt-4 flex items-center justify-center gap-4 text-slate-400 text-xs">
                  <span>Created with WishCraft</span>
                  <span>•</span>
                  <button onClick={triggerConfetti} className="hover:text-white underline flex items-center gap-1">
                    Burst Confetti 🎉
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
