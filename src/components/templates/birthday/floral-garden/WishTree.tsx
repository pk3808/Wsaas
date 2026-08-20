"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GARDEN_COLORS, deterministicRandom } from "./garden-css";

interface WishTreeProps {
  recipientName: string;
}

const TREE_WISHES = [
  "May your path always be lit by kindness.",
  "May you find beauty in every ordinary moment.",
  "May laughter follow you wherever you go.",
  "May your dreams keep growing, just like this tree.",
  "May you always feel loved, even on quiet days.",
  "May courage find you when you need it most.",
  "May every sunrise remind you of new beginnings.",
  "May your heart always feel at home.",
];

interface LeafData {
  id: number;
  cx: number;
  cy: number;
  size: number;
  color: string;
  rotation: number;
  message: string;
}

function WishLeaf({
  leaf,
  isOpen,
  isFallen,
  onClick,
}: {
  leaf: LeafData;
  isOpen: boolean;
  isFallen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.g
      className="cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      animate={
        isFallen
          ? { y: 300, x: (leaf.id % 2 === 0) ? 60 : -60, rotate: 180, opacity: 0 }
          : {}
      }
      transition={isFallen ? { duration: 3, ease: "easeIn" } : {}}
    >
      {/* Glow behind leaf */}
      <circle
        cx={leaf.cx}
        cy={leaf.cy}
        r={leaf.size * 1.5}
        fill={leaf.color}
        opacity={isFallen ? 0 : 0.15}
        style={{ filter: "blur(5px)" }}
      />
      {/* Leaf shape */}
      <g transform={`translate(${leaf.cx - leaf.size / 2}, ${leaf.cy - leaf.size}) rotate(${leaf.rotation} ${leaf.size / 2} ${leaf.size})`}>
        <path
          d={`M${leaf.size / 2} 0 C${leaf.size} ${leaf.size * 0.4}, ${leaf.size} ${leaf.size * 0.8}, ${leaf.size / 2} ${leaf.size * 1.2} C0 ${leaf.size * 0.8}, 0 ${leaf.size * 0.4}, ${leaf.size / 2} 0Z`}
          fill={leaf.color}
          opacity={isFallen ? 0.3 : 0.75}
          className="transition-opacity duration-500"
        />
        {/* Leaf vein */}
        <line
          x1={leaf.size / 2}
          y1={leaf.size * 0.15}
          x2={leaf.size / 2}
          y2={leaf.size * 1}
          stroke={GARDEN_COLORS.ivory}
          strokeWidth="0.5"
          opacity={0.5}
        />
      </g>
    </motion.g>
  );
}

