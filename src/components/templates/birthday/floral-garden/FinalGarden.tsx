"use client";

import { motion } from "framer-motion";
import { GARDEN_COLORS } from "./garden-css";

interface FinalGardenProps {
  recipientName: string;
  senderName: string;
}

export function FinalGarden({ recipientName, senderName }: FinalGardenProps) {
  return (
    <section className="relative py-32 sm:py-40 px-6 overflow-hidden">
      {/* Sunset overlay — warm golden wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, 
            transparent 0%, 
            ${GARDEN_COLORS.sunset}15 30%, 
            ${GARDEN_COLORS.sunsetWarm}20 60%, 
            ${GARDEN_COLORS.sunset}30 100%)`,
        }}
      />

      {/* Soft warm glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${GARDEN_COLORS.sunlightYellow}30 0%, transparent 60%)`,
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto text-center">
        {/* Opening farewell */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2 }}
          className="text-sm sm:text-base mb-10"
          style={{
            fontFamily: "var(--font-serif)",
            color: GARDEN_COLORS.warmBrown,
            fontStyle: "italic",
            lineHeight: 1.8,
          }}
        >
          And that&apos;s the little garden I made for you.
        </motion.p>

        {/* Final birthday wish */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8"
          style={{
            fontFamily: "var(--font-serif)",
            color: GARDEN_COLORS.darkBrown,
          }}
        >
          Happy Birthday,{" "}
          <span style={{ color: GARDEN_COLORS.dustyPink }}>{recipientName}</span>.{" "}
          <span className="text-3xl">❤️</span>
        </motion.h2>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-16 h-px mx-auto mb-10"
          style={{ backgroundColor: `${GARDEN_COLORS.sage}50` }}
        />

        {/* Closing personal message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1 }}
          className="text-sm sm:text-base leading-relaxed mb-12"
          style={{
            fontFamily: "var(--font-serif)",
            color: GARDEN_COLORS.warmBrown,
            fontStyle: "italic",
            lineHeight: 1.9,
          }}
        >
          &ldquo;Some people deserve more than a birthday message.
          <br />
          They deserve an entire little world made just for them.&rdquo;
        </motion.p>

        {/* Sender */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] mb-1" style={{ color: GARDEN_COLORS.sage }}>
            Forever yours,
          </p>
          <p
            className="text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-cursive)", color: GARDEN_COLORS.naturalGreen }}
          >
            {senderName}
          </p>
        </motion.div>

        {/* Final poetic line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: `${GARDEN_COLORS.sage}90` }}
        >
          Until the next flower blooms…
        </motion.p>

        {/* Final decorative flower */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 2.2 }}
          className="mt-10"
        >
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none" className="mx-auto">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <ellipse
                key={i}
                cx="20"
                cy="9"
                rx="4"
                ry="8"
                fill={GARDEN_COLORS.blossomPink}
                opacity={0.5}
                transform={`rotate(${angle} 20 20)`}
              />
            ))}
            <circle cx="20" cy="20" r="3" fill={GARDEN_COLORS.subtleGold} opacity={0.6} />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
