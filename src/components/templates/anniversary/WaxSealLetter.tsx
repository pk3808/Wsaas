"use client";

import React, { useState } from "react";
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

export function WaxSealLetter({ data }: TemplateProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultContent = [
    "From the moment our paths crossed, everything changed for the better.",
    "You bring out the absolute best in me, and I cherish every memory we've created together.",
    "Here's to all the days behind us, and all the beautiful days ahead."
  ];

  const letterContent = parseData(data.waxSealLetterContent, defaultContent);

  return (
    <div className="relative min-h-screen bg-[#4A0E17] flex items-center justify-center p-4 md:p-8 overflow-hidden font-serif">

      {/* Velvet Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
           }}
      />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-full max-w-lg cursor-pointer group"
            onClick={() => setIsOpen(true)}
          >
            {/* Envelope Base */}
            <div className="w-full aspect-[4/3] bg-[#EADDCA] rounded-sm shadow-2xl relative overflow-hidden border border-[#D4C4A8]">
              {/* Envelope Flaps (simulated with CSS borders) */}
              <div className="absolute inset-0 border-t-[150px] border-l-[250px] border-r-[250px] border-b-[150px] border-t-[#D4C4A8] border-l-[#F3E5AB]/40 border-r-[#F3E5AB]/40 border-b-[#EADDCA] drop-shadow-md z-10" />

              {/* The Wax Seal */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] z-20 transition-transform duration-500 group-hover:scale-110">
                <div className="w-20 h-20 bg-[#800020] rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_-2px_6px_rgba(0,0,0,0.3)] relative">
                  {/* Seal inner ring */}
                  <div className="w-16 h-16 border-2 border-[#5C0011] rounded-full absolute" />
                  {/* Seal initial */}
                  <span className="text-[#EADDCA] text-4xl" style={{ fontFamily: "var(--font-cursive)" }}>
                    {data.senderName.charAt(0).toUpperCase()}
                  </span>

                  {/* Break crack (hidden initially, reveals on click conceptually) */}
                </div>
              </div>

              <div className="absolute bottom-8 w-full text-center z-20 text-[#8B4513] font-light tracking-widest text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                Tap to open
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.2 }}
            className="w-full max-w-2xl bg-[#FFF8DC] p-8 md:p-16 rounded-sm shadow-2xl relative z-10 text-[#4A2511]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 19.5 L100 19.5' stroke='%23D4C4A8' stroke-width='1' fill='none' stroke-dasharray='5,5' opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: "100% 30px"
            }}
          >
            {data.yearsTogether && (
              <div className="text-center text-[#800020] text-sm tracking-widest uppercase mb-12 border-b border-[#800020]/20 pb-4 inline-block w-full">
                {data.yearsTogether}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl mb-10" style={{ fontFamily: "var(--font-cursive)" }}>
              My dearest {data.recipientName},
            </h1>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed mb-12">
              <p>{data.message}</p>

              {letterContent.map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {data.loveQuote && (
              <div className="my-12 p-6 border-l-2 border-[#800020] bg-[#800020]/5 italic text-lg text-[#800020]">
                "{data.loveQuote}"
              </div>
            )}

            <div className="mt-16 text-right">
              <p className="text-lg mb-2">Yours truly,</p>
              <p className="text-5xl text-[#800020]" style={{ fontFamily: "var(--font-cursive)" }}>
                {data.senderName}
              </p>
            </div>

            {/* Stamp decoration */}
            <div className="absolute top-8 right-8 w-16 h-20 border-2 border-[#800020]/30 flex flex-col items-center justify-center p-1 transform rotate-6">
              <div className="border border-[#800020]/20 w-full h-full flex flex-col items-center justify-center text-[#800020]/50 text-xs">
                <span>EST</span>
                <span className="font-bold">{new Date().getFullYear()}</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
