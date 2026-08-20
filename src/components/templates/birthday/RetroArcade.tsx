"use client";

import { type WishData } from "@/lib/config";
import { VisitorComments } from "@/components/VisitorComments";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Gamepad2 } from "lucide-react";

export function RetroArcade({ data, slug }: { data: WishData; slug: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = data.message;

  useEffect(() => {
    if (isOpen) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(fullText.substring(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isOpen, fullText]);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 80,
      spread: 70,
      colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'],
      shapes: ['square']
    });
  };

  return (
    <div className="min-h-screen bg-black text-[#33FF00] font-mono relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Scanlines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-50" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="start"
            className="flex flex-col items-center gap-8 z-10"
          >
            <h1 className="text-5xl md:text-7xl text-[#FF0000] drop-shadow-[0_0_10px_#FF0000] font-bold text-center">
              PLAYER 1: <br/> {data.recipientName}
            </h1>
            <div className="flex gap-4">
              <span className="text-[#FFFF00]">SCORE: 999999</span>
              <span className="text-[#00FFFF]">LIVES: ∞</span>
            </div>

            <motion.button
              onClick={handleOpen}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="mt-12 text-2xl md:text-4xl text-white drop-shadow-[0_0_8px_#FFF] flex items-center gap-4"
            >
              <Gamepad2 className="w-8 h-8" /> PRESS START
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            className="w-full max-w-4xl z-10 my-8 space-y-8"
          >
            <div className="border-4 border-[#33FF00] p-6 md:p-10 bg-black/80 shadow-[0_0_20px_#33FF00]">
              <h2 className="text-3xl md:text-5xl text-[#FFFF00] drop-shadow-[0_0_8px_#FFFF00] mb-8 text-center uppercase">
                Level Up: Happy Birthday!
              </h2>

              <div className="min-h-[150px] text-lg md:text-2xl leading-relaxed">
                {typedText}
                <span className="animate-pulse">_</span>
              </div>

              <div className="mt-10 pt-4 border-t-2 border-[#33FF00]/50 text-[#00FFFF]">
                &gt; SYSTEM MSG FROM: {data.senderName}
              </div>
            </div>

            <div className="border-4 border-[#FF00FF] bg-black p-6 shadow-[0_0_15px_#FF00FF]">
              <h3 className="text-xl text-[#FF00FF] mb-4 text-center uppercase">-- High Scores (Guestbook) --</h3>
              <VisitorComments slug={slug} recipientName={data.recipientName} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}