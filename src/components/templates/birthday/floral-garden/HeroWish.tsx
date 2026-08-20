"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GARDEN_COLORS } from "./garden-css";
import confetti from "canvas-confetti";
import { Sparkles, ChevronDown } from "lucide-react";

interface HeroWishProps {
  recipientName: string;
  senderName: string;
  message: string;
  age?: string;
}

// Glowing Forest Spirit Angel with fluttering wings and halo
function ForestSpiritAngel({ isLeft = true }: { isLeft?: boolean }) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        x: isLeft ? [0, 4, 0] : [0, -4, 0],
        rotate: isLeft ? [-3, 4, -3] : [3, -4, 3],
      }}
      transition={{
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative flex flex-col items-center select-none"
    >
      {/* Radiant Angel Aura Glow */}
      <div
        className="absolute -inset-3 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${GARDEN_COLORS.sunlightYellow}60 0%, ${GARDEN_COLORS.blossomPink}30 50%, transparent 80%)`,
          filter: "blur(10px)",
        }}
      />

      {/* Spirit Angel SVG */}
      <svg width="56" height="62" viewBox="0 0 60 70" fill="none" className="overflow-visible drop-shadow-md">
        {/* Glowing Halo */}
        <ellipse cx="30" cy="10" rx="9" ry="3.5" stroke={GARDEN_COLORS.subtleGold} strokeWidth="1.8" fill="none" opacity={0.9} />

        {/* Left Angel Wing */}
        <g style={{ transformOrigin: "24px 30px", animation: "gardenButterflyWing 0.4s ease-in-out infinite" }}>
          <path
            d="M24 30 C12 14, -4 10, 2 24 C6 34, 16 34, 24 30Z"
            fill={GARDEN_COLORS.softLavender}
            opacity={0.85}
          />
          <path
            d="M24 30 C14 36, 4 46, 10 48 C18 48, 22 38, 24 30Z"
            fill={GARDEN_COLORS.blossomPink}
            opacity={0.75}
          />
        </g>

        {/* Right Angel Wing */}
        <g style={{ transformOrigin: "36px 30px", animation: "gardenButterflyWing 0.4s ease-in-out infinite reverse" }}>
          <path
            d="M36 30 C48 14, 64 10, 58 24 C54 34, 44 34, 36 30Z"
            fill={GARDEN_COLORS.softLavender}
            opacity={0.85}
          />
          <path
            d="M36 30 C46 36, 56 46, 50 48 C42 48, 38 38, 36 30Z"
            fill={GARDEN_COLORS.blossomPink}
            opacity={0.75}
          />
        </g>

        {/* Spirit Body - Soft glowing gown */}
        <ellipse cx="30" cy="32" rx="7" ry="12" fill={GARDEN_COLORS.ivory} />
        <ellipse cx="30" cy="32" rx="6" ry="10" fill={GARDEN_COLORS.blossomPink} opacity={0.65} />
        
        {/* Spirit Face */}
        <circle cx="27.5" cy="29" r="1.2" fill={GARDEN_COLORS.darkBrown} />
        <circle cx="32.5" cy="29" r="1.2" fill={GARDEN_COLORS.darkBrown} />
        <path d="M28.5 33 Q30 35 31.5 33" stroke={GARDEN_COLORS.darkBrown} strokeWidth="0.8" strokeLinecap="round" />

        {/* Floral Crown */}
        <circle cx="30" cy="20" r="2.5" fill={GARDEN_COLORS.subtleGold} />
        <circle cx="26" cy="21" r="2" fill={GARDEN_COLORS.blossomPink} />
        <circle cx="34" cy="21" r="2" fill={GARDEN_COLORS.blossomPink} />

        {/* Ethereal flowing trails */}
        <path d="M30 44 Q30 56 28 62" stroke={GARDEN_COLORS.subtleGold} strokeWidth="1.8" strokeLinecap="round" opacity={0.6} />
      </svg>
    </motion.div>
  );
}

