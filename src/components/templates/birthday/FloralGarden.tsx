"use client";

import { type WishData } from "@/lib/config";
import { VisitorComments } from "@/components/VisitorComments";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Flower, Leaf } from "lucide-react";

export function FloralGarden({ data, slug }: { data: WishData; slug: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-[#064E3B] relative overflow-hidden font-sans">
      {/* Soft background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-200/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-200/50 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Leaves (CSS Animation) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => {
          // Pseudo-random deterministic values based on index to avoid hydration mismatch and purity rules
          const startX = (i * 73) % 1000 - 500;
          const endX = (i * 127) % 1000 - 500;
          const duration = 10 + (i % 5) * 2;
          const delay = (i % 4) * 1.5;

          return (
            <motion.div
              key={i}
              initial={{ y: -50, x: startX, rotate: 0 }}
              animate={{
                y: '120vh',
                x: endX,
                rotate: 360
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay
              }}
              className="absolute top-[-10%] text-emerald-300/40"
            >
              <Leaf className="w-8 h-8" />
            </motion.div>
          );
        })}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="gate"
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <div className="w-32 h-32 mx-auto bg-white/60 backdrop-blur-md rounded-full border border-emerald-100 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <Flower className="w-16 h-16 text-emerald-500 animate-pulse" />
              </div>
              <h2 className="text-2xl font-serif text-emerald-800">A Garden of Wishes For</h2>
              <h1 className="text-4xl font-serif font-bold text-emerald-900">{data.recipientName}</h1>
              <p className="text-emerald-600 uppercase tracking-widest text-sm pt-4">Enter the Garden</p>
            </motion.div>
          ) : (
            <motion.div
              key="garden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-2xl space-y-12"
            >
              <div className="bg-white/80 backdrop-blur-md p-10 rounded-t-full rounded-b-3xl shadow-xl border border-emerald-50 text-center space-y-8 relative">

                <div className="absolute top-8 left-1/2 -translate-x-1/2">
                   <Flower className="w-8 h-8 text-emerald-400" />
                </div>

                <div className="pt-12">
                  <h1 className="text-4xl md:text-5xl font-serif text-emerald-900 mb-4">Happy Birthday, <br/> {data.recipientName}</h1>
                  <div className="h-px w-24 bg-emerald-200 mx-auto" />
                </div>

                <p className="text-lg text-emerald-700/80 leading-relaxed font-serif px-4">
                  {data.message}
                </p>

                <div className="pt-6 font-medium text-emerald-800">
                  Warmly, <br/> {data.senderName}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}