export function WishTree({ recipientName }: WishTreeProps) {
  const [openLeaf, setOpenLeaf] = useState<LeafData | null>(null);
  const [fallenLeaves, setFallenLeaves] = useState<Set<number>>(new Set());

  const leafColors = [
    GARDEN_COLORS.naturalGreen,
    GARDEN_COLORS.sage,
    GARDEN_COLORS.deepSage,
    GARDEN_COLORS.subtleGold,
    "#8FBC8F",
    "#9DC88D",
    "#C9A96E",
    "#A8D5A2",
  ];

  const leaves: LeafData[] = TREE_WISHES.map((msg, i) => {
    const r = (n: number) => deterministicRandom(i * 50 + n);
    // Position leaves on the tree crown area
    const angle = (i / TREE_WISHES.length) * Math.PI * 1.6 - Math.PI * 0.3;
    const radius = 80 + r(1) * 60;
    const cx = 200 + Math.cos(angle) * radius + (r(2) - 0.5) * 40;
    const cy = 140 + Math.sin(angle) * radius * 0.6 + (r(3) - 0.5) * 30;

    return {
      id: i,
      cx: Math.max(60, Math.min(340, cx)),
      cy: Math.max(60, Math.min(260, cy)),
      size: 12 + r(4) * 8,
      color: leafColors[i % leafColors.length],
      rotation: r(5) * 60 - 30,
      message: msg,
    };
  });

  const handleLeafClick = useCallback((leaf: LeafData) => {
    setOpenLeaf(leaf);
  }, []);

  const handleCloseMessage = useCallback(() => {
    if (openLeaf) {
      setFallenLeaves((prev) => new Set(prev).add(openLeaf.id));
      setOpenLeaf(null);
    }
  }, [openLeaf]);

  return (
    <section className="relative py-24 sm:py-32 px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: GARDEN_COLORS.sage }}>
          The heart of the garden
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{ fontFamily: "var(--font-serif)", color: GARDEN_COLORS.darkBrown }}
        >
          The Wish Tree
        </h2>
        <p
          className="text-sm max-w-md mx-auto"
          style={{ fontFamily: "var(--font-serif)", color: GARDEN_COLORS.warmBrown, fontStyle: "italic" }}
        >
          Each glowing leaf holds a wish. Tap one to release it into the garden.
        </p>
      </motion.div>

      {/* Tree SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mx-auto max-w-md"
      >
        <svg viewBox="0 0 400 450" className="w-full h-auto" fill="none">
          {/* Tree trunk */}
          <path
            d="M195 450 C193 400 188 360 190 320 C192 290 195 270 200 250"
            stroke={GARDEN_COLORS.warmBrown}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          {/* Main branches */}
          <path d="M197 310 C170 280 140 260 110 240" stroke={GARDEN_COLORS.warmBrown} strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M200 280 C230 250 260 230 290 210" stroke={GARDEN_COLORS.warmBrown} strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M195 340 C160 310 130 290 100 280" stroke={GARDEN_COLORS.warmBrown} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M200 300 C240 270 280 250 310 240" stroke={GARDEN_COLORS.warmBrown} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M198 260 C180 230 160 210 140 190" stroke={GARDEN_COLORS.warmBrown} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M202 260 C220 230 240 210 260 190" stroke={GARDEN_COLORS.warmBrown} strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Tree crown (soft background shape) */}
          <ellipse cx="200" cy="170" rx="150" ry="120" fill={GARDEN_COLORS.sage} opacity={0.1} />

          {/* Wish leaves */}
          {leaves.map((leaf) => (
            <WishLeaf
              key={leaf.id}
              leaf={leaf}
              isOpen={openLeaf?.id === leaf.id}
              isFallen={fallenLeaves.has(leaf.id)}
              onClick={() => handleLeafClick(leaf)}
            />
          ))}

          {/* Ground */}
          <ellipse cx="200" cy="445" rx="80" ry="8" fill={GARDEN_COLORS.sage} opacity={0.15} />
        </svg>
      </motion.div>

      {/* Wish message overlay */}
      <AnimatePresence>
        {openLeaf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/25 backdrop-blur-sm"
            onClick={handleCloseMessage}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm w-full p-8 rounded-3xl shadow-2xl text-center"
              style={{
                backgroundColor: `${GARDEN_COLORS.ivory}F5`,
                border: `1px solid ${GARDEN_COLORS.sage}30`,
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Falling leaf animation icon */}
              <motion.div
                animate={{ y: [0, 5, 0], rotate: [0, 10, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-3xl mb-5"
              >
                🍃
              </motion.div>

              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: GARDEN_COLORS.darkBrown,
                  fontStyle: "italic",
                  lineHeight: 1.7,
                }}
              >
                &ldquo;{openLeaf.message}&rdquo;
              </p>

              <button
                onClick={handleCloseMessage}
                className="mt-6 px-6 py-2 rounded-full text-xs uppercase tracking-wider font-semibold cursor-pointer transition-colors"
                style={{
                  backgroundColor: `${GARDEN_COLORS.sage}20`,
                  color: GARDEN_COLORS.naturalGreen,
                  border: `1px solid ${GARDEN_COLORS.sage}40`,
                }}
              >
                Release this wish 🍂
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
