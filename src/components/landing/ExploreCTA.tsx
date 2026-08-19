"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LogIn, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { LoginModal } from "@/components/LoginModal";

/* ─── doodles ─── */
function DoodleHeart({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 36" fill="none"><path d="M20 35 C 14 28, 1 20, 1 12 C 1 5, 7 1, 13 1 C 16 1, 19 3, 20 6 C 21 3, 24 1, 27 1 C 33 1, 39 5, 39 12 C 39 20, 26 28, 20 35Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
}
function DoodleStar({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 40" fill="none"><path d="M20 3 L24 15 L37 15 L27 23 L30 36 L20 28 L10 36 L13 23 L3 15 L16 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
function DoodleEnvelope({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 50 40" fill="none">
    <rect x="3" y="8" width="44" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 8 L25 24 L47 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>);
}
function DoodleSparkle({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2 L14 9 L12 7 L10 9Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M12 22 L14 15 L12 17 L10 15Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M2 12 L9 10 L7 12 L9 14Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M22 12 L15 10 L17 12 L15 14Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>);
}
function DoodleFlower({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" />
    {[0,60,120,180,240,300].map((angle) => (
      <ellipse key={angle} cx="20" cy="10" rx="4" ry="7" stroke="currentColor" strokeWidth="1" transform={`rotate(${angle} 20 20)`} />
    ))}
  </svg>);
}

export function ExploreCTA() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <section id="how" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-ruled opacity-20 pointer-events-none" />

        {/* Margin line */}
        <div className="absolute top-0 left-16 w-px h-full bg-coral/8 hidden lg:block" />

        {/* Scattered doodles */}
        <DoodleFlower className="absolute top-12 left-[6%] w-9 h-9 text-sage/15 rotate-12 hidden md:block" />
        <DoodleStar className="absolute top-16 right-[8%] w-7 h-7 text-lavender/15 -rotate-6 hidden md:block" />
        <DoodleEnvelope className="absolute bottom-16 left-[10%] w-10 h-8 text-sky/12 rotate-[-4deg] hidden lg:block" />
        <DoodleHeart className="absolute bottom-20 right-[8%] w-6 h-6 text-coral/12 rotate-12 hidden md:block" />
        <DoodleSparkle className="absolute top-40 left-[25%] w-5 h-5 text-peach/20 hidden lg:block" />
        <DoodleFlower className="absolute bottom-12 right-[22%] w-7 h-7 text-lavender/10 -rotate-6 hidden lg:block" />

        {/* Sticky note */}
        <div className="absolute top-10 left-4 md:left-8 rotate-[-3deg] hidden md:block">
          <div className="w-28 bg-coral/10 border border-coral/15 rounded-sm p-2.5 shadow-sm">
            <p className="font-[family-name:var(--font-handwritten)] text-[10px] text-coral/70 leading-snug">
              almost there! just one click ♡
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <div className="bg-paper rounded-3xl border border-warm-gray/12 paper-shadow-lg p-8 sm:p-12 relative overflow-hidden">
            {/* Washi tapes */}
            <div className="absolute -top-2.5 left-10 w-20 h-5 washi-tape rounded-sm rotate-[-2deg]" />
            <div className="absolute -top-2.5 right-10 w-16 h-5 bg-sage/20 border border-sage/15 backdrop-blur-sm rounded-sm rotate-[2deg]" />

            {/* Paper clip */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-warm-gray/20 rounded-full rounded-b-none hidden sm:block" />

            {/* Corner doodles */}
            <DoodleHeart className="absolute top-5 right-5 w-5 h-5 text-coral/15" />
            <DoodleStar className="absolute bottom-5 left-5 w-5 h-5 text-lavender/15" />
            <DoodleSparkle className="absolute bottom-5 right-5 w-5 h-5 text-sage/15" />

            <div className="space-y-5">
              <p className="font-[family-name:var(--font-handwritten)] text-2xl text-coral -rotate-1">
                ready to make someone smile? ✦
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
                Create a Wish Page in{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Under 60 Seconds</span>
                  <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-coral/40" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none">
                    <path d="M3 7 C 40 2, 80 8, 120 4 C 160 0, 180 7, 197 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>

              <p className="text-sm text-soft-brown leading-relaxed max-w-md mx-auto">
                Pick a template, fill in the heartfelt details, copy your unique link,
                and share the love. No sign-up required to get started!
              </p>

              {/* 3-Step Mini Sketch */}
              <div className="flex items-center justify-center gap-4 pt-2 text-soft-brown/50">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-sky/10 border border-sky/20 flex items-center justify-center font-[family-name:var(--font-handwritten)] text-lg text-sky font-bold">1</div>
                  <span className="text-[10px] font-bold">Pick</span>
                </div>
                <svg className="w-8 h-1" viewBox="0 0 32 4" fill="none"><path d="M2 2 C 10 0, 22 4, 30 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" /></svg>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center font-[family-name:var(--font-handwritten)] text-lg text-coral font-bold">2</div>
                  <span className="text-[10px] font-bold">Craft</span>
                </div>
                <svg className="w-8 h-1" viewBox="0 0 32 4" fill="none"><path d="M2 2 C 10 4, 22 0, 30 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" /></svg>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-sage/10 border border-sage/20 flex items-center justify-center font-[family-name:var(--font-handwritten)] text-lg text-sage font-bold">3</div>
                  <span className="text-[10px] font-bold">Share</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link href="/create" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-ink text-cream font-bold text-sm hover:bg-ink/90 transition-all flex items-center justify-center gap-2 active:scale-[0.97] group">
                  <span>Launch Page Builder</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button onClick={() => setIsLoginOpen(true)} className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cream border border-warm-gray/15 text-ink font-semibold text-sm hover:border-warm-gray/30 transition-all flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4 text-coral" />
                  <span>Google Sign In</span>
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-soft-brown/60 border-t border-warm-gray/10">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-sage" /> Free forever</span>
                <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-lavender" /> Instant link</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-coral" /> No password needed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
