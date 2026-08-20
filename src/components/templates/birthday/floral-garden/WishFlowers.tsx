"use client";

import { motion } from "framer-motion";
import { GARDEN_COLORS, DEFAULT_WISHES } from "./garden-css";

interface WishFlowersProps {
  recipientName: string;
}

// Individual wish flower card
function WishFlowerCard({
  wish,
  index,
}: {
  wish: { icon: string; title: string; text: string };
  index: number;
}) {
  const petalColors = [
    GARDEN_COLORS.blossomPink,
    GARDEN_COLORS.sage,
    GARDEN_COLORS.softLavender,
    GARDEN_COLORS.dustyPink,
    GARDEN_COLORS.subtleGold,
    GARDEN_COLORS.deepSage,
  ];
  const color = petalColors[index % petalColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="relative flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl group"
      style={{
        backgroundColor: `${GARDEN_COLORS.ivory}CC`,
        border: `1px solid ${color}30`,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Decorative flower behind icon */}
      <div className="relative mb-4">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="absolute -top-1 -left-1">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <ellipse
              key={i}
              cx="30"
              cy="12"
              rx="6"
              ry="14"
              fill={color}
              opacity={0.2}
              transform={`rotate(${angle} 30 30)`}
            />
          ))}
        </svg>
        <span className="relative z-10 text-3xl block w-[58px] h-[58px] flex items-center justify-center">
          {wish.icon}
        </span>
      </div>

      <h3
        className="text-lg font-bold mb-2"
        style={{ fontFamily: "var(--font-serif)", color: GARDEN_COLORS.darkBrown }}
      >
        {wish.title}
      </h3>

      <p
        className="text-sm leading-relaxed"
        style={{
          fontFamily: "var(--font-serif)",
          color: GARDEN_COLORS.warmBrown,
          fontStyle: "italic",
        }}
      >
        &ldquo;{wish.text}&rdquo;
      </p>

      {/* Bottom stem line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
        className="w-px h-8 mt-4 origin-top"
        style={{ backgroundColor: `${color}40` }}
      />
    </motion.div>
  );
}

export function WishFlowers({ recipientName }: WishFlowersProps) {
  return (
    <section className="relative py-24 sm:py-32 px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <p
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: GARDEN_COLORS.sage }}
        >
          A clearing in the garden
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{ fontFamily: "var(--font-serif)", color: GARDEN_COLORS.darkBrown }}
        >
          Things I Wish For You
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-16 h-px mx-auto"
          style={{ backgroundColor: `${GARDEN_COLORS.sage}50` }}
        />
      </motion.div>

      {/* Wish cards grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEFAULT_WISHES.map((wish, i) => (
          <WishFlowerCard key={i} wish={wish} index={i} />
        ))}
      </div>
    </section>
  );
}
