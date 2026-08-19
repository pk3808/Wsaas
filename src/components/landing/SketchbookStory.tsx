"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Gift, MessageSquare, Heart } from "lucide-react";

/* ─── reusable doodles ─── */
function DoodleHeart({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 36" fill="none"><path d="M20 35 C 14 28, 1 20, 1 12 C 1 5, 7 1, 13 1 C 16 1, 19 3, 20 6 C 21 3, 24 1, 27 1 C 33 1, 39 5, 39 12 C 39 20, 26 28, 20 35Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
}
function DoodleStar({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 40" fill="none"><path d="M20 3 L24 15 L37 15 L27 23 L30 36 L20 28 L10 36 L13 23 L3 15 L16 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
function DoodleFlower({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" />
    {[0,60,120,180,240,300].map((angle) => (
      <ellipse key={angle} cx="20" cy="10" rx="4" ry="7" stroke="currentColor" strokeWidth="1" transform={`rotate(${angle} 20 20)`} />
    ))}
  </svg>);
}
function DoodleMusic({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 30 36" fill="none">
    <path d="M10 28 L10 8 L26 4 L26 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="30" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="23" cy="26" r="4" stroke="currentColor" strokeWidth="1.5" />
  </svg>);
}
function DoodleConfetti({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 40" fill="none">
    <rect x="5" y="15" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1" transform="rotate(-20 5 15)" />
    <rect x="20" y="5" width="5" height="3" rx="1" stroke="currentColor" strokeWidth="1" transform="rotate(30 20 5)" />
    <rect x="30" y="20" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1" transform="rotate(-10 30 20)" />
    <circle cx="15" cy="30" r="2" stroke="currentColor" strokeWidth="1" />
    <circle cx="32" cy="10" r="1.5" stroke="currentColor" strokeWidth="1" />
    <path d="M8 8 L12 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M25 32 L28 35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>);
}

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
      {/* Ruled notebook lines */}
      <div className="absolute inset-0 bg-ruled opacity-30 pointer-events-none" />

      {/* Left margin red line like a real notebook */}
      <div className="absolute top-0 left-16 w-px h-full bg-coral/10 hidden lg:block" />
      <div className="absolute top-0 left-[62px] w-px h-full bg-coral/6 hidden lg:block" />

      {/* ───── SCATTERED DOODLES ───── */}
      <DoodleFlower className="absolute top-16 left-[7%] w-10 h-10 text-coral/15 rotate-12 hidden md:block" />
      <DoodleStar className="absolute top-12 right-[8%] w-8 h-8 text-lavender/20 -rotate-6 hidden md:block" />
      <DoodleMusic className="absolute top-40 right-[5%] w-7 h-9 text-sky/15 rotate-6 hidden lg:block" />
      <DoodleConfetti className="absolute bottom-20 left-[10%] w-10 h-10 text-coral/12 hidden lg:block" />
      <DoodleHeart className="absolute bottom-32 right-[12%] w-7 h-7 text-lavender/15 rotate-[-10deg] hidden md:block" />
      <DoodleFlower className="absolute bottom-16 right-[30%] w-8 h-8 text-sage/12 -rotate-12 hidden lg:block" />

      {/* Sticky note – top left corner */}
      <div className="absolute top-12 left-4 md:left-8 rotate-[-4deg] hidden md:block">
        <div className="w-28 bg-sky/15 border border-sky/20 rounded-sm p-2.5 shadow-sm">
          <p className="font-[family-name:var(--font-handwritten)] text-[10px] text-sky/80 leading-snug">
            step-by-step magic ✨
          </p>
        </div>
      </div>

      {/* Sticky note – top right */}
      <div className="absolute top-20 right-4 md:right-8 rotate-[3deg] hidden lg:block">
        <div className="w-24 bg-sage/15 border border-sage/20 rounded-sm p-2 shadow-sm">
          <p className="font-[family-name:var(--font-handwritten)] text-[10px] text-sage/80 leading-snug">
            so simple! →
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="font-[family-name:var(--font-handwritten)] text-xl text-coral -rotate-1">
            here's how it works ↓
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink">
            Like a Digital Scrapbook,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-coral">Crafted with Love</span>
              <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-coral/30" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                <path d="M3 5 C 50 2, 100 7, 150 3 C 170 1, 190 6, 197 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-soft-brown text-sm leading-relaxed max-w-lg mx-auto">
            Every WishCraft page feels like opening a handmade card — complete with
            nostalgic Polaroid aesthetics, real-time visitor guestbooks, and interactive
            surprise reveals.
          </p>
        </div>

        {/* 3 Chapter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 */}
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants} whileHover={{ y: -6, rotate: -1 }}
            className="bg-paper rounded-2xl border border-warm-gray/12 p-6 paper-shadow-lg relative flex flex-col">
            {/* Washi Tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 washi-tape rounded-sm rotate-[1deg]" />
            {/* Corner doodle */}
            <DoodleStar className="absolute top-2 right-2 w-5 h-5 text-lavender/15" />
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
            {/* Mini Polaroid with tape */}
            <div className="mt-5 relative self-center">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 washi-tape rounded-sm rotate-[-1deg]" />
              <div className="p-2.5 bg-white rounded-lg shadow-md rotate-[-2deg] border border-warm-gray/8">
                <div className="w-36 h-24 bg-sky/8 rounded flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl">🎂</span>
                    <p className="text-[10px] font-bold text-soft-brown mt-1">Alex's 25th!</p>
                  </div>
                </div>
                <p className="text-[9px] font-[family-name:var(--font-handwritten)] text-soft-brown/60 mt-1.5 text-center">
                  Summer Memories • 2026
                </p>
              </div>
            </div>
            {/* Handwritten margin note */}
            <p className="mt-3 text-center font-[family-name:var(--font-handwritten)] text-xs text-soft-brown/30 rotate-[-1deg]">
              ↑ just like a real polaroid!
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants} whileHover={{ y: -6, rotate: 1 }}
            className="bg-paper rounded-2xl border border-warm-gray/12 p-6 paper-shadow-lg relative flex flex-col">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-lavender/25 border border-lavender/15 backdrop-blur-sm rounded-sm rotate-[-1deg]" />
            <DoodleHeart className="absolute top-2 right-2 w-5 h-5 text-coral/15" />
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
            <div className="mt-5 p-4 bg-cream rounded-xl border border-warm-gray/10 text-center space-y-2.5 self-stretch relative">
              <DoodleConfetti className="absolute -top-2 -right-2 w-6 h-6 text-coral/20" />
              <button onClick={() => setSealCracked(!sealCracked)}
                className="w-14 h-14 rounded-full bg-coral/15 border-2 border-coral/30 text-coral flex items-center justify-center mx-auto hover:scale-110 transition-transform cursor-pointer active:scale-95">
                <Heart className={`w-7 h-7 transition-all ${sealCracked ? "fill-coral scale-110" : ""}`} />
              </button>
              <p className="text-[10px] font-bold text-soft-brown">
                {sealCracked ? "Seal opened! 🎉 surprise!" : "Tap the wax seal to test →"}
              </p>
            </div>
            <p className="mt-3 text-center font-[family-name:var(--font-handwritten)] text-xs text-soft-brown/30 rotate-[1deg]">
              ↑ try tapping the seal!
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={cardVariants} whileHover={{ y: -6, rotate: -1 }}
            className="bg-paper rounded-2xl border border-warm-gray/12 p-6 paper-shadow-lg relative flex flex-col">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-sage/20 border border-sage/15 backdrop-blur-sm rounded-sm rotate-[2deg]" />
            <DoodleFlower className="absolute top-2 right-2 w-5 h-5 text-sage/15" />
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
                <span className="font-bold text-soft-brown/50 uppercase text-[9px] tracking-wider">Guestbook</span>
                <span className="text-[9px] text-sage font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" /> Live
                </span>
              </div>
              <div className="p-2 rounded-lg bg-paper border border-warm-gray/8 text-soft-brown text-[11px]">
                🎉 <strong>Marcus:</strong> Happy Anniversary! Best couple ever!
              </div>
              <div className="p-2 rounded-lg bg-paper border border-warm-gray/8 text-soft-brown text-[11px]">
                ❤️ <strong>Sarah:</strong> Sending all my love!
              </div>
            </div>
            <p className="mt-3 text-center font-[family-name:var(--font-handwritten)] text-xs text-soft-brown/30 rotate-[-1deg]">
              real comments from real friends ♡
            </p>
          </motion.div>
        </div>

        {/* Bottom connecting doodle elements */}
        <div className="flex items-center justify-center gap-4 mt-10 text-soft-brown/15">
          <DoodleStar className="w-5 h-5" />
          <svg className="w-20 h-1" viewBox="0 0 80 4" fill="none"><path d="M2 2 C 20 0, 40 4, 60 1 C 70 0, 78 3, 78 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          <DoodleHeart className="w-5 h-5" />
          <svg className="w-20 h-1" viewBox="0 0 80 4" fill="none"><path d="M2 2 C 20 4, 40 0, 60 3 C 70 4, 78 1, 78 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          <DoodleFlower className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
