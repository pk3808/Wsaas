"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, Heart, Sparkles, Star } from "lucide-react";
import confetti from "canvas-confetti";

export function StoryHero() {
  const [viewMode, setViewMode] = useState<"sms" | "keepsake">("sms");

  const triggerJoy = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#E8856C", "#B4A0D1", "#8DAE93", "#F5C6A8", "#7FBCD2"],
    });
  };

  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Dot grid paper background */}
      <div className="absolute inset-0 bg-dotgrid opacity-40 pointer-events-none" />

      {/* Decorative hand-drawn doodles */}
      <svg className="absolute top-16 right-12 w-20 h-20 text-coral/20 hidden lg:block" viewBox="0 0 80 80" fill="none">
        <path d="M10 40 C 20 10, 60 10, 70 40 C 60 70, 20 70, 10 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" />
        <circle cx="40" cy="25" r="3" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-20 left-8 w-16 h-16 text-lavender/25 hidden lg:block" viewBox="0 0 60 60" fill="none">
        <path d="M30 5 L35 20 L50 20 L38 30 L42 45 L30 35 L18 45 L22 30 L10 20 L25 20 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <svg className="absolute top-40 left-16 w-10 h-10 text-sage/30 hidden lg:block" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 5" />
      </svg>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Top pill badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-paper border border-warm-gray/12 paper-shadow text-xs font-semibold text-soft-brown">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span>Free to use</span>
            <span className="text-warm-gray/30">•</span>
            <span>5 handcrafted templates</span>
            <span className="text-warm-gray/30">•</span>
            <span>Instant link sharing</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.12]">
            Create a Beautiful Page to{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Wish Someone Special</span>
              {/* Hand-drawn underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-coral/50"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9 C 60 3, 100 9, 150 5 C 200 1, 240 8, 297 4"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-soft-brown max-w-xl mx-auto leading-relaxed">
            Turn ordinary birthday greetings, anniversary wishes & thank you notes into
            interactive digital keepsake pages — complete with animations, confetti,
            and a live guestbook.
          </p>

          {/* Handwritten accent */}
          <p className="font-[family-name:var(--font-handwritten)] text-2xl text-coral/80 -rotate-1">
            ...because a text message gets lost in chat history ✦
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/create"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-ink text-cream font-bold text-sm hover:bg-ink/90 transition-all flex items-center justify-center gap-2 active:scale-[0.97] group"
            >
              <span>Start Creating — It's Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#story"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-paper border border-warm-gray/15 text-ink font-semibold text-sm hover:border-warm-gray/30 transition-all flex items-center justify-center gap-2"
            >
              See How It Works ↓
            </a>
          </div>
        </div>

        {/* ──────── BEFORE / AFTER COMPARISON CARD ──────── */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-paper rounded-3xl border border-warm-gray/12 paper-shadow-lg p-5 sm:p-8 relative">
            {/* Washi tape deco */}
            <div className="absolute -top-3 left-10 w-20 h-5 washi-tape rounded-sm rotate-[-2deg]" />
            <div className="absolute -top-3 right-10 w-16 h-5 bg-lavender/25 border border-lavender/20 backdrop-blur-sm rounded-sm rotate-[3deg]" />

            {/* Handwritten label */}
            <p className="font-[family-name:var(--font-handwritten)] text-lg text-soft-brown mb-5 text-center">
              Which greeting would <em>you</em> rather receive? 👇
            </p>

            {/* Toggle */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center p-1 bg-cream rounded-xl border border-warm-gray/10">
                <button
                  onClick={() => setViewMode("sms")}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "sms"
                      ? "bg-paper paper-shadow text-ink"
                      : "text-soft-brown/60 hover:text-soft-brown"
                  }`}
                >
                  A Text Message 📱
                </button>
                <button
                  onClick={() => {
                    setViewMode("keepsake");
                    triggerJoy();
                  }}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === "keepsake"
                      ? "bg-paper paper-shadow text-ink"
                      : "text-soft-brown/60 hover:text-soft-brown"
                  }`}
                >
                  A WishCraft Page ✨
                </button>
              </div>
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
              {viewMode === "sms" ? (
                <motion.div
                  key="sms"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="p-6 sm:p-8 rounded-2xl bg-cream border border-warm-gray/10 max-w-sm mx-auto"
                >
                  <div className="text-[10px] font-mono text-soft-brown/50 text-center mb-3">
                    iMessage • Today 09:41 AM
                  </div>
                  <div className="bg-paper border border-warm-gray/10 text-ink p-4 rounded-2xl rounded-tl-sm text-sm max-w-[85%] paper-shadow">
                    <p className="font-semibold text-soft-brown/60 text-xs mb-1">Alex</p>
                    <p>hbd bro 🎂 hope u have a good day!</p>
                  </div>
                  <div className="text-[10px] text-soft-brown/40 text-right mt-2 italic">
                    Delivered • Forgotten in 2 minutes ⏳
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="keepsake"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="p-6 sm:p-8 rounded-2xl bg-cream border border-coral/15 max-w-md mx-auto text-center space-y-4"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/10 border border-coral/15 text-coral text-[10px] font-bold">
                    <Star className="w-3 h-3" /> Birthday Carnival Keepsake
                  </div>
                  <h4 className="text-2xl font-extrabold text-ink">
                    Happy 25th Birthday, Alex! 🎂
                  </h4>
                  <p className="text-sm text-soft-brown italic">
                    "May your year ahead be filled with endless adventures and joy!"
                  </p>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={triggerJoy}
                      className="px-4 py-1.5 rounded-full bg-coral/10 hover:bg-coral/20 text-coral text-xs font-bold border border-coral/15 transition-all active:scale-95 flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" /> Pop Confetti!
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-paper border border-warm-gray/10 text-left text-xs space-y-1 paper-shadow">
                    <span className="font-bold text-soft-brown/50 uppercase text-[9px] tracking-wider">
                      Guestbook (3 wishes)
                    </span>
                    <p className="text-soft-brown">
                      ❤️ <strong>Sarah:</strong> Best wish ever! Love you Alex!
                    </p>
                  </div>
                  <p className="text-[10px] text-sage font-bold">
                    ✓ Treasured Forever • Shareable Link • Live Comments
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
