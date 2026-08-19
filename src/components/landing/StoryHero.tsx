"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Sparkles, Music, Heart } from "lucide-react";
import confetti from "canvas-confetti";

/* ═══════════════════════════════════════════════════════════════════
   LIGHT SKETCHY & WAVY SIDE ARTWORK (POSITIONED LOWER, NO SOLID BLOCKS)
   ═══════════════════════════════════════════════════════════════════ */

function IllustrationLeft() {
  return (
    <div className="absolute left-2 xl:left-8 top-32 xl:top-36 w-60 xl:w-72 hidden lg:block pointer-events-none select-none z-0">
      <div className="relative w-full h-[400px]">
        
        {/* 1. Translucent Sketchy Polaroid (Airy & Lightweight) */}
        <div className="absolute top-4 left-4 w-52 bg-paper/50 backdrop-blur-xs rounded-2xl p-3 pb-4 border border-dashed border-warm-gray/30 rotate-[-4deg] shadow-xs">
          {/* Translucent Washi tape */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 washi-tape rounded-sm rotate-[2deg]" />
          
          {/* Sketchy Canvas inside */}
          <div className="w-full h-32 rounded-xl border border-warm-gray/15 bg-cream/40 p-2 flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-center text-[10px] text-coral font-bold font-mono">
              <span>✦ MEMORY</span>
              <span>#01</span>
            </div>
            
            {/* Hand-drawn SVG Birthday Cake & Candle */}
            <div className="flex justify-center my-auto">
              <svg className="w-16 h-16 text-coral/80" viewBox="0 0 60 60" fill="none">
                {/* Cake base */}
                <path d="M12 32 C 12 30, 48 30, 48 32 L46 50 C 46 52, 14 52, 14 50 Z" stroke="#8B7E6A" strokeWidth="1.5" fill="#FFF9F0" fillOpacity="0.6" />
                <path d="M13 40 Q 20 44, 30 40 T 47 40" stroke="#E8856C" strokeWidth="1.2" strokeLinecap="round" />
                {/* Frosting drips */}
                <path d="M12 32 Q 18 36, 24 32 Q 30 36, 36 32 Q 42 36, 48 32" stroke="#E8856C" strokeWidth="1.5" fill="#E8856C" fillOpacity="0.15" />
                {/* Candle */}
                <line x1="30" y1="30" x2="30" y2="18" stroke="#8B7E6A" strokeWidth="2" strokeLinecap="round" />
                <path d="M30 16 C 28 12, 32 10, 30 6 C 28 10, 32 12, 30 16 Z" fill="#F5C6A8" stroke="#E8856C" strokeWidth="1" />
                {/* Sparkles */}
                <circle cx="20" cy="18" r="1.5" fill="#E8856C" fillOpacity="0.6" />
                <circle cx="40" cy="20" r="1.5" fill="#B4A0D1" fillOpacity="0.6" />
              </svg>
            </div>

            <div className="text-center text-[10px] font-mono text-soft-brown/70">
              Celebration Day
            </div>
          </div>

          <p className="font-[family-name:var(--font-cursive)] text-base text-ink/80 font-bold text-center mt-2 leading-none">
            "Making moments unforgettable"
          </p>
        </div>

        {/* 2. Floating Sketchy Music Wave Badge */}
        <div className="absolute bottom-20 left-2 bg-cream/70 border border-dashed border-lavender/40 rounded-full px-3 py-1 shadow-2xs flex items-center gap-2 rotate-[3deg]">
          <Music className="w-3 h-3 text-lavender" />
          <span className="text-[10px] font-bold text-soft-brown/80 font-mono">
            ♫ Memories.mp3
          </span>
        </div>

        {/* 3. Hand-drawn floating hearts & sparkles */}
        <div className="absolute top-0 right-2 text-coral/40 rotate-12">
          <svg className="w-6 h-6" viewBox="0 0 40 36" fill="none">
            <path d="M20 35 C 14 28, 1 20, 1 12 C 1 5, 7 1, 13 1 C 16 1, 19 3, 20 6 C 21 3, 24 1, 27 1 C 33 1, 39 5, 39 12 C 39 20, 26 28, 20 35Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

      </div>
    </div>
  );
}

function IllustrationRight() {
  return (
    <div className="absolute right-2 xl:right-8 top-32 xl:top-36 w-60 xl:w-72 hidden lg:block pointer-events-none select-none z-0">
      <div className="relative w-full h-[400px]">

        {/* 1. Translucent Sketchy Gift Card (Airy & Lightweight) */}
        <div className="absolute top-4 right-4 w-52 bg-paper/50 backdrop-blur-xs rounded-2xl p-3 pb-4 border border-dashed border-lavender/30 rotate-[3deg] shadow-xs">
          {/* Lavender Washi tape */}
          <div className="absolute -top-2.5 right-6 w-16 h-4 bg-lavender/25 border border-lavender/20 backdrop-blur-sm rounded-sm rotate-[-2deg]" />

          {/* Sketchy Canvas inside */}
          <div className="w-full h-32 rounded-xl border border-warm-gray/15 bg-cream/40 p-2 flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-center text-[10px] text-lavender font-bold font-mono">
              <span>✦ SURPRISE</span>
              <span>UNBOXING</span>
            </div>

            {/* Hand-drawn SVG Gift Box */}
            <div className="flex justify-center my-auto">
              <svg className="w-16 h-16 text-coral/80" viewBox="0 0 60 60" fill="none">
                {/* Box body */}
                <rect x="14" y="24" width="32" height="24" rx="3" stroke="#8B7E6A" strokeWidth="1.5" fill="#FFF9F0" fillOpacity="0.6" />
                {/* Lid */}
                <rect x="10" y="18" width="40" height="8" rx="2" stroke="#8B7E6A" strokeWidth="1.5" fill="#FFFDF7" />
                {/* Ribbon vertical */}
                <line x1="30" y1="18" x2="30" y2="48" stroke="#E8856C" strokeWidth="2" />
                {/* Ribbon horizontal */}
                <line x1="14" y1="36" x2="46" y2="36" stroke="#E8856C" strokeWidth="2" />
                {/* Bow */}
                <path d="M30 18 C 22 10, 15 14, 25 18" stroke="#E8856C" strokeWidth="1.5" fill="#E8856C" fillOpacity="0.2" strokeLinecap="round" />
                <path d="M30 18 C 38 10, 45 14, 35 18" stroke="#E8856C" strokeWidth="1.5" fill="#E8856C" fillOpacity="0.2" strokeLinecap="round" />
                <circle cx="30" cy="18" r="2.5" fill="#E8856C" />
              </svg>
            </div>

            {/* Handwritten Gift Tag */}
            <div className="text-center font-[family-name:var(--font-cursive)] text-xs text-coral font-bold">
              For Someone Loved ♡
            </div>
          </div>

          <p className="font-[family-name:var(--font-cursive)] text-base text-ink/80 font-bold text-center mt-2 leading-none">
            "Tap to unwrap joy"
          </p>
        </div>

        {/* 2. Floating Guestbook Badge */}
        <div className="absolute bottom-20 right-2 bg-cream/70 border border-dashed border-sage/40 rounded-full px-3 py-1 shadow-2xs flex items-center gap-1.5 rotate-[-3deg]">
          <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
          <span className="text-[10px] font-bold text-soft-brown/80 font-mono">
            Live Guestbook
          </span>
        </div>

        {/* 3. Floating Sparkle */}
        <div className="absolute top-0 left-2 text-lavender/40 rotate-[-12deg]">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 L14 9 L12 7 L10 9Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M12 22 L14 15 L12 17 L10 15Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M2 12 L9 10 L7 12 L9 14Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M22 12 L15 10 L17 12 L15 14Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

      </div>
    </div>
  );
}

/* ─── Small Doodles ─── */
function DoodleHeart({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 36" fill="none"><path d="M20 35 C 14 28, 1 20, 1 12 C 1 5, 7 1, 13 1 C 16 1, 19 3, 20 6 C 21 3, 24 1, 27 1 C 33 1, 39 5, 39 12 C 39 20, 26 28, 20 35Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
}
function DoodleSparkle({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2 L14 9 L12 7 L10 9Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M12 22 L14 15 L12 17 L10 15Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M2 12 L9 10 L7 12 L9 14Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M22 12 L15 10 L17 12 L15 14Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>);
}

export function StoryHero() {
  const [viewMode, setViewMode] = useState<"sms" | "keepsake">("sms");

  const triggerJoy = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.65 }, colors: ["#E8856C", "#B4A0D1", "#8DAE93", "#F5C6A8", "#7FBCD2"] });
  };

  return (
    <section className="relative pt-8 pb-20 overflow-hidden">
      {/* Dot grid paper */}
      <div className="absolute inset-0 bg-dotgrid opacity-40 pointer-events-none" />

      {/* ═══ LIGHT SKETCHY SIDE ARTWORK (POSITIONED LOWER) ═══ */}
      <IllustrationLeft />
      <IllustrationRight />

      {/* Margin line */}
      <div className="absolute top-0 left-16 w-px h-full bg-coral/8 hidden xl:block" />

      {/* Sticky note */}
      <div className="absolute top-4 right-[16%] xl:right-[20%] rotate-3 hidden xl:block z-10">
        <div className="w-32 bg-amber-100 border border-amber-200/60 rounded-sm p-2.5 shadow-md">
          <p className="font-[family-name:var(--font-cursive)] text-base text-amber-900 leading-snug font-bold">
            Every message deserves to be a memory ♡
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl lg:max-w-5xl">
        {/* ═══ CREATIVE BADGE ═══ */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="bg-paper border-2 border-dashed border-warm-gray/20 rounded-xl px-6 py-2.5 paper-shadow relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 washi-tape rounded-sm" />
              <div className="flex items-center gap-4 text-xs font-semibold text-soft-brown">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sage/15 border border-sage/25 flex items-center justify-center text-xs">✦</span>
                  <span>Free Forever</span>
                </span>
                <span className="w-3 h-px bg-warm-gray/20" />
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center text-xs">🎨</span>
                  <span>5 Themes</span>
                </span>
                <span className="w-3 h-px bg-warm-gray/20" />
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-lavender/15 border border-lavender/20 flex items-center justify-center text-xs">🔗</span>
                  <span>Instant Links</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ STYLISH CURSIVE HEADLINE ═══ */}
        <div className="text-center space-y-5 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-ink leading-[1.18]">
            <span className="font-[family-name:var(--font-serif)] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-soft-brown block mb-1">
              Create a
            </span>
            <span className="font-[family-name:var(--font-cursive)] font-bold text-coral text-6xl sm:text-7xl md:text-8xl lg:text-9xl inline-block -rotate-2 drop-shadow-xs px-3">
              Beautiful Page
            </span>
            <span className="font-[family-name:var(--font-serif)] font-bold italic text-ink block mt-1">
              to Wish Someone Special
            </span>
          </h1>

          {/* Highlighted text */}
          <p className="font-[family-name:var(--font-marker)] text-lg sm:text-xl max-w-3xl mx-auto text-center leading-[1.7] tracking-wide">
            <span className="bg-[#FDE8DF] text-ink px-2.5 py-0.5 rounded-[4px] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] shadow-2xs">
              Turn ordinary birthday greetings, anniversary wishes & thank you notes into interactive digital keepsake pages — complete with animations, confetti, and a live guestbook.
            </span>
          </p>

          {/* Handwritten accent with flat highlighter marker & wavy bottom underline */}
          <div className="flex items-center justify-center gap-2 pt-1 pb-2">
            <DoodleHeart className="w-5 h-5 text-coral fill-coral/20 animate-pulse shrink-0" />
            <div className="relative inline-block">
              <span className="bg-[#FDE8DF] text-ink px-3.5 py-1 rounded-[4px] shadow-2xs font-[family-name:var(--font-cursive)] text-xl sm:text-2xl md:text-3xl font-bold tracking-wide inline-block">
                ...because a text message gets lost in chat history
              </span>
              {/* Artistic wavy line at bottom of highlight */}
              <svg className="absolute -bottom-1.5 left-1 right-1 w-[calc(100%-8px)] h-2.5 text-coral/55 pointer-events-none mx-auto" viewBox="0 0 300 8" fill="none" preserveAspectRatio="none">
                <path d="M0 4 Q 25 8, 50 4 T 100 4 T 150 4 T 200 4 T 250 4 T 300 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <DoodleSparkle className="w-5 h-5 text-coral/40 shrink-0" />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/create" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-ink text-cream font-bold text-sm hover:bg-ink/90 transition-all flex items-center justify-center gap-2 active:scale-[0.97] group shadow-md">
              <span>Start Creating — It's Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#story" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-paper border border-warm-gray/15 text-ink font-semibold text-sm hover:border-warm-gray/30 transition-all flex items-center justify-center gap-2">
              See How It Works ↓
            </a>
          </div>
        </div>

        {/* Doodle arrow */}
        <div className="flex justify-center mt-8 mb-2">
          <svg className="w-16 h-8 text-soft-brown/20 rotate-[5deg]" viewBox="0 0 60 30" fill="none">
            <path d="M5 20 C 15 5, 35 5, 50 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 4" />
            <path d="M45 10 L50 15 L44 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* ──── BEFORE / AFTER COMPARISON CARD ──── */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-paper rounded-3xl border border-warm-gray/12 paper-shadow-lg p-5 sm:p-8 relative">
            <div className="absolute -top-3 left-10 w-20 h-5 washi-tape rounded-sm rotate-[-2deg]" />
            <div className="absolute -top-3 right-10 w-16 h-5 bg-lavender/25 border border-lavender/20 backdrop-blur-sm rounded-sm rotate-[3deg]" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-warm-gray/20 rounded-full rounded-b-none hidden sm:block" />

            <p className="font-[family-name:var(--font-cursive)] text-xl sm:text-2xl text-soft-brown font-bold mb-5 text-center">
              Which greeting would <em>you</em> rather receive? 👇
            </p>

            <div className="flex justify-center mb-6">
              <div className="flex items-center p-1 bg-cream rounded-xl border border-warm-gray/10">
                <button onClick={() => setViewMode("sms")}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === "sms" ? "bg-paper paper-shadow text-ink" : "text-soft-brown/60 hover:text-soft-brown"}`}>
                  A Text Message 📱
                </button>
                <button onClick={() => { setViewMode("keepsake"); triggerJoy(); }}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === "keepsake" ? "bg-paper paper-shadow text-ink" : "text-soft-brown/60 hover:text-soft-brown"}`}>
                  A WishCraft Page ✨
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === "sms" ? (
                <motion.div key="sms" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="p-6 sm:p-8 rounded-2xl bg-cream border border-warm-gray/10 max-w-sm mx-auto relative">
                  <div className="text-[10px] font-mono text-soft-brown/50 text-center mb-3">iMessage • Today 09:41 AM</div>
                  <div className="bg-paper border border-warm-gray/10 text-ink p-4 rounded-2xl rounded-tl-sm text-sm max-w-[85%] paper-shadow">
                    <p className="font-semibold text-soft-brown/60 text-xs mb-1">Alex</p>
                    <p>hbd bro 🎂 hope u have a good day!</p>
                  </div>
                  <div className="text-[10px] text-soft-brown/40 text-right mt-2 italic">Delivered • Forgotten in 2 minutes ⏳</div>
                  <div className="absolute -bottom-2 -right-2 font-[family-name:var(--font-cursive)] text-sm text-soft-brown/35 rotate-6 font-bold">meh...</div>
                </motion.div>
              ) : (
                <motion.div key="keepsake" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="p-6 sm:p-8 rounded-2xl bg-cream border border-coral/15 max-w-md mx-auto text-center space-y-4 relative">
                  <DoodleSparkle className="absolute -top-3 -right-3 w-6 h-6 text-coral/30" />
                  <DoodleHeart className="absolute -bottom-2 -left-2 w-5 h-5 text-lavender/25 rotate-12" />
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/10 border border-coral/15 text-coral text-[10px] font-bold">
                    <Star className="w-3 h-3" /> Birthday Carnival Keepsake
                  </div>
                  <h4 className="text-2xl font-extrabold text-ink">Happy 25th Birthday, Alex! 🎂</h4>
                  <p className="text-sm text-soft-brown italic">"May your year ahead be filled with endless adventures and joy!"</p>
                  <div className="flex justify-center gap-2">
                    <button onClick={triggerJoy} className="px-4 py-1.5 rounded-full bg-coral/10 hover:bg-coral/20 text-coral text-xs font-bold border border-coral/15 transition-all active:scale-95 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Pop Confetti!
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-paper border border-warm-gray/10 text-left text-xs space-y-1 paper-shadow">
                    <span className="font-bold text-soft-brown/50 uppercase text-[9px] tracking-wider">Guestbook (3 wishes)</span>
                    <p className="text-soft-brown">❤️ <strong>Sarah:</strong> Best wish ever! Love you Alex!</p>
                  </div>
                  <p className="text-[10px] text-sage font-bold">✓ Treasured Forever • Shareable Link • Live Comments</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
