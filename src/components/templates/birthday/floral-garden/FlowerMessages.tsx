"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GARDEN_COLORS, DEFAULT_FLOWER_MESSAGES, deterministicRandom } from "./garden-css";
import { X } from "lucide-react";

interface FlowerMessagesProps {
  nickname?: string;
  recipientName: string;
}

interface FlowerData {
  id: number;
  x: number;
  y: number;
  size: number;
  petalColor: string;
  centerColor: string;
  message: string;
  rotation: number;
}

// Individual interactive flower SVG
function InteractiveFlower({
  flower,
  isRead,
  onClick,
}: {
  flower: FlowerData;
  isRead: boolean;
  onClick: () => void;
}) {
  const petalCount = 5 + (flower.id % 3);
  const angleStep = 360 / petalCount;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1.2,
        delay: flower.id * 0.3,
        ease: "easeOut",
      }}
      className="absolute cursor-pointer group"
      style={{
        left: `${flower.x}%`,
        top: `${flower.y}%`,
        transform: `rotate(${flower.rotation}deg)`,
      }}
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        width={flower.size}
        height={flower.size}
        viewBox="0 0 60 60"
        className="transition-all duration-500"
        style={{
          filter: isRead
            ? `drop-shadow(0 0 8px ${flower.petalColor}80)`
            : `drop-shadow(0 0 4px ${flower.petalColor}40)`,
        }}
      >
        {/* Petals */}
        {Array.from({ length: petalCount }, (_, i) => (
          <ellipse
            key={i}
            cx="30"
            cy="12"
            rx="7"
            ry="14"
            fill={flower.petalColor}
            opacity={isRead ? 0.9 : 0.65}
            transform={`rotate(${i * angleStep} 30 30)`}
            className="transition-opacity duration-500"
          />
        ))}
        {/* Center */}
        <circle cx="30" cy="30" r="6" fill={flower.centerColor} />
        <circle cx="30" cy="30" r="3" fill={GARDEN_COLORS.ivory} opacity={0.5} />
      </svg>

      {/* Glow pulse indicator */}
      {!isRead && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: `${flower.petalColor}20`,
            filter: "blur(10px)",
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Tap hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: flower.id * 0.3 + 1.5 }}
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        style={{ color: GARDEN_COLORS.warmBrown, fontFamily: "var(--font-serif)" }}
      >
        tap to read
      </motion.p>
    </motion.div>
  );
}

export function FlowerMessages({ nickname, recipientName }: FlowerMessagesProps) {
  const [readFlowers, setReadFlowers] = useState<Set<number>>(new Set());
  const [activeMessage, setActiveMessage] = useState<{ id: number; message: string } | null>(null);

  const name = nickname || recipientName;

  // Generate deterministic flower positions
  const flowers: FlowerData[] = DEFAULT_FLOWER_MESSAGES.map((msg, i) => {
    const r = (n: number) => deterministicRandom(i * 100 + n);
    const petalColors = [
      GARDEN_COLORS.blossomPink,
      GARDEN_COLORS.dustyPink,
      GARDEN_COLORS.softLavender,
      GARDEN_COLORS.softBlossomPink,
      "#E8C8D0",
    ];

    return {
      id: i,
      x: 15 + r(1) * 70,
      y: 15 + r(2) * 55,
      size: 50 + r(3) * 30,
      petalColor: petalColors[i % petalColors.length],
      centerColor: GARDEN_COLORS.subtleGold,
      message: msg,
      rotation: r(4) * 30 - 15,
    };
  });

  const handleFlowerClick = useCallback((flower: FlowerData) => {
    setActiveMessage({ id: flower.id, message: flower.message });
    setReadFlowers((prev) => new Set(prev).add(flower.id));
  }, []);

  return (
    <section className="relative py-20 sm:py-28 px-6">
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="text-center mb-8"
      >
        <p
          className="text-xs uppercase tracking-[0.3em] mb-2"
          style={{ color: GARDEN_COLORS.sage }}
        >
          Hidden in the garden
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold"
          style={{ fontFamily: "var(--font-serif)", color: GARDEN_COLORS.darkBrown }}
        >
          Tap the flowers, {name}
        </h2>
        <p
          className="text-sm mt-2"
          style={{ fontFamily: "var(--font-serif)", color: GARDEN_COLORS.warmBrown, fontStyle: "italic" }}
        >
          Each one holds a little message for you.
        </p>
      </motion.div>

      {/* Flower field */}
      <div className="relative mx-auto max-w-2xl h-[350px] sm:h-[420px]">
        {flowers.map((flower) => (
          <InteractiveFlower
            key={flower.id}
            flower={flower}
            isRead={readFlowers.has(flower.id)}
            onClick={() => handleFlowerClick(flower)}
          />
        ))}
      </div>

      {/* Message overlay */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm"
            onClick={() => setActiveMessage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full p-8 rounded-3xl shadow-2xl border"
              style={{
                backgroundColor: `${GARDEN_COLORS.ivory}F5`,
                borderColor: `${GARDEN_COLORS.sage}30`,
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveMessage(null)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                style={{
                  backgroundColor: `${GARDEN_COLORS.sage}15`,
                  color: GARDEN_COLORS.warmBrown,
                }}
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Decorative mini flower */}
              <div className="flex justify-center mb-5">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                  {[0, 72, 144, 216, 288].map((angle, i) => (
                    <ellipse
                      key={i}
                      cx="20"
                      cy="9"
                      rx="4"
                      ry="9"
                      fill={GARDEN_COLORS.blossomPink}
                      opacity={0.7}
                      transform={`rotate(${angle} 20 20)`}
                    />
                  ))}
                  <circle cx="20" cy="20" r="3.5" fill={GARDEN_COLORS.subtleGold} />
                </svg>
              </div>

              <p
                className="text-center text-base sm:text-lg leading-relaxed"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: GARDEN_COLORS.darkBrown,
                  fontStyle: "italic",
                  lineHeight: 1.7,
                }}
              >
                &ldquo;{activeMessage.message}&rdquo;
              </p>

              <div className="flex justify-center mt-6">
                <div
                  className="w-8 h-px"
                  style={{ backgroundColor: `${GARDEN_COLORS.sage}40` }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
