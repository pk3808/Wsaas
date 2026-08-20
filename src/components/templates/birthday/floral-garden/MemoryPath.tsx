"use client";

import { motion } from "framer-motion";
import { GARDEN_COLORS, DEFAULT_MEMORIES, deterministicRandom } from "./garden-css";

interface MemoryPathProps {
  recipientName: string;
}

// Memory card component — appears like a Polaroid pinned in the garden
function MemoryCard({
  memory,
  index,
}: {
  memory: { title: string; note: string };
  index: number;
}) {
  const rotation = (deterministicRandom(index * 31) - 0.5) * 8;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40, rotate: rotation * 2 }}
      whileInView={{ opacity: 1, x: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
      className={`relative max-w-xs w-full ${isLeft ? "self-start sm:ml-8" : "self-end sm:mr-8"}`}
    >
      {/* Pin / string attachment */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full border-2 shadow-sm"
          style={{
            borderColor: GARDEN_COLORS.warmBrown,
            backgroundColor: GARDEN_COLORS.subtleGold,
          }}
        />
        <div className="w-px h-4" style={{ backgroundColor: `${GARDEN_COLORS.warmBrown}50` }} />
      </div>

      {/* Card body — Polaroid style */}
      <div
        className="p-5 pt-7 pb-6 rounded-2xl shadow-lg"
        style={{
          backgroundColor: `${GARDEN_COLORS.ivory}F0`,
          border: `1px solid ${GARDEN_COLORS.sage}25`,
          backdropFilter: "blur(6px)",
        }}
      >
        {/* Photo placeholder — represented as a nature sketch */}
        <div
          className="w-full h-28 sm:h-32 rounded-xl mb-4 flex items-center justify-center"
          style={{
            backgroundColor: `${GARDEN_COLORS.warmCream}`,
            border: `1px solid ${GARDEN_COLORS.sage}20`,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" opacity={0.3}>
            <path d="M10 50 C15 30, 25 20, 30 15 C35 20, 45 30, 50 50" stroke={GARDEN_COLORS.sage} strokeWidth="1.5" fill="none" />
            <circle cx="40" cy="15" r="6" stroke={GARDEN_COLORS.subtleGold} strokeWidth="1" fill="none" />
            <path d="M5 50 L55 50" stroke={GARDEN_COLORS.sage} strokeWidth="0.5" />
          </svg>
        </div>

        <h4
          className="text-sm font-bold mb-1.5"
          style={{ fontFamily: "var(--font-serif)", color: GARDEN_COLORS.darkBrown }}
        >
          {memory.title}
        </h4>
        <p
          className="text-xs leading-relaxed"
          style={{
            fontFamily: "var(--font-serif)",
            color: GARDEN_COLORS.warmBrown,
            fontStyle: "italic",
          }}
        >
          &ldquo;{memory.note}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}

export function MemoryPath({ recipientName }: MemoryPathProps) {
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
          Along the garden path
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{ fontFamily: "var(--font-serif)", color: GARDEN_COLORS.darkBrown }}
        >
          A Few Little Moments
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

      {/* Path line */}
      <div className="relative max-w-2xl mx-auto">
        {/* Center path line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top"
          style={{
            background: `linear-gradient(to bottom, transparent, ${GARDEN_COLORS.sage}40, ${GARDEN_COLORS.sage}40, transparent)`,
          }}
        />

        {/* Path decorations — small leaves along the line */}
        {[20, 40, 60, 80].map((top, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.4, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.3 }}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${top}%` }}
          >
            <svg width="12" height="16" viewBox="0 0 12 16" fill={GARDEN_COLORS.sage}>
              <path d="M6 0 C9 4 10 10 6 16 C2 10 3 4 6 0Z" />
            </svg>
          </motion.div>
        ))}

        {/* Memory cards */}
        <div className="flex flex-col items-center gap-12 sm:gap-16 py-8">
          {DEFAULT_MEMORIES.map((memory, i) => (
            <MemoryCard key={i} memory={memory} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
