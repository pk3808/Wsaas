"use client";

import { type WishData } from "@/lib/config";
import { VisitorComments } from "@/components/VisitorComments";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Zap, Music, Disc } from "lucide-react";
import confetti from "canvas-confetti";

export function NeonNightclub({ data, slug }: { data: WishData; slug: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 100,
      spread: 80,
      colors: ['#EC4899', '#3B82F6', '#8B5CF6', '#10B981'],
      origin: { y: 0.6 },
      shapes: ['square']
    });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans flex flex-col items-center">
      {/* Laser grids / background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 [perspective:1000px] [transform-style:preserve-3d] [transform:rotateX(60deg)_translateY(-100px)] pointer-events-none" />

      {/* Neon Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="door"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ scale: 2, opacity: 0, filter: "blur(10px)" }}
            className="m-auto flex flex-col items-center z-10 space-y-8"
          >
            <div className="text-center space-y-2">
              <h3 className="text-pink-500 font-bold tracking-[0.3em] text-sm uppercase">VIP Access Only</h3>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">
                {data.recipientName}'s Party
              </h1>
            </div>

            <button
              onClick={handleOpen}
              className="px-10 py-4 bg-transparent border-2 border-pink-500 text-pink-500 font-bold uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] rounded-full flex items-center gap-3"
            >
              <Zap className="w-5 h-5" /> Enter Club
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="club"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl z-10 p-6 space-y-12 my-10"
          >
            <div className="text-center space-y-6 bg-gray-900/40 backdrop-blur-md p-10 rounded-3xl border border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.15)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500" />

              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block"
              >
                <h1 className="text-6xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 filter drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">
                  HAPPY
                </h1>
                <h1 className="text-6xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 filter drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">
                  BIRTHDAY
                </h1>
                <h2 className="text-4xl text-white mt-4 font-bold tracking-widest">{data.recipientName}</h2>
              </motion.div>

              <div className="max-w-2xl mx-auto py-8 text-xl text-gray-300 font-medium leading-relaxed border-t border-b border-gray-800">
                {data.message}
              </div>

              <div className="flex justify-center gap-6 text-gray-400 font-bold uppercase tracking-widest text-sm">
                <span className="flex items-center gap-2"><Disc className="w-5 h-5 text-pink-500" /> Track 01</span>
                <span>•</span>
                <span>From: {data.senderName}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}