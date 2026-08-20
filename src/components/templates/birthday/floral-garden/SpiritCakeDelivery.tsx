"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GARDEN_COLORS } from "./garden-css";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";

interface SpiritCakeDeliveryProps {
  recipientName: string;
}

// Ethereal Garden Spirit Fairy with fluttering wings
function GardenSpirit({ isLeft = true }: { isLeft?: boolean }) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
        x: isLeft ? [0, 3, 0] : [0, -3, 0],
        rotate: isLeft ? [-2, 3, -2] : [2, -3, 2],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative flex flex-col items-center select-none pointer-events-none"
    >
      {/* Soft spirit glow */}
      <div
        className="absolute -inset-2 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${GARDEN_COLORS.subtleGold}40 0%, ${GARDEN_COLORS.blossomPink}20 50%, transparent 80%)`,
          filter: "blur(8px)",
        }}
      />

      {/* Spirit Fairy Body + Wings */}
      <svg width="46" height="52" viewBox="0 0 50 60" fill="none" className="overflow-visible">
        {/* Left Wing */}
        <g style={{ transformOrigin: "20px 24px", animation: "gardenButterflyWing 0.35s ease-in-out infinite" }}>
          <path
            d="M20 24 C10 12, -2 8, 2 20 C5 28, 14 28, 20 24Z"
            fill={GARDEN_COLORS.softLavender}
            opacity={0.75}
          />
          <path
            d="M20 24 C12 28, 4 36, 8 38 C14 38, 18 30, 20 24Z"
            fill={GARDEN_COLORS.blossomPink}
            opacity={0.65}
          />
        </g>

        {/* Right Wing */}
        <g style={{ transformOrigin: "30px 24px", animation: "gardenButterflyWing 0.35s ease-in-out infinite reverse" }}>
          <path
            d="M30 24 C40 12, 52 8, 48 20 C45 28, 36 28, 30 24Z"
            fill={GARDEN_COLORS.softLavender}
            opacity={0.75}
          />
          <path
            d="M30 24 C38 28, 46 36, 42 38 C36 38, 32 30, 30 24Z"
            fill={GARDEN_COLORS.blossomPink}
            opacity={0.65}
          />
        </g>

        {/* Spirit Body - Glowing teardrop wisp */}
        <ellipse cx="25" cy="26" rx="6" ry="10" fill={GARDEN_COLORS.ivory} />
        <ellipse cx="25" cy="26" rx="5" ry="8" fill={GARDEN_COLORS.blossomPink} opacity={0.6} />
        
        {/* Cute Spirit Face */}
        <circle cx="23" cy="24" r="1" fill={GARDEN_COLORS.darkBrown} />
        <circle cx="27" cy="24" r="1" fill={GARDEN_COLORS.darkBrown} />
        <path d="M24 27 Q25 28.5 26 27" stroke={GARDEN_COLORS.darkBrown} strokeWidth="0.6" strokeLinecap="round" />

        {/* Floral Head Crown */}
        <circle cx="25" cy="17" r="2" fill={GARDEN_COLORS.subtleGold} />
        <circle cx="22" cy="18" r="1.5" fill={GARDEN_COLORS.blossomPink} />
        <circle cx="28" cy="18" r="1.5" fill={GARDEN_COLORS.blossomPink} />

        {/* Ethereal trail */}
        <path d="M25 36 Q25 45 24 50" stroke={GARDEN_COLORS.subtleGold} strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
      </svg>
    </motion.div>
  );
}