export function HeroWish({ recipientName, senderName, message, age }: HeroWishProps) {
  const [isBlown, setIsBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);
    setWishMade(true);

    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.65 },
      colors: [GARDEN_COLORS.blossomPink, GARDEN_COLORS.sage, GARDEN_COLORS.subtleGold, GARDEN_COLORS.softLavender, "#FFF9F0"],
    });
  };

  const handleScrollExplore = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 pb-24 text-center">
      
      {/* Decorative botanical frame lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute left-4 sm:left-12 top-1/6 bottom-1/6 w-px origin-top hidden md:block"
        style={{ backgroundColor: `${GARDEN_COLORS.sage}35` }}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        className="absolute right-4 sm:right-12 top-1/6 bottom-1/6 w-px origin-top hidden md:block"
        style={{ backgroundColor: `${GARDEN_COLORS.sage}35` }}
      />

      {/* Small decorative flower at top */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-3"
      >
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <ellipse
              key={i}
              cx="20"
              cy="8"
              rx="5"
              ry="10"
              fill={GARDEN_COLORS.blossomPink}
              opacity={0.7}
              transform={`rotate(${angle} 20 20)`}
            />
          ))}
          <circle cx="20" cy="20" r="4" fill={GARDEN_COLORS.subtleGold} />
        </svg>
      </motion.div>

      {/* ─── Premium Redesigned Botanical Age Badge ─── */}
      {age && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 inline-flex items-center gap-2 px-5 py-1.5 rounded-full border shadow-sm backdrop-blur-md"
          style={{
            borderColor: `${GARDEN_COLORS.subtleGold}65`,
            background: `linear-gradient(135deg, ${GARDEN_COLORS.ivory}F0 0%, #FFF6EDF0 100%)`,
            boxShadow: `0 4px 16px ${GARDEN_COLORS.subtleGold}25`,
          }}
        >
          <span className="text-xs select-none">✨</span>
          <span
            className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase"
            style={{
              fontFamily: "var(--font-serif)",
              color: GARDEN_COLORS.forestGreen,
            }}
          >
            Celebrating {age} Beautiful Springs
          </span>
          <span className="text-xs select-none">🌸</span>
        </motion.div>
      )}

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
        style={{
          fontFamily: "var(--font-serif)",
          color: GARDEN_COLORS.darkBrown,
        }}
      >
        Happy Birthday,
        <br />
        <span style={{ color: GARDEN_COLORS.dustyPink }}>
          {recipientName}
        </span>{" "}
        <span className="text-3xl sm:text-4xl select-none">🌸</span>
      </motion.h1>

      {/* Decorative divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="w-16 h-px mb-5"
        style={{ backgroundColor: `${GARDEN_COLORS.sage}60` }}
      />

      {/* Main heartfelt message (styled cleanly, no background card) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        className="relative max-w-xl mx-auto px-6 py-2 mb-8 text-center"
      >
        {/* Subtle quotation mark accents */}
        <p
          className="text-sm sm:text-base md:text-lg leading-relaxed italic"
          style={{
            fontFamily: "var(--font-serif)",
            color: GARDEN_COLORS.warmBrown,
            lineHeight: 1.85,
          }}
        >
          &ldquo;{message}&rdquo;
        </p>

        {/* Sender signature inside letter */}
        <div className="mt-4 pt-3 border-t border-dashed border-warm-gray/15">
          <p className="text-[10px] uppercase tracking-[0.25em] mb-0.5" style={{ color: `${GARDEN_COLORS.sage}` }}>
            With love,
          </p>
          <p className="text-xl sm:text-2xl" style={{ fontFamily: "var(--font-cursive)", color: GARDEN_COLORS.naturalGreen }}>
            {senderName}
          </p>
        </div>
      </motion.div>

      {/* ─── FOREST SPIRIT ANGELS DELIVERING CAKE FROM SKY ─── */}
      <motion.div
        initial={{ opacity: 0, y: -80, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 2.2, delay: 0.8, ease: "easeOut" }}
        className="relative my-4 flex flex-col items-center select-none"
      >
        {/* Floating Angels & Vine Ribbons */}
        <div className="relative w-80 sm:w-96 flex justify-between items-start pt-1">
          {/* Left Forest Spirit Angel */}
          <div className="flex flex-col items-center">
            <ForestSpiritAngel isLeft={true} />
            <svg width="24" height="65" viewBox="0 0 24 65" fill="none" className="opacity-70 -mt-2">
              <path d="M12 0 C4 20, 20 45, 12 65" stroke={GARDEN_COLORS.sage} strokeWidth="1.8" strokeDasharray="3 3" />
              <circle cx="9" cy="25" r="2.5" fill={GARDEN_COLORS.blossomPink} />
              <circle cx="15" cy="48" r="2.5" fill={GARDEN_COLORS.blossomPink} />
            </svg>
          </div>

          {/* Golden Sparkle in Sky */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-2xl sm:text-3xl select-none pt-4"
          >
            ✨
          </motion.div>

          {/* Right Forest Spirit Angel */}
          <div className="flex flex-col items-center">
            <ForestSpiritAngel isLeft={false} />
            <svg width="24" height="65" viewBox="0 0 24 65" fill="none" className="opacity-70 -mt-2">
              <path d="M12 0 C20 20, 4 45, 12 65" stroke={GARDEN_COLORS.sage} strokeWidth="1.8" strokeDasharray="3 3" />
              <circle cx="15" cy="25" r="2.5" fill={GARDEN_COLORS.blossomPink} />
              <circle cx="9" cy="48" r="2.5" fill={GARDEN_COLORS.blossomPink} />
            </svg>
          </div>
        </div>

        {/* ─── The Botanical Birthday Cake ─── */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative -mt-6 cursor-pointer flex flex-col items-center group"
          onClick={handleBlowCandle}
        >
          {/* Cake Glow Aura */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${GARDEN_COLORS.sunlightYellow}40 0%, ${GARDEN_COLORS.blossomPink}20 50%, transparent 80%)`,
              filter: "blur(20px)",
            }}
          />

          {/* Candle Flame (Interactive) */}
          <div className="relative z-20 flex flex-col items-center">
            <AnimatePresence>
              {!isBlown ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.15, 0.95, 1], y: [0, -1, 1, 0] }}
                  exit={{ opacity: 0, scale: 0, y: -10 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex items-center justify-center cursor-pointer"
                >
                  <div
                    className="w-8 h-8 rounded-full absolute -top-1"
                    style={{
                      background: `radial-gradient(circle, #FDE047 0%, #F59E0B 50%, transparent 80%)`,
                      filter: "blur(6px)",
                    }}
                  />
                  <svg width="18" height="24" viewBox="0 0 20 28" fill="none" className="relative z-10">
                    <path d="M10 0 C16 8, 20 16, 14 24 C10 28, 4 26, 2 20 C0 14, 4 8, 10 0Z" fill="#F59E0B" />
                    <path d="M10 6 C13 11, 16 16, 12 21 C9 24, 6 23, 4 19 C3 15, 6 11, 10 6Z" fill="#FEF08A" />
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 0.8, 0], y: -25, x: [-2, 5, -3] }}
                  transition={{ duration: 2 }}
                  className="text-xs font-mono text-soft-brown select-none"
                >
                  💨 ✨
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-2.5 h-6 bg-gradient-to-b from-rose-200 to-rose-300 rounded-t-sm border border-rose-300 shadow-2xs relative -mt-0.5" />
          </div>

          {/* Botanical Tiered Cake SVG */}
          <div className="relative -mt-1 select-none">
            <svg width="210" height="140" viewBox="0 0 220 150" fill="none" className="drop-shadow-xl">
              {/* Top Tier */}
              <rect x="55" y="20" width="110" height="45" rx="16" fill={GARDEN_COLORS.cream} stroke={GARDEN_COLORS.blossomPink} strokeWidth="1.5" />
              <path d="M55 35 Q65 42 75 35 Q85 43 95 35 Q105 44 115 35 Q125 43 135 35 Q145 44 155 35 Q165 42 165 35" fill="none" stroke={GARDEN_COLORS.dustyPink} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="75" cy="24" r="3.5" fill={GARDEN_COLORS.blossomPink} />
              <circle cx="110" cy="22" r="3.5" fill={GARDEN_COLORS.subtleGold} />
              <circle cx="145" cy="24" r="3.5" fill={GARDEN_COLORS.blossomPink} />

              {/* Bottom Tier */}
              <rect x="30" y="60" width="160" height="65" rx="20" fill={GARDEN_COLORS.ivory} stroke={GARDEN_COLORS.sage} strokeWidth="1.5" />
              <path d="M30 78 Q45 88 60 78 Q75 90 90 78 Q105 90 120 78 Q135 90 150 78 Q165 90 180 78 Q190 85 190 78" fill="none" stroke={GARDEN_COLORS.sage} strokeWidth="2" strokeLinecap="round" opacity={0.6} />
              
              <circle cx="55" cy="85" r="4" fill={GARDEN_COLORS.blossomPink} opacity={0.8} />
              <circle cx="110" cy="95" r="4.5" fill={GARDEN_COLORS.subtleGold} opacity={0.8} />
              <circle cx="165" cy="85" r="4" fill={GARDEN_COLORS.blossomPink} opacity={0.8} />
              <ellipse cx="65" cy="85" rx="3" ry="1.5" fill={GARDEN_COLORS.sage} opacity={0.7} />
              <ellipse cx="155" cy="85" rx="3" ry="1.5" fill={GARDEN_COLORS.sage} opacity={0.7} />

              <ellipse cx="110" cy="125" rx="95" ry="14" fill={GARDEN_COLORS.cream} stroke={GARDEN_COLORS.warmBrown} strokeWidth="1.5" opacity={0.9} />
            </svg>
          </div>

          {/* Blow Candle CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 text-xs font-bold uppercase tracking-wider transition-all shadow-md group-hover:shadow-lg cursor-pointer"
            style={{
              borderColor: isBlown ? `${GARDEN_COLORS.sage}` : `${GARDEN_COLORS.dustyPink}`,
              backgroundColor: isBlown ? `${GARDEN_COLORS.sage}15` : `${GARDEN_COLORS.blossomPink}25`,
              color: isBlown ? GARDEN_COLORS.forestGreen : GARDEN_COLORS.darkBrown,
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-coral animate-pulse" />
            <span>{isBlown ? "Wish Released into the Garden ✨" : "Tap to Blow Candle & Make a Wish 🎂"}</span>
          </motion.div>
        </motion.div>

        {/* Wish blessing message */}
        <AnimatePresence>
          {wishMade && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-4 rounded-2xl max-w-sm border shadow-lg text-center space-y-1.5"
              style={{
                backgroundColor: `${GARDEN_COLORS.ivory}F5`,
                borderColor: `${GARDEN_COLORS.sage}40`,
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="text-xl select-none">🌸 🎂 🕊️</div>
              <h4 className="text-base font-bold" style={{ fontFamily: "var(--font-serif)", color: GARDEN_COLORS.darkBrown }}>
                Your wish is soaring with the garden breeze!
              </h4>
              <p className="text-xs italic leading-relaxed" style={{ color: GARDEN_COLORS.warmBrown }}>
                &ldquo;May every sweet hope you whispered bloom into reality this year, {recipientName}.&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ─── FLUTTERING FOREST ANGEL SCROLL GUIDE ─── */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: "-50%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onClick={handleScrollExplore}
            className="fixed bottom-6 left-1/2 z-40 cursor-pointer flex items-center gap-3 select-none"
          >
            {/* Fluttering Forest Spirit Angel */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [-3, 3, -3],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex flex-col items-center drop-shadow-md"
            >
              {/* Soft Angel Glow */}
              <div
                className="absolute -inset-2 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${GARDEN_COLORS.sunlightYellow}80 0%, ${GARDEN_COLORS.blossomPink}40 60%, transparent 80%)`,
                  filter: "blur(8px)",
                }}
              />

              {/* Angel SVG */}
              <svg width="48" height="52" viewBox="0 0 60 65" fill="none" className="overflow-visible">
                {/* Golden Halo */}
                <ellipse cx="30" cy="10" rx="8" ry="3" stroke={GARDEN_COLORS.subtleGold} strokeWidth="1.8" fill="none" />

                {/* Flapping Wings */}
                <g style={{ transformOrigin: "24px 28px", animation: "gardenButterflyWing 0.35s ease-in-out infinite" }}>
                  <path d="M24 28 C14 14, -2 10, 2 24 C6 32, 16 32, 24 28Z" fill={GARDEN_COLORS.softLavender} opacity={0.85} />
                  <path d="M24 28 C16 34, 6 42, 10 44 C16 44, 22 36, 24 28Z" fill={GARDEN_COLORS.blossomPink} opacity={0.75} />
                </g>
                <g style={{ transformOrigin: "36px 28px", animation: "gardenButterflyWing 0.35s ease-in-out infinite reverse" }}>
                  <path d="M36 28 C46 14, 62 10, 58 24 C54 32, 44 32, 36 28Z" fill={GARDEN_COLORS.softLavender} opacity={0.85} />
                  <path d="M36 28 C44 34, 54 42, 50 44 C44 44, 38 36, 36 28Z" fill={GARDEN_COLORS.blossomPink} opacity={0.75} />
                </g>

                {/* Angel Body & Face */}
                <ellipse cx="30" cy="30" rx="6.5" ry="11" fill={GARDEN_COLORS.ivory} />
                <ellipse cx="30" cy="30" rx="5.5" ry="9" fill={GARDEN_COLORS.blossomPink} opacity={0.65} />
                <circle cx="28" cy="27" r="1.1" fill={GARDEN_COLORS.darkBrown} />
                <circle cx="32" cy="27" r="1.1" fill={GARDEN_COLORS.darkBrown} />
                <path d="M28.5 30.5 Q30 32.5 31.5 30.5" stroke={GARDEN_COLORS.darkBrown} strokeWidth="0.8" strokeLinecap="round" />

                {/* Floral Crown */}
                <circle cx="30" cy="18" r="2" fill={GARDEN_COLORS.subtleGold} />
                <circle cx="26" cy="19" r="1.8" fill={GARDEN_COLORS.blossomPink} />
                <circle cx="34" cy="19" r="1.8" fill={GARDEN_COLORS.blossomPink} />

                {/* Ethereal Ribbon Trail */}
                <path d="M30 41 Q30 52 28 58" stroke={GARDEN_COLORS.subtleGold} strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
              </svg>
            </motion.div>

            {/* Whimsical Angel Speech Bubble */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="relative px-4 py-2 rounded-2xl border shadow-lg backdrop-blur-md flex items-center gap-2 group-hover:scale-105 transition-transform"
              style={{
                borderColor: `${GARDEN_COLORS.subtleGold}80`,
                backgroundColor: `${GARDEN_COLORS.ivory}F5`,
                boxShadow: `0 4px 20px ${GARDEN_COLORS.sage}30`,
              }}
            >
              {/* Little Speech Bubble Tail pointing to Angel */}
              <div
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-6"
                style={{ borderRightColor: `${GARDEN_COLORS.ivory}F5` }}
              />

              <div>
                <p
                  className="text-xs sm:text-sm font-semibold tracking-wide"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: GARDEN_COLORS.forestGreen,
                  }}
                >
                  Surprises wait for you below… ✨
                </p>
                <p
                  className="text-[10px] italic"
                  style={{ color: GARDEN_COLORS.warmBrown }}
                >
                  Scroll down to explore the garden
                </p>
              </div>

              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-sm font-bold pl-1"
                style={{ color: GARDEN_COLORS.forestGreen }}
              >
                ↓
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
