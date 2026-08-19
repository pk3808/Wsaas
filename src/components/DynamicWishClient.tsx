"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { decodeData } from "@/lib/utils";
import { THEMES, OCCASIONS, type WishData } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart, Sparkles, MailOpen } from "lucide-react";

function DynamicWishClientContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<WishData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const d = searchParams.get("d");
    if (d) {
      const decoded = decodeData(d);
      if (decoded && decoded.recipientName) {
        setData(decoded as WishData);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [searchParams]);

  const handleOpen = () => {
    setIsOpen(true);

    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h2>
          <p className="text-slate-600">This wish link seems to be broken or invalid.</p>
        </div>
      </div>
    );
  }

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;

  const themeConfig = THEMES.find(t => t.id === data.theme) || THEMES[0];
  const occasionConfig = OCCASIONS.find(o => o.id === data.occasion) || OCCASIONS[0];

  return (
    <main className={`min-h-screen transition-colors duration-1000 flex items-center justify-center overflow-hidden ${themeConfig.colors.bg} ${themeConfig.colors.pattern}`}>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0, y: -50 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <button
              onClick={handleOpen}
              className="group relative w-64 h-64 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden border border-slate-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <MailOpen className="w-16 h-16 text-indigo-500 group-hover:scale-110 transition-transform relative z-10" />
              <div className="text-center relative z-10 px-4">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">To</p>
                <p className="text-2xl font-bold text-slate-800 capitalize truncate w-48">{data.recipientName}</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-100 rounded-full blur-2xl group-hover:bg-pink-200 transition-colors" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-100 rounded-full blur-2xl group-hover:bg-indigo-200 transition-colors" />
            </button>
            <p className="text-slate-600 font-medium animate-pulse">Tap to open your surprise!</p>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className={`w-full max-w-lg mx-4 ${themeConfig.colors.card} rounded-3xl shadow-2xl overflow-hidden border ${themeConfig.colors.border}`}
          >
            <div className="p-8 md:p-12 text-center flex flex-col items-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-6xl mb-6"
              >
                {occasionConfig.emoji}
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`text-3xl md:text-5xl font-extrabold mb-2 ${themeConfig.colors.text} capitalize`}
              >
                Happy {occasionConfig.label}, <br/> <span className={themeConfig.colors.accent}>{data.recipientName}!</span>
              </motion.h1>

              {data.age && data.occasion === 'birthday' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className={`mt-4 mb-6 inline-block px-4 py-1.5 rounded-full text-sm font-bold bg-opacity-20 ${themeConfig.colors.accent.replace('text-', 'bg-')} ${themeConfig.colors.text}`}
                >
                  Turning {data.age}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="w-16 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent my-8"
              />

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className={`text-lg md:text-xl leading-relaxed whitespace-pre-wrap ${themeConfig.colors.text} opacity-90 font-medium`}
              >
                "{data.message}"
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className={`mt-12 text-right w-full ${themeConfig.colors.text} font-bold opacity-80 flex items-center justify-end gap-2`}
              >
                With love, <br/> {data.senderName} <Heart className="w-5 h-5 inline text-pink-500 fill-pink-500" />
              </motion.div>
            </div>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 2 }}
               className={`p-4 text-center border-t ${themeConfig.colors.border}`}
            >
              <a href="/" className={`text-sm ${themeConfig.colors.text} opacity-60 hover:opacity-100 transition-opacity font-medium flex items-center justify-center gap-1`}>
                Create a wish page <Sparkles className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export function DynamicWishClient({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>
      <DynamicWishClientContent slug={slug} />
    </Suspense>
  );
}