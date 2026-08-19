"use client";

import { useState } from "react";
import { type WishData } from "@/lib/config";
import { VisitorComments } from "@/components/VisitorComments";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Sparkles, Snowflake, Heart } from "lucide-react";

interface TemplateProps {
  data: WishData;
  slug: string;
}

export function FestiveMagicTemplate({ data, slug }: TemplateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [giftUnboxed, setGiftUnboxed] = useState(false);

  const triggerSnowConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#34D399', '#FBBF24', '#F43F5E', '#FFFFFF'],
    });
  };

  const handleOpen = () => {
    setIsOpen(true);
    triggerSnowConfetti();
  };

  const handleUnbox = () => {
    setGiftUnboxed(true);
    triggerSnowConfetti();
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-8">
      {/* Festive Glow */}
      <div className="absolute -top-20 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="sealed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="flex flex-col items-center gap-6 z-10"
          >
            <button
              onClick={handleOpen}
              className="group relative p-10 bg-emerald-900/80 backdrop-blur-2xl border border-emerald-500/40 hover:border-yellow-400 rounded-3xl shadow-2xl flex flex-col items-center gap-6 transition-all duration-300 hover:scale-105"
            >
              <div className="p-6 rounded-full bg-red-500/20 text-red-400 group-hover:scale-110 transition-transform border border-red-500/30">
                <Gift className="w-14 h-14" />
              </div>
              <div className="text-center space-y-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Holiday Special</span>
                <h1 className="text-3xl font-extrabold capitalize text-white">Season's Greetings to {data.recipientName}</h1>
                <p className="text-xs text-emerald-300/70 mt-1">Wrapped with joy by {data.senderName}</p>
              </div>
              <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 font-bold text-xs shadow-lg text-white">
                Unwrap Holiday Surprise 🎁
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
            <div className="bg-emerald-900/90 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-8 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-xs font-semibold">
                <Snowflake className="w-3.5 h-3.5 text-yellow-300 animate-spin" /> Festive Magic Edition
              </div>

              <div>
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-yellow-300 to-red-300 capitalize">
                  Happy {data.festivalName || "Holidays"}, <br />
                  <span>{data.recipientName}!</span>
                </h1>
                <p className="text-sm text-emerald-200/80 mt-2 font-medium">
                  May your days be filled with warm cheer, laughter, and light.
                </p>
              </div>

              {/* Unbox Present Interaction */}
              <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 flex flex-col items-center gap-4">
                <div className="text-5xl cursor-pointer hover:scale-110 transition-transform" onClick={handleUnbox}>
                  {giftUnboxed ? "🎁✨" : "📦"}
                </div>
                {giftUnboxed ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold text-yellow-300">
                    "{data.giftBoxSurprise || "Wishing you infinite happiness, health & prosperity!"}"
                  </motion.div>
                ) : (
                  <button
                    onClick={handleUnbox}
                    className="text-xs font-bold text-emerald-300 underline hover:text-white"
                  >
                    Tap Present Box to Reveal Secret Gift Message!
                  </button>
                )}
              </div>

              {/* Message Note */}
              <div className="p-6 md:p-8 rounded-2xl bg-black/40 border border-emerald-700/40 text-left space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">Warm Holiday Wish from {data.senderName}</span>
                <p className="text-lg md:text-xl text-emerald-100/90 leading-relaxed font-medium whitespace-pre-line">
                  "{data.message}"
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={triggerSnowConfetti}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" /> Spread Festive Joy 🎄
                </button>
              </div>
            </div>

            {/* Comments Guestbook */}
            <VisitorComments slug={slug} recipientName={data.recipientName} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
