"use client";

import { type WishData } from "@/lib/config";
import { VisitorComments } from "@/components/VisitorComments";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Camera, Mail, Heart, Sparkles, Smile } from "lucide-react";
import confetti from "canvas-confetti";

interface TemplateProps {
  data: WishData;
  slug: string;
}

export function VintageScrapbook({ data, slug }: TemplateProps) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#D4A373', '#FAEDCD', '#E9EDC9', '#CCD5AE'],
      origin: { y: 0.7 }
    });
  };

  const handleOpen = () => {
    setIsOpen(true);
    triggerConfetti();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5C4D43] relative overflow-hidden flex flex-col items-center p-4 md:p-10 font-[family-name:var(--font-marker)]">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-dotgrid opacity-60 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, transition: { duration: 0.4 } }}
            className="m-auto flex flex-col items-center z-10 cursor-pointer group"
            onClick={handleOpen}
          >
            <div className="relative bg-[#F4E9D8] border-2 border-[#D4A373]/50 w-72 h-52 shadow-xl flex items-center justify-center rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300 rounded-sm">
              <div className="absolute -top-3 w-16 h-6 bg-[#E3D5C5] opacity-80 rounded-sm shadow-sm rotate-[4deg]" />
              <div className="text-center space-y-2 z-10">
                <Mail className="w-10 h-10 mx-auto text-[#A57A57]" />
                <h2 className="text-xl font-bold font-[family-name:var(--font-cursive)] text-[#8B5A33]">
                  To: {data.recipientName}
                </h2>
                <p className="text-sm opacity-70">Tap to open memory book</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="book"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl z-10 my-4 space-y-12"
          >
            {/* Scrapbook Main Page */}
            <div className="bg-[#FFFDF9] border border-[#EBE3D5] rounded-lg shadow-2xl p-6 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-8 min-h-[60vh]">

              {/* Binder rings emulation */}
              <div className="hidden md:flex absolute left-0 top-0 bottom-0 w-8 flex-col justify-evenly items-center border-r border-[#EBE3D5] bg-[#F9F6F0]">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-slate-300 shadow-inner border border-slate-400" />
                ))}
              </div>

              <div className="flex-1 md:pl-10 space-y-8 relative">

                {/* Washi Tape */}
                <div className="absolute -top-2 left-10 w-24 h-6 bg-rose-200/50 border border-rose-200 rounded-sm rotate-[-3deg]" />

                <div className="text-center md:text-left pt-6">
                  <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-cursive)] text-[#8B5A33] leading-tight">
                    Happy Birthday, <br/> {data.recipientName}
                  </h1>
                  <p className="text-lg md:text-xl text-[#A57A57] mt-4 max-w-lg">
                    {data.message}
                  </p>
                </div>

                <div className="relative mt-10 p-4 pb-8 bg-white border border-gray-200 shadow-md rotate-[2deg] w-64 mx-auto md:mx-0 group hover:rotate-0 transition-transform cursor-pointer" onClick={triggerConfetti}>
                   <div className="absolute -top-3 right-4 w-12 h-4 bg-[#D4A373]/30 rounded-sm rotate-12" />
                   <div className="w-full h-48 bg-[#F4F1EA] flex items-center justify-center border border-gray-100">
                     <Camera className="w-12 h-12 text-[#D4A373]/50" />
                   </div>
                   <p className="text-center mt-3 font-[family-name:var(--font-cursive)] text-xl text-[#8B5A33]">
                      Smile! 📸
                   </p>
                </div>
              </div>

              <div className="flex-1 space-y-6 relative flex flex-col items-center md:items-end justify-center">
                {/* Interactive polaroids */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="bg-white p-3 pb-8 shadow-lg border border-gray-200 w-48 rotate-[-4deg]"
                >
                  <div className="w-full h-40 bg-[#FFE5D9] flex items-center justify-center">
                    <Heart className="w-10 h-10 text-rose-400 fill-rose-400" />
                  </div>
                  <p className="text-center mt-2 font-[family-name:var(--font-cursive)]">From {data.senderName}</p>
                </motion.div>

                 <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="bg-white p-3 pb-8 shadow-lg border border-gray-200 w-40 rotate-[6deg] -mt-10 mr-10"
                >
                  <div className="w-full h-32 bg-[#D8E2DC] flex items-center justify-center">
                    <Smile className="w-8 h-8 text-teal-600" />
                  </div>
                  <p className="text-center mt-2 font-[family-name:var(--font-cursive)] text-sm">Best Wishes!</p>
                </motion.div>
              </div>

            </div>

            <VisitorComments slug={slug} recipientName={data.recipientName} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}