"use client";

import { type WishData } from "@/lib/config";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Camera, Mail, Heart, ArrowRight, ArrowLeft, Star, Pencil, Quote, Flower2, Move } from "lucide-react";
import confetti from "canvas-confetti";

interface TemplateProps {
  data: WishData;
  slug?: string;
}

// Data parsers matching previous template logic
const parseData = (str?: string, fallback: unknown[] = []) => {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

const WashiTape = ({ className, rotate }: { className?: string, rotate?: string }) => (
  <div className={`absolute h-6 md:h-8 bg-rose-200/60 mix-blend-multiply border border-rose-900/10 shadow-sm ${className}`} style={{ transform: `rotate(${rotate || '-2deg'})`, width: '120px' }} />
);

export function VintageScrapbook({ data }: TemplateProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeItem, setActiveItem] = useState<{ type: string, content: { year?: string, caption?: string, text?: string, label?: string, message?: string } | string } | null>(null);

  // Load specific Google Fonts for this component dynamically
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Special+Elite&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Configure fallback data if not provided via URL
  const memories = parseData(data.scrapbookMemories, [
    { year: "2020", caption: "That unforgettable day", text: "I still laugh every time I think about this." },
    { year: "2022", caption: "The big adventure", text: "We definitely got lost, but it was worth it." },
    { year: "2024", caption: "That ridiculous photo", text: "You probably weren't supposed to find this one." }
  ]);

  const notes = parseData(data.scrapbookNotes, [
    "Your laugh.",
    "Your patience.",
    "The way you make people comfortable.",
    "Your ridiculous sense of humor.",
    "Your smile."
  ]);

  const bucketList = parseData(data.scrapbookBucketList, [
    "Go somewhere we've never been.",
    "Take a ridiculous number of photos.",
    "Stay up until sunrise.",
    "Try something completely random.",
    "Make another memory worth putting in this book."
  ]);

  const envelopes = parseData(data.scrapbookEnvelopes, [
    { label: "Open when you're happy", message: "Keep smiling. The world looks better when you do." },
    { label: "Open when you miss me", message: "I'm always just a call away. I promise." },
    { label: "Open on your birthday", message: "This day is entirely yours. Make it count." }
  ]);

  const totalPages = 7;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      triggerPaperSound();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      triggerPaperSound();
    }
  };

  const triggerPaperSound = () => {
    // We omit actual Audio API calls as requested to avoid autoplay/audio logic,
    // but here is where we would trigger a tiny subtle paper flutter effect visually
    if (!shouldReduceMotion) {
      confetti({
        particleCount: 5,
        spread: 40,
        colors: ['#E6D5B8', '#F5E6CC'],
        origin: { y: 0.8 },
        ticks: 50,
        gravity: 0.4
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#DBC2A4] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] text-[#4A3B32] flex items-center justify-center p-2 md:p-8 overflow-hidden font-sans relative">

      {/* GLOBAL TYPOGRAPHY OVERRIDES FOR THIS COMPONENT */}
      <style dangerouslySetInnerHTML={{__html: `
        .font-handwriting { font-family: 'Caveat', cursive; }
        .font-typewriter { font-family: 'Special Elite', monospace; }
        .scrapbook-shadow { box-shadow: -10px 10px 30px rgba(0,0,0,0.2), inset -2px 0 10px rgba(0,0,0,0.05); }
        .paper-texture { background-color: #F7F1E3; background-image: url('https://www.transparenttextures.com/patterns/handmade-paper.png'); }
      `}} />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          // COVER PAGE
          <motion.div
            key="cover"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="relative cursor-pointer group w-full max-w-lg aspect-[3/4]"
            onClick={() => { setIsOpen(true); triggerPaperSound(); }}
          >
            {/* The physical book cover */}
            <div className="w-full h-full bg-[#8B5A2B] rounded-r-xl rounded-l-md scrapbook-shadow relative overflow-hidden flex flex-col items-center justify-center p-8 border-l-[16px] border-[#5C3A18] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1deg]">

              {/* Texture overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] mix-blend-multiply opacity-40 pointer-events-none" />

              {/* Leather corners */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#5C3A18] rounded-bl-full opacity-80" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#5C3A18] rounded-tl-full opacity-80" />

              {/* Tag / Label */}
              <div className="bg-[#F7F1E3] w-3/4 p-6 shadow-md relative rotate-[-2deg] border border-[#D3C3A3]">
                <WashiTape className="top-[-10px] left-1/2 -translate-x-1/2" rotate="-2deg" />
                <h1 className="text-3xl md:text-5xl font-typewriter text-center text-[#3A2B22] mb-4">A Little Book About You</h1>
                <div className="w-full h-[1px] bg-[#3A2B22]/20 mb-4" />
                <p className="font-handwriting text-2xl md:text-4xl text-center">For {data.recipientName}</p>
              </div>

              {/* Open instruction */}
              <div className="absolute bottom-12 font-handwriting text-2xl text-white/80 rotate-2">
                &quot;Open when you&apos;re ready to smile.&quot;
              </div>

              <div className="absolute bottom-4 right-4 bg-white/10 p-2 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                 <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ) : (
          // OPEN SCRAPBOOK
          <motion.div
            key="book-open"
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl h-[85vh] md:h-[80vh] flex relative perspective-[2000px]"
          >
            {/* The physical opened book background */}
            <div className="absolute inset-0 bg-[#E8DCC4] rounded-xl shadow-2xl border border-[#CBB89A] flex">
              {/* Spine line */}
              <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent shadow-inner" />
            </div>

            {/* Pagination Controls */}
            <div className="absolute -bottom-16 inset-x-0 flex justify-between items-center px-4">
               <button
                 onClick={handlePrevPage}
                 disabled={currentPage === 0}
                 className="p-3 bg-[#F7F1E3] rounded-full shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors"
               >
                 <ArrowLeft className="w-6 h-6 text-[#8B5A2B]" />
               </button>
               <span className="font-handwriting text-2xl text-white/80">Page {currentPage + 1} / {totalPages}</span>
               <button
                 onClick={handleNextPage}
                 disabled={currentPage === totalPages - 1}
                 className="p-3 bg-[#F7F1E3] rounded-full shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors"
               >
                 <ArrowRight className="w-6 h-6 text-[#8B5A2B]" />
               </button>
            </div>

            {/* Pages Container (Left and Right rendering for desktop, singular for mobile logic) */}
            <div className="w-full h-full relative p-2 md:p-6 overflow-hidden">
               <AnimatePresence initial={false} mode="wait">
                 <motion.div
                   key={currentPage}
                   initial={{ rotateY: -90, originX: 0, opacity: 0 }}
                   animate={{ rotateY: 0, opacity: 1 }}
                   exit={{ rotateY: 90, originX: 1, opacity: 0 }}
                   transition={{ duration: 0.6, ease: "easeInOut" }}
                   className="w-full h-full paper-texture rounded-sm shadow-md border border-black/5 relative overflow-y-auto overflow-x-hidden p-6 md:p-12 custom-scrollbar"
                 >
                   {/* P.1: INTRO */}
                   {currentPage === 0 && (
                     <div className="flex flex-col items-center justify-center min-h-full space-y-12 relative">
                        <WashiTape className="top-4 left-4" rotate="-12deg" />
                        <WashiTape className="top-4 right-4 bg-teal-200/60" rotate="8deg" />

                        <div className="text-center relative">
                          <h1 className="font-handwriting text-5xl md:text-7xl font-bold text-[#8B5A2B] rotate-[-2deg]">
                            Happy Birthday, <br/>{data.recipientName} ♡
                          </h1>
                          <Flower2 className="absolute -right-12 -top-8 w-16 h-16 text-rose-300 opacity-60 rotate-45" />
                        </div>

                        <div className="max-w-md text-center space-y-6 mt-12 relative">
                          <p className="font-typewriter text-lg md:text-xl leading-relaxed bg-white/50 p-4 inline-block shadow-sm rotate-[1deg]">
                            &quot;I wanted to give you something you couldn&apos;t put in a box.&quot;
                          </p>
                          <p className="font-handwriting text-3xl md:text-4xl text-[#5C3A18] rotate-[-2deg]">
                            So I made you this little book.
                          </p>
                        </div>

                        <div className="absolute bottom-8 right-8 font-handwriting text-xl text-black/40">p. 01</div>
                     </div>
                   )}

                   {/* P.2: TIMELINE */}
                   {currentPage === 1 && (
                     <div className="min-h-full relative py-8">
                       <h2 className="font-typewriter text-3xl text-center mb-16 underline decoration-wavy decoration-[#8B5A2B]/30">It All Started Somewhere...</h2>

                       <div className="relative max-w-lg mx-auto">
                         {/* Hand-drawn line */}
                         <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-[#8B5A2B]/40" />

                         <div className="space-y-16">
                           {memories.map((mem: { year?: string, caption?: string, text?: string }, i: number) => (
                             <motion.div
                               initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: i * 0.2 }}
                               key={i} className={`relative flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                             >
                               <div className="w-16 h-16 bg-[#F7F1E3] rounded-full border-2 border-[#8B5A2B] z-10 flex items-center justify-center font-typewriter shadow-md shrink-0">
                                 {mem.year}
                               </div>
                               <div className="bg-white p-4 pb-8 shadow-md border border-gray-200 relative group rotate-[-1deg] hover:rotate-1 transition-transform cursor-pointer" onClick={() => setActiveItem({ type: 'memory', content: mem })}>
                                 <WashiTape className="-top-3 left-1/2 -translate-x-1/2 bg-amber-200/60 w-16" rotate="0deg" />
                                 <div className="w-48 h-32 bg-[#EFEFEF] flex items-center justify-center mb-2">
                                   <Camera className="w-8 h-8 text-black/20 group-hover:text-amber-700/50 transition-colors" />
                                 </div>
                                 <p className="font-handwriting text-2xl text-center text-[#5C3A18]">{mem.caption}</p>
                                 <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="bg-white px-2 py-1 font-typewriter text-xs shadow-sm">Read</span>
                                 </div>
                               </div>
                             </motion.div>
                           ))}
                         </div>
                       </div>
                       <div className="absolute bottom-4 left-4 font-handwriting text-xl text-black/40">p. 02</div>
                     </div>
                   )}

                   {/* P.3: THINGS I LOVE (Scraps) */}
                   {currentPage === 2 && (
                     <div className="min-h-full relative py-8">
                       <h2 className="font-handwriting text-5xl text-center mb-16 text-[#8B5A2B]">Things I love about you</h2>

                       <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                         {notes.map((note: string, i: number) => {
                           const isSticky = i % 3 === 0;
                           const isTorn = i % 3 === 1;
                           const rotation = i % 2 === 0 ? "2.5" : "-3.1";

                           return (
                             <motion.div
                               key={i}
                               whileHover={{ scale: 1.1, zIndex: 50 }}
                               className={`
                                 relative p-6 cursor-pointer shadow-md
                                 ${isSticky ? 'bg-[#FEF08A] aspect-square w-40' :
                                   isTorn ? 'bg-white border-y-2 border-dashed border-gray-300 w-48' :
                                   'bg-[#E0E7FF] w-56 rounded-sm'}
                               `}
                               style={{ transform: `rotate(${rotation}deg)` }}
                               onClick={() => setActiveItem({ type: 'note', content: note })}
                             >
                               {!isSticky && <WashiTape className="-top-3 left-4 w-12" rotate={`${(i % 2 === 0 ? 1 : -1) * 15}deg`} />}
                               <p className="font-handwriting text-2xl text-center leading-tight text-gray-800 line-clamp-3">
                                 {note}
                               </p>
                             </motion.div>
                           );
                         })}
                       </div>

                       <div className="absolute bottom-10 right-10 flex items-center gap-2 rotate-[-5deg] opacity-50">
                          <Pencil className="w-5 h-5" />
                          <span className="font-handwriting text-xl">Could fill a whole book with these...</span>
                       </div>
                     </div>
                   )}

                   {/* P.4: BUCKET LIST */}
                   {currentPage === 3 && (
                     <div className="min-h-full relative py-12 px-4 md:px-20">
                        <WashiTape className="-top-2 -left-2 bg-purple-200/60" rotate="-15deg" />
                        <h2 className="font-typewriter text-4xl mb-12 text-[#3A2B22]">Things We Still Have To Do</h2>

                        <div className="space-y-6">
                          {bucketList.map((item: string, i: number) => (
                            <div key={i} className="flex items-start gap-4 group cursor-pointer" onClick={(e) => {
                              const el = e.currentTarget.querySelector('.check-mark');
                              if (el) el.classList.toggle('opacity-0');
                            }}>
                               <div className="w-6 h-6 border-2 border-[#8B5A2B] rounded-sm shrink-0 flex items-center justify-center bg-white">
                                  <motion.span className="check-mark font-handwriting text-2xl text-rose-600 opacity-0 transition-opacity">✓</motion.span>
                               </div>
                               <p className="font-handwriting text-3xl text-[#5C3A18] leading-tight group-hover:text-rose-700 transition-colors">{item}</p>
                            </div>
                          ))}
                        </div>

                        <div className="absolute bottom-8 right-8 font-handwriting text-xl text-black/40">somewhere around here</div>
                     </div>
                   )}

                   {/* P.5: ENVELOPES */}
                   {currentPage === 4 && (
                     <div className="min-h-full relative py-8 flex flex-col items-center">
                        <h2 className="font-handwriting text-5xl mb-16 text-[#8B5A2B]">Letters I couldn&apos;t fit anywhere else</h2>

                        <div className="w-full max-w-lg space-y-8">
                          {envelopes.map((env: { label?: string, message?: string }, i: number) => (
                            <motion.div
                              key={i}
                              whileHover={{ x: 10 }}
                              onClick={() => setActiveItem({ type: 'envelope', content: env })}
                              className="w-full bg-[#E8DCC4] border border-[#CBB89A] p-6 shadow-sm relative cursor-pointer flex items-center justify-between group overflow-hidden rounded-sm"
                            >
                               <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-l-[30px] border-t-white/30 border-l-transparent group-hover:border-t-white/60 transition-colors" />
                               <div className="flex items-center gap-4">
                                 <Mail className="w-6 h-6 text-[#8B5A2B]" />
                                 <span className="font-typewriter text-lg text-[#3A2B22]">{env.label}</span>
                               </div>
                               <span className="font-handwriting text-xl text-rose-700 opacity-0 group-hover:opacity-100 transition-opacity">Open me</span>
                            </motion.div>
                          ))}
                        </div>
                     </div>
                   )}

                   {/* P.6: EMPTY/FUTURE PAGES */}
                   {currentPage === 5 && (
                     <div className="min-h-full relative py-20 flex flex-col items-center justify-center">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }} className="text-center space-y-8">
                          <h2 className="font-typewriter text-3xl text-[#8B5A2B] opacity-50">Pages We Haven&apos;t Written Yet</h2>
                          <div className="w-32 h-[1px] bg-[#8B5A2B]/20 mx-auto" />
                          <p className="font-handwriting text-3xl md:text-5xl text-[#5C3A18] rotate-[-2deg] max-w-xl mx-auto">
                            Some of the best memories haven&apos;t happened yet.
                          </p>
                          <p className="font-handwriting text-2xl text-gray-500 pt-10">
                            Maybe we&apos;ll fill these pages together.
                          </p>
                        </motion.div>
                     </div>
                   )}

                   {/* P.7: FINAL LETTER & COLLAGE */}
                   {currentPage === 6 && (
                     <div className="min-h-full relative py-8 md:p-8">
                        <WashiTape className="-top-4 right-20 bg-rose-200/60 w-24" rotate="10deg" />

                        <h2 className="font-typewriter text-3xl mb-8">One Last Thing...</h2>

                        <div className="bg-white/50 p-6 md:p-10 shadow-sm border border-gray-200/50 rotate-[1deg]">
                          <p className="font-handwriting text-2xl md:text-3xl leading-relaxed text-[#4A3B32] whitespace-pre-line">
                            {data.message}
                          </p>

                          <div className="mt-12 text-right">
                            <p className="font-typewriter text-sm text-gray-500 mb-2">Love,</p>
                            <p className="font-handwriting text-5xl text-[#8B5A2B]">{data.senderName}</p>
                          </div>
                        </div>

                        {/* Final Collage Elements animating in */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: -10 }}
                          transition={{ delay: 1, duration: 0.8 }}
                          className="absolute -bottom-10 -left-10 bg-white p-2 pb-6 shadow-xl border border-gray-200"
                        >
                          <div className="w-32 h-24 bg-rose-100 flex items-center justify-center"><Heart className="text-rose-400" /></div>
                          <p className="font-handwriting text-center mt-2 text-xl">Here's to another chapter.</p>
                        </motion.div>

                        <div className="absolute bottom-4 right-4 text-center space-y-4">
                           <button
                             onClick={() => { setIsOpen(false); setCurrentPage(0); }}
                             className="font-typewriter text-xs uppercase tracking-widest px-4 py-2 border border-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white transition-colors"
                           >
                             Close the Book
                           </button>
                        </div>
                     </div>
                   )}

                 </motion.div>
               </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODALS FOR INTERACTIVE ELEMENTS */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveItem(null)}
          >
            {activeItem.type === 'memory' && (
              <motion.div
                initial={{ scale: 0.8, y: 50, rotate: -5 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.8, y: 50, rotate: 5 }}
                className="bg-white p-6 pb-16 shadow-2xl border border-gray-200 max-w-md w-full relative"
                onClick={e => e.stopPropagation()}
              >
                <WashiTape className="-top-4 left-1/2 -translate-x-1/2" rotate="2deg" />
                <button onClick={() => setActiveItem(null)} className="absolute top-2 right-4 font-typewriter text-gray-400">X</button>
                <div className="w-full aspect-square bg-[#F4F1EA] flex flex-col items-center justify-center border border-gray-100 mb-6">
                  <Camera className="w-16 h-16 text-black/10 mb-4" />
                  <span className="font-typewriter text-gray-400">{typeof activeItem.content !== "string" ? activeItem.content.year : ""}</span>
                </div>
                <p className="font-handwriting text-4xl text-center text-[#5C3A18] leading-tight">
                  &quot;{typeof activeItem.content !== "string" ? activeItem.content.text : ""}&quot;
                </p>
              </motion.div>
            )}

            {activeItem.type === 'note' && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-[#FEF08A] p-10 shadow-2xl max-w-sm w-full relative rotate-[2deg]"
                onClick={e => e.stopPropagation()}
              >
                <p className="font-handwriting text-5xl text-center leading-tight">
                  &quot;{typeof activeItem.content === "string" ? activeItem.content : ""}&quot;
                </p>
              </motion.div>
            )}

            {activeItem.type === 'envelope' && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="w-full max-w-md"
                onClick={e => e.stopPropagation()}
              >
                 <div className="bg-[#F7F1E3] p-10 shadow-2xl relative">
                   <div className="absolute top-0 inset-x-0 h-1 bg-rose-200" />
                   <p className="font-typewriter text-xs text-gray-500 mb-6 uppercase tracking-widest">{typeof activeItem.content !== "string" ? activeItem.content.label : ""}</p>
                   <p className="font-handwriting text-4xl leading-relaxed text-[#3A2B22]">
                     &quot;{typeof activeItem.content !== "string" ? activeItem.content.message : ""}&quot;
                   </p>
                 </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
