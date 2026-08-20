"use client";

import { type WishData } from "@/lib/config";
import { VisitorComments } from "@/components/VisitorComments";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Star, Moon } from "lucide-react";
import confetti from "canvas-confetti";

export function StarryNight({ data, slug }: { data: WishData; slug: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({
      particleCount: 60,
      spread: 100,
      colors: ['#FDE047', '#FEF08A', '#FFFFFF'],
      origin: { y: 0.3 },
      gravity: 0.5,
      ticks: 300
    });
  };

  return (
    <div className="min-h-screen bg-[#0B1021] text-blue-50 relative overflow-hidden flex flex-col items-center">
      {/* Stars Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />

      {/* Soft Moon Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="m-auto flex flex-col items-center z-10 cursor-pointer"
            onClick={handleOpen}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="text-amber-200 opacity-80 mb-6"
            >
              <Moon className="w-16 h-16" />
            </motion.div>
            <h2 className="text-2xl font-light tracking-[0.2em] text-blue-200">A WISH FOR</h2>
            <h1 className="text-4xl font-serif mt-2 text-amber-100">{data.recipientName}</h1>
            <p className="mt-8 text-sm tracking-widest text-blue-400 opacity-60">TOUCH TO REVEAL</p>
          </motion.div>
        ) : (
          <motion.div
            key="wish"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5 } }}
            className="w-full max-w-3xl z-10 my-16 px-6 space-y-16"
          >
            <div className="text-center space-y-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <h1 className="text-5xl md:text-7xl font-serif text-amber-100 font-medium">
                  Happy Birthday, <br/> {data.recipientName}
                </h1>
              </motion.div>

              <div className="flex justify-center items-center gap-4 py-4">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-200/50" />
                <Star className="w-4 h-4 text-amber-200" />
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-200/50" />
              </div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-xl md:text-2xl text-blue-100 leading-loose font-light px-4 md:px-12"
              >
                {data.message}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="pt-8 text-blue-300 font-serif italic"
              >
                With love, <br/> <span className="text-xl text-amber-100 not-italic">{data.senderName}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}