"use client";

import { useState } from "react";
import { TEMPLATES, type TemplateIdType } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Eye } from "lucide-react";
import Link from "next/link";

/* ─── doodles ─── */
function DoodleHeart({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 36" fill="none"><path d="M20 35 C 14 28, 1 20, 1 12 C 1 5, 7 1, 13 1 C 16 1, 19 3, 20 6 C 21 3, 24 1, 27 1 C 33 1, 39 5, 39 12 C 39 20, 26 28, 20 35Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
}
function DoodleStar({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 40" fill="none"><path d="M20 3 L24 15 L37 15 L27 23 L30 36 L20 28 L10 36 L13 23 L3 15 L16 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
function DoodleSparkle({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2 L14 9 L12 7 L10 9Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M12 22 L14 15 L12 17 L10 15Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M2 12 L9 10 L7 12 L9 14Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M22 12 L15 10 L17 12 L15 14Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>);
}
function DoodleBanner({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 80 24" fill="none">
    <path d="M5 4 L75 4 L70 12 L75 20 L5 20 L10 12 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>);
}

export function TemplateShowcase() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateIdType>("carnival");
  const activeConfig = TEMPLATES.find((t) => t.id === activeTemplate)!;

  const previewCards: Record<TemplateIdType, { bg: string; border: string; emoji: string; headline: string; sub: string; doodleColor: string }> = {
    carnival: { bg: "bg-purple-50", border: "border-purple-200", emoji: "🎂", headline: "Happy 25th Birthday, Alex!", sub: "Confetti cannons • Candle blowout • Age milestone badge", doodleColor: "text-purple-300/30" },
    romance: { bg: "bg-rose-50", border: "border-rose-200", emoji: "💍", headline: "Happy Anniversary, Sophia!", sub: "Floating hearts • Days-together counter • Love quote card", doodleColor: "text-rose-300/30" },
    triumph: { bg: "bg-amber-50", border: "border-amber-200", emoji: "🎓", headline: "Congratulations, Elena!", sub: "Golden sparkles • Achievement crest • Honors praise card", doodleColor: "text-amber-400/30" },
    festive: { bg: "bg-emerald-50", border: "border-emerald-200", emoji: "🎄", headline: "Happy Holidays, Millers!", sub: "Gift box unboxing • Snowfall canvas • Holiday magic", doodleColor: "text-emerald-400/30" },
    warmheart: { bg: "bg-teal-50", border: "border-teal-200", emoji: "💐", headline: "Thank You, David!", sub: "Wax seal reveal • Handwritten note • Virtual hug counter", doodleColor: "text-teal-400/30" },
    "vintage-scrapbook": { bg: "bg-amber-50", border: "border-amber-900/20", emoji: "📸", headline: "Happy Birthday, Emma!", sub: "Vintage polaroids • Washi tape • Handwritten drawings", doodleColor: "text-amber-700/30" },
    "neon-nightclub": { bg: "bg-pink-900", border: "border-pink-500/50", emoji: "🪩", headline: "Happy Birthday, Jake!", sub: "Neon glows • Laser grids • DJ beats", doodleColor: "text-pink-400/30" },
    "starry-night": { bg: "bg-blue-950", border: "border-blue-500/50", emoji: "🌟", headline: "Happy Birthday, Lily!", sub: "Gold twinkling stars • Midnight blue • Elegant fonts", doodleColor: "text-amber-200/30" },
    "retro-arcade": { bg: "bg-zinc-950", border: "border-green-500/50", emoji: "👾", headline: "Happy Birthday, Max!", sub: "8-bit pixels • High scores • Arcade vibes", doodleColor: "text-green-500/30" },
    "floral-garden": { bg: "bg-emerald-50", border: "border-emerald-200", emoji: "🌸", headline: "Happy Birthday, Chloe!", sub: "Soft blossoms • Swaying leaves • Botanical frames", doodleColor: "text-emerald-400/30" },
    "golden-thread": { bg: "bg-amber-100", border: "border-amber-600/50", emoji: "🧵", headline: "Happy Anniversary, My Love!", sub: "Elegant ivory • Animated gold thread • Calligraphy", doodleColor: "text-amber-600/30" },
    "midnight-bokeh": { bg: "bg-blue-950", border: "border-yellow-400/50", emoji: "🌃", headline: "Happy Anniversary, Sarah!", sub: "Deep navy • Drifting glowing orbs • Serif elegance", doodleColor: "text-yellow-400/30" },
    "wax-seal": { bg: "bg-rose-950", border: "border-amber-100/30", emoji: "💌", headline: "Happy Anniversary, James!", sub: "Rich velvet • Interactive wax seal break • Unfolding letter", doodleColor: "text-amber-100/30" },
    "floating-lanterns": { bg: "bg-orange-950", border: "border-orange-400/50", emoji: "🏮", headline: "Happy Anniversary, Maya!", sub: "Twilight sky • Interactive glowing lanterns • Magic sparks", doodleColor: "text-orange-400/30" },
    "vintage-filmstrip": { bg: "bg-amber-900", border: "border-amber-200/50", emoji: "🎞️", headline: "Happy Anniversary, Chris!", sub: "Sepia tones • Sliding filmstrip memories • Classic countdown", doodleColor: "text-amber-200/30" },
    "celestial-lovers": { bg: "bg-slate-950", border: "border-cyan-200/50", emoji: "✨", headline: "Happy Anniversary, Ava!", sub: "Cosmic space • Constellation drawing • Star maps", doodleColor: "text-cyan-200/30" },
  };

  const currentPreview = previewCards[activeTemplate];

  return (
    <section id="templates" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-dotgrid opacity-25 pointer-events-none" />

      {/* Margin lines */}
      <div className="absolute top-0 left-16 w-px h-full bg-coral/8 hidden lg:block" />

      {/* Scattered doodles */}
      <DoodleStar className="absolute top-12 right-[6%] w-8 h-8 text-lavender/15 rotate-12 hidden md:block" />
      <DoodleHeart className="absolute top-20 left-[7%] w-7 h-7 text-coral/12 -rotate-6 hidden md:block" />
      <DoodleSparkle className="absolute bottom-16 right-[10%] w-6 h-6 text-sage/20 hidden md:block" />
      <DoodleBanner className="absolute top-32 left-[5%] w-16 h-5 text-peach/15 rotate-[-3deg] hidden lg:block" />
      <DoodleHeart className="absolute bottom-28 left-[20%] w-5 h-5 text-lavender/12 rotate-12 hidden lg:block" />
      <DoodleStar className="absolute bottom-20 right-[25%] w-6 h-6 text-coral/10 hidden lg:block" />

      {/* Sticky note */}
      <div className="absolute top-8 right-4 md:right-8 rotate-[4deg] hidden md:block">
        <div className="w-28 bg-lavender/15 border border-lavender/20 rounded-sm p-2.5 shadow-sm">
          <p className="font-[family-name:var(--font-handwritten)] text-[10px] text-lavender/80 leading-snug">
            pick your favorite! ↓
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="font-[family-name:var(--font-handwritten)] text-xl text-lavender rotate-1">
            five handcrafted themes ✦
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink">
            Pick a Template That Fits the{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-coral">Moment</span>
              <svg className="absolute -bottom-1 left-0 w-full h-2 text-coral/35" viewBox="0 0 100 8" fill="none" preserveAspectRatio="none">
                <path d="M2 5 C 25 2, 50 7, 75 3 C 90 1, 98 5, 98 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-soft-brown text-sm leading-relaxed max-w-lg mx-auto">
            Each theme is purpose-built for a specific occasion — with custom animations,
            color palettes, interactive widgets, and on-brand emotional tone.
          </p>
        </div>

        {/* Template Selector Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TEMPLATES.map((tmpl) => (
            <button key={tmpl.id} onClick={() => setActiveTemplate(tmpl.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTemplate === tmpl.id ? "bg-ink text-cream paper-shadow" : "bg-paper text-soft-brown border border-warm-gray/12 hover:border-warm-gray/25"}`}>
              <span>{tmpl.name}</span>
              {activeTemplate === tmpl.id && <Check className="w-3.5 h-3.5 text-cream" />}
            </button>
          ))}
        </div>

        {/* Preview Card */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTemplate} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              className={`${currentPreview.bg} ${currentPreview.border} border-2 rounded-3xl p-8 sm:p-10 paper-shadow-lg relative overflow-hidden`}>
              {/* Washi tapes */}
              <div className="absolute -top-2.5 right-8 w-16 h-5 washi-tape rounded-sm rotate-[3deg]" />
              <div className="absolute -top-2.5 left-8 w-14 h-5 bg-sage/20 border border-sage/15 backdrop-blur-sm rounded-sm rotate-[-2deg]" />

              {/* Corner doodles */}
              <DoodleSparkle className={`absolute top-4 right-4 w-6 h-6 ${currentPreview.doodleColor}`} />
              <DoodleHeart className={`absolute bottom-4 left-4 w-5 h-5 ${currentPreview.doodleColor}`} />
              <DoodleStar className={`absolute bottom-4 right-4 w-5 h-5 ${currentPreview.doodleColor}`} />

              <div className="text-center space-y-5">
                <div className="text-5xl">{currentPreview.emoji}</div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink">{currentPreview.headline}</h3>
                <p className="text-sm text-soft-brown font-medium">{currentPreview.sub}</p>

                <div className="flex items-center justify-center gap-3 text-xs font-bold text-soft-brown/60">
                  <span className="flex items-center gap-1">✨ Confetti Effects</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">💬 Visitor Guestbook</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">🔗 Shareable Link</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <Link href="/create" className="px-6 py-3 rounded-xl bg-ink text-cream font-bold text-xs hover:bg-ink/90 transition-all active:scale-95">
                    Use This Template →
                  </Link>
                  <Link href={`/to/preview-${activeTemplate}`}
                    className="px-6 py-3 rounded-xl bg-paper border border-warm-gray/15 text-ink font-semibold text-xs hover:border-warm-gray/30 transition-all flex items-center justify-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Live Preview
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tagline + doodle divider */}
        <div className="flex items-center justify-center gap-3 mt-8 text-soft-brown/15">
          <DoodleHeart className="w-4 h-4" />
          <p className="font-[family-name:var(--font-handwritten)] text-base text-soft-brown/50">
            — {activeConfig.tagline} —
          </p>
          <DoodleStar className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}
