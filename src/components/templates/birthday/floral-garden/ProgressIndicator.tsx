"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { GARDEN_COLORS } from "./garden-css";

const SECTIONS = [
  { icon: "🌸", label: "The Garden" },
  { icon: "🎂", label: "Spirit Cake" },
  { icon: "🌺", label: "Notes" },
  { icon: "🌿", label: "Wishes" },
  { icon: "📖", label: "Memories" },
  { icon: "🌳", label: "The Wish Tree" },
  { icon: "🌅", label: "The End" },
];

export function ProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const sectionIndex = Math.min(
        Math.floor(v * SECTIONS.length),
        SECTIONS.length - 1
      );
      setCurrentSection(sectionIndex);
      setIsVisible(v > 0.02 && v < 0.98);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
      transition={{ duration: 0.5 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3"
    >
      {SECTIONS.map((section, i) => (
        <div
          key={i}
          className="flex items-center gap-2 transition-all duration-300"
          style={{ opacity: currentSection === i ? 1 : 0.35 }}
        >
          <span className="text-xs">{section.icon}</span>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: currentSection === i ? "auto" : 0,
              opacity: currentSection === i ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap overflow-hidden"
            style={{
              fontFamily: "var(--font-serif)",
              color: GARDEN_COLORS.warmBrown,
            }}
          >
            {section.label}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}
