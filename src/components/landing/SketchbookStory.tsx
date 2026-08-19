"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Gift, MessageSquare, Sparkles, Heart, Music } from "lucide-react";

export function SketchbookStory() {
  const [sealCracked, setSealCracked] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
  };

  return (
    <section id="story" className="py-20 relative overflow-hidden">
      {/* Ruled notebook lines background */}
      <div className="absolute inset-0 bg-ruled opacity-30 pointer-events-none" />

      {/* Decorative corner doodles */}
      <svg className="absolute top-8 left-8 w-12 h-12 text-lavender/20 hidden lg:block" viewBox="0 0 50 50" fill="none">
        <path d="M5 25 Q 25 5, 45 25 Q 25 45, 5 25" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-12 right-12 w-14 h-14 text-sage/20 hidden lg:block" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
        <circle cx="25" cy="25" r="8" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="font-[family-name:var(--font-handwritten)] text-xl text-coral -rotate-1">
            here's how it works ↓
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink">
            Like a Digital Scrapbook,{" "}
            <span className="text-coral">Crafted with Love</span>
          </h2>
          <p className="text-soft-brown text-sm leading-relaxed max-w-lg mx-auto">
            Every WishCraft page feels like opening a handmade card — complete with
            nostalgic Polaroid aesthetics, real-time visitor guestbooks, and interactive
            surprise reveals.
          </p>
        </div>

        {/* 3 Chapter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1: Polaroid Memory */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            whileHover={{ y: -6, rotate: -1 }}
            className="bg-paper rounded-2xl border border-warm-gray/12 p-6 paper-shadow-lg relative flex flex-col"
          >
            {/* Washi Tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 washi-tape rounded-sm rotate-[1deg]" />

            <div className="space-y-4 pt-2 flex-1">
              <div className="w-11 h-11 rounded-xl bg-sky/15 flex items-center justify-center">
                <Camera className="w-5 h-5 text-sky" />
              </div>
              <h3 className="text-lg font-bold text-ink">1. Choose Your Occasion</h3>
              <p className="text-xs text-soft-brown leading-relaxed">
                Birthday, anniversary, graduation, holiday, or a heartfelt thank you —
                pick the occasion and the form adapts to ask just the right details.
              </p>
            </div>

            {/* Mini Polaroid */}
            <div className="mt-5 p-2.5 bg-white rounded-lg shadow-md rotate-[-2deg] border border-warm-gray/8 self-center">
              <div className="w-36 h-24 bg-sky/10 rounded flex items-center justify-center text-sky/50">
                <div className="text-center">
                  <span className="text-3xl">🎂</span>
                  <p className="text-[10px] font-bold text-soft-brown mt-1">Alex's 25th!</p>
                </div>
              </div>
              <p className="text-[9px] font-[family-name:var(--font-handwritten)] text-soft-brown/60 mt-1.5 text-center">
                Summer Memories • 2026
              </p>
            </div>
          </motion.div>

          {/* Card 2: Surprise Reveal */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            whileHover={{ y: -6, rotate: 1 }}
            className="bg-paper rounded-2xl border border-warm-gray/12 p-6 paper-shadow-lg relative flex flex-col"
          >
            {/* Washi Tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-lavender/25 border border-lavender/15 backdrop-blur-sm rounded-sm rotate-[-1deg]" />

            <div className="space-y-4 pt-2 flex-1">
              <div className="w-11 h-11 rounded-xl bg-coral/12 flex items-center justify-center">
                <Gift className="w-5 h-5 text-coral" />
              </div>
              <h3 className="text-lg font-bold text-ink">2. Surprise Unboxing Reveal</h3>
              <p className="text-xs text-soft-brown leading-relaxed">
                Recipients tap a wax seal, open an envelope, or unbox a gift —
                triggering confetti, candle blowouts, and heartfelt messages.
              </p>
            </div>

            {/* Interactive Seal */}
            <div className="mt-5 p-4 bg-cream rounded-xl border border-warm-gray/10 text-center space-y-2.5 self-stretch">
              <button
                onClick={() => setSealCracked(!sealCracked)}
                className="w-14 h-14 rounded-full bg-coral/15 border-2 border-coral/30 text-coral flex items-center justify-center mx-auto hover:scale-110 transition-transform cursor-pointer active:scale-95"
              >
                <Heart className={`w-7 h-7 transition-all ${sealCracked ? "fill-coral scale-110" : ""}`} />
              </button>
              <p className="text-[10px] font-bold text-soft-brown">
                {sealCracked ? "Sealed letter opened! 🎉" : "Tap the wax seal to test →"}
              </p>
            </div>
          </motion.div>

          {/* Card 3: Visitor Guestbook */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            whileHover={{ y: -6, rotate: -1 }}
            className="bg-paper rounded-2xl border border-warm-gray/12 p-6 paper-shadow-lg relative flex flex-col"
          >
            {/* Washi Tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-sage/20 border border-sage/15 backdrop-blur-sm rounded-sm rotate-[2deg]" />

            <div className="space-y-4 pt-2 flex-1">
              <div className="w-11 h-11 rounded-xl bg-lavender/15 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-lavender" />
              </div>
              <h3 className="text-lg font-bold text-ink">3. Friends Leave Wishes</h3>
              <p className="text-xs text-soft-brown leading-relaxed">
                Anyone visiting the link can post warm wishes, pick an emoji reaction,
                and hit like. The memory stays alive forever.
              </p>
            </div>

            {/* Mock Guestbook */}
            <div className="mt-5 p-3 bg-cream rounded-xl border border-warm-gray/10 space-y-2 self-stretch text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-soft-brown/50 uppercase text-[9px] tracking-wider">
                  Guestbook
                </span>
                <span className="text-[9px] text-sage font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" /> Live
                </span>
              </div>
              <div className="p-2 rounded-lg bg-paper border border-warm-gray/8 text-soft-brown text-[11px]">
                🎉 <strong>Marcus:</strong> Happy Anniversary! Best couple ever!
              </div>
              <div className="p-2 rounded-lg bg-paper border border-warm-gray/8 text-soft-brown text-[11px]">
                ❤️ <strong>Sarah:</strong> Sending all my love!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
