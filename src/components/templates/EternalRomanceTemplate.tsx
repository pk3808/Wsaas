"use client";

import { useState } from "react";
import { type WishData } from "@/lib/config";
import { VisitorComments } from "@/components/VisitorComments";
import { calculateDaysBetween } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Calendar, Quote, Flame } from "lucide-react";

interface TemplateProps {
  data: WishData;
  slug: string;
}

export function EternalRomanceTemplate({ data, slug }: TemplateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loveCount, setLoveCount] = useState(100);

  const daysTogether = calculateDaysBetween(data.anniversaryDate);

  const triggerHeartConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F43F5E', '#FB7185', '#FFF1F2', '#E11D48'],
    });
  };

  const handleOpen = () => {
    setIsOpen(true);
    triggerHeartConfetti();
  };

  const handleSendLove = () => {
    setLoveCount((prev) => prev + 1);
    triggerHeartConfetti();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-rose-50 relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-8">
      {/* Rose Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-rose-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-900/20 rounded-full blur-[100px] pointer-events-none" />

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
              className="group relative p-10 bg-zinc-900/90 backdrop-blur-2xl border border-rose-500/30 hover:border-rose-500/80 rounded-3xl shadow-2xl flex flex-col items-center gap-6 transition-all duration-300 hover:scale-105"
            >
              <div className="p-6 rounded-full bg-rose-500/20 text-rose-400 group-hover:scale-110 transition-transform border border-rose-500/30 shadow-inner">
                <Heart className="w-14 h-14 fill-rose-500 text-rose-500 animate-pulse" />
              </div>
              <div className="text-center space-y-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">Romantic Dedication</span>
                <h1 className="text-3xl font-extrabold capitalize text-white">To My Dearest {data.recipientName}</h1>
                <p className="text-xs text-rose-300/60 mt-1">From {data.senderName} • Sealed with Love</p>
              </div>
              <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-red-600 font-bold text-xs shadow-lg text-white">
                Tap Locket to Unlock Love Letter 💖
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
            {/* Card Content */}
            <div className="bg-zinc-900/90 backdrop-blur-2xl border border-rose-500/30 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-8 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" /> Eternal Romance Edition
              </div>

              <div>
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-red-300 capitalize">
                  Happy Anniversary, <br />
                  <span>{data.recipientName}!</span>
                </h1>
                <p className="text-sm text-rose-300/80 mt-2 font-medium">
                  {data.yearsTogether ? `Celebrating ${data.yearsTogether} Golden Years` : "A Celebration of Our Love"}
                </p>
              </div>

              {/* Days Together Counter Widget */}
              <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-800/40 flex items-center justify-around">
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-black text-rose-400">{daysTogether}</span>
                  <span className="text-xs font-semibold text-rose-300/60 uppercase tracking-wider mt-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Days of Love
                  </span>
                </div>
                <div className="w-px h-10 bg-rose-800/40" />
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-black text-rose-400">{loveCount}</span>
                  <span className="text-xs font-semibold text-rose-300/60 uppercase tracking-wider mt-1 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" /> Kisses Sent
                  </span>
                </div>
              </div>

              {/* Love Quote if available */}
              {data.loveQuote && (
                <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15 italic text-rose-200 text-sm flex items-center justify-center gap-2">
                  <Quote className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>"{data.loveQuote}"</span>
                </div>
              )}

              {/* Main Heartfelt Message */}
              <div className="p-6 md:p-8 rounded-2xl bg-zinc-950/60 border border-rose-900/40 text-left space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">A Message from {data.senderName}</span>
                <p className="text-lg md:text-xl text-rose-100/90 leading-relaxed font-medium whitespace-pre-line">
                  "{data.message}"
                </p>
                <div className="text-right pt-2 text-rose-400 font-bold text-sm">
                  Forever Yours, {data.senderName} ❤️
                </div>
              </div>

              {/* Interactive Love Button */}
              <div className="pt-2 flex flex-col items-center gap-3">
                <button
                  onClick={handleSendLove}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold shadow-lg shadow-rose-950/50 transition-transform active:scale-95 flex items-center gap-2 text-sm"
                >
                  <Heart className="w-5 h-5 fill-white text-white" /> Send Hugs & Kisses 💕
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
