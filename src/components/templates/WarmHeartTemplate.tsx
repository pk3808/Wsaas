"use client";

import { useState } from "react";
import { type WishData } from "@/lib/config";
import { VisitorComments } from "@/components/VisitorComments";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { HeartHandshake, Sparkles, Smile, Feather, Heart } from "lucide-react";

interface TemplateProps {
  data: WishData;
  slug: string;
}

export function WarmHeartTemplate({ data, slug }: TemplateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hugCount, setHugCount] = useState(1);

  const triggerSoftConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#14B8A6', '#06B6D4', '#38BDF8', '#F472B6'],
    });
  };

  const handleOpen = () => {
    setIsOpen(true);
    triggerSoftConfetti();
  };

  const handleSendHug = () => {
    setHugCount((prev) => prev + 1);
    triggerSoftConfetti();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-8">
      {/* Soft Pastel Background Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-70 animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-70 animate-pulse pointer-events-none" />

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
              className="group relative p-10 bg-white/80 backdrop-blur-2xl border border-teal-200 hover:border-teal-400 rounded-3xl shadow-xl flex flex-col items-center gap-6 transition-all duration-300 hover:scale-105"
            >
              <div className="p-6 rounded-full bg-teal-50 text-teal-600 group-hover:scale-110 transition-transform border border-teal-100 shadow-sm">
                <HeartHandshake className="w-14 h-14" />
              </div>
              <div className="text-center space-y-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">A Heartfelt Note</span>
                <h1 className="text-3xl font-extrabold capitalize text-slate-900">For {data.recipientName}</h1>
                <p className="text-xs text-slate-500 mt-1">With gratitude from {data.senderName}</p>
              </div>
              <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 font-bold text-xs shadow-md text-white">
                Break Wax Seal & Read Note 💌
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
            {/* Main Card */}
            <div className="bg-white/90 backdrop-blur-2xl border border-teal-100 rounded-3xl p-8 md:p-12 shadow-xl text-center space-y-8 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold">
                <Feather className="w-3.5 h-3.5 text-teal-600" /> Warm Heart Edition
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 capitalize">
                  Thank You, <span className="text-teal-600">{data.recipientName}</span>
                </h1>
                {data.gratitudeReason && (
                  <p className="text-sm text-slate-600 mt-2 font-medium">
                    {data.gratitudeReason}
                  </p>
                )}
              </div>

              {/* Memory tags */}
              {data.memoryTags && (
                <div className="flex flex-wrap justify-center gap-2">
                  {data.memoryTags.split(',').map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full border border-teal-200">
                      ✨ {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Message Note */}
              <div className="p-6 md:p-8 rounded-2xl bg-teal-50/50 border border-teal-100 text-left space-y-3 shadow-inner">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">A Personal Note from {data.senderName}</span>
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-serif whitespace-pre-line">
                  "{data.message}"
                </p>
                <div className="text-right pt-2 text-teal-700 font-bold text-sm">
                  With warmest regards, {data.senderName} 💐
                </div>
              </div>

              {/* Virtual Hug Trigger */}
              <div className="pt-2 flex flex-col items-center gap-3">
                <button
                  onClick={handleSendHug}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold shadow-lg shadow-teal-500/20 transition-transform active:scale-95 flex items-center gap-2 text-sm"
                >
                  <Smile className="w-5 h-5" /> Send Virtual Hug 🫂 ({hugCount})
                </button>
                <p className="text-xs font-mono text-teal-800/70">
                Forever grateful for your warmth, guidance & friendship 🌸
              </p>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
