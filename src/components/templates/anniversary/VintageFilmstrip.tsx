"use client";

import React, { useState, useEffect } from "react";
import { type WishData } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
function parseData<T>(jsonString: string | undefined, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    return fallback;
  }
}

interface TemplateProps {
  data: WishData;
  slug: string;
}

export function VintageFilmstrip({ data }: TemplateProps) {
  const [countdown, setCountdown] = useState<number | null>(5);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCountdown(null);
      setTimeout(() => setShowContent(true), 500);
    }
  }, [countdown]);

  const defaultFrames = [
    { title: "Scene 1: The Meet Cute", text: "Like a classic movie, I knew from the start." },
    { title: "Scene 2: The Adventure", text: "Every day with you is a new plot twist." },
    { title: "Scene 3: Happily Ever After", text: "And our story is still being written." }
  ];

  const frames = parseData(data.filmstripFrames, defaultFrames);

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] text-[#E0C097] font-serif overflow-hidden flex flex-col items-center justify-center">

      {/* Sepia / Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-15 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      <div className="fixed inset-0 pointer-events-none z-40 bg-[#8B4513]/10 mix-blend-color" />

      <AnimatePresence mode="wait">
        {countdown !== null ? (
          <motion.div
            key="countdown"
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center h-screen w-full relative"
          >
            {/* Spinning projector lines */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute w-96 h-96 border-4 border-dashed border-[#E0C097]/30 rounded-full"
            />
            {/* Countdown Number */}
            <motion.div
              key={countdown}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-9xl font-bold font-mono"
            >
              {countdown}
            </motion.div>
          </motion.div>
        ) : (
          showContent && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="w-full flex flex-col items-center py-20"
            >

              <div className="text-center mb-16 px-6">
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-widest mb-4 border-b-2 border-[#E0C097]/50 pb-4 inline-block">
                  {data.recipientName} & {data.senderName}
                </h1>
                {data.yearsTogether && (
                  <p className="text-xl md:text-2xl tracking-[0.3em] uppercase mt-4 text-[#E0C097]/70">
                    A {data.yearsTogether} Production
                  </p>
                )}
              </div>

              {/* The Filmstrip Horizontal Scroller */}
              <div className="w-full relative overflow-x-hidden py-10 bg-black border-y-8 border-[#333]">
                {/* Film holes top */}
                <div className="absolute top-2 w-[200%] h-4 flex gap-4 animate-[slide_20s_linear_infinite]">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-[#1A1A1A] shrink-0 rounded-sm" />
                  ))}
                </div>

                {/* Frames */}
                <div className="flex gap-8 px-10 py-8 w-max">
                  {frames.map((frame: {title: string, text: string}, idx: number) => (
                    <div key={idx} className="w-80 h-64 bg-[#E0C097] text-[#1A1A1A] p-6 flex flex-col justify-center items-center text-center shadow-lg transform transition-transform hover:scale-105">
                      <h3 className="text-xl font-bold uppercase tracking-wider mb-4 border-b border-[#1A1A1A]/30 pb-2">
                        {frame.title}
                      </h3>
                      <p className="italic">{frame.text}</p>
                    </div>
                  ))}
                </div>

                {/* Film holes bottom */}
                <div className="absolute bottom-2 w-[200%] h-4 flex gap-4 animate-[slide_20s_linear_infinite]">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-[#1A1A1A] shrink-0 rounded-sm" />
                  ))}
                </div>
              </div>

              {/* Message section */}
              <div className="max-w-2xl px-6 text-center mt-20">
                <p className="text-2xl md:text-3xl leading-relaxed font-light mb-10">
                  {data.message}
                </p>

                {data.loveQuote && (
                  <p className="text-lg italic text-[#E0C097]/60 mb-10">
                    "{data.loveQuote}"
                  </p>
                )}

                <p className="text-xl uppercase tracking-widest mt-10">
                  Directed by <br/> <span className="text-3xl mt-2 block font-bold">{data.senderName}</span>
                </p>
              </div>

            </motion.div>
          )
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
