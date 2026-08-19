"use client";

import { useState } from "react";
import { TEMPLATES, type TemplateIdType } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Eye } from "lucide-react";
import Link from "next/link";

export function TemplateShowcase() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateIdType>("carnival");
  const activeConfig = TEMPLATES.find((t) => t.id === activeTemplate)!;

  // Light-theme specific preview palettes for each template card
  const previewCards: Record<TemplateIdType, { bg: string; border: string; emoji: string; headline: string; sub: string }> = {
    carnival: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      emoji: "🎂",
      headline: "Happy 25th Birthday, Alex!",
      sub: "Confetti cannons • Candle blowout • Age milestone badge",
    },
    romance: {
      bg: "bg-rose-50",
      border: "border-rose-200",
      emoji: "💍",
      headline: "Happy Anniversary, Sophia!",
      sub: "Floating hearts • Days-together counter • Love quote card",
    },
    triumph: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      emoji: "🎓",
      headline: "Congratulations, Elena!",
      sub: "Golden sparkles • Achievement crest • Honors praise card",
    },
    festive: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      emoji: "🎄",
      headline: "Happy Holidays, Millers!",
      sub: "Gift box unboxing • Snowfall canvas • Holiday magic",
    },
    warmheart: {
      bg: "bg-teal-50",
      border: "border-teal-200",
      emoji: "💐",
      headline: "Thank You, David!",
      sub: "Wax seal reveal • Handwritten note • Virtual hug counter",
    },
  };

  const currentPreview = previewCards[activeTemplate];

  return (
    <section id="templates" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-dotgrid opacity-25 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="font-[family-name:var(--font-handwritten)] text-xl text-lavender rotate-1">
            five handcrafted themes ✦
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink">
            Pick a Template That Fits the{" "}
            <span className="text-coral">Moment</span>
          </h2>
          <p className="text-soft-brown text-sm leading-relaxed max-w-lg mx-auto">
            Each theme is purpose-built for a specific occasion — with custom animations,
            color palettes, interactive widgets, and on-brand emotional tone.
          </p>
        </div>

        {/* Template Selector Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setActiveTemplate(tmpl.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTemplate === tmpl.id
                  ? "bg-ink text-cream paper-shadow"
                  : "bg-paper text-soft-brown border border-warm-gray/12 hover:border-warm-gray/25"
              }`}
            >
              <span>{tmpl.name}</span>
              {activeTemplate === tmpl.id && (
                <Check className="w-3.5 h-3.5 text-cream" />
              )}
            </button>
          ))}
        </div>

        {/* Preview Card */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTemplate}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className={`${currentPreview.bg} ${currentPreview.border} border-2 rounded-3xl p-8 sm:p-10 paper-shadow-lg relative overflow-hidden`}
            >
              {/* Washi tape deco */}
              <div className="absolute -top-2.5 right-8 w-16 h-5 washi-tape rounded-sm rotate-[3deg]" />

              <div className="text-center space-y-5">
                <div className="text-5xl">{currentPreview.emoji}</div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink">
                  {currentPreview.headline}
                </h3>

                <p className="text-sm text-soft-brown font-medium">
                  {currentPreview.sub}
                </p>

                <div className="flex items-center justify-center gap-3 text-xs font-bold text-soft-brown/60">
                  <span className="flex items-center gap-1">✨ Confetti Effects</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">💬 Visitor Guestbook</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">🔗 Shareable Link</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <Link
                    href="/create"
                    className="px-6 py-3 rounded-xl bg-ink text-cream font-bold text-xs hover:bg-ink/90 transition-all active:scale-95"
                  >
                    Use This Template →
                  </Link>
                  <Link
                    href={`/to/preview-${activeTemplate}`}
                    className="px-6 py-3 rounded-xl bg-paper border border-warm-gray/15 text-ink font-semibold text-xs hover:border-warm-gray/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> Live Preview
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Template badge strip */}
        <p className="text-center mt-6 font-[family-name:var(--font-handwritten)] text-base text-soft-brown/60">
          — {activeConfig.tagline} —
        </p>
      </div>
    </section>
  );
}