export function SpiritCakeDelivery({ recipientName }: SpiritCakeDeliveryProps) {
  const [isBlown, setIsBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);
    setWishMade(true);

    // Celebration Confetti burst in botanical colors
    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.6 },
      colors: [GARDEN_COLORS.blossomPink, GARDEN_COLORS.sage, GARDEN_COLORS.subtleGold, GARDEN_COLORS.softLavender, "#FFF9F0"],
    });
  };

  return (
    <section className="relative py-20 sm:py-28 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1 }}
        className="text-center mb-8 sm:mb-12"
      >
        <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: GARDEN_COLORS.sage }}>
          A Delivery from the Sky
        </p>
        <h2
          className="text-2xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-serif)", color: GARDEN_COLORS.darkBrown }}
        >
          The Garden Spirits&apos; Gift
        </h2>
        <p
          className="text-sm mt-2 max-w-md mx-auto"
          style={{ fontFamily: "var(--font-serif)", color: GARDEN_COLORS.warmBrown, fontStyle: "italic" }}
        >
          Two gentle spirits have flown down from the clouds carrying a magical cake for {recipientName} ✨
        </p>
      </motion.div>

      {/* ─── Spirit Cake Delivery Floating Stage ─── */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="relative flex flex-col items-center"
      >
        {/* Floating Spirits & Hanging Vines Container */}
        <div className="relative w-72 sm:w-88 flex justify-between items-start pt-2">
          
          {/* Left Spirit */}
          <div className="flex flex-col items-center">
            <GardenSpirit isLeft={true} />
            {/* Hanging Floral Vine Ribbon to Cake */}
            <svg width="20" height="60" viewBox="0 0 20 60" fill="none" className="opacity-60 -mt-2">
              <path d="M10 0 C5 20, 15 40, 10 60" stroke={GARDEN_COLORS.sage} strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="8" cy="25" r="2" fill={GARDEN_COLORS.blossomPink} />
              <circle cx="12" cy="45" r="2" fill={GARDEN_COLORS.blossomPink} />
            </svg>
          </div>

          {/* Golden Sparkle Crown in Sky */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-xl sm:text-2xl select-none pt-4"
          >
            ✨
          </motion.div>

          {/* Right Spirit */}
          <div className="flex flex-col items-center">
            <GardenSpirit isLeft={false} />
            {/* Hanging Floral Vine Ribbon to Cake */}
            <svg width="20" height="60" viewBox="0 0 20 60" fill="none" className="opacity-60 -mt-2">
              <path d="M10 0 C15 20, 5 40, 10 60" stroke={GARDEN_COLORS.sage} strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="12" cy="25" r="2" fill={GARDEN_COLORS.blossomPink} />
              <circle cx="8" cy="45" r="2" fill={GARDEN_COLORS.blossomPink} />
            </svg>
          </div>
        </div>

        {/* ─── The Botanical Birthday Cake ─── */}
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative -mt-4 cursor-pointer group flex flex-col items-center"
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
                  {/* Glowing halo */}
                  <div
                    className="w-8 h-8 rounded-full absolute -top-1"
                    style={{
                      background: `radial-gradient(circle, #FDE047 0%, #F59E0B 50%, transparent 80%)`,
                      filter: "blur(6px)",
                    }}
                  />
                  {/* Flame Teardrop SVG */}
                  <svg width="18" height="24" viewBox="0 0 20 28" fill="none" className="relative z-10">
                    <path
                      d="M10 0 C16 8, 20 16, 14 24 C10 28, 4 26, 2 20 C0 14, 4 8, 10 0Z"
                      fill="#F59E0B"
                    />
                    <path
                      d="M10 6 C13 11, 16 16, 12 21 C9 24, 6 23, 4 19 C3 15, 6 11, 10 6Z"
                      fill="#FEF08A"
                    />
                  </svg>
                </motion.div>
              ) : (
                /* Smoke Wisp after blown */
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

            {/* Candle Stick */}
            <div className="w-2.5 h-6 bg-gradient-to-b from-rose-200 to-rose-300 rounded-t-sm border border-rose-300 shadow-2xs relative -mt-0.5" />
          </div>

          {/* Botanical Tiered Cake SVG */}
          <div className="relative -mt-1 select-none">
            <svg width="220" height="150" viewBox="0 0 220 150" fill="none" className="drop-shadow-xl">
              {/* Top Tier */}
              <rect x="55" y="20" width="110" height="45" rx="16" fill={GARDEN_COLORS.cream} stroke={GARDEN_COLORS.blossomPink} strokeWidth="1.5" />
              {/* Top Tier Frosting Drips */}
              <path d="M55 35 Q65 42 75 35 Q85 43 95 35 Q105 44 115 35 Q125 43 135 35 Q145 44 155 35 Q165 42 165 35" fill="none" stroke={GARDEN_COLORS.dustyPink} strokeWidth="2.5" strokeLinecap="round" />
              {/* Top Tier Cherries/Flowers */}
              <circle cx="75" cy="24" r="3.5" fill={GARDEN_COLORS.blossomPink} />
              <circle cx="110" cy="22" r="3.5" fill={GARDEN_COLORS.subtleGold} />
              <circle cx="145" cy="24" r="3.5" fill={GARDEN_COLORS.blossomPink} />

              {/* Bottom Tier */}
              <rect x="30" y="60" width="160" height="65" rx="20" fill={GARDEN_COLORS.ivory} stroke={GARDEN_COLORS.sage} strokeWidth="1.5" />
              {/* Bottom Tier Frosting Swirls */}
              <path d="M30 78 Q45 88 60 78 Q75 90 90 78 Q105 90 120 78 Q135 90 150 78 Q165 90 180 78 Q190 85 190 78" fill="none" stroke={GARDEN_COLORS.sage} strokeWidth="2" strokeLinecap="round" opacity={0.6} />
              
              {/* Botanical Leaves & Flower Details on Cake */}
              <circle cx="55" cy="85" r="4" fill={GARDEN_COLORS.blossomPink} opacity={0.8} />
              <circle cx="110" cy="95" r="4.5" fill={GARDEN_COLORS.subtleGold} opacity={0.8} />
              <circle cx="165" cy="85" r="4" fill={GARDEN_COLORS.blossomPink} opacity={0.8} />
              <ellipse cx="65" cy="85" rx="3" ry="1.5" fill={GARDEN_COLORS.sage} opacity={0.7} />
              <ellipse cx="155" cy="85" rx="3" ry="1.5" fill={GARDEN_COLORS.sage} opacity={0.7} />

              {/* Ceramic Cake Pedestal Plate */}
              <ellipse cx="110" cy="125" rx="95" ry="14" fill={GARDEN_COLORS.cream} stroke={GARDEN_COLORS.warmBrown} strokeWidth="1.5" opacity={0.9} />
              <ellipse cx="110" cy="138" rx="40" ry="6" fill={GARDEN_COLORS.warmBrown} opacity={0.2} />
            </svg>
          </div>

          {/* Call to Action Pill */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-3 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 text-xs font-bold uppercase tracking-wider transition-all shadow-md group-hover:shadow-lg cursor-pointer"
            style={{
              borderColor: isBlown ? `${GARDEN_COLORS.sage}` : `${GARDEN_COLORS.dustyPink}`,
              backgroundColor: isBlown ? `${GARDEN_COLORS.sage}15` : `${GARDEN_COLORS.blossomPink}25`,
              color: isBlown ? GARDEN_COLORS.forestGreen : GARDEN_COLORS.darkBrown,
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-coral animate-pulse" />
            <span>{isBlown ? "Wish Released into the Sky ✨" : "Tap to Blow Candle & Make a Wish 🎂"}</span>
          </motion.div>
        </motion.div>

        {/* Celebratory Wish Blessing Banner */}
        <AnimatePresence>
          {wishMade && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mt-6 p-5 sm:p-6 rounded-3xl max-w-md mx-auto border shadow-xl text-center space-y-2"
              style={{
                backgroundColor: `${GARDEN_COLORS.ivory}F5`,
                borderColor: `${GARDEN_COLORS.sage}40`,
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="text-2xl select-none">🌸 🎂 🕊️</div>
              <h4
                className="text-lg sm:text-xl font-bold"
                style={{ fontFamily: "var(--font-serif)", color: GARDEN_COLORS.darkBrown }}
              >
                Your wish is soaring with the garden breeze!
              </h4>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: GARDEN_COLORS.warmBrown,
                  fontStyle: "italic",
                }}
              >
                &ldquo;May every sweet hope you whispered bloom into reality this year, {recipientName}.&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  );
}
