"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GARDEN_COLORS, deterministicRandom } from "./garden-css";
import { X } from "lucide-react";

const BUTTERFLY_SECRETS = [
  "You found a little secret.",
  "There are probably more things I could say… but some feelings are better left between the lines.",
];

export function HiddenButterfly() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCaught, setIsCaught] = useState(false);
  const [hasBeenCaught, setHasBeenCaught] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Show butterfly after a random delay (15-30s after mount)
    const initialDelay = 15000 + deterministicRandom(42) * 15000;
    timerRef.current = setTimeout(() => {
      if (!hasBeenCaught) {
        setIsVisible(true);
        // Hide after flight completes (~12s)
        setTimeout(() => setIsVisible(false), 12000);
      }
    }, initialDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hasBeenCaught]);

  // Repeat appearances
  useEffect(() => {
    if (!isVisible && !hasBeenCaught) {
      const repeat = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 12000);
      }, 25000 + deterministicRandom(77) * 20000);
      return () => clearTimeout(repeat);
    }
  }, [isVisible, hasBeenCaught]);

  const handleCatch = () => {
    setIsCaught(true);
    setIsVisible(false);
    setHasBeenCaught(true);
  };

  return (
    <>
      {/* Flying butterfly */}
      <AnimatePresence>
        {isVisible && !hasBeenCaught && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-[50] pointer-events-auto cursor-pointer"
            style={{
              animation: "gardenButterflyFly 12s ease-in-out forwards",
            }}
            onClick={handleCatch}
          >
            {/* Butterfly SVG */}
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
              {/* Left wing */}
              <g style={{ transformOrigin: "20px 16px", animation: "gardenButterflyWing 0.4s ease-in-out infinite" }}>
                <path
                  d="M20 16 C15 8, 5 4, 2 10 C-1 16, 5 22, 12 20 C16 19, 18 17, 20 16Z"
                  fill={GARDEN_COLORS.softLavender}
                  opacity={0.8}
                />
                <path
                  d="M20 16 C16 20, 8 24, 6 20 C4 16, 8 12, 14 14 C17 15, 19 16, 20 16Z"
                  fill={GARDEN_COLORS.blossomPink}
                  opacity={0.7}
                />
              </g>
              {/* Right wing */}
              <g style={{ transformOrigin: "20px 16px", animation: "gardenButterflyWing 0.4s ease-in-out infinite reverse" }}>
                <path
                  d="M20 16 C25 8, 35 4, 38 10 C41 16, 35 22, 28 20 C24 19, 22 17, 20 16Z"
                  fill={GARDEN_COLORS.softLavender}
                  opacity={0.8}
                />
                <path
                  d="M20 16 C24 20, 32 24, 34 20 C36 16, 32 12, 26 14 C23 15, 21 16, 20 16Z"
                  fill={GARDEN_COLORS.blossomPink}
                  opacity={0.7}
                />
              </g>
              {/* Body */}
              <ellipse cx="20" cy="16" rx="1.5" ry="6" fill={GARDEN_COLORS.darkBrown} opacity={0.6} />
              {/* Antennae */}
              <line x1="20" y1="10" x2="17" y2="5" stroke={GARDEN_COLORS.darkBrown} strokeWidth="0.5" opacity={0.5} />
              <line x1="20" y1="10" x2="23" y2="5" stroke={GARDEN_COLORS.darkBrown} strokeWidth="0.5" opacity={0.5} />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret message modal */}
      <AnimatePresence>
        {isCaught && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsCaught(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm w-full p-8 rounded-3xl shadow-2xl text-center"
              style={{
                backgroundColor: `${GARDEN_COLORS.ivory}F8`,
                border: `1px solid ${GARDEN_COLORS.softLavender}40`,
                backdropFilter: "blur(20px)",
              }}
            >
              <button
                onClick={() => setIsCaught(false)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: `${GARDEN_COLORS.sage}15`, color: GARDEN_COLORS.warmBrown }}
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl mb-4"
              >
                🦋
              </motion.div>

              <p
                className="text-sm font-bold uppercase tracking-wider mb-4"
                style={{ color: GARDEN_COLORS.softLavender }}
              >
                {BUTTERFLY_SECRETS[0]}
              </p>

              <p
                className="text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: GARDEN_COLORS.darkBrown,
                  fontStyle: "italic",
                  lineHeight: 1.7,
                }}
              >
                &ldquo;{BUTTERFLY_SECRETS[1]}&rdquo;
              </p>

              <div className="flex justify-center mt-6">
                <div className="w-8 h-px" style={{ backgroundColor: `${GARDEN_COLORS.softLavender}50` }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
