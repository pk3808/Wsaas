"use client";

import { useState } from "react";
import {
  type OccasionType,
  type TemplateIdType,
} from "@/lib/config";
import { CraftModal } from "@/components/CraftModal";
import {
  Sparkles,
  ArrowRight,
  Heart,
  Cake,
  Gift,
  Award,
  Calendar,
  MessageCircle,
  Music,
  PartyPopper,
  Flame,
} from "lucide-react";
import { motion } from "framer-motion";

export function CreationStudio() {
  const [activeModalTheme, setActiveModalTheme] = useState<TemplateIdType | null>(null);
  const [activeModalOccasion, setActiveModalOccasion] = useState<OccasionType>("birthday");

  const handleOpenCraft = (occasion: OccasionType, themeId: TemplateIdType) => {
    setActiveModalOccasion(occasion);
    setActiveModalTheme(themeId);
  };

  return (
    <div className="w-full space-y-8 sm:space-y-10">
      
      {/* ─── STUDIO HEADER ─── */}
      <div className="text-center space-y-3 max-w-3xl mx-auto pt-2">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.12]">
          What are we{" "}
          <span className="font-[family-name:var(--font-cursive)] text-coral text-5xl sm:text-6xl md:text-7xl font-bold px-2 inline-block -rotate-2">
            Celebrating?
          </span>
        </h1>

        <p className="font-[family-name:var(--font-marker)] text-base sm:text-lg text-soft-brown max-w-xl mx-auto leading-relaxed">
          <span className="bg-[#FFF3ED] text-ink px-2.5 py-0.5 rounded-[4px] shadow-2xs">
            Choose a celebration card below to open your personalized keepsake letter desk ✦
          </span>
        </p>
      </div>

      {/* ─── CREATIVE ASYMMETRICAL CELEBRATION BENTO GRID ─── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        
        {/* ═══ CARD 1: BIRTHDAY CARNIVAL (TALL / PROMINENT - 5 COLS) ═══ */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          onClick={() => handleOpenCraft("birthday", "carnival")}
          className="md:col-span-5 bg-[#F6EFFE] border-2 border-[#E5D7FA] rounded-[32px] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all"
        >
          {/* Top Washi Tape */}
          <div className="absolute -top-2.5 left-10 w-20 h-4 bg-lavender/35 border border-lavender/30 rounded-sm rotate-[-3deg] pointer-events-none" />
          <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider bg-white/80 text-purple-700 px-3 py-1 rounded-full border border-purple-200 shadow-2xs">
            Most Popular 🎂
          </div>

          <div className="space-y-4 pt-3">
            <div className="space-y-1">
              <span className="font-[family-name:var(--font-cursive)] text-base text-purple-700 font-bold">
                Party & Confetti
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-ink group-hover:text-purple-900 transition-colors">
                Birthday Celebration
              </h3>
              <p className="text-xs sm:text-sm text-soft-brown/80 leading-relaxed font-medium">
                Interactive 3D birthday cake with blowable candles, confetti cannons & visitor guestbook wishes.
              </p>
            </div>

            {/* Visual Centerpiece: Polaroid + Stickers Bar */}
            <div className="relative my-4 py-2">
              {/* Tilted Polaroid */}
              <div className="bg-white rounded-2xl p-3 pb-4 border border-purple-200/60 shadow-md rotate-[-2deg] max-w-[240px] mx-auto group-hover:rotate-0 transition-transform duration-300">
                <div className="h-28 rounded-xl bg-purple-50 flex flex-col items-center justify-center relative overflow-hidden border border-purple-100">
                  <div className="text-4xl select-none animate-bounce">🎂</div>
                  <span className="font-[family-name:var(--font-cursive)] text-xs text-purple-600 font-bold mt-1">
                    Blow the candle! 🕯️
                  </span>
                </div>
                <p className="font-[family-name:var(--font-marker)] text-xs text-ink font-bold text-center mt-2">
                  "Happy 25th Birthday, Alex!"
                </p>
              </div>

              {/* Mini Toolbar Pill */}
              <div className="mt-3 flex items-center justify-center gap-2 bg-white/90 backdrop-blur-xs py-1.5 px-3 rounded-full border border-purple-200/80 shadow-2xs max-w-[210px] mx-auto">
                <span className="p-1 rounded-full bg-purple-100 text-purple-700 text-[10px]">🎂</span>
                <span className="p-1 rounded-full bg-amber-100 text-amber-700 text-[10px]">🎉</span>
                <span className="p-1 rounded-full bg-rose-100 text-rose-700 text-[10px]">🎈</span>
                <span className="p-1 rounded-full bg-teal-100 text-teal-700 text-[10px]">✨</span>
                <span className="text-[9px] font-mono text-purple-900 font-bold ml-1">Live Confetti</span>
              </div>
            </div>
          </div>

          {/* Card Footer CTA */}
          <div className="pt-4 border-t border-purple-200/60 flex items-center justify-between">
            <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
              <span>Personalize Birthday Page</span>
            </span>
            <div className="w-8 h-8 rounded-full bg-purple-900 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-xs">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

        {/* ═══ RIGHT COLUMN: 7 COLS (STACK OF WIDE & SPLIT CARDS) ═══ */}
        <div className="md:col-span-7 flex flex-col gap-5 sm:gap-6">
          
          {/* ═══ CARD 2: ETERNAL ROMANCE & ANNIVERSARY (WIDE CARD) ═══ */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => handleOpenCraft("anniversary", "romance")}
            className="bg-[#FFF0F3] border-2 border-[#FCD5DE] rounded-[32px] p-6 sm:p-7 relative overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            {/* Top Washi Tape */}
            <div className="absolute -top-2.5 right-12 w-20 h-4 bg-rose-200/50 border border-rose-200 rounded-sm rotate-[2deg] pointer-events-none" />

            <div className="space-y-2 flex-1">
              <span className="font-[family-name:var(--font-cursive)] text-base text-rose-600 font-bold">
                Romance & Love
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-ink group-hover:text-rose-900 transition-colors">
                Anniversary & Romance
              </h3>
              <p className="text-xs sm:text-sm text-soft-brown/80 leading-relaxed font-medium">
                Rose gold glow, floating hearts, love quote stationery & custom days-together counter.
              </p>
              
              <div className="pt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-white/80 px-3 py-1 rounded-full border border-rose-200 shadow-2xs">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>365 Days Together ♡</span>
                </span>
                <span className="text-[10px] text-rose-700 font-mono">Rose Gold Theme</span>
              </div>
            </div>

            {/* Visual Mini Mockup */}
            <div className="w-full sm:w-44 h-32 bg-white rounded-2xl border border-rose-200/70 p-3 flex flex-col justify-between shadow-sm rotate-[2deg] group-hover:rotate-0 transition-transform shrink-0 relative overflow-hidden">
              <div className="flex justify-between items-center text-[9px] font-mono text-rose-500 font-bold">
                <span>OUR STORY</span>
                <span>#01</span>
              </div>
              <div className="text-center my-auto">
                <div className="text-3xl select-none">💖</div>
                <span className="font-[family-name:var(--font-cursive)] text-[11px] text-rose-700 font-bold">
                  Forever & Always
                </span>
              </div>
              <div className="text-[9px] text-soft-brown/60 text-center font-mono">
                Tap to view letter →
              </div>
            </div>
          </motion.div>

          {/* ═══ BOTTOM ROW: 2 SUB-CARDS (GRADUATION & FESTIVE) ═══ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 flex-1">
            
            {/* ═══ CARD 3: MILESTONES & GRADUATION (WARM GOLD) ═══ */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => handleOpenCraft("success", "triumph")}
              className="bg-[#FFF8EA] border-2 border-[#F6E3B8] rounded-[28px] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-cursive)] text-sm text-amber-700 font-bold">
                    Prestige & Success
                  </span>
                  <Award className="w-4 h-4 text-amber-600" />
                </div>

                <div>
                  <h4 className="text-xl font-extrabold text-ink group-hover:text-amber-900 transition-colors">
                    Milestones & Success
                  </h4>
                  <p className="text-xs text-soft-brown/80 mt-1 leading-relaxed">
                    Obsidian & gold parchment, laurel wreath seal, and graduation milestone celebration.
                  </p>
                </div>

                {/* Badge visual */}
                <div className="p-2.5 rounded-xl bg-white/90 border border-amber-200 flex items-center gap-2.5 shadow-2xs">
                  <span className="text-2xl select-none">🎓</span>
                  <div className="text-[11px] font-bold text-amber-900 leading-tight">
                    <div>Class of 2026</div>
                    <span className="text-[9px] font-mono text-soft-brown font-normal">Congratulations!</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold text-amber-900">
                <span>Craft Milestone Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* ═══ CARD 4: FESTIVE HOLIDAYS (EMERALD / WINTER) ═══ */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => handleOpenCraft("festive", "festive")}
              className="bg-[#F0FDF4] border-2 border-[#DCFCE7] rounded-[28px] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-cursive)] text-sm text-emerald-700 font-bold">
                    Holidays & Season
                  </span>
                  <Gift className="w-4 h-4 text-emerald-600" />
                </div>

                <div>
                  <h4 className="text-xl font-extrabold text-ink group-hover:text-emerald-900 transition-colors">
                    Festive Holidays
                  </h4>
                  <p className="text-xs text-soft-brown/80 mt-1 leading-relaxed">
                    Cozy winter glow, falling festive sparkles & surprise unboxing present reveal.
                  </p>
                </div>

                {/* Gift visual */}
                <div className="p-2.5 rounded-xl bg-white/90 border border-emerald-200 flex items-center gap-2.5 shadow-2xs">
                  <span className="text-2xl select-none">🎁</span>
                  <div className="text-[11px] font-bold text-emerald-900 leading-tight">
                    <div>Holiday Surprise Box</div>
                    <span className="text-[9px] font-mono text-soft-brown font-normal">Tap to unwrap</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-emerald-200/60 flex items-center justify-between text-xs font-bold text-emerald-900">
                <span>Craft Holiday Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

          </div>

        </div>

        {/* ═══ CARD 5: GRATITUDE & FAREWELL (WIDE BOTTOM BANNER - 12 COLS) ═══ */}
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          onClick={() => handleOpenCraft("gratitude", "warmheart")}
          className="md:col-span-12 bg-[#F0FDFA] border-2 border-[#CCFBF1] rounded-[32px] p-6 sm:p-7 relative overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Top Washi Tape */}
          <div className="absolute -top-2.5 left-1/3 w-20 h-4 bg-teal-200/40 border border-teal-200 rounded-sm rotate-[-1deg] pointer-events-none" />

          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-cursive)] text-base text-teal-700 font-bold">
                Heartfelt Thanks
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-teal-800 font-mono text-[10px] font-bold border border-teal-200">
                Botanical Theme
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-ink group-hover:text-teal-900 transition-colors">
              Gratitude & Farewell Keepsake
            </h3>
            <p className="text-xs sm:text-sm text-soft-brown/80 leading-relaxed font-medium max-w-2xl">
              Taped Polaroid memory frames, heartfelt thank-you notes, memory tags & a warm guestbook wall where colleagues and friends leave love.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center -space-x-2 bg-white/80 py-1.5 px-3 rounded-full border border-teal-200 shadow-2xs">
              <span className="text-sm select-none">💐</span>
              <span className="text-sm select-none">💌</span>
              <span className="text-sm select-none">✨</span>
              <span className="text-xs font-bold text-teal-900 ml-3">Live Comments Wall</span>
            </div>

            <div className="w-10 h-10 rounded-full bg-teal-900 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-xs shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

      </div>

      {/* ─── LETTER-WRITING DESK MODAL ─── */}
      <CraftModal
        isOpen={activeModalTheme !== null}
        onClose={() => setActiveModalTheme(null)}
        initialTemplateId={activeModalTheme || "carnival"}
        initialOccasion={activeModalOccasion}
      />
    </div>
  );
}
