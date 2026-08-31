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
import confetti from "canvas-confetti";

interface TemplateProps {
  data: WishData;
  slug: string;
}

export function FloatingLanterns({ data }: TemplateProps) {
  const [lanternsReleased, setLanternsReleased] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Background floating lanterns
  const [lanterns, setLanterns] = useState<Array<{ id: number; left: string; delay: number; duration: number; scale: number }>>([]);

  useEffect(() => {
    if (lanternsReleased) {
      const newLanterns = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
        scale: Math.random() * 0.6 + 0.4
      }));
      setLanterns(newLanterns);

      setTimeout(() => setShowContent(true), 3000);
    }
  }, [lanternsReleased]);

  const handleRelease = () => {
    setLanternsReleased(true);
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.8 },
      colors: ["#FFD700", "#FF8C00", "#FF4500"]
    });
  };

  const defaultWishes = [
    "I wish for endless sunsets shared with you.",
    "I wish for laughter that echoes through the years.",
    "I wish for a love that grows brighter every day."
  ];

  const wishes = parseData(data.lanternWishes, defaultWishes);

  return (
    <div className="relative min-h-screen bg-gradient-to-t from-[#FF8C00]/40 via-[#483D8B]/80 to-[#191970] overflow-hidden flex flex-col items-center justify-center font-serif text-white">

      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "100px 100px", opacity: 0.1 }} />

      {/* Background Animated Lanterns */}
      <AnimatePresence>
        {lanternsReleased && lanterns.map((lantern) => (
          <motion.div
            key={lantern.id}
            initial={{ y: "120vh", x: 0, opacity: 0 }}
            animate={{
              y: "-20vh",
              x: [0, 50, -50, 20, -20, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: lantern.duration,
              delay: lantern.delay,
              ease: "linear",
              times: [0, 0.2, 0.8, 1],
              repeat: Infinity
            }}
            className="absolute bottom-0 pointer-events-none z-0"
            style={{ left: lantern.left, transform: `scale(${lantern.scale})` }}
          >
            {/* Simple Lantern Shape */}
            <div className="w-10 h-14 bg-[#FF8C00] rounded-t-full rounded-b-md relative overflow-hidden shadow-[0_0_15px_#FF8C00]">
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFD700] rounded-full blur-[2px]" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Interaction / Content */}
      <div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center text-center">

        <AnimatePresence mode="wait">
          {!lanternsReleased ? (
            <motion.div
              key="intro"
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center cursor-pointer group"
              onClick={handleRelease}
            >
              <h2 className="text-3xl md:text-5xl font-light mb-16 tracking-wide text-[#FFD700]">
                {data.recipientName} & {data.senderName}
              </h2>

              {/* Interactive Lantern */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-32 bg-gradient-to-b from-[#FFB84D] to-[#FF8C00] rounded-t-[40%] rounded-b-lg relative flex flex-col items-center justify-end pb-4 shadow-[0_0_30px_#FF8C00] group-hover:shadow-[0_0_50px_#FFD700] transition-shadow duration-500"
              >
                <div className="w-10 h-10 bg-[#FFF5E6] rounded-full blur-md absolute bottom-4 animate-pulse" />
                <div className="text-[#8B4513] text-xs uppercase tracking-widest z-10 font-bold opacity-70">
                  Tap to
                  <br />
                  Release
                </div>
              </motion.div>
            </motion.div>
          ) : (
            showContent && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="w-full flex flex-col items-center"
              >
                {data.yearsTogether && (
                  <div className="text-[#FFD700] text-sm uppercase tracking-[0.3em] mb-8">
                    {data.yearsTogether}
                  </div>
                )}

                <h1 className="text-5xl md:text-7xl font-light mb-12" style={{ fontFamily: "var(--font-cursive)" }}>
                  Happy Anniversary
                </h1>

                <p className="text-xl md:text-2xl font-light leading-relaxed mb-16 max-w-2xl text-white/90">
                  "{data.message}"
                </p>

                {data.loveQuote && (
                  <div className="mb-20 text-[#FFD700] italic text-xl border-t border-b border-[#FFD700]/30 py-6 px-4">
                    "{data.loveQuote}"
                  </div>
                )}

                <div className="w-full space-y-12 mb-20 text-left pl-4 border-l-2 border-[#FF8C00]/50">
                  {wishes.map((wish: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2 + index * 0.8, duration: 1 }}
                      className="text-lg md:text-xl text-white/80"
                    >
                      ✨ {wish}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10">
                  <p className="text-3xl text-[#FFD700]" style={{ fontFamily: "var(--font-cursive)" }}>
                    {data.senderName}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
