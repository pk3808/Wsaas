"use client";

import { useState } from "react";
import { type WishData } from "@/lib/config";
import { VisitorComments } from "@/components/VisitorComments";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Award, Trophy, Sparkles, Medal, CheckCircle2 } from "lucide-react";

interface TemplateProps {
  data: WishData;
  slug: string;
}

export function TriumphGoldTemplate({ data, slug }: TemplateProps) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerGoldConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D97706', '#F59E0B', '#FCD34D', '#FFFFFF', '#B45309'],
    });
  };

  const handleOpen = () => {
    setIsOpen(true);
    triggerGoldConfetti();
  };

  return (
    <div className="min-h-screen bg-black text-amber-50 relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-8">
      {/* Golden Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

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
              className="group relative p-10 bg-neutral-900/90 backdrop-blur-2xl border border-amber-500/40 hover:border-amber-400 rounded-3xl shadow-2xl flex flex-col items-center gap-6 transition-all duration-300 hover:scale-105"
            >
              <div className="p-6 rounded-full bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform border border-amber-500/30">
                <Trophy className="w-14 h-14" />
              </div>
              <div className="text-center space-y-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Achievement Honoree</span>
                <h1 className="text-3xl font-extrabold capitalize text-amber-100">{data.recipientName}</h1>
                <p className="text-xs text-amber-300/60 mt-1">Honored by {data.senderName}</p>
              </div>
              <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 font-bold text-xs shadow-lg text-black">
                Tap Crest to Reveal Honors 🏆
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
            <div className="bg-neutral-900/90 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-8 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Triumph Gold Edition
              </div>

              <div>
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 capitalize">
                  Congratulations, <br />
                  <span>{data.recipientName}!</span>
                </h1>
                {data.achievementTitle && (
                  <p className="text-lg md:text-xl font-bold text-amber-300 mt-3">
                    {data.achievementTitle}
                  </p>
                )}
                {data.institutionName && (
                  <p className="text-xs text-amber-400/70 font-semibold uppercase tracking-wider mt-1">
                    At {data.institutionName}
                  </p>
                )}
              </div>

              {/* Achievement Badge Banner */}
              <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-500/20 flex items-center justify-center gap-4">
                <Medal className="w-10 h-10 text-amber-400 shrink-0" />
                <div className="text-left">
                  <h4 className="text-sm font-bold text-amber-200">Official Recognition of Excellence</h4>
                  <p className="text-xs text-amber-400/80">A testament to hard work, perseverance, and brilliant success.</p>
                </div>
              </div>

              {/* Personal Message */}
              <div className="p-6 md:p-8 rounded-2xl bg-black/60 border border-amber-900/40 text-left space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Words of Praise from {data.senderName}</span>
                <p className="text-lg md:text-xl text-amber-100/90 leading-relaxed font-medium whitespace-pre-line">
                  "{data.message}"
                </p>
                <div className="text-right pt-2 text-amber-400 font-bold text-sm flex items-center justify-end gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> Proudly presented by {data.senderName}
                </div>
              </div>

              {/* Sparkle Trigger */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={triggerGoldConfetti}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold shadow-lg shadow-amber-950/50 transition-transform active:scale-95 flex items-center gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4 text-black" /> Raise a Toast & Sparkles 🥂
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
