"use client";

import { motion } from "framer-motion";
import { GARDEN_COLORS } from "./garden-css";

interface GardenIntroProps {
  recipientName: string;
  onEnterGarden: () => void;
}

// Subtle floating particle for intro scene
function IntroParticle({ index }: { index: number }) {
  const left = ((index * 73 + 17) % 100);
  const top = ((index * 41 + 29) % 100);
  const size = 3 + (index % 3) * 2;
  const duration = 4 + (index % 5) * 1.5;
  const delay = (index % 7) * 0.8;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        backgroundColor: GARDEN_COLORS.subtleGold,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 0.6, 0],
        y: [0, -30, -60],
        scale: [0.8, 1.2, 0.6],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// A single drifting leaf for the intro
function IntroLeaf({ index }: { index: number }) {
  const startX = ((index * 127 + 50) % 100);
  const duration = 14 + (index % 6) * 3;
  const delay = index * 2.5;
  const rotation = (index % 2 === 0) ? 180 : -180;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${startX}%`,
        top: "-5%",
      }}
      animate={{
        y: ["0vh", "110vh"],
        x: [0, (index % 2 === 0) ? 60 : -40],
        rotate: [0, rotation],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
        <path
          d="M10 0 C16 5 18 14 10 28 C2 14 4 5 10 0Z"
          fill={GARDEN_COLORS.sage}
          opacity={0.35}
        />
        <path
          d="M10 2 L10 24"
          stroke={GARDEN_COLORS.deepSage}
          strokeWidth="0.5"
          opacity={0.4}
        />
      </svg>
    </motion.div>
  );
}

export function GardenIntro({ recipientName, onEnterGarden }: GardenIntroProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer"
      style={{ backgroundColor: GARDEN_COLORS.ivory }}
      onClick={onEnterGarden}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 24 }, (_, i) => (
          <IntroParticle key={`p-${i}`} index={i} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <IntroLeaf key={`l-${i}`} index={i} />
        ))}
      </div>

      {/* Soft radial glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${GARDEN_COLORS.sunlightYellow}60 0%, ${GARDEN_COLORS.sunset}15 40%, transparent 70%)`,
          filter: "blur(50px)",
          animation: "gardenGlow 6s ease-in-out infinite",
        }}
      />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-xl space-y-6"
        onClick={(e) => {
          e.stopPropagation();
          onEnterGarden();
        }}
      >
        {/* Soft pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg tracking-wide italic"
          style={{
            fontFamily: "var(--font-serif)",
            color: GARDEN_COLORS.warmBrown,
          }}
        >
          A little garden has been growing for you…
        </motion.p>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="space-y-2 pt-2"
        >
          <p
            className="text-xs sm:text-sm uppercase tracking-[0.35em] font-medium"
            style={{ color: GARDEN_COLORS.sage }}
          >
            The Garden Wishes
          </p>
          <h1
            className="text-4xl sm:text-6xl font-bold tracking-tight"
            style={{
              fontFamily: "var(--font-serif)",
              color: GARDEN_COLORS.darkBrown,
            }}
          >
            for <span style={{ color: GARDEN_COLORS.dustyPink }}>{recipientName}</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm sm:text-base max-w-md mx-auto"
          style={{
            fontFamily: "var(--font-serif)",
            color: GARDEN_COLORS.warmBrown,
            fontStyle: "italic",
            opacity: 0.85,
          }}
        >
          &ldquo;Someone planted a few beautiful thoughts for you.&rdquo;
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-4"
        >
          <button
            onClick={onEnterGarden}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-xl group"
            style={{
              borderColor: `${GARDEN_COLORS.sage}`,
              color: GARDEN_COLORS.forestGreen,
              backgroundColor: `${GARDEN_COLORS.ivory}`,
            }}
          >
            <span
              className="text-sm sm:text-base font-semibold tracking-wider uppercase"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Enter the Garden
            </span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg"
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-10 w-36 h-px"
        style={{ backgroundColor: `${GARDEN_COLORS.sage}50` }}
      />
    </div>
  );
}
