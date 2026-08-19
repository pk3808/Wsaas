"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LogIn, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { LoginModal } from "@/components/LoginModal";

export function ExploreCTA() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <section id="how" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-ruled opacity-20 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <div className="bg-paper rounded-3xl border border-warm-gray/12 paper-shadow-lg p-8 sm:p-12 relative overflow-hidden">
            {/* Washi tapes */}
            <div className="absolute -top-2.5 left-10 w-20 h-5 washi-tape rounded-sm rotate-[-2deg]" />
            <div className="absolute -top-2.5 right-10 w-16 h-5 bg-sage/20 border border-sage/15 backdrop-blur-sm rounded-sm rotate-[2deg]" />

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

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link
                  href="/create"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-ink text-cream font-bold text-sm hover:bg-ink/90 transition-all flex items-center justify-center gap-2 active:scale-[0.97] group"
                >
                  <span>Launch Page Builder</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cream border border-warm-gray/15 text-ink font-semibold text-sm hover:border-warm-gray/30 transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-coral" />
                  <span>Google Sign In</span>
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-soft-brown/60 border-t border-warm-gray/10">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage" /> Free forever
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-lavender" /> Instant link
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-coral" /> No password needed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
