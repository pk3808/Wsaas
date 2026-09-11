"use client";

import React, { useRef } from "react";
import { type WishData } from "@/lib/config";
import { motion, useScroll, useTransform } from "framer-motion";
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

export function GoldenThread({ data }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const defaultMemories = [
    { title: "The Beginning", text: "When we first met, I knew you were someone special." },
    { title: "Growing Together", text: "Through the years, our bond has only grown stronger." },
    { title: "Our Future", text: "I can't wait to see what the future holds for us." }
  ];

  const defaultNotes = [
    "Your kindness",
    "Your laugh",
    "Your support"
  ];

  const memories = parseData(data.goldenThreadMemories, defaultMemories);
  const notes = parseData(data.goldenThreadNotes, defaultNotes);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[300vh] bg-[#FDF5E6] text-[#8B4513] font-serif overflow-hidden"
    >
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
           }}
      />

      {/* SVG Golden Thread */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-full pointer-events-none z-0">
        <svg
          viewBox="0 0 200 3000"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <motion.path
            d="M 100 0
               C 150 200, 50 400, 100 600
               C 150 800, 50 1000, 100 1200
               C 150 1400, 50 1600, 100 1800
               C 150 2000, 50 2200, 100 2400
               C 150 2600, 50 2800, 100 3000"
            fill="none"
            stroke="#DAA520"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              pathLength,
              filter: "drop-shadow(0 0 8px rgba(218, 165, 32, 0.4))"
            }}
          />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 flex flex-col items-center">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center min-h-screen flex flex-col items-center justify-center pt-20"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6 text-[#B8860B]" style={{ fontFamily: "var(--font-serif)" }}>
            {data.recipientName}
          </h1>
          <p className="text-xl md:text-2xl text-[#8B4513]/80 italic">
            The invisible string tying us together...
          </p>
          <div className="mt-24 text-[#DAA520] animate-bounce">
            ↓ Scroll to follow the thread
          </div>
        </motion.div>

        {/* Memories (along the thread) */}
        {memories.map((memory: {title: string, text: string}, index: number) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className={`w-full max-w-lg mb-[60vh] flex ${isLeft ? 'justify-start' : 'justify-end'}`}
            >
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-[#DAA520]/20 transform rotate-[-2deg] hover:rotate-0 transition-transform">
                <h3 className="text-2xl font-bold mb-4 text-[#B8860B]">{memory.title}</h3>
                <p className="text-lg leading-relaxed text-[#8B4513]/90">{memory.text}</p>
              </div>
            </motion.div>
          );
        })}

        {/* Finale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center min-h-[80vh] flex flex-col items-center justify-center mt-20"
        >
          {data.yearsTogether && (
            <div className="mb-8 px-6 py-2 rounded-full border border-[#DAA520] text-[#B8860B] text-sm uppercase tracking-widest">
              {data.yearsTogether}
            </div>
          )}
          <div className="bg-white/80 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl border-2 border-[#DAA520]/30 max-w-2xl w-full mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DAA520] to-transparent" />
            <p className="text-2xl md:text-3xl leading-relaxed italic text-[#8B4513] mb-12">
              "{data.message}"
            </p>

            {data.loveQuote && (
              <p className="text-lg text-[#B8860B] mb-8 font-serif">
                "{data.loveQuote}"
              </p>
            )}

            <div className="pt-8 border-t border-[#DAA520]/20 mt-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8B4513]/60 mb-2">Forever yours,</p>
              <p className="text-4xl text-[#B8860B]" style={{ fontFamily: "var(--font-cursive)" }}>
                {data.senderName}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
